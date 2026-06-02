import { countWords } from "./text-processing";

export type WordCountAnalysis = {
  ok: true;
  stats: {
    words: number;
    characters: number;
    readingMinutes: number;
    topKeyword: string;
    socialLimits: { platform: string; count: number; limit: number; over: boolean }[];
  };
};

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "is",
  "are",
  "was",
  "were",
  "with",
  "as",
  "by",
  "from",
  "that",
  "this",
  "it",
  "be",
]);

export const analyzeWordCount = (input: string): WordCountAnalysis => {
  const base = countWords(input);
  const words = base.ok && base.meta && typeof base.meta.words === "number" ? base.meta.words : 0;
  const characters = input.length;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));

  const tokens = input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

  const frequency = new Map<string, number>();
  tokens.forEach((token) => {
    frequency.set(token, (frequency.get(token) ?? 0) + 1);
  });

  let topKeyword = "—";
  let topCount = 0;
  frequency.forEach((count, token) => {
    if (count > topCount) {
      topCount = count;
      topKeyword = `${token} (${((count / Math.max(words, 1)) * 100).toFixed(1)}%)`;
    }
  });

  const socialLimits = [
    { platform: "X post", count: characters, limit: 280 },
    { platform: "Meta description", count: characters, limit: 160 },
    { platform: "LinkedIn post", count: characters, limit: 3000 },
  ].map((item) => ({
    ...item,
    over: item.count > item.limit,
  }));

  return {
    ok: true,
    stats: {
      words,
      characters,
      readingMinutes,
      topKeyword,
      socialLimits,
    },
  };
};
