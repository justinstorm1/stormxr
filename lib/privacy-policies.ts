// Policy text mirrored verbatim from the original stormxr.tech pages.
// App Store, Google Play and Meta Quest listings link to these URLs.

export type PolicyBlock = string | string[]

export type PrivacyPolicy = {
  slug: string
  name: string
  effectiveDate: string
  sections: { heading: string; blocks: PolicyBlock[] }[]
}

export const privacyPolicies: PrivacyPolicy[] = [
  {
    slug: "list-it-do-it",
    name: "List It, Do It",
    effectiveDate: "July 12, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how List It, Do It collects, uses, and protects information when you use our application.",
          "By using List It, Do It, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "List It, Do It is designed to collect as little personal information as possible.",
          [
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
        ],
      },
      {
        heading: "iCloud Synchronization",
        blocks: [
          "List It, Do It uses Apple's CloudKit to synchronize your app data across your Apple devices.",
          "Your synchronized data is stored in your personal iCloud account and managed by Apple. StormXR, LLC does not access, sell, or otherwise use this data except as necessary to provide synchronization functionality.",
          "Use of iCloud services is subject to Apple's Privacy Policy.",
        ],
      },
      {
        heading: "Photo Library Access",
        blocks: [
          "List It, Do It may request permission to access your Photo Library.",
          "This permission is used only when you choose to select or import an image within the app.",
          "Photos are never accessed without your permission, and StormXR, LLC does not collect or store your photo library.",
        ],
      },
      {
        heading: "Notifications",
        blocks: [
          "If you choose to enable notifications, List It, Do It may send notifications related to the app.",
          "You can disable notifications at any time through your device settings.",
        ],
      },
      {
        heading: "Data Sharing",
        blocks: [
          "StormXR, LLC does not sell your personal information.",
          "StormXR, LLC does not share personal information with advertisers or marketing companies.",
          "The only third-party service used by the app is Apple's CloudKit service for optional iCloud synchronization.",
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "List It, Do It is available worldwide.",
          "By using the app, you understand that your information may be processed in accordance with the laws of the United States.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect information handled by the application. However, no method of electronic storage or transmission is completely secure.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "List It, Do It is not specifically directed toward children and does not knowingly collect personal information from children.",
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        blocks: [
          "We may update this Privacy Policy from time to time.",
          "Changes become effective when the updated Privacy Policy is published.",
          "The Effective Date at the top of this policy indicates the latest revision.",
        ],
      },
      {
        heading: "Contact Us",
        blocks: [
          "Company: StormXR, LLC",
          "Website: https://www.stormxr.tech",
          "Email: craigstorm@stormxr.tech",
        ],
      },
    ],
  },
  {
    slug: "whack-a-pc",
    name: "Whack-A-PC",
    effectiveDate: "July 12, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how StormXR, LLC collects, uses, and protects information when you use our application.",
          "By using StormXR, LLC, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "StormXR, LLC is designed to collect as little personal information as possible.",
          [
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
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "StormXR, LLC is available worldwide.",
          "By using the app, you understand that your information may be processed in accordance with the laws of the United States.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect information handled by the application. However, no method of electronic storage or transmission is completely secure.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "StormXR, LLC is not specifically directed toward children and does not knowingly collect personal information from children.",
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        blocks: [
          "We may update this Privacy Policy from time to time.",
          "Changes become effective when the updated Privacy Policy is published.",
          "The Effective Date at the top of this policy indicates the latest revision.",
        ],
      },
      {
        heading: "Contact Us",
        blocks: [
          "Company: StormXR, LLC",
          "Website: https://www.stormxr.tech",
          "Email: craigstorm@stormxr.tech",
        ],
      },
    ],
  },
  {
    slug: "seek-bound",
    name: "SeekBound",
    effectiveDate: "September 16, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how SeekBound collects, uses, shares, and protects information when you use our application on iOS and Android.",
          "SeekBound is a hide-and-seek style game you play with friends. To make the game work, the app shares certain information, such as your location during a game, with the other players in your game session.",
          "By using SeekBound, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "SeekBound collects only the information needed to create your account and run a game with your friends.",
          [
            "Account information: when you sign in with Apple or Google, we receive a unique account identifier and your display name. Depending on your settings with Apple or Google, we may also receive your email address.",
            'Location information: while you have the app open and are participating in a game, we collect your device\'s location so it can be shared with the other players in your game session. If you choose to grant "Always" (background) location permission, the app can also collect your location while it is not in the foreground, for as long as you are participating in an active game.',
            "Photos and camera content: when you choose to take a photo or select one from your photo library within the app, that photo is uploaded to our servers and shared with the players in your game.",
            "Gameplay data: information about your games, such as game sessions you create or join, your role in a game, scores, and results.",
            "Friend connections: the friends you add and the game invitations you send or accept.",
          ],
        ],
      },
      {
        heading: "How We Use Information",
        blocks: [
          "We use the information we collect to:",
          [
            "Create and maintain your account.",
            "Run live games, including showing your location and shared photos to the other players in your game session.",
            "Let you find friends, send and accept game invitations, and play together.",
            "Maintain the security and integrity of the service and troubleshoot problems.",
          ],
        ],
      },
      {
        heading: "Location Information",
        blocks: [
          "By default, SeekBound collects your location only while the app is open and in the foreground and you are participating in a game.",
          'You may optionally enable background location by granting "Always" location permission on your device. If you choose to do this, the app can also collect your location while it is running in the background, but only while you are actively participating in a game. This is not required to play, and exists to keep gameplay working smoothly if you switch apps or lock your device mid-game.',
          "During an active game, your location is stored on our servers and shared in real time with the other players in that game session. This is a core part of how the hide-and-seek gameplay works.",
          'You can stop sharing your location at any time by leaving a game, closing the app, or changing the app\'s location permission (including switching from "Always" back to "While Using" or "Never") in your device settings. Disabling location will prevent you from playing.',
        ],
      },
      {
        heading: "Photos and Camera Access",
        blocks: [
          "SeekBound may request permission to access your camera and photo library.",
          "These permissions are used only when you choose to take or select a photo within the app. Photos you add are uploaded to our servers and shared with the other players in your game session.",
          "StormXR, LLC does not access your camera or photo library without your action, and does not scan or catalog your photo library.",
        ],
      },
      {
        heading: "Sign-In Providers",
        blocks: [
          "SeekBound uses Sign in with Apple and Google Sign-In for authentication. We do not collect or store your password.",
          "When you sign in, the provider shares a unique identifier and your display name with us, and may share your email address depending on your choices. Your use of these sign-in services is subject to Apple's and Google's respective privacy policies.",
        ],
      },
      {
        heading: "Sharing With Other Players",
        blocks: [
          "When you join or create a game, the following information is visible to the other players in that game session: your display name, your location while the game is active, any photos you share in the game, and your gameplay status and results.",
          "Only join games with people you trust. Information shared during a game may be seen, and potentially saved or captured, by the other players in that game.",
        ],
      },
      {
        heading: "Service Providers",
        blocks: [
          "We use a small number of third-party providers to operate the app:",
          [
            "Convex: provides our backend database and real-time synchronization infrastructure. Account, location, photo, and gameplay data are stored and processed through Convex on our behalf.",
            "Apple and Google: provide authentication (Sign in with Apple, Google Sign-In) and app distribution through the App Store and Google Play.",
          ],
        ],
      },
      {
        heading: "Data Sharing",
        blocks: [
          "StormXR, LLC does not sell your personal information.",
          "StormXR, LLC does not share your personal information with advertisers or marketing companies.",
          "We share information only with the other players in your game sessions (as described above) and with the service providers that help us operate the app.",
        ],
      },
      {
        heading: "Data Retention",
        blocks: [
          "We keep your account information for as long as your account is active.",
          "Location data is retained only as needed to operate active and recent games and is not kept as a long-term location history.",
          "Photos you share in a game are retained while that game is active and for a limited period afterward, then deleted.",
          "You can delete your account at any time from within the app or by contacting us. When you delete your account, we delete your account information, shared photos, and associated gameplay data, except where we are required to retain certain information by law.",
        ],
      },
      {
        heading: "Your Choices",
        blocks: [
          "You can control your information in the following ways:",
          [
            'Manage location and camera permissions at any time in your device settings, including choosing between "Always" (background), "While Using," or "Never" for location.',
            "Remove friends and decline or leave games at any time.",
            "Delete your account, which removes your associated data as described in Data Retention.",
            "Contact us to request access to or deletion of your personal information.",
          ],
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "SeekBound is available worldwide.",
          "By using the app, you understand that your information may be processed in the United States and other countries where we or our service providers operate, which may have different data protection laws than your country.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect information handled by the application, including encryption of data in transit. However, no method of electronic storage or transmission is completely secure.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "SeekBound is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.",
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        blocks: [
          "We may update this Privacy Policy from time to time.",
          "Changes become effective when the updated Privacy Policy is published.",
          "The Effective Date at the top of this policy indicates the latest revision.",
        ],
      },
      {
        heading: "Contact Us",
        blocks: [
          "Company: StormXR, LLC",
          "Website: https://www.stormxr.tech",
          "Email: craigstorm@stormxr.tech",
        ],
      },
    ],
  },
  {
    slug: "punchable-face",
    name: "Punchable Face",
    effectiveDate: "September 9, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how Punchable Face handles information when you use our virtual reality game on the Meta Quest platform.",
          "Punchable Face is a single-player VR game. It is designed to run entirely on your device and does not collect, transmit, or store personal information on our servers.",
          "By using Punchable Face, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "Punchable Face is designed to collect as little information as possible. We do not operate accounts, servers, or analytics for the game.",
          [
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
        ],
      },
      {
        heading: "Motion and Hardware Data",
        blocks: [
          "Punchable Face uses headset and controller position, orientation, and hand-tracking data provided by the Meta Quest system in order to render the game and respond to your movements.",
          "This motion data is processed on your device in real time to run the game. It is not recorded, stored, or transmitted to us or any third party.",
        ],
      },
      {
        heading: "Camera and Passthrough",
        blocks: [
          "Any passthrough or camera-based features on the Meta Quest headset are handled by the Meta Quest operating system. Raw camera images from the headset are not made available to the game, and we do not access, store, or transmit them.",
        ],
      },
      {
        heading: "Local Game Data",
        blocks: [
          "Punchable Face may store game progress and settings, such as high scores and preferences, locally on your device.",
          "This data stays on your device and is removed if you uninstall the game. We do not have access to it.",
        ],
      },
      {
        heading: "Platform Services",
        blocks: [
          "Punchable Face is distributed through the Meta Quest Store. Meta may collect information when you purchase, download, or run the game in accordance with Meta's own policies.",
          "Your use of the Meta Quest hardware and store is subject to Meta's Privacy Policy and Terms of Service. We do not control and are not responsible for Meta's data practices.",
        ],
      },
      {
        heading: "Data Sharing",
        blocks: [
          "StormXR, LLC does not sell your personal information.",
          "StormXR, LLC does not share personal information with advertisers or marketing companies.",
          "Because the game does not collect personal information, we have no personal information to share.",
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "Punchable Face is available worldwide.",
          "Because the game does not collect or transmit personal information, no cross-border transfer of your personal information by us takes place.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect information handled by the game. Because the game runs locally and does not transmit personal information, the primary safeguards for your data are those provided by your device and the Meta Quest platform.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "The Meta Quest platform requires users to be at least 13 years old to have an account. Punchable Face is not directed to children under 13, and we do not knowingly collect personal information from children.",
        ],
      },
      {
        heading: "Changes to This Privacy Policy",
        blocks: [
          "We may update this Privacy Policy from time to time.",
          "Changes become effective when the updated Privacy Policy is published.",
          "The Effective Date at the top of this policy indicates the latest revision.",
        ],
      },
      {
        heading: "Contact Us",
        blocks: [
          "Company: StormXR, LLC",
          "Website: https://www.stormxr.tech",
          "Email: craigstorm@stormxr.tech",
        ],
      },
    ],
  },
]
