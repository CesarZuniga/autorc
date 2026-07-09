---
title: Node.js
category: Runtime
scope: always
---

- Import core modules with the `node:` prefix (`node:fs`, `node:path`).
- Use ESM (`"type": "module"`) and top-level `await` where the target supports it.
- Prefer async/await; never leave a promise unhandled — attach `.catch` or `await`.
- Read config from `process.env`; validate it at startup; never hardcode secrets.
- Stream large I/O instead of buffering; use `pipeline` for backpressure and cleanup.
- Handle `unhandledRejection`/`uncaughtException` at the process edge; fail fast and log.
- Pin the engine in `package.json` `engines`; keep dependencies lean and audited.
