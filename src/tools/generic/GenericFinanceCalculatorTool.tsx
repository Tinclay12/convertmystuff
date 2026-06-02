"use client";

import { financeCalculatorConfigs } from "@/lib/tools/logic/finance-calculators";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { GenericFieldCalculatorTool } from "@/tools/generic/GenericFieldCalculatorTool";

const COMPONENT_KEY = "GenericFinanceCalculatorTool";

export const GenericFinanceCalculatorTool = (props: GenericToolProps) => (
  <GenericFieldCalculatorTool
    {...props}
    componentKey={COMPONENT_KEY}
    configs={financeCalculatorConfigs}
  />
);
