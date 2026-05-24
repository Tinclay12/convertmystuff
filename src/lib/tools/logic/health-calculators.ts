export type UnitSystem = "metric" | "us";

export type BmiInput = {
  unitSystem: UnitSystem;
  heightCm?: number;
  weightKg?: number;
  heightFeet?: number;
  heightInches?: number;
  weightLbs?: number;
};

export type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

export type BmiResult =
  | {
      ok: true;
      bmi: number;
      category: BmiCategory;
      healthyWeightMinKg: number;
      healthyWeightMaxKg: number;
      heightM: number;
      weightKg: number;
    }
  | { ok: false; error: string };

export const toKg = (lbs: number): number => lbs * 0.45359237;
export const toCmFromFeetInches = (feet: number, inches: number): number =>
  feet * 30.48 + inches * 2.54;

export const calculateBmi = (input: BmiInput): BmiResult => {
  let heightCm = input.heightCm;
  let weightKg = input.weightKg;

  if (input.unitSystem === "us") {
    if (
      !Number.isFinite(input.heightFeet) ||
      !Number.isFinite(input.heightInches) ||
      !Number.isFinite(input.weightLbs)
    ) {
      return { ok: false, error: "Enter valid height and weight." };
    }
    heightCm = toCmFromFeetInches(input.heightFeet!, input.heightInches!);
    weightKg = toKg(input.weightLbs!);
  }

  if (!Number.isFinite(heightCm) || heightCm! <= 0) {
    return { ok: false, error: "Enter a valid height." };
  }
  if (!Number.isFinite(weightKg) || weightKg! <= 0) {
    return { ok: false, error: "Enter a valid weight." };
  }

  const heightM = heightCm! / 100;
  const bmi = weightKg! / (heightM * heightM);

  let category: BmiCategory = "Normal";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  const healthyWeightMinKg = 18.5 * heightM * heightM;
  const healthyWeightMaxKg = 24.9 * heightM * heightM;

  return {
    ok: true,
    bmi,
    category,
    healthyWeightMinKg,
    healthyWeightMaxKg,
    heightM,
    weightKg: weightKg!,
  };
};

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "extra";

export type WeightGoal = "lose" | "maintain" | "gain";

export type CalorieInput = {
  age: number;
  sex: "male" | "female";
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: WeightGoal;
  weeklyChangeLbs: number;
};

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extra: 1.9,
};

export type CalorieResult =
  | {
      ok: true;
      bmr: number;
      tdee: number;
      targetCalories: number;
      dailyAdjustment: number;
      warning?: string;
    }
  | { ok: false; error: string };

export const calculateCalories = (input: CalorieInput): CalorieResult => {
  const { age, sex, heightCm, weightKg, activityLevel, goal, weeklyChangeLbs } =
    input;

  if (!Number.isFinite(age) || age < 13 || age > 120) {
    return { ok: false, error: "Enter an age between 13 and 120." };
  }
  if (!Number.isFinite(heightCm) || heightCm <= 0) {
    return { ok: false, error: "Enter a valid height." };
  }
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return { ok: false, error: "Enter a valid weight." };
  }

  const bmr =
    sex === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = bmr * activityMultipliers[activityLevel];
  const dailyAdjustment = (weeklyChangeLbs * 3500) / 7;

  let targetCalories = tdee;
  if (goal === "lose") targetCalories = tdee - dailyAdjustment;
  if (goal === "gain") targetCalories = tdee + dailyAdjustment;

  const minCalories = sex === "male" ? 1500 : 1200;
  let warning: string | undefined;
  if (targetCalories < minCalories) {
    warning = `Target calories (${Math.round(targetCalories)}) may be below a safe minimum (~${minCalories} cal/day). Consult a healthcare provider.`;
  }

  return {
    ok: true,
    bmr,
    tdee,
    targetCalories,
    dailyAdjustment: goal === "maintain" ? 0 : dailyAdjustment,
    warning,
  };
};

export type DietPreset = "balanced" | "low-carb" | "high-protein" | "keto" | "custom";

export type MacroInput = {
  dailyCalories: number;
  preset: DietPreset;
  proteinPercent?: number;
  carbsPercent?: number;
  fatPercent?: number;
  mealsPerDay: number;
};

const presetRatios: Record<
  Exclude<DietPreset, "custom">,
  { protein: number; carbs: number; fat: number }
> = {
  balanced: { protein: 30, carbs: 40, fat: 30 },
  "low-carb": { protein: 30, carbs: 20, fat: 50 },
  "high-protein": { protein: 40, carbs: 30, fat: 30 },
  keto: { protein: 25, carbs: 5, fat: 70 },
};

export type MacroResult =
  | {
      ok: true;
      proteinGrams: number;
      carbsGrams: number;
      fatGrams: number;
      proteinCalories: number;
      carbsCalories: number;
      fatCalories: number;
      perMeal: { protein: number; carbs: number; fat: number };
    }
  | { ok: false; error: string };

export const calculateMacros = (input: MacroInput): MacroResult => {
  const { dailyCalories, preset, mealsPerDay } = input;

  if (!Number.isFinite(dailyCalories) || dailyCalories <= 0) {
    return { ok: false, error: "Enter a valid daily calorie target." };
  }
  if (!Number.isFinite(mealsPerDay) || mealsPerDay < 1) {
    return { ok: false, error: "Meals per day must be at least 1." };
  }

  let proteinPct: number;
  let carbsPct: number;
  let fatPct: number;

  if (preset === "custom") {
    proteinPct = input.proteinPercent ?? 0;
    carbsPct = input.carbsPercent ?? 0;
    fatPct = input.fatPercent ?? 0;
    const total = proteinPct + carbsPct + fatPct;
    if (Math.abs(total - 100) > 0.5) {
      return { ok: false, error: "Custom macro percentages must sum to 100." };
    }
  } else {
    proteinPct = presetRatios[preset].protein;
    carbsPct = presetRatios[preset].carbs;
    fatPct = presetRatios[preset].fat;
  }

  const proteinCalories = dailyCalories * (proteinPct / 100);
  const carbsCalories = dailyCalories * (carbsPct / 100);
  const fatCalories = dailyCalories * (fatPct / 100);

  const proteinGrams = proteinCalories / 4;
  const carbsGrams = carbsCalories / 4;
  const fatGrams = fatCalories / 9;

  return {
    ok: true,
    proteinGrams,
    carbsGrams,
    fatGrams,
    proteinCalories,
    carbsCalories,
    fatCalories,
    perMeal: {
      protein: proteinGrams / mealsPerDay,
      carbs: carbsGrams / mealsPerDay,
      fat: fatGrams / mealsPerDay,
    },
  };
};
