import type { Metadata } from "next";
import PrivacyPolicyPage, {
  privacyPolicies,
  privacyPolicyItems,
} from "@/components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: `${privacyPolicyItems.appNames.punchableFace} | Privacy Policy`,
  description: `Privacy Policy for ${privacyPolicyItems.appNames.punchableFace}.`,
};

export default function Page() {
  return <PrivacyPolicyPage policy={privacyPolicies["Punchable Face"]} />;
}
