---
title: Flask
category: Backend
scope: always
---

- Organize routes with blueprints and the application-factory pattern.
- Validate input (pydantic/marshmallow); return explicit status codes.
- Manage config per environment via `app.config`/env; keep secrets out of code.
- Use extensions (SQLAlchemy, Migrate) idiomatically; scope db sessions to the request.
- Register error handlers for consistent JSON errors; don't leak stack traces in prod.
