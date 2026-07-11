type PrivacyPolicy = {
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

const privacyPolicy: PrivacyPolicy = {
  appName: "Whack-A-PC",
  companyName: "StormXR, LLC",
  website: "https://www.stormxr.tech",
  contactEmail: "craigstorm@stormxr.tech",
  effectiveDate: "July 11, 2026",

  sections: [
    {
      title: "Introduction",
      paragraphs: [
        "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how Whack-A-PC collects, uses, and protects information when you use our application.",
        "By using Whack-A-PC, you agree to the practices described in this Privacy Policy.",
      ],
    },

    {
      title: "Information We Collect",
      paragraphs: [
        "Whack-A-PC is designed to collect as little personal information as possible.",
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
        "Whack-A-PC uses Apple's CloudKit to synchronize your app data across your Apple devices.",
        "Your synchronized data is stored in your personal iCloud account and managed by Apple. StormXR, LLC does not access, sell, or otherwise use this data except as necessary to provide synchronization functionality.",
        "Use of iCloud services is subject to Apple's Privacy Policy.",
      ],
    },

    {
      title: "Photo Library Access",
      paragraphs: [
        "Whack-A-PC may request permission to access your Photo Library.",
        "This permission is used only when you choose to select or import an image within the app.",
        "Photos are never accessed without your permission, and StormXR, LLC does not collect or store your photo library.",
      ],
    },

    {
      title: "Notifications",
      paragraphs: [
        "If you choose to enable notifications, Whack-A-PC may send notifications related to the app.",
        "You can disable notifications at any time through your device settings.",
      ],
    },

    {
      title: "Data Sharing",
      paragraphs: [
        "StormXR, LLC does not sell your personal information.",
        "StormXR, LLC does not share personal information with advertisers or marketing companies.",
        "The only third-party service used by the app is Apple's CloudKit service for optional iCloud synchronization.",
      ],
    },

    {
      title: "International Users",
      paragraphs: [
        "Whack-A-PC is available worldwide.",
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
        "Whack-A-PC is not specifically directed toward children and does not knowingly collect personal information from children.",
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
        `Company: StormXR, LLC`,
        `Website: https://www.stormxr.tech`,
        `Email: craigstorm@stormxr.tech`,
      ],
    },
  ],
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="text-muted-foreground">
          <strong>{privacyPolicy.appName}</strong>
        </p>

        <p className="text-sm text-muted-foreground">
          Effective Date: {privacyPolicy.effectiveDate}
        </p>
      </header>

      {privacyPolicy.sections.map((section) => (
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
  );
}