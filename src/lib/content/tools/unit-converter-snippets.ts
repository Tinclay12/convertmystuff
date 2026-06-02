import type { ToolContentEnrichment } from "@/lib/content/types";
import { unitConverterConfigs } from "@/lib/tools/logic/unit-conversions";

const tierA = (blocks: ToolContentEnrichment["contentBlocks"]): ToolContentEnrichment => ({
  contentTier: "A",
  contentBlocks: blocks,
});

const inferUseCase = (toolId: string, fromLabel: string, toLabel: string): string => {
  if (toolId.includes("acre") || toolId.includes("hectare") || toolId.includes("square-feet")) {
    return "land and property listings";
  }
  if (toolId.includes("meter") || toolId.includes("feet") || toolId.includes("inch") || toolId.includes("mile") || toolId.includes("km") || toolId.includes("yard")) {
    return "construction dimensions, travel, and product specs";
  }
  if (toolId.includes("kg") || toolId.includes("lb") || toolId.includes("gram") || toolId.includes("ounce") || toolId.includes("stone")) {
    return "shipping, fitness, and recipe scaling";
  }
  if (toolId.includes("liter") || toolId.includes("gallon") || toolId.includes("cup") || toolId.includes("ml")) {
    return "cooking, chemistry, and fuel estimates";
  }
  if (toolId.includes("celsius") || toolId.includes("fahrenheit") || toolId.includes("kelvin")) {
    return "weather, HVAC, and science coursework";
  }
  return "everyday measurement tasks";
};

const buildSnippet = (toolId: string): ToolContentEnrichment => {
  const config = unitConverterConfigs[toolId];
  if (!config) {
    return tierA([]);
  }

  const fromLabel = config.inputLabel;
  const toLabel = config.outputLabel;
  const useCase = inferUseCase(toolId, fromLabel, toLabel);
  const reverseNote = config.reverseToolId
    ? `Need the reverse conversion? Use ${config.reverseLabel ?? config.reverseToolId.replace(/-/g, " ")}.`
    : "Enter a value above for an instant result, or load Try examples for a sample input.";

  return tierA([
    {
      id: "conversion-context",
      title: `${fromLabel} to ${toLabel}`,
      variant: "info",
      paragraphs: [
        `Convert ${fromLabel.toLowerCase()} to ${toLabel.toLowerCase()} with standard published factors—useful for ${useCase}.`,
        reverseNote,
        "Results are calculated locally in your browser; nothing is uploaded to a server.",
      ],
      linkedToolIds: config.reverseToolId ? [config.reverseToolId] : undefined,
    },
  ]);
};

export const unitConverterSnippets: Record<string, ToolContentEnrichment> = Object.fromEntries(
  Object.keys(unitConverterConfigs).map((toolId) => [toolId, buildSnippet(toolId)]),
);
