"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { calculateMacros, type DietPreset } from "@/lib/tools/logic/health-calculators";
import { formatNumber } from "@/lib/tools/logic/unit-conversions";
import { ToolActionBar } from "@/components/tools/ToolActionBar";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";

const parseAmount = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const MacroCalculatorTool = () => {
  const [dailyCalories, setDailyCalories] = useState(() => {
    if (typeof window === "undefined") {
      return "2000";
    }
    return new URLSearchParams(window.location.search).get("calories") ?? "2000";
  });
  const [preset, setPreset] = useState<DietPreset>("balanced");
  const [proteinPercent, setProteinPercent] = useState("30");
  const [carbsPercent, setCarbsPercent] = useState("40");
  const [fatPercent, setFatPercent] = useState("30");
  const [mealsPerDay, setMealsPerDay] = useState("3");
  const [hasCalculated, setHasCalculated] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return new URLSearchParams(window.location.search).has("calories");
  });

  const result = useMemo(() => {
    if (!hasCalculated) return null;
    return calculateMacros({
      dailyCalories: parseAmount(dailyCalories),
      preset,
      proteinPercent: parseAmount(proteinPercent),
      carbsPercent: parseAmount(carbsPercent),
      fatPercent: parseAmount(fatPercent),
      mealsPerDay: parseAmount(mealsPerDay),
    });
  }, [hasCalculated, dailyCalories, preset, proteinPercent, carbsPercent, fatPercent, mealsPerDay]);

  const handleCalculate = () => {
    setHasCalculated(true);
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "macro-calculator",
      tool_category: "health-fitness-calculators",
    });
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Macro targets">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Daily calories" type="number" min="0" value={dailyCalories} onChange={(e) => setDailyCalories(e.target.value)} placeholder="2000" />
          <ToolSelect label="Diet preset" id="preset" value={preset} onChange={(e) => setPreset(e.target.value as DietPreset)}>
            <option value="balanced">Balanced (30/40/30)</option>
            <option value="low-carb">Low carb</option>
            <option value="high-protein">High protein</option>
            <option value="keto">Keto</option>
            <option value="custom">Custom</option>
          </ToolSelect>
          <Input label="Meals per day" type="number" min="1" max="8" value={mealsPerDay} onChange={(e) => setMealsPerDay(e.target.value)} placeholder="3" />
        </div>
        {preset === "custom" && (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Input label="Protein (%)" type="number" min="0" max="100" value={proteinPercent} onChange={(e) => setProteinPercent(e.target.value)} />
            <Input label="Carbs (%)" type="number" min="0" max="100" value={carbsPercent} onChange={(e) => setCarbsPercent(e.target.value)} />
            <Input label="Fat (%)" type="number" min="0" max="100" value={fatPercent} onChange={(e) => setFatPercent(e.target.value)} />
          </div>
        )}
        <div className="mt-4">
          <ToolActionBar
            primary={<Button type="button" onClick={handleCalculate}>Calculate macros</Button>}
          />
        </div>
      </ToolInputPanel>

      {result && !result.ok && <ToolErrorAlert message={result.error} />}

      {result?.ok && (
        <ToolOutputPanel
          actions={
            <CopyButton
              value={`P: ${formatNumber(result.proteinGrams, 0)}g | C: ${formatNumber(result.carbsGrams, 0)}g | F: ${formatNumber(result.fatGrams, 0)}g`}
              label="Copy macros"
            />
          }
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Protein</p>
              <p className="mt-1 text-2xl font-semibold">{formatNumber(result.proteinGrams, 0)}g</p>
              <p className="text-xs text-muted">{Math.round(result.proteinCalories)} cal</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Carbs</p>
              <p className="mt-1 text-2xl font-semibold">{formatNumber(result.carbsGrams, 0)}g</p>
              <p className="text-xs text-muted">{Math.round(result.carbsCalories)} cal</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Fat</p>
              <p className="mt-1 text-2xl font-semibold">{formatNumber(result.fatGrams, 0)}g</p>
              <p className="text-xs text-muted">{Math.round(result.fatCalories)} cal</p>
            </div>
          </div>
          <div className="mt-4 flex h-4 overflow-hidden rounded-full">
            <div className="bg-chart-1" style={{ width: `${(result.proteinCalories / parseAmount(dailyCalories)) * 100}%` }} title="Protein" />
            <div className="bg-chart-2" style={{ width: `${(result.carbsCalories / parseAmount(dailyCalories)) * 100}%` }} title="Carbs" />
            <div className="bg-chart-3" style={{ width: `${(result.fatCalories / parseAmount(dailyCalories)) * 100}%` }} title="Fat" />
          </div>
          <p className="mt-4 text-sm text-muted">
            Per meal ({mealsPerDay}): {formatNumber(result.perMeal.protein, 0)}g protein, {formatNumber(result.perMeal.carbs, 0)}g carbs, {formatNumber(result.perMeal.fat, 0)}g fat
          </p>
        </ToolOutputPanel>
      )}

      <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">
        For informational purposes only. Not medical or dietary advice.
      </p>
    </div>
  );
};
