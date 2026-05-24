import type { ToolLinkGroup } from "@/lib/tools/types";

const financeWorkflowGroups: Record<string, ToolLinkGroup[]> = {
  "mortgage-calculator-pro": [
    {
      label: "Related finance tools",
      toolIds: ["loan-payment-calculator", "compound-interest-calculator", "break-even-calculator"],
    },
    {
      label: "Real estate analysis",
      toolIds: ["rental-deal-analyzer", "mortgage-calculator", "loan-to-value-calculator"],
    },
  ],
  "loan-payment-calculator": [
    {
      label: "Advanced mortgage analysis",
      toolIds: ["mortgage-calculator-pro"],
    },
    {
      label: "Related finance tools",
      toolIds: ["compound-interest-calculator", "break-even-calculator", "percentage-calculator"],
    },
    {
      label: "Real estate financing",
      toolIds: ["mortgage-calculator", "loan-to-value-calculator"],
    },
  ],
  "compound-interest-calculator": [
    {
      label: "Related finance tools",
      toolIds: ["loan-payment-calculator", "break-even-calculator", "margin-calculator"],
    },
  ],
  "break-even-calculator": [
    {
      label: "Related finance tools",
      toolIds: ["margin-calculator", "markup-calculator", "percentage-calculator"],
    },
  ],
  "margin-calculator": [
    {
      label: "Pricing workflow",
      toolIds: ["markup-calculator", "discount-calculator", "break-even-calculator"],
    },
  ],
  "markup-calculator": [
    {
      label: "Pricing workflow",
      toolIds: ["margin-calculator", "discount-calculator", "tip-calculator"],
    },
  ],
  "discount-calculator": [
    {
      label: "Pricing workflow",
      toolIds: ["margin-calculator", "markup-calculator", "percentage-calculator"],
    },
  ],
  "tip-calculator": [
    {
      label: "Related finance tools",
      toolIds: ["percentage-calculator", "discount-calculator"],
    },
  ],
  "percentage-calculator": [
    {
      label: "Related finance tools",
      toolIds: ["tip-calculator", "discount-calculator", "margin-calculator"],
    },
  ],
};

export const getFinanceWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  return financeWorkflowGroups[toolId] ?? [];
};
