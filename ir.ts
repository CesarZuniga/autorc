// Agent-agnostic intermediate representation.
// Generated once, projected into every assistant's native format by writers/.

export type RuleScope = "always" | "glob";

export interface RuleDoc {
  id: string; // stable slug, e.g. "react"
  title: string; // human title, e.g. "React"
  scope: RuleScope; // "always" = load for whole repo; "glob" = only for matching files
  globs?: string[]; // e.g. ["**/*.tsx", "**/*.jsx"] — used when scope === "glob"
  body: string; // markdown rule content (bullets / prose)
}

export interface CommandDoc {
  id: string; // stable slug, e.g. "component"
  name: string; // slash name, e.g. "component"
  description: string; // one line
  argumentHint?: string; // e.g. "<name>"
  body: string; // prompt body; may reference $ARGUMENTS
}

export interface GeneratedContent {
  rules: RuleDoc[];
  commands: CommandDoc[];
}
