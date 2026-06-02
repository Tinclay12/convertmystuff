import type { LegalPageDefinition } from "./types";

export const termsOfUse: LegalPageDefinition = {
  slug: "terms",
  title: "Terms of Use",
  path: "/terms/",
  summary:
    "Rules for using ConvertMyStuff tools, guides, and resources, including disclaimers for calculators and informational content.",
  metaTitle: "Terms of Use | ConvertMyStuff",
  metaDescription:
    "Terms of Use for ConvertMyStuff: acceptable use, disclaimers for calculators and converters, and limitations of liability.",
  lastUpdated: "2026-06-02",
  sections: [
    {
      id: "agreement",
      heading: "Agreement to these terms",
      paragraphs: [
        "By accessing or using ConvertMyStuff.com (“ConvertMyStuff,” “the site,” “we,” “us”), you agree to these Terms of Use and our Privacy Policy. If you do not agree, do not use the site.",
        "The site is operated as a personal project, not by a registered company or other formal legal entity. There is no dedicated legal or support contact channel at this time.",
        "We may update these terms from time to time. The “Last updated” date on this page indicates the latest revision. Your continued use after changes take effect constitutes acceptance of the revised terms.",
      ],
    },
    {
      id: "service",
      heading: "The service",
      paragraphs: [
        "ConvertMyStuff provides free online converters, calculators, generators, and related educational content (guides and resources). Basic use does not require an account.",
        "We may add, change, or remove tools and content at any time. Features described as optional, beta, or coming soon may not be available to all users.",
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use",
      paragraphs: ["You agree not to:"],
      listItems: [
        "Use the site in violation of applicable law or third-party rights",
        "Attempt to disrupt, overload, scrape, or reverse engineer the site beyond normal personal use",
        "Upload malware, unlawful content, or material you do not have the right to process",
        "Misrepresent outputs as professional advice, certified results, or guaranteed accurate measurements",
        "Use automated means to access the site in a way that imposes unreasonable load or circumvents intended limits",
      ],
    },
    {
      id: "no-advice",
      heading: "Informational use only — not professional advice",
      paragraphs: [
        "Tool results, guides, resources, examples, and FAQs are provided for general informational and educational purposes only.",
        "ConvertMyStuff does not provide medical, nutritional, legal, tax, investment, insurance, engineering, or other professional advice. Outputs from health, finance, real estate, construction, and similar calculators are estimates based on the inputs and assumptions you provide.",
        "Always verify critical results independently and consult qualified professionals before making decisions that affect health, safety, finances, property, or compliance obligations.",
      ],
    },
    {
      id: "accuracy",
      heading: "Accuracy and limitations",
      paragraphs: [
        "We work to keep tools and content accurate and up to date, but we do not warrant that any conversion, calculation, formatting, or output is complete, error-free, or suitable for your specific situation.",
        "Rounding, display formatting, unit definitions, tax rules, market conditions, and local codes change over time. You are responsible for confirming results before relying on them.",
      ],
    },
    {
      id: "your-content",
      heading: "Your content and responsibility",
      paragraphs: [
        "You retain responsibility for text, files, numbers, and other material you enter into tools or submit to us. Do not enter confidential or sensitive information unless you understand how the relevant tool processes data, as described on the tool page and in our Privacy Policy.",
        "You represent that you have the rights needed to use and process any content you provide and that your use does not infringe others' rights.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      paragraphs: [
        "The site, including its design, branding, software, and original content, is owned by ConvertMyStuff or its licensors and is protected by applicable intellectual property laws.",
        "You may use the site for personal and commercial tasks that the tools support, but you may not copy, resell, or redistribute the site or its code as a competing product without permission, except where allowed by law or open-source licenses that apply to specific components.",
      ],
    },
    {
      id: "third-party",
      heading: "Third-party links and services",
      paragraphs: [
        "The site may link to third-party websites or integrate third-party services (such as analytics or advertising). We are not responsible for third-party content, policies, or practices. Your use of third-party services is governed by their terms.",
      ],
    },
    {
      id: "accounts-future",
      heading: "Accounts and paid features (if offered)",
      paragraphs: [
        "Optional accounts, saved history, API access, batch processing, or paid plans may be introduced later. Those features will be subject to additional terms presented at signup or purchase. Unless otherwise stated, basic public tools will remain usable without login.",
      ],
    },
    {
      id: "disclaimer-liability",
      heading: "Disclaimers and limitation of liability",
      paragraphs: [
        "THE SITE AND ALL TOOLS AND CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
        "TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SITE OPERATOR WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
        "IN NO EVENT WILL OUR TOTAL LIABILITY FOR CLAIMS RELATING TO THE SITE EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SERVICE GIVING RISE TO THE CLAIM IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) ONE HUNDRED U.S. DOLLARS (US $100), IF YOU HAVE NOT PAID US ANY AMOUNT.",
        "Some jurisdictions do not allow certain disclaimers or limitations, so some of the above may not apply to you.",
      ],
    },
    {
      id: "indemnity",
      heading: "Indemnification",
      paragraphs: [
        "You agree to defend, indemnify, and hold harmless the site operator from claims, damages, losses, and expenses (including reasonable attorneys' fees) arising from your misuse of the site, violation of these terms, or infringement of third-party rights.",
      ],
    },
    {
      id: "termination",
      heading: "Suspension and termination",
      paragraphs: [
        "We may suspend or restrict access to the site if we reasonably believe you have violated these terms or pose a security or abuse risk. We may discontinue the site or any part of it at any time.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the United States, without regard to conflict-of-law principles, except where mandatory consumer protection laws in your country of residence apply.",
        "Any dispute relating to the site is subject to the courts of the United States where permitted by law.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      paragraphs: [
        "There is no dedicated email address or mailing address for terms or support inquiries at this time. These terms are published on the site for your reference.",
        "If we add a contact method in the future, we will update this page and the date shown at the top.",
      ],
    },
  ],
};
