import type { ToolLinkGroup } from "@/lib/tools/types";

const imageWorkflowGroups: Record<string, ToolLinkGroup[]> = {
  "image-resizer": [
    {
      label: "Image workflow",
      toolIds: ["image-compressor", "png-to-jpg", "jpg-to-png"],
    },
    {
      label: "Icons & favicons",
      toolIds: ["favicon-generator", "png-to-ico", "ico-to-png"],
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
    {
      label: "Icons & favicons",
      toolIds: ["png-to-ico", "favicon-generator"],
    },
  ],
  "png-to-ico": [
    {
      label: "Favicon workflow",
      toolIds: ["favicon-generator", "ico-to-png", "svg-to-png"],
    },
    {
      label: "Prepare the source",
      toolIds: ["image-resizer", "jpg-to-png"],
    },
  ],
  "ico-to-png": [
    {
      label: "Favicon workflow",
      toolIds: ["png-to-ico", "favicon-generator", "image-resizer"],
    },
  ],
  "favicon-generator": [
    {
      label: "Favicon workflow",
      toolIds: ["png-to-ico", "ico-to-png", "svg-to-png"],
    },
    {
      label: "Prepare the source",
      toolIds: ["image-resizer", "jpg-to-png"],
    },
  ],
  "svg-to-png": [
    {
      label: "Icons & favicons",
      toolIds: ["favicon-generator", "png-to-ico", "image-resizer"],
    },
  ],
};

export const getImageWorkflowGroups = (toolId: string): ToolLinkGroup[] => {
  return imageWorkflowGroups[toolId] ?? [];
};
