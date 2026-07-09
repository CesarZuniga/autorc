---
title: Python
category: Language
scope: glob
globs: ["**/*.py"]
---

- Type-annotate public functions and run a type checker (mypy/pyright) in CI.
- Follow PEP 8; format and lint with Ruff (or black + ruff); keep imports sorted.
- Use `pathlib` for paths, `dataclasses`/pydantic for structured data, context managers for resources.
- Prefer explicit exceptions over silent failure; never bare-`except`.
- Manage deps and venvs with a modern tool (uv/poetry); pin in a lockfile.
- Write f-strings, comprehensions, and generators over manual loops where clearer.
- Guard scripts with `if __name__ == "__main__":`.
