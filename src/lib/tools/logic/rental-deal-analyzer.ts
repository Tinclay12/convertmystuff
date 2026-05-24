import { formatNumber } from "./unit-conversions";

export type DealAnalyzerInput = {
  purchasePrice: number;
  closingCosts: number;
  rehabCosts: number;
  squareFeet?: number;
  grossMonthlyRent: number;
  otherMonthlyIncome: number;
  vacancyRate: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  maintenance: number;
  management: number;
  utilities: number;
  otherExpenses: number;
  expenseRatio?: number;
  downPayment: number;
  interestRate: number;
  termYears: number;
  interestOnly: boolean;
};

export type DealAnalyzerSuccess = {
  ok: true;
  grossAnnualIncome: number;
  vacancyLoss: number;
  effectiveGrossIncome: number;
  annualOpEx: number;
  noi: number;
  capRate: number;
  loanAmount: number;
  ltv: number;
  monthlyDebtService: number;
  annualDebtService: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  totalCashInvested: number;
  cashOnCash: number;
  dscr: number | null;
  grm: number | null;
  pricePerSqFt: number | null;
  breakEvenOccupancy: number | null;
};

export type DealAnalyzerResult = DealAnalyzerSuccess | { ok: false; error: string };

const calculateMonthlyPayment = (
  loanAmount: number,
  annualRate: number,
  termYears: number,
  interestOnly: boolean,
): number => {
  if (loanAmount <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 100 / 12;

  if (interestOnly) {
    return loanAmount * monthlyRate;
  }

  const payments = termYears * 12;
  if (monthlyRate === 0) {
    return loanAmount / payments;
  }

  return (
    (loanAmount * monthlyRate) / (1 - (1 + monthlyRate) ** -payments)
  );
};

export const analyzeRentalDeal = (input: DealAnalyzerInput): DealAnalyzerResult => {
  const {
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
    expenseRatio,
    downPayment,
    interestRate,
    termYears,
    interestOnly,
  } = input;

  if (!Number.isFinite(purchasePrice) || purchasePrice <= 0) {
    return { ok: false, error: "Enter a valid purchase price greater than zero." };
  }

  if (!Number.isFinite(grossMonthlyRent) || grossMonthlyRent < 0) {
    return { ok: false, error: "Enter a valid gross monthly rent." };
  }

  if (!Number.isFinite(vacancyRate) || vacancyRate < 0 || vacancyRate > 100) {
    return { ok: false, error: "Vacancy rate must be between 0 and 100." };
  }

  if (!Number.isFinite(downPayment) || downPayment < 0 || downPayment > purchasePrice) {
    return { ok: false, error: "Down payment must be between 0 and the purchase price." };
  }

  if (!Number.isFinite(termYears) || termYears <= 0) {
    return { ok: false, error: "Loan term must be greater than zero." };
  }

  if (!Number.isFinite(interestRate) || interestRate < 0) {
    return { ok: false, error: "Enter a valid interest rate." };
  }

  const grossAnnualIncome = (grossMonthlyRent + otherMonthlyIncome) * 12;
  const vacancyLoss = grossAnnualIncome * (vacancyRate / 100);
  const effectiveGrossIncome = grossAnnualIncome - vacancyLoss;

  let annualOpEx: number;
  if (
    expenseRatio !== undefined &&
    Number.isFinite(expenseRatio) &&
    expenseRatio >= 0
  ) {
    annualOpEx = effectiveGrossIncome * (expenseRatio / 100);
  } else {
    const monthlyOpEx =
      propertyTax +
      insurance +
      hoa +
      maintenance +
      management +
      utilities +
      otherExpenses;
    annualOpEx = monthlyOpEx * 12;
  }

  const noi = effectiveGrossIncome - annualOpEx;
  const capRate = (noi / purchasePrice) * 100;

  const loanAmount = purchasePrice - downPayment;
  const ltv = loanAmount > 0 ? (loanAmount / purchasePrice) * 100 : 0;
  const monthlyDebtService = calculateMonthlyPayment(
    loanAmount,
    interestRate,
    termYears,
    interestOnly,
  );
  const annualDebtService = monthlyDebtService * 12;

  const annualCashFlow = noi - annualDebtService;
  const monthlyCashFlow = annualCashFlow / 12;

  const totalCashInvested = downPayment + closingCosts + rehabCosts;
  const cashOnCash =
    totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

  const dscr =
    annualDebtService > 0 ? noi / annualDebtService : null;

  const grm = grossAnnualIncome > 0 ? purchasePrice / grossAnnualIncome : null;

  const pricePerSqFt =
    squareFeet !== undefined && squareFeet > 0
      ? purchasePrice / squareFeet
      : null;

  const breakEvenOccupancy =
    grossAnnualIncome > 0
      ? ((annualOpEx + annualDebtService) / grossAnnualIncome) * 100
      : null;

  return {
    ok: true,
    grossAnnualIncome,
    vacancyLoss,
    effectiveGrossIncome,
    annualOpEx,
    noi,
    capRate,
    loanAmount,
    ltv,
    monthlyDebtService,
    annualDebtService,
    annualCashFlow,
    monthlyCashFlow,
    totalCashInvested,
    cashOnCash,
    dscr,
    grm,
    pricePerSqFt,
    breakEvenOccupancy,
  };
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

export const formatPercent = (value: number, digits = 2): string => {
  return `${formatNumber(value, digits)}%`;
};

export type RequiredRentInput = {
  purchasePrice: number;
  closingCosts: number;
  rehabCosts: number;
  vacancyRate: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  maintenance: number;
  management: number;
  utilities: number;
  otherExpenses: number;
  expenseRatio?: number;
  downPayment: number;
  interestRate: number;
  termYears: number;
  interestOnly: boolean;
  targetMonthlyCashFlow: number;
};

export const solveRequiredRent = (
  input: RequiredRentInput,
): { ok: true; requiredGrossMonthlyRent: number } | { ok: false; error: string } => {
  const base = analyzeRentalDeal({
    ...input,
    grossMonthlyRent: 0,
    otherMonthlyIncome: 0,
    squareFeet: undefined,
  });

  if (!base.ok) {
    return base;
  }

  const fixedAnnualCosts = base.annualOpEx + base.annualDebtService;
  const targetAnnualCashFlow = input.targetMonthlyCashFlow * 12;
  const requiredNoi = targetAnnualCashFlow + fixedAnnualCosts;
  const vacancyFactor = 1 - input.vacancyRate / 100;

  if (vacancyFactor <= 0) {
    return { ok: false, error: "Vacancy rate must be less than 100%." };
  }

  const requiredEffectiveGross = requiredNoi + base.annualOpEx;
  const requiredGrossAnnual = requiredEffectiveGross / vacancyFactor;
  const requiredGrossMonthlyRent = requiredGrossAnnual / 12;

  if (!Number.isFinite(requiredGrossMonthlyRent) || requiredGrossMonthlyRent < 0) {
    return { ok: false, error: "Could not solve for required rent with these inputs." };
  }

  return { ok: true, requiredGrossMonthlyRent };
};
