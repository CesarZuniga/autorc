---
title: Hono
category: Backend
scope: always
---

- Define typed routes; validate input with the validator middleware (`zValidator`) per route.
- Return `c.json`/`c.text` with explicit status codes; use `HTTPException` for errors.
- Compose middleware with `app.use`; keep handlers small and typed via `Context`.
- Share types between server routes and client with `hc` (RPC) where useful.
- Read env from the runtime binding (`c.env`), not globals, for portability across runtimes.
