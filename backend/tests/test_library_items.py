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


def test_library_item_crud_and_authorization() -> None:
    owner_token = create_user_and_token("owner", "owner@example.com")
    other_token = create_user_and_token("other", "other@example.com")

    library = make_request(
        "post",
        "/libraries",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"name": "My Reads", "description": "Favorites", "visibility": "private"},
    ).json()

    created = make_request(
        "post",
        f"/libraries/{library['id']}/items",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={
            "title": "Roxana",
            "poster_url": "https://example.com/poster.jpg",
            "author": "A. Author",
            "artist": "B. Artist",
            "status": "Reading",
            "current_chapter": 12,
            "total_chapters": 120,
            "rating": 4.8,
            "favorite": True,
            "reading_state": "In progress",
            "tropes": "Villainess, Revenge",
            "notes": "Great pacing",
            "genres": ["Romance", "Fantasy"],
            "tags": ["Revenge", "Villainess"],
            "reading_links": [{"label": "Official", "url": "https://example.com"}],
        },
    )
    assert created.status_code == 200
    item = created.json()
    assert item["title"] == "Roxana"
    assert item["genres"] == ["Romance", "Fantasy"]
    assert item["reading_links"][0]["label"] == "Official"

    forbidden = make_request(
        "post",
        f"/libraries/{library['id']}/items",
        headers={"Authorization": f"Bearer {other_token}"},
        json={"title": "Not Allowed"},
    )
    assert forbidden.status_code == 403

    fetched = make_request(
        "get",
        f"/libraries/{library['id']}/items/{item['id']}",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert fetched.status_code == 200
    assert fetched.json()["title"] == "Roxana"

    updated = make_request(
        "put",
        f"/libraries/{library['id']}/items/{item['id']}",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"status": "Completed", "rating": 5.0},
    )
    assert updated.status_code == 200
    assert updated.json()["status"] == "Completed"

    deleted = make_request(
        "delete",
        f"/libraries/{library['id']}/items/{item['id']}",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert deleted.status_code == 200


def test_library_items_filtering_and_search() -> None:
    owner_token = create_user_and_token("owner", "owner@example.com")

    library = make_request(
        "post",
        "/libraries",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"name": "My Reads", "visibility": "private"},
    ).json()

    make_request(
        "post",
        f"/libraries/{library['id']}/items",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={
            "title": "The Villainess Returns",
            "status": "Reading",
            "rating": 4.5,
            "favorite": True,
            "genres": ["Fantasy", "Romance"],
            "tags": ["Revenge", "Villainess"],
        },
    )
    make_request(
        "post",
        f"/libraries/{library['id']}/items",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={
            "title": "Moonlit Court",
            "status": "Completed",
            "rating": 5.0,
            "favorite": False,
            "genres": ["Historical", "Drama"],
            "tags": ["Slow Burn"],
        },
    )

    filtered = make_request(
        "get",
        f"/libraries/{library['id']}/items",
        headers={"Authorization": f"Bearer {owner_token}"},
        params={"status": "Completed", "favorite": "false", "genre": "Historical"},
    )
    assert filtered.status_code == 200
    payload = filtered.json()
    assert len(payload) == 1
    assert payload[0]["title"] == "Moonlit Court"

    searched = make_request(
        "get",
        f"/libraries/{library['id']}/items",
        headers={"Authorization": f"Bearer {owner_token}"},
        params={"title": "villainess"},
    )
    assert searched.status_code == 200
    assert searched.json()[0]["title"] == "The Villainess Returns"
