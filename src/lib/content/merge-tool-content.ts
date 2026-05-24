import { getConstructionWorkflowGroups } from "@/lib/content/linking/construction-workflows";
import { getConverterWorkflowGroups } from "@/lib/content/linking/converter-workflows";
import { getDeveloperWorkflowGroups } from "@/lib/content/linking/developer-workflows";
import { getDocumentWorkflowGroups } from "@/lib/content/linking/document-workflows";
import { getFinanceWorkflowGroups } from "@/lib/content/linking/finance-workflows";
import { getHealthWorkflowGroups } from "@/lib/content/linking/health-workflows";
import { getRealEstateWorkflowGroups } from "@/lib/content/linking/real-estate-workflows";
import { getToolContentEnrichment } from "@/lib/content/tools";
import type { ToolDefinition, ToolLinkGroup } from "@/lib/tools/types";

const categoryLinkResolvers: Record<string, (toolId: string) => ToolLinkGroup[]> = {
  "health-fitness-calculators": getHealthWorkflowGroups,
  "real-estate-calculators": getRealEstateWorkflowGroups,
  "finance-calculators": getFinanceWorkflowGroups,
  "developer-tools": getDeveloperWorkflowGroups,
  "document-tools": getDocumentWorkflowGroups,
  "unit-converters": getConverterWorkflowGroups,
  "construction-calculators": getConstructionWorkflowGroups,
};

const resolveLinkGroups = (tool: ToolDefinition): ToolLinkGroup[] => {
  const enrichment = getToolContentEnrichment(tool.id);
  if (enrichment?.toolLinkGroups?.length) {
    return enrichment.toolLinkGroups;
  }

  const categoryResolver = categoryLinkResolvers[tool.category];
  if (categoryResolver) {
    const groups = categoryResolver(tool.id);
    if (groups.length > 0) {
      return groups;
    }
  }

  return getConverterWorkflowGroups(tool.id);
};

export const enrichToolDefinition = (tool: ToolDefinition): ToolDefinition => {
  const enrichment = getToolContentEnrichment(tool.id);
  const linkGroups = resolveLinkGroups(tool);
  const mergedFaqs =
    enrichment?.additionalFaqs && enrichment.additionalFaqs.length > 0
      ? [...(tool.faqs ?? []), ...enrichment.additionalFaqs]
      : tool.faqs;

  if (!enrichment && linkGroups.length === 0) {
    return tool;
  }

  return {
    ...tool,
    faqs: mergedFaqs,
    contentBlocks: enrichment?.contentBlocks?.length ? enrichment.contentBlocks : undefined,
    toolLinkGroups: linkGroups.length > 0 ? linkGroups : undefined,
    guideSlug: enrichment?.guideSlug,
    resourceSlugs: enrichment?.resourceSlugs,
    contentTier: enrichment?.contentTier,
  };
};

export const getGuidePath = (slug: string): string => {
  return `/guides/${slug}/`;
};

export const isTierCContent = (tool: ToolDefinition): boolean => {
  return tool.contentTier === "C" || Boolean(tool.guideSlug);
};
