import type { LogicResult } from "./unit-conversions";

const indentSql = (input: string): string => {
  const keywords = ["SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"];
  let formatted = input.replace(/\s+/g, " ").trim();

  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    formatted = formatted.replace(regex, `\n${keyword.toUpperCase()}`);
  });

  return formatted.trim();
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

export const formatSql = (input: string, mode: "pretty" | "minify"): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste SQL to format." };
  }

  const output = mode === "pretty" ? indentSql(trimmed) : trimmed.replace(/\s+/g, " ");
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
