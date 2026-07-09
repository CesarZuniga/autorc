---
title: Supabase
category: Data
scope: always
---

- Enforce Row Level Security on every table; never rely on client-side checks.
- Keep the `service_role` key server-only; the client uses the anon key + RLS.
- Generate and use typed clients from the DB schema.
- Do privileged mutations in Edge Functions/server code, not the browser.
- Manage schema with migrations; validate auth/session on the server.
