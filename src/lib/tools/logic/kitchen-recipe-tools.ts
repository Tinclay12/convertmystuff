import type { LogicResult } from "./unit-conversions";
import { formatNumber } from "./unit-conversions";

type KitchenInput = Record<string, number | string>;

const GRAMS_PER_CUP: Record<string, number> = {
  flour: 120,
  sugar: 200,
  butter: 227,
  rice: 185,
  water: 240,
  milk: 245,
  default: 150,
};

export const scaleRecipe = (values: KitchenInput): LogicResult => {
  const input = String(values.ingredients ?? "").trim();
  const originalServings = Number(values.originalServings);
  const targetServings = Number(values.targetServings);

  if (!input) {
    return { ok: false, error: "Paste ingredient lines with quantities." };
  }
  if (!Number.isFinite(originalServings) || originalServings <= 0) {
    return { ok: false, error: "Enter valid original servings." };
  }
  if (!Number.isFinite(targetServings) || targetServings <= 0) {
    return { ok: false, error: "Enter valid target servings." };
  }

  const factor = targetServings / originalServings;
  const lines = input.split(/\r?\n/);
  const scaled = lines.map((line) => {
    const match = line.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    if (!match) return line;
    const amount = Number(match[1]) * factor;
    return `${formatNumber(amount, 2)} ${match[2]}`.trim();
  });

  return { ok: true, output: scaled.join("\n") };
};

export const cupsToGrams = (values: KitchenInput): LogicResult => {
  const cups = Number(values.cups);
  const ingredient = String(values.ingredient ?? "default").trim().toLowerCase();

  if (!Number.isFinite(cups) || cups < 0) {
    return { ok: false, error: "Enter a valid number of cups." };
  }

  const gramsPerCup = GRAMS_PER_CUP[ingredient] ?? GRAMS_PER_CUP.default;
  const grams = cups * gramsPerCup;

  return {
    ok: true,
    output: `${formatNumber(cups, 2)} cups ≈ ${formatNumber(grams, 1)} grams (${ingredient || "default density"})`,
    meta: { grams },
  };
};

export const tbspToMl = (values: KitchenInput): LogicResult => {
  const tbsp = Number(values.tbsp);
  if (!Number.isFinite(tbsp) || tbsp < 0) {
    return { ok: false, error: "Enter a valid number of tablespoons." };
  }

  const ml = tbsp * 14.7868;
  return {
    ok: true,
    output: `${formatNumber(tbsp, 2)} tbsp = ${formatNumber(ml, 2)} ml`,
    meta: { ml },
  };
};

export const convertOvenTemp = (values: KitchenInput): LogicResult => {
  const value = Number(values.value);
  const from = String(values.from ?? "fahrenheit");

  if (!Number.isFinite(value)) {
    return { ok: false, error: "Enter a valid temperature." };
  }

  if (from === "fahrenheit") {
    const celsius = ((value - 32) * 5) / 9;
    return {
      ok: true,
      output: `${formatNumber(value, 0)}°F = ${formatNumber(celsius, 1)}°C`,
    };
  }

  const fahrenheit = (value * 9) / 5 + 32;
  return {
    ok: true,
    output: `${formatNumber(value, 0)}°C = ${formatNumber(fahrenheit, 1)}°F`,
  };
};

export const calculateServings = (values: KitchenInput): LogicResult => {
  const recipeServings = Number(values.recipeServings);
  const guests = Number(values.guests);

  if (!Number.isFinite(recipeServings) || recipeServings <= 0) {
    return { ok: false, error: "Enter valid recipe servings." };
  }
  if (!Number.isFinite(guests) || guests <= 0) {
    return { ok: false, error: "Enter a valid guest count." };
  }

  const multiplier = guests / recipeServings;
  return {
    ok: true,
    output: `Scale recipe by ${formatNumber(multiplier, 2)}× for ${guests} guests`,
    meta: { multiplier },
  };
};

export const convertIngredientUnits = (values: KitchenInput): LogicResult => {
  const amount = Number(values.amount);
  const from = String(values.fromUnit ?? "cup");
  const to = String(values.toUnit ?? "tbsp");

  if (!Number.isFinite(amount) || amount < 0) {
    return { ok: false, error: "Enter a valid amount." };
  }

  const toMl: Record<string, number> = {
    tsp: 4.92892,
    tbsp: 14.7868,
    cup: 236.588,
    ml: 1,
  };

  if (!(from in toMl) || !(to in toMl)) {
    return { ok: false, error: "Supported units: tsp, tbsp, cup, ml." };
  }

  const ml = amount * toMl[from];
  const converted = ml / toMl[to];

  return {
    ok: true,
    output: `${formatNumber(amount, 2)} ${from} = ${formatNumber(converted, 2)} ${to}`,
  };
};

export type KitchenField = {
  key: string;
  label: string;
  placeholder: string;
  type?: "text" | "number" | "textarea" | "select";
  options?: { value: string; label: string }[];
  step?: string;
};

export type KitchenToolConfig =
  | {
      kind: "fields";
      fields: KitchenField[];
      calculate: (values: KitchenInput) => LogicResult;
    }
  | {
      kind: "textarea";
      inputLabel: string;
      inputPlaceholder: string;
      fields: KitchenField[];
      calculate: (values: KitchenInput) => LogicResult;
    };

export const kitchenToolConfigs: Record<string, KitchenToolConfig> = {
  "recipe-scaler": {
    kind: "textarea",
    inputLabel: "Ingredients (one per line, start with quantity)",
    inputPlaceholder: "2 cups flour\n1 cup sugar\n3 eggs",
    fields: [
      { key: "originalServings", label: "Original servings", placeholder: "4", type: "number" },
      { key: "targetServings", label: "Target servings", placeholder: "8", type: "number" },
    ],
    calculate: (values) =>
      scaleRecipe({ ...values, ingredients: values.ingredients ?? values.input ?? "" }),
  },
  "cups-to-grams": {
    kind: "fields",
    fields: [
      { key: "cups", label: "Cups", placeholder: "2", type: "number", step: "0.25" },
      {
        key: "ingredient",
        label: "Ingredient",
        placeholder: "flour",
        type: "select",
        options: [
          { value: "flour", label: "Flour" },
          { value: "sugar", label: "Sugar" },
          { value: "butter", label: "Butter" },
          { value: "rice", label: "Rice" },
          { value: "water", label: "Water" },
          { value: "milk", label: "Milk" },
          { value: "default", label: "Generic" },
        ],
      },
    ],
    calculate: cupsToGrams,
  },
  "tbsp-to-ml": {
    kind: "fields",
    fields: [{ key: "tbsp", label: "Tablespoons", placeholder: "2", type: "number", step: "0.5" }],
    calculate: tbspToMl,
  },
  "oven-temp-converter": {
    kind: "fields",
    fields: [
      { key: "value", label: "Temperature", placeholder: "350", type: "number" },
      {
        key: "from",
        label: "From",
        placeholder: "",
        type: "select",
        options: [
          { value: "fahrenheit", label: "Fahrenheit" },
          { value: "celsius", label: "Celsius" },
        ],
      },
    ],
    calculate: convertOvenTemp,
  },
  "serving-calculator": {
    kind: "fields",
    fields: [
      { key: "recipeServings", label: "Recipe servings", placeholder: "4", type: "number" },
      { key: "guests", label: "Guests", placeholder: "10", type: "number" },
    ],
    calculate: calculateServings,
  },
  "ingredient-converter": {
    kind: "fields",
    fields: [
      { key: "amount", label: "Amount", placeholder: "1", type: "number", step: "0.25" },
      {
        key: "fromUnit",
        label: "From unit",
        placeholder: "",
        type: "select",
        options: [
          { value: "tsp", label: "Teaspoon" },
          { value: "tbsp", label: "Tablespoon" },
          { value: "cup", label: "Cup" },
          { value: "ml", label: "Milliliter" },
        ],
      },
      {
        key: "toUnit",
        label: "To unit",
        placeholder: "",
        type: "select",
        options: [
          { value: "tsp", label: "Teaspoon" },
          { value: "tbsp", label: "Tablespoon" },
          { value: "cup", label: "Cup" },
          { value: "ml", label: "Milliliter" },
        ],
      },
    ],
    calculate: convertIngredientUnits,
  },
};
