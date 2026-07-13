import type { Metadata } from "next";
import PrivacyPolicyPage, {
  privacyPolicies,
  privacyPolicyItems,
} from "@/components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: `${privacyPolicyItems.appNames.whackAPC} | Privacy Policy`,
  description: `Privacy Policy for ${privacyPolicyItems.appNames.whackAPC}.`,
};

export default function Page() {
  return <PrivacyPolicyPage policy={privacyPolicies["Whack-A-PC"]} />;
}