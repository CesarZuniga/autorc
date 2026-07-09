---
title: Playwright
category: Testing
scope: glob
globs: ["**/*.spec.ts","e2e/**/*.ts","tests/**/*.ts"]
---

- Prefer user-facing locators (`getByRole`/`getByLabel`/`getByText`) over CSS/XPath.
- Use web-first assertions (`expect(locator).toBeVisible()`); they auto-wait — never fixed sleeps.
- Keep tests independent; set up state via API/fixtures, not the UI, where possible.
- Reuse auth state (`storageState`) instead of logging in each test.
- Use fixtures and Page Object helpers to keep specs readable.
