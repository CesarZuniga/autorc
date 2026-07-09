---
title: Ruby on Rails
category: Backend
scope: glob
globs: ["**/*.rb"]
---

- Fat models / skinny controllers; extract service objects and concerns as logic grows.
- Use strong parameters; validate at the model; use migrations for schema changes.
- Avoid N+1 with `includes`/`preload`; add DB indexes for lookups.
- Follow RESTful routes and conventions; keep callbacks predictable and minimal.
- Keep credentials in encrypted credentials/env, never in source.
