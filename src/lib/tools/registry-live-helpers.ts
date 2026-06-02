import type { ToolDefinition, ToolExample, ToolFaq } from "./types";

export type LiveToolSeed = {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  relatedTools: string[];
  componentKey: string;
  schemaType?: ToolDefinition["schemaType"];
  priority?: number;
  explanation: string;
  howToUse: string[];
  examples: ToolExample[];
  faqs: ToolFaq[];
  commonUseCases: string[];
  formula?: string;
  assumptions?: string[];
  sourceNotes?: string[];
  pathOverride?: string;
  lastReviewed?: string;
};

export const buildLiveTool = (seed: LiveToolSeed): ToolDefinition => {
  const path =
    seed.pathOverride ??
    (seed.subcategory
      ? `/${seed.category}/${seed.subcategory}/${seed.slug}/`
      : `/${seed.category}/${seed.slug}/`);

  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    category: seed.category,
    subcategory: seed.subcategory,
    path,
    shortDescription: seed.shortDescription,
    metaTitle: seed.metaTitle,
    metaDescription: seed.metaDescription,
    keywords: seed.keywords,
    relatedTools: seed.relatedTools,
    componentKey: seed.componentKey,
    executionMode: "client",
    monetization: "ads",
    premiumEligible: true,
    requiresAuth: false,
    schemaType: seed.schemaType ?? "SoftwareApplication",
    status: "published",
    priority: seed.priority ?? 20,
    lastReviewed: seed.lastReviewed ?? "2026-05-23",
    explanation: seed.explanation,
    howToUse: seed.howToUse,
    examples: seed.examples,
    faqs: seed.faqs,
    commonUseCases: seed.commonUseCases,
    formula: seed.formula,
    assumptions: seed.assumptions,
    sourceNotes: seed.sourceNotes,
  };
};

export const faq = (question: string, answer: string): ToolFaq => ({ question, answer });

export const standardLocalFaqs = (): ToolFaq[] => [
  faq("Does my data leave my browser?", "No. Processing runs locally in your browser."),
  faq("Do I need an account?", "No. Public tools work without login."),
  faq("Can I copy the result?", "Yes. Use the copy button on the output panel."),
];

export const standardHowToUse = (): string[] => [
  "Enter or paste your input values.",
  "Review the generated output instantly.",
  "Copy, download, or reset as needed.",
];

type CompactLiveSeed = {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  relatedTools: string[];
  componentKey: string;
  explanation: string;
  examples?: ToolExample[];
  formula?: string;
  schemaType?: ToolDefinition["schemaType"];
  assumptions?: string[];
};

export const buildCompactLiveTool = (seed: CompactLiveSeed): ToolDefinition =>
  buildLiveTool({
    ...seed,
    howToUse: standardHowToUse(),
    examples: seed.examples ?? [
      {
        title: "Sample input",
        input: "See tool fields",
        output: "Calculated or converted result",
        explanation: seed.explanation,
      },
    ],
    faqs: standardLocalFaqs(),
    commonUseCases: [seed.shortDescription],
  });
