import { join } from "node:path";

import type { GeneratedContent } from "../ir.ts";
import { frontmatter, slug, upsertBlock, writeOwned } from "../fmt.ts";
import type { WriteCtx } from "../fmt.ts";

// opencode: rules → AGENTS.md (managed block); commands → .opencode/command/<name>.md
export function writeOpencode(content: GeneratedContent, ctx: WriteCtx): void {
  const sections: string[] = ["# Project rules", ""];
  for (const rule of content.rules) {
    sections.push(`## ${rule.title}`);
    if (rule.scope === "glob" && rule.globs?.length) {
      sections.push(`_Applies to: ${rule.globs.join(", ")}_`, "");
    }
    sections.push(rule.body, "");
  }
  upsertBlock(join(ctx.projectDir, "AGENTS.md"), sections.join("\n"), ctx, "AGENTS.md");

  for (const cmd of content.commands) {
    const fm = frontmatter([["description", cmd.description]]);
    const file = `${fm}\n\n${cmd.body}\n`;
    writeOwned(
      join(ctx.projectDir, ".opencode", "command", `${slug(cmd.name)}.md`),
      file,
      ctx,
      `.opencode/command/${slug(cmd.name)}.md`,
    );
  }
}
