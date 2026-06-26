from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProgressUpdate(BaseModel):
    current_chapter: int | None = None
    reading_time_minutes: int | None = None
    is_favorite: bool | None = None


class ReadingProgressResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    library_item_id: int
    user_id: int
    current_chapter: int
    last_read_at: datetime | None = None
    started_at: datetime | None = None
    completed_at: datetime | None = None
    reading_time_minutes: int
    reading_percentage: float
    is_favorite: bool


class ReadingHistoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    library_item_id: int
    chapter_read: int
    action: str
    created_at: datetime
