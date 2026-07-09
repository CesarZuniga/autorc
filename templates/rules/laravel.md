---
title: Laravel
category: Backend
scope: glob
globs: ["**/*.php"]
---

- Validate via Form Requests; keep controllers thin and RESTful.
- Use Eloquent relationships and eager loading (`with`) to avoid N+1.
- Use migrations, seeders, and factories; never edit applied migrations.
- Put reusable logic in service/action classes; keep queries in the model layer.
- Read config via `config()`/env; cache config/routes in production.
