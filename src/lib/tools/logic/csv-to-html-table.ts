import { csvToJson } from "./csv-to-json";

export type CsvToHtmlOptions = {
  striped: boolean;
  bordered: boolean;
  tableClass: string;
  tableId: string;
  delimiter?: "," | "\t" | ";";
};

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

const detectDelimiter = (input: string): "," | "\t" | ";" => {
  const firstLine = input.trim().split(/\r?\n/)[0] ?? "";
  const tabCount = (firstLine.match(/\t/g) ?? []).length;
  const semiCount = (firstLine.match(/;/g) ?? []).length;
  const commaCount = (firstLine.match(/,/g) ?? []).length;
  if (tabCount >= commaCount && tabCount >= semiCount && tabCount > 0) return "\t";
  if (semiCount > commaCount) return ";";
  return ",";
};

const parseWithDelimiter = (input: string, delimiter: "," | "\t" | ";"): string[][] => {
  const normalized =
    delimiter === ","
      ? input
      : input
          .split(/\r?\n/)
          .map((line) => line.split(delimiter).join(","))
          .join("\n");
  const result = csvToJson(normalized, { inferTypes: false });
  if (!result.ok) {
    return [];
  }
  const parsed = JSON.parse(result.json.trim()) as Record<string, string>[];
  if (parsed.length === 0) {
    return [];
  }
  const headers = Object.keys(parsed[0]);
  return [headers, ...parsed.map((row) => headers.map((header) => String(row[header] ?? "")))];
};

export type CsvToHtmlResult =
  | { ok: true; html: string; rowCount: number; columnCount: number }
  | { ok: false; error: string };

export const csvToHtmlTable = (
  input: string,
  options: CsvToHtmlOptions,
): CsvToHtmlResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste CSV data to convert." };
  }

  const delimiter = options.delimiter ?? detectDelimiter(trimmed);
  const rows = parseWithDelimiter(trimmed, delimiter);

  if (rows.length < 2) {
    return { ok: false, error: "CSV must include a header row and at least one data row." };
  }

  const [headers, ...dataRows] = rows;
  const classAttr = options.tableClass ? ` class="${escapeHtml(options.tableClass)}"` : "";
  const idAttr = options.tableId ? ` id="${escapeHtml(options.tableId)}"` : "";
  const stripeClass = options.striped ? " tr:nth-child(even){background:#f8fafc;}" : "";
  const borderStyle = options.bordered
    ? " border-collapse:collapse; border:1px solid #e2e8f0;"
    : " border-collapse:collapse;";

  const headerCells = headers
    .map(
      (cell) =>
        `<th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e2e8f0;">${escapeHtml(cell)}</th>`,
    )
    .join("");

  const bodyRows = dataRows
    .map((row) => {
      const cells = row
        .map(
          (cell) =>
            `<td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${escapeHtml(cell)}</td>`,
        )
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  const html = `<style>table${stripeClass}{${borderStyle}}</style>
<table${classAttr}${idAttr} style="width:100%;font-family:sans-serif;font-size:14px;">
<thead><tr>${headerCells}</tr></thead>
<tbody>${bodyRows}</tbody>
</table>`;

  return {
    ok: true,
    html,
    rowCount: dataRows.length,
    columnCount: headers.length,
  };
};
