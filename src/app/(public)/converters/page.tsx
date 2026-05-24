import { ConvertersHubPageClient } from "@/components/pages/ConvertersHubPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Converters - Convert Data, Units, Files & Text | ConvertMyStuff",
  description:
    "Browse free online converters for JSON, CSV, YAML, TOML, XML, units, images, PDFs, and more. Fast, private, browser-based tools with no login.",
};

export default function ConvertersHubPage() {
  return <ConvertersHubPageClient />;
}
