import type { LogicResult } from "./unit-conversions";
import { formatNumber } from "./unit-conversions";

type ConstructionInput = Record<string, number>;

const requireFields = (
  values: ConstructionInput,
  fields: string[],
): LogicResult | null => {
  for (const field of fields) {
    if (!Number.isFinite(values[field]) || values[field] < 0) {
      return { ok: false, error: `Enter a valid ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.` };
    }
  }
  return null;
};

export const calculateLumber = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["length", "width", "thickness", "quantity"]);
  if (error) return error;

  const boardFeet =
    (values.length * values.width * values.thickness * values.quantity) / 12;
  return {
    ok: true,
    output: `Estimated board feet: ${formatNumber(boardFeet, 2)}`,
    meta: { boardFeet },
  };
};

export const calculateDrywall = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["wallArea"]);
  if (error) return error;

  const sheetArea = 32;
  const sheets = Math.ceil(values.wallArea / sheetArea);
  return {
    ok: true,
    output: `Drywall sheets needed (4x8): ${sheets}`,
    meta: { sheets },
  };
};

export const calculateConcrete = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["length", "width", "depth"]);
  if (error) return error;

  const cubicFeet = values.length * values.width * (values.depth / 12);
  const cubicYards = cubicFeet / 27;
  return {
    ok: true,
    output: `Concrete needed: ${formatNumber(cubicYards, 2)} cubic yards`,
    meta: { cubicYards },
  };
};

export const calculateCement = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["cubicYards"]);
  if (error) return error;

  const bags = Math.ceil(values.cubicYards * 45);
  return {
    ok: true,
    output: `Estimated 80 lb cement bags: ${bags}`,
    meta: { bags },
  };
};

export const calculateRoofing = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["length", "width", "pitch"]);
  if (error) return error;

  const pitchFactor = Math.sqrt(1 + (values.pitch / 12) ** 2);
  const area = values.length * values.width * pitchFactor;
  return {
    ok: true,
    output: `Roof area: ${formatNumber(area, 2)} sq ft`,
    meta: { area },
  };
};

export const calculateShingles = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["roofArea"]);
  if (error) return error;

  const bundles = Math.ceil(values.roofArea / 33);
  return {
    ok: true,
    output: `Shingle bundles needed: ${bundles}`,
    meta: { bundles },
  };
};

export const calculateFlooring = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["roomLength", "roomWidth", "wastePercent"]);
  if (error) return error;

  const area = values.roomLength * values.roomWidth;
  const total = area * (1 + values.wastePercent / 100);
  return {
    ok: true,
    output: `Flooring area with waste: ${formatNumber(total, 2)} sq ft`,
    meta: { totalArea: total },
  };
};

export const calculateTile = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["roomLength", "roomWidth", "tileSize", "wastePercent"]);
  if (error) return error;

  const area = values.roomLength * values.roomWidth;
  const tileArea = values.tileSize ** 2;
  const tiles = Math.ceil((area * (1 + values.wastePercent / 100)) / tileArea);
  return {
    ok: true,
    output: `Tiles needed: ${tiles}`,
    meta: { tiles },
  };
};

export const calculateMulch = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["length", "width", "depth"]);
  if (error) return error;

  const cubicYards = (values.length * values.width * (values.depth / 12)) / 27;
  return {
    ok: true,
    output: `Mulch needed: ${formatNumber(cubicYards, 2)} cubic yards`,
    meta: { cubicYards },
  };
};

export const calculateGravel = (values: ConstructionInput): LogicResult => {
  const error = requireFields(values, ["length", "width", "depth"]);
  if (error) return error;

  const cubicYards = (values.length * values.width * (values.depth / 12)) / 27;
  const tons = cubicYards * 1.4;
  return {
    ok: true,
    output: `Gravel estimate: ${formatNumber(cubicYards, 2)} cubic yards (~${formatNumber(tons, 2)} tons)`,
    meta: { cubicYards, tons },
  };
};

export type CalculatorField = {
  key: string;
  label: string;
  placeholder: string;
  step?: string;
};

export type ConstructionCalculatorConfig = {
  fields: CalculatorField[];
  calculate: (values: ConstructionInput) => LogicResult;
};

export const constructionCalculatorConfigs: Record<string, ConstructionCalculatorConfig> = {
  "lumber-calculator": {
    fields: [
      { key: "length", label: "Length (ft)", placeholder: "8" },
      { key: "width", label: "Width (in)", placeholder: "6" },
      { key: "thickness", label: "Thickness (in)", placeholder: "2" },
      { key: "quantity", label: "Quantity", placeholder: "10" },
    ],
    calculate: calculateLumber,
  },
  "drywall-calculator": {
    fields: [{ key: "wallArea", label: "Wall area (sq ft)", placeholder: "400" }],
    calculate: calculateDrywall,
  },
  "concrete-calculator": {
    fields: [
      { key: "length", label: "Length (ft)", placeholder: "20" },
      { key: "width", label: "Width (ft)", placeholder: "10" },
      { key: "depth", label: "Depth (in)", placeholder: "4" },
    ],
    calculate: calculateConcrete,
  },
  "cement-calculator": {
    fields: [{ key: "cubicYards", label: "Concrete cubic yards", placeholder: "3" }],
    calculate: calculateCement,
  },
  "roofing-calculator": {
    fields: [
      { key: "length", label: "Roof length (ft)", placeholder: "40" },
      { key: "width", label: "Roof width (ft)", placeholder: "30" },
      { key: "pitch", label: "Pitch rise (in per 12 in run)", placeholder: "4" },
    ],
    calculate: calculateRoofing,
  },
  "shingles-calculator": {
    fields: [{ key: "roofArea", label: "Roof area (sq ft)", placeholder: "1500" }],
    calculate: calculateShingles,
  },
  "flooring-calculator": {
    fields: [
      { key: "roomLength", label: "Room length (ft)", placeholder: "14" },
      { key: "roomWidth", label: "Room width (ft)", placeholder: "12" },
      { key: "wastePercent", label: "Waste allowance (%)", placeholder: "10" },
    ],
    calculate: calculateFlooring,
  },
  "tile-calculator": {
    fields: [
      { key: "roomLength", label: "Room length (ft)", placeholder: "10" },
      { key: "roomWidth", label: "Room width (ft)", placeholder: "8" },
      { key: "tileSize", label: "Tile size (in)", placeholder: "12" },
      { key: "wastePercent", label: "Waste allowance (%)", placeholder: "10" },
    ],
    calculate: calculateTile,
  },
  "mulch-calculator": {
    fields: [
      { key: "length", label: "Bed length (ft)", placeholder: "20" },
      { key: "width", label: "Bed width (ft)", placeholder: "4" },
      { key: "depth", label: "Depth (in)", placeholder: "3" },
    ],
    calculate: calculateMulch,
  },
  "gravel-calculator": {
    fields: [
      { key: "length", label: "Area length (ft)", placeholder: "30" },
      { key: "width", label: "Area width (ft)", placeholder: "10" },
      { key: "depth", label: "Depth (in)", placeholder: "4" },
    ],
    calculate: calculateGravel,
  },
};
