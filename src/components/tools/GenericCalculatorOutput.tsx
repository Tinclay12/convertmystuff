"use client";

import type { LogicResult } from "@/lib/tools/logic/unit-conversions";
import { getPrimaryResultLine } from "@/lib/tools/logic/calculator-result";
import { getToolById } from "@/lib/tools/access";

type GenericCalculatorOutputProps = {
  result: LogicResult;
  toolId: string;
  emptyHint?: string;
  disclaimer?: string;
};

export const GenericCalculatorOutput = ({
  result,
  toolId,
  emptyHint,
  disclaimer,
}: GenericCalculatorOutputProps) => {
  const tool = getToolById(toolId);
  const hint = emptyHint ?? tool?.shortDescription ?? "Enter values above to see your result.";

  if (!result.ok) {
    return (
      <div>
        <p className="text-sm text-muted">{hint}</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">—</p>
      </div>
    );
  }

  const { headline, lines } = getPrimaryResultLine(result);

  return (
    <div>
      <p className="text-sm font-medium text-foreground">Result</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{headline}</p>
      {lines.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-border pt-4">
          {lines.map((line) => (
            <li key={line.label} className="flex flex-wrap justify-between gap-2 text-sm">
              <span className="text-muted">{line.label}</span>
              <span className="font-medium text-foreground">{line.value}</span>
            </li>
          ))}
        </ul>
      )}
      {disclaimer && <p className="mt-3 text-sm text-muted">{disclaimer}</p>}
    </div>
  );
};
