export type ExecutionMode = "client" | "server" | "hybrid" | "external";

export type Monetization = "ads" | "affiliate" | "lead-gen" | "premium" | "none";

export type SchemaType =
  | "SoftwareApplication"
  | "WebApplication"
  | "Calculator"
  | "WebPage";

export type ToolStatus =
  | "published"
  | "stub"
  | "planned"
  | "draft"
  | "noindex"
  | "archived";

export type ToolExample = {
  title: string;
  input: string;
  output: string;
  explanation?: string;
  /** Numeric value for ?value= query prefill on converter tools */
  prefillValue?: string;
  /** Query string without leading ? for multi-field tool prefill and share links */
  prefillQuery?: string;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ContentTier = "A" | "B" | "C";

export type ToolContentBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  variant?: "info" | "tip" | "warning";
  linkedToolIds?: string[];
  /** Query string without leading ? — appended to linked tool paths */
  linkedToolPrefills?: Record<string, string>;
};

export type ToolLinkGroup = {
  label: string;
  toolIds: string[];
};

export type ToolDefinition = {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  path: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  relatedTools: string[];
  componentKey: string;
  executionMode: ExecutionMode;
  monetization: Monetization;
  premiumEligible: boolean;
  requiresAuth: boolean;
  schemaType: SchemaType;
  status: ToolStatus;
  priority: number;
  lastReviewed: string;
  explanation?: string;
  howToUse?: string[];
  examples?: ToolExample[];
  formula?: string;
  assumptions?: string[];
  faqs?: ToolFaq[];
  commonUseCases?: string[];
  sourceNotes?: string[];
  contentBlocks?: ToolContentBlock[];
  toolLinkGroups?: ToolLinkGroup[];
  guideSlug?: string;
  resourceSlugs?: string[];
  contentTier?: ContentTier;
};

export type CategoryDefinition = {
  id: string;
  title: string;
  slug: string;
  path: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  priority: number;
  accentSlug?: string;
  /** Longer editorial intro for category hub SEO */
  intro?: string;
  /** Bullet list of workflows for hub pages */
  useCases?: string[];
};

export type ToolLimits = {
  maxInputLength: number;
  maxFileSizeMB: number;
  supportsBatch: boolean;
};
