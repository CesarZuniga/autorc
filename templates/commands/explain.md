---
name: explain
description: Explain how a piece of code works
argument-hint: <path or symbol>
generic: true
order: 9
---

Explain $ARGUMENTS.

- Trace the real code path; reference `file:line`.
- Cover the purpose, the data flow, and any non-obvious decisions.
- Call out edge cases, gotchas, and coupling to other modules.
- Do not restate the obvious line by line.
