# Tool Registry Specification

## Purpose

The site should be driven by a central tool registry so new tools can be added without manually creating one-off page structures.

The registry should control routing, metadata, categorization, related tools, execution mode, monetization, schema, and content references.

## Core Concept

Each tool should be represented as a structured object.

Example:

```ts
export const tools = [
  {
    id: "json-to-csv",
    title: "JSON to CSV Converter",
    slug: "json-to-csv",
    category: "developer-tools",
    path: "/developer-tools/json-to-csv/",
    shortDescription: "Convert JSON data into CSV format with preview and delimiter options.",
    metaTitle: "JSON to CSV Converter - Convert JSON to CSV Online",
    metaDescription: "Convert JSON to CSV online. Flatten JSON, preview columns, choose delimiters, and copy or download CSV output.",
    keywords: ["json to csv", "json file to csv", "json to csv for excel"],
    relatedTools: ["csv-to-json", "nested-json-to-csv", "json-formatter", "csv-to-table"],
    componentKey: "JsonToCsvTool",
    executionMode: "client",
    monetization: "ads",
    premiumEligible: true,
    requiresAuth: false,
    schemaType: "SoftwareApplication",
    status: "published",
    lastReviewed: "2026-05-21"
  }
]
```

## Required Fields

Each tool should include:

```ts
id: string
slug: string
title: string
category: string
path: string
shortDescription: string
metaTitle: string
metaDescription: string
keywords: string[]
relatedTools: string[]
componentKey: string
executionMode: "client" | "server" | "hybrid" | "external"
monetization: "ads" | "affiliate" | "lead-gen" | "premium" | "none"
premiumEligible: boolean
requiresAuth: boolean
schemaType: "SoftwareApplication" | "WebApplication" | "Calculator" | "WebPage"
status: "draft" | "published" | "noindex" | "archived"
lastReviewed: string
```

## Optional Fields

```ts
inputTypes?: string[]
outputTypes?: string[]
fileTypesAccepted?: string[]
maxFreeFileSizeMB?: number
maxPaidFileSizeMB?: number
supportsBatch?: boolean
sourceNotes?: string[]
formula?: string
assumptions?: string[]
faqs?: Array<{ question: string; answer: string }>
examples?: Array<{ title: string; input: string; output: string; explanation?: string }>
```

## Category Registry

Categories should also be stored in a registry.

Example:

```ts
export const categories = [
  {
    id: "developer-tools",
    title: "Developer Tools",
    slug: "developer-tools",
    path: "/developer-tools/",
    description: "Convert, format, validate, and clean developer data formats.",
    metaTitle: "Developer Tools - Format, Convert, and Validate Data",
    metaDescription: "Free developer tools for JSON, CSV, Base64, timestamps, regex, colors, and more.",
    priority: 1
  }
]
```

## Component Mapping

The registry should reference components by key, not by storing component functions directly inside content files.

Example:

```ts
export const toolComponentMap = {
  JsonToCsvTool,
  CsvToJsonTool,
  NestedJsonToCsvTool,
  JsonFormatterTool,
  RemoveDuplicateLinesTool,
  CaseConverterTool,
  AcresToSquareFeetTool,
  CapRateCalculatorTool
}
```

## Routing

Dynamic routing should use the registry to generate pages.

The app should support category/tool paths such as:

```text
/developer-tools/json-to-csv/
/text-tools/remove-duplicate-lines/
/unit-converters/area/acres-to-square-feet/
/construction-calculators/board-foot-calculator/
/real-estate-calculators/cap-rate-calculator/
/image-tools/png-to-ico/
/marketing-tools/utm-builder/
```

## SEO Metadata

Metadata should be generated from the registry.

Each tool page should generate:

- Title
- Meta description
- Canonical URL
- Open Graph title/description
- Breadcrumbs
- Schema markup
- Related-tool links

## Status Handling

Tool status should control indexing and visibility.

- `draft`: not publicly visible
- `published`: visible and indexable
- `noindex`: visible but noindex
- `archived`: not visible in navigation, may redirect or remain noindex

## Auth Handling

The `requiresAuth` field should almost always be false for public tools.

Use `requiresAuth: true` only for account-specific pages or premium-only features.

A tool may be `premiumEligible: true` without requiring auth for basic free usage.
