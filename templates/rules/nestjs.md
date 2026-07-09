---
title: NestJS
category: Backend
scope: always
---

- Keep controllers thin; business logic lives in providers/services.
- Validate DTOs with class-validator + a global `ValidationPipe` (`whitelist`, `transform`).
- Use dependency injection and module boundaries; avoid circular deps.
- Use guards for authz, interceptors for cross-cutting concerns, filters for errors.
- Type everything; prefer constructor injection; keep providers stateless.
- Configure via `@nestjs/config`; validate env schema at bootstrap.
