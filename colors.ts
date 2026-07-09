// Minimal ANSI helpers. No deps. Honors NO_COLOR and non-TTY.

const enabled =
  process.stdout.isTTY && !process.env.NO_COLOR && process.env.TERM !== "dumb";

function wrap(code: number): (s: string) => string {
  const open = `\x1b[${code}m`;
  const close = "\x1b[0m";
  return (s: string) => (enabled ? open + s + close : s);
}

export const bold = wrap(1);
export const dim = wrap(2);
export const red = wrap(31);
export const green = wrap(32);
export const yellow = wrap(33);
export const blue = wrap(34);
export const magenta = wrap(35);
export const cyan = wrap(36);
export const gray = wrap(90);

export const SHOW_CURSOR = "\x1b[?25h";
export const HIDE_CURSOR = "\x1b[?25l";

export function log(msg = ""): void {
  process.stdout.write(msg + "\n");
}

export function write(msg: string): void {
  process.stdout.write(msg);
}
