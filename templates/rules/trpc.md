---
title: tRPC
category: API
scope: always
---

- Validate every procedure's input with a schema (zod); infer types end to end.
- Split routers by domain; keep `context` minimal, typed, and created per request.
- Use middleware for auth/logging; `protectedProcedure` for authenticated routes.
- Distinguish queries (reads) from mutations (writes); throw `TRPCError` with proper codes.
- Never expose the router types' internals to untrusted input — the schema is the gate.
