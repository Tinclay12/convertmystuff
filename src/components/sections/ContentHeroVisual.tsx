import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type ContentHeroKind = "guide" | "resource";

type ContentHeroVisualProps = {
  kind: ContentHeroKind;
  categorySlug?: string;
  compact?: boolean;
  className?: string;
};

export const ContentHeroVisual = ({
  kind,
  compact = false,
  className,
}: ContentHeroVisualProps) => {
  const imageSrc =
    kind === "guide" ? "/images/hero-guides.webp" : "/images/hero-resources.webp";

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl",
        compact && "min-h-[10rem]",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(min-width: 1280px) 380px, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-card/30 via-transparent to-transparent"
      />
    </div>
  );
};
