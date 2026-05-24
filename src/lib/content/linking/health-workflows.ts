import type { ToolLinkGroup } from "@/lib/tools/types";

const healthWorkflowGroups: Record<string, ToolLinkGroup[]> = {
  "bmi-calculator": [
    {
      label: "Next in your workflow",
      toolIds: ["calorie-calculator", "macro-calculator"],
    },
    {
      label: "Related body metrics",
      toolIds: ["calorie-calculator"],
    },
  ],
  "calorie-calculator": [
    {
      label: "Next in your workflow",
      toolIds: ["macro-calculator"],
    },
    {
      label: "Related metrics",
      toolIds: ["bmi-calculator", "macro-calculator"],
    },
  ],
  "macro-calculator": [
    {
      label: "Related nutrition tools",
      toolIds: ["calorie-calculator", "bmi-calculator"],
    },
  ],
};

export const getHealthWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  return healthWorkflowGroups[toolId] ?? [];
};
