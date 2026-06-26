from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.shared_library import (
    LibraryInvitationCreate,
    LibraryInvitationResponse,
    SharedLibraryActivityResponse,
    SharedLibraryCreate,
    SharedLibraryMemberResponse,
    SharedLibraryResponse,
    SharedLibraryUpdate,
)
from app.services.auth_service import get_current_user
from app.services.shared_library_service import (
    accept_invitation,
    change_role,
    create_shared_library,
    decline_invitation,
    delete_shared_library,
    get_activity,
    get_shared_library,
    invite_user,
    leave_library,
    list_members,
    list_user_shared_libraries,
    remove_member,
    update_shared_library,
)

router = APIRouter(prefix="/shared-libraries", tags=["shared-libraries"])
security = HTTPBearer()


def get_authenticated_user(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:
    if credentials is None or credentials.credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authentication token")
    return get_current_user(db, credentials.credentials)


@router.post("", response_model=SharedLibraryResponse)
def create_shared_library_endpoint(
    payload: SharedLibraryCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> SharedLibraryResponse:
    return create_shared_library(db, current_user, payload)


@router.get("", response_model=list[SharedLibraryResponse])
def list_shared_libraries_endpoint(
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[SharedLibraryResponse]:
    return list_user_shared_libraries(db, current_user)


@router.get("/{shared_library_id}", response_model=SharedLibraryResponse)
def get_shared_library_endpoint(
    shared_library_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> SharedLibraryResponse:
    return get_shared_library(db, current_user, shared_library_id)


@router.put("/{shared_library_id}", response_model=SharedLibraryResponse)
def update_shared_library_endpoint(
    shared_library_id: int,
    payload: SharedLibraryUpdate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> SharedLibraryResponse:
    return update_shared_library(db, current_user, shared_library_id, payload)


@router.delete("/{shared_library_id}")
def delete_shared_library_endpoint(
    shared_library_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    delete_shared_library(db, current_user, shared_library_id)
    return {"message": "Shared library deleted successfully"}


@router.post("/{shared_library_id}/invite", response_model=LibraryInvitationResponse)
def invite_user_endpoint(
    shared_library_id: int,
    payload: LibraryInvitationCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryInvitationResponse:
    return invite_user(db, current_user, shared_library_id, payload.recipient_id)


@router.post("/invitations/{invitation_id}/accept", response_model=LibraryInvitationResponse)
def accept_invitation_endpoint(
    invitation_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryInvitationResponse:
    return accept_invitation(db, current_user, invitation_id)


@router.post("/invitations/{invitation_id}/decline", response_model=LibraryInvitationResponse)
def decline_invitation_endpoint(
    invitation_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryInvitationResponse:
    return decline_invitation(db, current_user, invitation_id)


@router.delete("/{shared_library_id}/members/{user_id}")
def remove_member_endpoint(
    shared_library_id: int,
    user_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    remove_member(db, current_user, shared_library_id, user_id)
    return {"message": "Member removed successfully"}


@router.patch("/{shared_library_id}/members/{user_id}/role", response_model=SharedLibraryMemberResponse)
def change_role_endpoint(
    shared_library_id: int,
    user_id: int,
    payload: dict[str, str] = Body(...),
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> SharedLibraryMemberResponse:
    role = payload.get("role")
    if not role:
        raise HTTPException(status_code=400, detail="Role is required")
    return change_role(db, current_user, shared_library_id, user_id, role)


@router.get("/{shared_library_id}/members", response_model=list[SharedLibraryMemberResponse])
def list_members_endpoint(
    shared_library_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[SharedLibraryMemberResponse]:
    return list_members(db, current_user, shared_library_id)


@router.get("/{shared_library_id}/activity", response_model=list[SharedLibraryActivityResponse])
def activity_endpoint(
    shared_library_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[SharedLibraryActivityResponse]:
    return get_activity(db, current_user, shared_library_id)
