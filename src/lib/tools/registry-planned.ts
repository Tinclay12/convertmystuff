import type { ToolDefinition, ToolStatus } from "./types";

type PlannedToolSeed = {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  keywords: string[];
  relatedTools?: string[];
  status?: Extract<ToolStatus, "planned" | "stub">;
  priority?: number;
};

const buildPlannedTool = (seed: PlannedToolSeed): ToolDefinition => {
  const status = seed.status ?? "planned";
  const path = seed.subcategory
    ? `/${seed.category}/${seed.subcategory}/${seed.slug}/`
    : `/${seed.category}/${seed.slug}/`;

  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    category: seed.category,
    subcategory: seed.subcategory,
    path,
    shortDescription: seed.shortDescription,
    metaTitle: `${seed.title} - Coming Soon | ConvertMyStuff`,
    metaDescription: `${seed.shortDescription} Coming soon to ConvertMyStuff.`,
    keywords: seed.keywords,
    relatedTools: seed.relatedTools ?? [],
    componentKey: "ComingSoonTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: false,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status,
    priority: seed.priority ?? 90,
    lastReviewed: "2026-05-23",
    explanation: seed.shortDescription,
    howToUse: ["This tool is not available yet."],
    examples: [],
    faqs: [],
    commonUseCases: [],
  };
};

/** Seeds for tools not yet published. Live registry entries take precedence. */
const plannedSeeds: PlannedToolSeed[] = [];

export const plannedTools: ToolDefinition[] = plannedSeeds.map(buildPlannedTool);
