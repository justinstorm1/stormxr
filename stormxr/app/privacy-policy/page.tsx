import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { privacyPolicyItems } from "@/components/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policies",
  description: "Select an app to view its privacy policy.",
};

const policies = [
  { name: privacyPolicyItems.appNames.listItDoIt, href: "/privacy-policy/list-it-do-it", logo: "/images/ListItDoItLogo.webp" },
  { name: privacyPolicyItems.appNames.whackAPC, href: "/privacy-policy/whack-a-pc", logo: "/images/WhackAPCLogo.png" },
  { name: privacyPolicyItems.appNames.seekBound, href: "/privacy-policy/seek-bound", logo: "/images/SeekBoundLogo.png" },
  { name: privacyPolicyItems.appNames.punchableFace, href: "/privacy-policy/punchable-face", logo: "/images/PunchableFaceLogo.png" },
];

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <nav className="p-5 border-b sticky top-0 left-0 backdrop-blur-lg">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to StormXR
        </Link>
      </nav>
      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16">
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
                <Image
                  src={policy.logo}
                  alt={`${policy.name} Logo`}
                  width={32}
                  height={32}
                  className="size-8 rounded-md object-cover"
                />
                {policy.name}
              </span>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
