import { spawn, spawnSync } from "node:child_process";

import { COMMAND_CATALOG, GENERIC_COMMANDS } from "./catalog.ts";
import type { DetectedStack } from "./detector.ts";
import type { CommandDoc, GeneratedContent, RuleDoc } from "./ir.ts";

// ── Static assembly (offline half of the hybrid) ─────────────

export function buildStatic(stack: DetectedStack): GeneratedContent {
  const rules: RuleDoc[] = stack.techs.map((tech) => ({
    id: tech.id,
    title: tech.name,
    scope: tech.scope,
    globs: tech.globs,
    body: tech.ruleSkeleton,
  }));

  const commandIds = new Set<string>(GENERIC_COMMANDS);
  for (const tech of stack.techs) {
    for (const id of tech.commands ?? []) commandIds.add(id);
  }

  const commands: CommandDoc[] = [];
  for (const id of commandIds) {
    const def = COMMAND_CATALOG[id];
    if (!def) continue;
    commands.push({
      id: def.id,
      name: def.name,
      description: def.description,
      argumentHint: def.argumentHint,
      body: def.skeleton,
    });
  }

  return { rules, commands };
}

// ── Coder CLI adapters (online half — uses the coder's own session) ──

export interface CoderCli {
  id: string;
  name: string;
  bin: string;
  // Args placed before the prompt. Prompt is passed on stdin.
  args: (model?: string) => string[];
}

// Priority order. Prompt always fed via stdin to dodge arg-length limits.
export const CODER_CLIS: CoderCli[] = [
  { id: "claude", name: "Claude Code", bin: "claude", args: (m) => (m ? ["-p", "--model", m] : ["-p"]) },
  { id: "opencode", name: "opencode", bin: "opencode", args: (m) => (m ? ["run", "--model", m] : ["run"]) },
  { id: "cursor-agent", name: "Cursor", bin: "cursor-agent", args: () => ["-p"] },
];

function binExists(bin: string): boolean {
  const probe = spawnSync(process.platform === "win32" ? "where" : "which", [bin], {
    stdio: "ignore",
  });
  return probe.status === 0;
}

export function detectCoderCli(preferred?: string): CoderCli | null {
  if (preferred) {
    const match = CODER_CLIS.find((c) => c.id === preferred);
    if (match) return binExists(match.bin) ? match : null;
    return null;
  }
  for (const cli of CODER_CLIS) {
    if (binExists(cli.bin)) return cli;
  }
  return null;
}

// ── Prompt + parsing ─────────────────────────────────────────

function buildPrompt(stack: DetectedStack, base: GeneratedContent): string {
  const techList = stack.techs.map((t) => `${t.name} (${t.category})`).join(", ");
  return [
    "You refine AI-assistant guidance for one software project.",
    "",
    `Detected stack: ${techList || "unknown"}.`,
    `Primary language: ${stack.language}. Package manager: ${stack.packageManager}.`,
    "",
    "Below is a baseline of rules and commands from static templates. Improve them so",
    "they are specific and correct for THIS stack:",
    "- Keep each rule body concise (markdown bullets, no fluff).",
    "- Merge/drop overlapping rules; add stack-specific rules the baseline missed.",
    "- Keep command `id`/`name` stable when a baseline command already fits.",
    "- Preserve `$ARGUMENTS` placeholders in command bodies.",
    "- `scope` is 'glob' for language/file-type rules (set `globs`), 'always' for project-wide ones.",
    "",
    "CRITICAL OUTPUT CONTRACT:",
    "Respond with ONE JSON object and NOTHING else — no prose, no markdown fences.",
    'Shape: {"rules":[{"id","title","scope","globs"?,"body"}],"commands":[{"id","name","description","argumentHint"?,"body"}]}',
    "",
    "BASELINE:",
    JSON.stringify(base),
  ].join("\n");
}

// Extract the first balanced JSON object from arbitrary CLI stdout.
export function extractJson(text: string): string | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const haystack = fenced ? fenced[1]! : text;
  const start = haystack.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < haystack.length; i++) {
    const ch = haystack[i]!;
    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
    } else if (ch === '"') inStr = true;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return haystack.slice(start, i + 1);
    }
  }
  return null;
}

function runCli(cli: CoderCli, prompt: string, model: string | undefined, timeoutMs: number): Promise<string> {
  return new Promise((resolveP, rejectP) => {
    const child = spawn(cli.bin, cli.args(model), { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    let err = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      rejectP(new Error(`${cli.name} timed out after ${Math.round(timeoutMs / 1000)}s`));
    }, timeoutMs);

    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (err += d.toString()));
    child.on("error", (e) => {
      clearTimeout(timer);
      rejectP(e);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0 && !out.trim()) {
        rejectP(new Error(`${cli.name} exited ${code}: ${err.trim().slice(0, 200)}`));
      } else {
        resolveP(out);
      }
    });

    child.stdin.write(prompt);
    child.stdin.end();
  });
}

export interface EnrichOptions {
  cli: CoderCli;
  model?: string;
  timeoutMs?: number;
  onTrace?: (msg: string) => void;
}

export async function enrich(
  stack: DetectedStack,
  base: GeneratedContent,
  opts: EnrichOptions,
): Promise<GeneratedContent> {
  opts.onTrace?.(`delegating to ${opts.cli.name} (${opts.cli.bin})`);
  const raw = await runCli(opts.cli, buildPrompt(stack, base), opts.model, opts.timeoutMs ?? 180_000);

  const json = extractJson(raw);
  if (!json) throw new Error(`${opts.cli.name} returned no JSON`);

  let parsed: Partial<GeneratedContent>;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error(`could not parse ${opts.cli.name} output as JSON`);
  }
  if (!Array.isArray(parsed.rules) || !Array.isArray(parsed.commands)) {
    throw new Error("output missing rules/commands arrays");
  }
  return { rules: parsed.rules, commands: parsed.commands };
}

// ── Public entry: hybrid generate ────────────────────────────

export interface GenerateOptions {
  llm: boolean;
  coder?: string; // force a specific CLI id
  model?: string;
  onTrace?: (msg: string) => void;
}

export interface GenerateResult {
  content: GeneratedContent;
  enriched: boolean;
  enrichedBy?: string;
  warning?: string;
}

export async function generate(
  stack: DetectedStack,
  opts: GenerateOptions,
): Promise<GenerateResult> {
  const base = buildStatic(stack);

  if (!opts.llm) return { content: base, enriched: false };

  const cli = detectCoderCli(opts.coder);
  if (!cli) {
    const hint = opts.coder
      ? `coder CLI '${opts.coder}' not found`
      : `no coder CLI found (looked for: ${CODER_CLIS.map((c) => c.bin).join(", ")})`;
    return {
      content: base,
      enriched: false,
      warning: `${hint} — used static templates (install a coder CLI, or pass --no-llm to silence)`,
    };
  }

  try {
    const content = await enrich(stack, base, {
      cli,
      model: opts.model,
      onTrace: opts.onTrace,
    });
    return { content, enriched: true, enrichedBy: cli.name };
  } catch (err) {
    return {
      content: base,
      enriched: false,
      warning: `enrichment via ${cli.name} failed (${(err as Error).message}); used static templates`,
    };
  }
}
