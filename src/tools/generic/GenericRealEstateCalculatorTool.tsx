"use client";

import { realEstateCalculatorConfigs } from "@/lib/tools/logic/real-estate-calculators";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { GenericFieldCalculatorTool } from "@/tools/generic/GenericFieldCalculatorTool";

const COMPONENT_KEY = "GenericRealEstateCalculatorTool";

export const GenericRealEstateCalculatorTool = (props: GenericToolProps) => (
  <GenericFieldCalculatorTool
    {...props}
    componentKey={COMPONENT_KEY}
    configs={realEstateCalculatorConfigs}
  />
);
