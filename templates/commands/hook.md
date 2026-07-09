---
name: hook
description: Create a reusable custom hook
argument-hint: <useName>
---

Create a custom hook `$ARGUMENTS` following this project's conventions.

- Encapsulate one concern; return a stable, typed API.
- Clean up effects; no work on every render without need.
- Colocate its test if the project tests hooks.
