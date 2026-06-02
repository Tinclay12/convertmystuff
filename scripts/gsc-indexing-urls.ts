import { getAllCategories, getPublishedTools, isCategoryVisible } from "../src/lib/tools/access";
import { getSiteUrl } from "../src/lib/seo/site";

const FLAGSHIP_TOOL_IDS = [
  "json-to-csv",
  "csv-to-json",
  "pdf-merge",
  "pdf-split",
  "compound-interest-calculator",
  "mortgage-calculator-pro",
  "bmi-calculator",
  "rental-deal-analyzer",
  "concrete-calculator",
  "image-resizer",
  "image-compressor",
] as const;

const STATIC_PATHS = ["/", "/tools/", "/guides/", "/resources/", "/about/", "/privacy/", "/terms/"];

const main = () => {
  const base = getSiteUrl();
  const lines: string[] = [];

  for (const path of STATIC_PATHS) {
    lines.push(`${base}${path}`);
  }

  for (const category of getAllCategories()) {
    if (isCategoryVisible(category.slug)) {
      lines.push(`${base}${category.path}`);
    }
  }

  const flagshipTools = getPublishedTools().filter((tool) =>
    FLAGSHIP_TOOL_IDS.includes(tool.id as (typeof FLAGSHIP_TOOL_IDS)[number]),
  );

  for (const tool of flagshipTools) {
    lines.push(`${base}${tool.path}`);
  }

  console.log(lines.join("\n"));
};

main();
