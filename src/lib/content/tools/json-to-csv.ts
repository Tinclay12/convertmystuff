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
    {
      id: "excel-mangles-data",
      title: "Why Excel changes your values",
      variant: "warning",
      paragraphs: [
        "Opening a CSV by double-clicking it lets Excel guess every column type, and it guesses badly on exactly the fields that matter. Long numeric IDs past about fifteen digits are rounded and redisplayed in scientific notation, and the original digits are gone once you save. Leading zeros are stripped, so a zip code of 01234 becomes 1234 and a product code of 007 becomes 7.",
        "Anything that looks like a date gets converted to one. The gene name SEPT1 becomes a September date, and a version string like 1.10 can be read as a number and lose its trailing zero.",
        "The fix is the import path, not the file. In Excel use Data → From Text/CSV, then set the affected columns to Text in the preview before loading. That single change prevents every conversion above, and it works on files this tool produces without any modification.",
      ],
    },
    {
      id: "encoding-delimiters",
      title: "Encoding and delimiter traps",
      variant: "info",
      paragraphs: [
        "Excel on Windows does not assume UTF-8. Without a byte order mark, accented characters, currency symbols, and CJK text arrive as mojibake. Enable the Excel UTF-8 BOM option here and the file opens correctly; other tools ignore the mark, so leaving it on is usually safe.",
        "Delimiters are a locale problem rather than a preference. Excel follows the system list separator, so a comma-delimited file opens as one long column on machines configured for German, French, or Spanish locales, where semicolon is expected. If a colleague reports a single mashed column, switch the delimiter to semicolon rather than debugging the data.",
        "Values containing the delimiter, a quote, or a newline are quoted automatically and internal quotes are doubled, per RFC 4180. Any spreadsheet or CSV parser reads that correctly — a naive split on commas will not.",
      ],
    },
    {
      id: "nested-and-arrays",
      title: "What happens to nested objects and arrays",
      variant: "info",
      paragraphs: [
        "CSV is flat and JSON is not, so something has to give. With flattening on, nested objects become dot-notation headers: a user object holding a name produces a user.name column. Depth is not a problem — three or four levels simply produce longer headers.",
        "Arrays are the genuinely lossy case. An array of tags becomes indexed columns (tags.0, tags.1, tags.2), which means the column count is set by whichever record has the most elements and most rows end up with blanks. If your array is the actual subject of the data — line items on an order, say — converting the array itself is usually the better move, one row per item.",
        "Keep null distinct from empty in your own head: a missing key and a key set to null both land as an empty cell, and that distinction cannot be recovered from the CSV afterwards.",
      ],
      linkedToolIds: ["nested-json-to-csv", "json-formatter"],
    },
    {
      id: "large-files-ndjson",
      title: "Large files and NDJSON",
      variant: "tip",
      paragraphs: [
        "Log pipelines and database exports usually emit NDJSON — one JSON object per line, with no wrapping array and no commas between records. Enable NDJSON mode for those; pasting them as-is fails validation because the payload is not a single JSON document.",
        "Conversion runs in your browser, so the practical ceiling is your available memory rather than an upload limit, and nothing is transmitted anywhere. Very large exports are best split before conversion — and because processing is local, files under NDA or internal customer data can be converted without leaving your machine.",
      ],
      linkedToolIds: ["json-validator", "json-formatter"],
    },
  ],
  additionalFaqs: [
    {
      question: "Why did Excel turn my IDs into scientific notation?",
      answer:
        "Excel guesses column types when you double-click a CSV, and long numbers past roughly fifteen digits get rounded and redisplayed as 1.23457E+16. Import via Data → From Text/CSV and set that column to Text in the preview. The CSV itself is correct — Excel's default import is what changes it.",
    },
    {
      question: "Why are my leading zeros missing?",
      answer:
        "Same cause: Excel read the column as a number, and numbers have no leading zeros, so 01234 becomes 1234. Set the column to Text during import rather than reformatting afterwards — by then the digits are already gone.",
    },
    {
      question: "Why does my CSV open as one column?",
      answer:
        "Excel splits on your system's list separator, which is a semicolon in many European locales rather than a comma. Switch the delimiter to semicolon and the same data opens into proper columns.",
    },
    {
      question: "How are arrays inside my JSON handled?",
      answer:
        "They expand into indexed columns such as tags.0 and tags.1, so the widest record determines the column count. When the array is the real subject of the data, convert the array itself instead so each element becomes its own row.",
    },
  ],
};
