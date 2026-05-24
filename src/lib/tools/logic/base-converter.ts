import type { LogicResult } from "./unit-conversions";

export type NumberBase = 2 | 8 | 10 | 16;

const basePrefixes: Record<NumberBase, string> = {
  2: "0b",
  8: "0o",
  10: "",
  16: "0x",
};

const stripPrefix = (value: string, base: NumberBase): string => {
  const trimmed = value.trim();
  if (base === 2 && /^0b/i.test(trimmed)) {
    return trimmed.slice(2);
  }
  if (base === 8 && /^0o/i.test(trimmed)) {
    return trimmed.slice(2);
  }
  if (base === 16 && /^0x/i.test(trimmed)) {
    return trimmed.slice(2);
  }
  return trimmed;
};

const parseInBase = (value: string, base: NumberBase): LogicResult & { numeric?: number } => {
  const stripped = stripPrefix(value, base);
  if (!stripped) {
    return { ok: false, error: "Enter a value to convert." };
  }

  const parsed = Number.parseInt(stripped, base);
  if (!Number.isFinite(parsed)) {
    return { ok: false, error: `Enter a valid base-${base} number.` };
  }

  return { ok: true, output: String(parsed), numeric: parsed };
};

export const convertNumberBase = (
  input: string,
  fromBase: NumberBase,
  toBase: NumberBase,
): LogicResult => {
  const parsed = parseInBase(input, fromBase);
  if (!parsed.ok || parsed.numeric === undefined) {
    return parsed;
  }

  const { numeric } = parsed;

  if (toBase === 10) {
    return { ok: true, output: String(numeric) };
  }

  const output = numeric.toString(toBase).toUpperCase();
  return { ok: true, output: `${basePrefixes[toBase]}${output}` };
};
