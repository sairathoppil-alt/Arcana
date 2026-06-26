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


def create_user_and_token(username: str, email: str) -> str:
    make_request(
        "post",
        "/auth/register",
        json={"username": username, "email": email, "password": "password123"},
    )
    login_response = make_request("post", "/auth/login", json={"email": email, "password": "password123"})
    return login_response.json()["access_token"]


def test_library_crud_and_permissions() -> None:
    owner_token = create_user_and_token("owner", "owner@example.com")
    other_token = create_user_and_token("other", "other@example.com")

    created = make_request(
        "post",
        "/libraries",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"name": "Fantasy Shelf", "description": "My favorite fantasy titles", "visibility": "private"},
    )
    assert created.status_code == 200
    payload = created.json()
    assert payload["name"] == "Fantasy Shelf"
    assert payload["owner_id"] == 1

    listed = make_request("get", "/libraries", headers={"Authorization": f"Bearer {owner_token}"})
    assert listed.status_code == 200
    assert len(listed.json()) == 1

    library_id = payload["id"]
    fetched = make_request("get", f"/libraries/{library_id}", headers={"Authorization": f"Bearer {owner_token}"})
    assert fetched.status_code == 200
    assert fetched.json()["name"] == "Fantasy Shelf"

    updated = make_request(
        "put",
        f"/libraries/{library_id}",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"name": "Updated Shelf", "visibility": "public"},
    )
    assert updated.status_code == 200
    assert updated.json()["name"] == "Updated Shelf"

    forbidden = make_request(
        "put",
        f"/libraries/{library_id}",
        headers={"Authorization": f"Bearer {other_token}"},
        json={"name": "Hacked"},
    )
    assert forbidden.status_code == 403

    deleted = make_request("delete", f"/libraries/{library_id}", headers={"Authorization": f"Bearer {owner_token}"})
    assert deleted.status_code == 200

    missing = make_request("get", f"/libraries/{library_id}", headers={"Authorization": f"Bearer {owner_token}"})
    assert missing.status_code == 404
