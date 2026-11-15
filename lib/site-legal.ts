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
  effectiveDate: "November 15, 2026",
  sections: [
    {
      heading: "Agreement to These Terms",
      blocks: [
        "These Terms of Use ('Terms') govern your access to and use of www.stormxr.tech (the 'Site'), operated by StormXR, LLC ('we', 'our', or 'us').",
        "These Terms also cover any and all applications developed by StormXR, LLC (our 'Apps'), on any platform. References to the Site in these Terms include our Apps unless the context requires otherwise.",
        "By accessing or using the Site, you agree to be bound by these Terms and by our Privacy Policy. If you do not agree, please do not use the Site.",
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
      heading: "Third-Party Links and Content",
      blocks: [
        "The Site contains links to, and embedded content from, third-party websites and services, such as YouTube, Spotify, podcast platforms, social media, app stores, and news publications.",
        "We do not control and are not responsible for third-party websites, content, products, or services. Your use of them is at your own risk and subject to their own terms and policies.",
      ],
    },
    {
      heading: "Disclaimers",
      blocks: [
        "The Site and its content are provided for general informational purposes on an 'as is' and 'as available' basis. While we work to keep content accurate and up to date, we make no warranties, express or implied, about the completeness, accuracy, reliability, or availability of the Site or its content.",
        "To the fullest extent permitted by law, we disclaim all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      ],
    },
    {
      heading: "Limitation of Liability",
      blocks: [
        "To the fullest extent permitted by law, StormXR, LLC and its owners, employees, and contributors will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, or goodwill, arising out of or related to your use of, or inability to use, the Site.",
        "To the fullest extent permitted by law, our total liability for any claim arising out of or related to the Site will not exceed one hundred U.S. dollars (US$100).",
        "Some jurisdictions do not allow certain warranty disclaimers or limitations of liability, so some of the above may not apply to you.",
      ],
    },
    {
      heading: "Indemnification",
      blocks: [
        "You agree to defend, indemnify, and hold harmless StormXR, LLC and its owners, employees, and contributors from any claims, damages, losses, and expenses, including reasonable attorneys' fees, arising out of your violation of these Terms or your misuse of the Site.",
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
        "These Terms, together with our Privacy Policy, are the entire agreement between you and StormXR, LLC regarding the Site. Any separate written agreement with us, such as for development or advisory services, governs those services.",
      ],
    },
    {
      heading: "Changes to These Terms",
      blocks: [
        "We may update these Terms from time to time.",
        "Changes become effective when the updated Terms are published. Your continued use of the Site after that means you accept the updated Terms.",
        "The Effective Date at the top of these Terms indicates the latest revision.",
      ],
    },
    contactUs,
  ],
}
