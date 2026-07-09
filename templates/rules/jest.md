---
title: Jest
category: Testing
scope: glob
globs: ["**/*.test.ts","**/*.test.js","**/*.spec.ts"]
---

- One behavior per test; clear, intention-revealing names.
- Reset/restore mocks between tests (`clearMocks`/`restoreMocks`); keep tests isolated.
- Mock only external boundaries; avoid mocking what you own.
- Use fake timers for time-dependent code; avoid arbitrary waits.
- Prefer explicit assertions over snapshot sprawl; keep snapshots small and reviewed.
