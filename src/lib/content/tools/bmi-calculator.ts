import type { ToolContentEnrichment } from "@/lib/content/types";

export const bmiCalculatorContent: ToolContentEnrichment = {
  contentTier: "C",
  guideSlug: "what-is-bmi",
  contentBlocks: [
    {
      id: "bmi-categories",
      title: "Understanding BMI categories",
      variant: "info",
      paragraphs: [
        "The World Health Organization (WHO) defines adult BMI ranges as: under 18.5 (underweight), 18.5–24.9 (normal), 25–29.9 (overweight), and 30 or above (obese). These ranges are screening thresholds, not diagnoses.",
        "Your result places you in a category based on height and weight alone. Individual factors like muscle mass, age, and body composition are not reflected in the standard formula.",
      ],
    },
    {
      id: "bmi-limitations",
      title: "When BMI can be misleading",
      variant: "warning",
      paragraphs: [
        "BMI does not distinguish fat from muscle. Athletes and very muscular individuals may score in the overweight range despite low body fat.",
        "BMI is not intended for children, pregnant individuals, or certain elderly populations without clinical guidance. Always consult a healthcare provider before making health decisions based on BMI.",
      ],
    },
    {
      id: "bmi-next-steps",
      title: "What to do after calculating BMI",
      variant: "tip",
      paragraphs: [
        "If you want to set nutrition or weight goals, estimate your daily calorie needs next. Our calorie calculator uses the Mifflin-St Jeor equation and can link directly to macro targets.",
      ],
      linkedToolIds: ["calorie-calculator", "macro-calculator"],
      linkedToolPrefills: {
        "calorie-calculator": "goal=maintain",
      },
    },
  ],
};
