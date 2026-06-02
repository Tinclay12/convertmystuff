export type AboutSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export const aboutPage = {
  title: "About ConvertMyStuff",
  path: "/about/",
  summary:
    "ConvertMyStuff is a free collection of browser-based converters, calculators, and utility tools—built for speed, privacy, and no login.",
  metaTitle: "About ConvertMyStuff | Free Online Tools",
  metaDescription:
    "Learn how ConvertMyStuff works: client-side tools, no account required, and informational estimates only.",
  lastUpdated: "2026-06-02",
  sections: [
    {
      id: "what-we-build",
      heading: "What we build",
      paragraphs: [
        "ConvertMyStuff.com offers free online converters, calculators, and small utilities for everyday tasks—unit conversions, developer data formats, document helpers, construction estimates, and more.",
        "The goal is simple: you should be able to complete the job in one visit without creating an account or scrolling past a long article before the tool loads.",
      ],
    },
    {
      id: "how-tools-work",
      heading: "How tools run in your browser",
      paragraphs: [
        "Most tools process your input locally in the web browser. Text, numbers, and many files never leave your device unless a specific tool page states that server processing is required.",
        "That design supports privacy for sensitive data (spreadsheets, PDFs, health inputs) and keeps basic tools fast without sign-in.",
      ],
    },
    {
      id: "guides-and-resources",
      heading: "Guides and resources",
      paragraphs: [
        "Longer explainers live in our Guides and Resource Library. Each article links back to a working tool so you can move from learning to doing in one click.",
        "We add or expand articles when they answer a real question—not to create duplicate URLs for every numeric conversion.",
      ],
    },
    {
      id: "disclaimers",
      heading: "Estimates and disclaimers",
      paragraphs: [
        "Calculator and converter results are for informational use only. They are not financial, medical, legal, or engineering advice.",
        "Rates, standards, and local codes change. Verify critical decisions with qualified professionals and official sources.",
        "See our Terms of Use for the full disclaimer and Privacy Policy for how optional analytics or ads may apply.",
      ],
    },
    {
      id: "operator",
      heading: "Who operates this site",
      paragraphs: [
        "ConvertMyStuff is operated as a personal project. It is not offered by a registered company, and we do not maintain a dedicated public support inbox.",
        "We improve tools and content over time and note a last reviewed date on pages where formulas or standards matter.",
      ],
    },
  ] satisfies AboutSection[],
};
