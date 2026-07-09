---
title: Spring Boot
category: Backend
scope: glob
globs: ["**/*.java","**/*.kt"]
---

- Use constructor injection (final fields) over field injection.
- Keep controllers thin; business logic in services; map to DTOs and validate with `@Valid`.
- Use Spring Data repositories; be explicit about transactions (`@Transactional`) and fetch strategy to avoid N+1.
- Externalize config in `application.yml`/profiles; keep secrets out of the repo.
- Return proper status codes; handle errors centrally with `@ControllerAdvice`.
