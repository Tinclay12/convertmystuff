"use client";

import { useState } from "react";
import {
  ArrowRight,
  Lightning,
  LockSimple,
  Percent,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ToolOutputActions } from "@/components/tools/ToolOutputActions";
import { getToolById } from "@/lib/tools/access";
import { formatNumber } from "@/lib/tools/logic/unit-conversions";
import {
  isPercentageMode,
  percentageDefaults,
  percentageFieldLabels,
  percentageModes,
  solvePercentage,
  type PercentageMode,
} from "@/lib/tools/logic/percentage-workbench";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { buildToolShareUrl } from "@/lib/tools/tool-prefill";

const examples: {
  label: string;
  mode: PercentageMode;
  values: Record<string, string>;
}[] = [
  { label: "15% of 200", mode: "of", values: { percent: "15", value: "200" } },
  {
    label: "Score: 42 out of 50",
    mode: "ratio",
    values: { part: "42", total: "50" },
  },
  {
    label: "25% off an 80 purchase",
    mode: "decrease",
    values: { value: "80", percent: "25" },
  },
  {
    label: "Price goes from 40 to 50",
    mode: "change",
    values: { oldValue: "40", newValue: "50" },
  },
];

export const PercentageCalculatorTool = ({
  toolId,
  initialFields,
  initialPrefill,
}: GenericToolProps) => {
  const tool = getToolById(toolId);
  const [mode, setMode] = useState<PercentageMode>(
    isPercentageMode(initialFields?.mode) ? initialFields.mode : "of",
  );
  // ToolRenderer delivers the shared `value` parameter separately.
  const [values, setValues] = useState<Record<string, string>>(() =>
    initialPrefill !== undefined || Object.keys(initialFields ?? {}).length
      ? {
          ...initialFields,
          ...(initialPrefill !== undefined ? { value: initialPrefill } : {}),
        }
      : { ...percentageDefaults },
  );
  const config = percentageModes.find((item) => item.id === mode)!;
  const result = solvePercentage(mode, values);
  const answer = result.ok ? result.answer : undefined;
  const params: Record<string, string> = { mode };
  config.fields.forEach((key) => {
    if (values[key]?.trim()) params[key] = values[key].trim();
  });
  const shareUrl = tool ? buildToolShareUrl(tool.path, params) : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-strong">
        <span className="flex items-center gap-1.5">
          <Lightning size={16} className="text-accent" aria-hidden="true" />{" "}
          Results as you type
        </span>
        <span className="flex items-center gap-1.5">
          <LockSimple size={16} aria-hidden="true" /> Calculated in your browser
        </span>
      </div>
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">
          What would you like to work out?
        </legend>
        <select
          aria-label="Percentage calculation"
          value={mode}
          onChange={(event) => {
            if (isPercentageMode(event.target.value))
              setMode(event.target.value);
          }}
          className="h-12 w-full rounded-xl border border-border bg-card px-3 text-base focus:outline-none focus:ring-4 focus:ring-accent/20 sm:hidden"
        >
          {percentageModes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="hidden gap-2 sm:grid sm:grid-cols-2 xl:grid-cols-3">
          {percentageModes.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              className={`rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 ${mode === item.id ? "border-accent bg-accent-soft shadow-sm" : "border-border hover:border-accent/50 hover:bg-panel-muted"}`}
            >
              <span
                className={`block text-sm font-semibold ${mode === item.id ? "text-accent" : "text-foreground"}`}
              >
                {item.label}
              </span>
              <span className="mt-1 block text-xs text-muted-strong">
                {item.hint}
              </span>
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 xl:grid-cols-[1fr_1.1fr]">
        <section
          className="rounded-2xl bg-panel-muted p-4 sm:p-5"
          aria-labelledby="percentage-input-heading"
        >
          <h2
            id="percentage-input-heading"
            className="mb-5 text-base font-semibold"
          >
            {config.label}
          </h2>
          <div className="space-y-4">
            {config.fields.map((key) => (
              <Input
                key={key}
                id={`percentage-${key}`}
                label={percentageFieldLabels[key]}
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={values[key] ?? ""}
                placeholder={percentageDefaults[key]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [key]: event.target.value,
                  }))
                }
                className="h-14 text-xl tabular-nums"
              />
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-4"
            onClick={() => setValues({})}
          >
            Clear numbers
          </Button>
        </section>
        <section
          className="flex min-w-0 flex-col justify-between rounded-2xl border border-accent/20 bg-accent-soft p-5 sm:p-6"
          aria-label="Calculation result"
        >
          <div aria-live="polite" aria-atomic="true">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-accent">
              <span>{answer?.label ?? "Your answer"}</span>
              <Percent size={22} aria-hidden="true" />
            </div>
            {answer ? (
              <>
                <p className="break-words text-4xl font-semibold tracking-tight text-foreground tabular-nums sm:text-5xl">
                  {formatNumber(answer.value, 6)}
                  <span className="text-3xl text-accent">{answer.suffix}</span>
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-strong">
                  {answer.sentence}
                </p>
                {answer.comparison && (
                  <p className="mt-4 border-t border-accent/15 pt-3 text-sm text-muted-strong">
                    {answer.comparison.label}
                    <strong className="ml-2 text-foreground">
                      {formatNumber(answer.comparison.value, 6)}
                    </strong>
                  </p>
                )}
              </>
            ) : (
              <p
                className={`py-5 text-base leading-relaxed ${!result.ok && !result.incomplete ? "text-destructive" : "text-muted-strong"}`}
              >
                {!result.ok && result.error}
              </p>
            )}
          </div>
          <div className="mt-6">
            <ToolOutputActions
              toolId={toolId}
              componentKey="PercentageCalculatorTool"
              copyValue={
                answer ? `${answer.sentence}\n${answer.steps.join("\n")}` : ""
              }
              copyLabel="Copy answer"
              shareUrl={shareUrl}
              shareDisabled={!answer}
            />
          </div>
        </section>
      </div>
      {answer && (
        <section
          className="rounded-xl border border-border p-4 sm:p-5"
          aria-labelledby="percentage-steps-heading"
        >
          <h2 id="percentage-steps-heading" className="text-sm font-semibold">
            Here’s the math
          </h2>
          <ol className="mt-3 space-y-2 text-sm text-muted-strong">
            {answer.steps.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-panel-muted text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
      <section aria-labelledby="percentage-examples-heading">
        <h2 id="percentage-examples-heading" className="text-sm font-semibold">
          A few everyday examples
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-left text-sm hover:border-accent/40 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20"
              onClick={() => {
                setMode(example.mode);
                setValues(example.values);
              }}
            >
              <span>{example.label}</span>
              <ArrowRight
                size={16}
                className="shrink-0 text-accent"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
