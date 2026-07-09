---
title: Prisma
category: Data
scope: always
---

- Change `schema.prisma`, then generate a migration (`prisma migrate`); never hand-edit the DB.
- Select only needed fields (`select`/`include`); avoid over-fetching relations.
- Instantiate a single `PrismaClient` (singleton) and reuse it; disconnect on shutdown.
- Batch related writes in `$transaction`; avoid N+1 by loading relations in one query.
- Keep the datasource URL in env; run `migrate deploy` in CI/CD, not `migrate dev`.
