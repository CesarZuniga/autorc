---
title: Next.js
category: Framework
scope: always
---

- App Router: Server Components by default; add `'use client'` only for interactivity/browser APIs.
- Fetch on the server and pass data down; avoid client-side fetch waterfalls.
- Use Server Actions for mutations; validate input server-side and revalidate affected paths/tags.
- Choose caching deliberately (`fetch` cache, `revalidate`, `dynamic`); don't rely on defaults blindly.
- Keep secrets server-only; only `NEXT_PUBLIC_`-prefixed env vars reach the client.
- Use `next/image`, `next/font`, and `next/link` for built-in optimization.
- Handle loading/error with `loading.tsx`/`error.tsx`; stream with Suspense boundaries.
- Keep route handlers (`app/api`) thin; push logic into shared modules.
