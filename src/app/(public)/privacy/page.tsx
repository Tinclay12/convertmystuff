import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { privacyPolicy } from "@/lib/content/legal";
import { buildLegalPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildLegalPageMetadata(privacyPolicy);

export default function PrivacyPolicyPage() {
  return <LegalPageLayout page={privacyPolicy} />;
}
