import { bold, cyan, dim, gray, green, log, write, HIDE_CURSOR, SHOW_CURSOR } from "./colors.ts";

export function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const s = ms / 1000;
  return s < 60 ? `${s.toFixed(1)}s` : `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
}

export function printBanner(version: string): void {
  log();
  log(`   ${bold(cyan("autorc"))} ${dim(`v${version}`)}`);
  log(dim("   Rules & commands for your AI code assistants."));
  log();
}

interface MultiSelectOptions<T> {
  labelFn: (item: T) => string;
  groupFn?: (item: T) => string;
  hintFn?: (item: T) => string;
  initialSelected?: boolean[];
}

// Interactive checkbox list. Falls back to "select all" when stdin is not a TTY.
export async function multiSelect<T>(
  items: T[],
  { labelFn, groupFn, hintFn, initialSelected }: MultiSelectOptions<T>,
): Promise<T[]> {
  const selected = items.map((_, i) => initialSelected?.[i] ?? true);

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return items.filter((_, i) => selected[i]);
  }

  let cursor = 0;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");
  write(HIDE_CURSOR);

  let lastLineCount = 0;

  const render = (): void => {
    if (lastLineCount > 0) write(`\x1b[${lastLineCount}A`);
    let lines = 0;
    let lastGroup: string | null = null;

    for (let i = 0; i < items.length; i++) {
      const item = items[i]!;
      if (groupFn) {
        const g = groupFn(item);
        if (g !== lastGroup) {
          write("\x1b[K" + `   ${gray(g)}\n`);
          lines++;
          lastGroup = g;
        }
      }
      const box = selected[i] ? green("◉") : dim("◯");
      const pointer = i === cursor ? cyan("❯") : " ";
      const label = labelFn(item);
      const hint = hintFn?.(item);
      const hintStr = hint ? "  " + dim(hint) : "";
      const line = `${pointer} ${box} ${i === cursor ? bold(label) : label}${hintStr}`;
      write("\x1b[K" + `   ${line}\n`);
      lines++;
    }
    write(
      "\x1b[K" +
        dim("   ↑/↓ move · space toggle · a all · n none · enter confirm\n"),
    );
    lines++;
    lastLineCount = lines;
  };

  render();

  return await new Promise<T[]>((resolve) => {
    const cleanup = (): void => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      write(SHOW_CURSOR);
    };

    const onData = (key: string): void => {
      if (key === "") {
        // ctrl-c
        cleanup();
        write("\n");
        process.exit(130);
      } else if (key === "\r" || key === "\n") {
        cleanup();
        resolve(items.filter((_, i) => selected[i]));
      } else if (key === "[A" || key === "k") {
        cursor = (cursor - 1 + items.length) % items.length;
        render();
      } else if (key === "[B" || key === "j") {
        cursor = (cursor + 1) % items.length;
        render();
      } else if (key === " ") {
        selected[cursor] = !selected[cursor];
        render();
      } else if (key === "a") {
        selected.fill(true);
        render();
      } else if (key === "n") {
        selected.fill(false);
        render();
      }
    };

    stdin.on("data", onData);
  });
}
