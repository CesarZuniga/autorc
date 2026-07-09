---
title: SolidJS
category: Framework
scope: glob
globs: ["**/*.tsx","**/*.jsx"]
---

- Signals are getters — call them (`count()`); never destructure reactive props (breaks tracking).
- Use `<For>`/`<Index>` and `<Show>` instead of `.map`/ternaries in JSX.
- Derive with `createMemo`; run side effects in `createEffect` with cleanup via `onCleanup`.
- Keep components as setup-once factories; logic outside JSX runs a single time.
- Use stores (`createStore`) for nested reactive state.
