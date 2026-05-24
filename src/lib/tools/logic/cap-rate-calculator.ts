export type CapRateInput = {
  propertyValue: number;
  grossIncome: number;
  vacancyRate: number;
  operatingExpenses: number;
};

export type CapRateResult =
  | {
      ok: true;
      noi: number;
      capRate: number;
      capRatePercent: string;
    }
  | { ok: false; error: string };

export const calculateCapRate = (input: CapRateInput): CapRateResult => {
  const { propertyValue, grossIncome, vacancyRate, operatingExpenses } = input;

  if (!Number.isFinite(propertyValue) || propertyValue <= 0) {
    return { ok: false, error: "Enter a valid property value greater than zero." };
  }

  if (!Number.isFinite(grossIncome) || grossIncome < 0) {
    return { ok: false, error: "Enter a valid gross income amount." };
  }

  if (!Number.isFinite(vacancyRate) || vacancyRate < 0 || vacancyRate > 100) {
    return { ok: false, error: "Vacancy rate must be between 0 and 100." };
  }

  if (!Number.isFinite(operatingExpenses) || operatingExpenses < 0) {
    return { ok: false, error: "Enter valid operating expenses." };
  }

  const vacancyLoss = grossIncome * (vacancyRate / 100);
  const noi = grossIncome - vacancyLoss - operatingExpenses;
  const capRate = noi / propertyValue;
  const capRatePercent = `${(capRate * 100).toFixed(2)}%`;

  return {
    ok: true,
    noi,
    capRate,
    capRatePercent,
  };
};
