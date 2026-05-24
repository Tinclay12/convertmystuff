export type CsvDelimiter = "," | "\t" | ";";

export type JsonToCsvOptions = {
  flattenNested?: boolean;
  excelBom?: boolean;
  columnOrder?: string[];
  ndjson?: boolean;
};

export type JsonToCsvResult =
  | { ok: true; csv: string; columns: string[] }
  | { ok: false; error: string };

const flattenObject = (
  value: Record<string, unknown>,
  prefix = "",
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  Object.entries(value).forEach(([key, nestedValue]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (
      nestedValue &&
      typeof nestedValue === "object" &&
      !Array.isArray(nestedValue)
    ) {
      Object.assign(
        flattened,
        flattenObject(nestedValue as Record<string, unknown>, nextKey),
      );
      return;
    }

    flattened[nextKey] = nestedValue;
  });

  return flattened;
};

const prepareRows = (
  parsed: unknown[],
  flattenNested: boolean,
): Array<Record<string, unknown> | null> => {
  return parsed.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return null;
    }

    if (flattenNested) {
      return flattenObject(item as Record<string, unknown>);
    }

    return item as Record<string, unknown>;
  });
};

const escapeCsvValue = (value: unknown, delimiter: CsvDelimiter): string => {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);
  const needsQuotes =
    stringValue.includes('"') ||
    stringValue.includes("\n") ||
    stringValue.includes(delimiter);

  if (needsQuotes) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

export const parseJsonInput = (
  input: string,
  ndjson: boolean,
): { ok: true; parsed: unknown[] } | { ok: false; error: string } => {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Paste JSON to convert." };
  }

  if (ndjson) {
    const lines = trimmed.split(/\r?\n/).filter((line) => line.trim().length > 0);
    const objects: unknown[] = [];

    for (const line of lines) {
      try {
        const item = JSON.parse(line.trim());
        if (!item || typeof item !== "object" || Array.isArray(item)) {
          return { ok: false, error: "Each NDJSON line must be a JSON object." };
        }
        objects.push(item);
      } catch {
        return { ok: false, error: "Invalid NDJSON line. Each line must be valid JSON." };
      }
    }

    if (objects.length === 0) {
      return { ok: true, parsed: [] };
    }

    return { ok: true, parsed: objects };
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed)) {
      return { ok: false, error: "JSON must be an array of objects." };
    }
    return { ok: true, parsed };
  } catch {
    return { ok: false, error: "Invalid JSON input." };
  }
};

export const jsonToCsv = (
  input: string,
  delimiter: CsvDelimiter = ",",
  options: JsonToCsvOptions = {},
): JsonToCsvResult => {
  const { flattenNested = false, excelBom = false, columnOrder, ndjson = false } = options;

  const parseResult = parseJsonInput(input, ndjson);
  if (!parseResult.ok) {
    return parseResult;
  }

  const parsed = parseResult.parsed;

  if (parsed.length === 0) {
    return { ok: true, csv: "", columns: [] };
  }

  if (!parsed.every((item) => item && typeof item === "object")) {
    return { ok: false, error: "Each array item must be an object." };
  }

  const rows = prepareRows(parsed, flattenNested);
  if (rows.some((row) => row === null)) {
    return { ok: false, error: "Each array item must be an object." };
  }

  const flatCheck = !flattenNested
    ? parsed.every((item) => {
        const record = item as Record<string, unknown>;
        return Object.values(record).every(
          (value) =>
            value === null ||
            value === undefined ||
            typeof value !== "object" ||
            Array.isArray(value),
        );
      })
    : true;

  if (!flatCheck) {
    return {
      ok: false,
      error: "Nested objects detected. Enable flatten nested or use Nested JSON to CSV.",
    };
  }

  const safeRows = rows as Record<string, unknown>[];
  const discoveredColumns = Array.from(
    new Set(safeRows.flatMap((item) => Object.keys(item))),
  );

  let columns = discoveredColumns;
  if (columnOrder && columnOrder.length > 0) {
    const ordered = columnOrder.filter((col) => discoveredColumns.includes(col));
    const remaining = discoveredColumns.filter((col) => !ordered.includes(col));
    columns = [...ordered, ...remaining];
  }

  const header = columns.join(delimiter);
  const csvRows = safeRows.map((item) => {
    return columns
      .map((column) => escapeCsvValue(item[column], delimiter))
      .join(delimiter);
  });

  const csvBody = [header, ...csvRows].join("\n");
  const csv = excelBom ? `\uFEFF${csvBody}` : csvBody;

  return {
    ok: true,
    csv,
    columns,
  };
};
