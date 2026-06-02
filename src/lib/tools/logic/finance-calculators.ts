import type { LogicResult } from "./unit-conversions";
import { formatNumber } from "./unit-conversions";

type FinanceInput = Record<string, number>;

const requireFields = (
  values: FinanceInput,
  fields: string[],
): LogicResult | null => {
  for (const field of fields) {
    if (!Number.isFinite(values[field]) || values[field] < 0) {
      return {
        ok: false,
        error: `Enter a valid ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
      };
    }
  }
  return null;
};

export const calculatePercentage = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["value", "percent"]);
  if (error) return error;

  const result = values.value * (values.percent / 100);
  return {
    ok: true,
    output: `${formatNumber(values.percent, 2)}% of ${formatNumber(values.value, 2)} = ${formatNumber(result, 2)}`,
    resultLines: [{ label: "Calculated amount", value: formatNumber(result, 2) }],
    meta: { result },
  };
};

export const calculateTip = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["billAmount", "tipPercent", "people"]);
  if (error) return error;
  if (values.people === 0) {
    return { ok: false, error: "Number of people must be at least 1." };
  }

  const tipAmount = values.billAmount * (values.tipPercent / 100);
  const total = values.billAmount + tipAmount;
  const perPerson = total / values.people;

  return {
    ok: true,
    output: `Tip: $${formatNumber(tipAmount, 2)} | Total: $${formatNumber(total, 2)} | Per person: $${formatNumber(perPerson, 2)}`,
    resultLines: [
      { label: "Tip amount", value: `$${formatNumber(tipAmount, 2)}` },
      { label: "Bill total", value: `$${formatNumber(total, 2)}` },
      { label: "Per person", value: `$${formatNumber(perPerson, 2)}` },
    ],
    meta: { tipAmount, total, perPerson },
  };
};

export const calculateDiscount = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["originalPrice", "discountPercent"]);
  if (error) return error;
  if (values.discountPercent > 100) {
    return { ok: false, error: "Discount cannot exceed 100%." };
  }

  const discountAmount = values.originalPrice * (values.discountPercent / 100);
  const finalPrice = values.originalPrice - discountAmount;

  return {
    ok: true,
    output: `Discount: $${formatNumber(discountAmount, 2)} | Sale price: $${formatNumber(finalPrice, 2)}`,
    resultLines: [
      { label: "Discount amount", value: `$${formatNumber(discountAmount, 2)}` },
      { label: "Sale price", value: `$${formatNumber(finalPrice, 2)}` },
    ],
    meta: { discountAmount, finalPrice },
  };
};

export const calculateMargin = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["cost", "price"]);
  if (error) return error;
  if (values.price === 0) {
    return { ok: false, error: "Price must be greater than zero." };
  }

  const margin = ((values.price - values.cost) / values.price) * 100;
  const profit = values.price - values.cost;

  return {
    ok: true,
    output: `Profit: $${formatNumber(profit, 2)} | Margin: ${formatNumber(margin, 2)}%`,
    resultLines: [
      { label: "Profit", value: `$${formatNumber(profit, 2)}` },
      { label: "Margin", value: `${formatNumber(margin, 2)}%` },
    ],
    meta: { margin, profit },
  };
};

export const calculateMarkup = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["cost", "markupPercent"]);
  if (error) return error;
  if (values.cost === 0) {
    return { ok: false, error: "Cost must be greater than zero." };
  }

  const price = values.cost * (1 + values.markupPercent / 100);
  const markupAmount = price - values.cost;

  return {
    ok: true,
    output: `Markup amount: $${formatNumber(markupAmount, 2)} | Selling price: $${formatNumber(price, 2)}`,
    resultLines: [
      { label: "Markup amount", value: `$${formatNumber(markupAmount, 2)}` },
      { label: "Selling price", value: `$${formatNumber(price, 2)}` },
    ],
    meta: { price, markupAmount },
  };
};

export const calculateCompoundInterest = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["principal", "annualRate", "years", "compoundsPerYear"]);
  if (error) return error;
  if (values.compoundsPerYear === 0) {
    return { ok: false, error: "Compounds per year must be at least 1." };
  }

  const rate = values.annualRate / 100;
  const amount =
    values.principal *
    (1 + rate / values.compoundsPerYear) ** (values.compoundsPerYear * values.years);
  const interest = amount - values.principal;

  return {
    ok: true,
    output: `Future value: $${formatNumber(amount, 2)} | Interest earned: $${formatNumber(interest, 2)}`,
    resultLines: [
      { label: "Future value", value: `$${formatNumber(amount, 2)}` },
      { label: "Interest earned", value: `$${formatNumber(interest, 2)}` },
    ],
    meta: { amount, interest },
  };
};

export const calculateLoanPayment = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["loanAmount", "annualRate", "termYears"]);
  if (error) return error;
  if (values.termYears === 0) {
    return { ok: false, error: "Term must be greater than zero." };
  }

  const monthlyRate = values.annualRate / 100 / 12;
  const payments = values.termYears * 12;
  const payment =
    monthlyRate === 0
      ? values.loanAmount / payments
      : (values.loanAmount * monthlyRate) / (1 - (1 + monthlyRate) ** -payments);
  const totalPaid = payment * payments;

  return {
    ok: true,
    output: `Monthly payment: $${formatNumber(payment, 2)} | Total paid: $${formatNumber(totalPaid, 2)}`,
    resultLines: [
      { label: "Monthly payment", value: `$${formatNumber(payment, 2)}` },
      { label: "Total paid", value: `$${formatNumber(totalPaid, 2)}` },
    ],
    meta: { payment, totalPaid },
  };
};

export const calculateBreakEven = (values: FinanceInput): LogicResult => {
  const error = requireFields(values, ["fixedCosts", "pricePerUnit", "variableCostPerUnit"]);
  if (error) return error;

  const contribution = values.pricePerUnit - values.variableCostPerUnit;
  if (contribution <= 0) {
    return {
      ok: false,
      error: "Price per unit must exceed variable cost per unit.",
    };
  }

  const units = values.fixedCosts / contribution;
  return {
    ok: true,
    output: `Break-even units: ${formatNumber(units, 2)}`,
    resultLines: [{ label: "Break-even units", value: formatNumber(units, 2) }],
    meta: { units },
  };
};

export type CalculatorField = {
  key: string;
  label: string;
  placeholder: string;
  step?: string;
};

export type FinanceCalculatorConfig = {
  fields: CalculatorField[];
  calculate: (values: FinanceInput) => LogicResult;
  disclaimer?: string;
};

export const financeCalculatorConfigs: Record<string, FinanceCalculatorConfig> = {
  "percentage-calculator": {
    fields: [
      { key: "value", label: "Value", placeholder: "200" },
      { key: "percent", label: "Percent (%)", placeholder: "15", step: "0.01" },
    ],
    calculate: calculatePercentage,
  },
  "tip-calculator": {
    fields: [
      { key: "billAmount", label: "Bill amount ($)", placeholder: "85" },
      { key: "tipPercent", label: "Tip (%)", placeholder: "18", step: "0.1" },
      { key: "people", label: "People splitting", placeholder: "2" },
    ],
    calculate: calculateTip,
  },
  "discount-calculator": {
    fields: [
      { key: "originalPrice", label: "Original price ($)", placeholder: "120" },
      { key: "discountPercent", label: "Discount (%)", placeholder: "25", step: "0.1" },
    ],
    calculate: calculateDiscount,
  },
  "margin-calculator": {
    fields: [
      { key: "cost", label: "Cost ($)", placeholder: "40" },
      { key: "price", label: "Selling price ($)", placeholder: "75" },
    ],
    calculate: calculateMargin,
  },
  "markup-calculator": {
    fields: [
      { key: "cost", label: "Cost ($)", placeholder: "40" },
      { key: "markupPercent", label: "Markup (%)", placeholder: "50", step: "0.1" },
    ],
    calculate: calculateMarkup,
  },
  "compound-interest-calculator": {
    fields: [
      { key: "principal", label: "Principal ($)", placeholder: "10000" },
      { key: "annualRate", label: "Annual rate (%)", placeholder: "5", step: "0.01" },
      { key: "years", label: "Years", placeholder: "10" },
      { key: "compoundsPerYear", label: "Compounds per year", placeholder: "12" },
    ],
    calculate: calculateCompoundInterest,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "loan-payment-calculator": {
    fields: [
      { key: "loanAmount", label: "Loan amount ($)", placeholder: "25000" },
      { key: "annualRate", label: "Annual interest rate (%)", placeholder: "7.5", step: "0.01" },
      { key: "termYears", label: "Term (years)", placeholder: "5" },
    ],
    calculate: calculateLoanPayment,
    disclaimer: "Estimate only. Not financial advice.",
  },
  "break-even-calculator": {
    fields: [
      { key: "fixedCosts", label: "Fixed costs ($)", placeholder: "5000" },
      { key: "pricePerUnit", label: "Price per unit ($)", placeholder: "25" },
      { key: "variableCostPerUnit", label: "Variable cost per unit ($)", placeholder: "10" },
    ],
    calculate: calculateBreakEven,
  },
};
