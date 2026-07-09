---
title: Vite
category: Tooling
scope: always
---

- Keep config minimal; prefer official framework plugins.
- Use `import.meta.env` for env; only `VITE_`-prefixed vars reach the client.
- Rely on native ESM in dev; configure `build.rollupOptions`/manualChunks only when needed.
- Use `import.meta.glob` for dynamic imports; avoid eager-importing large trees.
- Keep secrets out of client env; put server-only config elsewhere.
