---
title: Rust
category: Language
scope: glob
globs: ["**/*.rs"]
---

- Prefer `Result`/`?` over panics in library code; reserve `unwrap`/`expect` for invariants (with a message).
- Keep `unsafe` minimal, isolated, and documented with the invariant it upholds.
- Model domain states with enums; make illegal states unrepresentable.
- Borrow over clone; reach for `Arc`/`Rc`/`RefCell` only when ownership truly requires it.
- Run `cargo clippy` and `cargo fmt`; treat warnings as signal.
- Use `thiserror` for library errors, `anyhow` for applications.
