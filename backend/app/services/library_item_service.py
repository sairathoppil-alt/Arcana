from fastapi import HTTPException, status
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.models.genre import Genre
from app.models.library import Library
from app.models.library_item import LibraryItem, ReadingLink
from app.models.tag import Tag
from app.models.user import User
from app.schemas.library_item import LibraryItemCreate, LibraryItemResponse, LibraryItemUpdate, ReadingLinkResponse


def serialize_library_item(item: LibraryItem) -> LibraryItemResponse:
    return LibraryItemResponse(
        id=item.id,
        library_id=item.library_id,
        title=item.title,
        poster_url=item.poster_url,
        author=item.author,
        artist=item.artist,
        status=item.status,
        current_chapter=item.current_chapter,
        total_chapters=item.total_chapters,
        rating=item.rating,
        favorite=item.favorite,
        reading_state=item.reading_state,
        tropes=item.tropes,
        notes=item.notes,
        genres=[genre.name for genre in item.genres],
        tags=[tag.name for tag in item.tags],
        reading_links=[ReadingLinkResponse(id=link.id, label=link.label, url=link.url) for link in item.reading_links],
        date_added=item.date_added,
        last_updated=item.last_updated,
    )


def _get_library_for_user(db: Session, current_user: User, library_id: int) -> Library:
    library = db.get(Library, library_id)
    if library is None:
        raise HTTPException(status_code=404, detail="Library not found")
    if library.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this library")
    return library


def _sync_relationships(db: Session, item: LibraryItem, genre_names: list[str] | None, tag_names: list[str] | None) -> None:
    if genre_names is not None:
        item.genres = []
        for genre_name in genre_names:
            genre = db.scalar(select(Genre).where(Genre.name == genre_name.strip()))
            if genre is None:
                genre = Genre(name=genre_name.strip())
                db.add(genre)
                db.flush()
            item.genres.append(genre)

    if tag_names is not None:
        item.tags = []
        for tag_name in tag_names:
            tag = db.scalar(select(Tag).where(Tag.name == tag_name.strip()))
            if tag is None:
                tag = Tag(name=tag_name.strip())
                db.add(tag)
                db.flush()
            item.tags.append(tag)


def add_library_item(db: Session, current_user: User, library_id: int, library_item_in: LibraryItemCreate) -> LibraryItem:
    library = _get_library_for_user(db, current_user, library_id)
    item = LibraryItem(
        library_id=library.id,
        title=library_item_in.title.strip(),
        poster_url=library_item_in.poster_url,
        author=library_item_in.author,
        artist=library_item_in.artist,
        status=library_item_in.status,
        current_chapter=library_item_in.current_chapter,
        total_chapters=library_item_in.total_chapters,
        rating=library_item_in.rating,
        favorite=library_item_in.favorite,
        reading_state=library_item_in.reading_state,
        tropes=library_item_in.tropes,
        notes=library_item_in.notes,
    )
    db.add(item)
    db.flush()
    _sync_relationships(db, item, library_item_in.genres, library_item_in.tags)
    if library_item_in.reading_links:
        item.reading_links = [ReadingLink(label=link.label, url=link.url) for link in library_item_in.reading_links]
    db.commit()
    db.refresh(item)
    return item


def update_library_item(
    db: Session,
    current_user: User,
    library_id: int,
    item_id: int,
    library_item_in: LibraryItemUpdate,
) -> LibraryItem:
    library = _get_library_for_user(db, current_user, library_id)
    item = db.get(LibraryItem, item_id)
    if item is None or item.library_id != library.id:
        raise HTTPException(status_code=404, detail="Library item not found")

    if library_item_in.title is not None:
        item.title = library_item_in.title.strip()
    if library_item_in.poster_url is not None:
        item.poster_url = library_item_in.poster_url
    if library_item_in.author is not None:
        item.author = library_item_in.author
    if library_item_in.artist is not None:
        item.artist = library_item_in.artist
    if library_item_in.status is not None:
        item.status = library_item_in.status
    if library_item_in.current_chapter is not None:
        item.current_chapter = library_item_in.current_chapter
    if library_item_in.total_chapters is not None:
        item.total_chapters = library_item_in.total_chapters
    if library_item_in.rating is not None:
        item.rating = library_item_in.rating
    if library_item_in.favorite is not None:
        item.favorite = library_item_in.favorite
    if library_item_in.reading_state is not None:
        item.reading_state = library_item_in.reading_state
    if library_item_in.tropes is not None:
        item.tropes = library_item_in.tropes
    if library_item_in.notes is not None:
        item.notes = library_item_in.notes

    if library_item_in.genres is not None:
        item.genres = []
        for genre_name in library_item_in.genres:
            genre = db.scalar(select(Genre).where(Genre.name == genre_name.strip()))
            if genre is None:
                genre = Genre(name=genre_name.strip())
                db.add(genre)
                db.flush()
            item.genres.append(genre)
    if library_item_in.tags is not None:
        item.tags = []
        for tag_name in library_item_in.tags:
            tag = db.scalar(select(Tag).where(Tag.name == tag_name.strip()))
            if tag is None:
                tag = Tag(name=tag_name.strip())
                db.add(tag)
                db.flush()
            item.tags.append(tag)
    if library_item_in.reading_links is not None:
        item.reading_links = [ReadingLink(label=link.label, url=link.url) for link in library_item_in.reading_links]

    db.commit()
    db.refresh(item)
    return item


def delete_library_item(db: Session, current_user: User, library_id: int, item_id: int) -> None:
    library = _get_library_for_user(db, current_user, library_id)
    item = db.get(LibraryItem, item_id)
    if item is None or item.library_id != library.id:
        raise HTTPException(status_code=404, detail="Library item not found")
    db.delete(item)
    db.commit()


def get_library_item(db: Session, current_user: User, library_id: int, item_id: int) -> LibraryItem:
    library = _get_library_for_user(db, current_user, library_id)
    item = db.get(LibraryItem, item_id)
    if item is None or item.library_id != library.id:
        raise HTTPException(status_code=404, detail="Library item not found")
    return item


def list_library_items(
    db: Session,
    current_user: User,
    library_id: int,
    status: str | None = None,
    genre: str | None = None,
    tag: str | None = None,
    rating: float | None = None,
    favorite: bool | None = None,
    title: str | None = None,
) -> list[LibraryItem]:
    library = _get_library_for_user(db, current_user, library_id)
    query = select(LibraryItem).where(LibraryItem.library_id == library.id)

    if status:
        query = query.where(LibraryItem.status == status)
    if genre:
        query = query.join(LibraryItem.genres).where(Genre.name == genre)
    if tag:
        query = query.join(LibraryItem.tags).where(Tag.name == tag)
    if rating is not None:
        query = query.where(LibraryItem.rating == rating)
    if favorite is not None:
        query = query.where(LibraryItem.favorite.is_(favorite))
    if title:
        query = query.where(or_(LibraryItem.title.ilike(f"%{title}%"), LibraryItem.tropes.ilike(f"%{title}%")))

    query = query.order_by(LibraryItem.date_added.desc())
    return db.scalars(query).unique().all()


def search_library_items(db: Session, current_user: User, library_id: int, **filters: object) -> list[LibraryItem]:
    return list_library_items(db, current_user, library_id, **filters)
