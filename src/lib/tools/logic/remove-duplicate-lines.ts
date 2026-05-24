export type RemoveDuplicateLinesOptions = {
  caseSensitive?: boolean;
  trimWhitespace?: boolean;
};

export type RemoveDuplicateLinesResult = {
  output: string;
  removedCount: number;
  originalCount: number;
  uniqueCount: number;
};

const normalizeLine = (
  line: string,
  options: RemoveDuplicateLinesOptions,
): string => {
  const trimmed = options.trimWhitespace ? line.trim() : line;
  return options.caseSensitive ? trimmed : trimmed.toLowerCase();
};

export const removeDuplicateLines = (
  input: string,
  options: RemoveDuplicateLinesOptions = {},
): RemoveDuplicateLinesResult => {
  const lines = input.length > 0 ? input.split(/\r?\n/) : [];
  const seen = new Set<string>();
  const uniqueLines: string[] = [];

  lines.forEach((line) => {
    const key = normalizeLine(line, options);

    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    uniqueLines.push(line);
  });

  return {
    output: uniqueLines.join("\n"),
    removedCount: lines.length - uniqueLines.length,
    originalCount: lines.length,
    uniqueCount: uniqueLines.length,
  };
};
