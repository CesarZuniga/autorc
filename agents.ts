// Registry of supported AI code assistants. `id` is the CLI/target token.

export interface AgentSpec {
  id: string;
  name: string;
  blurb: string;
}

export const AGENTS: AgentSpec[] = [
  { id: "claude-code", name: "Claude Code", blurb: "CLAUDE.md + .claude/commands" },
  { id: "cursor", name: "Cursor", blurb: ".cursor/rules/*.mdc + .cursor/commands" },
  { id: "copilot", name: "GitHub Copilot", blurb: ".github/copilot-instructions.md + prompts" },
  { id: "opencode", name: "opencode", blurb: "AGENTS.md + .opencode/command" },
];

export const AGENT_IDS = AGENTS.map((a) => a.id);

export function isKnownAgent(id: string): boolean {
  return AGENT_IDS.includes(id);
}
