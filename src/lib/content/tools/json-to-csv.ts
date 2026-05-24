import type { ToolContentEnrichment } from "@/lib/content/types";

export const jsonToCsvContent: ToolContentEnrichment = {
  contentTier: "C",
  guideSlug: "json-to-csv-for-excel",
  resourceSlugs: [
    "developer-tools/what-is-json",
    "developer-tools/json-vs-csv-for-data-exchange",
    "developer-tools/flattening-nested-json-for-csv",
  ],
  contentBlocks: [
    {
      id: "excel-workflow",
      title: "Preparing JSON for Excel",
      variant: "tip",
      paragraphs: [
        "Excel imports CSV most reliably when columns are flat and UTF-8 encoded. Nested JSON keys become column headers—preview the output before importing large files.",
        "If you need to round-trip data, keep a copy of the original JSON and use the CSV to JSON converter after editing in Excel.",
      ],
      linkedToolIds: ["csv-to-json", "csv-to-html-table"],
    },
  ],
};
