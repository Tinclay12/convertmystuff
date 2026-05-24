import type { ToolLinkGroup } from "@/lib/tools/types";

type ConverterWorkflowEntry = {
  reverse?: string[];
  related?: string[];
  workflow?: string[];
};

const pair = (a: string, b: string, related: string[], workflow: string[]): ConverterWorkflowEntry => ({
  reverse: [b],
  related,
  workflow,
});

const converterWorkflows: Record<string, ConverterWorkflowEntry> = {
  "acres-to-square-feet": pair("acres-to-square-feet", "square-feet-to-acres", ["hectares-to-acres", "acres-to-hectares"], ["price-per-square-foot"]),
  "square-feet-to-acres": pair("square-feet-to-acres", "acres-to-square-feet", ["hectares-to-acres", "acres-to-hectares"], ["price-per-square-foot"]),
  "hectares-to-acres": pair("hectares-to-acres", "acres-to-hectares", ["acres-to-square-feet", "square-feet-to-acres"], ["price-per-square-foot"]),
  "acres-to-hectares": pair("acres-to-hectares", "hectares-to-acres", ["acres-to-square-feet", "square-feet-to-acres"], ["price-per-square-foot"]),
  "meters-to-feet": pair("meters-to-feet", "feet-to-meters", ["miles-to-km", "km-to-miles", "inches-to-cm"], ["lumber-calculator"]),
  "feet-to-meters": pair("feet-to-meters", "meters-to-feet", ["miles-to-km", "km-to-miles", "cm-to-inches"], ["lumber-calculator"]),
  "miles-to-km": pair("miles-to-km", "km-to-miles", ["meters-to-feet", "feet-to-meters"], ["lumber-calculator"]),
  "km-to-miles": pair("km-to-miles", "miles-to-km", ["meters-to-feet", "feet-to-meters"], ["lumber-calculator"]),
  "kg-to-lbs": pair("kg-to-lbs", "lbs-to-kg", ["inches-to-cm", "cm-to-inches"], ["bmi-calculator", "calorie-calculator"]),
  "lbs-to-kg": pair("lbs-to-kg", "kg-to-lbs", ["inches-to-cm", "cm-to-inches"], ["bmi-calculator", "calorie-calculator"]),
  "liters-to-gallons": pair("liters-to-gallons", "gallons-to-liters", ["cups-to-grams"], ["recipe-scaler", "ingredient-converter"]),
  "gallons-to-liters": pair("gallons-to-liters", "liters-to-gallons", ["cups-to-grams"], ["recipe-scaler", "ingredient-converter"]),
  "celsius-to-fahrenheit": pair("celsius-to-fahrenheit", "fahrenheit-to-celsius", ["oven-temp-converter"], ["recipe-scaler"]),
  "fahrenheit-to-celsius": pair("fahrenheit-to-celsius", "celsius-to-fahrenheit", ["oven-temp-converter"], ["recipe-scaler"]),
  "mb-to-gb": pair("mb-to-gb", "gb-to-mb", ["inches-to-cm"], []),
  "gb-to-mb": pair("gb-to-mb", "mb-to-gb", ["inches-to-cm"], []),
  "inches-to-cm": pair("inches-to-cm", "cm-to-inches", ["meters-to-feet", "feet-to-meters", "mm-to-inches"], ["lumber-calculator"]),
  "cm-to-inches": pair("cm-to-inches", "inches-to-cm", ["meters-to-feet", "feet-to-meters", "inches-to-mm"], ["lumber-calculator"]),
  "square-meters-to-square-feet": pair("square-meters-to-square-feet", "square-feet-to-square-meters", ["acres-to-square-feet", "square-feet-to-acres"], ["price-per-square-foot"]),
  "square-feet-to-square-meters": pair("square-feet-to-square-meters", "square-meters-to-square-feet", ["acres-to-square-feet", "square-feet-to-acres"], ["price-per-square-foot"]),
  "mm-to-inches": pair("mm-to-inches", "inches-to-mm", ["cm-to-inches", "inches-to-cm"], ["lumber-calculator"]),
  "inches-to-mm": pair("inches-to-mm", "mm-to-inches", ["cm-to-inches", "inches-to-cm"], ["lumber-calculator"]),
  "yards-to-meters": pair("yards-to-meters", "meters-to-yards", ["feet-to-meters", "meters-to-feet"], ["lumber-calculator"]),
  "meters-to-yards": pair("meters-to-yards", "yards-to-meters", ["feet-to-meters", "meters-to-feet"], ["lumber-calculator"]),
  "feet-to-inches": pair("feet-to-inches", "inches-to-feet", ["inches-to-cm", "cm-to-inches"], ["lumber-calculator"]),
  "inches-to-feet": pair("inches-to-feet", "feet-to-inches", ["inches-to-cm", "cm-to-inches"], ["lumber-calculator"]),
  "ounces-to-grams": pair("ounces-to-grams", "grams-to-ounces", ["kg-to-lbs", "lbs-to-kg"], ["cups-to-grams", "recipe-scaler"]),
  "grams-to-ounces": pair("grams-to-ounces", "ounces-to-grams", ["kg-to-lbs", "lbs-to-kg"], ["cups-to-grams", "recipe-scaler"]),
  "cubic-feet-to-cubic-yards": pair("cubic-feet-to-cubic-yards", "cubic-yards-to-cubic-feet", ["liters-to-gallons"], ["gravel-calculator", "concrete-calculator"]),
  "cubic-yards-to-cubic-feet": pair("cubic-yards-to-cubic-feet", "cubic-feet-to-cubic-yards", ["liters-to-gallons"], ["gravel-calculator", "mulch-calculator"]),
  "celsius-to-kelvin": pair("celsius-to-kelvin", "kelvin-to-celsius", ["celsius-to-fahrenheit", "fahrenheit-to-celsius"], ["oven-temp-converter"]),
  "kelvin-to-celsius": pair("kelvin-to-celsius", "celsius-to-kelvin", ["celsius-to-fahrenheit", "fahrenheit-to-celsius"], []),
  "fahrenheit-to-kelvin": pair("fahrenheit-to-kelvin", "kelvin-to-fahrenheit", ["fahrenheit-to-celsius", "celsius-to-fahrenheit"], []),
  "kelvin-to-fahrenheit": pair("kelvin-to-fahrenheit", "fahrenheit-to-kelvin", ["fahrenheit-to-celsius", "celsius-to-fahrenheit"], []),
  "kb-to-mb": pair("kb-to-mb", "mb-to-kb", ["mb-to-gb", "gb-to-mb"], []),
  "mb-to-kb": pair("mb-to-kb", "kb-to-mb", ["mb-to-gb", "gb-to-mb"], []),
  "gb-to-tb": pair("gb-to-tb", "tb-to-gb", ["mb-to-gb", "gb-to-mb"], []),
  "tb-to-gb": pair("tb-to-gb", "gb-to-tb", ["mb-to-gb", "gb-to-mb"], []),
  "square-meters-to-acres": pair("square-meters-to-acres", "acres-to-square-meters", ["acres-to-square-feet", "hectares-to-acres"], ["price-per-square-foot"]),
  "acres-to-square-meters": pair("acres-to-square-meters", "square-meters-to-acres", ["square-feet-to-acres", "hectares-to-acres"], ["price-per-square-foot"]),
  "mm-to-cm": pair("mm-to-cm", "cm-to-mm", ["mm-to-inches", "cm-to-inches"], ["lumber-calculator"]),
  "cm-to-mm": pair("cm-to-mm", "mm-to-cm", ["inches-to-cm", "mm-to-inches"], ["lumber-calculator"]),
  "stones-to-kg": pair("stones-to-kg", "kg-to-stones", ["kg-to-lbs", "lbs-to-kg"], ["bmi-calculator"]),
  "kg-to-stones": pair("kg-to-stones", "stones-to-kg", ["kg-to-lbs", "lbs-to-kg"], ["bmi-calculator"]),
  "cups-to-ml": pair("cups-to-ml", "ml-to-cups", ["liters-to-gallons", "tablespoon-to-ml"], ["recipe-scaler", "cups-to-grams"]),
  "ml-to-cups": pair("ml-to-cups", "cups-to-ml", ["liters-to-gallons", "cups-to-grams"], ["recipe-scaler"]),
  "bytes-to-kb": pair("bytes-to-kb", "kb-to-bytes", ["kb-to-mb", "bits-to-bytes"], []),
  "kb-to-bytes": pair("kb-to-bytes", "bytes-to-kb", ["bytes-to-bits", "mb-to-kb"], []),
  "bits-to-bytes": pair("bits-to-bytes", "bytes-to-bits", ["bytes-to-kb", "kb-to-mb"], []),
  "bytes-to-bits": pair("bytes-to-bits", "bits-to-bytes", ["bytes-to-kb", "kb-to-mb"], []),
  "board-feet-to-cubic-feet": pair("board-feet-to-cubic-feet", "cubic-feet-to-board-feet", ["lumber-calculator", "cubic-feet-to-cubic-yards"], ["lumber-calculator"]),
  "cubic-feet-to-board-feet": pair("cubic-feet-to-board-feet", "board-feet-to-cubic-feet", ["lumber-calculator", "cubic-yards-to-cubic-feet"], ["lumber-calculator"]),
};

const groupLabels: Record<keyof ConverterWorkflowEntry, string> = {
  reverse: "Reverse conversion",
  related: "Related converters",
  workflow: "Next in your workflow",
};

export const getConverterWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  const entry = converterWorkflows[toolId];
  if (!entry) {
    return [];
  }

  return (Object.keys(groupLabels) as (keyof ConverterWorkflowEntry)[])
    .map((key) => {
      const toolIds = entry[key];
      if (!toolIds?.length) {
        return null;
      }
      return { label: groupLabels[key], toolIds };
    })
    .filter((group): group is ToolLinkGroup => group !== null);
};
