export const SITE_NAME = "ConvertMyStuff";

export const SITE_DESCRIPTION =
  "Free online converters, calculators, and utility tools. Fast, useful, and no login required.";

export const getSiteUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://convertmystuff.com";
  return url.replace(/\/$/, "");
};

export const toAbsoluteUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
};
