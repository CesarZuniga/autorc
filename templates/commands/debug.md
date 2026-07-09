---
name: debug
description: Diagnose and fix a bug from a report or failure
argument-hint: <symptom or error>
generic: true
order: 6
---

Diagnose and fix: $ARGUMENTS.

1. Reproduce the failure; capture the exact error and the minimal trigger.
2. Trace to root cause — read the code path, don't guess. State the cause.
3. Write a failing test that captures the bug.
4. Apply the minimal fix; make the test pass without breaking others.
5. Note any related spots with the same latent bug.
