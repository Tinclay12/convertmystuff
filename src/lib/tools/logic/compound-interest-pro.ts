import { formatNumber } from "./unit-conversions";

export type CompoundInterestYearRow = {
  year: number;
  balance: number;
  interestEarned: number;
};

export const buildCompoundInterestSchedule = (
  principal: number,
  annualRatePercent: number,
  years: number,
  compoundsPerYear: number,
): CompoundInterestYearRow[] => {
  const rate = annualRatePercent / 100;
  const rows: CompoundInterestYearRow[] = [];

  for (let year = 1; year <= years; year += 1) {
    const balance =
      principal * (1 + rate / compoundsPerYear) ** (compoundsPerYear * year);
    rows.push({
      year,
      balance,
      interestEarned: balance - principal,
    });
  }

  return rows;
};

export const scheduleToCsv = (rows: CompoundInterestYearRow[]): string => {
  const header = "Year,Balance,Interest earned";
  const lines = rows.map(
    (row) =>
      `${row.year},${formatNumber(row.balance, 2)},${formatNumber(row.interestEarned, 2)}`,
  );
  return [header, ...lines].join("\n");
};
