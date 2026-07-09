---
title: React
category: Framework
scope: glob
globs: ["**/*.tsx","**/*.jsx"]
---

- Function components + hooks only; no class components.
- Follow the Rules of Hooks: call them unconditionally at the top level, never in loops/conditions.
- Keep components pure during render; side effects belong in `useEffect`/event handlers.
- Give every `useEffect` a correct, exhaustive dependency array; clean up subscriptions/timers.
- Prefer derived values over state that mirrors props; don't store what you can compute.
- Lift state only as far as needed; colocate otherwise. Split contexts to limit re-renders.
- Memoize (`useMemo`/`useCallback`/`memo`) only where profiling shows a real cost.
- Keys must be stable and unique — never the array index for dynamic lists.
- Develop under `<StrictMode>`; use `useTransition`/`Suspense` for heavy updates and async UI.
