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
  {
    slug: "catch-with-dad",
    name: "Catch With Dad",
    effectiveDate: "October 17, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how Catch With Dad handles information when you use our virtual reality experience on the Meta Quest platform.",
          "Catch With Dad is a single-player VR experience. It is designed to run entirely on your device and does not collect, transmit, or store personal information on our servers.",
          "By using Catch With Dad, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "Catch With Dad is designed to collect as little information as possible. We do not operate accounts, servers, or analytics for the app.",
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
          "Catch With Dad uses headset and controller position, orientation, and hand-tracking data provided by the Meta Quest system in order to render the experience and respond to your throws and catches.",
          "This motion data is processed on your device in real time. It is not recorded, stored, or transmitted to us or any third party.",
        ],
      },
      {
        heading: "Local Game Data",
        blocks: [
          "Catch With Dad saves your game preferences locally on your device. These include your selected sport, play mode, music setting, and skin tone choices.",
          "We do not receive these settings or store them on our servers. This data stays on your device and is removed if you uninstall the app.",
        ],
      },
      {
        heading: "Platform Services",
        blocks: [
          "Catch With Dad is distributed through the Meta Quest Store. Meta may collect information when you purchase, download, or run the app in accordance with Meta's own policies.",
          "Your use of the Meta Quest hardware and store is subject to Meta's Privacy Policy and Terms of Service. We do not control and are not responsible for Meta's data practices.",
        ],
      },
      {
        heading: "Data Sharing",
        blocks: [
          "StormXR, LLC does not sell your personal information.",
          "StormXR, LLC does not share personal information with advertisers or marketing companies.",
          "Because the app does not collect personal information, we have no personal information to share.",
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "Catch With Dad is available worldwide.",
          "Because the app does not collect or transmit personal information, no cross-border transfer of your personal information by us takes place.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect information handled by the app. Because the app runs locally and does not transmit personal information, the primary safeguards for your data are those provided by your device and the Meta Quest platform.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "The Meta Quest platform requires users to be at least 13 years old to have an account. Catch With Dad is not directed to children under 13, and we do not knowingly collect personal information from children.",
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
    slug: "forkshuffle",
    name: "ForkShuffle",
    effectiveDate: "November 5, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how ForkShuffle handles information when you use our application on iOS and Android.",
          "ForkShuffle saves your favorite restaurants and picks where to eat when you can't decide. The app stores your restaurants on your device and does not collect, transmit, or store personal information on our servers.",
          "By using ForkShuffle, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "ForkShuffle is designed to collect as little information as possible. We do not operate accounts, servers, or analytics for the app.",
          [
            "We do not collect your name.",
            "We do not collect your email address.",
            "We do not collect your phone number.",
            "We do not collect your date of birth.",
            "We do not collect your address.",
            "We do not collect payment information.",
            "We do not collect device identifiers.",
            "We do not collect IP addresses.",
            "We do not collect analytics or usage data.",
            "We do not collect crash reports or diagnostic information.",
            "We do not collect advertising identifiers.",
            "We do not collect your location history.",
          ],
        ],
      },
      {
        heading: "Restaurant Data",
        blocks: [
          "The restaurants you save, including their names, addresses or locations, photos, and any other details you enter, are stored locally on your device.",
          "This data is not sent to us or to any third party. It stays on your device and is removed if you uninstall the app.",
        ],
      },
      {
        heading: "Location Information",
        blocks: [
          "ForkShuffle may request permission to access your device's location.",
          "Location is used only when you tap the button to use your current location for a restaurant you are saving. Your location is read once at that moment, while the app is open, and saved with that restaurant on your device.",
          "ForkShuffle does not access your location in the background, does not track your location over time, and does not send your location to us or any third party.",
          "You can also enter an address manually instead of granting location permission. You can change or revoke location permission at any time in your device settings.",
        ],
      },
      {
        heading: "Photos and Camera Access",
        blocks: [
          "ForkShuffle may request permission to access your camera and photo library.",
          "These permissions are used only when you choose to take or select a photo within the app. Photos you add are stored locally on your device with your saved restaurants and are not uploaded to us or any third party.",
          "StormXR, LLC does not access your camera or photo library without your action, and does not scan or catalog your photo library.",
        ],
      },
      {
        heading: "Maps and Directions",
        blocks: [
          "When you choose to get directions to a restaurant, ForkShuffle opens the restaurant's address or location in a maps app on your device, such as Apple Maps or Google Maps.",
          "Once the maps app is open, your use of it is subject to that provider's privacy policy. We do not control and are not responsible for the data practices of those providers.",
        ],
      },
      {
        heading: "Platform Services",
        blocks: [
          "ForkShuffle is distributed through the Apple App Store and Google Play. Apple and Google may collect information when you download or use the app in accordance with their own policies.",
          "Your use of these stores and your device is subject to Apple's and Google's respective privacy policies.",
        ],
      },
      {
        heading: "Data Sharing",
        blocks: [
          "StormXR, LLC does not sell your personal information.",
          "StormXR, LLC does not share personal information with advertisers or marketing companies.",
          "Because the app does not collect personal information, we have no personal information to share.",
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "ForkShuffle is available worldwide.",
          "Because the app does not collect or transmit personal information, no cross-border transfer of your personal information by us takes place.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect information handled by the app. Because your data is stored locally and is not transmitted to us, the primary safeguards for your data are those provided by your device and its operating system.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "ForkShuffle is not specifically directed toward children and does not knowingly collect personal information from children.",
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
    slug: "xr-feed",
    name: "XR Feed",
    effectiveDate: "November 15, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how XR Feed handles information when you use our application on iOS and Android.",
          "XR Feed brings the latest virtual, augmented, and mixed reality news together in one place. The app does not require an account and does not collect, sell, or store personal information on our servers.",
          "By using XR Feed, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "XR Feed is designed to collect as little information as possible. We do not operate user accounts or analytics for the app.",
          [
            "We do not collect your name.",
            "We do not collect your email address.",
            "We do not collect your phone number.",
            "We do not collect your date of birth.",
            "We do not collect your address.",
            "We do not collect payment information.",
            "We do not collect device identifiers.",
            "We do not collect analytics or usage data.",
            "We do not collect crash reports or diagnostic information.",
            "We do not collect advertising identifiers.",
            "We do not collect location information.",
            "We do not track the articles you read.",
          ],
        ],
      },
      {
        heading: "About XR Feed Content",
        blocks: [
          "XR Feed aggregates news from independent publications covering virtual reality, augmented reality, and mixed reality. All articles link directly to their original publishers, who retain ownership of their content.",
          "XR Feed is an independent news aggregation service and is not affiliated with or endorsed by the publications featured.",
        ],
      },
      {
        heading: "News Content",
        blocks: [
          "To show you the latest stories, XR Feed downloads publicly available news feeds and article content over the internet from third-party publishers.",
          "As with any internet request, the servers that deliver this content may receive standard technical information such as your IP address, device type, and the time of the request. We do not use this information to identify you, and we do not combine it with any other data.",
          "Articles, images, and videos shown in XR Feed are provided by their respective publishers. StormXR, LLC does not control and is not responsible for third-party content.",
        ],
      },
      {
        heading: "Local App Data",
        blocks: [
          "Your preferences and any articles you save or bookmark are stored locally on your device.",
          "This data is not sent to us or to any third party. It stays on your device and is removed if you uninstall the app.",
        ],
      },
      {
        heading: "Third-Party Websites",
        blocks: [
          "When you open an article or video, XR Feed may display it in an in-app browser or open it in your device's web browser or another app, such as YouTube.",
          "Those websites and services may collect information in accordance with their own privacy policies. We do not control and are not responsible for the data practices of third-party websites or services.",
        ],
      },
      {
        heading: "Platform Services",
        blocks: [
          "XR Feed is distributed through the Apple App Store and Google Play. Apple and Google may collect information when you download or use the app in accordance with their own policies.",
          "Your use of these stores and your device is subject to Apple's and Google's respective privacy policies.",
        ],
      },
      {
        heading: "Data Sharing",
        blocks: [
          "StormXR, LLC does not sell your personal information.",
          "StormXR, LLC does not share personal information with advertisers or marketing companies.",
          "Because the app does not collect personal information, we have no personal information to share.",
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "XR Feed is available worldwide.",
          "Because the app does not collect personal information, no cross-border transfer of your personal information by us takes place.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect information handled by the app. Content is retrieved over secure connections where supported by the publisher, and your saved data is protected by the safeguards provided by your device and its operating system.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "XR Feed is not specifically directed toward children and does not knowingly collect personal information from children.",
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
    slug: "turbocharged",
    name: "TurboCharged",
    effectiveDate: "November 19, 2026",
    sections: [
      {
        heading: "Introduction",
        blocks: [
          "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how TurboCharged collects, uses, and protects information when you use our application on iOS and Android.",
          "TurboCharged helps you keep track of your vehicles, their mileage, and their service history, and lets you share a garage with family and friends through groups.",
          "By using TurboCharged, you agree to the practices described in this Privacy Policy.",
        ],
      },
      {
        heading: "Information We Collect",
        blocks: [
          "To provide the app's features, TurboCharged collects the following information when you create an account and use the app:",
          [
            "Account information: your email address and password (passwords are stored in hashed form by our authentication provider), or the identifier and email address provided by Sign in with Apple or Google Sign-In.",
            "Profile information: the display name you choose and your preferred currency.",
            "Vehicle information: vehicle type, year, make, model, trim, color, nickname, mileage, photos, and a VIN or other identification number if you choose to add one.",
            "Service records: service type, title, date, cost, mileage, notes, and receipt photos you choose to add.",
            "Group information: group names, group photos, members, and their roles.",
          ],
          "We do not collect your location, contacts, advertising identifiers, or browsing history, and we do not use third-party analytics or advertising in the app.",
        ],
      },
      {
        heading: "How We Use Information",
        blocks: [
          "We use the information we collect only to operate and improve TurboCharged, including to:",
          [
            "Create and secure your account and sign you in.",
            "Store and sync your vehicles, mileage, and service history across your devices.",
            "Share vehicles and service records with the members of groups you create or join.",
            "Verify your email address and help you reset your password.",
            "Provide and restore premium features you purchase.",
            "Respond to support requests.",
          ],
        ],
      },
      {
        heading: "Groups and Sharing",
        blocks: [
          "When you create or join a group, other members of that group can see your display name and the vehicles, photos, mileage, and service records stored in that group. Only share an invite link or QR code with people you trust.",
          "Group owners can manage vehicles and members in their group. If you leave a group, content you added to it may remain with that group.",
        ],
      },
      {
        heading: "Camera and Photos",
        blocks: [
          "With your permission, TurboCharged uses your camera to scan group invite QR codes, scan vehicle VIN barcodes, and take photos of your vehicles and receipts.",
          "With your permission, TurboCharged accesses your photo library only to let you choose group, vehicle, and receipt pictures. Only the photos you select are uploaded.",
          "You can change these permissions at any time in your device settings.",
        ],
      },
      {
        heading: "VIN Lookup",
        blocks: [
          "When you choose to look up a vehicle by its VIN, the app sends only the VIN to the U.S. National Highway Traffic Safety Administration's public vPIC service to retrieve the vehicle's year, make, model, and trim. No other information about you is sent.",
        ],
      },
      {
        heading: "Service Providers",
        blocks: [
          "We rely on a small number of trusted service providers to operate TurboCharged. They process information on our behalf and only as needed to provide their services:",
          [
            "Supabase: authentication, database, and file storage for your account, vehicles, service records, and photos.",
            "Apple and Google: Sign in with Apple and Google Sign-In, if you choose to use them.",
            "RevenueCat: processing and restoring in-app purchases. RevenueCat receives your account identifier, your email address, and your purchase history. Payments are handled by the App Store or Google Play; we never receive your payment card details.",
            "NHTSA vPIC: decoding a VIN you choose to look up, as described above.",
          ],
        ],
      },
      {
        heading: "In-App Purchases",
        blocks: [
          "TurboCharged may offer optional premium features through in-app purchases or subscriptions. Purchases are processed by Apple or Google under their own terms and privacy policies.",
          "You can manage or cancel subscriptions in your App Store or Google Play account settings.",
        ],
      },
      {
        heading: "Local App Data",
        blocks: [
          "TurboCharged stores some data on your device, such as your sign-in session and cached copies of your garage, so the app loads quickly. This data is removed when you sign out or uninstall the app.",
        ],
      },
      {
        heading: "Platform Services",
        blocks: [
          "TurboCharged is distributed through the Apple App Store and Google Play. Apple and Google may collect information when you download or use the app in accordance with their own policies.",
          "Your use of these stores and your device is subject to Apple's and Google's respective privacy policies.",
        ],
      },
      {
        heading: "Data Sharing",
        blocks: [
          "StormXR, LLC does not sell your personal information.",
          "StormXR, LLC does not share personal information with advertisers or marketing companies.",
          "We share information only with the members of groups you choose to join, with the service providers listed above, or when required by law.",
        ],
      },
      {
        heading: "Data Retention and Account Deletion",
        blocks: [
          "We keep your information for as long as your account is active.",
          "You can delete your account at any time from the Settings screen in the app. Deleting your account permanently removes your profile, your sign-in information, every group you own (including its vehicles, service records, invites, and photos), and your memberships in other groups.",
          "Vehicles and service records you added to groups owned by other people stay with those groups, but are no longer linked to your account.",
          "You can also request deletion by contacting us at the email address below.",
        ],
      },
      {
        heading: "International Users",
        blocks: [
          "TurboCharged is available worldwide.",
          "Your information may be stored and processed in the United States or other countries where our service providers operate. By using the app, you consent to this transfer.",
        ],
      },
      {
        heading: "Security",
        blocks: [
          "We take reasonable measures to protect your information. Data is transmitted over encrypted connections, access to your groups and photos is restricted to you and the members of your groups, and photos are kept in private storage.",
          "No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Children's Privacy",
        blocks: [
          "TurboCharged is not directed toward children under 13 and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.",
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
