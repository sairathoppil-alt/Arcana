from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Table, Text, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base

library_item_genres = Table(
    "library_item_genres",
    Base.metadata,
    Column("library_item_id", ForeignKey("library_items.id", ondelete="CASCADE"), primary_key=True),
    Column("genre_id", ForeignKey("genres.id", ondelete="CASCADE"), primary_key=True),
)

library_item_tags = Table(
    "library_item_tags",
    Base.metadata,
    Column("library_item_id", ForeignKey("library_items.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)


class LibraryItem(Base):
    __tablename__ = "library_items"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    library_id: Mapped[int] = mapped_column(ForeignKey("libraries.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    poster_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    author: Mapped[str | None] = mapped_column(String(200), nullable=True)
    artist: Mapped[str | None] = mapped_column(String(200), nullable=True)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="Reading")
    current_chapter: Mapped[int | None] = mapped_column(nullable=True)
    total_chapters: Mapped[int | None] = mapped_column(nullable=True)
    rating: Mapped[float | None] = mapped_column(nullable=True)
    favorite: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    reading_state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    tropes: Mapped[str | None] = mapped_column(String(500), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    date_added: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    last_updated: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    library: Mapped["Library"] = relationship(back_populates="items")
    genres: Mapped[list["Genre"]] = relationship(secondary=library_item_genres, lazy="selectin")
    tags: Mapped[list["Tag"]] = relationship(secondary=library_item_tags, lazy="selectin")
    reading_links: Mapped[list["ReadingLink"]] = relationship(back_populates="library_item", cascade="all, delete-orphan")


class ReadingLink(Base):
    __tablename__ = "reading_links"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    library_item_id: Mapped[int] = mapped_column(ForeignKey("library_items.id", ondelete="CASCADE"), nullable=False, index=True)
    label: Mapped[str] = mapped_column(String(100), nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=False)

    library_item: Mapped[LibraryItem] = relationship(back_populates="reading_links")
