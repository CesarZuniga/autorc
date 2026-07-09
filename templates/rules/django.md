---
title: Django
category: Backend
scope: always
---

- Keep business logic out of views; use model methods, managers, or service functions.
- Use migrations for every schema change; never edit an already-applied migration.
- Query efficiently: `select_related`/`prefetch_related`, `only`/`values`, avoid N+1.
- Validate via forms/serializers; rely on the ORM's parameterization — never string-format SQL.
- Keep secrets and `DEBUG` in env/settings per environment; never commit them.
- Use `get_object_or_404`, transactions (`atomic`), and constraints at the DB level.
