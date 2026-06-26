from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.database.base import Base
from app.database.session import engine
from app.models.library import Library  # noqa: F401
from app.models.user import User  # noqa: F401
from app.routers.auth import router as auth_router
from app.routers.discussions import router as discussions_router
from app.routers.health import router as health_router
from app.routers.library_items import router as library_items_router
from app.routers.libraries import router as libraries_router
from app.routers.reading import router as reading_router
from app.routers.shared_libraries import router as shared_libraries_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Professional backend scaffold for the Arcana platform.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(libraries_router)
app.include_router(library_items_router)
app.include_router(reading_router)
app.include_router(shared_libraries_router)
app.include_router(discussions_router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(status_code=400, content={"detail": exc.errors()})


@app.get("/")
async def root() -> dict[str, str]:
    """Basic root endpoint for application readiness."""
    return {"message": "Arcana API is running"}
