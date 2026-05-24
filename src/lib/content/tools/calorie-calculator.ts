import type { ToolContentEnrichment } from "@/lib/content/types";

export const calorieCalculatorContent: ToolContentEnrichment = {
  contentTier: "B",
  guideSlug: "tdee-and-calorie-deficits",
  contentBlocks: [
    {
      id: "tdee-overview",
      title: "From BMI to daily calories",
      variant: "info",
      paragraphs: [
        "If you already know your BMI, the next step for nutrition planning is estimating total daily energy expenditure (TDEE). This calculator uses the Mifflin-St Jeor BMR formula multiplied by your activity level.",
        "Choose lose, maintain, or gain to see a target calorie range. Then split those calories into protein, carbs, and fat with the macro calculator.",
      ],
      linkedToolIds: ["bmi-calculator", "macro-calculator"],
    },
  ],
};
