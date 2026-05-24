import type { ToolDefinition } from "./types";
import { buildLiveTool, faq } from "./registry-live-helpers";

const category = "health-fitness-calculators";

export const healthFitnessLiveTools: ToolDefinition[] = [
  buildLiveTool({
    id: "bmi-calculator",
    slug: "bmi-calculator",
    title: "BMI Calculator",
    category,
    subcategory: "body-metrics",
    shortDescription: "Calculate body mass index with category range and healthy weight guidance.",
    metaTitle: "BMI Calculator - Body Mass Index Calculator",
    metaDescription:
      "Free BMI calculator with metric and US units. See your BMI category, healthy weight range, and visual scale. No login required.",
    keywords: ["bmi calculator", "body mass index calculator", "calculate bmi"],
    relatedTools: ["calorie-calculator", "macro-calculator"],
    componentKey: "BmiCalculatorTool",
    schemaType: "Calculator",
    priority: 10,
    formula: "BMI = weight (kg) ÷ height (m)²",
    explanation:
      "Calculate body mass index from height and weight using metric or US customary units.",
    howToUse: [
      "Choose metric or US units.",
      "Enter your height and weight.",
      "Review BMI value, category, and healthy weight range.",
    ],
    examples: [
      {
        title: "Metric example",
        input: "height=170 cm, weight=70 kg",
        output: "BMI ≈ 24.2 (Normal)",
        explanation: "70 ÷ (1.7²) ≈ 24.2",
      },
    ],
    faqs: [
      faq("What is a healthy BMI?", "WHO ranges: under 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30+ obese."),
      faq("Is BMI accurate for athletes?", "BMI does not distinguish muscle from fat. Use with other metrics if you are very muscular."),
      faq("Is this medical advice?", "No. For informational purposes only. Consult a healthcare provider before changing diet or exercise."),
      faq("How is BMI calculated?", "BMI = weight (kg) ÷ height (m)². US units are converted internally before the formula is applied."),
      faq("What is a normal BMI?", "For adults, WHO defines normal BMI as 18.5 to 24.9."),
      faq("Can I use BMI during pregnancy?", "Standard adult BMI ranges are not intended for pregnancy. Follow prenatal care guidance instead."),
      faq("Does age affect BMI interpretation?", "The formula is the same for all adults, but context matters more with age. Older adults may lose muscle while weight stays stable."),
      faq("What should I do after calculating BMI?", "If you want nutrition targets, try the calorie calculator for TDEE estimates, then the macro calculator for protein, carb, and fat splits."),
    ],
    commonUseCases: [
      "Quick body composition screening",
      "Track weight goals against healthy range",
      "Estimate healthy weight for your height",
    ],
    assumptions: ["Standard adult BMI formula.", "Not intended for children or pregnancy without clinical guidance."],
  }),
  buildLiveTool({
    id: "calorie-calculator",
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    category,
    subcategory: "nutrition",
    shortDescription: "Estimate daily calories and TDEE based on age, activity, and weight goals.",
    metaTitle: "Calorie Calculator - TDEE & Daily Calorie Estimate",
    metaDescription:
      "Calculate daily calorie needs with Mifflin-St Jeor BMR and activity multipliers. Set weight loss, maintenance, or gain targets.",
    keywords: ["calorie calculator", "tdee calculator", "daily calorie calculator"],
    relatedTools: ["macro-calculator", "bmi-calculator"],
    componentKey: "CalorieCalculatorTool",
    schemaType: "Calculator",
    priority: 10,
    formula: "BMR (Mifflin-St Jeor) × activity factor; goal adjusts ±500 cal/day",
    explanation:
      "Estimate basal metabolic rate and total daily energy expenditure, then adjust for weight loss, maintenance, or gain.",
    howToUse: [
      "Enter age, sex, height, weight, and activity level.",
      "Choose a weight goal: lose, maintain, or gain.",
      "Copy your target calories or open the macro calculator.",
    ],
    examples: [
      {
        title: "Moderate activity, maintenance",
        input: "30yo male, 180 lb, 5'10\", moderate activity",
        output: "TDEE and maintenance calories",
        explanation: "Mifflin-St Jeor BMR multiplied by activity factor.",
      },
    ],
    faqs: [
      faq("Which formula is used?", "Mifflin-St Jeor equation for BMR with standard activity multipliers."),
      faq("How much deficit for weight loss?", "A common starting point is 500 calories below TDEE (~1 lb/week)."),
      faq("Can I calculate macros next?", "Yes. Use the link to macro calculator with your calorie target."),
    ],
    commonUseCases: [
      "Set daily calorie targets",
      "Estimate TDEE for meal planning",
      "Compare maintenance vs deficit calories",
    ],
    assumptions: ["Adult populations; individual metabolism varies.", "Not a substitute for medical nutrition advice."],
  }),
  buildLiveTool({
    id: "macro-calculator",
    slug: "macro-calculator",
    title: "Macro Calculator",
    category,
    subcategory: "nutrition",
    shortDescription: "Calculate daily protein, carbs, and fat targets from calories and diet style.",
    metaTitle: "Macro Calculator - Protein, Carbs & Fat Targets",
    metaDescription:
      "Calculate macronutrient grams from daily calories. Balanced, low-carb, high-protein, keto, or custom splits.",
    keywords: ["macro calculator", "macronutrient calculator", "protein calculator"],
    relatedTools: ["calorie-calculator", "bmi-calculator"],
    componentKey: "MacroCalculatorTool",
    schemaType: "Calculator",
    priority: 10,
    formula: "grams = (calories × macro%) ÷ calories per gram (P/C: 4, F: 9)",
    explanation:
      "Split daily calories into protein, carbohydrate, and fat grams using preset or custom percentages.",
    howToUse: [
      "Enter daily calorie target (or follow link from calorie calculator).",
      "Choose a diet preset or set custom percentages.",
      "Review macro grams and per-meal breakdown.",
    ],
    examples: [
      {
        title: "2000 cal balanced",
        input: "2000 calories, balanced 30/40/30",
        output: "150g protein, 200g carbs, 67g fat",
        explanation: "30% protein, 40% carbs, 30% fat of 2000 calories.",
      },
    ],
    faqs: [
      faq("What are the preset splits?", "Balanced 30/40/30, low-carb, high-protein, and keto-style ratios."),
      faq("Can I use custom percentages?", "Yes. Select Custom and enter protein, carb, and fat percentages that sum to 100."),
      faq("How are grams calculated?", "Protein and carbs use 4 cal/g; fat uses 9 cal/g."),
    ],
    commonUseCases: [
      "Plan meal prep macros",
      "Align diet with training goals",
      "Split calories across meals",
    ],
    assumptions: ["Percentages should total 100% for custom mode.", "For informational purposes only."],
  }),
];
