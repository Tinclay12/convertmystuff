import type { LogicResult } from "./unit-conversions";

export const encodeBase64 = (input: string): LogicResult => {
  try {
    const output = btoa(unescape(encodeURIComponent(input)));
    return { ok: true, output };
  } catch {
    return { ok: false, error: "Unable to encode input to Base64." };
  }
};

export const decodeBase64 = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste a Base64 string to decode." };
  }

  try {
    const output = decodeURIComponent(escape(atob(trimmed)));
    return { ok: true, output };
  } catch {
    return { ok: false, error: "Invalid Base64 string." };
  }
};

export const encodeUrl = (input: string): LogicResult => {
  if (!input) {
    return { ok: false, error: "Enter text to encode." };
  }

  return { ok: true, output: encodeURIComponent(input) };
};

export const decodeUrl = (input: string): LogicResult => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter a URL-encoded string to decode." };
  }

  try {
    return { ok: true, output: decodeURIComponent(trimmed) };
  } catch {
    return { ok: false, error: "Invalid URL-encoded string." };
  }
};

const htmlEntityMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const encodeHtmlEntities = (input: string): LogicResult => {
  if (!input) {
    return { ok: false, error: "Enter text to encode." };
  }

  const output = input.replace(/[&<>"']/g, (char) => htmlEntityMap[char] ?? char);
  return { ok: true, output };
};

export type EncoderFn = (input: string) => LogicResult;

export type EncoderConfig = {
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  reverseToolId?: string;
  reversePath?: string;
  reverseLabel?: string;
  transform: EncoderFn;
};

export const encoderConfigs: Record<string, EncoderConfig> = {
  "base64-encode": {
    inputLabel: "Text to encode",
    outputLabel: "Base64 output",
    inputPlaceholder: "Hello world",
    reverseToolId: "base64-decode",
    reversePath: "/developer-tools/base64-decode/",
    reverseLabel: "Base64 Decoder",
    transform: encodeBase64,
  },
  "base64-decode": {
    inputLabel: "Base64 to decode",
    outputLabel: "Decoded text",
    inputPlaceholder: "SGVsbG8gd29ybGQ=",
    reverseToolId: "base64-encode",
    reversePath: "/developer-tools/base64-encode/",
    reverseLabel: "Base64 Encoder",
    transform: decodeBase64,
  },
  "url-encode": {
    inputLabel: "Text to encode",
    outputLabel: "URL-encoded output",
    inputPlaceholder: "hello world & more",
    reverseToolId: "url-decode",
    reversePath: "/developer-tools/url-decode/",
    reverseLabel: "URL Decoder",
    transform: encodeUrl,
  },
  "url-decode": {
    inputLabel: "URL-encoded text",
    outputLabel: "Decoded text",
    inputPlaceholder: "hello%20world",
    reverseToolId: "url-encode",
    reversePath: "/developer-tools/url-encode/",
    reverseLabel: "URL Encoder",
    transform: decodeUrl,
  },
  "html-encode": {
    inputLabel: "HTML to escape",
    outputLabel: "Encoded HTML entities",
    inputPlaceholder: '<div class="note">Price & value</div>',
    transform: encodeHtmlEntities,
  },
};
