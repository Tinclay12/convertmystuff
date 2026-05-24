import type { ToolLinkGroup } from "@/lib/tools/types";

const developerWorkflowGroups: Record<string, ToolLinkGroup[]> = {
  "json-to-csv": [
    {
      label: "JSON & CSV Pro workflow",
      toolIds: ["csv-to-json", "nested-json-to-csv", "csv-to-html-table", "json-formatter"],
    },
    {
      label: "Export pipeline",
      toolIds: ["json-to-xml", "json-to-yaml", "json-to-toml", "csv-to-yaml"],
    },
    {
      label: "Validate & format",
      toolIds: ["json-validator", "json-to-yaml"],
    },
  ],
  "csv-to-json": [
    {
      label: "JSON & CSV Pro workflow",
      toolIds: ["json-to-csv", "nested-json-to-csv", "csv-to-html-table", "json-formatter"],
    },
    {
      label: "Export pipeline",
      toolIds: ["csv-to-yaml", "json-to-xml", "json-to-toml"],
    },
  ],
  "nested-json-to-csv": [
    {
      label: "JSON & CSV workflow",
      toolIds: ["json-to-csv", "csv-to-json", "json-formatter"],
    },
  ],
  "csv-to-html-table": [
    {
      label: "JSON & CSV workflow",
      toolIds: ["json-to-csv", "csv-to-json", "json-formatter"],
    },
  ],
  "json-formatter": [
    {
      label: "JSON workflow",
      toolIds: ["json-validator", "json-to-csv", "json-to-yaml", "yaml-to-json"],
    },
  ],
  "json-validator": [
    {
      label: "JSON workflow",
      toolIds: ["json-formatter", "json-to-csv", "json-to-yaml"],
    },
  ],
  "yaml-to-json": [
    {
      label: "Data format workflow",
      toolIds: ["json-to-yaml", "json-formatter", "xml-to-json"],
    },
  ],
  "json-to-yaml": [
    {
      label: "Data format workflow",
      toolIds: ["yaml-to-json", "json-formatter", "json-to-csv"],
    },
  ],
  "xml-to-json": [
    {
      label: "Data format workflow",
      toolIds: ["json-to-xml", "json-formatter", "yaml-to-json", "json-to-csv"],
    },
  ],
  "json-to-xml": [
    {
      label: "Data format workflow",
      toolIds: ["xml-to-json", "json-formatter", "json-to-yaml", "json-to-csv"],
    },
  ],
  "csv-to-yaml": [
    {
      label: "Spreadsheet workflow",
      toolIds: ["csv-to-json", "json-to-yaml", "yaml-to-json", "json-to-csv"],
    },
  ],
  "json-to-toml": [
    {
      label: "Data format workflow",
      toolIds: ["toml-to-json", "json-to-yaml", "json-formatter", "json-to-csv"],
    },
  ],
  "toml-to-json": [
    {
      label: "Data format workflow",
      toolIds: ["json-to-toml", "json-formatter", "yaml-to-json", "json-to-xml"],
    },
  ],
  "number-base-converter": [
    {
      label: "Developer utilities",
      toolIds: ["base64-encode", "hash-generator", "regex-tester"],
    },
  ],
  "tsv-to-csv": [
    {
      label: "Spreadsheet workflow",
      toolIds: ["json-to-csv", "csv-to-json", "csv-to-html-table"],
    },
  ],
  "base64-encode": [
    {
      label: "Encoding workflow",
      toolIds: ["base64-decode", "url-encode", "hash-generator"],
    },
  ],
  "base64-decode": [
    {
      label: "Encoding workflow",
      toolIds: ["base64-encode", "url-decode", "jwt-decoder"],
    },
  ],
  "url-encode": [
    {
      label: "Encoding workflow",
      toolIds: ["url-decode", "html-encode", "base64-encode"],
    },
  ],
  "url-decode": [
    {
      label: "Encoding workflow",
      toolIds: ["url-encode", "utm-parser", "base64-decode"],
    },
  ],
  "regex-tester": [
    {
      label: "Developer utilities",
      toolIds: ["jwt-decoder", "json-validator", "cron-builder"],
    },
  ],
  "jwt-decoder": [
    {
      label: "Developer utilities",
      toolIds: ["regex-tester", "base64-decode", "hash-generator"],
    },
  ],
  "cron-builder": [
    {
      label: "Developer utilities",
      toolIds: ["regex-tester", "uuid-generator", "hash-generator"],
    },
  ],
  "password-generator": [
    {
      label: "Security utilities",
      toolIds: ["hash-generator", "uuid-generator"],
    },
  ],
};

export const getDeveloperWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  return developerWorkflowGroups[toolId] ?? [];
};
