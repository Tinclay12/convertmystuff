"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { buildUtmUrl } from "@/lib/tools/logic/utm-builder";

export const UtmBuilderTool = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const result = useMemo(
    () =>
      buildUtmUrl({
        websiteUrl,
        source,
        medium,
        campaign,
        term,
        content,
      }),
    [websiteUrl, source, medium, campaign, term, content],
  );

  const handleReset = () => {
    setWebsiteUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
  };

  const hasInput =
    websiteUrl.trim() || source.trim() || medium.trim() || campaign.trim();

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Campaign parameters">
        <Input
          label="Website URL"
          value={websiteUrl}
          onChange={(event) => setWebsiteUrl(event.target.value)}
          placeholder="https://example.com/landing"
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="Campaign source"
            value={source}
            onChange={(event) => setSource(event.target.value)}
            placeholder="newsletter"
          />
          <Input
            label="Campaign medium"
            value={medium}
            onChange={(event) => setMedium(event.target.value)}
            placeholder="email"
          />
          <Input
            label="Campaign name"
            value={campaign}
            onChange={(event) => setCampaign(event.target.value)}
            placeholder="spring-sale"
          />
          <Input
            label="Campaign term (optional)"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="running shoes"
          />
          <Input
            label="Campaign content (optional)"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="hero-banner"
          />
        </div>
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>

      {!result.ok && hasInput && <ToolErrorAlert message={result.error} />}

      {result.ok && (
        <ToolOutputPanel actions={<CopyButton value={result.url} label="Copy URL" />}>
          <p className="text-sm text-muted">Generated URL</p>
          <p className="mt-2 break-all font-mono text-sm text-foreground">{result.url}</p>
        </ToolOutputPanel>
      )}
    </div>
  );
};
