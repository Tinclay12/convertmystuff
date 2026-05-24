export type JwtDecoded = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  headerJson: string;
  payloadJson: string;
  expFormatted?: string;
  iatFormatted?: string;
  nbfFormatted?: string;
};

export type JwtDecodeResult =
  | { ok: true; decoded: JwtDecoded }
  | { ok: false; error: string };

const base64UrlDecode = (segment: string): string => {
  const padded = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (padded.length % 4)) % 4;
  const base64 = padded + "=".repeat(padLength);

  if (typeof atob === "undefined") {
    return "";
  }

  return decodeURIComponent(
    Array.from(atob(base64), (char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`).join(""),
  );
};

const formatUnixDate = (value: unknown): string | undefined => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return undefined;
  }
  return new Date(value * 1000).toISOString();
};

export const decodeJwt = (token: string): JwtDecodeResult => {
  const trimmed = token.trim().replace(/^Bearer\s+/i, "");

  if (!trimmed) {
    return { ok: false, error: "Paste a JWT token to decode." };
  }

  const parts = trimmed.split(".");
  if (parts.length < 2) {
    return { ok: false, error: "JWT must have at least header and payload segments." };
  }

  try {
    const headerJson = base64UrlDecode(parts[0]);
    const payloadJson = base64UrlDecode(parts[1]);
    const header = JSON.parse(headerJson) as Record<string, unknown>;
    const payload = JSON.parse(payloadJson) as Record<string, unknown>;
    const signature = parts[2] ?? "";

    return {
      ok: true,
      decoded: {
        header,
        payload,
        signature,
        headerJson: JSON.stringify(header, null, 2),
        payloadJson: JSON.stringify(payload, null, 2),
        expFormatted: formatUnixDate(payload.exp),
        iatFormatted: formatUnixDate(payload.iat),
        nbfFormatted: formatUnixDate(payload.nbf),
      },
    };
  } catch {
    return { ok: false, error: "Could not decode JWT. Check that the token is valid base64url JSON." };
  }
};
