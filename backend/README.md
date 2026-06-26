# Arcana Backend

This backend scaffold establishes the initial architecture for the Arcana platform using FastAPI, SQLAlchemy, SQLite, JWT-ready configuration, and Alembic-oriented structure.

## Structure

- app/api - API entry points and routers
- app/core - configuration and security placeholders
- app/database - SQLAlchemy connection and session setup
- app/models - ORM models
- app/schemas - Pydantic schemas
- app/services - service layer hooks
- app/utils - shared helpers
- app/middleware - middleware package
- app/dependencies - reusable dependencies
- app/routers - route modules
- uploads - storage directory for future uploads
- tests - smoke tests and future coverage

## Current Status

- Project structure and boilerplate files created
- FastAPI app entry point configured
- Health check endpoint available
- Authentication implementation is intentionally deferred pending approval

## Next Steps

Install dependencies and run the application locally with:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```
