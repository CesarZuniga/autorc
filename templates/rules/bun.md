---
title: Bun
category: Runtime
scope: always
---

- Prefer Bun-native APIs (`Bun.file`, `Bun.serve`, `Bun.sql`) where they replace dependencies.
- Use the built-in test runner (`bun test`) and bundler before adding external tooling.
- Rely on Bun's fast install + `bun.lock`; commit the lockfile.
- Read secrets from env (Bun auto-loads `.env`); keep them out of source.
