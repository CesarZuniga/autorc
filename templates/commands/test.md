---
name: test
description: Run the test suite and triage failures
generic: true
order: 4
---

Run the project's test suite and triage failures.

1. Detect the test runner and command.
2. Run tests (scope to $ARGUMENTS if given).
3. For each failure: root cause, then minimal fix.
4. Re-run to confirm green.
