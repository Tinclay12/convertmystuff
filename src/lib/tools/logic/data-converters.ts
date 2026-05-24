import { parse as parseToml, stringify as stringifyToml } from "smol-toml";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import { csvToJson } from "./csv-to-json";
import type { LogicResult } from "./unit-conversions";

const xmlNodeToObject = (node: Element): unknown => {
  const childElements = Array.from(node.children).filter(
    (child) => child.nodeType === 1,
  ) as Element[];

  if (childElements.length === 0) {
    return node.textContent?.trim() ?? "";
  }

  const result: Record<string, unknown> = {};
  childElements.forEach((child) => {
    const key = child.tagName;
    const value = xmlNodeToObject(child);
    if (result[key] === undefined) {
      result[key] = value;
    } else if (Array.isArray(result[key])) {
      (result[key] as unknown[]).push(value);
    } else {
      result[key] = [result[key], value];
    }
  });

  return result;
};

export const yamlToJson = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste YAML to convert." };
  }

  try {
    const parsed = parseYaml(trimmed);
    return { ok: true, output: JSON.stringify(parsed, null, 2) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid YAML input.",
    };
  }
};

export const jsonToYaml = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste JSON to convert." };
  }

  try {
    const parsed = JSON.parse(trimmed);
    return { ok: true, output: stringifyYaml(parsed) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid JSON input.",
    };
  }
};

export const xmlToJson = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste XML to convert." };
  }

  if (typeof DOMParser === "undefined") {
    return { ok: false, error: "XML parsing is only available in the browser." };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(trimmed, "application/xml");
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      return { ok: false, error: "Invalid XML input." };
    }

    const root = doc.documentElement;
    const output = {
      [root.tagName]: xmlNodeToObject(root),
    };

    return { ok: true, output: JSON.stringify(output, null, 2) };
  } catch {
    return { ok: false, error: "Unable to parse XML." };
  }
};

export const tsvToCsv = (input: string): LogicResult => {
  if (!input.trim()) {
    return { ok: false, error: "Paste TSV data to convert." };
  }

  const lines = input.split(/\r?\n/);
  const output = lines
    .map((line) => {
      const cells = line.split("\t");
      return cells
        .map((cell) => {
          if (/[",\n]/.test(cell)) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(",");
    })
    .join("\n");

  return { ok: true, output };
};

const escapeXmlText = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isValidXmlTag = (tag: string): boolean => /^[A-Za-z_][\w.-]*$/.test(tag);

const objectToXml = (key: string, value: unknown, indent = 1): string => {
  const pad = "  ".repeat(indent);
  const tag = isValidXmlTag(key) ? key : "item";

  if (value === null || value === undefined) {
    return `${pad}<${tag}/>`;
  }

  if (Array.isArray(value)) {
    return value.map((item) => objectToXml(tag, item, indent)).join("\n");
  }

  if (typeof value === "object") {
    const children = Object.entries(value as Record<string, unknown>)
      .map(([childKey, childValue]) => objectToXml(childKey, childValue, indent + 1))
      .join("\n");
    return `${pad}<${tag}>\n${children}\n${pad}</${tag}>`;
  }

  return `${pad}<${tag}>${escapeXmlText(String(value))}</${tag}>`;
};

export const jsonToXml = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste JSON to convert." };
  }

  try {
    const parsed = JSON.parse(trimmed);
    const body =
      typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
        ? Object.entries(parsed as Record<string, unknown>)
            .map(([key, value]) => objectToXml(key, value, 1))
            .join("\n")
        : objectToXml("root", parsed, 1);

    return {
      ok: true,
      output: `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${body}\n</root>`,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid JSON input.",
    };
  }
};

export const csvToYaml = (input: string): LogicResult => {
  const csvResult = csvToJson(input, { inferTypes: false });
  if (!csvResult.ok) {
    return csvResult;
  }

  return jsonToYaml(csvResult.json);
};

export const jsonToToml = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste JSON to convert." };
  }

  try {
    const parsed = JSON.parse(trimmed);
    return { ok: true, output: stringifyToml(parsed) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid JSON input.",
    };
  }
};

export const tomlToJson = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste TOML to convert." };
  }

  try {
    const parsed = parseToml(trimmed);
    return { ok: true, output: JSON.stringify(parsed, null, 2) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid TOML input.",
    };
  }
};

export type DataConverterFn = (input: string) => LogicResult;

export type DataConverterConfig = {
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  transform: DataConverterFn;
};

export const dataConverterConfigs: Record<string, DataConverterConfig> = {
  "yaml-to-json": {
    inputLabel: "YAML input",
    outputLabel: "JSON output",
    inputPlaceholder: "name: Ada\nrole: Engineer",
    transform: yamlToJson,
  },
  "json-to-yaml": {
    inputLabel: "JSON input",
    outputLabel: "YAML output",
    inputPlaceholder: '{"name":"Ada","role":"Engineer"}',
    transform: jsonToYaml,
  },
  "xml-to-json": {
    inputLabel: "XML input",
    outputLabel: "JSON output",
    inputPlaceholder: "<user><name>Ada</name></user>",
    transform: xmlToJson,
  },
  "json-to-xml": {
    inputLabel: "JSON input",
    outputLabel: "XML output",
    inputPlaceholder: '{"user":{"name":"Ada","role":"Engineer"}}',
    transform: jsonToXml,
  },
  "csv-to-yaml": {
    inputLabel: "CSV input",
    outputLabel: "YAML output",
    inputPlaceholder: "id,name\n1,Ada\n2,Grace",
    transform: csvToYaml,
  },
  "json-to-toml": {
    inputLabel: "JSON input",
    outputLabel: "TOML output",
    inputPlaceholder: '{"name":"Ada","role":"Engineer"}',
    transform: jsonToToml,
  },
  "toml-to-json": {
    inputLabel: "TOML input",
    outputLabel: "JSON output",
    inputPlaceholder: 'name = "Ada"\nrole = "Engineer"',
    transform: tomlToJson,
  },
  "tsv-to-csv": {
    inputLabel: "TSV input",
    outputLabel: "CSV output",
    inputPlaceholder: "id\tname\n1\tAda",
    transform: tsvToCsv,
  },
};
