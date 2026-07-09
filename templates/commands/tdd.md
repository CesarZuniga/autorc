---
name: tdd
description: Drive a change with a test-first cycle
argument-hint: <behavior>
---

Build $ARGUMENTS using a strict red-green-refactor cycle.

1. Red: write the smallest failing test for the next slice of behavior. Run it, see it fail.
2. Green: write the minimal code to pass. Run tests.
3. Refactor: clean up while green; no behavior change.
4. Repeat until the behavior is complete. Keep each cycle small.
