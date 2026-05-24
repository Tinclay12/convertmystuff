import type { ComponentType } from "react";
import { RentalDealAnalyzerTool } from "@/tools/RentalDealAnalyzerTool";
import { MortgageCalculatorProTool } from "@/tools/MortgageCalculatorProTool";
import { CapRateCalculatorTool } from "@/tools/CapRateCalculatorTool";
import { CaseConverterTool } from "@/tools/CaseConverterTool";
import { CsvToJsonTool } from "@/tools/CsvToJsonTool";
import { JsonFormatterTool } from "@/tools/JsonFormatterTool";
import { JsonToCsvTool } from "@/tools/JsonToCsvTool";
import { NestedJsonToCsvTool } from "@/tools/NestedJsonToCsvTool";
import { RemoveDuplicateLinesTool } from "@/tools/RemoveDuplicateLinesTool";
import { UtmBuilderTool } from "@/tools/UtmBuilderTool";
import { QrCodeGeneratorTool } from "@/tools/QrCodeGeneratorTool";
import { BmiCalculatorTool } from "@/tools/BmiCalculatorTool";
import { CalorieCalculatorTool } from "@/tools/CalorieCalculatorTool";
import { MacroCalculatorTool } from "@/tools/MacroCalculatorTool";
import { PasswordGeneratorTool } from "@/tools/PasswordGeneratorTool";
import { RegexTesterTool } from "@/tools/RegexTesterTool";
import { JwtDecoderTool } from "@/tools/JwtDecoderTool";
import { CsvToHtmlTableTool } from "@/tools/CsvToHtmlTableTool";
import { NumberBaseConverterTool } from "@/tools/NumberBaseConverterTool";
import { CronBuilderTool } from "@/tools/CronBuilderTool";

export const toolComponentMap: Record<string, ComponentType> = {
  JsonToCsvTool,
  CsvToJsonTool,
  NestedJsonToCsvTool,
  JsonFormatterTool,
  RemoveDuplicateLinesTool,
  CaseConverterTool,
  CapRateCalculatorTool,
  UtmBuilderTool,
  QrCodeGeneratorTool,
  RentalDealAnalyzerTool,
  MortgageCalculatorProTool,
  BmiCalculatorTool,
  CalorieCalculatorTool,
  MacroCalculatorTool,
  PasswordGeneratorTool,
  RegexTesterTool,
  JwtDecoderTool,
  CsvToHtmlTableTool,
  CronBuilderTool,
  NumberBaseConverterTool,
};

export const genericComponentKeys = new Set([
  "GenericUnitConverterTool",
  "GenericEncoderTool",
  "GenericDataConverterTool",
  "GenericTextTool",
  "GenericFormatterTool",
  "GenericGeneratorTool",
  "GenericConstructionCalculatorTool",
  "GenericRealEstateCalculatorTool",
  "GenericMarketingTool",
  "GenericFinanceCalculatorTool",
  "GenericDesignTool",
  "GenericTimeDateTool",
  "GenericKitchenTool",
  "GenericDocumentTool",
  "GenericImageTool",
  "GenericValidatorTool",
]);

export const getToolComponent = (componentKey: string): ComponentType | undefined => {
  return toolComponentMap[componentKey];
};

export const isToolComponentAvailable = (componentKey: string): boolean => {
  return Boolean(toolComponentMap[componentKey]) || genericComponentKeys.has(componentKey);
};
