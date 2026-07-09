import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const MARK_START = "<!-- autorc:start -->";
export const MARK_END = "<!-- autorc:end -->";

export interface WriteCtx {
  projectDir: string;
  dryRun: boolean;
  written: string[]; // accumulator of relative paths touched
}

function ensureDir(path: string): void {
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// Replace (or insert) the autorc-managed block inside a shared file,
// preserving any user content outside the markers.
export function upsertBlock(absPath: string, block: string, ctx: WriteCtx, rel: string): void {
  const managed = `${MARK_START}\n${block.trim()}\n${MARK_END}\n`;
  let next: string;

  if (existsSync(absPath)) {
    const existing = readFileSync(absPath, "utf-8");
    const s = existing.indexOf(MARK_START);
    const e = existing.indexOf(MARK_END);
    if (s !== -1 && e !== -1 && e > s) {
      const before = existing.slice(0, s);
      const after = existing.slice(e + MARK_END.length);
      next = (before.trimEnd() + "\n\n" + managed + after.trimStart()).trimStart();
    } else {
      next = existing.trimEnd() + "\n\n" + managed;
    }
  } else {
    next = managed;
  }

  ctx.written.push(rel);
  if (ctx.dryRun) return;
  ensureDir(absPath);
  writeFileSync(absPath, next);
}

// Write a file wholly owned by autorc (commands, .mdc rules, prompts).
export function writeOwned(absPath: string, content: string, ctx: WriteCtx, rel: string): void {
  ctx.written.push(rel);
  if (ctx.dryRun) return;
  ensureDir(absPath);
  writeFileSync(absPath, content.endsWith("\n") ? content : content + "\n");
}

// Build a YAML frontmatter block from ordered key/value pairs. Skips undefined.
export function frontmatter(pairs: [string, string | string[] | boolean | undefined][]): string {
  const lines: string[] = ["---"];
  for (const [key, value] of pairs) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((v) => JSON.stringify(v)).join(", ")}]`);
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
