/**
 * Generates redirects from flat legacy tool paths to their canonical
 * subcategory paths.
 *
 * Tool URLs are `/{category}/{subcategory}/{slug}/`, but the flat form
 * `/{category}/{slug}/` has been submitted to Search Console and linked from
 * internal docs. Those requests 404 today. This maps each one to the real page.
 *
 * Run `npm run seo:redirects` after adding or moving tools.
 * `legacy-redirects.test.ts` fails if the committed file drifts from the registry.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { getAllCategories, getPublishedTools } from "../src/lib/tools/access";
import { getSubcategoriesForCategory } from "../src/lib/tools/subcategories";

export type LegacyRedirect = {
  source: string;
  destination: string;
};

const OUTPUT = resolve(import.meta.dirname, "../src/lib/seo/legacy-redirects.json");

/** Every path the live site already serves. A redirect must never shadow one. */
const buildReservedPaths = (): Set<string> => {
  const reserved = new Set<string>([
    "/",
    "/tools/",
    "/converters/",
    "/guides/",
    "/resources/",
    "/about/",
    "/privacy/",
    "/terms/",
  ]);

  for (const category of getAllCategories()) {
    reserved.add(category.path);
    for (const subcategory of getSubcategoriesForCategory(category.slug)) {
      reserved.add(`/${category.slug}/${subcategory.id}/`);
    }
  }

  for (const tool of getPublishedTools()) {
    reserved.add(tool.path);
  }

  return reserved;
};

export const buildLegacyRedirects = (): LegacyRedirect[] => {
  const reserved = buildReservedPaths();
  const redirects = new Map<string, string>();

  for (const tool of getPublishedTools()) {
    const segments = tool.path.split("/").filter(Boolean);

    // Only tools nested under a subcategory have a flat form to recover.
    if (segments.length !== 3) {
      continue;
    }

    const [category, , slug] = segments;
    const flatPath = `/${category}/${slug}/`;

    // Never shadow a real page, and never redirect a path to itself.
    if (reserved.has(flatPath) || flatPath === tool.path) {
      continue;
    }

    // Two tools in one category sharing a slug would be ambiguous. Skip both.
    if (redirects.has(flatPath)) {
      redirects.delete(flatPath);
      reserved.add(flatPath);
      continue;
    }

    redirects.set(flatPath, tool.path);
  }

  return [...redirects.entries()]
    .map(([source, destination]) => ({ source, destination }))
    .sort((a, b) => a.source.localeCompare(b.source));
};

const main = () => {
  const redirects = buildLegacyRedirects();
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, `${JSON.stringify(redirects, null, 2)}\n`, "utf8");
  console.log(`Wrote ${redirects.length} legacy redirects to ${OUTPUT}`);
};

if (process.argv[1] && import.meta.filename === resolve(process.argv[1])) {
  main();
}
