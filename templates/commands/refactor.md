---
name: refactor
description: Refactor code without changing behavior
argument-hint: [path or target]
generic: true
order: 5
---

Refactor $ARGUMENTS. Behavior must not change.

1. Read the target and its callers; note the current tests.
2. Ensure tests are green first; if none cover it, add a characterization test.
3. Apply small, safe steps: rename, extract, dedupe, simplify. One concern at a time.
4. Re-run tests after each step; keep the diff reviewable.
5. Summarize what changed and why it is equivalent.
