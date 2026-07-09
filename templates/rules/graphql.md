---
title: GraphQL
category: API
scope: glob
globs: ["**/*.graphql","**/*.gql","**/*.ts"]
---

- Design the schema first (SDL); keep resolvers thin and delegate to services.
- Batch and cache to avoid N+1 (DataLoader per request).
- Paginate list fields (cursor-based); avoid unbounded queries.
- Enforce depth/complexity limits and authorization in resolvers/directives.
- Return typed errors; avoid leaking internals in error messages.
