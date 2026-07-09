---
name: commit
description: Group changes into semantic commits
argument-hint: [context]
generic: true
order: 1
---

Group all current changes into meaningful semantic commits.

Optional context: $ARGUMENTS

Steps:
1. Inspect state: `git status --short`, `git diff --stat`, `git diff`.
2. Group files by intent (feat, fix, refactor, test, docs, chore).
3. Create one commit per independent change with a Conventional Commits message.
4. Never mix unrelated changes; never use `--no-verify`, `--amend`, or force push.
5. Before committing, scan for secrets (.env, tokens, keys). If found, stop and ask.
