import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested is unavailable or has not been published yet.",
  robots: { index: false, follow: true },
};

export default function PublicNotFound() {
  return (
    <div className="mx-auto max-w-xl py-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-muted">
        The page you requested is unavailable or has not been published yet.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button>Back to homepage</Button>
        </Link>
      </div>
    </div>
  );
}
