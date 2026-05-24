"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import {
  calculateCalories,
  type ActivityLevel,
  type WeightGoal,
} from "@/lib/tools/logic/health-calculators";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";

const parseAmount = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const CalorieCalculatorTool = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<WeightGoal>("maintain");
  const [weeklyChangeLbs, setWeeklyChangeLbs] = useState("1");
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    if (!hasCalculated) return null;
    return calculateCalories({
      age: parseAmount(age),
      sex,
      heightCm: parseAmount(heightCm),
      weightKg: parseAmount(weightKg),
      activityLevel,
      goal,
      weeklyChangeLbs: parseAmount(weeklyChangeLbs) || 0,
    });
  }, [hasCalculated, age, sex, heightCm, weightKg, activityLevel, goal, weeklyChangeLbs]);

  const handleCalculate = () => {
    setHasCalculated(true);
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "calorie-calculator",
      tool_category: "health-fitness-calculators",
    });
  };

  const macroLink =
    result?.ok === true
      ? `/health-fitness-calculators/nutrition/macro-calculator/?calories=${Math.round(result.targetCalories)}`
      : "";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Your profile">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Age" type="number" min="13" max="120" value={age} onChange={(e) => setAge(e.target.value)} placeholder="30" />
          <ToolSelect label="Sex" id="calorie-sex" value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </ToolSelect>
          <Input label="Height (cm)" type="number" min="0" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="175" />
          <Input label="Weight (kg)" type="number" min="0" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="70" />
          <ToolSelect label="Activity level" id="activity" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}>
            <option value="sedentary">Sedentary (little exercise)</option>
            <option value="light">Light (1–3 days/week)</option>
            <option value="moderate">Moderate (3–5 days/week)</option>
            <option value="active">Active (6–7 days/week)</option>
            <option value="extra">Extra active (physical job + exercise)</option>
          </ToolSelect>
          <ToolSelect label="Goal" id="goal" value={goal} onChange={(e) => setGoal(e.target.value as WeightGoal)}>
            <option value="lose">Lose weight</option>
            <option value="maintain">Maintain weight</option>
            <option value="gain">Gain weight</option>
          </ToolSelect>
          {goal !== "maintain" && (
            <Input label="Weekly change (lbs)" type="number" min="0" step="0.5" value={weeklyChangeLbs} onChange={(e) => setWeeklyChangeLbs(e.target.value)} placeholder="1" />
          )}
        </div>
        <div className="mt-4">
          <Button type="button" onClick={handleCalculate}>Calculate calories</Button>
        </div>
      </ToolInputPanel>

      {result && !result.ok && <ToolErrorAlert message={result.error} />}
      {result?.ok && result.warning && (
        <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">{result.warning}</p>
      )}

      {result?.ok && (
        <ToolOutputPanel
          actions={
            <>
              <CopyButton value={String(Math.round(result.targetCalories))} label="Copy target calories" />
              {macroLink && (
                <a href={macroLink} className="inline-flex items-center rounded-lg bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80">
                  Open macro calculator
                </a>
              )}
            </>
          }
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">BMR</p>
              <p className="mt-1 text-2xl font-semibold">{Math.round(result.bmr)} cal</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">TDEE (maintenance)</p>
              <p className="mt-1 text-2xl font-semibold">{Math.round(result.tdee)} cal</p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
              <p className="text-sm text-muted">Target daily calories</p>
              <p className="mt-1 text-2xl font-semibold">{Math.round(result.targetCalories)} cal</p>
            </div>
          </div>
          {goal !== "maintain" && (
            <p className="mt-3 text-sm text-muted">
              Daily {goal === "lose" ? "deficit" : "surplus"}: ~{Math.round(result.dailyAdjustment)} calories
            </p>
          )}
        </ToolOutputPanel>
      )}

      <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">
        Uses Mifflin-St Jeor equation. For informational purposes only — not medical advice.
      </p>
    </div>
  );
};
