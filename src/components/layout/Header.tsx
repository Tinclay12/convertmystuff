import Link from "next/link";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { HeaderSearch } from "@/components/layout/HeaderSearch";
import { MobileNav } from "@/components/layout/MobileNav";
import type { SerializableTool } from "@/components/tools/ToolSearch";
import { getAllCategories, getAllTools, isCategoryVisible } from "@/lib/tools/access";

export const Header = () => {
  const categories = getAllCategories().filter((category) =>
    isCategoryVisible(category.slug),
  );
  const searchableTools: SerializableTool[] = getAllTools()
    .filter((tool) => tool.status === "published" || tool.status === "planned" || tool.status === "stub")
    .map((tool) => ({
      id: tool.id,
      title: tool.title,
      shortDescription: tool.shortDescription,
      path: tool.path,
      category: tool.category,
      status: tool.status,
      keywords: tool.keywords,
    }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/85 backdrop-blur-md backdrop-saturate-150">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        <Link
          href="/"
          aria-label="ConvertMyStuff home"
          className="group inline-flex shrink-0 items-center gap-2"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-card transition-transform group-hover:scale-105"
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

        <HeaderSearch tools={searchableTools} className="flex-1" />
        <HeaderSearch tools={searchableTools} compact />

        <DesktopNav categories={categories} />
        <MobileNav categories={categories} />
      </div>
    </header>
  );
};
