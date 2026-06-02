import type { Metadata } from "next";
import type { CategoryDefinition, ToolDefinition } from "@/lib/tools/types";
import type { GuideDefinition, ResourceCategoryDefinition, ResourceDefinition } from "@/lib/content/types";
import type { LegalPageDefinition } from "@/lib/content/legal";
import { aboutPage } from "@/lib/content/about";
import { getResourceCategoryBySlug } from "@/lib/content/resources/categories";
import { SITE_NAME, toAbsoluteUrl } from "./site";

const INDEXABLE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

type OgImageOptions = {
  ogTitle: string;
  ogDescription?: string;
  ogEyebrow?: string;
  ogCategorySlug?: string;
};

const buildOgImageUrl = ({
  ogTitle,
  ogDescription,
  ogEyebrow,
  ogCategorySlug,
}: OgImageOptions): string => {
  const params = new URLSearchParams();
  params.set("title", ogTitle);
  if (ogDescription) params.set("description", ogDescription);
  if (ogEyebrow) params.set("eyebrow", ogEyebrow);
  if (ogCategorySlug) params.set("category", ogCategorySlug);
  return toAbsoluteUrl(`/og/?${params.toString()}`);
};

type SocialOptions = OgImageOptions & {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

const buildSocialMetadata = ({
  title,
  description,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  ...ogImageOptions
}: SocialOptions): Pick<Metadata, "openGraph" | "twitter"> => {
  const isArticle = type === "article";
  const imageUrl = buildOgImageUrl(ogImageOptions);
  const imageAlt = ogImageOptions.ogTitle;

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/png",
        },
      ],
      ...(isArticle && publishedTime ? { publishedTime } : {}),
      ...(isArticle && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
};

const buildCanonicalAlternates = (path: string): NonNullable<Metadata["alternates"]> => {
  const url = toAbsoluteUrl(path);
  return {
    canonical: url,
    languages: {
      en: url,
      "x-default": url,
    },
  };
};

export const buildCategoryMetadata = (category: CategoryDefinition): Metadata => {
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: buildCanonicalAlternates(category.path),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title: category.metaTitle,
      description: category.metaDescription,
      url: toAbsoluteUrl(category.path),
      ogTitle: category.title,
      ogDescription: category.description,
      ogEyebrow: "Category",
      ogCategorySlug: category.slug,
    }),
  };
};

export const buildToolMetadata = (
  tool: ToolDefinition,
  category?: CategoryDefinition,
): Metadata => {
  const shouldIndex = tool.status === "published";

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: buildCanonicalAlternates(tool.path),
    robots: shouldIndex ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
    ...buildSocialMetadata({
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: toAbsoluteUrl(tool.path),
      type: "article",
      modifiedTime: tool.lastReviewed,
      ogTitle: tool.title,
      ogDescription: tool.shortDescription,
      ogEyebrow: category?.title ?? "Free tool",
      ogCategorySlug: tool.category,
    }),
  };
};

export const buildHomeMetadata = (): Metadata => {
  const title = `${SITE_NAME} - Free Online Converters and Calculators`;
  const description =
    "Free online converters, calculators, and utility tools. Fast, useful, and no login required.";

  return {
    title,
    description,
    alternates: buildCanonicalAlternates("/"),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title,
      description,
      url: toAbsoluteUrl("/"),
      ogTitle: "Convert anything, in your browser.",
      ogDescription:
        "Free converters, calculators, and utilities. No upload, no account, no nonsense.",
      ogEyebrow: "Free online tools",
    }),
  };
};

export const buildToolsIndexMetadata = (): Metadata => {
  const title = `All Tools | ${SITE_NAME}`;
  const description =
    "Browse all free online converters, calculators, and utility tools on ConvertMyStuff. Search by name or category.";

  return {
    title,
    description,
    alternates: buildCanonicalAlternates("/tools/"),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title,
      description,
      url: toAbsoluteUrl("/tools/"),
      ogTitle: "All Tools",
      ogDescription:
        "Every free converter, calculator, and utility on ConvertMyStuff in one place.",
      ogEyebrow: "Tool index",
    }),
  };
};

export const buildSubcategoryMetadata = (
  categoryTitle: string,
  subcategoryTitle: string,
  description: string,
  path: string,
  categorySlug?: string,
): Metadata => {
  const title = `${subcategoryTitle} | ${categoryTitle} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: buildCanonicalAlternates(path),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title,
      description,
      url: toAbsoluteUrl(path),
      ogTitle: subcategoryTitle,
      ogDescription: description,
      ogEyebrow: categoryTitle,
      ogCategorySlug: categorySlug,
    }),
  };
};

export const buildGuideMetadata = (guide: GuideDefinition): Metadata => {
  const path = `/guides/${guide.slug}/`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: buildCanonicalAlternates(path),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: toAbsoluteUrl(path),
      type: "article",
      modifiedTime: guide.lastReviewed,
      ogTitle: guide.title,
      ogDescription: guide.summary ?? guide.metaDescription,
      ogEyebrow: "Guide",
      ogCategorySlug: guide.categorySlug,
    }),
  };
};

export const buildGuidesIndexMetadata = (): Metadata => {
  const title = `Guides | ${SITE_NAME}`;
  const description =
    "In-depth guides for BMI, cap rate, TDEE, JSON to CSV, and other topics covered by our free calculators and converters.";

  return {
    title,
    description,
    alternates: buildCanonicalAlternates("/guides/"),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title,
      description,
      url: toAbsoluteUrl("/guides/"),
      ogTitle: "Guides",
      ogDescription:
        "Step-by-step explainers for the calculators and converters on ConvertMyStuff.",
      ogEyebrow: "Guide library",
    }),
  };
};

export const buildResourceMetadata = (resource: ResourceDefinition): Metadata => {
  const path = `/resources/${resource.categorySlug}/${resource.slug}/`;
  const categoryRecord = getResourceCategoryBySlug(resource.categorySlug);
  return {
    title: resource.metaTitle,
    description: resource.metaDescription,
    keywords: resource.keywords,
    alternates: buildCanonicalAlternates(path),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title: resource.metaTitle,
      description: resource.metaDescription,
      url: toAbsoluteUrl(path),
      type: "article",
      modifiedTime: resource.lastReviewed,
      ogTitle: resource.title,
      ogDescription: resource.summary,
      ogEyebrow: categoryRecord?.title ?? "Resource",
    }),
  };
};

export const buildResourcesIndexMetadata = (): Metadata => {
  const title = `Resource Library | ${SITE_NAME}`;
  const description =
    "Structured explainers on conversions, formats, formulas, and workflows—each linked to a free tool on ConvertMyStuff.";

  return {
    title,
    description,
    alternates: buildCanonicalAlternates("/resources/"),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title,
      description,
      url: toAbsoluteUrl("/resources/"),
      ogTitle: "Resource Library",
      ogDescription:
        "Structured explainers on conversions, formats, formulas, and workflows.",
      ogEyebrow: "Resources",
    }),
  };
};

export const buildAboutMetadata = (): Metadata => {
  return {
    title: aboutPage.metaTitle,
    description: aboutPage.metaDescription,
    alternates: buildCanonicalAlternates(aboutPage.path),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title: aboutPage.metaTitle,
      description: aboutPage.metaDescription,
      url: toAbsoluteUrl(aboutPage.path),
      type: "article",
      modifiedTime: aboutPage.lastUpdated,
      ogTitle: aboutPage.title,
      ogDescription: aboutPage.summary,
      ogEyebrow: "About",
    }),
  };
};

export const buildLegalPageMetadata = (page: LegalPageDefinition): Metadata => {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: buildCanonicalAlternates(page.path),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title: page.metaTitle,
      description: page.metaDescription,
      url: toAbsoluteUrl(page.path),
      type: "article",
      modifiedTime: page.lastUpdated,
      ogTitle: page.title,
      ogDescription: page.summary,
      ogEyebrow: "Legal",
    }),
  };
};

export const buildResourceCategoryMetadata = (
  category: ResourceCategoryDefinition,
): Metadata => {
  const path = `/resources/${category.slug}/`;
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: buildCanonicalAlternates(path),
    robots: INDEXABLE_ROBOTS,
    ...buildSocialMetadata({
      title: category.metaTitle,
      description: category.metaDescription,
      url: toAbsoluteUrl(path),
      ogTitle: category.title,
      ogDescription: category.description,
      ogEyebrow: "Resources",
    }),
  };
};
