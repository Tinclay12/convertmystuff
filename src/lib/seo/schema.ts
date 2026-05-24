import type { CategoryDefinition, ToolDefinition } from "@/lib/tools/types";
import type { GuideDefinition, ResourceDefinition } from "@/lib/content/types";
import { getResourceCategoryBySlug } from "@/lib/content/resources/categories";
import { SITE_NAME, toAbsoluteUrl } from "./site";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

const SITE_URL = () => toAbsoluteUrl("/");

const publisherReference = () => ({
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL(),
  logo: {
    "@type": "ImageObject",
    url: toAbsoluteUrl("/icon.svg"),
  },
});

export const buildOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL(),
    logo: toAbsoluteUrl("/icon.svg"),
    description:
      "Free online converters, calculators, and utility tools. Fast, useful, and no login required.",
  };
};

export const buildCategoryBreadcrumbs = (
  category: CategoryDefinition,
): BreadcrumbItem[] => {
  return [
    { label: "Home", href: "/" },
    { label: category.title, href: category.path },
  ];
};

export const buildToolBreadcrumbs = (
  tool: ToolDefinition,
  category: CategoryDefinition,
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: category.title, href: category.path },
  ];

  if (tool.subcategory) {
    items.push({
      label: tool.subcategory.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
      href: `/${category.slug}/${tool.subcategory}/`,
    });
  }

  items.push({ label: tool.title, href: tool.path });
  return items;
};

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: toAbsoluteUrl(item.href),
    })),
  };
};

export const buildToolSchema = (tool: ToolDefinition) => {
  return {
    "@context": "https://schema.org",
    "@type": tool.schemaType,
    name: tool.title,
    description: tool.shortDescription,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: toAbsoluteUrl(tool.path),
    isAccessibleForFree: true,
    inLanguage: "en",
    publisher: publisherReference(),
    ...(tool.lastReviewed ? { dateModified: tool.lastReviewed } : {}),
  };
};

export const buildWebPageSchema = (
  title: string,
  description: string,
  path: string,
  options: { dateModified?: string } = {},
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: toAbsoluteUrl(path),
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL(),
    },
    publisher: publisherReference(),
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
  };
};

export const buildFaqSchema = (
  faqs: { question: string; answer: string }[] | undefined,
) => {
  if (!faqs?.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const buildToolFaqSchema = (tool: ToolDefinition) => buildFaqSchema(tool.faqs);

export const buildHowToSchema = (tool: ToolDefinition) => {
  if (!tool.howToUse?.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.title}`,
    description: tool.shortDescription,
    step: tool.howToUse.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
  };
};

export const buildGuideWebPageSchema = (
  guide: GuideDefinition,
  primaryTool?: ToolDefinition,
) => {
  const path = `/guides/${guide.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    url: toAbsoluteUrl(path),
    mainEntityOfPage: toAbsoluteUrl(path),
    inLanguage: "en",
    dateModified: guide.lastReviewed,
    datePublished: guide.lastReviewed,
    author: publisherReference(),
    publisher: publisherReference(),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL(),
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "p"],
    },
    ...(primaryTool && {
      about: {
        "@type": "SoftwareApplication",
        name: primaryTool.title,
        url: toAbsoluteUrl(primaryTool.path),
      },
    }),
  };
};

export const buildWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL(),
    inLanguage: "en",
    publisher: publisherReference(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${toAbsoluteUrl("/tools/")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

export const buildItemListSchema = (
  name: string,
  tools: ToolDefinition[],
) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: toAbsoluteUrl(tool.path),
    })),
  };
};

export const buildGuideBreadcrumbs = (guide: GuideDefinition): BreadcrumbItem[] => {
  return [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides/" },
    { label: guide.title, href: `/guides/${guide.slug}/` },
  ];
};

export const buildResourceBreadcrumbs = (resource: ResourceDefinition): BreadcrumbItem[] => {
  const category = getResourceCategoryBySlug(resource.categorySlug);
  const categoryLabel =
    category?.title ??
    resource.categorySlug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources/" },
    {
      label: categoryLabel,
      href: `/resources/${resource.categorySlug}/`,
    },
    {
      label: resource.title,
      href: `/resources/${resource.categorySlug}/${resource.slug}/`,
    },
  ];
};

export const buildResourceArticleSchema = (
  resource: ResourceDefinition,
  primaryTool?: ToolDefinition,
) => {
  const path = `/resources/${resource.categorySlug}/${resource.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.metaDescription,
    url: toAbsoluteUrl(path),
    mainEntityOfPage: toAbsoluteUrl(path),
    inLanguage: "en",
    dateModified: resource.lastReviewed,
    datePublished: resource.lastReviewed,
    author: resource.author
      ? { "@type": "Person", name: resource.author }
      : publisherReference(),
    publisher: publisherReference(),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL(),
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "p"],
    },
    ...(primaryTool && {
      about: {
        "@type": "SoftwareApplication",
        name: primaryTool.title,
        url: toAbsoluteUrl(primaryTool.path),
      },
    }),
  };
};

export const buildResourceCategoryBreadcrumbs = (
  categoryTitle: string,
  categorySlug: string,
): BreadcrumbItem[] => {
  return [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources/" },
    { label: categoryTitle, href: `/resources/${categorySlug}/` },
  ];
};
