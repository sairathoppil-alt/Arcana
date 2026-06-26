from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class SharedLibraryCreate(BaseModel):
    library_id: int
    display_name: str = Field(..., min_length=1, max_length=100)
    description: str | None = None


class SharedLibraryUpdate(BaseModel):
    display_name: str | None = Field(default=None, min_length=1, max_length=100)
    description: str | None = None


class SharedLibraryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    library_id: int
    owner_id: int
    display_name: str
    description: str | None = None
    invite_code: str | None = None
    created_at: datetime
    updated_at: datetime


class SharedLibraryMemberResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    shared_library_id: int
    user_id: int
    role: str
    joined_at: datetime


class LibraryInvitationCreate(BaseModel):
    recipient_id: int


class LibraryInvitationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    shared_library_id: int
    sender_id: int
    recipient_id: int
    status: str
    created_at: datetime
    expires_at: datetime


class SharedLibraryActivityResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    shared_library_id: int
    actor_id: int
    action: str
    target: str | None = None
    timestamp: datetime
