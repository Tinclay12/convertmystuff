"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import {
  calculateAffordability,
  calculateMortgagePayment,
  formatMortgageCurrency,
  scheduleToCsv,
  type MortgageMode,
} from "@/lib/tools/logic/mortgage-calculator-pro";
import { formatNumber } from "@/lib/tools/logic/unit-conversions";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";

const parseAmount = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

const MODES: { id: MortgageMode; label: string }[] = [
  { id: "payment", label: "Payment" },
  { id: "amortization", label: "Amortization" },
  { id: "extra", label: "Extra payments" },
  { id: "affordability", label: "Affordability" },
];

export const MortgageCalculatorProTool = () => {
  const [mode, setMode] = useState<MortgageMode>("payment");
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState("4200");
  const [insuranceAnnual, setInsuranceAnnual] = useState("1800");
  const [pmiMonthly, setPmiMonthly] = useState("");
  const [hoaMonthly, setHoaMonthly] = useState("0");
  const [extraMonthly, setExtraMonthly] = useState("0");
  const [lumpSum, setLumpSum] = useState("0");
  const [lumpSumMonth, setLumpSumMonth] = useState("12");
  const [annualIncome, setAnnualIncome] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("0");
  const [targetDti, setTargetDti] = useState("36");
  const [downPaymentAvailable, setDownPaymentAvailable] = useState("");
  const [estimatedEscrow, setEstimatedEscrow] = useState("400");
  const [showAllRows, setShowAllRows] = useState(false);

  const paymentResult = useMemo(() => {
    if (mode === "affordability") {
      return null;
    }
    return calculateMortgagePayment({
      homePrice: parseAmount(homePrice),
      downPayment: parseAmount(downPayment),
      interestRate: parseAmount(interestRate),
      termYears: parseAmount(termYears),
      propertyTaxAnnual: parseAmount(propertyTaxAnnual) || 0,
      insuranceAnnual: parseAmount(insuranceAnnual) || 0,
      pmiMonthly: pmiMonthly.trim() ? parseAmount(pmiMonthly) : 0,
      hoaMonthly: parseAmount(hoaMonthly) || 0,
      extraMonthly: mode === "extra" ? parseAmount(extraMonthly) || 0 : 0,
      lumpSum: mode === "extra" ? parseAmount(lumpSum) || 0 : 0,
      lumpSumMonth: mode === "extra" ? parseAmount(lumpSumMonth) || 0 : 0,
    });
  }, [
    mode,
    homePrice,
    downPayment,
    interestRate,
    termYears,
    propertyTaxAnnual,
    insuranceAnnual,
    pmiMonthly,
    hoaMonthly,
    extraMonthly,
    lumpSum,
    lumpSumMonth,
  ]);

  const affordabilityResult = useMemo(() => {
    if (mode !== "affordability") {
      return null;
    }
    return calculateAffordability({
      annualIncome: parseAmount(annualIncome),
      monthlyDebts: parseAmount(monthlyDebts) || 0,
      targetDti: parseAmount(targetDti),
      downPaymentAvailable: parseAmount(downPaymentAvailable),
      interestRate: parseAmount(interestRate),
      termYears: parseAmount(termYears),
      estimatedEscrow: parseAmount(estimatedEscrow) || 0,
    });
  }, [
    mode,
    annualIncome,
    monthlyDebts,
    targetDti,
    downPaymentAvailable,
    interestRate,
    termYears,
    estimatedEscrow,
  ]);

  const handleCalculate = () => {
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "mortgage-calculator-pro",
      tool_category: "finance-calculators",
      mode,
    });
  };

  const handleReset = () => {
    setHomePrice("");
    setDownPayment("");
    setInterestRate("6.5");
    setTermYears("30");
    setPropertyTaxAnnual("4200");
    setInsuranceAnnual("1800");
    setPmiMonthly("");
    setHoaMonthly("0");
    setExtraMonthly("0");
    setLumpSum("0");
    setLumpSumMonth("12");
    setAnnualIncome("");
    setMonthlyDebts("0");
    setTargetDti("36");
    setDownPaymentAvailable("");
    setEstimatedEscrow("400");
    setShowAllRows(false);
  };

  const scheduleRows =
    paymentResult?.ok === true
      ? showAllRows
        ? paymentResult.schedule
        : paymentResult.schedule.slice(0, 12)
      : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculator mode">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={mode === item.id}
            onClick={() => setMode(item.id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              mode === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-panel-muted text-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {mode !== "affordability" ? (
        <ToolInputPanel title="Loan details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Home price ($)" type="number" min="0" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="450000" />
            <Input label="Down payment ($)" type="number" min="0" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="90000" />
            <Input label="Interest rate (%)" type="number" min="0" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="6.5" />
            <Input label="Loan term (years)" type="number" min="1" value={termYears} onChange={(e) => setTermYears(e.target.value)} placeholder="30" />
            <Input label="Property tax (annual $)" type="number" min="0" value={propertyTaxAnnual} onChange={(e) => setPropertyTaxAnnual(e.target.value)} placeholder="4200" />
            <Input label="Insurance (annual $)" type="number" min="0" value={insuranceAnnual} onChange={(e) => setInsuranceAnnual(e.target.value)} placeholder="1800" />
            <Input label="PMI (monthly $, optional)" type="number" min="0" value={pmiMonthly} onChange={(e) => setPmiMonthly(e.target.value)} placeholder="Auto if LTV > 80%" />
            <Input label="HOA (monthly $)" type="number" min="0" value={hoaMonthly} onChange={(e) => setHoaMonthly(e.target.value)} placeholder="0" />
          </div>
          {mode === "extra" && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Input label="Extra monthly ($)" type="number" min="0" value={extraMonthly} onChange={(e) => setExtraMonthly(e.target.value)} placeholder="200" />
              <Input label="One-time lump sum ($)" type="number" min="0" value={lumpSum} onChange={(e) => setLumpSum(e.target.value)} placeholder="5000" />
              <Input label="Lump sum at payment #" type="number" min="1" value={lumpSumMonth} onChange={(e) => setLumpSumMonth(e.target.value)} placeholder="12" />
            </div>
          )}
        </ToolInputPanel>
      ) : (
        <ToolInputPanel title="Affordability inputs">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Annual gross income ($)" type="number" min="0" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} placeholder="120000" />
            <Input label="Monthly debts ($)" type="number" min="0" value={monthlyDebts} onChange={(e) => setMonthlyDebts(e.target.value)} placeholder="500" />
            <Input label="Target DTI (%)" type="number" min="1" max="100" value={targetDti} onChange={(e) => setTargetDti(e.target.value)} placeholder="36" />
            <Input label="Down payment available ($)" type="number" min="0" value={downPaymentAvailable} onChange={(e) => setDownPaymentAvailable(e.target.value)} placeholder="60000" />
            <Input label="Interest rate (%)" type="number" min="0" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="6.5" />
            <Input label="Loan term (years)" type="number" min="1" value={termYears} onChange={(e) => setTermYears(e.target.value)} placeholder="30" />
            <Input label="Est. tax + insurance + HOA ($/mo)" type="number" min="0" value={estimatedEscrow} onChange={(e) => setEstimatedEscrow(e.target.value)} placeholder="400" />
          </div>
        </ToolInputPanel>
      )}

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={handleCalculate}>Calculate</Button>
        <Button type="button" variant="secondary" onClick={handleReset}>Reset</Button>
      </div>

      {paymentResult && !paymentResult.ok && homePrice.trim() && (
        <ToolErrorAlert message={paymentResult.error} />
      )}
      {affordabilityResult && !affordabilityResult.ok && annualIncome.trim() && (
        <ToolErrorAlert message={affordabilityResult.error} />
      )}

      {paymentResult?.ok && mode !== "affordability" && homePrice.trim() && (
        <ToolOutputPanel
          actions={
            paymentResult.schedule.length > 0 ? (
              <>
                <DownloadButton
                  content={scheduleToCsv(paymentResult.schedule)}
                  filename="amortization-schedule.csv"
                  mimeType="text/csv;charset=utf-8"
                />
                <CopyButton
                  value={formatMortgageCurrency(paymentResult.totalMonthly)}
                  label="Copy total payment"
                />
              </>
            ) : undefined
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Principal & interest</p>
              <p className="mt-1 text-xl font-semibold">{formatMortgageCurrency(paymentResult.principalAndInterest)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Tax + insurance + PMI + HOA</p>
              <p className="mt-1 text-xl font-semibold">
                {formatMortgageCurrency(
                  paymentResult.monthlyTax +
                    paymentResult.monthlyInsurance +
                    paymentResult.pmiMonthly +
                    paymentResult.hoaMonthly,
                )}
              </p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
              <p className="text-sm text-muted">Total monthly (PITI+HOA)</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {formatMortgageCurrency(paymentResult.totalMonthly)}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted">
            Loan: {formatMortgageCurrency(paymentResult.loanAmount)} · LTV: {formatNumber(paymentResult.ltv, 1)}% ·
            Total interest: {formatMortgageCurrency(paymentResult.totalInterest)} ·
            Payments: {paymentResult.schedule.length}
          </p>

          {(mode === "amortization" || mode === "extra") && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Amortization schedule</h3>
                {paymentResult.schedule.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowAllRows((value) => !value)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {showAllRows ? "Show first 12" : `Show all ${paymentResult.schedule.length}`}
                  </button>
                )}
              </div>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-3 py-2 text-left font-medium">#</th>
                      <th className="px-3 py-2 text-right font-medium">Payment</th>
                      <th className="px-3 py-2 text-right font-medium">Principal</th>
                      <th className="px-3 py-2 text-right font-medium">Interest</th>
                      <th className="px-3 py-2 text-right font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleRows.map((row) => (
                      <tr key={row.paymentNumber} className="border-b border-border last:border-0">
                        <td className="px-3 py-2">{row.paymentNumber}</td>
                        <td className="px-3 py-2 text-right">{formatMortgageCurrency(row.payment)}</td>
                        <td className="px-3 py-2 text-right">{formatMortgageCurrency(row.principal)}</td>
                        <td className="px-3 py-2 text-right">{formatMortgageCurrency(row.interest)}</td>
                        <td className="px-3 py-2 text-right">{formatMortgageCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </ToolOutputPanel>
      )}

      {affordabilityResult?.ok && mode === "affordability" && annualIncome.trim() && (
        <ToolOutputPanel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Max affordable payment (P&I)</p>
              <p className="mt-1 text-2xl font-semibold">{formatMortgageCurrency(affordabilityResult.maxMonthlyPayment)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Max home price</p>
              <p className="mt-1 text-2xl font-semibold">{formatMortgageCurrency(affordabilityResult.maxHomePrice)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">Max loan amount</p>
              <p className="mt-1 text-xl font-semibold">{formatMortgageCurrency(affordabilityResult.maxLoanAmount)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted">DTI at max payment</p>
              <p className="mt-1 text-xl font-semibold">{formatNumber(affordabilityResult.actualDti, 1)}%</p>
            </div>
          </div>
        </ToolOutputPanel>
      )}

      <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">
        Estimates only. Not financial advice. PMI is auto-estimated when LTV exceeds 80% unless you enter a custom amount.
      </p>
    </div>
  );
};
