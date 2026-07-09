---
title: FastAPI
category: Backend
scope: always
---

- Define request/response models with Pydantic; set `response_model` for output filtering.
- Use dependency injection (`Depends`) for shared resources (db sessions, auth, settings).
- Use `async def` for I/O-bound endpoints; keep blocking work off the event loop.
- Raise `HTTPException` with explicit status codes; return typed models, not raw dicts.
- Group routes with `APIRouter`; version and tag them; let OpenAPI docs stay accurate.
- Load config via Pydantic `BaseSettings` from env; keep secrets out of code.
