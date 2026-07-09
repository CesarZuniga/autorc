---
title: Zod
category: Validation
scope: glob
globs: ["**/*.ts","**/*.tsx"]
---

- One schema per boundary; infer types with `z.infer` — don't duplicate shapes by hand.
- Parse at the edges (env, request bodies, API responses, form input); pass typed data inward.
- Prefer `safeParse` where failure is expected; handle the error result explicitly.
- Compose with `.extend`/`.merge`/`.pick`; use `.transform`/`.refine` for derived/cross-field rules.
- Keep schemas as the single source of truth for both validation and types.
