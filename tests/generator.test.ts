import { test } from "node:test";
import { deepStrictEqual, ok, strictEqual } from "node:assert/strict";

import { buildStatic, extractJson } from "../generator.ts";
import { TECH_CATALOG } from "../catalog.ts";
import type { DetectedStack } from "../detector.ts";

function stackOf(...ids: string[]): DetectedStack {
  return {
    techs: TECH_CATALOG.filter((t) => ids.includes(t.id)),
    language: "TypeScript",
    packageManager: "pnpm",
    frontend: true,
  };
}

test("buildStatic emits one rule per tech", () => {
  const content = buildStatic(stackOf("react", "typescript"));
  strictEqual(content.rules.length, 2);
  ok(content.rules.some((r) => r.id === "react"));
});

test("buildStatic always includes generic commands", () => {
  const content = buildStatic(stackOf("go"));
  const names = content.commands.map((c) => c.name);
  for (const g of ["commit", "review", "fix", "test"]) ok(names.includes(g));
});

test("buildStatic adds tech-specific commands and dedupes", () => {
  const content = buildStatic(stackOf("react", "vue"));
  const componentCmds = content.commands.filter((c) => c.id === "component");
  strictEqual(componentCmds.length, 1); // both contribute "component", deduped
});

test("extractJson pulls a balanced object from noisy output", () => {
  const raw = 'Sure! Here it is:\n```json\n{"rules":[],"commands":[]}\n```\nDone.';
  const json = extractJson(raw);
  deepStrictEqual(JSON.parse(json!), { rules: [], commands: [] });
});

test("extractJson handles braces inside strings", () => {
  const raw = '{"body":"use { and } carefully","x":1}';
  const json = extractJson(raw);
  deepStrictEqual(JSON.parse(json!), { body: "use { and } carefully", x: 1 });
});

test("extractJson returns null when no object present", () => {
  strictEqual(extractJson("no json here"), null);
});
