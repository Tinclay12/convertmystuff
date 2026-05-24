import { ImageResponse } from "next/og";
import { SITE_NAME } from "./site";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png" as const;

const ACCENT_BY_CATEGORY: Record<string, string> = {
  "developer-tools": "#1d4ed8",
  "unit-converters": "#0d9488",
  "real-estate-calculators": "#b45309",
  "finance-calculators": "#047857",
  "marketing-tools": "#9333ea",
  "text-tools": "#db2777",
  "image-tools": "#ea580c",
  "construction-calculators": "#a16207",
  "health-fitness-calculators": "#dc2626",
  "document-tools": "#2563eb",
  "time-date-tools": "#7c3aed",
  "design-tools": "#0891b2",
  "kitchen-recipe-tools": "#c2410c",
};

const truncate = (value: string, max: number): string => {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max - 1).trimEnd()}…`;
};

type RenderOgImageOptions = {
  title: string;
  description?: string;
  eyebrow?: string;
  categorySlug?: string;
};

export const renderOgImage = ({
  title,
  description,
  eyebrow,
  categorySlug,
}: RenderOgImageOptions): ImageResponse => {
  const accent = (categorySlug && ACCENT_BY_CATEGORY[categorySlug]) || "#1d4ed8";
  const safeTitle = truncate(title, 90);
  const safeDescription = description ? truncate(description, 160) : undefined;
  const safeEyebrow = eyebrow ? truncate(eyebrow, 60) : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          backgroundImage: `radial-gradient(at 100% 0%, ${accent}26 0%, transparent 55%), radial-gradient(at 0% 100%, ${accent}14 0%, transparent 55%)`,
          padding: "72px 80px",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          color: "#0a0a0f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#0a0a0f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7L10 4M10 4L16 7M10 4V20M20 17L14 20M14 20L8 17M14 20V4"
                stroke="#ffffff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.5px",
              display: "flex",
            }}
          >
            <span>ConvertMy</span>
            <span style={{ color: accent }}>Stuff</span>
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {safeEyebrow && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 18,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: accent,
                backgroundColor: `${accent}1A`,
                border: `1px solid ${accent}33`,
                borderRadius: 999,
                padding: "8px 16px",
              }}
            >
              {safeEyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              maxWidth: 1040,
              display: "flex",
            }}
          >
            {safeTitle}
          </div>
          {safeDescription && (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.35,
                color: "#4b5563",
                maxWidth: 980,
                display: "flex",
              }}
            >
              {safeDescription}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#6b7280",
            borderTop: "1px solid #e5e7eb",
            paddingTop: 24,
          }}
        >
          <span style={{ display: "flex" }}>{SITE_NAME.toLowerCase()}.com</span>
          <span style={{ display: "flex" }}>Free · Browser-based · No login</span>
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE },
  );
};
