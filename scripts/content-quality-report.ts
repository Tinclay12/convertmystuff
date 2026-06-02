import { getPublishedTools } from "../src/lib/tools/access";
import { getToolContentEnrichment } from "../src/lib/content/tools";

const MIN_FAQS = 2;

const main = () => {
  const thin: Array<{ id: string; path: string; missing: string[] }> = [];

  for (const tool of getPublishedTools()) {
    const enrichment = getToolContentEnrichment(tool.id);
    const hasBlocks =
      (enrichment?.contentBlocks?.length ?? 0) > 0 || (tool.contentBlocks?.length ?? 0) > 0;
    const faqCount = tool.faqs?.length ?? 0;
    const missing: string[] = [];

    if (!tool.explanation) {
      missing.push("explanation");
    }
    if (faqCount < MIN_FAQS) {
      missing.push(`faqs (has ${faqCount}, need ${MIN_FAQS})`);
    }
    if (!hasBlocks && tool.category !== "unit-converters") {
      missing.push("contentBlocks");
    }

    if (missing.length > 0) {
      thin.push({ id: tool.id, path: tool.path, missing });
    }
  }

  console.log(`Published tools: ${getPublishedTools().length}`);
  console.log(`Thin content candidates: ${thin.length}\n`);

  for (const row of thin.sort((a, b) => a.id.localeCompare(b.id))) {
    console.log(`${row.id}\n  ${row.path}\n  missing: ${row.missing.join(", ")}\n`);
  }

  if (thin.length === 0) {
    console.log("No tools flagged.");
  }
};

main();
