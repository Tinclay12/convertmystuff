import type { ToolContentEnrichment } from "@/lib/content/types";

const tierB = (blocks: ToolContentEnrichment["contentBlocks"]): ToolContentEnrichment => ({
  contentTier: "B",
  contentBlocks: blocks,
});

export const categoryOverlays: Record<string, ToolContentEnrichment> = {
  "case-converter": tierB([
    {
      id: "text-workflow",
      title: "Text cleanup workflow",
      variant: "info",
      paragraphs: [
        "After changing case, remove duplicate lines or count words for SEO drafts.",
        "Pair with remove-duplicate-lines when normalizing pasted lists.",
      ],
      linkedToolIds: ["remove-duplicate-lines", "word-counter"],
    },
  ]),
  "image-resizer": tierB([
    {
      id: "image-workflow",
      title: "Web image workflow",
      variant: "info",
      paragraphs: [
        "Resize for layout, then compress before upload. Convert PNG to JPG when photos do not need transparency.",
        "Generate favicon packs after you have a square master image.",
      ],
      linkedToolIds: ["image-compressor", "png-to-jpg", "favicon-generator"],
    },
  ]),
  "recipe-scaler": tierB([
    {
      id: "kitchen-workflow",
      title: "Recipe scaling tips",
      variant: "info",
      paragraphs: [
        "Scale servings first, then convert cups to grams when you need weight-based baking.",
        "Round spice amounts conservatively when doubling small quantities.",
      ],
      linkedToolIds: ["cups-to-grams"],
    },
  ]),
  "utm-builder": tierB([
    {
      id: "marketing-workflow",
      title: "Campaign tracking workflow",
      variant: "info",
      paragraphs: [
        "Build tagged URLs, then preview how titles appear in search and social cards.",
        "Parse UTMs from live links to audit existing campaigns.",
      ],
      linkedToolIds: ["open-graph-preview", "utm-parser"],
    },
  ]),
};
