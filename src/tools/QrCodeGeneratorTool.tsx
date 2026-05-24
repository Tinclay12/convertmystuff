"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { generateQrCodeDataUrl } from "@/lib/tools/logic/marketing-tools";

export const QrCodeGeneratorTool = () => {
  const [input, setInput] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");
    const result = await generateQrCodeDataUrl(input);
    if (!result.ok) {
      setError(result.error);
      setDataUrl("");
      setIsGenerating(false);
      return;
    }
    setDataUrl(result.output);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="QR code content">
        <Input
          label="URL or text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="https://example.com/campaign"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={handleGenerate} disabled={isGenerating}>
            Generate QR code
          </Button>
          <Button type="button" variant="secondary" onClick={() => { setInput(""); setDataUrl(""); setError(""); }}>
            Reset
          </Button>
        </div>
      </ToolInputPanel>
      {error && <ToolErrorAlert message={error} />}
      {dataUrl && (
        <ToolOutputPanel
          actions={
            <>
              <CopyButton value={input} />
              <Button type="button" onClick={handleDownload}>Download PNG</Button>
            </>
          }
        >
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dataUrl}
              alt="Generated QR code"
              className="h-64 w-64 rounded-lg border border-border"
            />
          </div>
        </ToolOutputPanel>
      )}
    </div>
  );
};
