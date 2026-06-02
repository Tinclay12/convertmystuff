import { describe, expect, it } from "vitest";
import { enrichToolDefinition } from "@/lib/content/merge-tool-content";
import { getPublishedTools } from "@/lib/tools/access";
import { unitConverterConfigs } from "@/lib/tools/logic/unit-conversions";

describe("internal links audit", () => {
  it("published tools have at least two related links or workflow/reverse coverage", () => {
    const failures: string[] = [];

    for (const tool of getPublishedTools()) {
      const enriched = enrichToolDefinition(tool);
      const relatedCount = tool.relatedTools?.length ?? 0;
      const workflowCount = enriched.toolLinkGroups?.length ?? 0;
      const hasReverse = Boolean(unitConverterConfigs[tool.id]?.reversePath);

      if (relatedCount >= 2 || workflowCount > 0 || hasReverse) {
        continue;
      }

      failures.push(tool.id);
    }

    expect(failures, `Missing internal links: ${failures.join(", ")}`).toEqual([]);
  });
});
