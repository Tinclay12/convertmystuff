import type { ToolContentEnrichment } from "@/lib/content/types";

const tierA = (blocks: ToolContentEnrichment["contentBlocks"]): ToolContentEnrichment => ({
  contentTier: "A",
  contentBlocks: blocks,
});

export const converterSnippets: Record<string, ToolContentEnrichment> = {
  "square-feet-to-acres": tierA([
    {
      id: "lot-size",
      title: "Square feet in property listings",
      variant: "info",
      paragraphs: [
        "Building footprint and lot area in US listings are often quoted in square feet. Converting to acres helps compare urban lots with rural parcels.",
        "43,560 square feet equals one US survey acre.",
      ],
      linkedToolIds: ["price-per-square-foot", "acres-to-square-feet"],
    },
  ]),
  "hectares-to-acres": tierA([
    {
      id: "metric-land",
      title: "Hectares in international listings",
      variant: "info",
      paragraphs: [
        "One hectare equals 10,000 square meters and is standard in metric countries for farmland, parks, and large parcels.",
        "US listings often use acres instead. Converting hectares to acres helps compare international property sizes with domestic listings.",
      ],
    },
  ]),
  "acres-to-hectares": tierA([
    {
      id: "us-to-metric",
      title: "Acres in metric surveys",
      variant: "info",
      paragraphs: [
        "When a US parcel is measured in acres but you need metric reporting, hectares provide a clean square-meter-based unit.",
        "One acre is approximately 0.4047 hectares using standard conversion factors.",
      ],
    },
  ]),
  "meters-to-feet": tierA([
    {
      id: "height-distance",
      title: "Common uses for meters to feet",
      variant: "info",
      paragraphs: [
        "Metric height and length measurements appear in sports, construction specs, and international product dimensions.",
        "Multiply meters by 3.28084 to get feet. For lumber and framing estimates, continue with construction calculators after converting dimensions.",
      ],
      linkedToolIds: ["lumber-calculator"],
    },
  ]),
  "feet-to-meters": tierA([
    {
      id: "us-to-metric-length",
      title: "US customary to metric length",
      variant: "info",
      paragraphs: [
        "Building plans, travel distances, and product specs from the US often use feet and inches.",
        "Divide feet by 3.28084 (or use this converter) when you need meters for metric tools or international forms.",
      ],
    },
  ]),
  "miles-to-km": tierA([
    {
      id: "road-distance",
      title: "Road and travel distances",
      variant: "info",
      paragraphs: [
        "One mile equals approximately 1.60934 kilometers. Useful for converting US odometer or map distances to metric.",
        "Running and cycling apps may display either unit depending on locale settings.",
      ],
    },
  ]),
  "km-to-miles": tierA([
    {
      id: "metric-travel",
      title: "Kilometers to miles for US readers",
      variant: "info",
      paragraphs: [
        "International route distances and vehicle specs often use kilometers.",
        "Multiply km by 0.621371 for an approximate miles equivalent.",
      ],
    },
  ]),
  "kg-to-lbs": tierA([
    {
      id: "body-weight",
      title: "Weight for health calculators",
      variant: "tip",
      paragraphs: [
        "Medical and fitness tools may use kilograms or pounds depending on region. Convert first, then enter values in BMI or calorie calculators.",
      ],
      linkedToolIds: ["bmi-calculator", "calorie-calculator"],
      linkedToolPrefills: {
        "bmi-calculator": "weightKg=70&heightCm=170",
      },
    },
  ]),
  "lbs-to-kg": tierA([
    {
      id: "us-weight-metric",
      title: "Pounds to kilograms for metric tools",
      variant: "tip",
      paragraphs: [
        "US scale readings in pounds can be converted to kilograms before using WHO-based BMI ranges or Mifflin-St Jeor calorie formulas.",
      ],
      linkedToolIds: ["bmi-calculator", "calorie-calculator"],
      linkedToolPrefills: {
        "bmi-calculator": "weightKg=70&heightCm=170",
      },
    },
  ]),
  "liters-to-gallons": tierA([
    {
      id: "cooking-volume",
      title: "Volume in recipes and fuel",
      variant: "info",
      paragraphs: [
        "Liters are standard in metric recipes and beverage packaging. US gallons differ from imperial gallons—this tool uses US liquid gallons.",
        "For recipe scaling after converting volume, use the recipe scaler with your adjusted ingredient list.",
      ],
      linkedToolIds: ["recipe-scaler", "ingredient-converter"],
    },
  ]),
  "gallons-to-liters": tierA([
    {
      id: "us-gallons-metric",
      title: "US gallons to metric liters",
      variant: "info",
      paragraphs: [
        "One US liquid gallon equals approximately 3.78541 liters. Check whether your source uses US or imperial gallons before converting.",
      ],
      linkedToolIds: ["ingredient-converter"],
    },
  ]),
  "celsius-to-fahrenheit": tierA([
    {
      id: "oven-settings",
      title: "Oven and weather temperatures",
      variant: "info",
      paragraphs: [
        "Recipe oven temperatures and weather forecasts may use Celsius in metric countries.",
        "For baking, verify converted oven settings—fan-assisted ovens may need additional adjustment beyond a straight conversion.",
      ],
      linkedToolIds: ["oven-temp-converter"],
    },
  ]),
  "fahrenheit-to-celsius": tierA([
    {
      id: "us-temp-metric",
      title: "Fahrenheit to Celsius",
      variant: "info",
      paragraphs: [
        "US recipes and weather reports commonly use Fahrenheit. Convert to Celsius when using metric oven dials or international cookbooks.",
      ],
      linkedToolIds: ["oven-temp-converter"],
    },
  ]),
  "mb-to-gb": tierA([
    {
      id: "storage-units",
      title: "Digital storage sizing",
      variant: "info",
      paragraphs: [
        "Storage labels sometimes use decimal gigabytes (1 GB = 1,000 MB) while operating systems may report binary gibibytes.",
        "Always confirm which convention your device or cloud provider uses when comparing free space.",
      ],
    },
  ]),
  "gb-to-mb": tierA([
    {
      id: "storage-breakdown",
      title: "Gigabytes to megabytes",
      variant: "info",
      paragraphs: [
        "Breaking gigabytes into megabytes helps compare file sizes to upload limits or email attachment caps.",
        "1 GB = 1,000 MB in decimal SI-style storage marketing; some systems use 1,024 MB per GB.",
      ],
    },
  ]),
  "inches-to-cm": tierA([
    {
      id: "screen-print",
      title: "Inches to centimeters",
      variant: "info",
      paragraphs: [
        "Screen sizes, print dimensions, and product specs often mix inches and centimeters.",
        "One inch equals exactly 2.54 centimeters by international definition.",
      ],
      linkedToolIds: ["lumber-calculator"],
    },
  ]),
  "cm-to-inches": tierA([
    {
      id: "metric-length-inches",
      title: "Centimeters to inches",
      variant: "info",
      paragraphs: [
        "Metric measurements from EU product labels or medical forms can be converted to inches for US contexts.",
        "Divide centimeters by 2.54 to get inches.",
      ],
    },
  ]),
  "square-meters-to-square-feet": tierA([
    {
      id: "floor-area-metric",
      title: "Floor area in metric listings",
      variant: "info",
      paragraphs: [
        "International property and floor plans often quote area in square meters.",
        "Converting to square feet helps compare with US listings and construction estimates.",
      ],
      linkedToolIds: ["square-feet-to-square-meters", "price-per-square-foot"],
    },
  ]),
  "ounces-to-grams": tierA([
    {
      id: "cooking-weights",
      title: "Ounces in recipes and packaging",
      variant: "info",
      paragraphs: [
        "US recipes and food labels often use ounces while metric kitchens use grams.",
        "One avoirdupois ounce equals 28.349523125 grams.",
      ],
      linkedToolIds: ["grams-to-ounces", "cups-to-grams"],
    },
  ]),
};
