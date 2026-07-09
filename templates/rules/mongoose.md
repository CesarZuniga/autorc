---
title: Mongoose
category: Data
scope: always
---

- Define schemas with explicit types, `required`, defaults, and indexes for query paths.
- Use `lean()` for read-only queries; project only needed fields.
- Register indexes intentionally; watch for unbounded array growth.
- Validate at the schema level; handle `CastError`/`ValidationError` explicitly.
- Reuse one connection; avoid N+1 by using `populate` selectively or aggregation.
