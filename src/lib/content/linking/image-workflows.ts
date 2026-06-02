import type { ToolLinkGroup } from "@/lib/tools/types";

const imageWorkflowGroups: Record<string, ToolLinkGroup[]> = {
  "image-resizer": [
    {
      label: "Image workflow",
      toolIds: ["image-compressor", "png-to-jpg", "jpg-to-png"],
    },
    {
      label: "Icons & favicons",
      toolIds: ["png-to-ico", "favicon-generator", "svg-to-png"],
    },
  ],
  "image-compressor": [
    {
      label: "Image workflow",
      toolIds: ["image-resizer", "png-to-jpg", "jpg-to-png"],
    },
    {
      label: "Icons & favicons",
      toolIds: ["png-to-ico", "favicon-generator"],
    },
  ],
  "png-to-jpg": [
    {
      label: "Format & size",
      toolIds: ["jpg-to-png", "image-resizer", "image-compressor"],
    },
  ],
  "jpg-to-png": [
    {
      label: "Format & size",
      toolIds: ["png-to-jpg", "image-resizer", "image-compressor"],
    },
  ],
};

export const getImageWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  return imageWorkflowGroups[toolId] ?? [];
};
