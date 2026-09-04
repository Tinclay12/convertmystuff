import JSZip from "jszip";
import { buildIcoFromPngEntries, extractPngFramesFromIco, pngBlobToUint8Array } from "./ico-encoder";

export type FaviconBackground = "transparent" | "white" | "dark";

export type ImageProcessResult =
  | {
      ok: true;
      blob: Blob;
      filename: string;
      previewUrl?: string;
      mimeType?: string;
      htmlSnippet?: string;
    }
  | { ok: false; error: string };

export type ImageToolOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: "png" | "jpeg" | "webp";
  sizes?: number[];
  cropSquare?: boolean;
  background?: FaviconBackground;
};

const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image."));
    };
    image.src = url;
  });
};

export const normalizeImageFile = async (file: File): Promise<File> => {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.heic$/i.test(file.name) ||
    /\.heif$/i.test(file.name);

  if (!isHeic) {
    return file;
  }

  const heic2any = (await import("heic2any")).default;
  const converted = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });

  const blob = Array.isArray(converted) ? converted[0] : converted;
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
};

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not export image."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
};

const FAVICON_BACKGROUND_FILL: Record<Exclude<FaviconBackground, "transparent">, string> = {
  white: "#ffffff",
  dark: "#111827",
};

const drawToCanvas = (
  image: HTMLImageElement,
  width: number,
  height: number,
  cropSquare = false,
  background: FaviconBackground = "transparent",
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not supported.");
  }

  if (background !== "transparent") {
    context.fillStyle = FAVICON_BACKGROUND_FILL[background];
    context.fillRect(0, 0, width, height);
  }

  if (!cropSquare) {
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  }

  const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
  const sourceX = (image.naturalWidth - sourceSize) / 2;
  const sourceY = (image.naturalHeight - sourceSize) / 2;
  context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, width, height);
  return canvas;
};

export const FAVICON_PNG_SIZES = [16, 32, 48, 64, 128, 192, 256, 512] as const;
export const FAVICON_ICO_SIZES = [16, 32, 48, 64, 256] as const;

export const FAVICON_HTML_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`;

export const FAVICON_ZIP_CONTENTS = [
  "favicon.ico (16, 32, 48, 64, 256 px)",
  "PNG sizes 16–512 px",
  "apple-touch-icon.png (180×180)",
  "android-chrome-192x192.png and android-chrome-512x512.png",
  "site.webmanifest",
  "favicon-html.txt with copy-ready link tags",
] as const;

export const buildSiteWebmanifest = (name = "App"): string =>
  `${JSON.stringify(
    {
      name,
      short_name: name,
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
    },
    null,
    2,
  )}\n`;

export const convertImageFormat = async (
  file: File,
  options: ImageToolOptions,
): Promise<ImageProcessResult> => {
  try {
    const normalized = await normalizeImageFile(file);
    const image = await loadImageFromFile(normalized);
    const width = options.width ?? image.naturalWidth;
    const height = options.height ?? image.naturalHeight;
    const canvas = drawToCanvas(image, width, height);
    const format = options.format ?? "png";
    const mime = format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
    const extension = format === "jpeg" ? "jpg" : format;
    const blob = await canvasToBlob(canvas, mime, options.quality ?? 0.92);
    const baseName = file.name.replace(/\.[^.]+$/, "");

    return {
      ok: true,
      blob,
      filename: `${baseName}.${extension}`,
      previewUrl: URL.createObjectURL(blob),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Image conversion failed.",
    };
  }
};

export const resizeImage = async (
  file: File,
  options: ImageToolOptions,
): Promise<ImageProcessResult> => {
  if (!options.width || !options.height) {
    return { ok: false, error: "Enter width and height." };
  }

  return convertImageFormat(file, options);
};

export const compressImage = async (
  file: File,
  options: ImageToolOptions,
): Promise<ImageProcessResult> => {
  if (!options.quality) {
    return { ok: false, error: "Enter a quality value between 0.1 and 1." };
  }

  return convertImageFormat(file, {
    format: "jpeg",
    quality: options.quality,
  });
};

const renderPngAtSize = async (
  image: HTMLImageElement,
  size: number,
  cropSquare = false,
  background: FaviconBackground = "transparent",
): Promise<{ name: string; blob: Blob; pngData: Uint8Array }> => {
  const canvas = drawToCanvas(image, size, size, cropSquare, background);
  const blob = await canvasToBlob(canvas, "image/png");
  const pngData = await pngBlobToUint8Array(blob);
  return { name: `favicon-${size}x${size}.png`, blob, pngData };
};

export const convertPngToIco = async (
  file: File,
  options: ImageToolOptions = {},
): Promise<ImageProcessResult> => {
  try {
    const normalized = await normalizeImageFile(file);
    const image = await loadImageFromFile(normalized);
    const sizes = options.sizes ?? [...FAVICON_ICO_SIZES];
    const cropSquare = options.cropSquare ?? true;
    const background = options.background ?? "transparent";
    const entries = await Promise.all(
      sizes.map(async (size) => {
        const rendered = await renderPngAtSize(image, size, cropSquare, background);
        return { width: size, height: size, pngData: rendered.pngData };
      }),
    );

    const icoBlob = buildIcoFromPngEntries(entries);
    const preview32 = await renderPngAtSize(image, 32, cropSquare, background);
    const baseName = file.name.replace(/\.[^.]+$/, "");

    return {
      ok: true,
      blob: icoBlob,
      filename: `${baseName}.ico`,
      mimeType: "image/x-icon",
      previewUrl: URL.createObjectURL(preview32.blob),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "ICO conversion failed.",
    };
  }
};

export const generateFaviconZip = async (
  file: File,
  options: ImageToolOptions = {},
): Promise<ImageProcessResult> => {
  const sizes = options.sizes ?? [...FAVICON_PNG_SIZES];
  const cropSquare = options.cropSquare ?? true;
  const background = options.background ?? "transparent";
  try {
    const normalized = await normalizeImageFile(file);
    const image = await loadImageFromFile(normalized);
    const pngEntries = await Promise.all(
      sizes.map((size) => renderPngAtSize(image, size, cropSquare, background)),
    );
    const appleTouch = await renderPngAtSize(image, 180, cropSquare, background);
    const icoSizeSet = new Set<number>(FAVICON_ICO_SIZES);
    const icoEntries = pngEntries.flatMap((entry) => {
      const sizeMatch = entry.name.match(/(\d+)x/);
      const size = sizeMatch ? Number(sizeMatch[1]) : 32;
      if (!icoSizeSet.has(size)) {
        return [];
      }
      return [{ width: size, height: size, pngData: entry.pngData }];
    });
    const icoSource = icoEntries.length > 0
      ? icoEntries
      : pngEntries.map((entry) => {
          const sizeMatch = entry.name.match(/(\d+)x/);
          const size = sizeMatch ? Number(sizeMatch[1]) : 32;
          return { width: size, height: size, pngData: entry.pngData };
        });

    const icoBlob = buildIcoFromPngEntries(icoSource);
    const png32 = pngEntries.find((entry) => entry.name.includes("32x32")) ?? pngEntries[0];
    const png192 = pngEntries.find((entry) => entry.name.includes("192x192"));
    const png512 = pngEntries.find((entry) => entry.name.includes("512x512"));
    const zip = new JSZip();
    pngEntries.forEach((entry) => {
      zip.file(entry.name, entry.blob);
    });
    zip.file("favicon-32x32.png", png32?.blob);
    zip.file("apple-touch-icon.png", appleTouch.blob);
    if (png192) {
      zip.file("android-chrome-192x192.png", png192.blob);
    }
    if (png512) {
      zip.file("android-chrome-512x512.png", png512.blob);
    }
    zip.file("favicon.ico", icoBlob);
    zip.file("site.webmanifest", buildSiteWebmanifest());
    zip.file("favicon-html.txt", FAVICON_HTML_SNIPPET);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const baseName = file.name.replace(/\.[^.]+$/, "");

    return {
      ok: true,
      blob: zipBlob,
      filename: `${baseName}-favicons.zip`,
      mimeType: "application/zip",
      previewUrl: png32 ? URL.createObjectURL(png32.blob) : undefined,
      htmlSnippet: FAVICON_HTML_SNIPPET,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Favicon generation failed.",
    };
  }
};

export const convertIcoToPng = async (file: File): Promise<ImageProcessResult> => {
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const frames = extractPngFramesFromIco(bytes);
    const baseName = file.name.replace(/\.[^.]+$/, "");

    if (frames.length === 0) {
      const fallback = await loadImageFromFile(file);
      const canvas = drawToCanvas(fallback, fallback.naturalWidth || 32, fallback.naturalHeight || 32);
      const blob = await canvasToBlob(canvas, "image/png");
      return {
        ok: true,
        blob,
        filename: `${baseName}.png`,
        mimeType: "image/png",
        previewUrl: URL.createObjectURL(blob),
      };
    }

    if (frames.length === 1) {
      const frame = frames[0]!;
      return {
        ok: true,
        blob: frame.blob,
        filename: `${baseName}-${frame.width}x${frame.height}.png`,
        mimeType: "image/png",
        previewUrl: URL.createObjectURL(frame.blob),
      };
    }

    const zip = new JSZip();
    frames.forEach((frame, index) => {
      zip.file(`${baseName}-${frame.width}x${frame.height}-${index + 1}.png`, frame.blob);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });
    return {
      ok: true,
      blob: zipBlob,
      filename: `${baseName}-png-frames.zip`,
      mimeType: "application/zip",
      previewUrl: URL.createObjectURL(frames[0]!.blob),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "ICO to PNG conversion failed.",
    };
  }
};

export type ImageToolConfig = {
  label: string;
  accept: string;
  showDimensions?: boolean;
  showQuality?: boolean;
  showCrop?: boolean;
  showBackground?: boolean;
  process: (file: File, options: ImageToolOptions) => Promise<ImageProcessResult>;
  defaultFormat?: ImageToolOptions["format"];
};

export const imageToolConfigs: Record<string, ImageToolConfig> = {
  "png-to-jpg": {
    label: "PNG file",
    accept: "image/png,.png,image/heic,.heic,image/heif,.heif",
    process: (file) => convertImageFormat(file, { format: "jpeg", quality: 0.92 }),
    defaultFormat: "jpeg",
  },
  "jpg-to-png": {
    label: "JPG file",
    accept: "image/jpeg,.jpg,.jpeg",
    process: (file) => convertImageFormat(file, { format: "png" }),
    defaultFormat: "png",
  },
  "png-to-ico": {
    label: "PNG, JPG, or WebP file",
    accept: "image/png,.png,image/jpeg,.jpg,.jpeg,image/webp,.webp",
    showCrop: true,
    process: (file, options) => convertPngToIco(file, options),
  },
  "svg-to-png": {
    label: "SVG file",
    accept: "image/svg+xml,.svg",
    showDimensions: true,
    process: (file, options) =>
      convertImageFormat(file, {
        format: "png",
        width: options.width ?? 512,
        height: options.height ?? 512,
      }),
  },
  "image-resizer": {
    label: "Image file",
    accept: "image/*,.heic,.heif",
    showDimensions: true,
    process: resizeImage,
  },
  "image-compressor": {
    label: "Image file",
    accept: "image/*,.heic,.heif",
    showQuality: true,
    process: compressImage,
  },
  "favicon-generator": {
    label: "Source image",
    accept: "image/png,.png,image/jpeg,.jpg,.jpeg,image/webp,.webp,image/*,.heic,.heif",
    showCrop: true,
    showBackground: true,
    process: (file, options) => generateFaviconZip(file, options),
  },
  "ico-to-png": {
    label: "ICO file",
    accept: "image/x-icon,.ico,image/vnd.microsoft.icon",
    process: convertIcoToPng,
  },
};
