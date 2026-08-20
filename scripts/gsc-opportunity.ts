import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { getAllGuides } from "../src/lib/content/guides";
import { getAllResources } from "../src/lib/content/resources";
import { getPublishedTools } from "../src/lib/tools/access";

type CsvRow = Record<string, string>;

type Opportunity = {
  priority: "high" | "medium" | "low" | "skip";
  score: number;
  url: string;
  primaryQuery: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  recommendedWork: string;
  expectedImpact: string;
  skipReason?: string;
};

const YMYL_QUERY = /\b(bmi|obesity|obese|who bmi|cut off points|medical|symptom|diagnos)\b/i;
const QUERY_STOPWORDS = new Set(["what", "is", "an", "the", "for", "and", "of", "to", "a", "in", "on", "how", "vs"]);

const parseCsv = (raw: string): CsvRow[] => {
  const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) {
    return [];
  }

  const parseLine = (line: string): string[] => {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      const next = line[index + 1];
      if (char === '"' && inQuotes && next === '"') {
        current += '"';
        index += 1;
        continue;
      }
      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (char === "," && !inQuotes) {
        cells.push(current.trim());
        current = "";
        continue;
      }
      current += char;
    }
    cells.push(current.trim());
    return cells;
  };

  const headers = parseLine(lines[0]!).map((header) => header.toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = parseLine(line);
    const row: CsvRow = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });
    return row;
  });
};

const cell = (row: CsvRow, names: string[]): string => {
  for (const name of names) {
    if (row[name] !== undefined && row[name] !== "") {
      return row[name];
    }
  }
  return "";
};

const toNumber = (value: string): number => {
  const cleaned = value.replace(/%/g, "").replace(/,/g, "").trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeUrl = (value: string): string => {
  try {
    const url = new URL(value);
    url.hash = "";
    url.search = "";
    url.hostname = url.hostname.replace(/^www\./, "");
    let path = url.pathname;
    if (!path.endsWith("/")) {
      path += "/";
    }
    return `${url.origin.replace("://www.", "://")}${path}`;
  } catch {
    return value;
  }
};

const parseArgs = (): { pages?: string; queries?: string; out: string } => {
  const args = process.argv.slice(2);
  const read = (flag: string): string | undefined => {
    const index = args.indexOf(flag);
    return index >= 0 ? args[index + 1] : undefined;
  };
  return {
    pages: read("--pages") ?? process.env.GSC_PAGES_CSV,
    queries: read("--queries") ?? process.env.GSC_QUERIES_CSV,
    out: read("--out") ?? "docs/content/briefs",
  };
};

const queryMatchesUrl = (query: string, url: string): boolean => {
  const path = url.toLowerCase();
  const slug = query
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (slug.length > 3 && path.includes(slug)) {
    return true;
  }
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !QUERY_STOPWORDS.has(token));
  return tokens.length > 0 && tokens.every((token) => path.includes(token));
};

const classify = (
  impressions: number,
  position: number,
  query: string,
): Pick<Opportunity, "priority" | "recommendedWork" | "expectedImpact" | "skipReason"> => {
  if (YMYL_QUERY.test(query)) {
    return {
      priority: "skip",
      recommendedWork: "Keep accurate; do not treat as a growth cluster.",
      expectedImpact: "Low — YMYL / institutional SERPs.",
      skipReason: "YMYL medical query",
    };
  }
  if (position >= 5 && position <= 20 && impressions >= 20) {
    return {
      priority: "high",
      recommendedWork: "Improve tool UX, examples, internal links, and metadata without a full rewrite.",
      expectedImpact: "High — already near page one.",
    };
  }
  if (position > 20 && position <= 40 && impressions >= 20) {
    return {
      priority: "medium",
      recommendedWork: "Strengthen the primary tool and supporting resource; add missing intent coverage.",
      expectedImpact: "Medium — moving toward page two / one.",
    };
  }
  if (position > 50) {
    return {
      priority: "low",
      recommendedWork: "Deprioritize unless the page is a unique tool with growing impressions.",
      expectedImpact: "Low while average position stays 50+.",
    };
  }
  return {
    priority: "low",
    recommendedWork: "Monitor; improve only if impressions keep rising.",
    expectedImpact: "Unclear until position improves.",
  };
};

const slugFromUrl = (url: string): string => {
  try {
    const path = new URL(url).pathname.replace(/\/+$/, "");
    const parts = path.split("/").filter(Boolean);
    return parts[parts.length - 1] || "page";
  } catch {
    return "page";
  }
};

const main = () => {
  const options = parseArgs();
  const pagesPath = options.pages ? resolve(options.pages) : resolve("tmp/gsc/Pages.csv");
  const queriesPath = options.queries ? resolve(options.queries) : resolve("tmp/gsc/Queries.csv");

  let pageRows: CsvRow[] = [];
  let queryRows: CsvRow[] = [];
  try {
    pageRows = parseCsv(readFileSync(pagesPath, "utf8"));
  } catch {
    console.error(`Could not read pages CSV at ${pagesPath}`);
    console.error("Export Search Console Pages (last 28 days) and pass --pages path/to/Pages.csv");
    process.exitCode = 1;
    return;
  }
  try {
    queryRows = parseCsv(readFileSync(queriesPath, "utf8"));
  } catch {
    console.warn(`No queries CSV at ${queriesPath}; ranking without query grouping.`);
  }

  const tools = getPublishedTools();
  const guides = getAllGuides();
  const resources = getAllResources();
  const knownPaths = new Set([
    ...tools.map((tool) => tool.path),
    ...guides.map((guide) => `/guides/${guide.slug}/`),
    ...resources.map((resource) => `/resources/${resource.categorySlug}/${resource.slug}/`),
  ]);

  const queriesByPage = new Map<string, Array<{ query: string; impressions: number; position: number }>>();
  for (const row of queryRows) {
    const query = cell(row, ["top queries", "query", "queries"]);
    const page = normalizeUrl(cell(row, ["top pages", "page", "pages", "url"]));
    const impressions = toNumber(cell(row, ["impressions"]));
    const position = toNumber(cell(row, ["position", "avg. position", "average position"]));
    if (!query) {
      continue;
    }
    const key = page || "__site__";
    const list = queriesByPage.get(key) ?? [];
    list.push({ query, impressions, position });
    queriesByPage.set(key, list);
  }

  const siteQueries = [...(queriesByPage.get("__site__") ?? [])].sort(
    (left, right) => right.impressions - left.impressions,
  );

  const opportunities: Opportunity[] = pageRows.map((row) => {
    const url = normalizeUrl(cell(row, ["top pages", "page", "pages", "url"]));
    const impressions = toNumber(cell(row, ["impressions"]));
    const clicks = toNumber(cell(row, ["clicks"]));
    const ctr = toNumber(cell(row, ["ctr"]));
    const position = toNumber(cell(row, ["position", "avg. position", "average position"]));
    const pageQueriesFromCsv = queriesByPage.get(url) ?? [];
    const matchedSiteQueries = siteQueries.filter((entry) => queryMatchesUrl(entry.query, url));
    const pageQueries = (pageQueriesFromCsv.length > 0 ? pageQueriesFromCsv : matchedSiteQueries)
      .slice()
      .sort((left, right) => right.impressions - left.impressions);
    const primaryQuery = pageQueries[0]?.query ?? "";
    const classification = classify(impressions, position, `${primaryQuery} ${url}`);
    const path = (() => {
      try {
        return new URL(url).pathname;
      } catch {
        return url;
      }
    })();
    const known = knownPaths.has(path);
    return {
      ...classification,
      score: impressions * (1 / Math.max(position, 1)) * (clicks + 1),
      url,
      primaryQuery,
      impressions,
      clicks,
      ctr,
      position,
      recommendedWork: known
        ? classification.recommendedWork
        : `${classification.recommendedWork} URL is not in the current registry/sitemap set.`,
    };
  });

  opportunities.sort((left, right) => right.score - left.score);

  const table = [
    "| Priority | URL | Primary query | Impressions | Position | Recommended work | Expected impact |",
    "|---|---|---|---:|---:|---|---|",
    ...opportunities.slice(0, 40).map((item) => {
      return `| ${item.priority} | ${item.url} | ${item.primaryQuery || "—"} | ${item.impressions} | ${item.position.toFixed(1)} | ${item.recommendedWork} | ${item.expectedImpact} |`;
    }),
  ].join("\n");

  console.log(table);
  console.log(`\nScored ${opportunities.length} page rows.`);

  const outDir = resolve(options.out);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "gsc-opportunity-queue.md"), `# GSC opportunity queue\n\n${table}\n`);

  const briefTargets = opportunities.filter((item) => item.priority === "high" || item.priority === "medium").slice(0, 10);
  for (const item of briefTargets) {
    const slug = slugFromUrl(item.url);
    const body = `# Page Optimization Brief

## URL

${item.url}

## Current Search Console Performance

- Impressions: ${item.impressions}
- Clicks: ${item.clicks}
- CTR: ${item.ctr}
- Position: ${item.position.toFixed(2)}

## Primary Search Intent

${item.primaryQuery || "Unknown — add query export to refine."}

## Existing Queries

${(queriesByPage.get(item.url) ?? siteQueries.filter((entry) => queryMatchesUrl(entry.query, item.url))).slice(0, 8).map((entry) => `- ${entry.query} (${entry.impressions} impressions, pos ${entry.position.toFixed(1)})`).join("\n") || "- None grouped to this URL"}

## Current Problems

- Technical: confirm canonical host is convertmystuff.com (apex)
- UX: keep the tool above the fold
- Content: avoid filler; cover the primary query directly
- Search intent: ${item.primaryQuery || "unmapped"}
- Internal linking: add related tools in the same workflow
- Product functionality: ${item.recommendedWork}

## Proposed Improvements

### Tool Features

- ${item.recommendedWork}

### SEO

- Unique title and meta description for the primary query
- Valid FAQ schema only if FAQs are real

## Do Not

- Create numeric variation URLs
- Rewrite ranking pages from scratch
- Keyword-stuff

## Success Metrics

- Ranking improvement
- Impressions
- Clicks
- Tool usage
`;
    const filePath = resolve(outDir, `${slug}.md`);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, body);
    console.log(`Wrote ${filePath}`);
  }
};

main();
