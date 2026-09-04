type FaviconChromePreviewsProps = {
  previewUrl: string;
};

const Icon = ({ src, size, alt }: { src: string; size: number; alt: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} width={size} height={size} className="shrink-0 object-cover" />
);

export const FaviconChromePreviews = ({ previewUrl }: FaviconChromePreviewsProps) => {
  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm font-medium text-foreground">How it will look</p>
      <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Favicon previews in browser, iOS, and Windows">
        <figure className="rounded-xl border border-border bg-background-subtle p-3">
          <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Browser tab
          </figcaption>
          <div className="flex items-end gap-1">
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-t-lg border border-b-0 border-border bg-card px-2 py-1.5">
              <Icon src={previewUrl} size={16} alt="" />
              <span className="truncate text-xs text-foreground">Your site</span>
            </div>
            <div className="h-6 w-8 rounded-t-lg border border-b-0 border-border bg-muted/40" aria-hidden />
          </div>
          <div className="h-6 rounded-b-lg border border-border bg-card" aria-hidden />
        </figure>

        <figure className="rounded-xl border border-border bg-background-subtle p-3">
          <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            iOS home screen
          </figcaption>
          <div className="flex flex-col items-center gap-1.5">
            <div className="overflow-hidden rounded-[22%] bg-card shadow-sm">
              <Icon src={previewUrl} size={56} alt="iOS home screen icon preview" />
            </div>
            <span className="text-[11px] text-foreground">App</span>
          </div>
        </figure>

        <figure className="rounded-xl border border-border bg-background-subtle p-3">
          <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Windows shortcut
          </figcaption>
          <div className="flex flex-col items-center gap-1.5">
            <div className="rounded-lg border border-border bg-card p-2">
              <Icon src={previewUrl} size={32} alt="Windows shortcut icon preview" />
            </div>
            <span className="text-[11px] text-foreground underline decoration-dotted">Shortcut</span>
          </div>
        </figure>
      </div>
    </div>
  );
};
