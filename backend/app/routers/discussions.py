from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.schemas.discussion import (
    CommentReactionCreate,
    CommentReactionResponse,
    DiscussionCommentCreate,
    DiscussionCommentResponse,
    DiscussionCommentUpdate,
    DiscussionThreadCreate,
    DiscussionThreadDetailResponse,
    DiscussionThreadResponse,
    DiscussionThreadUpdate,
)
from app.services.auth_service import get_current_user
from app.services.discussion_service import (
    create_comment,
    create_thread,
    delete_comment,
    delete_thread,
    edit_comment,
    get_thread,
    list_threads,
    reply_to_comment,
    toggle_reaction,
    update_thread,
)

router = APIRouter(tags=["discussions"])
security = HTTPBearer()


def get_authenticated_user(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> User:
    if credentials is None or credentials.credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authentication token")
    return get_current_user(db, credentials.credentials)


@router.post("/shared-libraries/{shared_library_id}/threads", response_model=DiscussionThreadResponse)
def create_thread_endpoint(
    shared_library_id: int,
    payload: DiscussionThreadCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> DiscussionThreadResponse:
    return create_thread(db, current_user, shared_library_id, payload)


@router.get("/shared-libraries/{shared_library_id}/threads", response_model=list[DiscussionThreadResponse])
def list_threads_endpoint(
    shared_library_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> list[DiscussionThreadResponse]:
    return list_threads(db, current_user, shared_library_id)


@router.get("/threads/{thread_id}", response_model=DiscussionThreadDetailResponse)
def get_thread_endpoint(
    thread_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> DiscussionThreadDetailResponse:
    result = get_thread(db, current_user, thread_id)
    return DiscussionThreadDetailResponse(
        thread=result["thread"],
        comments=result["comments"],
    )


@router.put("/threads/{thread_id}", response_model=DiscussionThreadResponse)
def update_thread_endpoint(
    thread_id: int,
    payload: DiscussionThreadUpdate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> DiscussionThreadResponse:
    return update_thread(db, current_user, thread_id, payload)


@router.delete("/threads/{thread_id}")
def delete_thread_endpoint(
    thread_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> dict[str, str]:
    delete_thread(db, current_user, thread_id)
    return {"message": "Thread deleted successfully"}


@router.post("/threads/{thread_id}/comments", response_model=DiscussionCommentResponse)
def create_comment_endpoint(
    thread_id: int,
    payload: DiscussionCommentCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> DiscussionCommentResponse:
    return create_comment(db, current_user, thread_id, payload)


@router.put("/comments/{comment_id}", response_model=DiscussionCommentResponse)
def edit_comment_endpoint(
    comment_id: int,
    payload: DiscussionCommentUpdate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> DiscussionCommentResponse:
    return edit_comment(db, current_user, comment_id, payload)


@router.delete("/comments/{comment_id}", response_model=DiscussionCommentResponse)
def delete_comment_endpoint(
    comment_id: int,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> DiscussionCommentResponse:
    return delete_comment(db, current_user, comment_id)


@router.post("/comments/{comment_id}/reply", response_model=DiscussionCommentResponse)
def reply_to_comment_endpoint(
    comment_id: int,
    payload: DiscussionCommentCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> DiscussionCommentResponse:
    return reply_to_comment(db, current_user, comment_id, payload)


@router.post("/comments/{comment_id}/reaction", response_model=CommentReactionResponse | None)
def toggle_reaction_endpoint(
    comment_id: int,
    payload: CommentReactionCreate,
    current_user: User = Depends(get_authenticated_user),
    db: Session = Depends(get_db),
) -> CommentReactionResponse | None:
    return toggle_reaction(db, current_user, comment_id, payload)
