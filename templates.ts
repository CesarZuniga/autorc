// Loads command + rule templates from templates/ at runtime.
// Each file is the source of one item: YAML-ish frontmatter + a markdown body.
//   templates/commands/<id>.md  frontmatter: name, description, argument-hint?, generic?, order?
//   templates/rules/<id>.md      frontmatter: title, category, scope, globs?

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface CommandDef {
  id: string;
  name: string;
  description: string;
  argumentHint?: string;
  skeleton: string; // prompt body; may reference $ARGUMENTS
}

export interface LoadedCommands {
  catalog: Record<string, CommandDef>;
  generic: string[]; // ids emitted for every stack, in display order
}

export interface RuleTemplate {
  title: string;
  category: string;
  scope: "always" | "glob";
  globs?: string[];
  body: string;
}

// Walk up from this module until templates/<kind> is found.
// Works both in dev (root/templates.ts) and after build (root/dist/templates.js).
function templatesDir(kind: string): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 12; i++) {
    const candidate = join(dir, "templates", kind);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(`autostackrc: could not locate templates/${kind} directory`);
}

// Split a template file into a frontmatter map and the body below it.
function parseFrontmatter(id: string, kind: string, raw: string): { fm: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`autostackrc: ${kind} template ${id}.md has no frontmatter`);

  const fm: Record<string, string> = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { fm, body: raw.slice(match[0].length).trim() };
}

function listTemplates(kind: string): { dir: string; files: string[] } {
  const dir = templatesDir(kind);
  const files = readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
  return { dir, files };
}

export function loadCommands(): LoadedCommands {
  const { dir, files } = listTemplates("commands");
  const catalog: Record<string, CommandDef> = {};
  const generics: { id: string; order: number }[] = [];

  for (const file of files) {
    const id = basename(file, ".md");
    const { fm, body } = parseFrontmatter(id, "command", readFileSync(join(dir, file), "utf-8"));
    const def: CommandDef = { id, name: fm.name || id, description: fm.description || "", skeleton: body };
    if (fm["argument-hint"]) def.argumentHint = fm["argument-hint"];
    catalog[id] = def;
    if (fm.generic === "true") {
      generics.push({ id, order: fm.order ? Number(fm.order) : Number.POSITIVE_INFINITY });
    }
  }

  generics.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  return { catalog, generic: generics.map((g) => g.id) };
}

export function loadRules(): Record<string, RuleTemplate> {
  const { dir, files } = listTemplates("rules");
  const rules: Record<string, RuleTemplate> = {};

  for (const file of files) {
    const id = basename(file, ".md");
    const { fm, body } = parseFrontmatter(id, "rule", readFileSync(join(dir, file), "utf-8"));
    const scope = fm.scope === "glob" ? "glob" : "always";
    const rule: RuleTemplate = { title: fm.title || id, category: fm.category || "General", scope, body };
    if (fm.globs) {
      try {
        const parsed = JSON.parse(fm.globs);
        if (Array.isArray(parsed) && parsed.length) rule.globs = parsed.map(String);
      } catch {
        throw new Error(`autostackrc: rule template ${id}.md has malformed globs frontmatter`);
      }
    }
    rules[id] = rule;
  }

  return rules;
}
