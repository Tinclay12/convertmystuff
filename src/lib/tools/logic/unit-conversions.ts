export type ResultLine = {
  label: string;
  value: string;
};

export type LogicResult =
  | { ok: true; output: string; meta?: Record<string, string | number>; resultLines?: ResultLine[] }
  | { ok: false; error: string };

export type NumericResult =
  | { ok: true; value: number }
  | { ok: false; error: string };

export const parseNumericInput = (input: string): NumericResult => {
  const trimmed = input.trim();

  if (!trimmed) {
    return { ok: false, error: "Enter a value to convert." };
  }

  const value = Number(trimmed);

  if (!Number.isFinite(value)) {
    return { ok: false, error: "Enter a valid number." };
  }

  return { ok: true, value };
};

export const formatNumber = (value: number, maxFractionDigits = 6): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
};

export const convertUnits = (
  value: number,
  factor: number,
  validate: (value: number) => boolean = (v) => Number.isFinite(v),
): NumericResult => {
  if (!validate(value)) {
    return { ok: false, error: "Enter a valid value." };
  }

  return { ok: true, value: value * factor };
};

export const SQUARE_FEET_PER_ACRE = 43_560;
export const SQUARE_FEET_PER_HECTARE = 107_639.104;
export const FEET_PER_METER = 3.280839895;
export const KM_PER_MILE = 1.609344;
export const LBS_PER_KG = 2.2046226218;
export const LITERS_PER_GALLON = 3.785411784;

export const acresToSquareFeet = (acres: number) =>
  convertUnits(acres, SQUARE_FEET_PER_ACRE, (v) => v >= 0);
export const squareFeetToAcres = (squareFeet: number) =>
  convertUnits(squareFeet, 1 / SQUARE_FEET_PER_ACRE, (v) => v >= 0);
export const hectaresToAcres = (hectares: number) =>
  convertUnits(hectares, SQUARE_FEET_PER_HECTARE / SQUARE_FEET_PER_ACRE, (v) => v >= 0);
export const acresToHectares = (acres: number) =>
  convertUnits(acres, SQUARE_FEET_PER_ACRE / SQUARE_FEET_PER_HECTARE, (v) => v >= 0);
export const metersToFeet = (meters: number) =>
  convertUnits(meters, FEET_PER_METER, (v) => v >= 0);
export const feetToMeters = (feet: number) =>
  convertUnits(feet, 1 / FEET_PER_METER, (v) => v >= 0);
export const milesToKm = (miles: number) =>
  convertUnits(miles, KM_PER_MILE, (v) => v >= 0);
export const kmToMiles = (km: number) =>
  convertUnits(km, 1 / KM_PER_MILE, (v) => v >= 0);
export const kgToLbs = (kg: number) =>
  convertUnits(kg, LBS_PER_KG, (v) => v >= 0);
export const lbsToKg = (lbs: number) =>
  convertUnits(lbs, 1 / LBS_PER_KG, (v) => v >= 0);
export const litersToGallons = (liters: number) =>
  convertUnits(liters, 1 / LITERS_PER_GALLON, (v) => v >= 0);
export const gallonsToLiters = (gallons: number) =>
  convertUnits(gallons, LITERS_PER_GALLON, (v) => v >= 0);
export const celsiusToFahrenheit = (celsius: number) =>
  convertUnits(celsius, 1, (v) => Number.isFinite(v))
    .ok
    ? { ok: true as const, value: celsius * (9 / 5) + 32 }
    : { ok: false as const, error: "Enter a valid temperature." };
export const fahrenheitToCelsius = (fahrenheit: number) =>
  Number.isFinite(fahrenheit)
    ? { ok: true as const, value: (fahrenheit - 32) * (5 / 9) }
    : { ok: false as const, error: "Enter a valid temperature." };
export const mbToGb = (mb: number) =>
  convertUnits(mb, 1 / 1024, (v) => v >= 0);
export const gbToMb = (gb: number) =>
  convertUnits(gb, 1024, (v) => v >= 0);

export const INCHES_PER_CM = 0.3937007874;
export const CM_PER_INCH = 2.54;
export const SQUARE_FEET_PER_SQUARE_METER = 10.7639104167;
export const MM_PER_INCH = 25.4;
export const YARDS_PER_METER = 1.0936132983;
export const INCHES_PER_FOOT = 12;
export const GRAMS_PER_OUNCE = 28.349523125;
export const CUBIC_FEET_PER_CUBIC_YARD = 27;
export const KELVIN_OFFSET = 273.15;
export const KB_PER_MB = 1024;
export const GB_PER_TB = 1024;
export const GRAVEL_TONS_PER_CUBIC_YARD = 1.4;
export const MULCH_TONS_PER_CUBIC_YARD = 0.55;
export const CONCRETE_TONS_PER_CUBIC_YARD = 2.0;
export const SQUARE_METERS_PER_ACRE = 4046.8564224;
export const KG_PER_STONE = 6.35029318;
export const ML_PER_US_CUP = 236.588236;
export const BYTES_PER_KB = 1024;
export const BITS_PER_BYTE = 8;
export const BOARD_FEET_PER_CUBIC_FOOT = 12;

export const inchesToCm = (inches: number) =>
  convertUnits(inches, CM_PER_INCH, (v) => v >= 0);
export const cmToInches = (cm: number) =>
  convertUnits(cm, INCHES_PER_CM, (v) => v >= 0);
export const squareMetersToSquareFeet = (sqm: number) =>
  convertUnits(sqm, SQUARE_FEET_PER_SQUARE_METER, (v) => v >= 0);
export const squareFeetToSquareMeters = (sqft: number) =>
  convertUnits(sqft, 1 / SQUARE_FEET_PER_SQUARE_METER, (v) => v >= 0);
export const mmToInches = (mm: number) =>
  convertUnits(mm, 1 / MM_PER_INCH, (v) => v >= 0);
export const inchesToMm = (inches: number) =>
  convertUnits(inches, MM_PER_INCH, (v) => v >= 0);
export const yardsToMeters = (yards: number) =>
  convertUnits(yards, 1 / YARDS_PER_METER, (v) => v >= 0);
export const metersToYards = (meters: number) =>
  convertUnits(meters, YARDS_PER_METER, (v) => v >= 0);
export const feetToInches = (feet: number) =>
  convertUnits(feet, INCHES_PER_FOOT, (v) => v >= 0);
export const inchesToFeet = (inches: number) =>
  convertUnits(inches, 1 / INCHES_PER_FOOT, (v) => v >= 0);
export const ouncesToGrams = (oz: number) =>
  convertUnits(oz, GRAMS_PER_OUNCE, (v) => v >= 0);
export const gramsToOunces = (grams: number) =>
  convertUnits(grams, 1 / GRAMS_PER_OUNCE, (v) => v >= 0);
export const cubicFeetToCubicYards = (cuft: number) =>
  convertUnits(cuft, 1 / CUBIC_FEET_PER_CUBIC_YARD, (v) => v >= 0);
export const cubicYardsToCubicFeet = (cuyd: number) =>
  convertUnits(cuyd, CUBIC_FEET_PER_CUBIC_YARD, (v) => v >= 0);
export const celsiusToKelvin = (celsius: number) =>
  Number.isFinite(celsius)
    ? { ok: true as const, value: celsius + KELVIN_OFFSET }
    : { ok: false as const, error: "Enter a valid temperature." };
export const kelvinToCelsius = (kelvin: number) =>
  Number.isFinite(kelvin)
    ? { ok: true as const, value: kelvin - KELVIN_OFFSET }
    : { ok: false as const, error: "Enter a valid temperature." };
export const fahrenheitToKelvin = (fahrenheit: number) =>
  Number.isFinite(fahrenheit)
    ? { ok: true as const, value: (fahrenheit - 32) * (5 / 9) + KELVIN_OFFSET }
    : { ok: false as const, error: "Enter a valid temperature." };
export const kelvinToFahrenheit = (kelvin: number) =>
  Number.isFinite(kelvin)
    ? { ok: true as const, value: (kelvin - KELVIN_OFFSET) * (9 / 5) + 32 }
    : { ok: false as const, error: "Enter a valid temperature." };
export const kbToMb = (kb: number) =>
  convertUnits(kb, 1 / KB_PER_MB, (v) => v >= 0);
export const mbToKb = (mb: number) =>
  convertUnits(mb, KB_PER_MB, (v) => v >= 0);
export const gbToTb = (gb: number) =>
  convertUnits(gb, 1 / GB_PER_TB, (v) => v >= 0);
export const tbToGb = (tb: number) =>
  convertUnits(tb, GB_PER_TB, (v) => v >= 0);
export const gravelCubicYardsToTons = (yards: number) =>
  convertUnits(yards, GRAVEL_TONS_PER_CUBIC_YARD, (v) => v >= 0);
export const gravelTonsToCubicYards = (tons: number) =>
  convertUnits(tons, 1 / GRAVEL_TONS_PER_CUBIC_YARD, (v) => v >= 0);
export const mulchCubicYardsToTons = (yards: number) =>
  convertUnits(yards, MULCH_TONS_PER_CUBIC_YARD, (v) => v >= 0);
export const mulchTonsToCubicYards = (tons: number) =>
  convertUnits(tons, 1 / MULCH_TONS_PER_CUBIC_YARD, (v) => v >= 0);
export const concreteCubicYardsToTons = (yards: number) =>
  convertUnits(yards, CONCRETE_TONS_PER_CUBIC_YARD, (v) => v >= 0);
export const concreteTonsToCubicYards = (tons: number) =>
  convertUnits(tons, 1 / CONCRETE_TONS_PER_CUBIC_YARD, (v) => v >= 0);
export const squareMetersToAcres = (sqm: number) =>
  convertUnits(sqm, 1 / SQUARE_METERS_PER_ACRE, (v) => v >= 0);
export const acresToSquareMeters = (acres: number) =>
  convertUnits(acres, SQUARE_METERS_PER_ACRE, (v) => v >= 0);
export const mmToCm = (mm: number) =>
  convertUnits(mm, 0.1, (v) => v >= 0);
export const cmToMm = (cm: number) =>
  convertUnits(cm, 10, (v) => v >= 0);
export const stonesToKg = (stones: number) =>
  convertUnits(stones, KG_PER_STONE, (v) => v >= 0);
export const kgToStones = (kg: number) =>
  convertUnits(kg, 1 / KG_PER_STONE, (v) => v >= 0);
export const cupsToMl = (cups: number) =>
  convertUnits(cups, ML_PER_US_CUP, (v) => v >= 0);
export const mlToCups = (ml: number) =>
  convertUnits(ml, 1 / ML_PER_US_CUP, (v) => v >= 0);
export const bytesToKb = (bytes: number) =>
  convertUnits(bytes, 1 / BYTES_PER_KB, (v) => v >= 0);
export const kbToBytes = (kb: number) =>
  convertUnits(kb, BYTES_PER_KB, (v) => v >= 0);
export const bitsToBytes = (bits: number) =>
  convertUnits(bits, 1 / BITS_PER_BYTE, (v) => v >= 0);
export const bytesToBits = (bytes: number) =>
  convertUnits(bytes, BITS_PER_BYTE, (v) => v >= 0);
export const boardFeetToCubicFeet = (boardFeet: number) =>
  convertUnits(boardFeet, 1 / BOARD_FEET_PER_CUBIC_FOOT, (v) => v >= 0);
export const cubicFeetToBoardFeet = (cubicFeet: number) =>
  convertUnits(cubicFeet, BOARD_FEET_PER_CUBIC_FOOT, (v) => v >= 0);

export type UnitConverterFn = (value: number) => NumericResult;

export type UnitConverterConfig = {
  inputLabel: string;
  outputLabel: string;
  inputPlaceholder: string;
  reverseToolId?: string;
  reversePath?: string;
  reverseLabel?: string;
  allowNegative?: boolean;
  convert: UnitConverterFn;
};

export const unitConverterConfigs: Record<string, UnitConverterConfig> = {
  "acres-to-square-feet": {
    inputLabel: "Acres",
    outputLabel: "Square feet",
    inputPlaceholder: "2.5",
    reverseToolId: "square-feet-to-acres",
    reversePath: "/unit-converters/area/square-feet-to-acres/",
    reverseLabel: "Square Feet to Acres",
    convert: acresToSquareFeet,
  },
  "square-feet-to-acres": {
    inputLabel: "Square feet",
    outputLabel: "Acres",
    inputPlaceholder: "87120",
    reverseToolId: "acres-to-square-feet",
    reversePath: "/unit-converters/area/acres-to-square-feet/",
    reverseLabel: "Acres to Square Feet",
    convert: squareFeetToAcres,
  },
  "hectares-to-acres": {
    inputLabel: "Hectares",
    outputLabel: "Acres",
    inputPlaceholder: "10",
    reverseToolId: "acres-to-hectares",
    reversePath: "/unit-converters/area/acres-to-hectares/",
    reverseLabel: "Acres to Hectares",
    convert: hectaresToAcres,
  },
  "acres-to-hectares": {
    inputLabel: "Acres",
    outputLabel: "Hectares",
    inputPlaceholder: "25",
    reverseToolId: "hectares-to-acres",
    reversePath: "/unit-converters/area/hectares-to-acres/",
    reverseLabel: "Hectares to Acres",
    convert: acresToHectares,
  },
  "meters-to-feet": {
    inputLabel: "Meters",
    outputLabel: "Feet",
    inputPlaceholder: "100",
    reverseToolId: "feet-to-meters",
    reversePath: "/unit-converters/length/feet-to-meters/",
    reverseLabel: "Feet to Meters",
    convert: metersToFeet,
  },
  "feet-to-meters": {
    inputLabel: "Feet",
    outputLabel: "Meters",
    inputPlaceholder: "328",
    reverseToolId: "meters-to-feet",
    reversePath: "/unit-converters/length/meters-to-feet/",
    reverseLabel: "Meters to Feet",
    convert: feetToMeters,
  },
  "miles-to-km": {
    inputLabel: "Miles",
    outputLabel: "Kilometers",
    inputPlaceholder: "5",
    reverseToolId: "km-to-miles",
    reversePath: "/unit-converters/length/km-to-miles/",
    reverseLabel: "Kilometers to Miles",
    convert: milesToKm,
  },
  "km-to-miles": {
    inputLabel: "Kilometers",
    outputLabel: "Miles",
    inputPlaceholder: "10",
    reverseToolId: "miles-to-km",
    reversePath: "/unit-converters/length/miles-to-km/",
    reverseLabel: "Miles to Kilometers",
    convert: kmToMiles,
  },
  "kg-to-lbs": {
    inputLabel: "Kilograms",
    outputLabel: "Pounds",
    inputPlaceholder: "70",
    reverseToolId: "lbs-to-kg",
    reversePath: "/unit-converters/weight/lbs-to-kg/",
    reverseLabel: "Pounds to Kilograms",
    convert: kgToLbs,
  },
  "lbs-to-kg": {
    inputLabel: "Pounds",
    outputLabel: "Kilograms",
    inputPlaceholder: "150",
    reverseToolId: "kg-to-lbs",
    reversePath: "/unit-converters/weight/kg-to-lbs/",
    reverseLabel: "Kilograms to Pounds",
    convert: lbsToKg,
  },
  "liters-to-gallons": {
    inputLabel: "Liters",
    outputLabel: "US gallons",
    inputPlaceholder: "20",
    reverseToolId: "gallons-to-liters",
    reversePath: "/unit-converters/volume/gallons-to-liters/",
    reverseLabel: "Gallons to Liters",
    convert: litersToGallons,
  },
  "gallons-to-liters": {
    inputLabel: "US gallons",
    outputLabel: "Liters",
    inputPlaceholder: "5",
    reverseToolId: "liters-to-gallons",
    reversePath: "/unit-converters/volume/liters-to-gallons/",
    reverseLabel: "Liters to Gallons",
    convert: gallonsToLiters,
  },
  "celsius-to-fahrenheit": {
    inputLabel: "Celsius",
    outputLabel: "Fahrenheit",
    inputPlaceholder: "25",
    allowNegative: true,
    reverseToolId: "fahrenheit-to-celsius",
    reversePath: "/unit-converters/temperature/fahrenheit-to-celsius/",
    reverseLabel: "Fahrenheit to Celsius",
    convert: celsiusToFahrenheit,
  },
  "fahrenheit-to-celsius": {
    inputLabel: "Fahrenheit",
    outputLabel: "Celsius",
    inputPlaceholder: "98.6",
    allowNegative: true,
    reverseToolId: "celsius-to-fahrenheit",
    reversePath: "/unit-converters/temperature/celsius-to-fahrenheit/",
    reverseLabel: "Celsius to Fahrenheit",
    convert: fahrenheitToCelsius,
  },
  "mb-to-gb": {
    inputLabel: "Megabytes",
    outputLabel: "Gigabytes",
    inputPlaceholder: "512",
    reverseToolId: "gb-to-mb",
    reversePath: "/unit-converters/digital-storage/gb-to-mb/",
    reverseLabel: "GB to MB",
    convert: mbToGb,
  },
  "gb-to-mb": {
    inputLabel: "Gigabytes",
    outputLabel: "Megabytes",
    inputPlaceholder: "2",
    reverseToolId: "mb-to-gb",
    reversePath: "/unit-converters/digital-storage/mb-to-gb/",
    reverseLabel: "MB to GB",
    convert: gbToMb,
  },
  "inches-to-cm": {
    inputLabel: "Inches",
    outputLabel: "Centimeters",
    inputPlaceholder: "12",
    reverseToolId: "cm-to-inches",
    reversePath: "/unit-converters/length/cm-to-inches/",
    reverseLabel: "CM to Inches",
    convert: inchesToCm,
  },
  "cm-to-inches": {
    inputLabel: "Centimeters",
    outputLabel: "Inches",
    inputPlaceholder: "30.48",
    reverseToolId: "inches-to-cm",
    reversePath: "/unit-converters/length/inches-to-cm/",
    reverseLabel: "Inches to CM",
    convert: cmToInches,
  },
  "square-meters-to-square-feet": {
    inputLabel: "Square meters",
    outputLabel: "Square feet",
    inputPlaceholder: "100",
    reverseToolId: "square-feet-to-square-meters",
    reversePath: "/unit-converters/area/square-feet-to-square-meters/",
    reverseLabel: "Square Feet to Square Meters",
    convert: squareMetersToSquareFeet,
  },
  "square-feet-to-square-meters": {
    inputLabel: "Square feet",
    outputLabel: "Square meters",
    inputPlaceholder: "1000",
    reverseToolId: "square-meters-to-square-feet",
    reversePath: "/unit-converters/area/square-meters-to-square-feet/",
    reverseLabel: "Square Meters to Square Feet",
    convert: squareFeetToSquareMeters,
  },
  "mm-to-inches": {
    inputLabel: "Millimeters",
    outputLabel: "Inches",
    inputPlaceholder: "25.4",
    reverseToolId: "inches-to-mm",
    reversePath: "/unit-converters/length/inches-to-mm/",
    reverseLabel: "Inches to MM",
    convert: mmToInches,
  },
  "inches-to-mm": {
    inputLabel: "Inches",
    outputLabel: "Millimeters",
    inputPlaceholder: "1",
    reverseToolId: "mm-to-inches",
    reversePath: "/unit-converters/length/mm-to-inches/",
    reverseLabel: "MM to Inches",
    convert: inchesToMm,
  },
  "yards-to-meters": {
    inputLabel: "Yards",
    outputLabel: "Meters",
    inputPlaceholder: "100",
    reverseToolId: "meters-to-yards",
    reversePath: "/unit-converters/length/meters-to-yards/",
    reverseLabel: "Meters to Yards",
    convert: yardsToMeters,
  },
  "meters-to-yards": {
    inputLabel: "Meters",
    outputLabel: "Yards",
    inputPlaceholder: "100",
    reverseToolId: "yards-to-meters",
    reversePath: "/unit-converters/length/yards-to-meters/",
    reverseLabel: "Yards to Meters",
    convert: metersToYards,
  },
  "feet-to-inches": {
    inputLabel: "Feet",
    outputLabel: "Inches",
    inputPlaceholder: "6",
    reverseToolId: "inches-to-feet",
    reversePath: "/unit-converters/length/inches-to-feet/",
    reverseLabel: "Inches to Feet",
    convert: feetToInches,
  },
  "inches-to-feet": {
    inputLabel: "Inches",
    outputLabel: "Feet",
    inputPlaceholder: "72",
    reverseToolId: "feet-to-inches",
    reversePath: "/unit-converters/length/feet-to-inches/",
    reverseLabel: "Feet to Inches",
    convert: inchesToFeet,
  },
  "ounces-to-grams": {
    inputLabel: "Ounces",
    outputLabel: "Grams",
    inputPlaceholder: "8",
    reverseToolId: "grams-to-ounces",
    reversePath: "/unit-converters/weight/grams-to-ounces/",
    reverseLabel: "Grams to Ounces",
    convert: ouncesToGrams,
  },
  "grams-to-ounces": {
    inputLabel: "Grams",
    outputLabel: "Ounces",
    inputPlaceholder: "100",
    reverseToolId: "ounces-to-grams",
    reversePath: "/unit-converters/weight/ounces-to-grams/",
    reverseLabel: "Ounces to Grams",
    convert: gramsToOunces,
  },
  "cubic-feet-to-cubic-yards": {
    inputLabel: "Cubic feet",
    outputLabel: "Cubic yards",
    inputPlaceholder: "27",
    reverseToolId: "cubic-yards-to-cubic-feet",
    reversePath: "/unit-converters/volume/cubic-yards-to-cubic-feet/",
    reverseLabel: "Cubic Yards to Cubic Feet",
    convert: cubicFeetToCubicYards,
  },
  "cubic-yards-to-cubic-feet": {
    inputLabel: "Cubic yards",
    outputLabel: "Cubic feet",
    inputPlaceholder: "1",
    reverseToolId: "cubic-feet-to-cubic-yards",
    reversePath: "/unit-converters/volume/cubic-feet-to-cubic-yards/",
    reverseLabel: "Cubic Feet to Cubic Yards",
    convert: cubicYardsToCubicFeet,
  },
  "celsius-to-kelvin": {
    inputLabel: "Celsius",
    outputLabel: "Kelvin",
    inputPlaceholder: "25",
    allowNegative: true,
    reverseToolId: "kelvin-to-celsius",
    reversePath: "/unit-converters/temperature/kelvin-to-celsius/",
    reverseLabel: "Kelvin to Celsius",
    convert: celsiusToKelvin,
  },
  "kelvin-to-celsius": {
    inputLabel: "Kelvin",
    outputLabel: "Celsius",
    inputPlaceholder: "298.15",
    reverseToolId: "celsius-to-kelvin",
    reversePath: "/unit-converters/temperature/celsius-to-kelvin/",
    reverseLabel: "Celsius to Kelvin",
    convert: kelvinToCelsius,
  },
  "fahrenheit-to-kelvin": {
    inputLabel: "Fahrenheit",
    outputLabel: "Kelvin",
    inputPlaceholder: "77",
    allowNegative: true,
    reverseToolId: "kelvin-to-fahrenheit",
    reversePath: "/unit-converters/temperature/kelvin-to-fahrenheit/",
    reverseLabel: "Kelvin to Fahrenheit",
    convert: fahrenheitToKelvin,
  },
  "kelvin-to-fahrenheit": {
    inputLabel: "Kelvin",
    outputLabel: "Fahrenheit",
    inputPlaceholder: "298.15",
    reverseToolId: "fahrenheit-to-kelvin",
    reversePath: "/unit-converters/temperature/fahrenheit-to-kelvin/",
    reverseLabel: "Fahrenheit to Kelvin",
    convert: kelvinToFahrenheit,
  },
  "kb-to-mb": {
    inputLabel: "Kilobytes",
    outputLabel: "Megabytes",
    inputPlaceholder: "1024",
    reverseToolId: "mb-to-kb",
    reversePath: "/unit-converters/digital-storage/mb-to-kb/",
    reverseLabel: "MB to KB",
    convert: kbToMb,
  },
  "mb-to-kb": {
    inputLabel: "Megabytes",
    outputLabel: "Kilobytes",
    inputPlaceholder: "1",
    reverseToolId: "kb-to-mb",
    reversePath: "/unit-converters/digital-storage/kb-to-mb/",
    reverseLabel: "KB to MB",
    convert: mbToKb,
  },
  "gb-to-tb": {
    inputLabel: "Gigabytes",
    outputLabel: "Terabytes",
    inputPlaceholder: "1024",
    reverseToolId: "tb-to-gb",
    reversePath: "/unit-converters/digital-storage/tb-to-gb/",
    reverseLabel: "TB to GB",
    convert: gbToTb,
  },
  "tb-to-gb": {
    inputLabel: "Terabytes",
    outputLabel: "Gigabytes",
    inputPlaceholder: "1",
    reverseToolId: "gb-to-tb",
    reversePath: "/unit-converters/digital-storage/gb-to-tb/",
    reverseLabel: "GB to TB",
    convert: tbToGb,
  },
  "gravel-cubic-yards-to-tons": {
    inputLabel: "Gravel (cubic yards)",
    outputLabel: "Approximate tons",
    inputPlaceholder: "3",
    reverseToolId: "gravel-tons-to-cubic-yards",
    reversePath: "/construction-calculators/landscaping/gravel-tons-to-cubic-yards/",
    reverseLabel: "Gravel Tons to Cubic Yards",
    convert: gravelCubicYardsToTons,
  },
  "gravel-tons-to-cubic-yards": {
    inputLabel: "Gravel (tons)",
    outputLabel: "Approximate cubic yards",
    inputPlaceholder: "4.2",
    reverseToolId: "gravel-cubic-yards-to-tons",
    reversePath: "/construction-calculators/landscaping/gravel-cubic-yards-to-tons/",
    reverseLabel: "Gravel Cubic Yards to Tons",
    convert: gravelTonsToCubicYards,
  },
  "mulch-cubic-yards-to-tons": {
    inputLabel: "Mulch (cubic yards)",
    outputLabel: "Approximate tons",
    inputPlaceholder: "5",
    reverseToolId: "mulch-tons-to-cubic-yards",
    reversePath: "/construction-calculators/landscaping/mulch-tons-to-cubic-yards/",
    reverseLabel: "Mulch Tons to Cubic Yards",
    convert: mulchCubicYardsToTons,
  },
  "mulch-tons-to-cubic-yards": {
    inputLabel: "Mulch (tons)",
    outputLabel: "Approximate cubic yards",
    inputPlaceholder: "2.75",
    reverseToolId: "mulch-cubic-yards-to-tons",
    reversePath: "/construction-calculators/landscaping/mulch-cubic-yards-to-tons/",
    reverseLabel: "Mulch Cubic Yards to Tons",
    convert: mulchTonsToCubicYards,
  },
  "concrete-cubic-yards-to-tons": {
    inputLabel: "Concrete (cubic yards)",
    outputLabel: "Approximate tons",
    inputPlaceholder: "2",
    reverseToolId: "concrete-tons-to-cubic-yards",
    reversePath: "/construction-calculators/concrete-cement/concrete-tons-to-cubic-yards/",
    reverseLabel: "Concrete Tons to Cubic Yards",
    convert: concreteCubicYardsToTons,
  },
  "concrete-tons-to-cubic-yards": {
    inputLabel: "Concrete (tons)",
    outputLabel: "Approximate cubic yards",
    inputPlaceholder: "4",
    reverseToolId: "concrete-cubic-yards-to-tons",
    reversePath: "/construction-calculators/concrete-cement/concrete-cubic-yards-to-tons/",
    reverseLabel: "Concrete Cubic Yards to Tons",
    convert: concreteTonsToCubicYards,
  },
  "square-meters-to-acres": {
    inputLabel: "Square meters",
    outputLabel: "Acres",
    inputPlaceholder: "4047",
    reverseToolId: "acres-to-square-meters",
    reversePath: "/unit-converters/area/acres-to-square-meters/",
    reverseLabel: "Acres to Square Meters",
    convert: squareMetersToAcres,
  },
  "acres-to-square-meters": {
    inputLabel: "Acres",
    outputLabel: "Square meters",
    inputPlaceholder: "1",
    reverseToolId: "square-meters-to-acres",
    reversePath: "/unit-converters/area/square-meters-to-acres/",
    reverseLabel: "Square Meters to Acres",
    convert: acresToSquareMeters,
  },
  "mm-to-cm": {
    inputLabel: "Millimeters",
    outputLabel: "Centimeters",
    inputPlaceholder: "100",
    reverseToolId: "cm-to-mm",
    reversePath: "/unit-converters/length/cm-to-mm/",
    reverseLabel: "CM to MM",
    convert: mmToCm,
  },
  "cm-to-mm": {
    inputLabel: "Centimeters",
    outputLabel: "Millimeters",
    inputPlaceholder: "10",
    reverseToolId: "mm-to-cm",
    reversePath: "/unit-converters/length/mm-to-cm/",
    reverseLabel: "MM to CM",
    convert: cmToMm,
  },
  "stones-to-kg": {
    inputLabel: "Stones",
    outputLabel: "Kilograms",
    inputPlaceholder: "10",
    reverseToolId: "kg-to-stones",
    reversePath: "/unit-converters/weight/kg-to-stones/",
    reverseLabel: "KG to Stones",
    convert: stonesToKg,
  },
  "kg-to-stones": {
    inputLabel: "Kilograms",
    outputLabel: "Stones",
    inputPlaceholder: "63.5",
    reverseToolId: "stones-to-kg",
    reversePath: "/unit-converters/weight/stones-to-kg/",
    reverseLabel: "Stones to KG",
    convert: kgToStones,
  },
  "cups-to-ml": {
    inputLabel: "US cups",
    outputLabel: "Milliliters",
    inputPlaceholder: "2",
    reverseToolId: "ml-to-cups",
    reversePath: "/unit-converters/volume/ml-to-cups/",
    reverseLabel: "ML to Cups",
    convert: cupsToMl,
  },
  "ml-to-cups": {
    inputLabel: "Milliliters",
    outputLabel: "US cups",
    inputPlaceholder: "473",
    reverseToolId: "cups-to-ml",
    reversePath: "/unit-converters/volume/cups-to-ml/",
    reverseLabel: "Cups to ML",
    convert: mlToCups,
  },
  "bytes-to-kb": {
    inputLabel: "Bytes",
    outputLabel: "Kilobytes",
    inputPlaceholder: "1024",
    reverseToolId: "kb-to-bytes",
    reversePath: "/unit-converters/digital-storage/kb-to-bytes/",
    reverseLabel: "KB to Bytes",
    convert: bytesToKb,
  },
  "kb-to-bytes": {
    inputLabel: "Kilobytes",
    outputLabel: "Bytes",
    inputPlaceholder: "1",
    reverseToolId: "bytes-to-kb",
    reversePath: "/unit-converters/digital-storage/bytes-to-kb/",
    reverseLabel: "Bytes to KB",
    convert: kbToBytes,
  },
  "bits-to-bytes": {
    inputLabel: "Bits",
    outputLabel: "Bytes",
    inputPlaceholder: "8",
    reverseToolId: "bytes-to-bits",
    reversePath: "/unit-converters/digital-storage/bytes-to-bits/",
    reverseLabel: "Bytes to Bits",
    convert: bitsToBytes,
  },
  "bytes-to-bits": {
    inputLabel: "Bytes",
    outputLabel: "Bits",
    inputPlaceholder: "1",
    reverseToolId: "bits-to-bytes",
    reversePath: "/unit-converters/digital-storage/bits-to-bytes/",
    reverseLabel: "Bits to Bytes",
    convert: bytesToBits,
  },
  "board-feet-to-cubic-feet": {
    inputLabel: "Board feet",
    outputLabel: "Cubic feet",
    inputPlaceholder: "12",
    reverseToolId: "cubic-feet-to-board-feet",
    reversePath: "/unit-converters/volume/cubic-feet-to-board-feet/",
    reverseLabel: "Cubic Feet to Board Feet",
    convert: boardFeetToCubicFeet,
  },
  "cubic-feet-to-board-feet": {
    inputLabel: "Cubic feet",
    outputLabel: "Board feet",
    inputPlaceholder: "1",
    reverseToolId: "board-feet-to-cubic-feet",
    reversePath: "/unit-converters/volume/board-feet-to-cubic-feet/",
    reverseLabel: "Board Feet to Cubic Feet",
    convert: cubicFeetToBoardFeet,
  },
};
