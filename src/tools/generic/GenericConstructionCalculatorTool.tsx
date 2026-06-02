"use client";

import { constructionCalculatorConfigs } from "@/lib/tools/logic/construction-calculators";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { GenericFieldCalculatorTool } from "@/tools/generic/GenericFieldCalculatorTool";

const COMPONENT_KEY = "GenericConstructionCalculatorTool";

export const GenericConstructionCalculatorTool = (props: GenericToolProps) => (
  <GenericFieldCalculatorTool
    {...props}
    componentKey={COMPONENT_KEY}
    configs={constructionCalculatorConfigs}
  />
);
