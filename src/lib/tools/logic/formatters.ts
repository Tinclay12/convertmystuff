import type { LogicResult } from "./unit-conversions";

const SQL_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "INNER JOIN",
  "GROUP BY",
  "ORDER BY",
  "HAVING",
  "LIMIT",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE FROM",
  "RETURNING",
  "WITH",
];

const applyKeywordCase = (keyword: string, keywordCase: "upper" | "lower" | "preserve"): string => {
  if (keywordCase === "preserve") {
    return keyword;
  }
  return keywordCase === "lower" ? keyword.toLowerCase() : keyword.toUpperCase();
};

const indentSql = (
  input: string,
  keywordCase: "upper" | "lower" | "preserve" = "upper",
): string => {
  let formatted = input.replace(/\s+/g, " ").trim();

  SQL_KEYWORDS.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    const replacement = `\n${applyKeywordCase(keyword, keywordCase)}`;
    formatted = formatted.replace(regex, replacement);
  });

  return formatted.trim();
};

export type SqlFormatOptions = {
  dialect?: "ansi" | "mysql" | "postgresql";
  keywordCase?: "upper" | "lower" | "preserve";
};

const minifyCss = (input: string): string => {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .trim();
};

const formatCss = (input: string): string => {
  return input
    .replace(/\{/g, " {\n  ")
    .replace(/;/g, ";\n  ")
    .replace(/\}/g, "\n}\n")
    .replace(/\s+\n/g, "\n")
    .trim();
};

export const formatSql = (
  input: string,
  mode: "pretty" | "minify",
  options: SqlFormatOptions = {},
): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste SQL to format." };
  }

  const keywordCase = options.keywordCase ?? "upper";
  let output =
    mode === "pretty" ? indentSql(trimmed, keywordCase) : trimmed.replace(/\s+/g, " ");

  if (options.dialect === "postgresql" && mode === "pretty") {
    output = output.replace(/\bRETURNING\b/gi, applyKeywordCase("RETURNING", keywordCase));
  }

  return { ok: true, output };
};

export const formatCssText = (input: string, mode: "pretty" | "minify"): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste CSS to format." };
  }

  const output = mode === "pretty" ? formatCss(trimmed) : minifyCss(trimmed);
  return { ok: true, output };
};

export type FormatterFn = (input: string, mode: "pretty" | "minify") => LogicResult;

export type FormatterConfig = {
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  transform: FormatterFn;
};

export const formatterConfigs: Record<string, FormatterConfig> = {
  "sql-formatter": {
    inputLabel: "SQL input",
    outputLabel: "Formatted SQL",
    inputPlaceholder: "SELECT id, name FROM users WHERE active = true",
    transform: formatSql,
  },
  "css-formatter": {
    inputLabel: "CSS input",
    outputLabel: "Formatted CSS",
    inputPlaceholder: "body{margin:0;color:#111;}",
    transform: formatCssText,
  },
};
