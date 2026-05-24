export type UtmInput = {
  websiteUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
};

export type UtmBuildResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

const appendParam = (params: URLSearchParams, key: string, value?: string) => {
  const trimmed = value?.trim();
  if (trimmed) {
    params.set(key, trimmed);
  }
};

export const buildUtmUrl = (input: UtmInput): UtmBuildResult => {
  const websiteUrl = input.websiteUrl.trim();

  if (!websiteUrl) {
    return { ok: false, error: "Enter a website URL." };
  }

  if (!input.source.trim() || !input.medium.trim() || !input.campaign.trim()) {
    return {
      ok: false,
      error: "Source, medium, and campaign are required UTM fields.",
    };
  }

  let url: URL;

  try {
    url = new URL(websiteUrl.includes("://") ? websiteUrl : `https://${websiteUrl}`);
  } catch {
    return { ok: false, error: "Enter a valid website URL." };
  }

  appendParam(url.searchParams, "utm_source", input.source);
  appendParam(url.searchParams, "utm_medium", input.medium);
  appendParam(url.searchParams, "utm_campaign", input.campaign);
  appendParam(url.searchParams, "utm_term", input.term);
  appendParam(url.searchParams, "utm_content", input.content);

  return { ok: true, url: url.toString() };
};
