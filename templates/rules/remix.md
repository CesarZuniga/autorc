---
title: Remix
category: Framework
scope: always
---

- Load data in `loader`, mutate in `action`; keep components thin and presentational.
- Use `<Form>`/`useFetcher` for progressive enhancement; avoid ad-hoc client fetches.
- Leverage nested routes for layout and parallel data loading; handle errors with error boundaries.
- Validate action input server-side; return typed responses with proper status codes.
- Keep secrets server-only; use `json`/`defer` for streaming where it helps.
