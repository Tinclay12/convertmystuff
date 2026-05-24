type GtagFn = (...args: unknown[]) => void;

export type ContentEventName =
  | "guide_click"
  | "resource_click"
  | "workflow_link_click"
  | "content_tool_link_click";

export type ContentEventParams = {
  tool_id?: string;
  guide_slug?: string;
  resource_slug?: string;
  link_target?: string;
  link_group?: string;
};

const getGtag = (): GtagFn | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }
  const gtag = (window as Window & { gtag?: GtagFn }).gtag;
  return typeof gtag === "function" ? gtag : undefined;
};

export const trackContentEvent = (
  eventName: ContentEventName,
  params: ContentEventParams,
): void => {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("event", eventName, {
    ...params,
    event_category: "tool_content",
  });
};
