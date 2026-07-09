import { test } from "node:test";
import { ok, strictEqual } from "node:assert/strict";

import { detectStack, detectPresentAgents } from "../detector.ts";
import { tmpProject, writeFile, writePkg } from "./helpers.ts";

test("detects packages from dependencies and devDependencies", () => {
  const dir = tmpProject();
  writePkg(dir, {
    dependencies: { react: "18", next: "15" },
    devDependencies: { typescript: "5", vitest: "2" },
  });
  const ids = detectStack(dir).techs.map((t) => t.id);
  ok(ids.includes("react"));
  ok(ids.includes("nextjs"));
  ok(ids.includes("typescript"));
  ok(ids.includes("vitest"));
});

test("detects tech from config files", () => {
  const dir = tmpProject();
  writePkg(dir, {});
  writeFile(dir, "go.mod", "module x\n");
  const ids = detectStack(dir).techs.map((t) => t.id);
  ok(ids.includes("go"));
});

test("detects tech from file extensions", () => {
  const dir = tmpProject();
  writeFile(dir, "src/main.rs", "fn main() {}\n");
  writeFile(dir, "Cargo.toml", "[package]\n");
  const ids = detectStack(dir).techs.map((t) => t.id);
  ok(ids.includes("rust"));
});

test("flags frontend and picks package manager", () => {
  const dir = tmpProject();
  writePkg(dir, { dependencies: { react: "18" } });
  writeFile(dir, "pnpm-lock.yaml", "");
  const stack = detectStack(dir);
  strictEqual(stack.frontend, true);
  strictEqual(stack.packageManager, "pnpm");
});

test("empty project detects nothing but node when package.json present", () => {
  const dir = tmpProject();
  writePkg(dir, {});
  const ids = detectStack(dir).techs.map((t) => t.id);
  ok(ids.includes("node"));
});

test("detectPresentAgents finds existing assistant files", () => {
  const dir = tmpProject();
  writeFile(dir, "CLAUDE.md", "# x");
  writeFile(dir, ".cursor/rules/x.mdc", "");
  const present = detectPresentAgents(dir);
  ok(present.includes("claude-code"));
  ok(present.includes("cursor"));
});
