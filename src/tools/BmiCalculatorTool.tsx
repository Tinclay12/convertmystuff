"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { calculateBmi } from "@/lib/tools/logic/health-calculators";
import { formatNumber } from "@/lib/tools/logic/unit-conversions";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";

const parseAmount = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const BmiCalculatorTool = () => {
  const [unitSystem, setUnitSystem] = useState<"metric" | "us">("metric");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    if (!hasCalculated) return null;
    return calculateBmi({
      unitSystem,
      heightCm: parseAmount(heightCm),
      weightKg: parseAmount(weightKg),
      heightFeet: parseAmount(heightFeet),
      heightInches: parseAmount(heightInches),
      weightLbs: parseAmount(weightLbs),
    });
  }, [hasCalculated, unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs]);

  const handleCalculate = () => {
    setHasCalculated(true);
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "bmi-calculator",
      tool_category: "health-fitness-calculators",
    });
  };

  const bmiPosition = result?.ok ? Math.min(Math.max((result.bmi / 40) * 100, 0), 100) : 0;

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Body measurements">
        <ToolSelect
          label="Unit system"
          id="bmi-units"
          value={unitSystem}
          onChange={(e) => setUnitSystem(e.target.value as "metric" | "us")}
        >
          <option value="metric">Metric (cm / kg)</option>
          <option value="us">US (ft / in / lbs)</option>
        </ToolSelect>
        {unitSystem === "metric" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input label="Height (cm)" type="number" min="0" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="175" />
            <Input label="Weight (kg)" type="number" min="0" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="70" />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Input label="Height (ft)" type="number" min="0" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} placeholder="5" />
            <Input label="Height (in)" type="number" min="0" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} placeholder="9" />
            <Input label="Weight (lbs)" type="number" min="0" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="154" />
          </div>
        )}
        <div className="mt-4">
          <Button type="button" onClick={handleCalculate}>Calculate BMI</Button>
        </div>
      </ToolInputPanel>

      {result && !result.ok && <ToolErrorAlert message={result.error} />}

      {result?.ok && (
        <ToolOutputPanel actions={<CopyButton value={formatNumber(result.bmi, 1)} label="Copy BMI" />}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Your BMI</p>
              <p className="mt-1 text-3xl font-semibold">{formatNumber(result.bmi, 1)}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{result.category}</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Healthy weight range</p>
              <p className="mt-1 text-lg font-semibold">
                {unitSystem === "metric"
                  ? `${formatNumber(result.healthyWeightMinKg, 1)}–${formatNumber(result.healthyWeightMaxKg, 1)} kg`
                  : `${formatNumber(result.healthyWeightMinKg * 2.20462, 0)}–${formatNumber(result.healthyWeightMaxKg * 2.20462, 0)} lbs`}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-foreground">BMI scale</p>
            <div className="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-blue-200 via-green-300 via-40% via-yellow-300 via-70% to-red-400">
              <div
                className="absolute top-0 h-full w-1 -translate-x-1/2 bg-foreground"
                style={{ left: `${bmiPosition}%` }}
                aria-hidden
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted">
              <span>Under 18.5</span>
              <span>18.5–24.9</span>
              <span>25–29.9</span>
              <span>30+</span>
            </div>
          </div>
        </ToolOutputPanel>
      )}

      <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">
        For informational purposes only. Not medical advice. Consult a healthcare provider for personal guidance.
      </p>
    </div>
  );
};
