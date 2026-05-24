import type { ToolLinkGroup } from "@/lib/tools/types";

const documentWorkflowGroups: Record<string, ToolLinkGroup[]> = {
  "pdf-merge": [
    {
      label: "PDF workflow",
      toolIds: ["pdf-split", "text-to-pdf"],
    },
    {
      label: "Related document tools",
      toolIds: ["markdown-to-html", "word-count-document"],
    },
  ],
  "pdf-split": [
    {
      label: "PDF workflow",
      toolIds: ["pdf-merge", "text-to-pdf"],
    },
    {
      label: "Related document tools",
      toolIds: ["markdown-to-html", "word-count-document"],
    },
  ],
  "text-to-pdf": [
    {
      label: "PDF workflow",
      toolIds: ["pdf-merge", "pdf-split", "markdown-to-html"],
    },
  ],
  "markdown-to-html": [
    {
      label: "Document workflow",
      toolIds: ["html-to-markdown", "text-to-pdf", "word-count-document"],
    },
  ],
  "html-to-markdown": [
    {
      label: "Document workflow",
      toolIds: ["markdown-to-html", "text-to-pdf", "word-count-document"],
    },
  ],
  "word-count-document": [
    {
      label: "Document workflow",
      toolIds: ["markdown-to-html", "text-to-pdf", "remove-empty-lines"],
    },
  ],
};

export const getDocumentWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  return documentWorkflowGroups[toolId] ?? [];
};
