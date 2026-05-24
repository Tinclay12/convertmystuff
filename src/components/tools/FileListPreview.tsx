"use client";

export type FileListPreviewItem = {
  file: File;
  id: string;
};

type FileListPreviewProps = {
  items: FileListPreviewItem[];
  onRemove?: (id: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  showSize?: boolean;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FileListPreview = ({
  items,
  onRemove,
  onReorder,
  showSize = true,
}: FileListPreviewProps) => {
  if (items.length === 0) {
    return null;
  }

  const handleMoveUp = (index: number) => {
    if (!onReorder || index === 0) {
      return;
    }
    onReorder(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (!onReorder || index >= items.length - 1) {
      return;
    }
    onReorder(index, index + 1);
  };

  return (
    <ul className="mt-3 space-y-2" aria-label="Selected files">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">{item.file.name}</p>
            {showSize && (
              <p className="text-xs text-muted">{formatFileSize(item.file.size)}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {onReorder && items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-muted disabled:opacity-40"
                  aria-label={`Move ${item.file.name} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === items.length - 1}
                  className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:bg-muted disabled:opacity-40"
                  aria-label={`Move ${item.file.name} down`}
                >
                  ↓
                </button>
              </>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="rounded-md px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive-bg"
                aria-label={`Remove ${item.file.name}`}
              >
                Remove
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
