# File Upload UX Pattern — Client-Side Flagships

**Status:** Implemented  
**Components:** [`FileDropZone.tsx`](../../src/components/tools/FileDropZone.tsx), [`FileListPreview.tsx`](../../src/components/tools/FileListPreview.tsx)

---

## Purpose

Provide a consistent, accessible, privacy-first file UX for PDF and image flagship tools. All processing stays in the browser—no server upload.

---

## When to Use

| Use FileDropZone | Use textarea/paste instead |
|------------------|----------------------------|
| PDF merge, split, compress | Markdown/HTML conversion |
| Image format convert, resize | JSON, CSV, YAML text |
| CSV file import | Small text snippets |
| HEIC to JPG | |

---

## FileDropZone API

```tsx
<FileDropZone
  accept="application/pdf,.pdf"       // MIME + extensions
  multiple={true}                      // multi-file tools (merge)
  maxFiles={20}                        // cap for merge
  maxSizeBytes={50 * 1024 * 1024}     // 50 MB default
  reorderable={true}                   // PDF merge page order
  label="Select PDF files to merge"
  description="Processed locally in your browser."
  files={files}
  onFilesChange={setFiles}
  disabled={isProcessing}
/>
```

### Features

- Drag-and-drop + click to browse
- Keyboard accessible (Enter/Space on drop zone)
- File list with name, size, remove
- Optional reorder (↑/↓) for merge workflows
- Client-side size validation with error message
- Screen-reader labels on all actions

---

## FileListPreview API

Used internally by FileDropZone; can be used standalone for custom flows:

```tsx
<FileListPreview
  items={previewItems}  // { file, id }[]
  onRemove={(id) => ...}
  onReorder={(from, to) => ...}  // optional
  showSize={true}
/>
```

---

## Integration Checklist (new file-based flagship)

1. Add `FileDropZone` to tool component
2. Process files with existing logic module (e.g. `pdf-lib`, canvas)
3. Fire `trackFlagshipEvent("flagship_file_process", { tool_id, file_count, export_format })`
4. Show processing state (`disabled={isProcessing}`)
5. Download result via blob URL (revoke after click)
6. SEO copy: emphasize “no upload”, “private”, “browser-only”

---

## Current Adoption

| Tool | Status |
|------|--------|
| `pdf-merge` | ✅ Uses FileDropZone via GenericDocumentTool |
| `pdf-split` | ✅ Uses FileDropZone via GenericDocumentTool |
| `json-to-csv` | 🔲 Phase A3: add file drop |
| `csv-to-json` | 🔲 Phase A3: add file drop |
| Image tools | 🔲 Phase C: replace generic placeholders |

---

## Phase A4: PDF Merge & Split Pro Enhancements

Beyond current GenericDocumentTool adoption:

| Enhancement | Description |
|-------------|-------------|
| Page preview thumbnails | pdf-lib render first page (optional v1.1) |
| Split by range | "Pages 1-3, 5" instead of all pages |
| Merge progress | Step indicator for large files |
| Bespoke component | `PdfMergeSplitProTool` replacing generic shell |

---

## Image Tool Pattern (Phase C)

```tsx
<FileDropZone
  accept="image/png,image/jpeg,image/webp,image/heic,.heic"
  multiple={false}
  maxSizeBytes={25 * 1024 * 1024}
  label="Drop an image to convert"
  files={files}
  onFilesChange={setFiles}
/>
// Preview: <img src={URL.createObjectURL(files[0])} />
// Process: canvas.toBlob() or custom encoder
```

---

## Accessibility Requirements

- Drop zone: `role="button"`, `tabIndex={0}`, `aria-label`
- File input: `sr-only` (visually hidden, label associated)
- Remove/reorder buttons: `aria-label` with filename
- Errors: `role="alert"`
- Processing: `disabled` state + visible loading text on action button

---

## Security & Privacy Copy

Standard description string for all file tools:

> "Files are processed locally in your browser. Nothing is uploaded to a server."

Place in FileDropZone `description` prop and tool FAQ.

---

## Testing

- Unit tests for file validation logic (size limits) in tool logic modules
- Manual test: drag-drop, keyboard browse, remove, reorder (merge)
- Manual test: mobile file picker on iOS/Android
