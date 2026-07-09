---
title: Astro
category: Framework
scope: always
---

- Ship zero JS by default; add `client:*` directives only where interactivity is needed (prefer `client:visible`).
- Keep content in content collections with typed Zod schemas; query via the content APIs.
- Do data fetching in component frontmatter (server-side) at build/request time.
- Use `.astro` for static markup; reach for a UI framework island only when necessary.
- Pick output mode intentionally (static vs server/hybrid) and mark dynamic routes with `prerender`.
- Scope styles in `.astro` files; keep global styles deliberate.
