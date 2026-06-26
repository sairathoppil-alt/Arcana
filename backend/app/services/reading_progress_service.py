from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.library_item import LibraryItem
from app.models.reading_progress import ReadingHistory, ReadingProgress
from app.models.user import User
from app.schemas.reading_progress import ProgressUpdate


def _compute_percentage(current_chapter: int, total_chapters: int | None) -> float:
    if total_chapters is None or total_chapters <= 0:
        return 0.0
    return round((current_chapter / total_chapters) * 100, 1)


def _ensure_progress_record(db: Session, user: User, item: LibraryItem) -> ReadingProgress:
    progress = db.scalar(select(ReadingProgress).where(ReadingProgress.user_id == user.id, ReadingProgress.library_item_id == item.id))
    if progress is None:
        progress = ReadingProgress(
            library_item_id=item.id,
            user_id=user.id,
            current_chapter=0,
            reading_time_minutes=0,
            reading_percentage=0.0,
            is_favorite=False,
        )
        db.add(progress)
        db.flush()
    return progress


def update_progress(db: Session, current_user: User, item_id: int, payload: ProgressUpdate) -> ReadingProgress:
    item = db.get(LibraryItem, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Library item not found")

    progress = _ensure_progress_record(db, current_user, item)
    if payload.current_chapter is not None:
        progress.current_chapter = payload.current_chapter
    if payload.reading_time_minutes is not None:
        progress.reading_time_minutes += payload.reading_time_minutes
    if payload.is_favorite is not None:
        progress.is_favorite = payload.is_favorite

    progress.last_read_at = datetime.now(timezone.utc)
    if progress.started_at is None:
        progress.started_at = progress.last_read_at
    if item.total_chapters and item.total_chapters > 0:
        progress.reading_percentage = _compute_percentage(progress.current_chapter, item.total_chapters)
    else:
        progress.reading_percentage = 0.0

    action = "Chapter Updated"
    if progress.current_chapter > 0 and progress.started_at is not None and progress.started_at == progress.last_read_at:
        action = "Started"

    history_entry = ReadingHistory(
        user_id=current_user.id,
        library_item_id=item.id,
        chapter_read=progress.current_chapter,
        action=action,
    )
    db.add(history_entry)
    db.commit()
    db.refresh(progress)
    return progress


def mark_completed(db: Session, current_user: User, item_id: int) -> LibraryItem:
    item = db.get(LibraryItem, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Library item not found")

    progress = _ensure_progress_record(db, current_user, item)
    progress.current_chapter = item.total_chapters or progress.current_chapter
    progress.completed_at = datetime.now(timezone.utc)
    progress.last_read_at = progress.completed_at
    progress.reading_percentage = 100.0
    item.status = "Completed"

    db.add(ReadingHistory(user_id=current_user.id, library_item_id=item.id, chapter_read=progress.current_chapter, action="Completed"))
    db.commit()
    db.refresh(item)
    return item


def mark_dropped(db: Session, current_user: User, item_id: int) -> LibraryItem:
    item = db.get(LibraryItem, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Library item not found")

    progress = _ensure_progress_record(db, current_user, item)
    progress.completed_at = datetime.now(timezone.utc)
    progress.last_read_at = progress.completed_at
    item.status = "Dropped"

    db.add(ReadingHistory(user_id=current_user.id, library_item_id=item.id, chapter_read=progress.current_chapter, action="Dropped"))
    db.commit()
    db.refresh(item)
    return item


def get_continue_reading(db: Session, current_user: User) -> list[ReadingProgress]:
    return db.scalars(
        select(ReadingProgress)
        .where(ReadingProgress.user_id == current_user.id)
        .where(ReadingProgress.current_chapter > 0)
        .order_by(ReadingProgress.last_read_at.desc())
    ).all()


def get_recent_history(db: Session, current_user: User) -> list[ReadingHistory]:
    return db.scalars(
        select(ReadingHistory)
        .where(ReadingHistory.user_id == current_user.id)
        .order_by(ReadingHistory.created_at.desc())
    ).all()
