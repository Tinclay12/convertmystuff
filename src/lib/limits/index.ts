export const DEFAULT_TOOL_LIMITS = {
  maxInputLength: 500_000,
  maxFileSizeMB: 5,
  maxRegexTestStringLength: 100_000,
  maxRegexMatches: 1_000,
  supportsBatch: false,
} as const;

export const getToolLimitsForTool = () => {
  return { ...DEFAULT_TOOL_LIMITS };
};
