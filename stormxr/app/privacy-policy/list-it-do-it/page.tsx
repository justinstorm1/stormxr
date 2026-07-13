import type { Metadata } from "next";
import PrivacyPolicyPage, {
  privacyPolicies,
  PrivacyPolicy,
  privacyPolicyItems,
} from "@/components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: `${privacyPolicyItems.appNames.listItDoIt} | Privacy Policy`,
  description: `Privacy Policy for ${privacyPolicyItems.appNames.listItDoIt}.`
};

export default function Page() {
  return <PrivacyPolicyPage policy={privacyPolicies["List It, Do It"]} />;
}