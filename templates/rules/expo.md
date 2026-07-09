---
title: Expo / React Native
category: Mobile
scope: glob
globs: ["**/*.tsx","**/*.jsx"]
---

- Use Expo Router with typed routes; avoid ad-hoc navigation state.
- Keep native customization in config plugins (config as code); prefer the managed workflow.
- Test on both iOS and Android; account for platform differences and safe areas.
- Use `expo-*` modules over community forks where available; keep the SDK version aligned.
- Store secrets via env/EAS secrets, not in the bundle.
