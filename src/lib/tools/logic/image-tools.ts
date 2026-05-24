import JSZip from "jszip";
import { buildIcoFromPngEntries, pngBlobToUint8Array } from "./ico-encoder";

export type ImageProcessResult =
  | {
      ok: true;
      blob: Blob;
      filename: string;
      previewUrl?: string;
      mimeType?: string;
    }
  | { ok: false; error: string };

export type ImageToolOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: "png" | "jpeg" | "webp";
  sizes?: number[];
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

const drawToCanvas = (
  image: HTMLImageElement,
  width: number,
  height: number,
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not supported.");
  }
  context.drawImage(image, 0, 0, width, height);
  return canvas;
};

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
): Promise<{ name: string; blob: Blob; pngData: Uint8Array }> => {
  const canvas = drawToCanvas(image, size, size);
  const blob = await canvasToBlob(canvas, "image/png");
  const pngData = await pngBlobToUint8Array(blob);
  return { name: `favicon-${size}x${size}.png`, blob, pngData };
};

export const convertPngToIco = async (file: File): Promise<ImageProcessResult> => {
  try {
    const normalized = await normalizeImageFile(file);
    const image = await loadImageFromFile(normalized);
    const sizes = [16, 32, 48];
    const entries = await Promise.all(
      sizes.map(async (size) => {
        const rendered = await renderPngAtSize(image, size);
        return { width: size, height: size, pngData: rendered.pngData };
      }),
    );

    const icoBlob = buildIcoFromPngEntries(entries);
    const preview32 = await renderPngAtSize(image, 32);
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

export const generateFaviconZip = async (file: File): Promise<ImageProcessResult> => {
  const sizes = [16, 32, 48, 64, 128, 256];
  try {
    const normalized = await normalizeImageFile(file);
    const image = await loadImageFromFile(normalized);
    const pngEntries = await Promise.all(sizes.map((size) => renderPngAtSize(image, size)));
    const icoEntries = pngEntries.map((entry) => {
      const sizeMatch = entry.name.match(/(\d+)x/);
      const size = sizeMatch ? Number(sizeMatch[1]) : 32;
      return { width: size, height: size, pngData: entry.pngData };
    });

    const icoBlob = buildIcoFromPngEntries(icoEntries);
    const zip = new JSZip();
    pngEntries.forEach((entry) => {
      zip.file(entry.name, entry.blob);
    });
    zip.file("favicon.ico", icoBlob);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const preview32 = pngEntries.find((entry) => entry.name.includes("32x32")) ?? pngEntries[0];
    const baseName = file.name.replace(/\.[^.]+$/, "");

    return {
      ok: true,
      blob: zipBlob,
      filename: `${baseName}-favicons.zip`,
      mimeType: "application/zip",
      previewUrl: URL.createObjectURL(preview32.blob),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Favicon generation failed.",
    };
  }
};

export type ImageToolConfig = {
  label: string;
  accept: string;
  showDimensions?: boolean;
  showQuality?: boolean;
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
    label: "PNG file",
    accept: "image/png,.png",
    process: convertPngToIco,
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
    accept: "image/*,.heic,.heif",
    process: generateFaviconZip,
  },
};
