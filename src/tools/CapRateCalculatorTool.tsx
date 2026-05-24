"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { calculateCapRate } from "@/lib/tools/logic/cap-rate-calculator";

const parseAmount = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const CapRateCalculatorTool = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [grossIncome, setGrossIncome] = useState("");
  const [vacancyRate, setVacancyRate] = useState("5");
  const [operatingExpenses, setOperatingExpenses] = useState("");

  const result = useMemo(
    () =>
      calculateCapRate({
        propertyValue: parseAmount(propertyValue),
        grossIncome: parseAmount(grossIncome),
        vacancyRate: parseAmount(vacancyRate),
        operatingExpenses: parseAmount(operatingExpenses),
      }),
    [propertyValue, grossIncome, vacancyRate, operatingExpenses],
  );

  const handleReset = () => {
    setPropertyValue("");
    setGrossIncome("");
    setVacancyRate("5");
    setOperatingExpenses("");
  };

  const hasInput =
    propertyValue.trim() || grossIncome.trim() || operatingExpenses.trim();

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Property details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Property value"
            type="number"
            min="0"
            value={propertyValue}
            onChange={(event) => setPropertyValue(event.target.value)}
            placeholder="500000"
          />
          <Input
            label="Gross income"
            type="number"
            min="0"
            value={grossIncome}
            onChange={(event) => setGrossIncome(event.target.value)}
            placeholder="60000"
          />
          <Input
            label="Vacancy rate (%)"
            type="number"
            min="0"
            max="100"
            value={vacancyRate}
            onChange={(event) => setVacancyRate(event.target.value)}
            placeholder="5"
          />
          <Input
            label="Operating expenses"
            type="number"
            min="0"
            value={operatingExpenses}
            onChange={(event) => setOperatingExpenses(event.target.value)}
            placeholder="12000"
          />
        </div>
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>

      {!result.ok && hasInput && <ToolErrorAlert message={result.error} />}

      {result.ok && (
        <ToolOutputPanel
          actions={<CopyButton value={result.capRatePercent} label="Copy cap rate" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Net operating income (NOI)</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {result.noi.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Estimated cap rate</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {result.capRatePercent}
              </p>
            </div>
          </div>
        </ToolOutputPanel>
      )}

      <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">
        This calculator provides an estimate only and is not financial advice.
      </p>
    </div>
  );
};
