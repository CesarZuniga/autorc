---
title: Docker
category: Infra
scope: glob
globs: ["**/Dockerfile","**/docker-compose.yml","**/compose.yaml"]
---

- Use multi-stage builds; keep the final image minimal (slim/distroless base).
- Pin base image tags/digests; run as a non-root user.
- Order layers for cache efficiency (deps before app code); leverage a `.dockerignore`.
- Combine related `RUN` steps and clean caches to shrink layers.
- Never bake secrets into images or `ENV`; pass them at runtime.
- Add a `HEALTHCHECK` and a clear `ENTRYPOINT`/`CMD`.
