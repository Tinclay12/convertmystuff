import { PDFDocument, StandardFonts } from "pdf-lib";
import type { LogicResult } from "./unit-conversions";

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

export const markdownToHtml = (input: string): LogicResult => {
  if (!input.trim()) {
    return { ok: false, error: "Paste Markdown to convert." };
  }

  let html = escapeHtml(input);
  html = html.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (block) => `<ul>${block}</ul>`);
  html = html.replace(/^(?!<[hul])(.+)$/gm, "<p>$1</p>");

  return { ok: true, output: html };
};

export const htmlToMarkdown = (input: string): LogicResult => {
  if (!input.trim()) {
    return { ok: false, error: "Paste HTML to convert." };
  }

  let markdown = input;
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");
  markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
  markdown = markdown.replace(/<br\s*\/?>/gi, "\n");
  markdown = markdown.replace(/<[^>]+>/g, "");

  return { ok: true, output: markdown.trim() };
};

export const countDocumentWords = (input: string): LogicResult => {
  const trimmed = input.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = input.length;
  const lines = input ? input.split(/\r?\n/).length : 0;

  return {
    ok: true,
    output: `Words: ${words}\nCharacters: ${characters}\nLines: ${lines}`,
    meta: { words, characters, lines },
  };
};

export const textToPdfBytes = async (input: string): Promise<Uint8Array> => {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  let page = pdf.addPage([612, 792]);
  const fontSize = 12;
  const margin = 50;
  const maxWidth = page.getWidth() - margin * 2;
  const lines = input.split(/\r?\n/);
  let y = page.getHeight() - margin;

  for (const line of lines) {
    if (y < margin) {
      y = page.getHeight() - margin;
      page = pdf.addPage([612, 792]);
    }

    const wrapped =
      line.length > 90
        ? line.match(/.{1,90}(\s|$)/g)?.map((part) => part.trim()) ?? [line]
        : [line];

    for (const part of wrapped) {
      page.drawText(part, { x: margin, y, size: fontSize, font, maxWidth });
      y -= fontSize + 4;
    }
  }

  return pdf.save();
};

export const mergePdfFiles = async (files: File[]): Promise<Uint8Array> => {
  const merged = await PDFDocument.create();

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }

  return merged.save();
};

export const splitPdfFile = async (file: File): Promise<{ name: string; bytes: Uint8Array }[]> => {
  return splitPdfFileByRanges(file, "all");
};

export const parsePageRangeSpec = (
  spec: string,
  pageCount: number,
): number[] | { error: string } => {
  const trimmed = spec.trim().toLowerCase();
  if (!trimmed || trimmed === "all") {
    return Array.from({ length: pageCount }, (_, index) => index);
  }

  const indices = new Set<number>();

  for (const part of trimmed.split(",")) {
    const segment = part.trim();
    if (!segment) {
      continue;
    }

    if (segment.includes("-")) {
      const [startRaw, endRaw] = segment.split("-").map((value) => value.trim());
      const start = Number(startRaw);
      const end = Number(endRaw);
      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > pageCount) {
        return { error: `Invalid page range: ${segment}` };
      }
      for (let page = start; page <= end; page += 1) {
        indices.add(page - 1);
      }
      continue;
    }

    const page = Number(segment);
    if (!Number.isInteger(page) || page < 1 || page > pageCount) {
      return { error: `Invalid page number: ${segment}` };
    }
    indices.add(page - 1);
  }

  if (indices.size === 0) {
    return { error: "Enter page ranges such as 1-3, 5 or all." };
  }

  return Array.from(indices).sort((a, b) => a - b);
};

export const splitPdfFileByRanges = async (
  file: File,
  rangeSpec: string,
): Promise<{ name: string; bytes: Uint8Array }[]> => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const source = await PDFDocument.load(bytes);
  const pageCount = source.getPageCount();
  const parsed = parsePageRangeSpec(rangeSpec, pageCount);

  if (!Array.isArray(parsed)) {
    throw new Error(parsed.error);
  }

  const outputs: { name: string; bytes: Uint8Array }[] = [];
  const baseName = file.name.replace(/\.pdf$/i, "");

  for (const index of parsed) {
    const pdf = await PDFDocument.create();
    const [page] = await pdf.copyPages(source, [index]);
    pdf.addPage(page);
    outputs.push({
      name: `${baseName}-page-${index + 1}.pdf`,
      bytes: await pdf.save(),
    });
  }

  return outputs;
};

export const mergePdfFilesWithProgress = async (
  files: File[],
  onProgress?: (current: number, total: number) => void,
): Promise<Uint8Array> => {
  const merged = await PDFDocument.create();

  for (let index = 0; index < files.length; index += 1) {
    onProgress?.(index + 1, files.length);
    const file = files[index];
    const bytes = new Uint8Array(await file.arrayBuffer());
    const pdf = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }

  return merged.save();
};

export type DocumentToolConfig =
  | {
      kind: "textarea";
      inputLabel: string;
      outputLabel: string;
      inputPlaceholder: string;
      transform: (input: string) => LogicResult;
    }
  | {
      kind: "pdf-merge";
    }
  | {
      kind: "pdf-split";
    }
  | {
      kind: "text-to-pdf";
      inputLabel: string;
      inputPlaceholder: string;
    };

export const documentToolConfigs: Record<string, DocumentToolConfig> = {
  "markdown-to-html": {
    kind: "textarea",
    inputLabel: "Markdown",
    outputLabel: "HTML output",
    inputPlaceholder: "# Title\n\n**Bold** text and a list:\n\n- one\n- two",
    transform: markdownToHtml,
  },
  "html-to-markdown": {
    kind: "textarea",
    inputLabel: "HTML",
    outputLabel: "Markdown output",
    inputPlaceholder: "<h1>Title</h1><p><strong>Bold</strong> text</p>",
    transform: htmlToMarkdown,
  },
  "word-count-document": {
    kind: "textarea",
    inputLabel: "Document text",
    outputLabel: "Word count summary",
    inputPlaceholder: "Paste document text here...",
    transform: countDocumentWords,
  },
  "text-to-pdf": {
    kind: "text-to-pdf",
    inputLabel: "Plain text",
    inputPlaceholder: "Paste text to export as PDF...",
  },
  "pdf-merge": {
    kind: "pdf-merge",
  },
  "pdf-split": {
    kind: "pdf-split",
  },
};
