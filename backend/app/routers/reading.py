from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.reading_progress import ProgressUpdate, ReadingHistoryResponse, ReadingProgressResponse
from app.services.auth_service import get_current_user
from app.services.reading_progress_service import (
    get_continue_reading,
    get_recent_history,
    mark_completed,
    mark_dropped,
    update_progress,
)

router = APIRouter(prefix="/reading", tags=["reading"])
security = HTTPBearer()


def get_authenticated_user(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:
    if credentials is None or credentials.credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authentication token")
    return get_current_user(db, credentials.credentials)


@router.get("/continue", response_model=list[ReadingProgressResponse])
def continue_reading_endpoint(
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[ReadingProgressResponse]:
    return get_continue_reading(db, current_user)


@router.get("/history", response_model=list[ReadingHistoryResponse])
def history_endpoint(
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[ReadingHistoryResponse]:
    return get_recent_history(db, current_user)


@router.put("/progress/{item_id}", response_model=ReadingProgressResponse)
def update_progress_endpoint(
    item_id: int,
    payload: ProgressUpdate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> ReadingProgressResponse:
    return update_progress(db, current_user, item_id, payload)


@router.post("/complete/{item_id}")
def complete_item_endpoint(
    item_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> dict[str, object]:
    item = mark_completed(db, current_user, item_id)
    return {"message": "Item marked as completed", "status": item.status}


@router.post("/drop/{item_id}")
def drop_item_endpoint(
    item_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> dict[str, object]:
    item = mark_dropped(db, current_user, item_id)
    return {"message": "Item marked as dropped", "status": item.status}
