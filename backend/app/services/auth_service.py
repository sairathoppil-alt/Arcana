from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import HTTPException, status
from jose import JWTError, jwt
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password, verify_password
from app.models.user import User
from app.schemas.auth import TokenPayload, UserCreate, UserLogin


def register_user(db: Session, user_in: UserCreate) -> User:
    normalized_username = user_in.username.strip()
    normalized_email = user_in.email.strip().lower()

    existing_username = db.scalar(select(User).where(User.username == normalized_username))
    if existing_username is not None:
        raise HTTPException(status_code=409, detail="Username already exists")

    existing_email = db.scalar(select(User).where(User.email == normalized_email))
    if existing_email is not None:
        raise HTTPException(status_code=409, detail="Email already exists")

    user = User(
        username=normalized_username,
        email=normalized_email,
        password_hash=hash_password(user_in.password),
        profile_picture=user_in.profile_picture,
        bio=user_in.bio,
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, credentials: UserLogin) -> User:
    normalized_email = credentials.email.strip().lower()
    user = db.scalar(select(User).where(User.email == normalized_email))

    if user is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return user


def create_access_token(subject: str) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_access_token_expire_minutes)
    payload = {"sub": subject, "exp": expires_at}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def verify_access_token(token: str) -> TokenPayload:
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid or expired token") from exc

    return TokenPayload(**payload)


def get_current_user(db: Session, token: str) -> User:
    payload = verify_access_token(token)
    if payload.sub is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    try:
        user_id = int(payload.sub)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail="Invalid token subject") from exc

    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user
