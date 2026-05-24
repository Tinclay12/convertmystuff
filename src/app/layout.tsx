import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SITE_DESCRIPTION, SITE_NAME, getSiteUrl, toAbsoluteUrl } from "@/lib/seo/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const verification: NonNullable<Metadata["verification"]> = {};

if (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION) {
  verification.google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_YANDEX_VERIFICATION) {
  verification.yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_YAHOO_VERIFICATION) {
  verification.yahoo = process.env.NEXT_PUBLIC_YAHOO_VERIFICATION;
}
if (process.env.NEXT_PUBLIC_BING_VERIFICATION) {
  verification.other = { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION };
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  authors: [{ name: SITE_NAME, url: toAbsoluteUrl("/") }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: toAbsoluteUrl("/"),
    languages: {
      en: toAbsoluteUrl("/"),
      "x-default": toAbsoluteUrl("/"),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
