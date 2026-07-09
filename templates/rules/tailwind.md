---
title: Tailwind CSS
category: Styling
scope: glob
globs: ["**/*.tsx","**/*.jsx","**/*.vue","**/*.svelte","**/*.astro","**/*.html"]
---

- Compose utility classes in markup; extract repetition into components, not `@apply`.
- Drive spacing/color/typography from the theme tokens — no magic numbers.
- Keep class order consistent (layout → box → typography → visual); use the Tailwind Prettier plugin.
- Use responsive/state variants (`md:`, `hover:`, `dark:`) over custom CSS.
- Build design tokens once (v4: CSS-first `@theme`; v3: `tailwind.config`); reference them everywhere.
- Gate dynamic classes behind a safelist or full literal strings so the JIT can see them.
