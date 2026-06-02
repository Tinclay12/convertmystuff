import type { LegalPageDefinition } from "./types";

export const privacyPolicy: LegalPageDefinition = {
  slug: "privacy",
  title: "Privacy Policy",
  path: "/privacy/",
  summary:
    "How ConvertMyStuff handles information when you use our free online tools, guides, and resources.",
  metaTitle: "Privacy Policy | ConvertMyStuff",
  metaDescription:
    "Learn what data ConvertMyStuff collects, how browser-based tools protect your inputs, and your privacy choices.",
  lastUpdated: "2026-06-02",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      paragraphs: [
        "ConvertMyStuff.com (“ConvertMyStuff,” “the site,” “we,” “us”) provides free online converters, calculators, and utility tools. The site is operated as a personal project. It is not offered by a registered company or other formal legal entity, and we do not maintain a dedicated support or legal contact inbox.",
        "This Privacy Policy explains what information may be collected, how it is used, and the choices you have when you visit the website.",
        "Most tools on this site are designed to run in your web browser. For those tools, the text, numbers, or files you enter are processed on your device and are not sent to our servers unless a specific tool page states otherwise.",
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information we collect",
      paragraphs: [
        "The amount of information we collect depends on how you use the site and which optional services are enabled.",
      ],
      listItems: [
        "Usage and analytics data — If analytics is enabled, we may receive aggregated information such as pages visited, approximate location (derived from IP), device type, browser, and referral source. We configure analytics to avoid collecting unnecessary personal identifiers where possible.",
        "Server and security logs — Our hosting provider may automatically log technical data such as IP address, request time, user agent, and requested URL for reliability, abuse prevention, and security.",
        "Communications — We do not currently offer a public contact email or form. If a contact method is added later, information you choose to submit through it will be used only to respond to that inquiry.",
        "Cookies and similar technologies — We may use cookies or local storage for essential site operation. Third-party services (such as analytics or advertising partners, when enabled) may set their own cookies subject to their policies.",
      ],
    },
    {
      id: "tool-data",
      heading: "Tool inputs and file processing",
      paragraphs: [
        "Many converters and calculators execute entirely in your browser. For those tools, your inputs ordinarily stay on your device and are not uploaded for processing.",
        "Some tools may process files or heavy workloads on our servers when browser-only processing is not practical. When server processing is used, we aim to process data only as needed to deliver the result, avoid retaining uploads longer than necessary, and not use your content for unrelated purposes.",
        "You are responsible for the information you paste or upload. Do not submit sensitive personal, financial, or health information unless you understand how a specific tool processes data.",
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use information",
      paragraphs: ["We use collected information to:"],
      listItems: [
        "Operate, maintain, and improve the website and tools",
        "Measure traffic and understand which content is useful",
        "Protect against abuse, fraud, and security incidents",
        "Respond to inquiries and enforce our Terms of Use",
        "Comply with applicable law",
      ],
    },
    {
      id: "sharing",
      heading: "When we share information",
      paragraphs: [
        "We do not sell your personal information. We may share limited data with service providers that help us run the site (for example, hosting, analytics, or content delivery). Those providers are expected to handle data only on our instructions and for legitimate business purposes.",
        "We may disclose information if required by law, legal process, or to protect the rights, safety, and security of ConvertMyStuff, our users, or the public.",
      ],
    },
    {
      id: "analytics-ads",
      heading: "Analytics and advertising",
      paragraphs: [
        "We may use privacy-oriented analytics (such as Google Analytics 4) to understand site usage. Analytics is optional and controlled by site configuration.",
        "We may display third-party advertisements (such as Google AdSense) in the future. Ad partners may use cookies or similar technologies to serve and measure ads. Where required by law, we will provide appropriate notice and consent choices before enabling personalized advertising.",
      ],
    },
    {
      id: "retention",
      heading: "Data retention",
      paragraphs: [
        "Server logs and analytics data are retained only as long as needed for operations, security, and reporting, then deleted or aggregated.",
        "If a contact method is introduced later, correspondence would be kept only as long as needed to respond and for reasonable record-keeping.",
        "Browser-based tool data is generally not stored by us because it remains on your device unless you save it yourself.",
      ],
    },
    {
      id: "choices",
      heading: "Your choices and rights",
      paragraphs: [
        "Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of personal information, or to object to processing and receive a portable copy of data you provided.",
        "You can limit analytics collection by using browser “Do Not Track” settings, ad blockers, or opt-out tools offered by analytics providers. You can clear cookies through your browser settings.",
        "Because we do not operate a dedicated contact channel, we may be unable to respond to formal access or deletion requests. You can still limit collection using the browser and analytics controls described above.",
      ],
    },
    {
      id: "children",
      heading: "Children's privacy",
      paragraphs: [
        "ConvertMyStuff is intended for a general audience and is not directed at children under 13. We do not knowingly collect personal information from children under 13 through user accounts, because we do not offer accounts. If a child used the site, stopping use and clearing browser data will remove locally stored information on that device.",
      ],
    },
    {
      id: "international",
      heading: "International visitors",
      paragraphs: [
        "If you access the site from outside the United States, your information may be processed in the United States or other locations where our service providers operate. Laws in those locations may differ from the laws where you live.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page shows when the policy was last revised. Continued use of the site after changes become effective means you accept the updated policy.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      paragraphs: [
        "There is no dedicated email address or mailing address for privacy inquiries at this time. This policy is published on the site so you can review how the service works without creating an account.",
        "If we add a contact method in the future, we will update this page and the date shown at the top.",
      ],
    },
  ],
};
