export type ToolEventName =
  | "tool_copy"
  | "tool_download"
  | "tool_example_load"
  | "tool_share";

export type ToolEventParams = {
  tool_id: string;
  component_key?: string;
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

export const trackToolEvent = (eventName: ToolEventName, params: ToolEventParams): void => {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("event", eventName, {
    ...params,
    event_category: "generic_tool",
  });
};
