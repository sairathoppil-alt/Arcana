from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class DiscussionThreadCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)


class DiscussionThreadUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    is_pinned: bool | None = None


class DiscussionCommentCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=4000)


class DiscussionCommentUpdate(BaseModel):
    content: str = Field(..., min_length=1, max_length=4000)


class CommentReactionCreate(BaseModel):
    reaction: Literal["❤️", "👍", "⭐", "😂", "🔥"]


class DiscussionThreadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    shared_library_id: int
    title: str
    created_by: int
    is_pinned: bool
    created_at: datetime
    updated_at: datetime


class DiscussionCommentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    thread_id: int
    author_id: int
    parent_comment_id: int | None = None
    content: str
    edited: bool
    created_at: datetime
    updated_at: datetime


class CommentReactionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    comment_id: int
    user_id: int
    reaction: str


class DiscussionThreadDetailResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    thread: DiscussionThreadResponse
    comments: list[DiscussionCommentResponse]
