import type { LogicResult } from "./unit-conversions";
import { buildUtmUrl } from "./utm-builder";

export const generateMetaTags = (values: {
  title: string;
  description: string;
  url: string;
}): LogicResult => {
  if (!values.title.trim() || !values.description.trim()) {
    return { ok: false, error: "Enter a title and description." };
  }

  const urlLine = values.url.trim()
    ? `<link rel="canonical" href="${values.url.trim()}" />\n`
    : "";

  const output = `${urlLine}<title>${values.title.trim()}</title>
<meta name="description" content="${values.description.trim()}" />
<meta property="og:title" content="${values.title.trim()}" />
<meta property="og:description" content="${values.description.trim()}" />${
    values.url.trim() ? `\n<meta property="og:url" content="${values.url.trim()}" />` : ""
  }`;

  return { ok: true, output };
};

export const generateSlug = (input: string): LogicResult => {
  if (!input.trim()) {
    return { ok: false, error: "Enter a title to convert into a slug." };
  }

  const output = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return { ok: true, output };
};

export const parseUtmParameters = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste a URL with UTM parameters." };
  }

  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    const params = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const lines = params.map((key) => `${key}: ${url.searchParams.get(key) ?? "(not set)"}`);
    return { ok: true, output: lines.join("\n") };
  } catch {
    return { ok: false, error: "Enter a valid URL." };
  }
};

export const generateHashtags = (input: string): LogicResult => {
  if (!input.trim()) {
    return { ok: false, error: "Enter keywords or a phrase." };
  }

  const tags = input
    .split(/[\s,]+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean)
    .slice(0, 15)
    .map((word) => `#${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`);

  return { ok: true, output: tags.join(" ") };
};

export const generateTwitterCardTags = (values: {
  title: string;
  description: string;
  imageUrl: string;
  cardType: string;
}): LogicResult => {
  if (!values.title.trim() || !values.description.trim()) {
    return { ok: false, error: "Enter a title and description." };
  }

  const card = values.cardType.trim() || "summary_large_image";
  const output = [
    `<meta name="twitter:card" content="${card}" />`,
    `<meta name="twitter:title" content="${values.title.trim()}" />`,
    `<meta name="twitter:description" content="${values.description.trim()}" />`,
    values.imageUrl.trim()
      ? `<meta name="twitter:image" content="${values.imageUrl.trim()}" />`
      : "<!-- twitter:image not set -->",
  ].join("\n");

  return { ok: true, output };
};

export const generateRobotsTxt = (values: Record<string, string>): LogicResult => {
  const userAgent = values.userAgent?.trim() || "*";
  const allow = values.allow?.trim() || "/";
  const disallow = values.disallow?.trim();
  const sitemap = values.sitemap?.trim();

  const lines = [
    `User-agent: ${userAgent}`,
    `Allow: ${allow}`,
    ...(disallow ? [`Disallow: ${disallow}`] : []),
    ...(sitemap ? ["", `Sitemap: ${sitemap}`] : []),
  ];

  return { ok: true, output: lines.join("\n") };
};

export const generateOpenGraphPreview = (values: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}): LogicResult => {
  if (!values.title.trim() || !values.description.trim()) {
    return { ok: false, error: "Enter a title and description." };
  }

  const output = [
    "Open Graph preview fields:",
    `og:title — ${values.title.trim()}`,
    `og:description — ${values.description.trim()}`,
    values.url.trim() ? `og:url — ${values.url.trim()}` : "og:url — (not set)",
    values.imageUrl.trim() ? `og:image — ${values.imageUrl.trim()}` : "og:image — (not set)",
    "",
    "Suggested share card:",
    `Title: ${values.title.trim()}`,
    `Description: ${values.description.trim()}`,
  ].join("\n");

  return { ok: true, output };
};

export const generateQrCodeDataUrl = async (input: string): Promise<LogicResult> => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter a URL or text to encode." };
  }

  try {
    const QRCode = await import("qrcode");
    const dataUrl = await QRCode.toDataURL(trimmed, {
      margin: 2,
      width: 256,
    });
    return { ok: true, output: dataUrl };
  } catch {
    return { ok: false, error: "Could not generate QR code." };
  }
};

export type MarketingField = {
  key: string;
  label: string;
  placeholder: string;
};

export type MarketingToolConfig =
  | {
      kind: "fields";
      fields: MarketingField[];
      transform: (values: Record<string, string>) => LogicResult;
    }
  | {
      kind: "single";
      inputLabel: string;
      outputLabel: string;
      inputPlaceholder: string;
      transform: (input: string) => LogicResult;
    };

export const marketingToolConfigs: Record<string, MarketingToolConfig> = {
  "meta-tag-generator": {
    kind: "fields",
    fields: [
      { key: "title", label: "Page title", placeholder: "Free JSON to CSV Converter" },
      { key: "description", label: "Meta description", placeholder: "Convert JSON to CSV online..." },
      { key: "url", label: "Canonical URL (optional)", placeholder: "https://example.com/page/" },
    ],
    transform: (values) =>
      generateMetaTags({
        title: values.title ?? "",
        description: values.description ?? "",
        url: values.url ?? "",
      }),
  },
  "slug-generator": {
    kind: "single",
    inputLabel: "Title or phrase",
    outputLabel: "URL slug",
    inputPlaceholder: "JSON to CSV Converter Online",
    transform: generateSlug,
  },
  "utm-parser": {
    kind: "single",
    inputLabel: "Campaign URL",
    outputLabel: "Parsed UTM parameters",
    inputPlaceholder: "https://example.com/?utm_source=newsletter&utm_medium=email",
    transform: parseUtmParameters,
  },
  "hashtag-generator": {
    kind: "single",
    inputLabel: "Keywords or phrase",
    outputLabel: "Suggested hashtags",
    inputPlaceholder: "real estate investing rental property",
    transform: generateHashtags,
  },
  "open-graph-preview": {
    kind: "fields",
    fields: [
      { key: "title", label: "Page title", placeholder: "Free JSON to CSV Converter" },
      { key: "description", label: "Description", placeholder: "Convert JSON to CSV online..." },
      { key: "url", label: "Page URL (optional)", placeholder: "https://example.com/page/" },
      { key: "imageUrl", label: "Image URL (optional)", placeholder: "https://example.com/og.png" },
    ],
    transform: (values) =>
      generateOpenGraphPreview({
        title: values.title ?? "",
        description: values.description ?? "",
        url: values.url ?? "",
        imageUrl: values.imageUrl ?? "",
      }),
  },
  "twitter-card-generator": {
    kind: "fields",
    fields: [
      { key: "title", label: "Page title", placeholder: "Free JSON to CSV Converter" },
      { key: "description", label: "Description", placeholder: "Convert JSON to CSV online..." },
      { key: "imageUrl", label: "Image URL (optional)", placeholder: "https://example.com/card.png" },
      { key: "cardType", label: "Card type", placeholder: "summary_large_image" },
    ],
    transform: (values) =>
      generateTwitterCardTags({
        title: values.title ?? "",
        description: values.description ?? "",
        imageUrl: values.imageUrl ?? "",
        cardType: values.cardType ?? "summary_large_image",
      }),
  },
  "robots-txt-generator": {
    kind: "fields",
    fields: [
      { key: "userAgent", label: "User-agent", placeholder: "*" },
      { key: "allow", label: "Allow path", placeholder: "/" },
      { key: "disallow", label: "Disallow path (optional)", placeholder: "/admin/" },
      { key: "sitemap", label: "Sitemap URL (optional)", placeholder: "https://example.com/sitemap.xml" },
    ],
    transform: generateRobotsTxt,
  },
};

export { buildUtmUrl };
