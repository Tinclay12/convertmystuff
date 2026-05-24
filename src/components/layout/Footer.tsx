import Link from "next/link";
import {
  getAllCategories,
  getCategoryStats,
  getRegistryStats,
  isCategoryVisible,
} from "@/lib/tools/access";
import { getCategoryAccent } from "@/lib/theme/category-theme";

export const Footer = () => {
  const categories = getAllCategories().filter((category) =>
    isCategoryVisible(category.slug),
  );
  const stats = getRegistryStats();

  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="ConvertMyStuff home"
              className="inline-flex items-center gap-2"
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-card"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M4 7L10 4M10 4L16 7M10 4V20M20 17L14 20M14 20L8 17M14 20V4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
                ConvertMy<span className="text-accent">Stuff</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Free online converters and calculators. Fast, browser-based, no account required.
            </p>
            <p className="mt-4 text-xs text-muted">
              <span className="font-semibold tabular-nums text-foreground">{stats.live}</span> live
              tools · <span className="font-semibold tabular-nums text-foreground">{stats.total}</span>{" "}
              total
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Categories</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {categories.map((category) => {
                const categoryStats = getCategoryStats(category.slug);
                const accentSlug = category.accentSlug ?? category.slug;
                const accent = getCategoryAccent(accentSlug);
                return (
                  <li key={category.id}>
                    <Link
                      href={category.path}
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: accent.accent }}
                        aria-hidden="true"
                      />
                      {category.title}
                      <span className="text-xs tabular-nums text-muted opacity-70">
                        {categoryStats.total}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Site</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/tools/" className="text-muted transition-colors hover:text-foreground">
                  All tools
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} ConvertMyStuff. Estimates and conversions are for
            informational use only.
          </p>
          <p className="text-muted/70">
            Built with care · {process.env.NEXT_PUBLIC_ANALYTICS_ID ? "Privacy-friendly analytics" : "No tracking"} · No login required
          </p>
        </div>
      </div>
    </footer>
  );
};
