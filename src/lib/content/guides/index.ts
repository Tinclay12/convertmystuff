import {
  bmiCategoriesGuide,
  clientSidePdfGuide,
  jsonToCsvGuide,
  mortgageAmortizationGuide,
  rentalDealAnalysisGuide,
  rentalPropertyAnalysisStepByStepGuide,
  tdeeGuide,
  understandingCapRateGuide,
  whatIsBmiGuide,
} from "./definitions";
import { phase2Guides } from "./phase2-guides";

export const guides = [
  whatIsBmiGuide,
  bmiCategoriesGuide,
  understandingCapRateGuide,
  tdeeGuide,
  jsonToCsvGuide,
  rentalDealAnalysisGuide,
  rentalPropertyAnalysisStepByStepGuide,
  mortgageAmortizationGuide,
  clientSidePdfGuide,
  ...phase2Guides,
];

export const getGuideBySlug = (slug: string) => {
  return guides.find((guide) => guide.slug === slug);
};

export const getAllGuides = () => {
  return [...guides];
};

export const getGuideSlugs = () => {
  return guides.map((guide) => guide.slug);
};

export const getGuidesForCategory = (categorySlug: string) => {
  return guides.filter((guide) => guide.categorySlug === categorySlug);
};

export const getGuidesForSubcategory = (categorySlug: string, subcategoryId: string) => {
  return guides.filter(
    (guide) => guide.categorySlug === categorySlug && guide.subcategoryId === subcategoryId,
  );
};
