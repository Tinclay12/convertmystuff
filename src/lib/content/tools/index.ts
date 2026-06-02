import type { ToolContentEnrichment } from "@/lib/content/types";
import { getToolById } from "@/lib/tools/access";
import { acresToSquareFeetContent } from "./acres-to-square-feet";
import { bmiCalculatorContent } from "./bmi-calculator";
import { calorieCalculatorContent } from "./calorie-calculator";
import { capRateCalculatorContent } from "./cap-rate-calculator";
import { categoryOverlays } from "./category-overlays";
import { converterSnippets } from "./converter-snippets";
import { unitConverterSnippets } from "./unit-converter-snippets";
import { faqSupplements } from "./faq-supplements";
import {
  csvToHtmlTableContent,
  csvToJsonContent,
  macroCalculatorContent,
  mortgageCalculatorProContent,
  nestedJsonToCsvContent,
  pdfMergeContent,
  pdfSplitContent,
  rentalDealAnalyzerContent,
} from "./flagship-snippets";
import { jsonToCsvContent } from "./json-to-csv";
import {
  concreteCalculatorContent,
  noiCalculatorContent,
  pngToIcoContent,
  utmParserContent,
} from "./resource-links";
import { wave2ToolEnrichment } from "./wave2-tool-enrichment";

const dedicatedContent: Record<string, ToolContentEnrichment> = {
  "acres-to-square-feet": acresToSquareFeetContent,
  "bmi-calculator": bmiCalculatorContent,
  "calorie-calculator": calorieCalculatorContent,
  "cap-rate-calculator": capRateCalculatorContent,
  "json-to-csv": jsonToCsvContent,
  "macro-calculator": macroCalculatorContent,
  "rental-deal-analyzer": rentalDealAnalyzerContent,
  "mortgage-calculator-pro": mortgageCalculatorProContent,
  "pdf-merge": pdfMergeContent,
  "pdf-split": pdfSplitContent,
  "csv-to-json": csvToJsonContent,
  "nested-json-to-csv": nestedJsonToCsvContent,
  "csv-to-html-table": csvToHtmlTableContent,
  "png-to-ico": pngToIcoContent,
  "utm-parser": utmParserContent,
  "concrete-calculator": concreteCalculatorContent,
  "noi-calculator": noiCalculatorContent,
};

const mergeEnrichment = (
  ...sources: (ToolContentEnrichment | undefined)[]
): ToolContentEnrichment | undefined => {
  const valid = sources.filter((source): source is ToolContentEnrichment => Boolean(source));
  if (valid.length === 0) {
    return undefined;
  }

  return valid.reduce<ToolContentEnrichment>(
    (acc, source) => ({
      contentTier: source.contentTier ?? acc.contentTier,
      guideSlug: source.guideSlug ?? acc.guideSlug,
      resourceSlugs: [...(acc.resourceSlugs ?? []), ...(source.resourceSlugs ?? [])],
      toolLinkGroups: source.toolLinkGroups ?? acc.toolLinkGroups,
      contentBlocks: [...(acc.contentBlocks ?? []), ...(source.contentBlocks ?? [])],
      additionalFaqs: [...(acc.additionalFaqs ?? []), ...(source.additionalFaqs ?? [])],
    }),
    {},
  );
};

const defaultUnitConverterSnippet = (toolId: string): ToolContentEnrichment => ({
  contentTier: "A",
  contentBlocks: [
    {
      id: "conversion-context",
      title: "Using this converter",
      variant: "info",
      paragraphs: [
        `This page converts ${toolId.replace(/-/g, " ")} using standard published factors. Enter a value above for an instant result, or use Try examples to load a sample.`,
        "Results copy locally in your browser—nothing is uploaded to a server.",
      ],
    },
  ],
});

const resolveConverterSnippet = (toolId: string): ToolContentEnrichment | undefined => {
  if (converterSnippets[toolId]) {
    return converterSnippets[toolId];
  }

  if (unitConverterSnippets[toolId]) {
    return unitConverterSnippets[toolId];
  }

  const tool = getToolById(toolId);
  if (tool?.category === "unit-converters") {
    return defaultUnitConverterSnippet(toolId);
  }

  return undefined;
};

export const getToolContentEnrichment = (toolId: string): ToolContentEnrichment | undefined => {
  return mergeEnrichment(
    dedicatedContent[toolId],
    wave2ToolEnrichment[toolId],
    resolveConverterSnippet(toolId),
    categoryOverlays[toolId],
    faqSupplements[toolId],
  );
};
