---
title: Deno
category: Runtime
scope: always
---

- Import via `jsr:`/`npm:`/URL specifiers pinned through the import map in `deno.json`.
- Grant only the permissions the task needs (`--allow-read=...`), never blanket `-A` in prod.
- Use the standard library and Web APIs before reaching for third-party deps.
- Format/lint/test with the built-in toolchain (`deno fmt`/`lint`/`test`).
