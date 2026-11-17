import { describe, expect, it } from "vitest";
import { assessAudit, reviewedAdvisory } from "../../../scripts/security-audit.mjs";

const fixture = () => ({
  report: { vulnerabilities: {
    picomatch: { severity: "high", nodes: ["node_modules/picomatch"], via: [{ severity: "high", url: reviewedAdvisory.url }] },
    parent: { severity: "high", nodes: ["node_modules/parent"], via: ["picomatch"] },
  } },
  lock: { packages: { "node_modules/picomatch": { dev: true }, "node_modules/parent": { dev: true } } },
});
const approved = { allowReviewedDevelopmentAdvisory: true, today: "2026-11-17" };

describe("reviewed development audit exception", () => {
  it("blocks the known advisory unless explicitly enabled", () => {
    const { report, lock } = fixture();
    expect(assessAudit(report, lock).passed).toBe(false);
  });
  it("permits only the known dev-only advisory and its dependent packages", () => {
    const { report, lock } = fixture();
    expect(assessAudit(report, lock, approved)).toEqual({ passed: true, blocked: [], exceptions: ["picomatch", "parent"] });
  });
  it("blocks production exposure even for the known advisory", () => {
    const { report, lock } = fixture();
    lock.packages["node_modules/picomatch"].dev = false;
    expect(assessAudit(report, lock, approved).passed).toBe(false);
  });
  it("blocks a newly reported advisory on the same package", () => {
    const { report, lock } = fixture();
    report.vulnerabilities.picomatch.via.push({ severity: "high", url: "https://github.com/advisories/GHSA-new-issue" });
    expect(assessAudit(report, lock, approved).passed).toBe(false);
  });
  it("never exempts critical findings", () => {
    const { report, lock } = fixture();
    report.vulnerabilities.picomatch.severity = "critical";
    expect(assessAudit(report, lock, approved).passed).toBe(false);
  });
  it("fails closed after the review expires", () => {
    const { report, lock } = fixture();
    expect(assessAudit(report, lock, { ...approved, today: "2026-12-18" }).passed).toBe(false);
  });
  it("fails closed on incomplete dependency lineage or lockfile entries", () => {
    const { report, lock } = fixture();
    report.vulnerabilities.parent.via = ["missing"];
    expect(assessAudit(report, lock, approved).passed).toBe(false);
    const other = fixture();
    expect(assessAudit(other.report, { packages: {} }, approved).passed).toBe(false);
  });
  it("fails closed when the registry audit fails", () => {
    expect(assessAudit({ error: { message: "unavailable" } }, { packages: {} }, approved).passed).toBe(false);
  });
});
