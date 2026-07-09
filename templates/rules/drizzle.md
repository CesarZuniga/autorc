---
title: Drizzle ORM
category: Data
scope: always
---

- Define schema in TypeScript; generate/apply migrations via drizzle-kit — don't drift the DB.
- Select explicit columns; build queries with the typed query builder, not raw strings.
- Use prepared statements for hot paths; use transactions for multi-step writes.
- Infer row types from the schema (`$inferSelect`/`$inferInsert`); don't duplicate types.
- Keep the connection/client as a single shared instance.
