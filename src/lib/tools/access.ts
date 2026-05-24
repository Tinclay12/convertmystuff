import { categories } from "./categories";
import { tools } from "./registry";
import { getSubcategoriesForCategory, getSubcategoryById } from "./subcategories";
import type { SubcategoryDefinition } from "./subcategories";
import type { CategoryDefinition, ToolDefinition, ToolLimits, ToolLinkGroup } from "./types";
import { enrichToolDefinition } from "@/lib/content/merge-tool-content";
import { getToolLimitsForTool } from "@/lib/limits";
import { getGuideBySlug, getAllGuides, getGuidesForCategory, getGuidesForSubcategory } from "@/lib/content/guides";
import {
  getAllResources,
  getPrimaryResourcesForTool,
  getResourcesForCategory,
  getResourcesForTool,
} from "@/lib/content/resources";
import type { GuideDefinition, ResourceDefinition } from "@/lib/content/types";

const normalizePath = (path: string): string => {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
};

export const isLiveTool = (tool: ToolDefinition): boolean => {
  return tool.status === "published";
};

export const isPlannedTool = (tool: ToolDefinition): boolean => {
  return tool.status === "planned" || tool.status === "stub" || tool.status === "draft";
};

export const isListableTool = (tool: ToolDefinition): boolean => {
  return isLiveTool(tool) || isPlannedTool(tool);
};

export const getAllCategories = (): CategoryDefinition[] => {
  return [...categories].sort((a, b) => a.priority - b.priority);
};

export const getCategoryBySlug = (slug: string): CategoryDefinition | undefined => {
  return categories.find((category) => category.slug === slug);
};

export const getAllTools = (): ToolDefinition[] => {
  return [...tools];
};

export const getPublishedTools = (): ToolDefinition[] => {
  return tools.filter((tool) => isLiveTool(tool));
};

export const getIndexableTools = (): ToolDefinition[] => {
  return tools.filter((tool) => isLiveTool(tool) || isPlannedTool(tool));
};

export const getToolById = (id: string): ToolDefinition | undefined => {
  return tools.find((tool) => tool.id === id);
};

export const getEnrichedTool = (toolId: string): ToolDefinition | undefined => {
  const tool = getToolById(toolId);
  if (!tool) {
    return undefined;
  }
  return enrichToolDefinition(tool);
};

export const getEnrichedToolBySegments = (
  categorySlug: string,
  segments: string[] = [],
): ToolDefinition | undefined => {
  const tool = getToolBySegments(categorySlug, segments);
  if (!tool) {
    return undefined;
  }
  return enrichToolDefinition(tool);
};

export type ResolvedToolLinkGroup = {
  label: string;
  tools: ToolDefinition[];
};

export const getResolvedToolLinkGroups = (tool: ToolDefinition): ResolvedToolLinkGroup[] => {
  if (!tool.toolLinkGroups?.length) {
    return [];
  }

  return tool.toolLinkGroups
    .map((group) => ({
      label: group.label,
      tools: group.toolIds
        .map((id) => getToolById(id))
        .filter((relatedTool): relatedTool is ToolDefinition => Boolean(relatedTool))
        .filter((relatedTool) => isLiveTool(relatedTool)),
    }))
    .filter((group) => group.tools.length > 0);
};

export { getGuideBySlug, getAllGuides, getGuidesForCategory, getGuidesForSubcategory };
export {
  getAllResources,
  getResourcesForCategory,
  getResourcesForTool,
  getPrimaryResourcesForTool,
};

export const getResourcesForSubcategory = (
  categorySlug: string,
  subcategoryId: string,
): ResourceDefinition[] => {
  return getAllResources().filter((resource) => {
    if (resource.subcategoryId) {
      return resource.categorySlug === categorySlug && resource.subcategoryId === subcategoryId;
    }
    const tool = getToolById(resource.primaryToolId);
    return resource.categorySlug === categorySlug && tool?.subcategory === subcategoryId;
  });
};
export type { GuideDefinition, ResourceDefinition, ToolLinkGroup };

export const getToolByPath = (path: string): ToolDefinition | undefined => {
  const normalized = normalizePath(path);
  return tools.find((tool) => normalizePath(tool.path) === normalized);
};

export const getToolBySegments = (
  categorySlug: string,
  segments: string[] = [],
): ToolDefinition | undefined => {
  const path = normalizePath(`/${categorySlug}/${segments.join("/")}`);
  return getToolByPath(path);
};

export const getToolsByCategory = (categorySlug: string): ToolDefinition[] => {
  return getPublishedTools().filter((tool) => tool.category === categorySlug);
};

export const getCategoryListingTools = (categorySlug: string): ToolDefinition[] => {
  const categoryTools = tools.filter((tool) => tool.category === categorySlug);
  const live = categoryTools.filter((tool) => isLiveTool(tool));
  const planned = categoryTools.filter((tool) => isPlannedTool(tool));
  return [...live, ...planned].sort((a, b) => a.priority - b.priority);
};

export type CategoryStats = {
  total: number;
  live: number;
  planned: number;
};

export const getCategoryStats = (categorySlug: string): CategoryStats => {
  const categoryTools = tools.filter((tool) => tool.category === categorySlug);
  const live = categoryTools.filter((tool) => isLiveTool(tool)).length;
  const planned = categoryTools.filter((tool) => isPlannedTool(tool)).length;
  return {
    total: categoryTools.length,
    live,
    planned,
  };
};

export type SubcategoryToolGroup = {
  subcategory: SubcategoryDefinition;
  liveTools: ToolDefinition[];
  plannedTools: ToolDefinition[];
};

export const getToolsGroupedBySubcategory = (
  categorySlug: string,
): SubcategoryToolGroup[] => {
  const subcategories = getSubcategoriesForCategory(categorySlug);
  const categoryTools = getCategoryListingTools(categorySlug);

  return subcategories
    .map((subcategory) => {
      const subcategoryTools = categoryTools.filter(
        (tool) => tool.subcategory === subcategory.id,
      );
      return {
        subcategory,
        liveTools: subcategoryTools.filter((tool) => isLiveTool(tool)),
        plannedTools: subcategoryTools.filter((tool) => isPlannedTool(tool)),
      };
    })
    .filter(
      (group) => group.liveTools.length > 0 || group.plannedTools.length > 0,
    );
};

export const getRecentTools = (limit = 6): ToolDefinition[] => {
  return [...getPublishedTools()]
    .sort((a, b) => b.lastReviewed.localeCompare(a.lastReviewed))
    .slice(0, limit);
};

export const getPopularTools = (limit = 6): ToolDefinition[] => {
  return [...getPublishedTools()]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
};

const featuredConverterIds = [
  "json-to-csv",
  "csv-to-json",
  "acres-to-square-feet",
  "square-meters-to-square-feet",
  "kg-to-lbs",
  "png-to-jpg",
] as const;

const isConverterTool = (tool: ToolDefinition): boolean => {
  if (tool.category === "unit-converters") {
    return true;
  }

  if (tool.category === "developer-tools" && tool.subcategory === "data-converters") {
    return true;
  }

  if (tool.category === "image-tools" && tool.subcategory === "format-converters") {
    return true;
  }

  if (tool.category === "document-tools" && tool.subcategory === "markup-converters") {
    return true;
  }

  if (
    tool.category === "construction-calculators" &&
    (tool.id.includes("cubic-yards-to-tons") || tool.id.includes("tons-to-cubic-yards"))
  ) {
    return true;
  }

  if (tool.id === "pdf-merge" || tool.id === "pdf-split") {
    return true;
  }

  return tool.title.toLowerCase().includes("converter");
};

export const getConverterTools = (): ToolDefinition[] => {
  return getPublishedTools()
    .filter(isConverterTool)
    .sort((a, b) => a.priority - b.priority);
};

export type ConverterToolGroup = {
  label: string;
  tools: ToolDefinition[];
};

export const getConverterToolsGrouped = (): ConverterToolGroup[] => {
  const converters = getConverterTools();
  const groups: Record<string, ToolDefinition[]> = {
    "Data format converters": [],
    "Unit converters": [],
    "Image converters": [],
    "Document converters": [],
    "Material converters": [],
  };

  for (const tool of converters) {
    if (tool.category === "developer-tools") {
      groups["Data format converters"].push(tool);
    } else if (tool.category === "unit-converters") {
      groups["Unit converters"].push(tool);
    } else if (tool.category === "image-tools") {
      groups["Image converters"].push(tool);
    } else if (tool.category === "construction-calculators") {
      groups["Material converters"].push(tool);
    } else {
      groups["Document converters"].push(tool);
    }
  }

  return Object.entries(groups)
    .filter(([, tools]) => tools.length > 0)
    .map(([label, tools]) => ({ label, tools }));
};

export const getFeaturedConverters = (limit = 6): ToolDefinition[] => {
  const published = getPublishedTools();
  const curated = featuredConverterIds
    .map((id) => published.find((tool) => tool.id === id))
    .filter((tool): tool is ToolDefinition => Boolean(tool));

  if (curated.length >= limit) {
    return curated.slice(0, limit);
  }

  const additional = published
    .filter(
      (tool) =>
        !featuredConverterIds.includes(tool.id as (typeof featuredConverterIds)[number]) &&
        (tool.category === "unit-converters" ||
          (tool.category === "developer-tools" && tool.subcategory === "data-converters") ||
          (tool.category === "image-tools" && tool.subcategory === "format-converters")),
    )
    .sort((a, b) => a.priority - b.priority);

  return [...curated, ...additional].slice(0, limit);
};

export type CategoryToolGroup = {
  category: CategoryDefinition;
  tools: ToolDefinition[];
};

export const getAllToolsGroupedByCategory = (): CategoryToolGroup[] => {
  return getAllCategories()
    .map((category) => ({
      category,
      tools: getCategoryListingTools(category.slug),
    }))
    .filter((group) => group.tools.length > 0);
};

export const searchTools = (query: string, toolList: ToolDefinition[]): ToolDefinition[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return toolList;
  }

  return toolList.filter((tool) => {
    const haystack = [
      tool.title,
      tool.shortDescription,
      ...tool.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
};

export const getRelatedTools = (toolId: string): ToolDefinition[] => {
  const tool = getToolById(toolId);
  if (!tool) {
    return [];
  }

  const relatedFromIds = tool.relatedTools
    .map((relatedId) => getToolById(relatedId))
    .filter((relatedTool): relatedTool is ToolDefinition => Boolean(relatedTool));

  if (relatedFromIds.length > 0) {
    return relatedFromIds.filter((relatedTool) => isLiveTool(relatedTool));
  }

  return getPublishedTools()
    .filter(
      (candidate) =>
        candidate.category === tool.category && candidate.id !== tool.id,
    )
    .slice(0, 4);
};

export const isCategoryVisible = (categorySlug: string): boolean => {
  return getCategoryListingTools(categorySlug).length > 0;
};

export const getRegistryStats = () => {
  const all = getAllTools();
  const live = all.filter((tool) => isLiveTool(tool)).length;
  const planned = all.filter((tool) => isPlannedTool(tool)).length;
  return {
    total: all.length,
    live,
    planned,
  };
};

export const getToolLimits = (): ToolLimits => {
  return getToolLimitsForTool();
};

export const getToolsForSubcategory = (
  categorySlug: string,
  subcategoryId: string,
): { liveTools: ToolDefinition[]; plannedTools: ToolDefinition[] } => {
  const categoryTools = getCategoryListingTools(categorySlug).filter(
    (tool) => tool.subcategory === subcategoryId,
  );

  return {
    liveTools: categoryTools.filter((tool) => isLiveTool(tool)),
    plannedTools: categoryTools.filter((tool) => isPlannedTool(tool)),
  };
};

export const isSubcategorySegment = (
  categorySlug: string,
  segment: string,
): boolean => {
  return Boolean(getSubcategoryById(categorySlug, segment));
};

export const getFeaturedToolsForCategory = (categorySlug: string, limit = 6): ToolDefinition[] => {
  return getPublishedTools()
    .filter((tool) => tool.category === categorySlug)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
};

export const buildRouteParams = (): Array<{
  category: string;
  segments?: string[];
}> => {
  const categoryParams = getAllCategories()
    .filter((category) => isCategoryVisible(category.slug))
    .map((category) => ({ category: category.slug }));

  const subcategoryParams = getAllCategories()
    .flatMap((category) =>
      getSubcategoriesForCategory(category.slug).map((subcategory) => ({
        category: category.slug,
        segments: [subcategory.id],
      })),
    )
    .filter(({ category, segments }) => {
      const subcategoryId = segments?.[0];
      if (!subcategoryId) {
        return false;
      }

      const { liveTools, plannedTools } = getToolsForSubcategory(category, subcategoryId);
      return liveTools.length > 0 || plannedTools.length > 0;
    });

  const toolParams = getIndexableTools().map((tool) => {
    const parts = normalizePath(tool.path).split("/").filter(Boolean);
    return {
      category: parts[0],
      segments: parts.slice(1),
    };
  });

  return [...categoryParams, ...subcategoryParams, ...toolParams];
};

export const assertPublishedToolSeo = (tool: ToolDefinition): boolean => {
  if (tool.status !== "published") {
    return true;
  }

  return (
    tool.relatedTools.length >= 2 &&
    Boolean(tool.examples?.length) &&
    Boolean(tool.faqs?.length)
  );
};

export const hasContentEnrichment = (tool: ToolDefinition): boolean => {
  return Boolean(
    tool.contentBlocks?.length ||
      tool.toolLinkGroups?.length ||
      tool.guideSlug ||
      tool.resourceSlugs?.length ||
      tool.contentTier,
  );
};
