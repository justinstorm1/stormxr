// Account deletion instructions for apps with sign-in.
// Google Play's Data safety form links to these URLs as the "Delete account URL".

import type { PrivacyPolicy } from "@/lib/privacy-policies"

export const accountDeletionPages: PrivacyPolicy[] = [
  {
    slug: "turbocharged",
    name: "TurboCharged",
    effectiveDate: "November 19, 2026",
    sections: [
      {
        heading: "Delete Your Account in the App",
        blocks: [
          "TurboCharged, published by StormXR, LLC, lets you permanently delete your account and its data at any time:",
          [
            "Open TurboCharged and sign in.",
            "Go to the Settings tab.",
            "Tap Delete account.",
            "Confirm by tapping Delete account, then Delete everything.",
          ],
          "Your account and data are erased immediately. This cannot be undone.",
          "Deleting your account does not cancel a TurboCharged Pro subscription. Cancel it first in your App Store or Google Play subscription settings.",
        ],
      },
      {
        heading: "Request Deletion Without the App",
        blocks: [
          "If you no longer have the app installed, email us from the email address on your TurboCharged account (the address of the Apple or Google account you signed in with) with the subject \"Delete my TurboCharged account\".",
          "We will delete your account and its data within 30 days and confirm by email.",
          "Email: craigstorm@stormxr.tech",
        ],
      },
      {
        heading: "Data That Is Deleted",
        blocks: [
          [
            "Your account and sign-in information, including your name and email address.",
            "Your profile, including your display name and currency preference.",
            "Every group you own, including its vehicles, mileage, service records, photos, receipts, and invites. This deletes them for every member of those groups.",
            "Your memberships in groups owned by other people.",
            "Any photos stored in your personal folder.",
          ],
        ],
      },
      {
        heading: "Data That Is Kept",
        blocks: [
          [
            "Vehicles and service records you added to groups owned by other people stay with those groups, but are no longer linked to your account.",
            "Purchase records are kept by Apple, Google, and our purchase provider RevenueCat as required for billing, tax, and legal purposes, under their own retention policies.",
          ],
          "We do not keep any other copy of your data after your account is deleted.",
        ],
      },
      {
        heading: "Delete Some Data Without Deleting Your Account",
        blocks: [
          "You can delete individual items in the app at any time without deleting your account:",
          [
            "Delete a vehicle, along with its service records and photos, from the vehicle's screen.",
            "Delete a single service record from its vehicle's service history.",
            "Delete a group you own, or leave a group you belong to, from that group's screen in the Groups tab.",
          ],
          "Items you delete are removed immediately.",
          "You can also ask us to delete specific data while keeping your account. Email us from the email address on your TurboCharged account with the subject \"Delete my TurboCharged data\" and tell us what to delete. We will delete it within 30 days and confirm by email.",
          "Email: craigstorm@stormxr.tech",
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
