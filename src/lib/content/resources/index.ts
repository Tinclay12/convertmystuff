import {
  acresToSquareFeetResource,
  clientSidePdfResource,
  concreteYardsResource,
  flatteningNestedJsonResource,
  jsonVsCsvResource,
  standardFaviconSizesResource,
  utmParametersResource,
  whatIsAnIcoFileResource,
  whatIsCapRateResource,
  whatIsJsonResource,
  whatIsNoiResource,
} from "./definitions";
import {
  aprVsInterestRateResource,
  bmrVsTdeeResource,
  cashOnCashReturnResource,
  howLoanAmortizationWorksResource,
  howTdeeIsCalculatedResource,
  howToCalculatePercentageChangeResource,
  proteinIntakeGuidelinesResource,
  simpleVsCompoundInterestResource,
  whatAreMacronutrientsResource,
  whatIsCompoundInterestResource,
  whatIsDscrResource,
  whatIsGrmResource,
} from "./wave2-finance-health-re";
import {
  boardFeetExplainedResource,
  csvEncodingAndExcelResource,
  cubicYardsToTonsResource,
  mulchCoverageResource,
  roofingSquaresResource,
  urlEncodingExplainedResource,
  whatIsBase64Resource,
  xmlVsJsonResource,
  yamlVsJsonResource,
} from "./wave3-dev-construction";
import {
  celsiusVsFahrenheitResource,
  cubicYardsExplainedResource,
  feetVsMetersReferenceResource,
  gallonsVsLitersResource,
  hectaresVsAcresResource,
  milesVsKilometersResource,
  ouncesVsGramsResource,
  poundsVsKilogramsResource,
  squareMetersVsSquareFeetResource,
} from "./wave3-unit-converters";
import {
  aspectRatioReferenceResource,
  caseConversionConventionsResource,
  cupsVsGramsResource,
  hexVsRgbColorResource,
  iso8601DateFormatResource,
  metaDescriptionBestPracticesResource,
  openGraphTagsExplainedResource,
  portionSizeCalculationsResource,
  qrCodeUrlBestPracticesResource,
  recipeScalingMathResource,
  timezoneConversionBasicsResource,
  unixTimestampExplainedResource,
  wcagContrastBasicsResource,
  whenToRemoveDuplicateLinesResource,
  wordCountVsCharacterCountResource,
} from "./wave4-categories";

export const resources = [
  whatIsAnIcoFileResource,
  standardFaviconSizesResource,
  whatIsJsonResource,
  jsonVsCsvResource,
  flatteningNestedJsonResource,
  acresToSquareFeetResource,
  whatIsCapRateResource,
  whatIsNoiResource,
  clientSidePdfResource,
  concreteYardsResource,
  utmParametersResource,
  whatIsCompoundInterestResource,
  simpleVsCompoundInterestResource,
  howLoanAmortizationWorksResource,
  aprVsInterestRateResource,
  howToCalculatePercentageChangeResource,
  whatIsDscrResource,
  cashOnCashReturnResource,
  whatIsGrmResource,
  whatAreMacronutrientsResource,
  howTdeeIsCalculatedResource,
  proteinIntakeGuidelinesResource,
  bmrVsTdeeResource,
  hectaresVsAcresResource,
  squareMetersVsSquareFeetResource,
  feetVsMetersReferenceResource,
  milesVsKilometersResource,
  poundsVsKilogramsResource,
  ouncesVsGramsResource,
  gallonsVsLitersResource,
  cubicYardsExplainedResource,
  celsiusVsFahrenheitResource,
  yamlVsJsonResource,
  whatIsBase64Resource,
  csvEncodingAndExcelResource,
  xmlVsJsonResource,
  urlEncodingExplainedResource,
  roofingSquaresResource,
  boardFeetExplainedResource,
  cubicYardsToTonsResource,
  mulchCoverageResource,
  whenToRemoveDuplicateLinesResource,
  wordCountVsCharacterCountResource,
  caseConversionConventionsResource,
  openGraphTagsExplainedResource,
  metaDescriptionBestPracticesResource,
  qrCodeUrlBestPracticesResource,
  recipeScalingMathResource,
  cupsVsGramsResource,
  portionSizeCalculationsResource,
  unixTimestampExplainedResource,
  timezoneConversionBasicsResource,
  iso8601DateFormatResource,
  hexVsRgbColorResource,
  wcagContrastBasicsResource,
  aspectRatioReferenceResource,
];

export const getResourceBySlug = (categorySlug: string, slug: string) => {
  return resources.find(
    (resource) => resource.categorySlug === categorySlug && resource.slug === slug,
  );
};

export const getAllResources = () => {
  return [...resources];
};

export const getResourcesForCategory = (categorySlug: string) => {
  return resources.filter((resource) => resource.categorySlug === categorySlug);
};

export const getResourcesForTool = (toolId: string) => {
  return resources.filter(
    (resource) =>
      resource.primaryToolId === toolId ||
      resource.relatedToolIds?.includes(toolId),
  );
};

export const getPrimaryResourcesForTool = (toolId: string) => {
  return resources.filter((resource) => resource.primaryToolId === toolId);
};

export const getResourceCategorySlugs = () => {
  const slugs = new Set(resources.map((resource) => resource.categorySlug));
  return [...slugs];
};

export const getResourceStaticParams = () => {
  return resources.map((resource) => ({
    category: resource.categorySlug,
    slug: resource.slug,
  }));
};

export const getRelatedResources = (resource: (typeof resources)[number]) => {
  const slugs = resource.relatedResourceSlugs ?? [];
  return slugs
    .map((relatedSlug) =>
      resources.find(
        (item) => item.slug === relatedSlug && item.categorySlug === resource.categorySlug,
      ) ??
      resources.find((item) => item.slug === relatedSlug),
    )
    .filter((item): item is (typeof resources)[number] => Boolean(item));
};

export const getResourcePath = (categorySlug: string, slug: string): string => {
  return `/resources/${categorySlug}/${slug}/`;
};

export const getResourceCategoryPath = (categorySlug: string): string => {
  return `/resources/${categorySlug}/`;
};

export const getResourcesIndexPath = (): string => {
  return "/resources/";
};

export const resolveResourceReference = (reference: string) => {
  if (reference.includes("/")) {
    const [categorySlug, slug] = reference.split("/") as [string, string];
    return getResourceBySlug(categorySlug, slug);
  }

  return resources.find((resource) => resource.slug === reference);
};
