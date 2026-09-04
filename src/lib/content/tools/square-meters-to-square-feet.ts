import type { ToolContentEnrichment } from "@/lib/content/types";

export const squareMetersToSquareFeetContent: ToolContentEnrichment = {
  contentTier: "A",
  contentBlocks: [
    {
      id: "why-107639",
      title: "Why 1 m² is 10.7639 ft², not 3.28",
      variant: "info",
      paragraphs: [
        "One meter is about 3.28084 feet. Area uses both length and width, so the conversion is that factor squared: 3.28084 × 3.28084 ≈ 10.7639. Applying the linear factor to an area (100 m² × 3.28) understates the result by about 70%.",
        "The exact factor used here is 10.7639104167 square feet per square meter, based on the international foot (0.3048 m exactly).",
      ],
    },
    {
      id: "common-listing-sizes",
      title: "Common apartment and room sizes",
      variant: "tip",
      paragraphs: [
        "60 m² is about 646 ft² (a compact one-bedroom). 80 m² is about 861 ft². 100 m² is about 1,076 ft². 150 m² is about 1,615 ft².",
        "For a single room, enter length and width in meters above. A 4 m × 5 m room is 20 m², or about 215 ft²—useful for flooring and paint estimates.",
      ],
      linkedToolIds: ["square-feet-to-square-meters", "price-per-square-foot"],
    },
    {
      id: "linear-vs-area",
      title: "Do not mix meters with square meters",
      variant: "warning",
      paragraphs: [
        "Queries like “1 meter to square feet” mix a length unit with an area unit. Convert meters to feet for a distance; convert square meters to square feet for a floor plan.",
        "Need land area instead of floor area? Switch to acres or hectares rather than stretching square meters across a whole parcel.",
      ],
      linkedToolIds: ["meters-to-feet", "acres-to-square-feet"],
    },
  ],
};
