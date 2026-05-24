export type GuideSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  linkedToolIds?: string[];
};

export type ResourceExample = {
  title: string;
  description: string;
};

export type ResourceSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  linkedToolIds?: string[];
};

export type ResourceDefinition = {
  slug: string;
  categorySlug: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  quickAnswer: string;
  intro: string;
  sections: ResourceSection[];
  examples?: ResourceExample[];
  commonMistakes?: string[];
  primaryToolId: string;
  relatedToolIds?: string[];
  relatedResourceSlugs?: string[];
  lastReviewed: string;
  author?: string;
  reviewer?: string;
  /** Subcategory id for subcategory hub discovery */
  subcategoryId?: string;
};

export type ResourceCategoryDefinition = {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideDefinition = {
  slug: string;
  title: string;
  /** Short summary for index cards and hub listings */
  summary?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: GuideSection[];
  faqs?: GuideFaq[];
  /** YMYL disclaimer rendered at page footer */
  disclaimer?: string;
  primaryToolId: string;
  relatedToolIds?: string[];
  relatedGuideSlugs?: string[];
  lastReviewed: string;
  /** Category slug for hub discovery */
  categorySlug?: string;
  /** Subcategory id for hub discovery */
  subcategoryId?: string;
};

export type ToolContentEnrichment = {
  contentBlocks?: import("@/lib/tools/types").ToolContentBlock[];
  toolLinkGroups?: import("@/lib/tools/types").ToolLinkGroup[];
  guideSlug?: string;
  resourceSlugs?: string[];
  contentTier?: import("@/lib/tools/types").ContentTier;
  additionalFaqs?: import("@/lib/tools/types").ToolFaq[];
};
