import type { ToolLinkGroup } from "@/lib/tools/types";

type ConstructionWorkflowEntry = {
  reverse?: string[];
  related?: string[];
  workflow?: string[];
};

const pair = (reverseId: string, related: string[], workflow: string[]): ConstructionWorkflowEntry => ({
  reverse: [reverseId],
  related,
  workflow,
});

const constructionWorkflows: Record<string, ConstructionWorkflowEntry> = {
  "gravel-cubic-yards-to-tons": pair("gravel-tons-to-cubic-yards", ["gravel-calculator", "cubic-yards-to-cubic-feet"], ["gravel-calculator"]),
  "gravel-tons-to-cubic-yards": pair("gravel-cubic-yards-to-tons", ["gravel-calculator", "cubic-feet-to-cubic-yards"], ["gravel-calculator"]),
  "mulch-cubic-yards-to-tons": pair("mulch-tons-to-cubic-yards", ["mulch-calculator", "cubic-yards-to-cubic-feet"], ["mulch-calculator"]),
  "mulch-tons-to-cubic-yards": pair("mulch-cubic-yards-to-tons", ["mulch-calculator"], ["mulch-calculator"]),
  "concrete-cubic-yards-to-tons": pair("concrete-tons-to-cubic-yards", ["concrete-calculator", "cement-calculator"], ["concrete-calculator"]),
  "concrete-tons-to-cubic-yards": pair("concrete-cubic-yards-to-tons", ["concrete-calculator"], ["concrete-calculator"]),
  "concrete-calculator": {
    related: ["cement-calculator", "gravel-calculator", "mulch-calculator"],
    workflow: ["cement-calculator", "gravel-calculator"],
  },
};

const groupLabels: Record<keyof ConstructionWorkflowEntry, string> = {
  reverse: "Reverse conversion",
  related: "Related tools",
  workflow: "Next in your workflow",
};

export const getConstructionWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  const entry = constructionWorkflows[toolId];
  if (!entry) {
    return [];
  }

  return (Object.keys(groupLabels) as (keyof ConstructionWorkflowEntry)[])
    .map((key) => {
      const toolIds = entry[key];
      if (!toolIds?.length) {
        return null;
      }
      return { label: groupLabels[key], toolIds };
    })
    .filter((group): group is ToolLinkGroup => group !== null);
};
