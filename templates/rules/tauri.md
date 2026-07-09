---
title: Tauri
category: Desktop
scope: always
---

- Restrict the capability/allowlist to only the commands and APIs the app actually uses.
- Validate all arguments on the Rust side of every `#[command]`.
- Keep privileged logic in Rust; treat the webview as untrusted input.
- Set a strict CSP; scope filesystem/shell access as narrowly as possible.
