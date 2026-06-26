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


def test_reading_progress_flow() -> None:
    token = create_user_and_token("reader", "reader@example.com")

    library = make_request(
        "post",
        "/libraries",
        headers={"Authorization": f"Bearer {token}"},
        json={"name": "My Reads", "visibility": "private"},
    ).json()
    item = make_request(
        "post",
        f"/libraries/{library['id']}/items",
        headers={"Authorization": f"Bearer {token}"},
        json={"title": "Roxana", "status": "Reading", "total_chapters": 110},
    ).json()

    progress_response = make_request(
        "put",
        f"/reading/progress/{item['id']}",
        headers={"Authorization": f"Bearer {token}"},
        json={"current_chapter": 12, "reading_time_minutes": 30, "is_favorite": True},
    )
    assert progress_response.status_code == 200
    payload = progress_response.json()
    assert payload["current_chapter"] == 12
    assert payload["reading_percentage"] == 10.9

    complete_response = make_request(
        "post",
        f"/reading/complete/{item['id']}",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert complete_response.status_code == 200
    assert complete_response.json()["status"] == "Completed"

    dropped_response = make_request(
        "post",
        f"/reading/drop/{item['id']}",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert dropped_response.status_code == 200
    assert dropped_response.json()["status"] == "Dropped"

    continue_response = make_request("get", "/reading/continue", headers={"Authorization": f"Bearer {token}"})
    assert continue_response.status_code == 200
    assert len(continue_response.json()) == 1

    history_response = make_request("get", "/reading/history", headers={"Authorization": f"Bearer {token}"})
    assert history_response.status_code == 200
    assert len(history_response.json()) >= 3
