from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.library import Library
from app.models.user import User
from app.schemas.library import LibraryCreate, LibraryUpdate


def create_library(db: Session, owner: User, library_in: LibraryCreate) -> Library:
    existing = db.scalar(select(Library).where(Library.owner_id == owner.id, Library.name == library_in.name.strip()))
    if existing is not None:
        raise HTTPException(status_code=409, detail="Library name already exists")

    library = Library(
        owner_id=owner.id,
        name=library_in.name.strip(),
        description=library_in.description,
        cover_image=library_in.cover_image,
        visibility=library_in.visibility,
    )
    db.add(library)
    db.commit()
    db.refresh(library)
    return library


def update_library(db: Session, owner: User, library_id: int, library_in: LibraryUpdate) -> Library:
    library = db.get(Library, library_id)
    if library is None:
        raise HTTPException(status_code=404, detail="Library not found")
    if library.owner_id != owner.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this library")

    if library_in.name is not None:
        existing = db.scalar(
            select(Library).where(Library.owner_id == owner.id, Library.name == library_in.name.strip(), Library.id != library_id)
        )
        if existing is not None:
            raise HTTPException(status_code=409, detail="Library name already exists")
        library.name = library_in.name.strip()

    if library_in.description is not None:
        library.description = library_in.description
    if library_in.cover_image is not None:
        library.cover_image = library_in.cover_image
    if library_in.visibility is not None:
        library.visibility = library_in.visibility

    db.commit()
    db.refresh(library)
    return library


def delete_library(db: Session, owner: User, library_id: int) -> None:
    library = db.get(Library, library_id)
    if library is None:
        raise HTTPException(status_code=404, detail="Library not found")
    if library.owner_id != owner.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this library")

    db.delete(library)
    db.commit()


def get_library(db: Session, owner: User, library_id: int) -> Library:
    library = db.get(Library, library_id)
    if library is None:
        raise HTTPException(status_code=404, detail="Library not found")
    if library.owner_id != owner.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this library")
    return library


def list_user_libraries(db: Session, owner: User) -> list[Library]:
    return db.scalars(select(Library).where(Library.owner_id == owner.id).order_by(Library.created_at.desc())).all()
