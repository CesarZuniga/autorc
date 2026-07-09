---
name: optimize
description: Find and fix a performance bottleneck
argument-hint: [target]
---

Optimize the performance of $ARGUMENTS.

1. Measure first — identify the actual hot path or slow query; do not guess.
2. State the bottleneck and its cost (N+1, allocation, sync I/O, big-O).
3. Apply the fix that keeps behavior identical (batch, cache, index, memoize).
4. Re-measure to confirm the win; report before/after.
5. Avoid premature micro-optimizations that hurt readability.
