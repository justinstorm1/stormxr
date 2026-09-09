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
        whackAPC: "Whack-A-PC",
        seekBound: "SeekBound",
        punchableFace: "Punchable Face"
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
  },
  "SeekBound": {
    appName: privacyPolicyItems.appNames.seekBound,
    companyName: privacyPolicyItems.companyNames.stormXR,
    website: privacyPolicyItems.websites.stormXR,
    contactEmail: privacyPolicyItems.contactEmails.craigstormStormXR,
    effectiveDate: "September 6, 2026",

    sections: [
      {
        title: "Introduction",
        paragraphs: [
          `${privacyPolicyItems.companyNames.stormXR} ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how ${privacyPolicyItems.appNames.seekBound} collects, uses, shares, and protects information when you use our application on iOS and Android.`,
          `${privacyPolicyItems.appNames.seekBound} is a hide-and-seek style game you play with friends. To make the game work, the app shares certain information, such as your location during a game, with the other players in your game session.`,
          `By using ${privacyPolicyItems.appNames.seekBound}, you agree to the practices described in this Privacy Policy.`,
        ],
      },
      {
        title: "Information We Collect",
        paragraphs: [
          `${privacyPolicyItems.appNames.seekBound} collects only the information needed to create your account and run a game with your friends.`,
        ],
        bullets: [
          "Account information: when you sign in with Apple or Google, we receive a unique account identifier and your display name. Depending on your settings with Apple or Google, we may also receive your email address.",
          "Location information: while you have the app open and are participating in a game, we collect your device's location so it can be shared with the other players in your game session.",
          "Photos and camera content: when you choose to take a photo or select one from your photo library within the app, that photo is uploaded to our servers and shared with the players in your game.",
          "Gameplay data: information about your games, such as game sessions you create or join, your role in a game, scores, and results.",
          "Friend connections: the friends you add and the game invitations you send or accept.",
        ],
      },
      {
        title: "How We Use Information",
        paragraphs: [
          "We use the information we collect to:",
        ],
        bullets: [
          "Create and maintain your account.",
          "Run live games, including showing your location and shared photos to the other players in your game session.",
          "Let you find friends, send and accept game invitations, and play together.",
          "Maintain the security and integrity of the service and troubleshoot problems.",
        ],
      },
      {
        title: "Location Information",
        paragraphs: [
          `${privacyPolicyItems.appNames.seekBound} collects your location only while the app is in use and you are participating in a game. The app does not track your location in the background.`,
          "During an active game, your location is stored on our servers and shared in real time with the other players in that game session. This is a core part of how the hide-and-seek gameplay works.",
          "You can stop sharing your location at any time by leaving a game, closing the app, or disabling location permission for the app in your device settings. Disabling location will prevent you from playing.",
        ],
      },
      {
        title: "Photos and Camera Access",
        paragraphs: [
          `${privacyPolicyItems.appNames.seekBound} may request permission to access your camera and photo library.`,
          "These permissions are used only when you choose to take or select a photo within the app. Photos you add are uploaded to our servers and shared with the other players in your game session.",
          `${privacyPolicyItems.companyNames.stormXR} does not access your camera or photo library without your action, and does not scan or catalog your photo library.`,
        ],
      },
      {
        title: "Sign-In Providers",
        paragraphs: [
          `${privacyPolicyItems.appNames.seekBound} uses Sign in with Apple and Google Sign-In for authentication. We do not collect or store your password.`,
          "When you sign in, the provider shares a unique identifier and your display name with us, and may share your email address depending on your choices. Your use of these sign-in services is subject to Apple's and Google's respective privacy policies.",
        ],
      },
      {
        title: "Sharing With Other Players",
        paragraphs: [
          "When you join or create a game, the following information is visible to the other players in that game session: your display name, your location while the game is active, any photos you share in the game, and your gameplay status and results.",
          "Only join games with people you trust. Information shared during a game may be seen, and potentially saved or captured, by the other players in that game.",
        ],
      },
      {
        title: "Service Providers",
        paragraphs: [
          "We use a small number of third-party providers to operate the app:",
        ],
        bullets: [
          "Convex: provides our backend database and real-time synchronization infrastructure. Account, location, photo, and gameplay data are stored and processed through Convex on our behalf.",
          "Apple and Google: provide authentication (Sign in with Apple, Google Sign-In) and app distribution through the App Store and Google Play.",
        ],
      },
      {
        title: "Data Sharing",
        paragraphs: [
          `${privacyPolicyItems.companyNames.stormXR} does not sell your personal information.`,
          `${privacyPolicyItems.companyNames.stormXR} does not share your personal information with advertisers or marketing companies.`,
          "We share information only with the other players in your game sessions (as described above) and with the service providers that help us operate the app.",
        ],
      },
      {
        title: "Data Retention",
        paragraphs: [
          "We keep your account information for as long as your account is active.",
          "Location data is retained only as needed to operate active and recent games and is not kept as a long-term location history.",
          "Photos you share in a game are retained while that game is active and for a limited period afterward, then deleted.",
          "You can delete your account at any time from within the app or by contacting us. When you delete your account, we delete your account information, shared photos, and associated gameplay data, except where we are required to retain certain information by law.",
        ],
      },
      {
        title: "Your Choices",
        paragraphs: [
          "You can control your information in the following ways:",
        ],
        bullets: [
          "Manage location and camera permissions at any time in your device settings.",
          "Remove friends and decline or leave games at any time.",
          "Delete your account, which removes your associated data as described in Data Retention.",
          "Contact us to request access to or deletion of your personal information.",
        ],
      },
      {
        title: "International Users",
        paragraphs: [
          `${privacyPolicyItems.appNames.seekBound} is available worldwide.`,
          "By using the app, you understand that your information may be processed in the United States and other countries where we or our service providers operate, which may have different data protection laws than your country.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We take reasonable measures to protect information handled by the application, including encryption of data in transit. However, no method of electronic storage or transmission is completely secure.",
        ],
      },
      {
        title: "Children's Privacy",
        paragraphs: [
          `${privacyPolicyItems.appNames.seekBound} is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.`,
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
  "Punchable Face": {
    appName: privacyPolicyItems.appNames.punchableFace,
    companyName: privacyPolicyItems.companyNames.stormXR,
    website: privacyPolicyItems.websites.stormXR,
    contactEmail: privacyPolicyItems.contactEmails.craigstormStormXR,
    effectiveDate: "September 9, 2026",

    sections: [
      {
        title: "Introduction",
        paragraphs: [
          `${privacyPolicyItems.companyNames.stormXR} ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how ${privacyPolicyItems.appNames.punchableFace} handles information when you use our virtual reality game on the Meta Quest platform.`,
          `${privacyPolicyItems.appNames.punchableFace} is a single-player VR game. It is designed to run entirely on your device and does not collect, transmit, or store personal information on our servers.`,
          `By using ${privacyPolicyItems.appNames.punchableFace}, you agree to the practices described in this Privacy Policy.`,
        ],
      },
      {
        title: "Information We Collect",
        paragraphs: [
          `${privacyPolicyItems.appNames.punchableFace} is designed to collect as little information as possible. We do not operate accounts, servers, or analytics for the game.`,
        ],
        bullets: [
          "We do not collect your name.",
          "We do not collect your email address.",
          "We do not collect your Meta account information.",
          "We do not collect your phone number.",
          "We do not collect your date of birth.",
          "We do not collect your address.",
          "We do not collect payment information.",
          "We do not collect device identifiers.",
          "We do not collect IP addresses.",
          "We do not collect analytics or usage data.",
          "We do not collect crash reports or diagnostic information.",
          "We do not collect advertising identifiers.",
          "We do not collect location information.",
          "We do not collect voice or microphone data.",
        ],
      },
      {
        title: "Motion and Hardware Data",
        paragraphs: [
          `${privacyPolicyItems.appNames.punchableFace} uses headset and controller position, orientation, and hand-tracking data provided by the Meta Quest system in order to render the game and respond to your movements.`,
          "This motion data is processed on your device in real time to run the game. It is not recorded, stored, or transmitted to us or any third party.",
        ],
      },
      {
        title: "Camera and Passthrough",
        paragraphs: [
          "Any passthrough or camera-based features on the Meta Quest headset are handled by the Meta Quest operating system. Raw camera images from the headset are not made available to the game, and we do not access, store, or transmit them.",
        ],
      },
      {
        title: "Local Game Data",
        paragraphs: [
          `${privacyPolicyItems.appNames.punchableFace} may store game progress and settings, such as high scores and preferences, locally on your device.`,
          "This data stays on your device and is removed if you uninstall the game. We do not have access to it.",
        ],
      },
      {
        title: "Platform Services",
        paragraphs: [
          `${privacyPolicyItems.appNames.punchableFace} is distributed through the Meta Quest Store. Meta may collect information when you purchase, download, or run the game in accordance with Meta's own policies.`,
          "Your use of the Meta Quest hardware and store is subject to Meta's Privacy Policy and Terms of Service. We do not control and are not responsible for Meta's data practices.",
        ],
      },
      {
        title: "Data Sharing",
        paragraphs: [
          `${privacyPolicyItems.companyNames.stormXR} does not sell your personal information.`,
          `${privacyPolicyItems.companyNames.stormXR} does not share personal information with advertisers or marketing companies.`,
          "Because the game does not collect personal information, we have no personal information to share.",
        ],
      },
      {
        title: "International Users",
        paragraphs: [
          `${privacyPolicyItems.appNames.punchableFace} is available worldwide.`,
          "Because the game does not collect or transmit personal information, no cross-border transfer of your personal information by us takes place.",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We take reasonable measures to protect information handled by the game. Because the game runs locally and does not transmit personal information, the primary safeguards for your data are those provided by your device and the Meta Quest platform.",
        ],
      },
      {
        title: "Children's Privacy",
        paragraphs: [
          `The Meta Quest platform requires users to be at least 13 years old to have an account. ${privacyPolicyItems.appNames.punchableFace} is not directed to children under 13, and we do not knowingly collect personal information from children.`,
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