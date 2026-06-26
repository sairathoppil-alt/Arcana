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


def create_shared_library_for(owner_token: str, member_token: str, member_id: int, library_name: str) -> int:
    library = make_request(
        "post",
        "/libraries",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"name": library_name, "visibility": "private"},
    ).json()

    shared = make_request(
        "post",
        "/shared-libraries",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"library_id": library["id"], "display_name": "Discussion Circle", "description": "A shared space"},
    ).json()

    invite = make_request(
        "post",
        f"/shared-libraries/{shared['id']}/invite",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"recipient_id": member_id},
    ).json()

    make_request(
        "post",
        f"/shared-libraries/invitations/{invite['id']}/accept",
        headers={"Authorization": f"Bearer {member_token}"},
    )
    return shared["id"]


def test_discussions_and_comments_flow() -> None:
    owner_token, _ = create_user_and_token("owner", "owner@example.com")
    editor_token, editor_id = create_user_and_token("editor", "editor@example.com")
    viewer_token, viewer_id = create_user_and_token("viewer", "viewer@example.com")

    shared_library_id = create_shared_library_for(owner_token, editor_token, editor_id, "Discussion Library")

    invite = make_request(
        "post",
        f"/shared-libraries/{shared_library_id}/invite",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"recipient_id": viewer_id},
    ).json()

    make_request(
        "post",
        f"/shared-libraries/invitations/{invite['id']}/accept",
        headers={"Authorization": f"Bearer {viewer_token}"},
    )

    make_request(
        "patch",
        f"/shared-libraries/{shared_library_id}/members/{editor_id}/role",
        headers={"Authorization": f"Bearer {owner_token}"},
        json={"role": "Editor"},
    )

    viewer_create = make_request(
        "post",
        f"/shared-libraries/{shared_library_id}/threads",
        headers={"Authorization": f"Bearer {viewer_token}"},
        json={"title": "Viewer thread"},
    )
    assert viewer_create.status_code == 403

    thread = make_request(
        "post",
        f"/shared-libraries/{shared_library_id}/threads",
        headers={"Authorization": f"Bearer {editor_token}"},
        json={"title": "Design discussion"},
    )
    assert thread.status_code == 200
    thread_payload = thread.json()
    assert thread_payload["title"] == "Design discussion"

    comments = make_request(
        "post",
        f"/threads/{thread_payload['id']}/comments",
        headers={"Authorization": f"Bearer {editor_token}"},
        json={"content": "Initial comment"},
    )
    assert comments.status_code == 200
    comment_payload = comments.json()
    assert comment_payload["content"] == "Initial comment"

    reply = make_request(
        "post",
        f"/comments/{comment_payload['id']}/reply",
        headers={"Authorization": f"Bearer {editor_token}"},
        json={"content": "Reply to initial"},
    )
    assert reply.status_code == 200
    reply_payload = reply.json()
    assert reply_payload["parent_comment_id"] == comment_payload["id"]

    edited = make_request(
        "put",
        f"/comments/{comment_payload['id']}",
        headers={"Authorization": f"Bearer {editor_token}"},
        json={"content": "Edited initial comment"},
    )
    assert edited.status_code == 200
    assert edited.json()["edited"] is True

    reaction = make_request(
        "post",
        f"/comments/{comment_payload['id']}/reaction",
        headers={"Authorization": f"Bearer {editor_token}"},
        json={"reaction": "❤️"},
    )
    assert reaction.status_code == 200

    thread_comments = make_request(
        "get",
        f"/threads/{thread_payload['id']}",
        headers={"Authorization": f"Bearer {editor_token}"},
    )
    assert thread_comments.status_code == 200
    assert len(thread_comments.json()["comments"]) == 2

    delete_comment = make_request(
        "delete",
        f"/comments/{comment_payload['id']}",
        headers={"Authorization": f"Bearer {editor_token}"},
    )
    assert delete_comment.status_code == 200
