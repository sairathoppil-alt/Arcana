from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.library import Library
from app.models.shared_library import LibraryInvitation, SharedLibrary, SharedLibraryActivity, SharedLibraryMember
from app.models.user import User
from app.schemas.shared_library import SharedLibraryCreate, SharedLibraryUpdate

VALID_ROLES = {"Owner", "Editor", "Viewer"}


def _get_member(db: Session, shared_library_id: int, user_id: int) -> SharedLibraryMember | None:
    return db.scalar(select(SharedLibraryMember).where(SharedLibraryMember.shared_library_id == shared_library_id, SharedLibraryMember.user_id == user_id))


def _log_activity(db: Session, shared_library_id: int, actor_id: int, action: str, target: str | None = None) -> None:
    db.add(SharedLibraryActivity(shared_library_id=shared_library_id, actor_id=actor_id, action=action, target=target))


def create_shared_library(db: Session, current_user: User, payload: SharedLibraryCreate) -> SharedLibrary:
    library = db.get(Library, payload.library_id)
    if library is None:
        raise HTTPException(status_code=404, detail="Library not found")
    if library.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the library owner can share it")

    existing = db.scalar(select(SharedLibrary).where(SharedLibrary.library_id == payload.library_id))
    if existing is not None:
        raise HTTPException(status_code=409, detail="Library is already shared")

    shared = SharedLibrary(
        library_id=payload.library_id,
        owner_id=current_user.id,
        display_name=payload.display_name.strip(),
        description=payload.description,
        invite_code="shared-" + str(payload.library_id),
    )
    db.add(shared)
    db.flush()
    db.add(SharedLibraryMember(shared_library_id=shared.id, user_id=current_user.id, role="Owner"))
    _log_activity(db, shared.id, current_user.id, "Library created", payload.display_name)
    db.commit()
    db.refresh(shared)
    return shared


def get_shared_library(db: Session, current_user: User, shared_library_id: int) -> SharedLibrary:
    shared = db.get(SharedLibrary, shared_library_id)
    if shared is None:
        raise HTTPException(status_code=404, detail="Shared library not found")
    member = _get_member(db, shared.id, current_user.id)
    if member is None:
        raise HTTPException(status_code=403, detail="You are not a member of this shared library")
    return shared


def list_user_shared_libraries(db: Session, current_user: User) -> list[SharedLibrary]:
    return db.scalars(
        select(SharedLibrary)
        .join(SharedLibrary.members)
        .where(SharedLibraryMember.user_id == current_user.id)
        .order_by(SharedLibrary.created_at.desc())
    ).all()


def update_shared_library(db: Session, current_user: User, shared_library_id: int, payload: SharedLibraryUpdate) -> SharedLibrary:
    shared = get_shared_library(db, current_user, shared_library_id)
    member = _get_member(db, shared.id, current_user.id)
    if member is None or member.role not in {"Owner", "Editor"}:
        raise HTTPException(status_code=403, detail="Only owners and editors can update this shared library")
    if payload.display_name is not None:
        shared.display_name = payload.display_name.strip()
    if payload.description is not None:
        shared.description = payload.description
    _log_activity(db, shared.id, current_user.id, "Library updated", shared.display_name)
    db.commit()
    db.refresh(shared)
    return shared


def delete_shared_library(db: Session, current_user: User, shared_library_id: int) -> None:
    shared = get_shared_library(db, current_user, shared_library_id)
    member = _get_member(db, shared.id, current_user.id)
    if member is None or member.role != "Owner":
        raise HTTPException(status_code=403, detail="Only the owner can delete this shared library")
    db.delete(shared)
    db.commit()


def invite_user(db: Session, current_user: User, shared_library_id: int, recipient_id: int) -> LibraryInvitation:
    shared = get_shared_library(db, current_user, shared_library_id)
    member = _get_member(db, shared.id, current_user.id)
    if member is None or member.role != "Owner":
        raise HTTPException(status_code=403, detail="Only the owner can invite users")

    if recipient_id == current_user.id:
        raise HTTPException(status_code=409, detail="You cannot invite yourself")

    existing_member = _get_member(db, shared.id, recipient_id)
    if existing_member is not None:
        raise HTTPException(status_code=409, detail="User is already a member")

    invitation = LibraryInvitation(
        shared_library_id=shared.id,
        sender_id=current_user.id,
        recipient_id=recipient_id,
        status="Pending",
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    db.add(invitation)
    _log_activity(db, shared.id, current_user.id, "Invitation sent", str(recipient_id))
    db.commit()
    db.refresh(invitation)
    return invitation


def accept_invitation(db: Session, current_user: User, invitation_id: int) -> LibraryInvitation:
    invitation = db.get(LibraryInvitation, invitation_id)
    if invitation is None:
        raise HTTPException(status_code=404, detail="Invitation not found")
    if invitation.recipient_id != current_user.id:
        raise HTTPException(status_code=403, detail="You cannot accept this invitation")
    if invitation.status != "Pending":
        raise HTTPException(status_code=409, detail="Invitation is no longer pending")

    invitation.status = "Accepted"
    db.add(SharedLibraryMember(shared_library_id=invitation.shared_library_id, user_id=current_user.id, role="Viewer"))
    _log_activity(db, invitation.shared_library_id, current_user.id, "Invitation accepted", str(current_user.id))
    db.commit()
    db.refresh(invitation)
    return invitation


def decline_invitation(db: Session, current_user: User, invitation_id: int) -> LibraryInvitation:
    invitation = db.get(LibraryInvitation, invitation_id)
    if invitation is None:
        raise HTTPException(status_code=404, detail="Invitation not found")
    if invitation.recipient_id != current_user.id:
        raise HTTPException(status_code=403, detail="You cannot decline this invitation")
    invitation.status = "Declined"
    db.commit()
    db.refresh(invitation)
    return invitation


def remove_member(db: Session, current_user: User, shared_library_id: int, user_id: int) -> None:
    shared = get_shared_library(db, current_user, shared_library_id)
    actor = _get_member(db, shared.id, current_user.id)
    if actor is None or actor.role != "Owner":
        raise HTTPException(status_code=403, detail="Only the owner can remove members")
    target_member = _get_member(db, shared.id, user_id)
    if target_member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    db.delete(target_member)
    _log_activity(db, shared.id, current_user.id, "Member left", str(user_id))
    db.commit()


def leave_library(db: Session, current_user: User, shared_library_id: int) -> None:
    shared = get_shared_library(db, current_user, shared_library_id)
    member = _get_member(db, shared.id, current_user.id)
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    if member.role == "Owner":
        raise HTTPException(status_code=403, detail="The owner cannot leave the shared library")
    db.delete(member)
    _log_activity(db, shared.id, current_user.id, "Member left", str(current_user.id))
    db.commit()


def change_role(db: Session, current_user: User, shared_library_id: int, target_user_id: int, role: str) -> SharedLibraryMember:
    if role not in VALID_ROLES:
        raise HTTPException(status_code=400, detail="Invalid role")
    shared = get_shared_library(db, current_user, shared_library_id)
    actor = _get_member(db, shared.id, current_user.id)
    if actor is None or actor.role != "Owner":
        raise HTTPException(status_code=403, detail="Only the owner can change roles")
    target_member = _get_member(db, shared.id, target_user_id)
    if target_member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    target_member.role = role
    _log_activity(db, shared.id, current_user.id, "Role changed", f"{target_user_id}:{role}")
    db.commit()
    db.refresh(target_member)
    return target_member


def list_members(db: Session, current_user: User, shared_library_id: int) -> list[SharedLibraryMember]:
    shared = get_shared_library(db, current_user, shared_library_id)
    return db.scalars(select(SharedLibraryMember).where(SharedLibraryMember.shared_library_id == shared.id)).all()


def get_activity(db: Session, current_user: User, shared_library_id: int) -> list[SharedLibraryActivity]:
    shared = get_shared_library(db, current_user, shared_library_id)
    return db.scalars(select(SharedLibraryActivity).where(SharedLibraryActivity.shared_library_id == shared.id).order_by(SharedLibraryActivity.timestamp.desc())).all()
