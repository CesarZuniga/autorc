---
name: deps
description: Audit and update dependencies
argument-hint: [package]
---

Audit dependencies$ARGUMENTS.

1. Detect the package manager and lockfile.
2. List outdated packages and known vulnerabilities (audit command).
3. Update safe (patch/minor) versions first; hold majors for review.
4. Run build + tests after updates; roll back any that break.
5. Summarize what changed, what needs a manual major bump, and open CVEs.
