import type { ToolLinkGroup } from "@/lib/tools/types";

const realEstateWorkflowGroups: Record<string, ToolLinkGroup[]> = {
  "cap-rate-calculator": [
    {
      label: "Related investment metrics",
      toolIds: ["noi-calculator", "dscr-calculator", "cash-on-cash-calculator", "grm-calculator"],
    },
    {
      label: "Full deal analysis",
      toolIds: ["rental-deal-analyzer"],
    },
  ],
  "noi-calculator": [
    {
      label: "Related investment metrics",
      toolIds: ["cap-rate-calculator", "dscr-calculator", "grm-calculator"],
    },
    {
      label: "Full deal analysis",
      toolIds: ["rental-deal-analyzer"],
    },
  ],
  "dscr-calculator": [
    {
      label: "Related investment metrics",
      toolIds: ["noi-calculator", "cap-rate-calculator", "mortgage-calculator"],
    },
    {
      label: "Full deal analysis",
      toolIds: ["rental-deal-analyzer"],
    },
  ],
  "cash-on-cash-calculator": [
    {
      label: "Related investment metrics",
      toolIds: ["cap-rate-calculator", "roi-calculator", "mortgage-calculator"],
    },
    {
      label: "Full deal analysis",
      toolIds: ["rental-deal-analyzer"],
    },
  ],
  "grm-calculator": [
    {
      label: "Related investment metrics",
      toolIds: ["cap-rate-calculator", "noi-calculator", "price-per-square-foot"],
    },
  ],
  "rental-deal-analyzer": [
    {
      label: "Single-metric calculators",
      toolIds: ["cap-rate-calculator", "noi-calculator", "dscr-calculator", "cash-on-cash-calculator"],
    },
    {
      label: "Financing tools",
      toolIds: ["mortgage-calculator-pro", "loan-to-value-calculator"],
    },
  ],
  "roi-calculator": [
    {
      label: "Related investment metrics",
      toolIds: ["cap-rate-calculator", "cash-on-cash-calculator", "property-tax-estimator"],
    },
  ],
  "mortgage-calculator": [
    {
      label: "Related financing tools",
      toolIds: ["loan-to-value-calculator", "cap-rate-calculator", "price-per-square-foot"],
    },
    {
      label: "Advanced mortgage analysis",
      toolIds: ["mortgage-calculator-pro"],
    },
  ],
  "loan-to-value-calculator": [
    {
      label: "Related financing tools",
      toolIds: ["mortgage-calculator", "cap-rate-calculator", "dscr-calculator"],
    },
  ],
  "price-per-square-foot": [
    {
      label: "Area converters",
      toolIds: ["acres-to-square-feet", "square-feet-to-acres"],
    },
    {
      label: "Related investment metrics",
      toolIds: ["cap-rate-calculator", "mortgage-calculator", "property-tax-estimator"],
    },
  ],
  "property-tax-estimator": [
    {
      label: "Related investment metrics",
      toolIds: ["mortgage-calculator", "price-per-square-foot", "cap-rate-calculator"],
    },
  ],
};

export const getRealEstateWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  return realEstateWorkflowGroups[toolId] ?? [];
};
