---
title: ESLint
category: Tooling
scope: always
---

- Fix lint errors rather than disabling rules; inline disables need a reason comment.
- Keep one flat config as the source of truth; run lint in CI and pre-commit.
- Compose recommended + type-aware configs (typescript-eslint) for TS projects.
- Let a formatter (Prettier) own style; ESLint owns correctness rules.
