---
name: security
description: Audit the code/diff for security issues
argument-hint: [scope]
generic: true
order: 7
---

Security-review $ARGUMENTS (default: the working diff).

Check for: injection (SQL/command/template), authz/authn gaps, secrets in code,
unsafe deserialization, SSRF, path traversal, missing input validation, and
insecure defaults.
Report each as: `file:line` — issue — severity — concrete fix.
Rank by exploitability. Do not report theoretical issues without a path.
