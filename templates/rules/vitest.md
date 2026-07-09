---
title: Vitest
category: Testing
scope: glob
globs: ["**/*.test.ts","**/*.test.tsx","**/*.spec.ts"]
---

- One behavior per test; follow arrange-act-assert with clear names.
- Prefer real modules; mock only true boundaries (network, clock, fs) and restore after.
- Use `vi.useFakeTimers`/`vi.setSystemTime` for time; never sleep in tests.
- Keep tests isolated and deterministic; no shared mutable state across tests.
- Co-locate tests with source; assert on behavior/output, not implementation details.
