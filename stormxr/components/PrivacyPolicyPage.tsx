import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export type PrivacyPolicy = {
  appName: string;
  companyName: string;
  website: string;
  contactEmail: string;
  effectiveDate: string;

  sections: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

export const privacyPolicyItems = {
    appNames: {
        listItDoIt: "List It, Do It",
        whackAPC: "Whack-A-PC"
    },
    companyNames: {
        stormXR: "StormXR, LLC"
    },
    websites: {
        stormXR: "https://www.stormxr.tech"
    },
    contactEmails: {
        craigstormStormXR: "craigstorm@stormxr.tech"
    }
}

export const privacyPolicies: Record<string, PrivacyPolicy> = {
  "List It, Do It": {
    appName: privacyPolicyItems.appNames.listItDoIt,
    companyName: privacyPolicyItems.companyNames.stormXR,
    website: privacyPolicyItems.websites.stormXR,
    contactEmail: privacyPolicyItems.contactEmails.craigstormStormXR,
    effectiveDate: "July 12, 2026",

    sections: [
      {
        title: "Introduction",
        paragraphs: [
          `${privacyPolicyItems.companyNames.stormXR} ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how ${privacyPolicyItems.appNames.listItDoIt} collects, uses, and protects information when you use our application.`,
          `By using ${privacyPolicyItems.appNames.listItDoIt}, you agree to the practices described in this Privacy Policy.`,
        ],
      },
      {
        title: "Information We Collect",
        paragraphs: [
          `${privacyPolicyItems.appNames.listItDoIt} is designed to collect as little personal information as possible.`,
        ],
        bullets: [
          "We do not collect your name.",
          "We do not collect your email address.",
          "We do not collect your phone number.",
          "We do not collect your date of birth.",
          "We do not collect your address.",
          "We do not collect payment information.",
          "We do not collect device identifiers.",
          "We do not collect IP addresses.",
          "We do not collect analytics data.",
          "We do not collect crash reports.",
          "We do not collect diagnostic information.",
          "We do not collect advertising identifiers.",
          "We do not collect location information.",
        ],
      },
      {
        title: "iCloud Synchronization",
        paragraphs: [
          `${privacyPolicyItems.appNames.listItDoIt} uses Apple's CloudKit to synchronize your app data across your Apple devices.`,
          `Your synchronized data is stored in your personal iCloud account and managed by Apple. ${privacyPolicyItems.companyNames.stormXR} does not access, sell, or otherwise use this data except as necessary to provide synchronization functionality.`,
          "Use of iCloud services is subject to Apple's Privacy Policy.",
        ],
      },
      {
        title: "Photo Library Access",
        paragraphs: [
          `${privacyPolicyItems.appNames.listItDoIt} may request permission to access your Photo Library.`,
          "This permission is used only when you choose to select or import an image within the app.",
          `Photos are never accessed without your permission, and ${privacyPolicyItems.companyNames.stormXR} does not collect or store your photo library.`,
        ],
      },
      {
        title: "Notifications",
        paragraphs: [
          `If you choose to enable notifications, ${privacyPolicyItems.appNames.listItDoIt} may send notifications related to the app.`,
          "You can disable notifications at any time through your device settings.",
        ],
      },
      {
        title: "Data Sharing",
        paragraphs: [
          `${privacyPolicyItems.companyNames.stormXR} does not sell your personal information.`,
          `${privacyPolicyItems.companyNames.stormXR} does not share personal information with advertisers or marketing companies.`,
          "The only third-party service used by the app is Apple's CloudKit service for optional iCloud synchronization.",
        ],
      },
      {
        title: "International Users",
        paragraphs: [
          `${privacyPolicyItems.appNames.listItDoIt} is available worldwide.`,
          "By using the app, you understand that your information may be processed in accordance with the laws of the United States.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We take reasonable measures to protect information handled by the application. However, no method of electronic storage or transmission is completely secure.",
        ],
      },
      {
        title: "Children's Privacy",
        paragraphs: [
          `${privacyPolicyItems.appNames.listItDoIt} is not specifically directed toward children and does not knowingly collect personal information from children.`,
        ],
      },
      {
        title: "Changes to This Privacy Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time.",
          "Changes become effective when the updated Privacy Policy is published.",
          "The Effective Date at the top of this policy indicates the latest revision.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          `Company: ${privacyPolicyItems.companyNames.stormXR}`,
          `Website: ${privacyPolicyItems.websites.stormXR}`,
          `Email: ${privacyPolicyItems.contactEmails.craigstormStormXR}`,
        ],
      },
    ],
  },
  "Whack-A-PC": {
    appName: privacyPolicyItems.appNames.whackAPC,
    companyName: privacyPolicyItems.companyNames.stormXR,
    website: privacyPolicyItems.websites.stormXR,
    contactEmail: privacyPolicyItems.contactEmails.craigstormStormXR,
    effectiveDate: "July 12, 2026",

    sections: [
        {
                title: "Introduction",
                paragraphs: [
                    `${privacyPolicyItems.companyNames.stormXR} ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how ${privacyPolicyItems.companyNames.stormXR} collects, uses, and protects information when you use our application.`,
                    `By using ${privacyPolicyItems.companyNames.stormXR}, you agree to the practices described in this Privacy Policy.`,
                ],
            },
        {
            title: "Information We Collect",
            paragraphs: [
                `${privacyPolicyItems.companyNames.stormXR} is designed to collect as little personal information as possible.`,
            ],
            bullets: [
                "We do not collect your name.",
                "We do not collect your email address.",
                "We do not collect your phone number.",
                "We do not collect your date of birth.",
                "We do not collect your address.",
                "We do not collect payment information.",
                "We do not collect device identifiers.",
                "We do not collect IP addresses.",
                "We do not collect analytics data.",
                "We do not collect crash reports.",
                "We do not collect diagnostic information.",
                "We do not collect advertising identifiers.",
                "We do not collect location information.",
            ],
        },
        {
            title: "International Users",
            paragraphs: [
                `${privacyPolicyItems.companyNames.stormXR} is available worldwide.`,
                "By using the app, you understand that your information may be processed in accordance with the laws of the United States.",
            ],
        },
            {
            title: "Security",
            paragraphs: [
                "We take reasonable measures to protect information handled by the application. However, no method of electronic storage or transmission is completely secure.",
            ],
        },
        {
            title: "Children's Privacy",
            paragraphs: [
                `${privacyPolicyItems.companyNames.stormXR} is not specifically directed toward children and does not knowingly collect personal information from children.`,
            ],
        },
        {
            title: "Changes to This Privacy Policy",
            paragraphs: [
                "We may update this Privacy Policy from time to time.",
                "Changes become effective when the updated Privacy Policy is published.",
                "The Effective Date at the top of this policy indicates the latest revision.",
            ],
        },
        {
            title: "Contact Us",
            paragraphs: [
                `Company: ${privacyPolicyItems.companyNames.stormXR}`,
                `Website: ${privacyPolicyItems.websites.stormXR}`,
                `Email: ${privacyPolicyItems.contactEmails.craigstormStormXR}`,
            ],
        },
    ],
  }
};

type PrivacyPolicyPageProps = {
  metadata?: Metadata;
  policy: PrivacyPolicy;
};

export default function PrivacyPolicyPage({
  policy,
}: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen w-full">
        <nav className="p-5 border-b sticky top-0 left-0 backdrop-blur-lg">
            <Link
                href="/privacy-policy"
                className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="size-4" />
                Back To Privacy Policies
            </Link>
        </nav>
        <main className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <header className="space-y-2">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>

            <p className="text-muted-foreground">
            <strong>{policy.appName}</strong>
            </p>

            <p className="text-sm text-muted-foreground">
            Effective Date: {policy.effectiveDate}
            </p>
        </header>

        {policy.sections.map((section) => (
            <section key={section.title} className="space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>

            {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-muted-foreground">
                {paragraph}
                </p>
            ))}

            {section.bullets && (
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                ))}
                </ul>
            )}
            </section>
        ))}
        </main>
    </div>
  );
}