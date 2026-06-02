"use client";

import type { ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import { getToolComponent } from "@/lib/tools/component-map";
import type { GenericToolProps } from "@/lib/tools/generic-tool-props";
import { parseToolSearchParams } from "@/lib/tools/tool-prefill";
import { GenericConstructionCalculatorTool } from "@/tools/generic/GenericConstructionCalculatorTool";
import { GenericDataConverterTool } from "@/tools/generic/GenericDataConverterTool";
import { GenericEncoderTool } from "@/tools/generic/GenericEncoderTool";
import { GenericFormatterTool } from "@/tools/generic/GenericFormatterTool";
import { GenericGeneratorTool } from "@/tools/generic/GenericGeneratorTool";
import { GenericDocumentTool } from "@/tools/generic/GenericDocumentTool";
import { GenericFinanceCalculatorTool } from "@/tools/generic/GenericFinanceCalculatorTool";
import { GenericDesignTool } from "@/tools/generic/GenericDesignTool";
import { GenericImageTool } from "@/tools/generic/GenericImageTool";
import { GenericKitchenTool } from "@/tools/generic/GenericKitchenTool";
import { GenericTimeDateTool } from "@/tools/generic/GenericTimeDateTool";
import { GenericMarketingTool } from "@/tools/generic/GenericMarketingTool";
import { GenericRealEstateCalculatorTool } from "@/tools/generic/GenericRealEstateCalculatorTool";
import { GenericTextTool } from "@/tools/generic/GenericTextTool";
import { GenericUnitConverterTool } from "@/tools/generic/GenericUnitConverterTool";
import { GenericValidatorTool } from "@/tools/generic/GenericValidatorTool";

type ToolRendererProps = {
  componentKey: string;
  toolId?: string;
};

const genericComponentMap: Record<string, ComponentType<GenericToolProps>> = {
  GenericUnitConverterTool,
  GenericEncoderTool,
  GenericDataConverterTool,
  GenericTextTool,
  GenericFormatterTool,
  GenericGeneratorTool,
  GenericConstructionCalculatorTool,
  GenericRealEstateCalculatorTool,
  GenericMarketingTool,
  GenericFinanceCalculatorTool,
  GenericDesignTool,
  GenericTimeDateTool,
  GenericKitchenTool,
  GenericDocumentTool,
  GenericImageTool,
  GenericValidatorTool,
};

export const ToolRenderer = ({ componentKey, toolId }: ToolRendererProps) => {
  const searchParams = useSearchParams();
  const { value: initialPrefill, fields: initialFields } = parseToolSearchParams(searchParams);

  const GenericComponent = genericComponentMap[componentKey];

  if (GenericComponent && toolId) {
    return (
      <GenericComponent
        toolId={toolId}
        initialPrefill={initialPrefill}
        initialFields={initialFields}
      />
    );
  }

  const ToolComponent = getToolComponent(componentKey) as ComponentType | undefined;

  if (!ToolComponent) {
    return (
      <p role="alert" className="text-sm text-destructive">
        This tool is not available yet.
      </p>
    );
  }

  return <ToolComponent />;
};
