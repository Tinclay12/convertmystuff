import type { ToolContentEnrichment } from "@/lib/content/types";

export const pngToIcoContent: ToolContentEnrichment = {
  resourceSlugs: [
    "image-tools/what-is-an-ico-file",
    "image-tools/standard-favicon-sizes",
  ],
};

export const nestedJsonToCsvResources: ToolContentEnrichment = {
  resourceSlugs: ["developer-tools/flattening-nested-json-for-csv"],
};

export const utmParserContent: ToolContentEnrichment = {
  resourceSlugs: ["marketing-tools/what-are-utm-parameters"],
};

export const concreteCalculatorContent: ToolContentEnrichment = {
  resourceSlugs: ["construction-calculators/how-to-estimate-concrete-cubic-yards"],
};

export const noiCalculatorContent: ToolContentEnrichment = {
  resourceSlugs: ["real-estate-calculators/what-is-noi"],
};
