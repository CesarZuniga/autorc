---
title: Electron
category: Desktop
scope: always
---

- Keep `nodeIntegration` off and `contextIsolation` on; expose a minimal API via preload + `contextBridge`.
- Validate and whitelist every IPC channel; never trust renderer input.
- Enable `sandbox`; restrict `webSecurity` relaxations; set a strict CSP.
- Keep privileged work in the main process; treat the renderer as untrusted.
- Load only trusted content; block/limit new-window and navigation events.
