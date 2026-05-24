/**
 * Builds ICO files from PNG image data.
 * Modern ICO format (Vista+) embeds PNG data directly.
 */

type IcoImageEntry = {
  width: number;
  height: number;
  pngData: Uint8Array;
};

const toIcoDimensionByte = (size: number): number => (size >= 256 ? 0 : size);

export const buildIcoFromPngEntries = (entries: IcoImageEntry[]): Blob => {
  if (entries.length === 0) {
    throw new Error("At least one image entry is required.");
  }

  const headerSize = 6;
  const directorySize = entries.length * 16;
  let dataOffset = headerSize + directorySize;

  const header = new Uint8Array(headerSize);
  const view = new DataView(header.buffer);
  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, entries.length, true);

  const directory = new Uint8Array(directorySize);
  const directoryView = new DataView(directory.buffer);
  const imageChunks: Uint8Array[] = [];

  entries.forEach((entry, index) => {
    const offset = index * 16;
    directoryView.setUint8(offset, toIcoDimensionByte(entry.width));
    directoryView.setUint8(offset + 1, toIcoDimensionByte(entry.height));
    directoryView.setUint8(offset + 2, 0);
    directoryView.setUint8(offset + 3, 0);
    directoryView.setUint16(offset + 4, 1, true);
    directoryView.setUint16(offset + 6, 32, true);
    directoryView.setUint32(offset + 8, entry.pngData.byteLength, true);
    directoryView.setUint32(offset + 12, dataOffset, true);
    dataOffset += entry.pngData.byteLength;
    imageChunks.push(entry.pngData);
  });

  const totalSize =
    header.byteLength + directory.byteLength + imageChunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
  const icoBytes = new Uint8Array(totalSize);
  icoBytes.set(header, 0);
  icoBytes.set(directory, header.byteLength);

  let writeOffset = header.byteLength + directory.byteLength;
  for (const chunk of imageChunks) {
    icoBytes.set(chunk, writeOffset);
    writeOffset += chunk.byteLength;
  }

  return new Blob([icoBytes], { type: "image/x-icon" });
};

export const pngBlobToUint8Array = async (blob: Blob): Promise<Uint8Array> => {
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
};
