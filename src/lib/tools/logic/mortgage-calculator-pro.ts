import { formatNumber } from "./unit-conversions";

export type MortgageMode = "payment" | "amortization" | "extra" | "affordability";

export type AmortizationRow = {
  paymentNumber: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

export type MortgagePaymentInput = {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  termYears: number;
  propertyTaxAnnual: number;
  insuranceAnnual: number;
  pmiMonthly: number;
  hoaMonthly: number;
  extraMonthly?: number;
  lumpSum?: number;
  lumpSumMonth?: number;
};

export type MortgagePaymentResult =
  | {
      ok: true;
      loanAmount: number;
      ltv: number;
      principalAndInterest: number;
      monthlyTax: number;
      monthlyInsurance: number;
      pmiMonthly: number;
      hoaMonthly: number;
      totalMonthly: number;
      totalInterest: number;
      totalCost: number;
      schedule: AmortizationRow[];
    }
  | { ok: false; error: string };

export const calculateMonthlyPi = (
  loanAmount: number,
  annualRate: number,
  termYears: number,
): number => {
  if (loanAmount <= 0) {
    return 0;
  }
  const monthlyRate = annualRate / 100 / 12;
  const payments = termYears * 12;
  if (monthlyRate === 0) {
    return loanAmount / payments;
  }
  return (
    (loanAmount * monthlyRate) / (1 - (1 + monthlyRate) ** -payments)
  );
};

export const buildAmortizationSchedule = (
  loanAmount: number,
  annualRate: number,
  termYears: number,
  extraMonthly = 0,
  lumpSum = 0,
  lumpSumMonth = 0,
): AmortizationRow[] => {
  const monthlyRate = annualRate / 100 / 12;
  const basePayment = calculateMonthlyPi(loanAmount, annualRate, termYears);
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let paymentNumber = 0;
  const maxPayments = termYears * 12 + 120;

  while (balance > 0.01 && paymentNumber < maxPayments) {
    paymentNumber += 1;
    const interest = monthlyRate > 0 ? balance * monthlyRate : 0;
    let principal = basePayment - interest + extraMonthly;
    if (paymentNumber === lumpSumMonth && lumpSum > 0) {
      principal += lumpSum;
    }
    if (principal > balance) {
      principal = balance;
    }
    const payment = principal + interest;
    balance -= principal;
    schedule.push({
      paymentNumber,
      payment,
      principal,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return schedule;
};

export const calculateMortgagePayment = (
  input: MortgagePaymentInput,
): MortgagePaymentResult => {
  const {
    homePrice,
    downPayment,
    interestRate,
    termYears,
    propertyTaxAnnual,
    insuranceAnnual,
    pmiMonthly,
    hoaMonthly,
    extraMonthly = 0,
    lumpSum = 0,
    lumpSumMonth = 0,
  } = input;

  if (!Number.isFinite(homePrice) || homePrice <= 0) {
    return { ok: false, error: "Enter a valid home price greater than zero." };
  }
  if (!Number.isFinite(downPayment) || downPayment < 0 || downPayment > homePrice) {
    return { ok: false, error: "Down payment must be between 0 and the home price." };
  }
  if (!Number.isFinite(termYears) || termYears <= 0) {
    return { ok: false, error: "Loan term must be greater than zero." };
  }

  const loanAmount = homePrice - downPayment;
  const ltv = loanAmount > 0 ? (loanAmount / homePrice) * 100 : 0;
  const principalAndInterest = calculateMonthlyPi(loanAmount, interestRate, termYears);
  const monthlyTax = propertyTaxAnnual / 12;
  const monthlyInsurance = insuranceAnnual / 12;
  const effectivePmi =
    pmiMonthly > 0
      ? pmiMonthly
      : ltv > 80 && loanAmount > 0
        ? (loanAmount * 0.005) / 12
        : 0;
  const totalMonthly =
    principalAndInterest +
    monthlyTax +
    monthlyInsurance +
    effectivePmi +
    hoaMonthly;

  const schedule = buildAmortizationSchedule(
    loanAmount,
    interestRate,
    termYears,
    extraMonthly,
    lumpSum,
    lumpSumMonth,
  );
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const totalCost = loanAmount + totalInterest;

  return {
    ok: true,
    loanAmount,
    ltv,
    principalAndInterest,
    monthlyTax,
    monthlyInsurance,
    pmiMonthly: effectivePmi,
    hoaMonthly,
    totalMonthly,
    totalInterest,
    totalCost,
    schedule,
  };
};

export type AffordabilityInput = {
  annualIncome: number;
  monthlyDebts: number;
  targetDti: number;
  downPaymentAvailable: number;
  interestRate: number;
  termYears: number;
  estimatedEscrow: number;
};

export type AffordabilityResult =
  | {
      ok: true;
      maxMonthlyPayment: number;
      maxLoanAmount: number;
      maxHomePrice: number;
      actualDti: number;
    }
  | { ok: false; error: string };

export const solveLoanFromPayment = (
  monthlyPayment: number,
  annualRate: number,
  termYears: number,
): number => {
  if (monthlyPayment <= 0) {
    return 0;
  }
  const monthlyRate = annualRate / 100 / 12;
  const payments = termYears * 12;
  if (monthlyRate === 0) {
    return monthlyPayment * payments;
  }
  return (
    (monthlyPayment * (1 - (1 + monthlyRate) ** -payments)) / monthlyRate
  );
};

export const calculateAffordability = (
  input: AffordabilityInput,
): AffordabilityResult => {
  const {
    annualIncome,
    monthlyDebts,
    targetDti,
    downPaymentAvailable,
    interestRate,
    termYears,
    estimatedEscrow,
  } = input;

  if (!Number.isFinite(annualIncome) || annualIncome <= 0) {
    return { ok: false, error: "Enter a valid annual income." };
  }
  if (!Number.isFinite(targetDti) || targetDti <= 0 || targetDti > 100) {
    return { ok: false, error: "Target DTI must be between 0 and 100." };
  }

  const maxTotalMonthly = (annualIncome / 12) * (targetDti / 100);
  const maxMonthlyPayment = maxTotalMonthly - monthlyDebts - estimatedEscrow;

  if (maxMonthlyPayment <= 0) {
    return {
      ok: false,
      error: "Debts and escrow exceed the affordable payment at this DTI.",
    };
  }

  const maxLoanAmount = solveLoanFromPayment(
    maxMonthlyPayment,
    interestRate,
    termYears,
  );
  const maxHomePrice = maxLoanAmount + downPaymentAvailable;
  const actualDti =
    ((maxMonthlyPayment + monthlyDebts + estimatedEscrow) / (annualIncome / 12)) *
    100;

  return {
    ok: true,
    maxMonthlyPayment,
    maxLoanAmount,
    maxHomePrice,
    actualDti,
  };
};

export const formatMortgageCurrency = (value: number): string => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
};

export const scheduleToCsv = (schedule: AmortizationRow[]): string => {
  const header = "Payment,Payment Amount,Principal,Interest,Balance";
  const rows = schedule.map(
    (row) =>
      `${row.paymentNumber},${formatNumber(row.payment, 2)},${formatNumber(row.principal, 2)},${formatNumber(row.interest, 2)},${formatNumber(row.balance, 2)}`,
  );
  return [header, ...rows].join("\n");
};
