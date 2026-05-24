export type FlagshipEventName =
  | "flagship_calculate"
  | "flagship_export"
  | "flagship_share_link"
  | "flagship_file_process";

export type FlagshipEventParams = {
  tool_id: string;
  tool_category?: string;
  mode?: string;
  file_count?: number;
  export_format?: string;
};

type GtagFn = (...args: unknown[]) => void;

const getGtag = (): GtagFn | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }
  const gtag = (window as Window & { gtag?: GtagFn }).gtag;
  return typeof gtag === "function" ? gtag : undefined;
};

export const trackFlagshipEvent = (
  eventName: FlagshipEventName,
  params: FlagshipEventParams,
): void => {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("event", eventName, {
    ...params,
    event_category: "flagship_tool",
  });
};

export const FLAGSHIP_TOOL_IDS = [
  "rental-deal-analyzer",
  "mortgage-calculator-pro",
  "json-to-csv",
  "csv-to-json",
  "pdf-merge",
  "pdf-split",
  "bmi-calculator",
  "calorie-calculator",
  "macro-calculator",
  "regex-tester",
  "jwt-decoder",
  "csv-to-html-table",
  "cron-builder",
  "password-generator",
] as const;

export type FlagshipToolId = (typeof FLAGSHIP_TOOL_IDS)[number];

export const isFlagshipToolId = (toolId: string): toolId is FlagshipToolId => {
  return (FLAGSHIP_TOOL_IDS as readonly string[]).includes(toolId);
};
