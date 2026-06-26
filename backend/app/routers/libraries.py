from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.library import LibraryCreate, LibraryResponse, LibraryUpdate
from app.services.auth_service import get_current_user
from app.services.library_service import (
    create_library,
    delete_library,
    get_library,
    list_user_libraries,
    update_library,
)

router = APIRouter(prefix="/libraries", tags=["libraries"])
security = HTTPBearer()


def get_authenticated_user(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:
    if credentials is None or credentials.credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authentication token")
    return get_current_user(db, credentials.credentials)


@router.post("", response_model=LibraryResponse)
def create_library_endpoint(
    library_in: LibraryCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryResponse:
    return create_library(db, current_user, library_in)


@router.get("", response_model=list[LibraryResponse])
def list_libraries_endpoint(
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[LibraryResponse]:
    return list_user_libraries(db, current_user)


@router.get("/{library_id}", response_model=LibraryResponse)
def get_library_endpoint(
    library_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryResponse:
    return get_library(db, current_user, library_id)


@router.put("/{library_id}", response_model=LibraryResponse)
def update_library_endpoint(
    library_id: int,
    library_in: LibraryUpdate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> LibraryResponse:
    return update_library(db, current_user, library_id, library_in)


@router.delete("/{library_id}")
def delete_library_endpoint(
    library_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    delete_library(db, current_user, library_id)
    return {"message": "Library deleted successfully"}
