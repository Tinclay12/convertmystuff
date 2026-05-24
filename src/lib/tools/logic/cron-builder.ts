export type CronPreset =
  | "every-minute"
  | "hourly"
  | "daily-midnight"
  | "daily-noon"
  | "weekly-monday"
  | "monthly-first"
  | "custom";

export type CronFields = {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
};

export const presetToCron = (preset: CronPreset): CronFields => {
  switch (preset) {
    case "every-minute":
      return { minute: "*", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" };
    case "hourly":
      return { minute: "0", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" };
    case "daily-midnight":
      return { minute: "0", hour: "0", dayOfMonth: "*", month: "*", dayOfWeek: "*" };
    case "daily-noon":
      return { minute: "0", hour: "12", dayOfMonth: "*", month: "*", dayOfWeek: "*" };
    case "weekly-monday":
      return { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "1" };
    case "monthly-first":
      return { minute: "0", hour: "9", dayOfMonth: "1", month: "*", dayOfWeek: "*" };
    default:
      return { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "*" };
  }
};

export const buildCronExpression = (fields: CronFields): string => {
  return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const describeCron = (fields: CronFields): string => {
  const { minute, hour, dayOfMonth, month, dayOfWeek } = fields;

  if (minute === "*" && hour === "*") {
    return "Every minute";
  }
  if (hour === "*" && minute !== "*") {
    return `At minute ${minute} of every hour`;
  }
  if (dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
    return `Daily at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }
  if (dayOfWeek !== "*" && dayOfMonth === "*") {
    const dayIndex = Number(dayOfWeek);
    const dayName = dayNames[dayIndex] ?? `day ${dayOfWeek}`;
    return `Every ${dayName} at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }
  if (dayOfMonth !== "*" && month === "*") {
    return `Monthly on day ${dayOfMonth} at ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  }

  return buildCronExpression(fields);
};

export const validateCronField = (
  value: string,
  min: number,
  max: number,
  fieldName: string,
): string | null => {
  if (value === "*") {
    return null;
  }
  if (/^\*\/\d+$/.test(value)) {
    return null;
  }
  if (/^\d+$/.test(value)) {
    const numeric = Number(value);
    if (numeric < min || numeric > max) {
      return `${fieldName} must be between ${min} and ${max}, or *`;
    }
    return null;
  }
  if (/^[\d,-/]+$/.test(value)) {
    return null;
  }
  return `Invalid ${fieldName} field.`;
};

export const validateCron = (fields: CronFields): string | null => {
  return (
    validateCronField(fields.minute, 0, 59, "minute") ??
    validateCronField(fields.hour, 0, 23, "hour") ??
    validateCronField(fields.dayOfMonth, 1, 31, "day of month") ??
    validateCronField(fields.month, 1, 12, "month") ??
    validateCronField(fields.dayOfWeek, 0, 6, "day of week")
  );
};
