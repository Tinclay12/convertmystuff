export type CsvToJsonOptions = {
  inferTypes?: boolean;
  hasHeaderRow?: boolean;
};

export type CsvToJsonResult =
  | { ok: true; json: string; rowCount: number }
  | { ok: false; error: string };

const parseCsvLine = (line: string): string[] => {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
};

const inferValue = (value: string, inferTypes: boolean): unknown => {
  const trimmed = value.trim();

  if (!inferTypes) {
    return trimmed;
  }

  if (trimmed === "") {
    return "";
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (!Number.isNaN(Number(trimmed)) && trimmed !== "") {
    return Number(trimmed);
  }

  return trimmed;
};

export const csvToJson = (
  input: string,
  options: CsvToJsonOptions = {},
): CsvToJsonResult => {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Paste CSV to convert." };
  }

  const lines = trimmed.split(/\r?\n/).filter((line) => line.length > 0);
  const hasHeaderRow = options.hasHeaderRow ?? true;

  if (hasHeaderRow && lines.length < 2) {
    return { ok: false, error: "CSV must include a header row and at least one data row." };
  }

  if (!hasHeaderRow && lines.length < 1) {
    return { ok: false, error: "Paste CSV data to convert." };
  }

  const dataLines = hasHeaderRow ? lines.slice(1) : lines;
  const rows = dataLines.map((line) => parseCsvLine(line));

  const maxColumns = Math.max(...rows.map((row) => row.length), hasHeaderRow ? parseCsvLine(lines[0]).length : 0);
  const headers = hasHeaderRow
    ? parseCsvLine(lines[0]).map((header) => header.trim())
    : Array.from({ length: maxColumns }, (_, index) => `column_${index + 1}`);

  const objects = rows.map((row) => {
    const record: Record<string, unknown> = {};

    headers.forEach((header, index) => {
      record[header] = inferValue(row[index] ?? "", options.inferTypes ?? false);
    });

    return record;
  });

  return {
    ok: true,
    json: `${JSON.stringify(objects, null, 2)}\n`,
    rowCount: objects.length,
  };
};
