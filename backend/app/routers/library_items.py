from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.library_item import LibraryItemCreate, LibraryItemResponse, LibraryItemUpdate
from app.services.auth_service import get_current_user
from app.services.library_item_service import (
    add_library_item,
    delete_library_item,
    get_library_item,
    list_library_items,
    search_library_items,
    serialize_library_item,
    update_library_item,
)

router = APIRouter(prefix="/libraries/{library_id}/items", tags=["library-items"])
security = HTTPBearer()


def get_authenticated_user(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:
    if credentials is None or credentials.credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authentication token")
    return get_current_user(db, credentials.credentials)


@router.post("", response_model=LibraryItemResponse)
def create_item_endpoint(
    library_id: int,
    item_in: LibraryItemCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryItemResponse:
    return serialize_library_item(add_library_item(db, current_user, library_id, item_in))


@router.get("", response_model=list[LibraryItemResponse])
def list_items_endpoint(
    library_id: int,
    status: str | None = Query(default=None),
    genre: str | None = Query(default=None),
    tag: str | None = Query(default=None),
    rating: float | None = Query(default=None),
    favorite: bool | None = Query(default=None),
    title: str | None = Query(default=None),
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[LibraryItemResponse]:
    items = list_library_items(db, current_user, library_id, status=status, genre=genre, tag=tag, rating=rating, favorite=favorite, title=title)
    return [serialize_library_item(item) for item in items]


@router.get("/{item_id}", response_model=LibraryItemResponse)
def get_item_endpoint(
    library_id: int,
    item_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryItemResponse:
    return serialize_library_item(get_library_item(db, current_user, library_id, item_id))


@router.put("/{item_id}", response_model=LibraryItemResponse)
def update_item_endpoint(
    library_id: int,
    item_id: int,
    item_in: LibraryItemUpdate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryItemResponse:
    return serialize_library_item(update_library_item(db, current_user, library_id, item_id, item_in))


@router.delete("/{item_id}")
def delete_item_endpoint(
    library_id: int,
    item_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    delete_library_item(db, current_user, library_id, item_id)
    return {"message": "Library item deleted successfully"}
