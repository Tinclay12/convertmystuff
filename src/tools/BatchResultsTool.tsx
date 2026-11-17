"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Textarea } from "@/components/ui/Textarea";
import { BrowserPrivacyNote } from "@/components/tools/BrowserPrivacyNote";
import { ToolSelect } from "@/components/tools/ToolSelect";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { BATCH_LIMIT, batchCsv, batchTable, parseBatchCsv, reconcileBatch, type BatchReport, type BatchStatus } from "@/lib/tools/logic/batch-results";
import { batchSampleCsv, batchSampleRequests, batchSampleResults } from "@/lib/tools/logic/batch-sample";

export const BatchResultsTool = () => {
  const [source, setSource] = useState("");
  const [results, setResults] = useState("");
  const [requests, setRequests] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [idColumn, setIdColumn] = useState("custom_id");
  const [report, setReport] = useState<BatchReport | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [isSample, setIsSample] = useState(false);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const revision = useRef(0);
  const invalidate = () => { revision.current++; setReport(null); setError(""); setPage(0); setFilter("all"); };
  const event = (name: "flagship_calculate" | "flagship_export", mode: string, format?: string) => trackFlagshipEvent(name, { tool_id: "openai-batch-to-spreadsheet", tool_category: "developer-tools", mode: `${isSample ? "sample" : "own-files"}:${mode}`, export_format: format });
  const update = (kind: string, text: string) => {
    invalidate();
    setIsSample(false);
    if (kind === "source") {
      setSource(text); setHeaders([]);
      if (text.trim()) { const parsed = parseBatchCsv(text); setHeaders(parsed.headers); setIdColumn(parsed.headers.includes("custom_id") ? "custom_id" : parsed.headers[0]); }
    } else if (kind === "results") setResults(text);
    else setRequests(text);
  };
  const upload = async (files: FileList | null, kind: string) => {
    if (!files?.length) return;
    invalidate();
    const version = revision.current;
    setBusy(true);
    try {
      if (Array.from(files).reduce((sum, f) => sum + f.size, 0) > BATCH_LIMIT) throw new Error("Use at most 20 MB per input.");
      const texts = await Promise.all(Array.from(files).map(f => f.text()));
      if (version === revision.current) update(kind, texts.join("\n"));
    } catch (e) { if (version === revision.current) setError(e instanceof Error ? e.message : "Could not read file."); }
    finally { setBusy(false); }
  };
  const reconcile = () => {
    setError(""); setReport(null); setPage(0); setFilter("all");
    try { setReport(reconcileBatch({ source, results, requests, idColumn })); event("flagship_calculate", "reconcile"); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not match results."); }
  };
  const sample = () => { invalidate(); setIsSample(true); setSource(batchSampleCsv); setHeaders(["custom_id", "product", "sku"]); setIdColumn("custom_id"); setResults(batchSampleResults); setRequests(batchSampleRequests); };
  const clear = () => { invalidate(); setIsSample(false); setSource(""); setHeaders([]); setIdColumn("custom_id"); setResults(""); setRequests(""); };
  const xlsx = async () => {
    if (!report) return;
    setBusy(true); setError("");
    try {
      const { batchXlsx } = await import("@/lib/tools/logic/batch-xlsx");
      const blob = await batchXlsx(batchTable(report));
      const url = URL.createObjectURL(blob), anchor = document.createElement("a");
      anchor.href = url; anchor.download = "batch-results.xlsx"; document.body.appendChild(anchor); anchor.click(); anchor.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      event("flagship_export", "results", "xlsx");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not create workbook."); }
    finally { setBusy(false); }
  };
  const statuses: BatchStatus[] = ["success", "failed", "missing", "review", "duplicate"];
  const visible = report?.rows.filter(r => filter === "all" || r.status === filter) ?? [];
  return <div className="space-y-6">
    <BrowserPrivacyNote />
    <div className="rounded-xl border border-accent/20 bg-accent-soft p-4">
      <p className="font-semibold">From scattered batch results to one useful spreadsheet</p>
      <p className="mt-1 text-sm text-muted-strong">Match by ID, keep original rows, and separate answers from requests that need attention. OpenAI Responses and Chat Completions text results supported.</p>
      <div className="mt-3 flex flex-wrap gap-2"><Button onClick={sample} disabled={busy} variant="secondary">Try sample files</Button><Button onClick={clear} disabled={busy} variant="ghost">Clear workspace</Button></div>
      <details className="mt-3 text-sm"><summary className="cursor-pointer text-accent">Download the reproducible sample</summary><p className="my-3 text-muted-strong">Synthetic product data: 4 original rows, 2 successful answers returned out of order, 1 expired request and 1 missing result. Expected retry count: 2. Includes quoted commas and leading-zero SKUs. Replace YOUR_MODEL before submitting sample requests to an API.</p><div className="flex flex-wrap gap-2"><DownloadButton label="Sample CSV" content={batchSampleCsv} filename="sample-products.csv" mimeType="text/csv;charset=utf-8" /><DownloadButton label="Sample results" content={batchSampleResults} filename="sample-results.jsonl" /><DownloadButton label="Sample requests" content={batchSampleRequests} filename="sample-requests.jsonl" /></div></details>
    </div>
    <fieldset disabled={busy} className="space-y-5 disabled:opacity-60">
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="space-y-3 rounded-xl border border-border p-4">
          <h2 className="font-semibold">1. Add your results</h2>
          <label className="block text-sm">Result and error JSONL files (required)<input type="file" multiple accept=".jsonl,.ndjson,.json,.txt" className="mt-2 block w-full text-sm" onChange={e => { void upload(e.target.files, "results"); e.target.value = ""; }} /></label>
          <Textarea label="Result JSONL" value={results} maxLength={BATCH_LIMIT} onChange={e => update("results", e.target.value)} placeholder='{"custom_id":"item-001","response":{...},"error":null}' helperText="Select output and error files together, or paste one JSON object per line. Up to 20 MB per input." />
        </section>
        <section className="space-y-3 rounded-xl border border-border p-4">
          <h2 className="font-semibold">2. Restore your spreadsheet</h2>
          <label className="block text-sm">Original CSV (optional)<input type="file" accept=".csv,text/csv" className="mt-2 block w-full text-sm" onChange={e => { void upload(e.target.files, "source"); e.target.value = ""; }} /></label>
          <Textarea label="Original CSV" value={source} maxLength={BATCH_LIMIT} onChange={e => { try { update("source", e.target.value); } catch { /* Partial CSV is checked when matching. */ } }} placeholder={"custom_id,product,sku\nitem-001,Desk lamp,00001234"} helperText="Comma-separated CSV. IDs must match custom_id exactly; no row-number guessing." />
          {headers.length > 0 && <ToolSelect label="CSV request ID column" value={idColumn} onChange={e => { invalidate(); setIdColumn(e.target.value); }}>{headers.map(h => <option key={h}>{h}</option>)}</ToolSelect>}
        </section>
      </div>
      <details className="rounded-xl border border-border p-4"><summary className="cursor-pointer font-semibold">3. Add original requests to enable retry export (optional)</summary>
        <div className="mt-4 space-y-3"><label className="block text-sm">Original request JSONL<input type="file" accept=".jsonl,.ndjson,.json,.txt" className="mt-2 block w-full text-sm" onChange={e => { void upload(e.target.files, "requests"); e.target.value = ""; }} /></label>
          <Textarea label="Original request JSONL" value={requests} maxLength={BATCH_LIMIT} onChange={e => update("requests", e.target.value)} helperText="Required for executable retry JSONL. Without a CSV, this file supplies the expected IDs and order." />
        </div>
      </details>
      <Button onClick={reconcile} disabled={!results.trim()}>Match results</Button>
    </fieldset>
    {busy && <p role="status" className="text-sm text-muted">Processing file.</p>}
    {error && <p role="alert" className="rounded-lg bg-destructive-bg p-3 text-sm text-destructive">{error}</p>}
    {report && <section aria-label="Matched results" className="space-y-4">
      <div aria-live="polite" className="grid grid-cols-2 gap-2 sm:grid-cols-5">{statuses.map(status => <div key={status} className="rounded-xl border border-border bg-panel-muted p-3"><p className="text-2xl font-semibold tabular-nums">{report.rows.filter(r => r.status === status).length}</p><p className="text-sm capitalize text-muted-strong">{status}</p></div>)}</div>
      {report.warnings.map(w => <p key={w} className="rounded-lg bg-warning-bg p-3 text-sm text-warning">{w}</p>)}
      {report.unmatched.length > 0 && <details className="rounded-lg bg-warning-bg p-3 text-sm text-warning"><summary>{report.unmatched.length} unmatched result IDs - excluded from the spreadsheet</summary><p className="mt-2 break-all">{report.unmatched.join(", ")}</p></details>}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => void xlsx()} disabled={busy}>Download Excel (.xlsx)</Button>
        <DownloadButton label="Download CSV" content={batchCsv(batchTable(report))} filename="batch-results.csv" mimeType="text/csv;charset=utf-8" onDownloaded={() => event("flagship_export", "results", "csv")} />
        {report.rows.some(r => r.status !== "success") && <DownloadButton label="Download review CSV" content={batchCsv(batchTable(report, true))} filename="batch-review.csv" mimeType="text/csv;charset=utf-8" onDownloaded={() => event("flagship_export", "review", "csv")} />}
        <DownloadButton label={`Retry JSONL (${report.retryCount})`} content={report.retry} filename="batch-retry.jsonl" onDownloaded={() => event("flagship_export", "retry", "jsonl")} />
      </div>
      <p className="text-xs text-muted">Excel exports preserve every cell as text, including leading zeros and long IDs. CSV apps may change numeric-looking values; formula-like CSV cells receive a protective apostrophe.</p>
      <p className="text-xs text-muted">Retry includes missing requests and recognized temporary failures with available original bodies. Confirm the batch has finished before submitting. Review permanent errors, refusals, incomplete answers and duplicates separately.</p>
      <ToolSelect label="Show rows" value={filter} onChange={e => { setFilter(e.target.value); setPage(0); }}><option value="all">All statuses</option>{statuses.map(s => <option key={s} value={s}>{s}</option>)}</ToolSelect>
      <div className="max-h-96 overflow-auto rounded-xl border border-border"><table className="w-full text-left text-sm"><caption className="sr-only">Batch results in original input order</caption><thead className="sticky top-0 bg-panel-muted"><tr>{[...report.headers.map(h => `original.${h}`), "Request ID", "Status", "Answer", "Detail"].map(h => <th key={h} scope="col" className="whitespace-nowrap p-3">{h}</th>)}</tr></thead><tbody>{visible.slice(page * 25, (page + 1) * 25).map(r => <tr key={r.id} className="border-t border-border">{[...r.source, r.id, r.status, r.answer, r.detail].map((cell, i) => <td key={i} className="min-w-28 max-w-80 p-3 align-top"><div className="max-h-40 overflow-auto whitespace-pre-wrap break-words">{cell}</div></td>)}</tr>)}</tbody></table></div>
      <div className="flex items-center gap-3 text-sm"><Button variant="secondary" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button><span>{visible.length ? page * 25 + 1 : 0}-{Math.min((page + 1) * 25, visible.length)} of {visible.length}</span><Button variant="secondary" disabled={(page + 1) * 25 >= visible.length} onClick={() => setPage(p => p + 1)}>Next</Button></div>
    </section>}
  </div>;
};
