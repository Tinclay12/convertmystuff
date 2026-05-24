import type { LogicResult } from "./unit-conversions";

export const removeEmptyLines = (input: string): LogicResult => {
  const lines = input.split(/\r?\n/);
  const output = lines.filter((line) => line.trim().length > 0).join("\n");
  const removed = lines.length - output.split(/\r?\n/).length;
  return { ok: true, output, meta: { removed } };
};

export const trimLines = (input: string): LogicResult => {
  const output = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join("\n");
  return { ok: true, output };
};

export const toCamelCase = (input: string): LogicResult => {
  if (!input.trim()) {
    return { ok: false, error: "Enter text to convert." };
  }

  const output = input
    .trim()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char: string) => char.toUpperCase())
    .replace(/^./, (char) => char.toLowerCase());

  return { ok: true, output };
};

export const toSnakeCase = (input: string): LogicResult => {
  if (!input.trim()) {
    return { ok: false, error: "Enter text to convert." };
  }

  const output = input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .replace(/__+/g, "_")
    .toLowerCase();

  return { ok: true, output };
};

export const countWords = (input: string): LogicResult => {
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, "").length;
  const lines = input ? input.split(/\r?\n/).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));

  return {
    ok: true,
    output: `Words: ${words}\nCharacters: ${characters}\nCharacters (no spaces): ${charactersNoSpaces}\nLines: ${lines}\nReading time: ~${readingMinutes} min`,
    meta: { words, characters, lines },
  };
};

export const countCharacters = (input: string): LogicResult => {
  const withSpaces = input.length;
  const withoutSpaces = input.replace(/\s/g, "").length;
  return {
    ok: true,
    output: `Characters with spaces: ${withSpaces}\nCharacters without spaces: ${withoutSpaces}`,
    meta: { withSpaces, withoutSpaces },
  };
};

export const countLines = (input: string): LogicResult => {
  const lines = input.length === 0 ? 0 : input.split(/\r?\n/).length;
  return { ok: true, output: String(lines), meta: { lines } };
};

export const addLineNumbers = (input: string): LogicResult => {
  const output = input
    .split(/\r?\n/)
    .map((line, index) => `${index + 1}. ${line}`)
    .join("\n");
  return { ok: true, output };
};

export const textDiff = (left: string, right: string): LogicResult => {
  const leftLines = left.split(/\r?\n/);
  const rightLines = right.split(/\r?\n/);
  const max = Math.max(leftLines.length, rightLines.length);
  const diffLines: string[] = [];

  for (let index = 0; index < max; index += 1) {
    const leftLine = leftLines[index] ?? "";
    const rightLine = rightLines[index] ?? "";
    if (leftLine === rightLine) {
      diffLines.push(`  ${leftLine}`);
    } else {
      if (leftLine) {
        diffLines.push(`- ${leftLine}`);
      }
      if (rightLine) {
        diffLines.push(`+ ${rightLine}`);
      }
    }
  }

  return { ok: true, output: diffLines.join("\n") };
};

export type TextProcessorFn = (input: string) => LogicResult;
export type TextDiffFn = (left: string, right: string) => LogicResult;

export type TextToolConfig =
  | {
      kind: "single";
      inputLabel: string;
      outputLabel: string;
      inputPlaceholder: string;
      transform: TextProcessorFn;
      showMeta?: boolean;
    }
  | {
      kind: "diff";
      leftLabel: string;
      rightLabel: string;
      leftPlaceholder: string;
      rightPlaceholder: string;
      transform: TextDiffFn;
    };

export const textToolConfigs: Record<string, TextToolConfig> = {
  "remove-empty-lines": {
    kind: "single",
    inputLabel: "Text with empty lines",
    outputLabel: "Cleaned text",
    inputPlaceholder: "line one\n\nline two",
    transform: removeEmptyLines,
    showMeta: true,
  },
  "trim-lines": {
    kind: "single",
    inputLabel: "Text to trim",
    outputLabel: "Trimmed lines",
    inputPlaceholder: "  spaced line  ",
    transform: trimLines,
  },
  "camel-case-converter": {
    kind: "single",
    inputLabel: "Text input",
    outputLabel: "camelCase output",
    inputPlaceholder: "hello world example",
    transform: toCamelCase,
  },
  "snake-case-converter": {
    kind: "single",
    inputLabel: "Text input",
    outputLabel: "snake_case output",
    inputPlaceholder: "Hello World Example",
    transform: toSnakeCase,
  },
  "word-counter": {
    kind: "single",
    inputLabel: "Text to analyze",
    outputLabel: "Word count summary",
    inputPlaceholder: "Paste article or paragraph text here.",
    transform: countWords,
  },
  "character-counter": {
    kind: "single",
    inputLabel: "Text to analyze",
    outputLabel: "Character count",
    inputPlaceholder: "Paste text here.",
    transform: countCharacters,
  },
  "line-counter": {
    kind: "single",
    inputLabel: "Text to analyze",
    outputLabel: "Line count",
    inputPlaceholder: "One line per row",
    transform: countLines,
  },
  "add-line-numbers": {
    kind: "single",
    inputLabel: "Text input",
    outputLabel: "Numbered lines",
    inputPlaceholder: "alpha\nbeta\ngamma",
    transform: addLineNumbers,
  },
  "text-diff": {
    kind: "diff",
    leftLabel: "Original text",
    rightLabel: "Changed text",
    leftPlaceholder: "Original version",
    rightPlaceholder: "Updated version",
    transform: textDiff,
  },
};
