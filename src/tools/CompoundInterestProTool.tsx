"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { calculateCompoundInterest } from "@/lib/tools/logic/finance-calculators";
import {
  buildCompoundInterestSchedule,
  scheduleToCsv,
} from "@/lib/tools/logic/compound-interest-pro";
import { formatNumber } from "@/lib/tools/logic/unit-conversions";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";

const TOOL_ID = "compound-interest-calculator";

const parseAmount = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

export const CompoundInterestProTool = () => {
  const [principal, setPrincipal] = useState("10000");
  const [annualRate, setAnnualRate] = useState("5");
  const [years, setYears] = useState("10");
  const [compoundsPerYear, setCompoundsPerYear] = useState("12");
  const [error, setError] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);

  const values = useMemo(
    () => ({
      principal: parseAmount(principal),
      annualRate: parseAmount(annualRate),
      years: parseAmount(years),
      compoundsPerYear: parseAmount(compoundsPerYear),
    }),
    [principal, annualRate, years, compoundsPerYear],
  );

  const result = useMemo(() => calculateCompoundInterest(values), [values]);

  const schedule = useMemo(() => {
    if (!hasCalculated || !result.ok) {
      return [];
    }
    return buildCompoundInterestSchedule(
      values.principal,
      values.annualRate,
      Math.min(Math.max(Math.floor(values.years), 1), 50),
      Math.max(Math.floor(values.compoundsPerYear), 1),
    );
  }, [hasCalculated, result.ok, values]);

  const handleCalculate = () => {
    setHasCalculated(true);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    trackFlagshipEvent("flagship_calculate", {
      tool_id: TOOL_ID,
      tool_category: "finance-calculators",
      mode: "schedule",
    });
  };

  const csvExport = schedule.length > 0 ? scheduleToCsv(schedule) : "";
  const maxBalance = schedule.length > 0 ? Math.max(...schedule.map((row) => row.balance)) : 0;

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Investment inputs">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Principal ($)" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <Input label="Annual rate (%)" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} />
          <Input label="Years" value={years} onChange={(e) => setYears(e.target.value)} />
          <Input
            label="Compounds per year"
            value={compoundsPerYear}
            onChange={(e) => setCompoundsPerYear(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Button type="button" onClick={handleCalculate}>
            Calculate growth
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      {hasCalculated && result.ok && (
        <>
          <ToolOutputPanel
            actions={
              <>
                <CopyButton value={result.output} />
                {csvExport && (
                  <DownloadButton content={csvExport} filename="compound-interest-schedule.csv" />
                )}
              </>
            }
          >
            <ul className="space-y-2 text-sm">
              {result.resultLines?.map((line) => (
                <li key={line.label} className="flex justify-between gap-4 border-b border-border py-2">
                  <span className="text-muted">{line.label}</span>
                  <span className="font-medium tabular-nums">{line.value}</span>
                </li>
              ))}
            </ul>
          </ToolOutputPanel>
          {schedule.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-display text-lg font-semibold text-foreground">Growth by year</h3>
              <div className="mt-4 flex items-end gap-1 h-32" aria-hidden>
                {schedule.map((row) => (
                  <div
                    key={row.year}
                    className="flex-1 rounded-t bg-primary/70"
                    style={{ height: `${Math.max(8, (row.balance / maxBalance) * 100)}%` }}
                    title={`Year ${row.year}: $${formatNumber(row.balance, 0)}`}
                  />
                ))}
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted">
                      <th className="py-2 pr-4">Year</th>
                      <th className="py-2 pr-4">Balance</th>
                      <th className="py-2">Interest earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr key={row.year} className="border-b border-border/60">
                        <td className="py-2 pr-4 tabular-nums">{row.year}</td>
                        <td className="py-2 pr-4 tabular-nums">${formatNumber(row.balance, 2)}</td>
                        <td className="py-2 tabular-nums">${formatNumber(row.interestEarned, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
