"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { generateOpenGraphPreview } from "@/lib/tools/logic/marketing-tools";

export const SerpPreviewTool = () => {
  const [title, setTitle] = useState("Free JSON to CSV Converter");
  const [description, setDescription] = useState(
    "Convert JSON to CSV online in your browser. No upload required.",
  );
  const [url, setUrl] = useState("https://www.convertmystuff.com/developer-tools/json-to-csv/");
  const [imageUrl, setImageUrl] = useState("");

  const preview = useMemo(
    () =>
      generateOpenGraphPreview({
        title,
        description,
        url,
        imageUrl,
      }),
    [title, description, url, imageUrl],
  );

  const titleLength = title.length;
  const descriptionLength = description.length;

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Page metadata">
        <Input label="Page title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="mt-4">
          <Textarea
            label="Meta description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <p className="mt-1 text-xs text-muted tabular-nums">{descriptionLength} characters</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input label="Page URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Input label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
      </ToolInputPanel>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-4" aria-label="Google search preview">
          <p className="text-xs text-muted mb-2">Search snippet preview</p>
          <p className="text-sm text-[#202124] truncate">{url.replace(/^https?:\/\//, "")}</p>
          <h3
            className={`mt-1 font-medium text-[#1a0dab] line-clamp-2 ${titleLength > 60 ? "text-amber-700" : ""}`}
          >
            {title || "Page title"}
          </h3>
          <p
            className={`mt-1 text-sm text-[#4d5156] line-clamp-2 ${descriptionLength > 160 ? "text-amber-800" : ""}`}
          >
            {description || "Meta description"}
          </p>
          <p className="mt-2 text-xs text-muted tabular-nums">Title: {titleLength} chars</p>
        </article>
        <article className="rounded-xl border border-border bg-card overflow-hidden" aria-label="Social card preview">
          <p className="px-4 pt-4 text-xs text-muted">Social / Open Graph card</p>
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="mt-2 aspect-[1.91/1] w-full object-cover bg-muted" />
          ) : (
            <div className="mt-2 aspect-[1.91/1] w-full bg-muted flex items-center justify-center text-sm text-muted">
              Add image URL for preview
            </div>
          )}
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted uppercase truncate">{url.replace(/^https?:\/\/([^/]+).*/, "$1")}</p>
            <p className="mt-1 font-semibold text-foreground line-clamp-2">{title}</p>
            <p className="mt-1 text-sm text-muted line-clamp-2">{description}</p>
          </div>
        </article>
      </div>
      {preview.ok && (
        <ToolOutputPanel>
          <pre className="whitespace-pre-wrap text-sm text-muted">{preview.output}</pre>
        </ToolOutputPanel>
      )}
    </div>
  );
};
