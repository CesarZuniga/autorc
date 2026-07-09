---
title: Angular
category: Framework
scope: always
---

- Use standalone components/directives/pipes; avoid NgModules in new code.
- Manage state with signals (`signal`, `computed`, `effect`); prefer the async pipe for observables.
- Use `inject()` for DI where it reads cleaner than constructor params.
- Use the built-in control flow (`@if`, `@for` with `track`, `@switch`).
- Set `changeDetection: OnPush`; keep templates free of heavy method calls.
- Unsubscribe (takeUntilDestroyed / async pipe); never leak subscriptions.
- Lazy-load routes; keep feature areas isolated.
