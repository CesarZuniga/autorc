---
name: fix
description: Run formatter + linter and fix simple issues
generic: true
order: 3
---

Format and lint the repo, fixing what is safe to auto-fix.

1. Detect the project's format/lint scripts from package config.
2. Run format, then lint --fix, then lint again.
3. Summarize remaining issues that need manual work.
Scope to $ARGUMENTS if paths are given.
