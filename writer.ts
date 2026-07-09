import { writeFileSync } from "node:fs";
import { join } from "node:path";

import type { GeneratedContent } from "./ir.ts";
import type { WriteCtx } from "./fmt.ts";
import { writeClaude } from "./writers/claude.ts";
import { writeCursor } from "./writers/cursor.ts";
import { writeCopilot } from "./writers/copilot.ts";
import { writeOpencode } from "./writers/opencode.ts";

type WriterFn = (content: GeneratedContent, ctx: WriteCtx) => void;

const WRITERS: Record<string, WriterFn> = {
  "claude-code": writeClaude,
  cursor: writeCursor,
  copilot: writeCopilot,
  opencode: writeOpencode,
};

export interface WriteAllOptions {
  projectDir: string;
  dryRun: boolean;
}

export interface WriteAllResult {
  written: string[];
}

export function writeForAgents(
  content: GeneratedContent,
  agents: string[],
  { projectDir, dryRun }: WriteAllOptions,
): WriteAllResult {
  const ctx: WriteCtx = { projectDir, dryRun, written: [] };

  for (const agent of agents) {
    const fn = WRITERS[agent];
    if (fn) fn(content, ctx);
  }

  if (!dryRun) {
    const lock = {
      version: 1,
      generatedAt: new Date().toISOString(),
      agents,
      files: [...ctx.written].sort(),
    };
    writeFileSync(join(projectDir, "autorc-lock.json"), JSON.stringify(lock, null, 2) + "\n");
  }

  return { written: ctx.written };
}
