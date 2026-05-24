import type { LogicResult } from "./unit-conversions";
import { formatNumber } from "./unit-conversions";

type TimeDateInput = Record<string, string>;

const parseDate = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const date = new Date(trimmed);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

const countBusinessDays = (start: Date, end: Date): number => {
  const forward = start <= end;
  const from = forward ? new Date(start) : new Date(end);
  const to = forward ? new Date(end) : new Date(start);
  let count = 0;

  const cursor = new Date(from);
  while (cursor <= to) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      count += 1;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return count;
};

export const convertTimezone = (values: TimeDateInput): LogicResult => {
  const dateTime = values.dateTime?.trim();
  const timeZone = values.timeZone?.trim();

  if (!dateTime) {
    return { ok: false, error: "Enter a date and time." };
  }
  if (!timeZone) {
    return { ok: false, error: "Enter a target IANA time zone such as America/New_York." };
  }

  const date = parseDate(dateTime);
  if (!date) {
    return { ok: false, error: "Enter a valid date and time." };
  }

  try {
    const formatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone,
    }).format(date);

    return { ok: true, output: formatted };
  } catch {
    return { ok: false, error: "Enter a valid IANA time zone name." };
  }
};

export const calculateAge = (values: TimeDateInput): LogicResult => {
  const birthDate = parseDate(values.birthDate ?? "");
  if (!birthDate) {
    return { ok: false, error: "Enter a valid birth date." };
  }

  const today = new Date();
  if (birthDate > today) {
    return { ok: false, error: "Birth date cannot be in the future." };
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    ok: true,
    output: `${years} years, ${months} months, ${days} days`,
  };
};

export const calculateDateDifference = (values: TimeDateInput): LogicResult => {
  const start = parseDate(values.startDate ?? "");
  const end = parseDate(values.endDate ?? "");

  if (!start || !end) {
    return { ok: false, error: "Enter valid start and end dates." };
  }

  const diffMs = Math.abs(end.getTime() - start.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

  return {
    ok: true,
    output: `${days} days, ${hours} hours (${formatNumber(diffMs / (1000 * 60 * 60 * 24), 2)} total days)`,
  };
};

export const convertUnixTimestamp = (values: TimeDateInput): LogicResult => {
  const mode = values.mode ?? "toDate";
  const input = values.input?.trim() ?? "";

  if (!input) {
    return { ok: false, error: "Enter a timestamp or date." };
  }

  if (mode === "toDate") {
    const seconds = Number(input);
    if (!Number.isFinite(seconds)) {
      return { ok: false, error: "Enter a valid Unix timestamp in seconds." };
    }
    const date = new Date(seconds * 1000);
    return { ok: true, output: formatDate(date) };
  }

  const date = parseDate(input);
  if (!date) {
    return { ok: false, error: "Enter a valid date and time." };
  }

  return { ok: true, output: String(Math.floor(date.getTime() / 1000)) };
};

export const calculateBusinessDays = (values: TimeDateInput): LogicResult => {
  const start = parseDate(values.startDate ?? "");
  const end = parseDate(values.endDate ?? "");

  if (!start || !end) {
    return { ok: false, error: "Enter valid start and end dates." };
  }

  const businessDays = countBusinessDays(start, end);
  return {
    ok: true,
    output: `${businessDays} business days (Mon–Fri, inclusive)`,
  };
};

export const calculateCountdown = (values: TimeDateInput): LogicResult => {
  const target = parseDate(values.targetDate ?? "");
  if (!target) {
    return { ok: false, error: "Enter a valid target date and time." };
  }

  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const past = diffMs < 0;
  const absMs = Math.abs(diffMs);
  const days = Math.floor(absMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((absMs / (1000 * 60)) % 60);

  return {
    ok: true,
    output: past
      ? `Target was ${days} days, ${hours} hours, ${minutes} minutes ago`
      : `${days} days, ${hours} hours, ${minutes} minutes remaining`,
  };
};

export type TimeDateField = {
  key: string;
  label: string;
  placeholder: string;
  type?: "text" | "date" | "datetime-local" | "select";
  options?: { value: string; label: string }[];
};

export type TimeDateToolConfig = {
  fields: TimeDateField[];
  calculate: (values: TimeDateInput) => LogicResult;
};

export const timeDateToolConfigs: Record<string, TimeDateToolConfig> = {
  "timezone-converter": {
    fields: [
      { key: "dateTime", label: "Date and time", placeholder: "2026-05-23T14:30", type: "datetime-local" },
      { key: "timeZone", label: "Target time zone", placeholder: "America/New_York", type: "text" },
    ],
    calculate: convertTimezone,
  },
  "age-calculator": {
    fields: [{ key: "birthDate", label: "Birth date", placeholder: "1990-01-15", type: "date" }],
    calculate: calculateAge,
  },
  "date-difference": {
    fields: [
      { key: "startDate", label: "Start date", placeholder: "2026-01-01", type: "date" },
      { key: "endDate", label: "End date", placeholder: "2026-05-23", type: "date" },
    ],
    calculate: calculateDateDifference,
  },
  "unix-timestamp": {
    fields: [
      {
        key: "mode",
        label: "Conversion",
        placeholder: "",
        type: "select",
        options: [
          { value: "toDate", label: "Unix timestamp → date" },
          { value: "toUnix", label: "Date → Unix timestamp" },
        ],
      },
      { key: "input", label: "Input", placeholder: "1716480000 or 2024-05-23T12:00", type: "text" },
    ],
    calculate: convertUnixTimestamp,
  },
  "business-days-calculator": {
    fields: [
      { key: "startDate", label: "Start date", placeholder: "2026-05-01", type: "date" },
      { key: "endDate", label: "End date", placeholder: "2026-05-23", type: "date" },
    ],
    calculate: calculateBusinessDays,
  },
  "countdown-calculator": {
    fields: [
      { key: "targetDate", label: "Target date and time", placeholder: "2026-12-31T23:59", type: "datetime-local" },
    ],
    calculate: calculateCountdown,
  },
};
