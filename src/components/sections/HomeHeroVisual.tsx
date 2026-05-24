import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type HomeHeroVisualProps = {
  className?: string;
};

export const HomeHeroVisual = ({ className }: HomeHeroVisualProps) => {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src="/images/hero-home.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 460px, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/40"
      />
    </div>
  );
};
