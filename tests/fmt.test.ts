import { test } from "node:test";
import { ok, strictEqual } from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { frontmatter, slug, upsertBlock } from "../fmt.ts";
import type { WriteCtx } from "../fmt.ts";
import { tmpProject } from "./helpers.ts";

test("slug normalizes to kebab-case", () => {
  strictEqual(slug("React Native!"), "react-native");
  strictEqual(slug("  Foo__Bar  "), "foo-bar");
});

test("frontmatter skips undefined and formats arrays/booleans", () => {
  const fm = frontmatter([
    ["description", "hi"],
    ["globs", ["a", "b"]],
    ["alwaysApply", false],
    ["missing", undefined],
  ]);
  ok(fm.includes("description: hi"));
  ok(fm.includes('globs: ["a", "b"]'));
  ok(fm.includes("alwaysApply: false"));
  ok(!fm.includes("missing"));
});

test("upsertBlock creates then replaces the managed region", () => {
  const dir = tmpProject();
  const ctx: WriteCtx = { projectDir: dir, dryRun: false, written: [] };
  const p = join(dir, "AGENTS.md");
  upsertBlock(p, "first", ctx, "AGENTS.md");
  upsertBlock(p, "second", ctx, "AGENTS.md");
  const text = readFileSync(p, "utf-8");
  ok(text.includes("second"));
  ok(!text.includes("first"));
});
