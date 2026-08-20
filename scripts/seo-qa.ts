import { getAllGuides } from "../src/lib/content/guides";
import { getAllResources } from "../src/lib/content/resources";
import { enrichToolDefinition } from "../src/lib/content/merge-tool-content";
import { getToolContentEnrichment } from "../src/lib/content/tools";
import { getPublishedTools, getResolvedToolLinkGroups } from "../src/lib/tools/access";
import { getSiteUrl } from "../src/lib/seo/site";
import { buildRootSitemap } from "../src/lib/seo/sitemaps";
import type { ToolDefinition } from "../src/lib/tools/types";

type Finding = {
  severity: "error" | "warn";
  kind: string;
  id: string;
  path: string;
  detail: string;
};

const WWW_HOST = "https://www.convertmystuff.com";
const APEX_HOST = "https://convertmystuff.com";

const INTENT_CHECKS: Array<{
  resourceSlug: string;
  toolMustMatch: RegExp;
  reason: string;
}> = [
  {
    resourceSlug: "how-to-calculate-percentage-change",
    toolMustMatch: /change|increase|decrease/i,
    reason: "Resource teaches percentage change; primary tool should calculate change, increase, or decrease.",
  },
];

const collectText = (tool: ToolDefinition): string =>
  [tool.title, tool.shortDescription, tool.explanation, tool.formula, tool.metaTitle, tool.metaDescription].join(
    " ",
  );

const main = () => {
  const findings: Finding[] = [];
  const tools = getPublishedTools();
  const guides = getAllGuides();
  const resources = getAllResources();
  const siteUrl = getSiteUrl();

  if (siteUrl.includes("www.convertmystuff.com")) {
    findings.push({
      severity: "error",
      kind: "hostname",
      id: "site-url",
      path: "/",
      detail: `NEXT_PUBLIC_SITE_URL is ${siteUrl}; preferred host is ${APEX_HOST}.`,
    });
  }

  const titleOwners = new Map<string, string[]>();
  const descriptionOwners = new Map<string, string[]>();

  const trackMeta = (title: string, description: string, owner: string) => {
    const titleKey = title.trim().toLowerCase();
    const descriptionKey = description.trim().toLowerCase();
    titleOwners.set(titleKey, [...(titleOwners.get(titleKey) ?? []), owner]);
    descriptionOwners.set(descriptionKey, [...(descriptionOwners.get(descriptionKey) ?? []), owner]);
  };

  for (const tool of tools) {
    if (!tool.metaTitle?.trim()) {
      findings.push({
        severity: "error",
        kind: "missing-title",
        id: tool.id,
        path: tool.path,
        detail: "Missing metaTitle.",
      });
    }
    if (!tool.metaDescription?.trim()) {
      findings.push({
        severity: "error",
        kind: "missing-description",
        id: tool.id,
        path: tool.path,
        detail: "Missing metaDescription.",
      });
    }
    if (!tool.path?.startsWith("/") || !tool.path.endsWith("/")) {
      findings.push({
        severity: "error",
        kind: "canonical-path",
        id: tool.id,
        path: tool.path,
        detail: "Tool path should be a trailing-slash absolute path.",
      });
    }
    if (`${tool.metaTitle} ${tool.metaDescription} ${tool.path}`.includes(WWW_HOST)) {
      findings.push({
        severity: "warn",
        kind: "www-host",
        id: tool.id,
        path: tool.path,
        detail: "Hardcoded www host in metadata or path.",
      });
    }
    const enriched = enrichToolDefinition(tool);
    if ((!tool.relatedTools || tool.relatedTools.length === 0) && getResolvedToolLinkGroups(enriched).length === 0) {
      findings.push({
        severity: "warn",
        kind: "orphan",
        id: tool.id,
        path: tool.path,
        detail: "No relatedTools and no workflow link groups.",
      });
    }
    trackMeta(tool.metaTitle, tool.metaDescription, `tool:${tool.id}`);
  }

  for (const guide of guides) {
    const path = `/guides/${guide.slug}/`;
    if (!guide.metaTitle?.trim() || !guide.title?.trim()) {
      findings.push({
        severity: "error",
        kind: "missing-title",
        id: guide.slug,
        path,
        detail: "Missing guide title or metaTitle.",
      });
    }
    if (!guide.metaDescription?.trim()) {
      findings.push({
        severity: "error",
        kind: "missing-description",
        id: guide.slug,
        path,
        detail: "Missing metaDescription.",
      });
    }
    trackMeta(guide.metaTitle, guide.metaDescription, `guide:${guide.slug}`);
  }

  for (const resource of resources) {
    const path = `/resources/${resource.categorySlug}/${resource.slug}/`;
    if (!resource.metaTitle?.trim() || !resource.title?.trim()) {
      findings.push({
        severity: "error",
        kind: "missing-title",
        id: resource.slug,
        path,
        detail: "Missing resource title or metaTitle.",
      });
    }
    if (!resource.metaDescription?.trim()) {
      findings.push({
        severity: "error",
        kind: "missing-description",
        id: resource.slug,
        path,
        detail: "Missing metaDescription.",
      });
    }
    const primaryTool = tools.find((tool) => tool.id === resource.primaryToolId);
    if (!primaryTool) {
      findings.push({
        severity: "error",
        kind: "resource-tool",
        id: resource.slug,
        path,
        detail: `primaryToolId "${resource.primaryToolId}" is missing or unpublished.`,
      });
    }
    trackMeta(resource.metaTitle, resource.metaDescription, `resource:${resource.slug}`);
  }

  for (const check of INTENT_CHECKS) {
    const resource = resources.find((item) => item.slug === check.resourceSlug);
    if (!resource) {
      continue;
    }
    const tool = tools.find((item) => item.id === resource.primaryToolId);
    const enrichment = tool ? getToolContentEnrichment(tool.id) : undefined;
    const haystack = tool
      ? `${collectText(tool)} ${(enrichment?.additionalFaqs ?? []).map((faq) => faq.answer).join(" ")}`
      : "";
    if (tool && !check.toolMustMatch.test(haystack)) {
      findings.push({
        severity: "warn",
        kind: "resource-tool-mismatch",
        id: resource.slug,
        path: `/resources/${resource.categorySlug}/${resource.slug}/`,
        detail: check.reason,
      });
    }
  }

  const reportDuplicates = (owners: Map<string, string[]>, kind: string, label: string) => {
    for (const [value, ids] of owners.entries()) {
      if (!value || ids.length < 2) {
        continue;
      }
      findings.push({
        severity: "warn",
        kind,
        id: ids.join(", "),
        path: ids[0] ?? "",
        detail: `Duplicate ${label} shared by ${ids.join(", ")}.`,
      });
    }
  };

  reportDuplicates(titleOwners, "duplicate-title", "metaTitle");
  reportDuplicates(descriptionOwners, "duplicate-description", "metaDescription");

  const sitemapUrls = new Set(buildRootSitemap().map((entry) => entry.url));
  if (![...sitemapUrls].some((url) => url.endsWith("/converters/") || url.endsWith("/converters"))) {
    findings.push({
      severity: "error",
      kind: "sitemap",
      id: "converters-hub",
      path: "/converters/",
      detail: "/converters/ is missing from the root sitemap.",
    });
  }

  const errors = findings.filter((finding) => finding.severity === "error");
  const warnings = findings.filter((finding) => finding.severity === "warn");

  console.log(`SEO QA: ${tools.length} tools, ${guides.length} guides, ${resources.length} resources`);
  console.log(`Findings: ${errors.length} error(s), ${warnings.length} warning(s)\n`);

  for (const finding of [...errors, ...warnings]) {
    console.log(`[${finding.severity}] ${finding.kind}  ${finding.id}`);
    console.log(`  ${finding.path}`);
    console.log(`  ${finding.detail}\n`);
  }

  if (findings.length === 0) {
    console.log("No issues flagged.");
  }

  if (errors.length > 0) {
    process.exitCode = 1;
  }
};

main();
