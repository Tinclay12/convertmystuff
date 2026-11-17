type RecordValue = Record<string, unknown>;
export type BatchStatus = "success" | "failed" | "missing" | "review" | "duplicate";
export type BatchRow = { id: string; source: string[]; status: BatchStatus; answer: string; detail: string; retryable: boolean };
export type BatchReport = { headers: string[]; rows: BatchRow[]; unmatched: string[]; retry: string; retryCount: number; warnings: string[] };
export const BATCH_LIMIT = 20 * 1024 * 1024;
const object = (v: unknown): RecordValue => v !== null && typeof v === "object" && !Array.isArray(v) ? v as RecordValue : {};
const str = (v: unknown): string => typeof v === "string" ? v : v == null ? "" : JSON.stringify(v);
const identifier = (v: unknown): string => {
  if (typeof v !== "string" || !v.trim()) throw new Error("Every JSONL record needs a nonempty string custom_id.");
  return v;
};

export function parseBatchJsonl(text: string, label: string): RecordValue[] {
  if (text.length > BATCH_LIMIT) throw new Error(`${label}: maximum size is 20 MB.`);
  const rows: RecordValue[] = [];
  text.replace(/^\uFEFF/, "").split(/\r?\n/).forEach((line, i) => {
    line = line.replace(/^\uFEFF/, "");
    if (!line.trim()) return;
    try {
      const parsed: unknown = JSON.parse(line);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Expected a JSON object.");
      const row = object(parsed);
      identifier(row.custom_id);
      rows.push(row);
    } catch (error) { throw new Error(`${label}, line ${i + 1}: ${error instanceof Error ? error.message : "Invalid JSON"}`); }
  });
  return rows;
}

/** Strict comma-separated parser: preserves text, quoted newlines and exact IDs. */
export function parseBatchCsv(text: string): { headers: string[]; rows: string[][] } {
  if (text.length > BATCH_LIMIT) throw new Error("Original CSV: maximum size is 20 MB.");
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false, closed = false;
  const input = text.replace(/^\uFEFF/, "");
  const endCell = () => { row.push(cell); cell = ""; closed = false; };
  const endRow = () => { endCell(); if (row.some(v => v !== "")) rows.push(row); row = []; };
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') { quoted = false; closed = true; }
      else cell += c;
    } else if (c === ",") endCell();
    else if (c === "\n" || c === "\r") { endRow(); if (c === "\r" && input[i + 1] === "\n") i++; }
    else if (c === '"' && !cell && !closed) quoted = true;
    else { if (closed || c === '"') throw new Error("Original CSV: unexpected character near a quote."); cell += c; }
  }
  if (quoted) throw new Error("Original CSV: unclosed quoted cell.");
  if (cell || row.length || closed) endRow();
  const headers = rows.shift() ?? [];
  if (!headers.length || headers.some(h => !h.trim()) || new Set(headers).size !== headers.length) throw new Error("Original CSV needs unique, nonempty column headers.");
  if (rows.some(r => r.length !== headers.length)) throw new Error("Original CSV: a row has a different number of columns than the header.");
  if (!rows.length) throw new Error("Original CSV needs at least one data row.");
  return { headers, rows };
}

function outcome(record: RecordValue): Pick<BatchRow, "status" | "answer" | "detail" | "retryable"> {
  const response = object(record.response), body = object(response.body), error = object(record.error ?? body.error);
  const code = str(error.code ?? error.type);
  const http = Number(response.status_code);
  if (record.error || body.error || http >= 400) {
    return { status: "failed", answer: "", detail: str(error.message) || code || `HTTP ${http}`,
      retryable: code !== "insufficient_quota" && (http === 408 || http === 429 || http >= 500 || ["batch_expired", "rate_limit_exceeded", "server_error"].includes(code)) };
  }
  if (!(http >= 200 && http < 300)) throw new Error(`Result ${str(record.custom_id)}: expected an OpenAI Batch response.status_code or error.`);
  const choice = object(Array.isArray(body.choices) ? body.choices[0] : undefined);
  const message = object(choice.message);
  const output = Array.isArray(body.output) ? body.output : [];
  const parts = output.flatMap(item => {
    const content = object(item).content;
    return Array.isArray(content) ? content.map(object) : [];
  });
  const answer = typeof message.content === "string" ? message.content : parts.filter(p => p.type === "output_text").map(p => str(p.text)).join("\n");
  const refusal = str(message.refusal) || parts.filter(p => p.type === "refusal").map(p => str(p.refusal)).join("\n");
  const incomplete = Array.isArray(body.choices) ? choice.finish_reason !== "stop" : body.status !== "completed";
  if (refusal || incomplete || !answer) return { status: "review", answer, detail: refusal || (incomplete ? `Incomplete or non-text result: ${str(choice.finish_reason ?? body.status)}` : "No text answer; inspect the original result."), retryable: false };
  return { status: "success", answer, detail: "", retryable: false };
}

export function reconcileBatch(input: { results: string; source?: string; idColumn?: string; requests?: string }): BatchReport {
  const results = parseBatchJsonl(input.results, "Results");
  if (!results.length) throw new Error("Add at least one result record.");
  const requests = parseBatchJsonl(input.requests ?? "", "Original requests");
  const requestMap = new Map<string, RecordValue>();
  const requestLines = (input.requests ?? "").split(/\r?\n/).map(line => line.replace(/^\uFEFF/, "")).filter(line => line.trim());
  const rawRequests = new Map<string, string>();
  requests.forEach((r, i) => {
    const id = identifier(r.custom_id);
    if (requestMap.has(id)) throw new Error(`Original requests: duplicate custom_id ${id}.`);
    if (r.method !== "POST" || typeof r.url !== "string" || !r.url.startsWith("/v1/") || !Object.keys(object(r.body)).length) throw new Error(`Original request ${id}: expected method POST, /v1/ URL and body.`);
    requestMap.set(id, r);
    rawRequests.set(id, requestLines[i]);
  });
  const grouped = new Map<string, RecordValue[]>();
  results.forEach(r => {
    const id = identifier(r.custom_id), group = grouped.get(id);
    if (group) group.push(r); else grouped.set(id, [r]);
  });
  let headers: string[] = [], sources: string[][], ids: string[];
  if (input.source?.trim()) {
    const csv = parseBatchCsv(input.source);
    headers = csv.headers;
    const key = headers.indexOf(input.idColumn || "custom_id");
    if (key < 0) throw new Error("Choose the CSV column containing the exact custom_id values.");
    sources = csv.rows; ids = sources.map(r => identifier(r[key]));
    if (new Set(ids).size !== ids.length) throw new Error("Original CSV has duplicate IDs. Resolve them before matching.");
  } else { ids = requests.length ? [...requestMap.keys()] : [...grouped.keys()]; sources = ids.map(() => []); }
  const rows: BatchRow[] = ids.map((id, i) => {
    const matches = grouped.get(id) ?? [];
    const result = matches.length > 1
      ? { status: "duplicate" as const, answer: "", detail: `${matches.length} results share this ID. Resolve before exporting an answer.`, retryable: false }
      : !matches.length
        ? { status: "missing" as const, answer: "", detail: "No result found. Confirm the batch is finished before retrying.", retryable: true }
        : outcome(matches[0]);
    return { id, source: sources[i], ...result };
  });
  const expected = new Set(ids);
  const retryRows = rows.filter(r => r.retryable && requestMap.has(r.id));
  const warnings: string[] = [];
  if (!headers.length && !requests.length) warnings.push("Results-only mode: missing requests cannot be detected without an original CSV or request file.");
  const unavailable = rows.filter(r => r.retryable && !requestMap.has(r.id)).length;
  if (unavailable) warnings.push(`${unavailable} retry candidates have no original request body. Add the original request JSONL to create their retry file.`);
  return { headers, rows, unmatched: [...grouped.keys()].filter(id => !expected.has(id)),
    retry: retryRows.map(r => rawRequests.get(r.id)).join("\n"), retryCount: retryRows.length, warnings };
}

export function batchTable(report: BatchReport, reviewOnly = false): string[][] {
  return [[...report.headers.map(h => `original.${h}`), "custom_id", "batch_status", "answer", "detail"],
    ...report.rows.filter(r => !reviewOnly || r.status !== "success").map(r => [...r.source, r.id, r.status, r.answer, r.detail])];
}
export function batchCsv(table: string[][]): string {
  return "\uFEFF" + table.map(row => row.map(value => {
    const safe = /^[\s\u0000-\u0020]*[=+\-@]/.test(value) ? "'" + value : value;
    return '"' + safe.replace(/"/g, '""') + '"';
  }).join(",")).join("\r\n");
}
