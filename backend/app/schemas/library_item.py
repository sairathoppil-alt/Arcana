from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

VALID_STATUSES = {"Reading", "Completed", "On Hold", "Dropped", "Plan To Read"}


class ReadingLinkCreate(BaseModel):
    label: str
    url: str


class ReadingLinkResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    label: str
    url: str


class LibraryItemCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    poster_url: str | None = None
    author: str | None = None
    artist: str | None = None
    status: str = "Reading"
    current_chapter: int | None = None
    total_chapters: int | None = None
    rating: float | None = None
    favorite: bool = False
    reading_state: str | None = None
    tropes: str | None = None
    notes: str | None = None
    genres: list[str] | None = None
    tags: list[str] | None = None
    reading_links: list[ReadingLinkCreate] | None = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: str) -> str:
        if value not in VALID_STATUSES:
            raise ValueError("Invalid status")
        return value


class LibraryItemUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    poster_url: str | None = None
    author: str | None = None
    artist: str | None = None
    status: str | None = None
    current_chapter: int | None = None
    total_chapters: int | None = None
    rating: float | None = None
    favorite: bool | None = None
    reading_state: str | None = None
    tropes: str | None = None
    notes: str | None = None
    genres: list[str] | None = None
    tags: list[str] | None = None
    reading_links: list[ReadingLinkCreate] | None = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: str | None) -> str | None:
        if value is None:
            return None
        if value not in VALID_STATUSES:
            raise ValueError("Invalid status")
        return value


class LibraryItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    library_id: int
    title: str
    poster_url: str | None = None
    author: str | None = None
    artist: str | None = None
    status: str
    current_chapter: int | None = None
    total_chapters: int | None = None
    rating: float | None = None
    favorite: bool
    reading_state: str | None = None
    tropes: str | None = None
    notes: str | None = None
    genres: list[str]
    tags: list[str]
    reading_links: list[ReadingLinkResponse]
    date_added: datetime
    last_updated: datetime
