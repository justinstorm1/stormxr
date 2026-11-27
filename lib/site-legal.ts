// Privacy policy and terms of use for the stormxr.tech website itself.
// App-specific policies live in lib/privacy-policies.ts.

import type { PrivacyPolicy } from "@/lib/privacy-policies"

type LegalDocument = Pick<PrivacyPolicy, "name" | "effectiveDate" | "sections">

const contactUs = {
  heading: "Contact Us",
  blocks: [
    "Company: StormXR, LLC",
    "Website: https://www.stormxr.tech",
    "Email: craigstorm@stormxr.tech",
  ],
}

export const sitePrivacyPolicy: LegalDocument = {
  name: "Privacy Policy",
  effectiveDate: "November 5, 2026",
  sections: [
    {
      heading: "Introduction",
      blocks: [
        "StormXR, LLC ('we', 'our', or 'us') respects your privacy. This Privacy Policy explains how we collect, use, share, and protect information when you visit www.stormxr.tech (the 'Site').",
        "This policy covers the Site only. Our mobile and VR apps have their own privacy policies, available at https://www.stormxr.tech/privacy-policy.",
        "By using the Site, you agree to the practices described in this Privacy Policy.",
      ],
    },
    {
      heading: "Information We Collect",
      blocks: [
        "You can browse the Site without creating an account or telling us who you are. We collect:",
        [
          "Information you give us: when you use our contact form, we collect your name, email address, phone number (optional), the topic you select, and your message.",
          "Usage information: when you visit the Site, we collect limited, aggregated information about how it is used, such as pages viewed, the referring website, browser and operating system type, device type, and approximate country.",
          "Technical information: like most websites, our hosting provider automatically processes technical data such as your IP address and browser details in order to deliver pages and protect the Site.",
        ],
        "We do not ask for or knowingly collect sensitive personal information, and we do not collect payment information on the Site.",
      ],
    },
    {
      heading: "How We Use Information",
      blocks: [
        "We use the information we collect to:",
        [
          "Respond to your messages, inquiries, and requests.",
          "Understand how the Site is used so we can improve its content and performance.",
          "Protect the Site against spam, abuse, and security threats.",
          "Comply with legal obligations.",
        ],
      ],
    },
    {
      heading: "Contact Form",
      blocks: [
        "When you submit the contact form, your message is stored in our secure message inbox and delivered by email to the StormXR team so we can respond.",
        "Please do not include sensitive or confidential information in your message.",
      ],
    },
    {
      heading: "Analytics",
      blocks: [
        "We use Vercel Web Analytics to understand how visitors use the Site. Vercel Web Analytics does not use cookies, does not identify you personally, and does not track you across other websites.",
        "We see analytics only in aggregate, such as how many people visited a page. We do not use this information for advertising.",
      ],
    },
    {
      heading: "Spam Protection",
      blocks: [
        "Our contact form is protected by Google reCAPTCHA to prevent spam and abuse. reCAPTCHA collects hardware and software information, such as device and browser data, and sends it to Google for analysis.",
        "Your use of reCAPTCHA is subject to Google's Privacy Policy and Terms of Service.",
      ],
    },
    {
      heading: "Embedded Content and Links",
      blocks: [
        "The Site includes content from other services:",
        [
          "YouTube videos are embedded using YouTube's privacy-enhanced mode. YouTube may collect information and set cookies once you play a video, under Google's Privacy Policy.",
          "VR Lens podcast episodes are streamed from Spotify for Creators. When you play an episode, your browser connects to Spotify's servers, which may collect information under Spotify's Privacy Policy.",
        ],
        "The Site also links to other websites, such as podcast platforms, social media, app stores, and news articles. We are not responsible for the content or privacy practices of those websites, and we encourage you to read their privacy policies.",
      ],
    },
    {
      heading: "Cookies",
      blocks: [
        "We do not use advertising or tracking cookies on the Site.",
        "Third-party embedded content, such as YouTube videos and reCAPTCHA, may set its own cookies when it loads or when you interact with it. You can control or delete cookies through your browser settings.",
      ],
    },
    {
      heading: "Service Providers",
      blocks: [
        "We use a small number of third-party providers to operate the Site:",
        [
          "Vercel: hosts the Site and provides privacy-friendly analytics.",
          "Convex: provides our database, which stores contact form messages and Site content.",
          "Resend: delivers contact form messages to our team by email.",
          "Google: provides reCAPTCHA spam protection and hosts embedded YouTube videos.",
          "Spotify: hosts and streams VR Lens podcast episodes.",
        ],
        "These providers process information on our behalf or under their own privacy policies, as described above.",
      ],
    },
    {
      heading: "Data Sharing",
      blocks: [
        "StormXR, LLC does not sell your personal information.",
        "StormXR, LLC does not share your personal information with advertisers or marketing companies, and does not share it for cross-context behavioral advertising.",
        "We share information only with the service providers that help us operate the Site, or when required by law or to protect our rights, users, or the public.",
      ],
    },
    {
      heading: "Data Retention",
      blocks: [
        "We keep contact form messages for as long as needed to respond to you and to maintain our business records. You can ask us to delete your messages at any time.",
        "Analytics data is kept in aggregate and does not identify you personally.",
      ],
    },
    {
      heading: "Your Rights and Choices",
      blocks: [
        "You can contact us at any time to request access to, correction of, or deletion of the personal information you have sent us.",
        "Depending on where you live, such as in the European Union, the United Kingdom, or certain U.S. states including California, you may have additional rights under local law, such as the right to object to or restrict certain processing. We will respond to verified requests as required by applicable law and will not discriminate against you for exercising your rights.",
        "To make a request, email us using the contact information below.",
      ],
    },
    {
      heading: "International Visitors",
      blocks: [
        "The Site is operated from the United States.",
        "By using the Site, you understand that your information may be processed in the United States and other countries where we or our service providers operate, which may have different data protection laws than your country.",
      ],
    },
    {
      heading: "Security",
      blocks: [
        "We take reasonable measures to protect the information we handle, including encryption of data in transit. However, no method of electronic storage or transmission is completely secure.",
      ],
    },
    {
      heading: "Children's Privacy",
      blocks: [
        "The Site is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.",
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
    contactUs,
  ],
}

export const termsOfUse: LegalDocument = {
  name: "Terms of Use",
  effectiveDate: "November 27, 2026",
  sections: [
    {
      heading: "Agreement to These Terms",
      blocks: [
        "These Terms of Use ('Terms') govern your access to and use of www.stormxr.tech (the 'Site'), operated by StormXR, LLC ('we', 'our', or 'us').",
        "These Terms also cover any and all applications developed by StormXR, LLC (our 'Apps'), on any platform, including our mobile app TurboCharged. References to the Site in these Terms include our Apps unless the context requires otherwise. For our Apps, these Terms are the end-user license agreement.",
        "By accessing or using the Site, or by downloading, installing, or using any of our Apps, you agree to be bound by these Terms and by the applicable privacy policy: our Privacy Policy for the Site, or the App's own privacy policy for each App. If you do not agree, please do not use the Site or our Apps.",
      ],
    },
    {
      heading: "Eligibility",
      blocks: [
        "You must be at least 13 years old to use the Site. If you are under the age of majority where you live, you may use the Site only with the involvement of a parent or legal guardian who agrees to these Terms.",
      ],
    },
    {
      heading: "Our Content",
      blocks: [
        "The Site and its content, including articles, podcast episodes, videos, images, graphics, logos, and the design of the Site, are owned by StormXR, LLC or its licensors and are protected by copyright, trademark, and other laws.",
        "StormXR, NextWave XR, VR Lens, StormyCs VR, and our app names and logos are trademarks of StormXR, LLC. Other trademarks shown on the Site belong to their respective owners.",
      ],
    },
    {
      heading: "Permitted Use",
      blocks: [
        "We grant you a limited, personal, non-exclusive, non-transferable, revocable license to access and view the Site for your own personal, non-commercial use.",
        "You are welcome to share links to pages on the Site. Except as permitted by law or with our prior written permission, you may not copy, reproduce, republish, distribute, modify, or create derivative works from the Site's content.",
        "Your right to download, install, and use our Apps is granted separately, as described in App License below.",
      ],
    },
    {
      heading: "Prohibited Conduct",
      blocks: [
        "When using the Site, you agree not to:",
        [
          "Use the Site in any way that violates applicable laws or regulations.",
          "Attempt to gain unauthorized access to the Site, its administrative areas, its servers, or any related systems.",
          "Interfere with or disrupt the Site, including by introducing malware or placing an unreasonable load on our infrastructure.",
          "Use bots, scrapers, or other automated means to access or collect content from the Site, except for search engine indexing in line with our robots.txt file.",
          "Use the contact form to send spam, unsolicited advertising, or harassing, abusive, or unlawful messages.",
          "Impersonate any person or organization, or misrepresent your affiliation with anyone.",
        ],
      ],
    },
    {
      heading: "Messages You Send Us",
      blocks: [
        "When you contact us, you are responsible for the content of your message and confirm that you have the right to send it. Please do not send confidential or sensitive information through the contact form.",
        "If you send us ideas, suggestions, or feedback, you agree that we may use them without any obligation to you. We are not obligated to keep unsolicited ideas confidential.",
      ],
    },
    {
      heading: "Our Apps",
      blocks: [
        "These Terms apply to your use of any and all applications developed by StormXR, LLC. Your download and use of our Apps are also subject to the terms of the store you obtain them from, such as the Apple App Store, Google Play, or the Meta Quest Store, and to each app's privacy policy.",
        "If these Terms conflict with the terms of the store you obtained an App from, the store's terms govern to the extent of the conflict.",
      ],
    },
    {
      heading: "App License",
      blocks: [
        "Subject to these Terms, we grant you a limited, personal, non-exclusive, non-transferable, revocable license to download, install, and use our Apps for your own personal, non-commercial use on devices that you own or control, as permitted by the usage rules of the store you obtained the App from.",
        "Our Apps are licensed to you, not sold. We and our licensors keep all rights not expressly granted to you in these Terms, including all rights in the Apps' software, design, and content.",
        "Except where applicable law allows it despite this restriction, you may not rent, lease, lend, sell, redistribute, or sublicense an App, or copy, modify, decompile, reverse-engineer, disassemble, or create derivative works of an App or any part of it.",
        "This license continues until it is ended by you or by us. You can end it at any time by deleting the App from your devices. It ends automatically if you fail to comply with these Terms.",
        "We may release updates to our Apps, and some updates may be needed to keep using an App or some of its features.",
      ],
    },
    {
      heading: "TurboCharged",
      blocks: [
        "TurboCharged is a mobile app published by StormXR, LLC and available on the Apple App Store and Google Play. It helps you track your vehicles (cars, motorcycles, and other vehicles), their service history and costs, and reminders for them. It includes VIN scanning, and it lets you share vehicles with other people through groups.",
        "The sections from TurboCharged Accounts through Reminders and Vehicle Information apply to TurboCharged in addition to the rest of these Terms.",
        "How TurboCharged collects, uses, and protects your information is described in the TurboCharged Privacy Policy at https://www.stormxr.tech/privacy-policy/turbocharged",
      ],
    },
    {
      heading: "TurboCharged Accounts",
      blocks: [
        "You need an account to use TurboCharged. You create one and sign in with Sign in with Apple or Google Sign-In.",
        "You agree to provide accurate information, to keep your account and the devices you use it on secure, and to tell us promptly if you believe someone has used your account without your permission. You are responsible for all activity on your account.",
        "You can delete your account at any time from the Settings screen in the app. What happens to your data when you do is described in the TurboCharged Privacy Policy. Deleting your account does not cancel a subscription; see TurboCharged Pro Subscriptions and Purchases below.",
        "We may suspend or terminate your account, or your access to TurboCharged, if you violate these Terms, if we are required to by law, or if needed to protect TurboCharged, its users, or us.",
      ],
    },
    {
      heading: "TurboCharged Pro Subscriptions and Purchases",
      blocks: [
        "TurboCharged is free to download. The free tier lets you track one personal vehicle. TurboCharged Pro adds unlimited vehicles, groups, and reminders.",
        "Pro is offered as monthly and yearly auto-renewing subscriptions and as a one-time Lifetime purchase. The price and length of each option are shown in the app before you buy.",
        [
          "Payment: payment is charged to your Apple ID or Google account when you confirm your purchase. Purchases are processed by Apple or Google, and we use RevenueCat to manage and verify them. We never receive your payment card details.",
          "Automatic renewal: subscriptions renew automatically for the same period unless you cancel at least 24 hours before the end of the current period. Your account is charged for renewal within the 24 hours before the end of the current period.",
          "Managing and cancelling: you can manage or cancel a subscription in your App Store or Google Play subscription settings. Deleting the app, or deleting your TurboCharged account, does not cancel a subscription. If you cancel, Pro stays active until the end of the period you have already paid for.",
          "Free trials and introductory offers: we may offer free trials or introductory prices. If we do, the offer's terms are shown in the app before you accept it, and unless you cancel at least 24 hours before the trial or introductory period ends, your subscription continues at the regular price. Any unused portion of a free trial is forfeited when you purchase a subscription.",
          "Refunds: refunds are handled by Apple or Google under their own refund policies. Because we do not process payments, we cannot issue refunds ourselves.",
          "Lifetime: a Lifetime purchase is a one-time payment that unlocks Pro for as long as StormXR, LLC continues to offer and support TurboCharged. It refers to the lifetime of the app, not the lifetime of the purchaser. If TurboCharged is discontinued, Lifetime access ends with it. A Lifetime purchase is personal to you and is not transferable.",
          "Price changes: we may change our prices. Apple or Google will notify you of a subscription price change in advance, as their rules require, and a price change does not affect a period you have already paid for.",
        ],
        "If your Pro subscription lapses or is cancelled, we keep your existing data, but Pro features pause until you subscribe again. For example, reminder notifications stop, and you may not be able to add vehicles or groups beyond what the free tier allows.",
      ],
    },
    {
      heading: "Your Content in TurboCharged",
      blocks: [
        "'Your content' means the vehicles, service records, costs, mileage, notes, photos, group names, and other information you add to TurboCharged. You own your content.",
        "Most of your content, including vehicle, receipt, and group photos, is stored with our cloud service provider so that it syncs across your devices and can be shared with your groups. Registration and insurance document photos are stored only on your device, as described in the TurboCharged Privacy Policy.",
        "You grant StormXR, LLC a worldwide, non-exclusive, royalty-free license to host, store, copy, process, transmit, and display your content, only as needed to operate, secure, and support TurboCharged. This includes showing your content to the members of groups you share it with. This license ends when your content is deleted, except for content that stays with a group after you leave it or delete your account, as described in the TurboCharged Privacy Policy.",
        "You are responsible for the content you upload and share. You confirm that you have the rights needed to upload and share it, for example any photos you add.",
        "We do not review content before it is added, but we may remove content that violates these Terms or the law.",
      ],
    },
    {
      heading: "TurboCharged Groups and Sharing",
      blocks: [
        "You can create a group and invite other people to it with an invite link or QR code. Content shared into a group is visible to its members according to their roles:",
        [
          "Owner: full control of the group, including managing its members and deleting the group.",
          "Editor: can add and edit vehicles and service records, and can share view-only invites.",
          "Viewer: read-only access.",
        ],
        "The group owner controls the group's membership. Anyone who holds an active invite link can join the group, so share invite links and QR codes carefully and only with people you trust. The owner can regenerate a group's invite link at any time, which immediately stops the old link from working.",
        "You can leave a group at any time. Content you added to a group may stay with that group after you leave, as described in the TurboCharged Privacy Policy.",
        "We are not responsible for how other group members use content you share with them.",
      ],
    },
    {
      heading: "Acceptable Use of TurboCharged",
      blocks: [
        "In addition to the rules in Prohibited Conduct above, when using TurboCharged you agree not to:",
        [
          "Upload or share content that is unlawful, or that you do not have the right to share.",
          "Harass, threaten, or abuse other group members, or share their content without their permission.",
          "Join or access a group or content that you have not been invited to.",
          "Reverse-engineer, decompile, or tamper with the app, except where applicable law allows it.",
          "Get around Pro limits, purchase verification, or the app's security features, or access Pro features without a valid purchase.",
          "Interfere with or place an unreasonable load on the app or the servers it uses.",
        ],
        "If you break these rules, we may remove content, remove you from groups, or suspend or terminate your account.",
      ],
    },
    {
      heading: "Reminders and Vehicle Information",
      blocks: [
        "Reminders for maintenance, registration, insurance, inspection, and similar events are a Pro feature, delivered as local notifications on your device. They are provided as a convenience. Reminders may be delayed or not delivered, for example because of your device settings, notification permissions, operating system limits, or a lapsed Pro subscription.",
        "You remain responsible for your vehicle's maintenance and for meeting registration, insurance, inspection, and other deadlines. We are not responsible for any missed maintenance or deadline, or for any fine, penalty, damage, or loss that results from it.",
        "VIN lookups rely on a third-party database and may return incomplete or inaccurate results. Cost totals and other figures are calculated from the information entered and may also be inaccurate. Please check important information yourself.",
        "TurboCharged is not professional mechanical, legal, or financial advice. For advice about your vehicle or your obligations, consult a qualified professional.",
      ],
    },
    {
      heading: "Apple App Store Additional Terms",
      blocks: [
        "The following terms apply to any App, including TurboCharged, that you obtain from the Apple App Store. If they conflict with anything else in these Terms, these terms govern for that App.",
        [
          "Parties: these Terms are an agreement between you and StormXR, LLC only, and not with Apple Inc. ('Apple'). StormXR, LLC, not Apple, is solely responsible for the App and its content.",
          "Scope of license: your license to use the App is limited to a non-transferable license to use the App on Apple-branded products that you own or control, as permitted by the Usage Rules in the Apple Media Services Terms and Conditions, except that the App may be accessed and used by other accounts associated with you through Family Sharing or volume purchasing.",
          "Maintenance and support: StormXR, LLC is solely responsible for providing any maintenance and support services for the App, as described in these Terms or as required by applicable law. Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App.",
          "Warranty: StormXR, LLC is solely responsible for any product warranties, whether express or implied by law, to the extent they are not effectively disclaimed. If the App fails to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the App to you. To the maximum extent permitted by applicable law, Apple has no other warranty obligation whatsoever with respect to the App, and any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty are the sole responsibility of StormXR, LLC.",
          "Product claims: StormXR, LLC, not Apple, is responsible for addressing any claims by you or any third party relating to the App or your possession and use of it, including (i) product liability claims; (ii) any claim that the App fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection, privacy, or similar legislation. These Terms do not limit StormXR, LLC's liability to you beyond what applicable law permits.",
          "Intellectual property: if a third party claims that the App or your possession and use of it infringes that third party's intellectual property rights, StormXR, LLC, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of that claim.",
          "Legal compliance: you represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a 'terrorist supporting' country; and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.",
          "Questions and complaints: please direct any questions, complaints, or claims about the App to StormXR, LLC, using the details in Contact Us below.",
          "Third-party terms: you must comply with applicable third-party terms of agreement when using the App, such as your wireless data service agreement.",
          "Third-party beneficiary: Apple and Apple's subsidiaries are third-party beneficiaries of these Terms. Once you accept these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary.",
        ],
      ],
    },
    {
      heading: "Google Play",
      blocks: [
        "If you obtain an App, including TurboCharged, from Google Play, your use of it is also subject to the Google Play Terms of Service. Google is not a party to these Terms and is not responsible for the App, its content, or its maintenance, support, or warranties.",
      ],
    },
    {
      heading: "Third-Party Links and Content",
      blocks: [
        "The Site contains links to, and embedded content from, third-party websites and services, such as YouTube, Spotify, podcast platforms, social media, app stores, and news publications.",
        "We do not control and are not responsible for third-party websites, content, products, or services. Your use of them is at your own risk and subject to their own terms and policies.",
      ],
    },
    {
      heading: "Disclaimers",
      blocks: [
        "The Site, our Apps, and their content are provided for general informational purposes on an 'as is' and 'as available' basis. While we work to keep content accurate and up to date, we make no warranties, express or implied, about the completeness, accuracy, reliability, or availability of the Site, our Apps, or their content. We do not warrant that our Apps will be uninterrupted or error-free.",
        "To the fullest extent permitted by law, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      ],
    },
    {
      heading: "Limitation of Liability",
      blocks: [
        "To the fullest extent permitted by law, StormXR, LLC and its owners, employees, and contributors will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, or goodwill, arising out of or related to your use of, or inability to use, the Site or our Apps.",
        "To the fullest extent permitted by law, our total liability for any claim arising out of or related to the Site or our Apps will not exceed the greater of (a) one hundred U.S. dollars (US$100), or (b) the total amount you paid for our Apps and in-app purchases, including through Apple or Google, in the twelve (12) months before the event giving rise to the claim.",
        "Some jurisdictions do not allow certain warranty disclaimers or limitations of liability, so some of the above may not apply to you.",
      ],
    },
    {
      heading: "Indemnification",
      blocks: [
        "You agree to defend, indemnify, and hold harmless StormXR, LLC and its owners, employees, and contributors from any claims, damages, losses, and expenses, including reasonable attorneys' fees, arising out of your violation of these Terms, your misuse of the Site or our Apps, or content you upload or share through our Apps.",
      ],
    },
    {
      heading: "Suspension and Changes to the Site",
      blocks: [
        "We may change, suspend, or discontinue any part of the Site at any time without notice. We may restrict or end your access to the Site if we believe you have violated these Terms.",
      ],
    },
    {
      heading: "Governing Law",
      blocks: [
        "These Terms are governed by the laws of the State of New Jersey, without regard to its conflict of law principles.",
        "Any dispute arising out of or related to these Terms or the Site will be brought exclusively in the state or federal courts located in New Jersey, and you consent to the personal jurisdiction of those courts.",
      ],
    },
    {
      heading: "General",
      blocks: [
        "If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect. Our failure to enforce any provision is not a waiver of our right to do so later.",
        "These Terms, together with our Privacy Policy and the privacy policy for each App you use, are the entire agreement between you and StormXR, LLC regarding the Site and our Apps. Any separate written agreement with us, such as for development or advisory services, governs those services.",
      ],
    },
    {
      heading: "Changes to These Terms",
      blocks: [
        "We may update these Terms from time to time.",
        "If we make a material change to the terms that apply to our Apps, we will post the updated Terms on this page.",
        "Changes become effective when the updated Terms are published. Your continued use of the Site after that means you accept the updated Terms.",
        "The Effective Date at the top of these Terms indicates the latest revision.",
      ],
    },
    contactUs,
  ],
}

/** Plain-text version of a legal document, e.g. for App Store Connect's License Agreement field. */
export function legalDocumentToText(doc: LegalDocument) {
  const parts = [`${doc.name.toUpperCase()}\nEffective date: ${doc.effectiveDate}`]
  for (const section of doc.sections) {
    parts.push(section.heading.toUpperCase())
    for (const block of section.blocks) {
      parts.push(
        Array.isArray(block) ? block.map((item) => `- ${item}`).join("\n") : block
      )
    }
  }
  return parts.join("\n\n") + "\n"
}
