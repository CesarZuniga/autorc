import { join } from "node:path";

import type { GeneratedContent } from "../ir.ts";
import { frontmatter, slug, upsertBlock, writeOwned } from "../fmt.ts";
import type { WriteCtx } from "../fmt.ts";

// Claude Code: rules → CLAUDE.md (managed block); commands → .claude/commands/<name>.md
export function writeClaude(content: GeneratedContent, ctx: WriteCtx): void {
  const sections: string[] = ["# Project rules", ""];
  for (const rule of content.rules) {
    sections.push(`## ${rule.title}`);
    if (rule.scope === "glob" && rule.globs?.length) {
      sections.push(`_Applies to: ${rule.globs.join(", ")}_`, "");
    }
    sections.push(rule.body, "");
  }
  upsertBlock(join(ctx.projectDir, "CLAUDE.md"), sections.join("\n"), ctx, "CLAUDE.md");

  for (const cmd of content.commands) {
    const fm = frontmatter([
      ["description", cmd.description],
      ["argument-hint", cmd.argumentHint],
    ]);
    const file = `${fm}\n\n${cmd.body}\n`;
    writeOwned(
      join(ctx.projectDir, ".claude", "commands", `${slug(cmd.name)}.md`),
      file,
      ctx,
      `.claude/commands/${slug(cmd.name)}.md`,
    );
  }
}
