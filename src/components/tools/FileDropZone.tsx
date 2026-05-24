"use client";

import { useCallback, useId, useRef, useState } from "react";
import { FileListPreview, type FileListPreviewItem } from "@/components/tools/FileListPreview";
import { DEFAULT_TOOL_LIMITS } from "@/lib/limits";

type FileDropZoneProps = {
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeBytes?: number;
  label: string;
  description?: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
  reorderable?: boolean;
};

const createFileId = (file: File, index: number): string => {
  return `${file.name}-${file.size}-${file.lastModified}-${index}`;
};

export const FileDropZone = ({
  accept,
  multiple = false,
  maxFiles = multiple ? 20 : 1,
  maxSizeBytes = DEFAULT_TOOL_LIMITS.maxFileSizeMB * 1024 * 1024,
  label,
  description,
  files,
  onFilesChange,
  disabled = false,
  reorderable = false,
}: FileDropZoneProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const validateAndMerge = useCallback(
    (incoming: File[]): File[] => {
      const accepted = incoming.filter((file) => {
        if (file.size > maxSizeBytes) {
          setError(`${file.name} exceeds the ${Math.round(maxSizeBytes / (1024 * 1024))} MB limit.`);
          return false;
        }
        return true;
      });

      if (accepted.length === 0) {
        return files;
      }

      setError("");
      const merged = multiple ? [...files, ...accepted] : accepted;
      return merged.slice(0, maxFiles);
    },
    [files, maxFiles, maxSizeBytes, multiple],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    onFilesChange(validateAndMerge(selected));
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) {
      return;
    }
    const dropped = Array.from(event.dataTransfer.files ?? []);
    onFilesChange(validateAndMerge(dropped));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (id: string) => {
    const previewItems: FileListPreviewItem[] = files.map((file, index) => ({
      file,
      id: createFileId(file, index),
    }));
    const next = previewItems.filter((item) => item.id !== id).map((item) => item.file);
    onFilesChange(next);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const next = [...files];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    onFilesChange(next);
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleBrowseKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBrowseClick();
    }
  };

  const previewItems: FileListPreviewItem[] = files.map((file, index) => ({
    file,
    id: createFileId(file, index),
  }));

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      {description && <p className="text-sm text-muted">{description}</p>}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-disabled={disabled}
        onClick={handleBrowseClick}
        onKeyDown={handleBrowseKeyDown}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/20 hover:border-primary/50"
        } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <p className="text-sm font-medium text-foreground">
          Drop {multiple ? "files" : "a file"} here or click to browse
        </p>
        <p className="mt-1 text-xs text-muted">
          {multiple ? `Up to ${maxFiles} files` : "Single file"} · Max{" "}
          {Math.round(maxSizeBytes / (1024 * 1024))} MB each · Processed locally in your browser
        </p>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
        />
      </div>
      <FileListPreview
        items={previewItems}
        onRemove={handleRemove}
        onReorder={reorderable ? handleReorder : undefined}
      />
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};
