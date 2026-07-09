import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

export function tmpProject(): string {
  return mkdtempSync(join(tmpdir(), "autorc-test-"));
}

export function writeFile(dir: string, rel: string, content: string): void {
  const abs = join(dir, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
}

export function writePkg(dir: string, pkg: Record<string, unknown>): void {
  writeFile(dir, "package.json", JSON.stringify(pkg));
}
