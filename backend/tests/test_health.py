import asyncio

import httpx
import pytest

from app.database.base import Base
from app.database.session import engine
from app.main import app


def make_request(method: str, path: str, **kwargs: object) -> httpx.Response:
    async def _request() -> httpx.Response:
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
            return await client.request(method, path, **kwargs)

    return asyncio.run(_request())


@pytest.fixture(autouse=True)
def reset_db() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_health_endpoint() -> None:
    response = make_request("get", "/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_register_login_and_me_flow() -> None:
    register_response = make_request(
        "post",
        "/auth/register",
        json={
            "username": "alice",
            "email": "alice@example.com",
            "password": "secret123",
            "bio": "A curious reader",
        },
    )
    assert register_response.status_code == 200
    created_user = register_response.json()
    assert created_user["username"] == "alice"
    assert created_user["email"] == "alice@example.com"
    assert "password" not in created_user

    login_response = make_request(
        "post",
        "/auth/login",
        json={"email": "alice@example.com", "password": "secret123"},
    )
    assert login_response.status_code == 200
    login_payload = login_response.json()
    assert login_payload["token_type"] == "bearer"
    assert "access_token" in login_payload
    assert login_payload["user"]["email"] == "alice@example.com"

    me_response = make_request(
        "get",
        "/auth/me",
        headers={"Authorization": f"Bearer {login_payload['access_token']}"},
    )
    assert me_response.status_code == 200
    assert me_response.json()["username"] == "alice"


def test_duplicate_email_returns_conflict() -> None:
    first = make_request(
        "post",
        "/auth/register",
        json={"username": "alice", "email": "alice@example.com", "password": "secret123"},
    )
    assert first.status_code == 200

    second = make_request(
        "post",
        "/auth/register",
        json={"username": "bob", "email": "alice@example.com", "password": "secret123"},
    )
    assert second.status_code == 409
