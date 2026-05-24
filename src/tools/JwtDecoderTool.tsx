"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import { decodeJwt } from "@/lib/tools/logic/jwt-decoder";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";

export const JwtDecoderTool = () => {
  const [token, setToken] = useState("");
  const [hasDecoded, setHasDecoded] = useState(false);

  const result = useMemo(() => {
    if (!hasDecoded) return null;
    return decodeJwt(token);
  }, [hasDecoded, token]);

  const handleDecode = () => {
    setHasDecoded(true);
    trackFlagshipEvent("flagship_calculate", { tool_id: "jwt-decoder", tool_category: "developer-tools" });
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="JWT token">
        <Textarea label="Paste JWT" value={token} onChange={(e) => setToken(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
        <div className="mt-4">
          <Button type="button" onClick={handleDecode}>Decode JWT</Button>
        </div>
      </ToolInputPanel>
      {result && !result.ok && <ToolErrorAlert message={result.error} />}
      {result?.ok && (
        <>
          <ToolOutputPanel title="Header" actions={<CopyButton value={result.decoded.headerJson} label="Copy header" />}>
            <pre className="overflow-x-auto rounded-lg bg-muted/30 p-3 text-sm">{result.decoded.headerJson}</pre>
          </ToolOutputPanel>
          <ToolOutputPanel title="Payload" actions={<CopyButton value={result.decoded.payloadJson} label="Copy payload" />}>
            <pre className="overflow-x-auto rounded-lg bg-muted/30 p-3 text-sm">{result.decoded.payloadJson}</pre>
            {(result.decoded.expFormatted || result.decoded.iatFormatted) && (
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {result.decoded.iatFormatted && <li>Issued at (iat): {result.decoded.iatFormatted}</li>}
                {result.decoded.expFormatted && <li>Expires (exp): {result.decoded.expFormatted}</li>}
                {result.decoded.nbfFormatted && <li>Not before (nbf): {result.decoded.nbfFormatted}</li>}
              </ul>
            )}
          </ToolOutputPanel>
          {result.decoded.signature && (
            <p className="text-sm text-muted">Signature segment present (not verified).</p>
          )}
        </>
      )}
      <p className="rounded-lg border border-warning/20 bg-warning-bg px-3 py-2 text-sm text-warning">
        Decoded locally. Signature is not verified. Do not paste production secrets on shared devices.
      </p>
    </div>
  );
};
