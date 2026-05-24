import type { LogicResult } from "./unit-conversions";
import { formatNumber } from "./unit-conversions";

type RealEstateInput = Record<string, number>;

const requireFields = (
  values: RealEstateInput,
  fields: string[],
): LogicResult | null => {
  for (const field of fields) {
    if (!Number.isFinite(values[field]) || values[field] < 0) {
      return { ok: false, error: `Enter a valid ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.` };
    }
  }
  return null;
};

export const calculateCashOnCash = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["annualCashFlow", "totalCashInvested"]);
  if (error) return error;
  if (values.totalCashInvested === 0) {
    return { ok: false, error: "Total cash invested must be greater than zero." };
  }

  const rate = (values.annualCashFlow / values.totalCashInvested) * 100;
  return {
    ok: true,
    output: `Cash-on-cash return: ${formatNumber(rate, 2)}%`,
    meta: { rate },
  };
};

export const calculateRoi = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["gain", "cost"]);
  if (error) return error;
  if (values.cost === 0) {
    return { ok: false, error: "Cost must be greater than zero." };
  }

  const roi = (values.gain / values.cost) * 100;
  return {
    ok: true,
    output: `ROI: ${formatNumber(roi, 2)}%`,
    meta: { roi },
  };
};

export const calculateMortgage = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["loanAmount", "annualRate", "termYears"]);
  if (error) return error;

  const monthlyRate = values.annualRate / 100 / 12;
  const payments = values.termYears * 12;
  const payment =
    monthlyRate === 0
      ? values.loanAmount / payments
      : (values.loanAmount * monthlyRate) / (1 - (1 + monthlyRate) ** -payments);

  return {
    ok: true,
    output: `Estimated monthly payment: $${formatNumber(payment, 2)}`,
    meta: { payment },
  };
};

export const calculateLtv = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["loanAmount", "propertyValue"]);
  if (error) return error;
  if (values.propertyValue === 0) {
    return { ok: false, error: "Property value must be greater than zero." };
  }

  const ltv = (values.loanAmount / values.propertyValue) * 100;
  return {
    ok: true,
    output: `Loan-to-value (LTV): ${formatNumber(ltv, 2)}%`,
    meta: { ltv },
  };
};

export const calculatePricePerSquareFoot = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["price", "squareFeet"]);
  if (error) return error;
  if (values.squareFeet === 0) {
    return { ok: false, error: "Square footage must be greater than zero." };
  }

  const pricePerSqFt = values.price / values.squareFeet;
  return {
    ok: true,
    output: `Price per square foot: $${formatNumber(pricePerSqFt, 2)}`,
    meta: { pricePerSqFt },
  };
};

export const calculatePropertyTax = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["assessedValue", "taxRate"]);
  if (error) return error;

  const annualTax = values.assessedValue * (values.taxRate / 100);
  return {
    ok: true,
    output: `Estimated annual property tax: $${formatNumber(annualTax, 2)}`,
    meta: { annualTax },
  };
};

export const calculateNoi = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["grossIncome", "vacancyRate", "operatingExpenses"]);
  if (error) return error;
  if (values.vacancyRate > 100) {
    return { ok: false, error: "Vacancy rate cannot exceed 100%." };
  }

  const vacancyLoss = values.grossIncome * (values.vacancyRate / 100);
  const noi = values.grossIncome - vacancyLoss - values.operatingExpenses;

  return {
    ok: true,
    output: `Net Operating Income (NOI): $${formatNumber(noi, 2)}`,
    meta: { noi, vacancyLoss },
  };
};

export const calculateGrm = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["propertyValue", "grossAnnualRent"]);
  if (error) return error;
  if (values.grossAnnualRent === 0) {
    return { ok: false, error: "Gross annual rent must be greater than zero." };
  }

  const grm = values.propertyValue / values.grossAnnualRent;
  return {
    ok: true,
    output: `Gross Rent Multiplier (GRM): ${formatNumber(grm, 2)}`,
    meta: { grm },
  };
};

export const calculateDscr = (values: RealEstateInput): LogicResult => {
  const error = requireFields(values, ["noi", "annualDebtService"]);
  if (error) return error;
  if (values.annualDebtService === 0) {
    return { ok: false, error: "Annual debt service must be greater than zero." };
  }

  const dscr = values.noi / values.annualDebtService;
  return {
    ok: true,
    output: `Debt Service Coverage Ratio (DSCR): ${formatNumber(dscr, 2)}`,
    meta: { dscr },
  };
};

export type CalculatorField = {
  key: string;
  label: string;
  placeholder: string;
  step?: string;
};

export type RealEstateCalculatorConfig = {
  fields: CalculatorField[];
  calculate: (values: RealEstateInput) => LogicResult;
  disclaimer?: string;
};

export const realEstateCalculatorConfigs: Record<string, RealEstateCalculatorConfig> = {
  "cash-on-cash-calculator": {
    fields: [
      { key: "annualCashFlow", label: "Annual pre-tax cash flow ($)", placeholder: "12000" },
      { key: "totalCashInvested", label: "Total cash invested ($)", placeholder: "100000" },
    ],
    calculate: calculateCashOnCash,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "roi-calculator": {
    fields: [
      { key: "gain", label: "Net gain ($)", placeholder: "50000" },
      { key: "cost", label: "Total cost ($)", placeholder: "200000" },
    ],
    calculate: calculateRoi,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "mortgage-calculator": {
    fields: [
      { key: "loanAmount", label: "Loan amount ($)", placeholder: "350000" },
      { key: "annualRate", label: "Annual interest rate (%)", placeholder: "6.5", step: "0.01" },
      { key: "termYears", label: "Term (years)", placeholder: "30" },
    ],
    calculate: calculateMortgage,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "loan-to-value-calculator": {
    fields: [
      { key: "loanAmount", label: "Loan amount ($)", placeholder: "280000" },
      { key: "propertyValue", label: "Property value ($)", placeholder: "350000" },
    ],
    calculate: calculateLtv,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "price-per-square-foot": {
    fields: [
      { key: "price", label: "Property price ($)", placeholder: "450000" },
      { key: "squareFeet", label: "Square footage", placeholder: "1800" },
    ],
    calculate: calculatePricePerSquareFoot,
  },
  "property-tax-estimator": {
    fields: [
      { key: "assessedValue", label: "Assessed value ($)", placeholder: "300000" },
      { key: "taxRate", label: "Tax rate (%)", placeholder: "1.2", step: "0.01" },
    ],
    calculate: calculatePropertyTax,
    disclaimer: "Estimate only. Actual tax rates vary by jurisdiction.",
  },
  "noi-calculator": {
    fields: [
      { key: "grossIncome", label: "Gross annual income ($)", placeholder: "60000" },
      { key: "vacancyRate", label: "Vacancy rate (%)", placeholder: "5", step: "0.1" },
      { key: "operatingExpenses", label: "Operating expenses ($)", placeholder: "12000" },
    ],
    calculate: calculateNoi,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "grm-calculator": {
    fields: [
      { key: "propertyValue", label: "Property value ($)", placeholder: "500000" },
      { key: "grossAnnualRent", label: "Gross annual rent ($)", placeholder: "48000" },
    ],
    calculate: calculateGrm,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "dscr-calculator": {
    fields: [
      { key: "noi", label: "Net operating income ($)", placeholder: "45000" },
      { key: "annualDebtService", label: "Annual debt service ($)", placeholder: "36000" },
    ],
    calculate: calculateDscr,
    disclaimer: "Estimate only. Not financial advice.",
  },
};
