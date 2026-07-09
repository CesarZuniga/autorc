---
title: Svelte
category: Framework
scope: glob
globs: ["**/*.svelte"]
---

- Prefer Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) in new code.
- Keep components small; move non-UI logic into `.svelte.ts` modules.
- Derive rather than duplicate: `$derived` over manually synced state.
- Use `$effect` only for true side effects; return a cleanup function.
- In SvelteKit, load data in `+page`/`+layout` `load`; mutate via form actions with progressive enhancement.
- Keep server-only secrets in `$env/dynamic/private` / `$env/static/private`.
