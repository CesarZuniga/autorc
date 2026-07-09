---
name: feature
description: Implement a feature end to end
argument-hint: <description>
---

Implement the feature: $ARGUMENTS.

1. Clarify scope and acceptance criteria; ask only if genuinely blocked.
2. Locate the touch points; sketch the change across data → logic → UI/API.
3. Implement in small vertical slices, matching existing patterns.
4. Add tests for the new behavior; wire error handling and edge cases.
5. Run lint + tests; summarize what was built and what to verify manually.
