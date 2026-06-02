export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  listItems?: string[];
};

export type LegalPageDefinition = {
  slug: "privacy" | "terms";
  title: string;
  path: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  sections: LegalSection[];
};
