---
title: Express
category: Backend
scope: always
---

- Centralize error handling in one error middleware (4-arg signature); never leave throws unhandled.
- Validate and type request bodies/params/query at the boundary (zod/celebrate) before use.
- Keep routers thin; push business logic into services; wrap async handlers so rejections reach the error middleware.
- Apply security middleware: `helmet`, CORS allowlist, rate limiting, and body-size limits.
- Never trust client input in queries; use parameterized DB calls.
- Return explicit status codes and a consistent error shape.
