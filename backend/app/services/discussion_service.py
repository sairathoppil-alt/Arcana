from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.discussion import CommentReaction, DiscussionComment, DiscussionThread
from app.models.shared_library import SharedLibraryMember
from app.models.user import User
from app.schemas.discussion import (
    CommentReactionCreate,
    DiscussionCommentCreate,
    DiscussionCommentUpdate,
    DiscussionThreadCreate,
    DiscussionThreadUpdate,
)

SUPPORTED_REACTIONS = {"❤️", "👍", "⭐", "😂", "🔥"}


def _get_member(db: Session, shared_library_id: int, user_id: int) -> SharedLibraryMember | None:
    return db.scalar(
        select(SharedLibraryMember).where(
            SharedLibraryMember.shared_library_id == shared_library_id,
            SharedLibraryMember.user_id == user_id,
        )
    )


def _ensure_member(db: Session, shared_library_id: int, user_id: int) -> SharedLibraryMember:
    member = _get_member(db, shared_library_id, user_id)
    if member is None:
        raise HTTPException(status_code=403, detail="You are not a member of this shared library")
    return member


def _ensure_editor_or_owner(db: Session, shared_library_id: int, user_id: int) -> SharedLibraryMember:
    member = _ensure_member(db, shared_library_id, user_id)
    if member.role not in {"Owner", "Editor"}:
        raise HTTPException(status_code=403, detail="Only owners and editors can create discussions and comments")
    return member


def create_thread(db: Session, current_user: User, shared_library_id: int, payload: DiscussionThreadCreate) -> DiscussionThread:
    _ensure_editor_or_owner(db, shared_library_id, current_user.id)
    thread = DiscussionThread(
        shared_library_id=shared_library_id,
        title=payload.title.strip(),
        created_by=current_user.id,
    )
    db.add(thread)
    db.commit()
    db.refresh(thread)
    return thread


def list_threads(db: Session, current_user: User, shared_library_id: int) -> list[DiscussionThread]:
    _ensure_member(db, shared_library_id, current_user.id)
    return db.scalars(
        select(DiscussionThread)
        .where(DiscussionThread.shared_library_id == shared_library_id)
        .order_by(DiscussionThread.is_pinned.desc(), DiscussionThread.created_at.desc())
    ).all()


def get_thread(db: Session, current_user: User, thread_id: int) -> dict[str, object]:
    thread = db.get(DiscussionThread, thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    _ensure_member(db, thread.shared_library_id, current_user.id)
    comments = db.scalars(
        select(DiscussionComment)
        .where(DiscussionComment.thread_id == thread.id)
        .order_by(DiscussionComment.created_at.asc())
    ).all()
    return {"thread": thread, "comments": comments}


def update_thread(db: Session, current_user: User, thread_id: int, payload: DiscussionThreadUpdate) -> DiscussionThread:
    thread = db.get(DiscussionThread, thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    member = _ensure_member(db, thread.shared_library_id, current_user.id)
    if member.role != "Owner" and thread.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Only the thread creator or owner can update this thread")
    if payload.title is not None:
        thread.title = payload.title.strip()
    if payload.is_pinned is not None:
        thread.is_pinned = payload.is_pinned
    db.commit()
    db.refresh(thread)
    return thread


def delete_thread(db: Session, current_user: User, thread_id: int) -> None:
    thread = db.get(DiscussionThread, thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    member = _ensure_member(db, thread.shared_library_id, current_user.id)
    if member.role != "Owner" and thread.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Only the thread creator or owner can delete this thread")
    db.delete(thread)
    db.commit()


def create_comment(db: Session, current_user: User, thread_id: int, payload: DiscussionCommentCreate) -> DiscussionComment:
    thread = db.get(DiscussionThread, thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    _ensure_editor_or_owner(db, thread.shared_library_id, current_user.id)
    comment = DiscussionComment(thread_id=thread.id, author_id=current_user.id, content=payload.content.strip())
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def list_comments(db: Session, current_user: User, thread_id: int) -> list[DiscussionComment]:
    thread = db.get(DiscussionThread, thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    _ensure_member(db, thread.shared_library_id, current_user.id)
    return db.scalars(
        select(DiscussionComment)
        .where(DiscussionComment.thread_id == thread.id)
        .order_by(DiscussionComment.created_at.asc())
    ).all()


def edit_comment(db: Session, current_user: User, comment_id: int, payload: DiscussionCommentUpdate) -> DiscussionComment:
    comment = db.get(DiscussionComment, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    thread = db.get(DiscussionThread, comment.thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    member = _ensure_member(db, thread.shared_library_id, current_user.id)
    if member.role != "Owner" and comment.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the author or owner can edit this comment")
    comment.content = payload.content.strip()
    comment.edited = True
    comment.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(comment)
    return comment


def delete_comment(db: Session, current_user: User, comment_id: int) -> DiscussionComment:
    comment = db.get(DiscussionComment, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    thread = db.get(DiscussionThread, comment.thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    member = _ensure_member(db, thread.shared_library_id, current_user.id)
    if member.role != "Owner" and comment.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only the author or owner can delete this comment")
    comment.content = "[deleted]"
    comment.edited = True
    comment.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(comment)
    return comment


def reply_to_comment(db: Session, current_user: User, comment_id: int, payload: DiscussionCommentCreate) -> DiscussionComment:
    parent_comment = db.get(DiscussionComment, comment_id)
    if parent_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    thread = db.get(DiscussionThread, parent_comment.thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    _ensure_editor_or_owner(db, thread.shared_library_id, current_user.id)
    reply = DiscussionComment(
        thread_id=thread.id,
        author_id=current_user.id,
        parent_comment_id=parent_comment.id,
        content=payload.content.strip(),
    )
    db.add(reply)
    db.commit()
    db.refresh(reply)
    return reply


def toggle_reaction(db: Session, current_user: User, comment_id: int, payload: CommentReactionCreate) -> CommentReaction | None:
    if payload.reaction not in SUPPORTED_REACTIONS:
        raise HTTPException(status_code=400, detail="Unsupported reaction")
    comment = db.get(DiscussionComment, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    thread = db.get(DiscussionThread, comment.thread_id)
    if thread is None:
        raise HTTPException(status_code=404, detail="Thread not found")
    _ensure_editor_or_owner(db, thread.shared_library_id, current_user.id)

    existing = db.scalar(
        select(CommentReaction).where(CommentReaction.comment_id == comment.id, CommentReaction.user_id == current_user.id)
    )
    if existing is not None:
        if existing.reaction == payload.reaction:
            db.delete(existing)
            db.commit()
            return None
        existing.reaction = payload.reaction
        db.commit()
        db.refresh(existing)
        return existing

    reaction = CommentReaction(comment_id=comment.id, user_id=current_user.id, reaction=payload.reaction)
    db.add(reaction)
    db.commit()
    db.refresh(reaction)
    return reaction
