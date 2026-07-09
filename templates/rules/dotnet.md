---
title: .NET
category: Backend
scope: glob
globs: ["**/*.cs"]
---

- Use dependency injection and async/await end to end; avoid blocking on async (`.Result`/`.Wait`).
- Prefer records for DTOs and immutable data; enable nullable reference types.
- Validate input at the API boundary; return typed results and proper status codes.
- Use `IOptions`/configuration binding for settings; keep secrets in user-secrets/env.
- Follow standard analyzers; treat warnings as errors in CI.
