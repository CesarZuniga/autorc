# autorc

**Detect your tech stack → generate tailored rules & commands for your AI code assistants.**

`autorc` *generates* rules and slash-commands specific to your stack and writes them in the native
format of each assistant — Claude Code, Cursor, GitHub Copilot, and opencode.

📖 **Docs & portal:** https://cesarzuniga.github.io/autorc (deployed via GitHub Pages from [`docs/`](./docs/index.html)).

```bash
npx autorc
```

## How it works

1. **Detect** — scans `package.json`, config files, and file extensions to identify your stack.
2. **Assemble** — builds a baseline of rules + commands from static templates (offline, auditable).
3. **Enrich** — hands the baseline to *your installed AI coder CLI* (using its existing login session,
   **no API key**) to make the rules specific and correct for your stack.
4. **Write** — projects one agent-agnostic result into every selected assistant's files.

If no coder CLI is found (or `--no-llm`), it emits the static templates as-is — never hard-fails.

## Output per assistant

| Assistant     | Rules                                                             | Commands                        |
| ------------- | ---------------------------------------------------------------- | ------------------------------- |
| Claude Code   | `CLAUDE.md` (managed block)                                       | `.claude/commands/*.md`         |
| Cursor        | `.cursor/rules/*.mdc` (one per tech, `globs`/`alwaysApply`)       | `.cursor/commands/*.md`         |
| GitHub Copilot| `.github/copilot-instructions.md` + `.github/instructions/*.md`  | `.github/prompts/*.prompt.md`   |
| opencode      | `AGENTS.md` (managed block)                                       | `.opencode/command/*.md`        |

Shared files (`CLAUDE.md`, `AGENTS.md`, `copilot-instructions.md`) are edited inside an
`<!-- autorc:start -->…<!-- autorc:end -->` block, so re-runs update only that block and leave your
own content untouched. A `autorc-lock.json` records every file written.

## Enrichment without an API key

`autorc` does **not** call any API directly. It detects an installed coder CLI in this order and runs
it headless, feeding the prompt on stdin and parsing the JSON it returns:

- `claude` (Claude Code) — `claude -p`
- `opencode` — `opencode run`
- `cursor-agent` (Cursor) — `cursor-agent -p`

Whatever session that CLI is already logged into is what does the work. Force one with `--coder`.

## Options

```
npx autorc                        Detect, generate, write (interactive)
  -y, --yes         Skip confirmation prompts
  --dry-run         Show plan, write nothing
  -a, --agent       Target subset: claude-code cursor copilot opencode
  --no-llm          Skip enrichment, emit static templates only
  --coder <id>      Force coder CLI: claude, opencode, cursor-agent
  --model <id>      Model hint passed to the coder CLI (if supported)
  -v, --verbose     Show traces and error detail
  -h, --help        Show this help
```

## Requirements

Node.js >= 22.6.0 (uses native TypeScript type-stripping).

## Extending

- Add a technology: create `templates/rules/<id>.md` (frontmatter + rule body) and add a seed
  (detect rules + command ids) to `TECH_SEEDS` in `catalog.ts`.
- Add a command: create `templates/commands/<id>.md` (frontmatter + prompt body); mark it
  `generic: true` to emit for every stack, or wire its id into a tech's `commands` in `catalog.ts`.
- Add an assistant: add a writer in `writers/` and register it in `writer.ts` + `agents.ts`.
