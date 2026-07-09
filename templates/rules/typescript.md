---
title: TypeScript
category: Language
scope: glob
globs: ["**/*.ts","**/*.tsx"]
---

- Enable `strict` (and `noUncheckedIndexedAccess`); treat type errors as build failures.
- Prefer `unknown` over `any`; narrow with type guards before use.
- Derive types from a single source (`z.infer`, `typeof`, `ReturnType`) — never duplicate shapes.
- Model state with discriminated unions, not boolean flags or optional soup.
- Use `as const` for literal tuples/objects; avoid non-null `!` and `as` casts without a comment.
- Prefer `type` for unions/aliases, `interface` for extendable object contracts.
- Keep public function signatures explicit; let inference handle locals.
- No `// @ts-ignore` — use `// @ts-expect-error` with a reason so stale suppressions surface.
