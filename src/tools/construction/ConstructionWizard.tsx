"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import {
  calculateConcrete,
  calculateLumber,
  calculateRoofing,
  calculateShingles,
  type ConstructionCalculatorConfig,
  constructionCalculatorConfigs,
} from "@/lib/tools/logic/construction-calculators";
import type { LogicResult } from "@/lib/tools/logic/unit-conversions";
import { formatNumber } from "@/lib/tools/logic/unit-conversions";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";

type WizardStep = {
  id: string;
  title: string;
  description: string;
  fields: ConstructionCalculatorConfig["fields"];
};

type ConstructionWizardProps = {
  toolId: string;
  steps: WizardStep[];
  calculate: (values: Record<string, number>) => ReturnType<typeof calculateConcrete>;
  breakdown?: (values: Record<string, number>, result: Extract<LogicResult, { ok: true }>) => string[];
};

const parseValues = (fields: WizardStep["fields"], state: Record<string, string>) => {
  const values: Record<string, number> = {};
  for (const field of fields) {
    values[field.key] = Number(state[field.key]);
  }
  return values;
};

export const ConstructionWizard = ({
  toolId,
  steps,
  calculate,
  breakdown,
}: ConstructionWizardProps) => {
  const config = constructionCalculatorConfigs[toolId];
  const [stepIndex, setStepIndex] = useState(0);
  const [fieldState, setFieldState] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const allFields = useMemo(() => steps.flatMap((step) => step.fields), [steps]);

  const result = useMemo(() => {
    if (!isLastStep) {
      return null;
    }
    return calculate(parseValues(allFields, fieldState));
  }, [allFields, calculate, fieldState, isLastStep]);

  const handleNext = () => {
    const stepValues = parseValues(currentStep.fields, fieldState);
    for (const field of currentStep.fields) {
      if (!Number.isFinite(stepValues[field.key]) || stepValues[field.key] < 0) {
        setError(`Enter a valid ${field.label.toLowerCase()}.`);
        return;
      }
    }

    setError("");
    if (isLastStep) {
      trackFlagshipEvent("flagship_calculate", {
        tool_id: toolId,
        tool_category: "construction-calculators",
        mode: "wizard",
      });
      return;
    }

    setStepIndex((index) => index + 1);
  };

  const handleBack = () => {
    setError("");
    setStepIndex((index) => Math.max(0, index - 1));
  };

  if (!config) {
    return <ToolErrorAlert message="Construction tool not configured." />;
  }

  const breakdownLines =
    result?.ok && breakdown ? breakdown(parseValues(allFields, fieldState), result) : [];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Step {stepIndex + 1} of {steps.length}: {currentStep.title}
      </p>
      <ToolInputPanel title={currentStep.title} description={currentStep.description}>
        <div className="grid gap-4 sm:grid-cols-2">
          {currentStep.fields.map((field) => (
            <Input
              key={field.key}
              label={field.label}
              value={fieldState[field.key] ?? ""}
              onChange={(event) =>
                setFieldState((prev) => ({ ...prev, [field.key]: event.target.value }))
              }
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {stepIndex > 0 && (
            <Button type="button" variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button type="button" onClick={handleNext}>
            {isLastStep ? "Calculate" : "Next step"}
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      {result && !result.ok && <ToolErrorAlert message={result.error} />}
      {result?.ok && (
        <ToolOutputPanel>
          <p className="text-lg font-semibold text-foreground">{result.output}</p>
          {breakdownLines.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
              {breakdownLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </ToolOutputPanel>
      )}
    </div>
  );
};

export const ConcreteCalculatorTool = () => (
  <ConstructionWizard
    toolId="concrete-calculator"
    steps={[
      {
        id: "dimensions",
        title: "Slab dimensions",
        description: "Enter length and width in feet.",
        fields: [
          { key: "length", label: "Length (ft)", placeholder: "20" },
          { key: "width", label: "Width (ft)", placeholder: "10" },
        ],
      },
      {
        id: "depth",
        title: "Pour depth",
        description: "Typical patios use 4 inches; driveways often need 5–6 inches.",
        fields: [{ key: "depth", label: "Depth (in)", placeholder: "4" }],
      },
    ]}
    calculate={calculateConcrete}
    breakdown={(_values, result) => {
      const cubicYards = Number(result.meta?.cubicYards ?? 0);
      const bags = Math.ceil(cubicYards * 45);
      return [
        `Cubic yards: ${formatNumber(cubicYards, 2)}`,
        `Estimated 80 lb bags: ${bags}`,
        "Add 5–10% extra for waste on larger pours.",
      ];
    }}
  />
);

export const LumberCalculatorTool = () => (
  <ConstructionWizard
    toolId="lumber-calculator"
    steps={[
      {
        id: "dimensions",
        title: "Lumber dimensions",
        description: "Enter board length, width, and thickness.",
        fields: [
          { key: "length", label: "Length (ft)", placeholder: "8" },
          { key: "width", label: "Width (in)", placeholder: "6" },
          { key: "thickness", label: "Thickness (in)", placeholder: "2" },
        ],
      },
      {
        id: "quantity",
        title: "Quantity",
        description: "How many boards or studs are you estimating?",
        fields: [{ key: "quantity", label: "Quantity", placeholder: "32" }],
      },
    ]}
    calculate={calculateLumber}
  />
);

export const RoofingCalculatorTool = () => (
  <ConstructionWizard
    toolId="roofing-calculator"
    steps={[
      {
        id: "footprint",
        title: "Roof footprint",
        description: "Measure length and width at the eaves.",
        fields: [
          { key: "length", label: "Length (ft)", placeholder: "40" },
          { key: "width", label: "Width (ft)", placeholder: "30" },
        ],
      },
      {
        id: "pitch",
        title: "Roof pitch",
        description: "Rise in inches per 12 inches of run (e.g. 4 for 4/12).",
        fields: [{ key: "pitch", label: "Pitch rise", placeholder: "4" }],
      },
    ]}
    calculate={calculateRoofing}
    breakdown={(_values, result) => {
      const area = Number(result.meta?.area ?? 0);
      return [
        `Adjusted roof area: ${formatNumber(area, 0)} sq ft`,
        "Continue to the shingles calculator to estimate bundle count from this area.",
      ];
    }}
  />
);

export const ShinglesCalculatorTool = () => (
  <ConstructionWizard
    toolId="shingles-calculator"
    steps={[
      {
        id: "area",
        title: "Roof area",
        description: "Use the roofing calculator first if you only know footprint and pitch.",
        fields: [{ key: "roofArea", label: "Roof area (sq ft)", placeholder: "1500" }],
      },
    ]}
    calculate={calculateShingles}
  />
);
