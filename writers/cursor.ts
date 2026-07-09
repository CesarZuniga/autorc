import { join } from "node:path";

import type { GeneratedContent } from "../ir.ts";
import { frontmatter, slug, writeOwned } from "../fmt.ts";
import type { WriteCtx } from "../fmt.ts";

// Cursor: rules → .cursor/rules/<id>.mdc (one per tech); commands → .cursor/commands/<name>.md
export function writeCursor(content: GeneratedContent, ctx: WriteCtx): void {
  for (const rule of content.rules) {
    const always = rule.scope === "always";
    const fm = frontmatter([
      ["description", `${rule.title} conventions`],
      ["globs", always || !rule.globs?.length ? undefined : rule.globs.join(",")],
      ["alwaysApply", always],
    ]);
    const file = `${fm}\n\n# ${rule.title}\n\n${rule.body}\n`;
    writeOwned(
      join(ctx.projectDir, ".cursor", "rules", `${slug(rule.id)}.mdc`),
      file,
      ctx,
      `.cursor/rules/${slug(rule.id)}.mdc`,
    );
  }

  for (const cmd of content.commands) {
    const fm = frontmatter([["description", cmd.description]]);
    const file = `${fm}\n\n${cmd.body}\n`;
    writeOwned(
      join(ctx.projectDir, ".cursor", "commands", `${slug(cmd.name)}.md`),
      file,
      ctx,
      `.cursor/commands/${slug(cmd.name)}.md`,
    );
  }
}
