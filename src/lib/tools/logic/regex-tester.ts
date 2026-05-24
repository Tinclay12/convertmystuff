import { DEFAULT_TOOL_LIMITS } from "@/lib/limits";

export type RegexMatch = {
  match: string;
  index: number;
  groups: string[];
};

export type RegexTestResult =
  | { ok: true; matches: RegexMatch[]; flags: string }
  | { ok: false; error: string };

export const testRegex = (
  pattern: string,
  testString: string,
  flagChars: { g: boolean; i: boolean; m: boolean; s: boolean; u: boolean },
): RegexTestResult => {
  if (!pattern.trim()) {
    return { ok: false, error: "Enter a regex pattern." };
  }

  if (testString.length > DEFAULT_TOOL_LIMITS.maxRegexTestStringLength) {
    return {
      ok: false,
      error: `Test string exceeds ${DEFAULT_TOOL_LIMITS.maxRegexTestStringLength.toLocaleString()} characters.`,
    };
  }

  let flags = "";
  if (flagChars.g) flags += "g";
  if (flagChars.i) flags += "i";
  if (flagChars.m) flags += "m";
  if (flagChars.s) flags += "s";
  if (flagChars.u) flags += "u";

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags.includes("g") ? flags : `${flags}g`);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid regular expression.",
    };
  }

  const matches: RegexMatch[] = [];
  let match: RegExpExecArray | null;
  const execRegex = new RegExp(regex.source, flags.includes("g") ? flags : `${flags}g`);

  while ((match = execRegex.exec(testString)) !== null) {
    if (matches.length >= DEFAULT_TOOL_LIMITS.maxRegexMatches) {
      return {
        ok: false,
        error: `Too many matches (limit ${DEFAULT_TOOL_LIMITS.maxRegexMatches.toLocaleString()}). Refine your pattern or test string.`,
      };
    }

    matches.push({
      match: match[0],
      index: match.index,
      groups: match.slice(1).map((group) => group ?? ""),
    });
    if (match[0].length === 0) {
      execRegex.lastIndex += 1;
    }
    if (!flags.includes("g")) {
      break;
    }
  }

  return { ok: true, matches, flags };
};

export const highlightRegexMatches = (
  testString: string,
  matches: RegexMatch[],
): string => {
  if (matches.length === 0) {
    return testString;
  }

  const sorted = [...matches].sort((a, b) => b.index - a.index);
  let output = testString;
  sorted.forEach((item) => {
    const before = output.slice(0, item.index);
    const matched = output.slice(item.index, item.index + item.match.length);
    const after = output.slice(item.index + item.match.length);
    output = `${before}[[[${matched}]]]${after}`;
  });
  return output;
};
