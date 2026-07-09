---
name: pr
description: Prepare a pull request for the current branch
argument-hint: [context]
generic: true
order: 10
---

Prepare a pull request for the current branch. Optional context: $ARGUMENTS.

1. Inspect: `git log --oneline main..HEAD`, `git diff --stat main...HEAD`.
2. Ensure the branch is pushed and up to date with the base.
3. Write a title (Conventional Commits style) and a body: what changed, why, how to test.
4. Note breaking changes and follow-ups. Do not include unrelated commits.
5. Open it with the project's tooling (e.g. `gh pr create`) after confirming.
