import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { termsOfUse } from "@/lib/content/legal";
import { buildLegalPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildLegalPageMetadata(termsOfUse);

export default function TermsOfUsePage() {
  return <LegalPageLayout page={termsOfUse} />;
}
