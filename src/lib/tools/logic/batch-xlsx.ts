/** Inline string cells preserve IDs and never execute spreadsheet formulas. */
export async function batchXlsx(table: string[][]): Promise<Blob> {
  if (table.length > 1048576 || table.some(r => r.length > 16384 || r.some(v => v.length > 32767))) {
    throw new Error("This table exceeds Excel's row, column or 32,767-character cell limit. Download CSV instead.");
  }
  if (table.some(r => r.some(v => /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(v)))) throw new Error("Excel cannot preserve control characters in this data. Download CSV instead.");
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const xml = (value: string) => value.replace(/_x[0-9a-f]{4}_/gi, match => "_x005F_" + match.slice(1)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\r/g, "&#13;");
  const col = (index: number): string => { let s = ""; for (let n = index + 1; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + (n - 1) % 26) + s; return s; };
  const declaration = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  zip.file("[Content_Types].xml", declaration + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>');
  zip.file("_rels/.rels", declaration + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
  zip.file("xl/workbook.xml", declaration + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Batch results" sheetId="1" r:id="rId1"/></sheets></workbook>');
  zip.file("xl/_rels/workbook.xml.rels", declaration + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>');
  zip.file("xl/worksheets/sheet1.xml", declaration + '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" state="frozen"/></sheetView></sheetViews><sheetData>' + table.map((row, i) => `<row r="${i + 1}">` + row.map((v, j) => `<c r="${col(j)}${i + 1}" t="inlineStr"><is><t xml:space="preserve">${xml(v)}</t></is></c>`).join("") + "</row>").join("") + `</sheetData><autoFilter ref="A1:${col(table[0].length - 1)}${table.length}"/></worksheet>`);
  return zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", compression: "DEFLATE" });
}
