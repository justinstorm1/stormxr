import type { Metadata } from "next";
import PrivacyPolicyPage, {
  privacyPolicies,
  privacyPolicyItems,
} from "@/components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: `${privacyPolicyItems.appNames.seekBound} | Privacy Policy`,
  description: `Privacy Policy for ${privacyPolicyItems.appNames.seekBound}.`,
};

export default function Page() {
  return <PrivacyPolicyPage policy={privacyPolicies["SeekBound"]} />;
}
