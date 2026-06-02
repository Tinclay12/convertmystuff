import Link from "next/link";
import type { StartHereIntent } from "@/lib/content/linking/site-workflows";
import { cn } from "@/lib/utils/cn";

type StartHereCardsProps = {
  intents: StartHereIntent[];
  className?: string;
};

export const StartHereCards = ({ intents, className }: StartHereCardsProps) => {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {intents.map((intent) => (
        <Link
          key={intent.id}
          href={intent.href}
          className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <span className="text-sm font-semibold text-foreground">{intent.label}</span>
          <p className="mt-1 text-sm text-muted">{intent.description}</p>
        </Link>
      ))}
    </div>
  );
};
