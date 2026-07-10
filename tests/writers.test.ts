import { test } from "node:test";
import { ok, strictEqual } from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { writeForAgents } from "../writer.ts";
import { MARK_START, MARK_END } from "../fmt.ts";
import type { GeneratedContent } from "../ir.ts";
import { tmpProject, writeFile } from "./helpers.ts";

const CONTENT: GeneratedContent = {
  rules: [
    { id: "react", title: "React", scope: "glob", globs: ["**/*.tsx"], body: "- rule a" },
    { id: "node", title: "Node.js", scope: "always", body: "- rule b" },
  ],
  commands: [{ id: "commit", name: "commit", description: "Commit", body: "do it $ARGUMENTS" }],
};

test("all four writers produce their native files", () => {
  const dir = tmpProject();
  writeForAgents(CONTENT, ["claude-code", "cursor", "copilot", "opencode"], {
    projectDir: dir,
    dryRun: false,
  });

  ok(existsSync(join(dir, "CLAUDE.md")));
  ok(existsSync(join(dir, ".claude/commands/commit.md")));
  ok(existsSync(join(dir, ".cursor/rules/react.mdc")));
  ok(existsSync(join(dir, ".cursor/commands/commit.md")));
  ok(existsSync(join(dir, ".github/copilot-instructions.md")));
  ok(existsSync(join(dir, ".github/instructions/react.instructions.md")));
  ok(existsSync(join(dir, ".github/prompts/commit.prompt.md")));
  ok(existsSync(join(dir, "AGENTS.md")));
  ok(existsSync(join(dir, ".opencode/command/commit.md")));
  ok(existsSync(join(dir, "autostackrc-lock.json")));
});

test("dry-run writes nothing but reports files", () => {
  const dir = tmpProject();
  const { written } = writeForAgents(CONTENT, ["claude-code"], { projectDir: dir, dryRun: true });
  ok(written.length > 0);
  ok(!existsSync(join(dir, "CLAUDE.md")));
});

test("cursor scoped rule uses comma globs; always rule uses alwaysApply", () => {
  const dir = tmpProject();
  writeForAgents(CONTENT, ["cursor"], { projectDir: dir, dryRun: false });
  const react = readFileSync(join(dir, ".cursor/rules/react.mdc"), "utf-8");
  ok(react.includes("globs: **/*.tsx"));
  const node = readFileSync(join(dir, ".cursor/rules/node.mdc"), "utf-8");
  ok(node.includes("alwaysApply: true"));
  ok(!node.includes("globs:"));
});

test("re-run replaces managed block and preserves user content", () => {
  const dir = tmpProject();
  writeFile(dir, "CLAUDE.md", "# Mine\n\nkeep this\n");
  writeForAgents(CONTENT, ["claude-code"], { projectDir: dir, dryRun: false });
  writeForAgents(CONTENT, ["claude-code"], { projectDir: dir, dryRun: false });
  const text = readFileSync(join(dir, "CLAUDE.md"), "utf-8");
  strictEqual(text.split(MARK_START).length - 1, 1);
  strictEqual(text.split(MARK_END).length - 1, 1);
  ok(text.includes("keep this"));
});
