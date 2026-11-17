import { describe, expect, it } from "vitest";
import { batchCsv, batchTable, parseBatchCsv, parseBatchJsonl, reconcileBatch } from "./batch-results";
import { batchSampleCsv, batchSampleRequests, batchSampleResults } from "./batch-sample";
import { batchXlsx } from "./batch-xlsx";
import JSZip from "jszip";

const sample = () => reconcileBatch({ source: batchSampleCsv, results: batchSampleResults, requests: batchSampleRequests });
const result = (id: string, body: unknown) => JSON.stringify({ custom_id: id, response: { status_code: 200, body }, error: null });
describe("batch reconciliation", () => {
  it("restores CSV order, preserves IDs and exports only original eligible requests", () => {
    const report = sample();
    expect(report.rows.map(r => [r.id, r.status, r.answer])).toEqual([
      ["item-001", "success", "Lighting"], ["item-002", "failed", ""], ["item-003", "success", "Drinkware"], ["item-004", "missing", ""],
    ]);
    expect(report.rows[0].source[2]).toBe("00001234");
    expect(parseBatchJsonl(report.retry, "retry")).toEqual(parseBatchJsonl(batchSampleRequests, "requests").filter(r => ["item-002", "item-004"].includes(String(r.custom_id))));
    expect(batchTable(report, true)).toHaveLength(3);
  });
  it("handles BOMs, CRLF, quoted newlines, commas, quotes and exact whitespace", () => {
    expect(parseBatchCsv('\uFEFFid,note\r\n001,"line 1\r\nline 2, ""quoted"""\r\n002,  keep spaces  ')).toEqual({ headers: ["id", "note"], rows: [["001", 'line 1\r\nline 2, "quoted"'], ["002", "  keep spaces  "]] });
  });
  it("rejects malformed CSV and JSONL without partial success", () => {
    for (const csv of ['id,id\na,b', 'id,x\na', 'id,x\na,"bad', 'id,x\na,"x"y']) expect(() => parseBatchCsv(csv)).toThrow();
    expect(() => parseBatchJsonl('{"custom_id":"a"}\nwrong', "Results")).toThrow("line 2");
    expect(() => parseBatchJsonl('{"custom_id":12345678901234567890}', "Results")).toThrow("string custom_id");
    expect(() => reconcileBatch({ results: '{"custom_id":"a","result":{"type":"succeeded"}}' })).toThrow("OpenAI Batch");
  });
  it("blocks duplicate source IDs, and never silently chooses duplicate results", () => {
    expect(() => reconcileBatch({ source: "custom_id\na\na", results: batchSampleResults })).toThrow("duplicate IDs");
    const line = result("a", { choices: [{ message: { content: "answer" }, finish_reason: "stop" }] });
    const report = reconcileBatch({ results: line + "\n" + line });
    expect(report.rows[0].status).toBe("duplicate"); expect(report.retry).toBe("");
    expect(() => reconcileBatch({ results: batchSampleResults, requests: batchSampleRequests + "\n" + batchSampleRequests })).toThrow("duplicate custom_id");
  });
  it("uses original requests to find missing results without a CSV", () => {
    const report = reconcileBatch({ results: batchSampleResults, requests: batchSampleRequests });
    expect(report.rows[3].status).toBe("missing");
    expect(reconcileBatch({ results: batchSampleResults }).warnings.join(" ")).toContain("cannot be detected");
    expect(reconcileBatch({ results: batchSampleResults, source: "key\nitem-003", idColumn: "key" }).unmatched).toEqual(["item-001", "item-002"]);
  });
  it("preserves request lines verbatim, including large numeric arguments, and accepts per-file BOMs", () => {
    const requests = '{"custom_id":"a", "method":"POST", "url":"/v1/responses", "body":{"input":"test", "metadata":{"large":12345678901234567890}}}';
    const results = '\uFEFF{"custom_id":"a","error":{"code":"batch_expired"}}\n\uFEFF' + result("b", { status: "completed", output: [{ content: [{ type: "output_text", text: "ok" }] }] });
    expect(reconcileBatch({ results, requests }).retry).toBe(requests);
  });
  it("separates permanent failures and incomplete/refused/tool answers from retryable errors", () => {
    const report = reconcileBatch({ results: [
      { custom_id: "bad", response: { status_code: 400, body: { error: { message: "Invalid model" } } } },
      { custom_id: "busy", response: { status_code: 429, body: { error: { message: "Rate limited" } } } },
    ].map(v => JSON.stringify(v)).join("\n") });
    expect(report.rows.map(r => r.retryable)).toEqual([false, true]);
    const review = reconcileBatch({ results: [
      result("refusal", { choices: [{ message: { refusal: "Cannot answer" }, finish_reason: "stop" }] }),
      result("cutoff", { choices: [{ message: { content: "partial" }, finish_reason: "length" }] }),
      result("tool", { choices: [{ message: { tool_calls: [] }, finish_reason: "tool_calls" }] }),
      result("responses-cutoff", { status: "incomplete", output: [{ content: [{ type: "output_text", text: "partial" }] }] }),
    ].join("\n") });
    expect(review.rows.every(r => r.status === "review" && !r.retryable)).toBe(true);
  });
  it("protects CSV formulas and quotes output", () => {
    expect(batchCsv([["=1+1", " @SUM(1)", "line\nquote\"", "0001"]])).toBe('\uFEFF"\'=1+1","\' @SUM(1)","line\nquote""","0001"');
  });
  it("makes a text-only XLSX with escaped content and no formulas", async () => {
    const blob = await batchXlsx([["id", "answer"], ["0001234567890123456789", '=HYPERLINK("https://example.com") & <text>']]);
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const sheet = await zip.file("xl/worksheets/sheet1.xml")!.async("string");
    expect(sheet).toContain('t="inlineStr"'); expect(sheet).toContain("0001234567890123456789"); expect(sheet).toContain("&amp; &lt;text&gt;"); expect(sheet).not.toContain("<f>");
    expect(zip.file("[Content_Types].xml")).not.toBeNull();
    await expect(batchXlsx([["a".repeat(32768)]])).rejects.toThrow("cell limit");
  });
});
