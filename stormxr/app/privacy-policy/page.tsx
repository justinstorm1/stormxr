import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { privacyPolicyItems } from "@/components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policies",
  description: "Select an app to view its privacy policy.",
};

const policies = [
  { name: privacyPolicyItems.appNames.listItDoIt, href: "/privacy-policy/list-it-do-it" },
  { name: privacyPolicyItems.appNames.whackAPC, href: "/privacy-policy/whack-a-pc" },
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-8 px-6 py-16">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to StormXR
      </Link>

      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Privacy Policies</h1>
        <p className="text-muted-foreground">
          Select an app below to view its privacy policy.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {policies.map((policy) => (
          <Link
            key={policy.href}
            href={policy.href}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:bg-muted"
          >
            <span className="flex items-center gap-3 font-medium">
              <ShieldCheck className="size-5 text-muted-foreground" />
              {policy.name}
            </span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </main>
  );
}
