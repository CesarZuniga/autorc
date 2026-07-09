import { join } from "node:path";

import type { GeneratedContent } from "../ir.ts";
import { frontmatter, slug, upsertBlock, writeOwned } from "../fmt.ts";
import type { WriteCtx } from "../fmt.ts";

// GitHub Copilot:
//   always rules → .github/copilot-instructions.md (managed block)
//   glob rules   → .github/instructions/<id>.instructions.md (applyTo frontmatter)
//   commands     → .github/prompts/<name>.prompt.md (mode: agent)
export function writeCopilot(content: GeneratedContent, ctx: WriteCtx): void {
  const always = content.rules.filter((r) => r.scope === "always");
  const scoped = content.rules.filter((r) => r.scope === "glob");

  const sections: string[] = ["# Copilot instructions", ""];
  for (const rule of always) {
    sections.push(`## ${rule.title}`, rule.body, "");
  }
  upsertBlock(
    join(ctx.projectDir, ".github", "copilot-instructions.md"),
    sections.join("\n"),
    ctx,
    ".github/copilot-instructions.md",
  );

  for (const rule of scoped) {
    const applyTo = (rule.globs?.length ? rule.globs : ["**"]).join(",");
    const fm = frontmatter([["applyTo", `"${applyTo}"`]]);
    const file = `${fm}\n\n# ${rule.title}\n\n${rule.body}\n`;
    writeOwned(
      join(ctx.projectDir, ".github", "instructions", `${slug(rule.id)}.instructions.md`),
      file,
      ctx,
      `.github/instructions/${slug(rule.id)}.instructions.md`,
    );
  }

  for (const cmd of content.commands) {
    const fm = frontmatter([
      ["mode", "agent"],
      ["description", cmd.description],
    ]);
    const file = `${fm}\n\n${cmd.body}\n`;
    writeOwned(
      join(ctx.projectDir, ".github", "prompts", `${slug(cmd.name)}.prompt.md`),
      file,
      ctx,
      `.github/prompts/${slug(cmd.name)}.prompt.md`,
    );
  }
}
