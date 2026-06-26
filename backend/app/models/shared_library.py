from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class SharedLibrary(Base):
    __tablename__ = "shared_libraries"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    library_id: Mapped[int] = mapped_column(ForeignKey("libraries.id", ondelete="CASCADE"), nullable=False, unique=True, index=True)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    invite_code: Mapped[str | None] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    library: Mapped["Library"] = relationship()
    owner: Mapped["User"] = relationship()
    members: Mapped[list["SharedLibraryMember"]] = relationship(back_populates="shared_library", cascade="all, delete-orphan")
    invitations: Mapped[list["LibraryInvitation"]] = relationship(back_populates="shared_library", cascade="all, delete-orphan")
    activity: Mapped[list["SharedLibraryActivity"]] = relationship(back_populates="shared_library", cascade="all, delete-orphan")


class SharedLibraryMember(Base):
    __tablename__ = "shared_library_members"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    shared_library_id: Mapped[int] = mapped_column(ForeignKey("shared_libraries.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    role: Mapped[str] = mapped_column(String(20), nullable=False, default="Viewer")
    joined_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    shared_library: Mapped[SharedLibrary] = relationship(back_populates="members")
    user: Mapped["User"] = relationship()


class LibraryInvitation(Base):
    __tablename__ = "library_invitations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    shared_library_id: Mapped[int] = mapped_column(ForeignKey("shared_libraries.id", ondelete="CASCADE"), nullable=False, index=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    recipient_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="Pending")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    shared_library: Mapped[SharedLibrary] = relationship(back_populates="invitations")
    sender: Mapped["User"] = relationship(foreign_keys=[sender_id])
    recipient: Mapped["User"] = relationship(foreign_keys=[recipient_id])


class SharedLibraryActivity(Base):
    __tablename__ = "shared_library_activity"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    shared_library_id: Mapped[int] = mapped_column(ForeignKey("shared_libraries.id", ondelete="CASCADE"), nullable=False, index=True)
    actor_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    action: Mapped[str] = mapped_column(String(100), nullable=False)
    target: Mapped[str | None] = mapped_column(String(100), nullable=True)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    shared_library: Mapped[SharedLibrary] = relationship(back_populates="activity")
    actor: Mapped["User"] = relationship()
