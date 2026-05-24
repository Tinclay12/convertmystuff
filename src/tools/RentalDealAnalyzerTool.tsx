"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import {
  analyzeRentalDeal,
  formatCurrency,
  formatPercent,
} from "@/lib/tools/logic/rental-deal-analyzer";
import { formatNumber } from "@/lib/tools/logic/unit-conversions";
import { buildShareUrl, parseUrlState, replaceUrlState } from "@/lib/tools/url-state";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";

const URL_KEYS = [
  "purchasePrice",
  "closingCosts",
  "rehabCosts",
  "squareFeet",
  "grossMonthlyRent",
  "otherMonthlyIncome",
  "vacancyRate",
  "propertyTax",
  "insurance",
  "hoa",
  "maintenance",
  "management",
  "utilities",
  "otherExpenses",
  "downPayment",
  "interestRate",
  "termYears",
  "interestOnly",
] as const;

const parseAmount = (value: string): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

const MetricCard = ({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "positive" | "negative" | "neutral";
}) => {
  const toneClass =
    tone === "positive"
      ? "text-success"
      : tone === "negative"
        ? "text-destructive"
        : "text-foreground";

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${toneClass}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
};

const getInitialUrlState = () => {
  if (typeof window === "undefined") {
    return { state: {}, hasParams: false };
  }
  const state = parseUrlState(window.location.search, [...URL_KEYS]);
  return { state, hasParams: Object.keys(state).length > 0 };
};

const readUrlField = (
  state: ReturnType<typeof parseUrlState>,
  key: string,
  fallback: string,
): string => {
  if (!(key in state)) {
    return fallback;
  }
  return String(state[key]);
};

export const RentalDealAnalyzerTool = () => {
  const initialUrl = getInitialUrlState();
  const [purchasePrice, setPurchasePrice] = useState(() =>
    readUrlField(initialUrl.state, "purchasePrice", ""),
  );
  const [closingCosts, setClosingCosts] = useState(() =>
    readUrlField(initialUrl.state, "closingCosts", "10000"),
  );
  const [rehabCosts, setRehabCosts] = useState(() =>
    readUrlField(initialUrl.state, "rehabCosts", "0"),
  );
  const [squareFeet, setSquareFeet] = useState(() =>
    readUrlField(initialUrl.state, "squareFeet", ""),
  );
  const [grossMonthlyRent, setGrossMonthlyRent] = useState(() =>
    readUrlField(initialUrl.state, "grossMonthlyRent", ""),
  );
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState(() =>
    readUrlField(initialUrl.state, "otherMonthlyIncome", "0"),
  );
  const [vacancyRate, setVacancyRate] = useState(() =>
    readUrlField(initialUrl.state, "vacancyRate", "5"),
  );
  const [propertyTax, setPropertyTax] = useState(() =>
    readUrlField(initialUrl.state, "propertyTax", "350"),
  );
  const [insurance, setInsurance] = useState(() =>
    readUrlField(initialUrl.state, "insurance", "150"),
  );
  const [hoa, setHoa] = useState(() => readUrlField(initialUrl.state, "hoa", "0"));
  const [maintenance, setMaintenance] = useState(() =>
    readUrlField(initialUrl.state, "maintenance", "200"),
  );
  const [management, setManagement] = useState(() =>
    readUrlField(initialUrl.state, "management", "280"),
  );
  const [utilities, setUtilities] = useState(() =>
    readUrlField(initialUrl.state, "utilities", "0"),
  );
  const [otherExpenses, setOtherExpenses] = useState(() =>
    readUrlField(initialUrl.state, "otherExpenses", "0"),
  );
  const [downPayment, setDownPayment] = useState(() =>
    readUrlField(initialUrl.state, "downPayment", ""),
  );
  const [interestRate, setInterestRate] = useState(() =>
    readUrlField(initialUrl.state, "interestRate", "6.5"),
  );
  const [termYears, setTermYears] = useState(() =>
    readUrlField(initialUrl.state, "termYears", "30"),
  );
  const [interestOnly, setInterestOnly] = useState(() => {
    const value = initialUrl.state.interestOnly;
    return value === true || value === "1";
  });
  const [shareUrl, setShareUrl] = useState("");
  const [hasCalculated, setHasCalculated] = useState(initialUrl.hasParams);

  const result = useMemo(() => {
    if (!hasCalculated) {
      return null;
    }
    return analyzeRentalDeal({
      purchasePrice: parseAmount(purchasePrice),
      closingCosts: parseAmount(closingCosts) || 0,
      rehabCosts: parseAmount(rehabCosts) || 0,
      squareFeet: squareFeet.trim() ? parseAmount(squareFeet) : undefined,
      grossMonthlyRent: parseAmount(grossMonthlyRent),
      otherMonthlyIncome: parseAmount(otherMonthlyIncome) || 0,
      vacancyRate: parseAmount(vacancyRate),
      propertyTax: parseAmount(propertyTax) || 0,
      insurance: parseAmount(insurance) || 0,
      hoa: parseAmount(hoa) || 0,
      maintenance: parseAmount(maintenance) || 0,
      management: parseAmount(management) || 0,
      utilities: parseAmount(utilities) || 0,
      otherExpenses: parseAmount(otherExpenses) || 0,
      downPayment: parseAmount(downPayment),
      interestRate: parseAmount(interestRate),
      termYears: parseAmount(termYears),
      interestOnly,
    });
  }, [
    hasCalculated,
    purchasePrice,
    closingCosts,
    rehabCosts,
    squareFeet,
    grossMonthlyRent,
    otherMonthlyIncome,
    vacancyRate,
    propertyTax,
    insurance,
    hoa,
    maintenance,
    management,
    utilities,
    otherExpenses,
    downPayment,
    interestRate,
    termYears,
    interestOnly,
  ]);

  const handleCalculate = () => {
    setHasCalculated(true);
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "rental-deal-analyzer",
      tool_category: "real-estate-calculators",
      mode: "analyze",
    });

    const state: Record<string, string | number | boolean> = {
      purchasePrice: parseAmount(purchasePrice),
      closingCosts: parseAmount(closingCosts) || 0,
      rehabCosts: parseAmount(rehabCosts) || 0,
      grossMonthlyRent: parseAmount(grossMonthlyRent),
      otherMonthlyIncome: parseAmount(otherMonthlyIncome) || 0,
      vacancyRate: parseAmount(vacancyRate),
      propertyTax: parseAmount(propertyTax) || 0,
      insurance: parseAmount(insurance) || 0,
      hoa: parseAmount(hoa) || 0,
      maintenance: parseAmount(maintenance) || 0,
      management: parseAmount(management) || 0,
      utilities: parseAmount(utilities) || 0,
      otherExpenses: parseAmount(otherExpenses) || 0,
      downPayment: parseAmount(downPayment),
      interestRate: parseAmount(interestRate),
      termYears: parseAmount(termYears),
      interestOnly,
    };
    if (squareFeet.trim()) {
      state.squareFeet = parseAmount(squareFeet);
    }

    replaceUrlState(
      "/real-estate-calculators/investment-metrics/rental-deal-analyzer/",
      state,
    );
    setShareUrl(
      buildShareUrl(
        "/real-estate-calculators/investment-metrics/rental-deal-analyzer/",
        state,
      ),
    );
  };

  const handleReset = () => {
    setPurchasePrice("");
    setClosingCosts("10000");
    setRehabCosts("0");
    setSquareFeet("");
    setGrossMonthlyRent("");
    setOtherMonthlyIncome("0");
    setVacancyRate("5");
    setPropertyTax("350");
    setInsurance("150");
    setHoa("0");
    setMaintenance("200");
    setManagement("280");
    setUtilities("0");
    setOtherExpenses("0");
    setDownPayment("");
    setInterestRate("6.5");
    setTermYears("30");
    setInterestOnly(false);
    setHasCalculated(false);
    setShareUrl("");
    replaceUrlState("/real-estate-calculators/investment-metrics/rental-deal-analyzer/", {});
  };

  const summaryText =
    result?.ok === true
      ? `Cash flow: ${formatCurrency(result.monthlyCashFlow)}/mo | Cap rate: ${formatPercent(result.capRate)} | CoC: ${formatPercent(result.cashOnCash)} | DSCR: ${result.dscr !== null ? formatNumber(result.dscr, 2) : "N/A"}`
      : "";

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Property & purchase">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Purchase price ($)" type="number" min="0" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="350000" />
          <Input label="Down payment ($)" type="number" min="0" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="70000" />
          <Input label="Closing costs ($)" type="number" min="0" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} placeholder="10000" />
          <Input label="Rehab / capex ($)" type="number" min="0" value={rehabCosts} onChange={(e) => setRehabCosts(e.target.value)} placeholder="0" />
          <Input label="Square footage (optional)" type="number" min="0" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} placeholder="1800" />
        </div>
      </ToolInputPanel>

      <ToolInputPanel title="Income">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Gross monthly rent ($)" type="number" min="0" value={grossMonthlyRent} onChange={(e) => setGrossMonthlyRent(e.target.value)} placeholder="2800" />
          <Input label="Other monthly income ($)" type="number" min="0" value={otherMonthlyIncome} onChange={(e) => setOtherMonthlyIncome(e.target.value)} placeholder="0" />
          <Input label="Vacancy rate (%)" type="number" min="0" max="100" value={vacancyRate} onChange={(e) => setVacancyRate(e.target.value)} placeholder="5" />
        </div>
      </ToolInputPanel>

      <ToolInputPanel title="Monthly operating expenses">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input label="Property tax ($/mo)" type="number" min="0" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} placeholder="350" />
          <Input label="Insurance ($/mo)" type="number" min="0" value={insurance} onChange={(e) => setInsurance(e.target.value)} placeholder="150" />
          <Input label="HOA ($/mo)" type="number" min="0" value={hoa} onChange={(e) => setHoa(e.target.value)} placeholder="0" />
          <Input label="Maintenance ($/mo)" type="number" min="0" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} placeholder="200" />
          <Input label="Management ($/mo)" type="number" min="0" value={management} onChange={(e) => setManagement(e.target.value)} placeholder="280" />
          <Input label="Utilities ($/mo)" type="number" min="0" value={utilities} onChange={(e) => setUtilities(e.target.value)} placeholder="0" />
          <Input label="Other ($/mo)" type="number" min="0" value={otherExpenses} onChange={(e) => setOtherExpenses(e.target.value)} placeholder="0" />
        </div>
      </ToolInputPanel>

      <ToolInputPanel title="Financing">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Interest rate (%)" type="number" min="0" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="6.5" />
          <Input label="Loan term (years)" type="number" min="1" value={termYears} onChange={(e) => setTermYears(e.target.value)} placeholder="30" />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={interestOnly} onChange={(e) => setInterestOnly(e.target.checked)} className="rounded border-border" />
          Interest-only loan
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" onClick={handleCalculate}>Analyze deal</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>Reset</Button>
        </div>
      </ToolInputPanel>

      {result && !result.ok && <ToolErrorAlert message={result.error} />}

      {result?.ok && (
        <ToolOutputPanel actions={shareUrl ? <CopyButton value={shareUrl} label="Copy share link" /> : undefined}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Monthly cash flow"
              value={formatCurrency(result.monthlyCashFlow)}
              hint={result.monthlyCashFlow >= 0 ? "Positive cash flow" : "Negative cash flow"}
              tone={result.monthlyCashFlow >= 0 ? "positive" : "negative"}
            />
            <MetricCard label="Cap rate" value={formatPercent(result.capRate)} hint="Unlevered yield (NOI ÷ price)" />
            <MetricCard label="Cash-on-cash" value={formatPercent(result.cashOnCash)} hint="Many investors target 8–12%" />
            <MetricCard
              label="DSCR"
              value={result.dscr !== null ? formatNumber(result.dscr, 2) : "N/A"}
              hint="Lenders often want ≥ 1.20–1.25"
            />
          </div>

          <div className="mt-6 overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full text-sm">
              <tbody>
                {[
                  ["Gross annual income", formatCurrency(result.grossAnnualIncome)],
                  ["Vacancy loss", formatCurrency(result.vacancyLoss)],
                  ["Effective gross income", formatCurrency(result.effectiveGrossIncome)],
                  ["Operating expenses (annual)", formatCurrency(result.annualOpEx)],
                  ["Net operating income (NOI)", formatCurrency(result.noi)],
                  ["Loan amount", formatCurrency(result.loanAmount)],
                  ["LTV", formatPercent(result.ltv)],
                  ["Monthly debt service", formatCurrency(result.monthlyDebtService)],
                  ["Annual cash flow", formatCurrency(result.annualCashFlow)],
                  ["Total cash invested", formatCurrency(result.totalCashInvested)],
                  ...(result.grm !== null ? [["GRM", formatNumber(result.grm, 2)]] : []),
                  ...(result.pricePerSqFt !== null ? [["Price per sq ft", formatCurrency(result.pricePerSqFt)]] : []),
                  ...(result.breakEvenOccupancy !== null
                    ? [["Break-even occupancy", formatPercent(result.breakEvenOccupancy)]]
                    : []),
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 text-muted">{label}</td>
                    <td className="px-4 py-2 text-right font-medium text-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {summaryText && (
            <p className="sr-only" aria-live="polite">{summaryText}</p>
          )}
        </ToolOutputPanel>
      )}

      <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">
        Estimates only. Not financial, tax, or legal advice. Cap rate excludes financing; DSCR uses NOI vs debt service.
      </p>
    </div>
  );
};
