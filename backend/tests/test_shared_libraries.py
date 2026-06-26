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


def create_user_and_token(username: str, email: str) -> tuple[str, int]:
    make_request(
        "post",
        "/auth/register",
        json={"username": username, "email": email, "password": "password123"},
    )
    login_response = make_request("post", "/auth/login", json={"email": email, "password": "password123"})
    payload = login_response.json()
    return payload["access_token"], payload["user"]["id"]


def test_shared_library_crud_invitation_and_permissions() -> None:
    owner_token, owner_id = create_user_and_token("owner", "owner@example.com")
    editor_token, editor_id = create_user_and_token("editor", "editor@example.com")
    viewer_token, viewer_id = create_user_and_token("viewer", "viewer@example.com")

    library = make_request(
        "post",
        "/libraries",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"name": "Shared Shelf", "visibility": "private"},
    ).json()

    shared = make_request(
        "post",
        "/shared-libraries",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"library_id": library["id"], "display_name": "Arcana Circle", "description": "A shared library"},
    )
    assert shared.status_code == 200
    shared_payload = shared.json()
    assert shared_payload["display_name"] == "Arcana Circle"

    invite = make_request(
        "post",
        f"/shared-libraries/{shared_payload['id']}/invite",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"recipient_id": editor_id},
    )
    assert invite.status_code == 200
    invite_id = invite.json()["id"]

    accept = make_request(
        "post",
        f"/shared-libraries/invitations/{invite_id}/accept",
        headers={"Authorization": f"Bearer {editor_token}"},
    )
    assert accept.status_code == 200

    members = make_request(
        "get",
        f"/shared-libraries/{shared_payload['id']}/members",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert members.status_code == 200
    assert len(members.json()) >= 2

    role_change = make_request(
        "patch",
        f"/shared-libraries/{shared_payload['id']}/members/{editor_id}/role",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"role": "Viewer"},
    )
    assert role_change.status_code == 200

    remove = make_request(
        "delete",
        f"/shared-libraries/{shared_payload['id']}/members/{editor_id}",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert remove.status_code == 200

    activity = make_request(
        "get",
        f"/shared-libraries/{shared_payload['id']}/activity",
        headers={"Authorization": f"Bearer {owner_token}"},
    )
    assert activity.status_code == 200
    assert len(activity.json()) >= 1
