---
title: Turborepo
category: Tooling
scope: always
---

- Declare each task's `inputs`/`outputs` in `turbo.json` so caching is correct.
- Keep packages focused with explicit boundaries; avoid deep cross-package imports.
- Define task `dependsOn` (`^build`) to order the graph; let Turbo parallelize.
- Enable remote caching in CI; don't defeat the cache with nondeterministic outputs.
