type OpenGraphPreviewCardProps = {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
};

const getHostname = (url: string): string => {
  if (!url.trim()) {
    return "example.com";
  }

  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
  } catch {
    return url.trim();
  }
};

export const OpenGraphPreviewCard = ({
  title,
  description,
  url,
  imageUrl,
}: OpenGraphPreviewCardProps) => {
  const displayTitle = title.trim() || "Page title preview";
  const displayDescription =
    description.trim() || "Description preview for social sharing cards.";
  const hostname = getHostname(url);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-muted/40 px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted">
        Social share preview
      </div>
      <div className="aspect-[1.91/1] w-full bg-muted">
        {imageUrl.trim() ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl.trim()}
            alt=""
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
            Add an image URL to preview the og:image area
          </div>
        )}
      </div>
      <div className="space-y-1 px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-muted">{hostname}</p>
        <p className="line-clamp-2 text-base font-semibold text-foreground">{displayTitle}</p>
        <p className="line-clamp-2 text-sm text-muted">{displayDescription}</p>
      </div>
    </div>
  );
};
