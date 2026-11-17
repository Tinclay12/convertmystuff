import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

export const reviewedAdvisory = {
  url: "https://github.com/advisories/GHSA-fc5q-39xc-vjpf",
  expiresOn: "2026-12-17",
};

// Default behavior preserves the existing high/critical audit gate. The optional
// exception requires an explicit flag, exact advisory identity, dev-only lockfile
// entries for every affected package, and an unexpired review.
export function assessAudit(report, lock, {
  allowReviewedDevelopmentAdvisory = false,
  today = new Date().toISOString().slice(0, 10),
} = {}) {
  const blocked = [];
  const exceptions = [];
  if (report?.error || !report?.vulnerabilities || !lock?.packages) {
    return { passed: false, blocked: ["Missing or invalid audit/lockfile data"], exceptions };
  }
  const vulnerabilities = report.vulnerabilities;
  const advisoryLeaves = (name, seen = new Set()) => {
    if (seen.has(name) || !vulnerabilities[name]?.via?.length) return null;
    const nextSeen = new Set([...seen, name]);
    const leaves = [];
    for (const via of vulnerabilities[name].via) {
      if (typeof via === "string") {
        const nested = advisoryLeaves(via, nextSeen);
        if (!nested) return null;
        leaves.push(...nested);
      } else if (via && typeof via === "object") {
        leaves.push(via);
      } else return null;
    }
    return leaves;
  };
  for (const [name, issue] of Object.entries(vulnerabilities)) {
    if (!["high", "critical"].includes(issue.severity)) continue;
    const leaves = advisoryLeaves(name);
    const devOnly = issue.nodes?.length > 0 && issue.nodes.every((node) => lock.packages[node]?.dev === true);
    const reviewed = leaves?.length > 0 && leaves.every((leaf) => leaf.url === reviewedAdvisory.url && leaf.severity === "high");
    if (allowReviewedDevelopmentAdvisory && issue.severity === "high" &&
        /^\d{4}-\d{2}-\d{2}$/.test(today) && today <= reviewedAdvisory.expiresOn && devOnly && reviewed) {
      exceptions.push(name);
    } else blocked.push(name);
  }
  return { passed: blocked.length === 0, blocked, exceptions };
}

function main() {
  const flags = process.argv.slice(2);
  if (flags.some((flag) => flag !== "--allow-reviewed-dev-advisory")) throw new Error("Unknown audit option");
  if (!process.env.npm_execpath) throw new Error("Run this check with npm run audit:security");
  const result = spawnSync(process.execPath, [process.env.npm_execpath, "audit", "--json"], {
    encoding: "utf8", maxBuffer: 10 * 1024 * 1024,
  });
  if (result.error || result.status === null || result.status > 1) throw new Error("npm audit could not complete");
  const report = JSON.parse(result.stdout);
  const lock = JSON.parse(readFileSync(resolve("package-lock.json"), "utf8"));
  const assessment = assessAudit(report, lock, {
    allowReviewedDevelopmentAdvisory: flags.includes("--allow-reviewed-dev-advisory"),
  });
  console.log(`Audit high/critical gate: ${assessment.passed ? "PASS" : "FAIL"}`);
  if (assessment.exceptions.length) {
    console.log(`Reviewed development-only exception: ${reviewedAdvisory.url}`);
    console.log(`Expires: ${reviewedAdvisory.expiresOn}; affected packages: ${assessment.exceptions.join(", ")}`);
  }
  if (assessment.blocked.length) console.error(`Blocked: ${assessment.blocked.join(", ")}`);
  process.exitCode = assessment.passed ? 0 : 1;
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try { main(); } catch (error) {
    console.error(`Security audit failed: ${error.message}`);
    process.exitCode = 1;
  }
}
