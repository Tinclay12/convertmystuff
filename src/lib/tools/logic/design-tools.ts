import type { LogicResult } from "./unit-conversions";
import { formatNumber } from "./unit-conversions";

type DesignInput = Record<string, number | string>;

const parseHex = (hex: string): { r: number; g: number; b: number } | null => {
  const cleaned = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(cleaned)) {
    return null;
  }

  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => char + char)
          .join("")
      : cleaned;

  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
};

const rgbToHsl = (r: number, g: number, b: number) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const relativeLuminance = (r: number, g: number, b: number) => {
  const transform = (value: number) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
};

export const convertColor = (values: DesignInput): LogicResult => {
  const hex = String(values.hex ?? "");
  const rgb = parseHex(hex);
  if (!rgb) {
    return { ok: false, error: "Enter a valid hex color such as #336699." };
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return {
    ok: true,
    output: `RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})\nHSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    meta: { r: rgb.r, g: rgb.g, b: rgb.b },
  };
};

export const checkContrast = (values: DesignInput): LogicResult => {
  const foreground = parseHex(String(values.foreground ?? ""));
  const background = parseHex(String(values.background ?? ""));

  if (!foreground || !background) {
    return { ok: false, error: "Enter valid hex colors for foreground and background." };
  }

  const l1 = relativeLuminance(foreground.r, foreground.g, foreground.b);
  const l2 = relativeLuminance(background.r, background.g, background.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3;

  return {
    ok: true,
    output: `Contrast ratio: ${formatNumber(ratio, 2)}:1\nWCAG AA normal text: ${aaNormal ? "Pass" : "Fail"}\nWCAG AA large text: ${aaLarge ? "Pass" : "Fail"}`,
    meta: { ratio },
  };
};

export const generateGradient = (values: DesignInput): LogicResult => {
  const start = String(values.startColor ?? "").trim();
  const end = String(values.endColor ?? "").trim();
  const angle = Number(values.angle ?? 90);

  if (!parseHex(start) || !parseHex(end)) {
    return { ok: false, error: "Enter valid hex colors for both gradient stops." };
  }
  if (!Number.isFinite(angle)) {
    return { ok: false, error: "Enter a valid angle in degrees." };
  }

  const css = `background: linear-gradient(${angle}deg, ${start.startsWith("#") ? start : `#${start}`}, ${end.startsWith("#") ? end : `#${end}`});`;
  return { ok: true, output: css };
};

export const generateSpacingScale = (values: DesignInput): LogicResult => {
  const base = Number(values.base);
  const steps = Number(values.steps);

  if (!Number.isFinite(base) || base <= 0) {
    return { ok: false, error: "Enter a valid base spacing value." };
  }
  if (!Number.isFinite(steps) || steps < 1 || steps > 12) {
    return { ok: false, error: "Enter steps between 1 and 12." };
  }

  const lines = Array.from({ length: steps }, (_, index) => {
    const multiplier = index + 1;
    const value = base * multiplier;
    return `${multiplier}: ${formatNumber(value, 2)}px`;
  });

  return { ok: true, output: lines.join("\n") };
};

export const remToPx = (values: DesignInput): LogicResult => {
  const rem = Number(values.rem);
  const base = Number(values.baseFontSize ?? 16);

  if (!Number.isFinite(rem) || rem < 0) {
    return { ok: false, error: "Enter a valid rem value." };
  }
  if (!Number.isFinite(base) || base <= 0) {
    return { ok: false, error: "Enter a valid base font size." };
  }

  const px = rem * base;
  return { ok: true, output: `${formatNumber(px, 4)} px`, meta: { px } };
};

export const pxToRem = (values: DesignInput): LogicResult => {
  const px = Number(values.px);
  const base = Number(values.baseFontSize ?? 16);

  if (!Number.isFinite(px) || px < 0) {
    return { ok: false, error: "Enter a valid px value." };
  }
  if (!Number.isFinite(base) || base <= 0) {
    return { ok: false, error: "Enter a valid base font size." };
  }

  const rem = px / base;
  return { ok: true, output: `${formatNumber(rem, 4)} rem`, meta: { rem } };
};

export const calculateDpi = (values: DesignInput): LogicResult => {
  const widthPx = Number(values.widthPx);
  const heightPx = Number(values.heightPx);
  const widthIn = Number(values.widthIn);
  const heightIn = Number(values.heightIn);

  if (
    !Number.isFinite(widthPx) ||
    !Number.isFinite(heightPx) ||
    !Number.isFinite(widthIn) ||
    !Number.isFinite(heightIn) ||
    widthPx <= 0 ||
    heightPx <= 0 ||
    widthIn <= 0 ||
    heightIn <= 0
  ) {
    return { ok: false, error: "Enter valid pixel and print dimensions." };
  }

  const dpiX = widthPx / widthIn;
  const dpiY = heightPx / heightIn;
  return {
    ok: true,
    output: `DPI (width): ${formatNumber(dpiX, 1)}\nDPI (height): ${formatNumber(dpiY, 1)}`,
    meta: { dpiX, dpiY },
  };
};

export type DesignField = {
  key: string;
  label: string;
  placeholder: string;
  type?: "text" | "number";
  step?: string;
};

export type DesignToolConfig = {
  fields: DesignField[];
  calculate: (values: DesignInput) => LogicResult;
  preview?: "gradient" | "contrast";
};

export const designToolConfigs: Record<string, DesignToolConfig> = {
  "color-converter": {
    fields: [{ key: "hex", label: "Hex color", placeholder: "#336699", type: "text" }],
    calculate: convertColor,
  },
  "contrast-checker": {
    fields: [
      { key: "foreground", label: "Foreground hex", placeholder: "#111111", type: "text" },
      { key: "background", label: "Background hex", placeholder: "#ffffff", type: "text" },
    ],
    calculate: checkContrast,
    preview: "contrast",
  },
  "gradient-generator": {
    fields: [
      { key: "startColor", label: "Start color", placeholder: "#3b82f6", type: "text" },
      { key: "endColor", label: "End color", placeholder: "#8b5cf6", type: "text" },
      { key: "angle", label: "Angle (degrees)", placeholder: "90", type: "number" },
    ],
    calculate: generateGradient,
    preview: "gradient",
  },
  "spacing-scale-generator": {
    fields: [
      { key: "base", label: "Base spacing (px)", placeholder: "4", type: "number" },
      { key: "steps", label: "Steps", placeholder: "8", type: "number" },
    ],
    calculate: generateSpacingScale,
  },
  "rem-to-px": {
    fields: [
      { key: "rem", label: "REM value", placeholder: "1.5", type: "number", step: "0.01" },
      { key: "baseFontSize", label: "Base font size (px)", placeholder: "16", type: "number" },
    ],
    calculate: remToPx,
  },
  "px-to-rem": {
    fields: [
      { key: "px", label: "PX value", placeholder: "24", type: "number", step: "0.01" },
      { key: "baseFontSize", label: "Base font size (px)", placeholder: "16", type: "number" },
    ],
    calculate: pxToRem,
  },
  "dpi-calculator": {
    fields: [
      { key: "widthPx", label: "Image width (px)", placeholder: "3000", type: "number" },
      { key: "heightPx", label: "Image height (px)", placeholder: "2000", type: "number" },
      { key: "widthIn", label: "Print width (in)", placeholder: "10", type: "number", step: "0.01" },
      { key: "heightIn", label: "Print height (in)", placeholder: "6.67", type: "number", step: "0.01" },
    ],
    calculate: calculateDpi,
  },
};
