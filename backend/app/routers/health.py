from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health_check() -> dict[str, str]:
    """Simple health-check endpoint for infrastructure monitoring."""
    return {"status": "ok"}
