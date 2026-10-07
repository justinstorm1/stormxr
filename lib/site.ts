export const site = {
  name: "StormXR",
  legalName: "StormXR, LLC",
  url: "https://www.stormxr.tech",
  email: "craigstorm@stormxr.tech",
  tagline: "Tracking the next wave of immersive technology",
  description:
    "StormXR explores how immersive technology is moving beyond gaming into media, wellness, communication, and everyday life — through editorial, podcasting, app development, and advisory work.",
}

export const nav = [
  { href: "/media-projects", label: "Media" },
  { href: "/development", label: "Development" },
  { href: "/advisory", label: "Advisory" },
  { href: "/about", label: "About" },
  { href: "/press", label: "Press" },
] as const

export const topics = [
  "Virtual Reality",
  "Mixed Reality",
  "Spatial Computing",
  "Immersive Media",
  "VR Fitness",
  "Emerging Displays",
  "Consumer Adoption",
  "XR Hardware",
]

export type Social = {
  name: string
  handle: string
  href: string
  icon: string
}

export const stormycsSocials: Social[] = [
  {
    name: "YouTube",
    handle: "@StormyCsVR",
    href: "https://www.youtube.com/@StormyCsVR",
    icon: "/images/YouTubeLogo.webp",
  },
  {
    name: "TikTok",
    handle: "@stormycsvr",
    href: "https://www.tiktok.com/@stormycsvr",
    icon: "/images/TikTokLogo.webp",
  },
  {
    name: "Instagram",
    handle: "@StormyCsVR",
    href: "https://www.instagram.com/stormycsvr/",
    icon: "/images/InstagramLogo.png",
  },
  {
    name: "X / Twitter",
    handle: "@StormyCsVR",
    href: "https://x.com/StormyCsVR",
    icon: "/images/XIcon.avif",
  },
  {
    name: "Threads",
    handle: "@stormycsvr",
    href: "https://www.threads.com/@stormycsvr",
    icon: "/images/ThreadsLogo.png",
  },
  {
    name: "Bluesky",
    handle: "@stormycsvr.bsky.social",
    href: "https://bsky.app/profile/stormycsvr.bsky.social",
    icon: "/images/BlueskyLogo.png",
  },
]

export const podcastLinks = {
  apple: "https://podcasts.apple.com/us/podcast/vr-lens/id1883565942",
  spotify:
    "https://open.spotify.com/show/4CU5uhMSh4RRUdgMo8YgGT?si=7gS8ebhpRAyTAra9OXPlBw",
}

export const uploadVrUrl = "https://www.uploadvr.com/writer/craigstorm/"

export const platforms = [
  {
    slug: "nextwavexr",
    name: "NextWave XR",
    kind: "Editorial & Analysis",
    summary:
      "The editorial and analysis platform where Craig writes about spatial computing, immersive media, and real-world XR adoption.",
    detail:
      "In-depth articles, hardware breakdowns, and industry perspective for professionals and enthusiasts alike.",
    cta: "Read the writing",
  },
  {
    slug: "vrlens",
    name: "VR Lens Podcast",
    kind: "Podcast & Media",
    summary:
      "Interviews and candid discussions around virtual reality and emerging technology.",
    detail:
      "Each episode digs into the people, products, and ideas shaping the future of immersive media.",
    cta: "Listen now",
  },
  {
    slug: "stormycsvr",
    name: "StormyCs VR",
    kind: "Creator & Community",
    summary:
      "The casual, community-facing side of StormXR — gaming, fitness, and personality-driven VR content.",
    detail:
      "Hands-on impressions and an unfiltered look at life inside the headset across YouTube, TikTok, Instagram, and more.",
    cta: "Follow along",
  },
] as const

export type AppLink = {
  store: "App Store" | "Google Play" | "Meta Quest"
  href?: string
  note?: string
}

export type App = {
  name: string
  slug: string
  icon: string
  platform: "Mobile" | "VR"
  description: string
  links: AppLink[]
}

export const apps: App[] = [
  {
    name: "Whack-A-PC",
    slug: "whack-a-pc",
    icon: "/images/WhackAPCLogo.png",
    platform: "Mobile",
    description:
      "Whack-A-Mole style arcade game — hit the computers while dodging robots and viruses.",
    links: [
      {
        store: "App Store",
        href: "https://apps.apple.com/us/app/whack-a-pc/id6775351437",
      },
      {
        store: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.justinstorm1.whackapcpaid",
      },
    ],
  },
  {
    name: "SeekBound",
    slug: "seek-bound",
    icon: "/images/SeekBoundLogo.png",
    platform: "Mobile",
    description:
      "Real-time hide-and-seek with friends — track each other down on the map and outlast the seekers.",
    links: [
      {
        store: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.justinstorm1.hideandseek",
      },
      { store: "App Store", note: "In review" },
    ],
  },
  {
    name: "List It, Do It",
    slug: "list-it-do-it",
    icon: "/images/ListItDoItLogo.webp",
    platform: "Mobile",
    description:
      "A minimalist productivity app and daily planner, synced across your Apple devices with iCloud.",
    links: [
      {
        store: "App Store",
        href: "https://apps.apple.com/us/app/list-it-do-it/id6751865449",
      },
    ],
  },
  {
    name: "Punchable Face",
    slug: "punchable-face",
    icon: "/images/PunchableFaceLogo.png",
    platform: "VR",
    description:
      "Pick an annoying face, put on your gloves, and start swinging. A VR stress toy with satisfying impacts, haptics, and scoring.",
    links: [
      {
        store: "Meta Quest",
        href: "https://www.meta.com/experiences/punchable-face/1482909477009074/",
      },
    ],
  },
]

/**
 * Fallback only: the site scrapes PRLog for press releases (lib/press.ts).
 * This list is used if PRLog is unreachable.
 */
export const press = [
  {
    date: "2026-09-10",
    title: "StormXR Announces Whack-A-PC for iPhone, iPad, and Android",
    summary:
      "The fast-paced arcade game, developed by Justin Storm and published by StormXR, became available July 16.",
    href: "https://www.prlog.org/13169944-stormxr-announces-whack-pc-for-iphone-ipad-and-android.html",
  },
  {
    date: "2026-05-25",
    title:
      "StormXR Launches Expanded Platform for XR Media and Industry Analysis",
    summary:
      "StormXR has launched a redesigned digital platform bringing together XR writing, media projects, and commentary on the future of immersive technology.",
    href: "https://www.prlog.org/13148011-stormxr-launches-expanded-platform-for-xr-media-and-industry-analysis.html",
  },
]

export const people = [
  {
    name: "Craig Storm",
    role: "Founder",
    initials: "CS",
    linkedin: "https://www.linkedin.com/in/craig-storm/",
    bio: [
      "Craig Storm is an XR writer, analyst, and industry professional focused on how immersive technology is evolving beyond gaming into everyday use. Through StormXR, he covers virtual reality, mixed reality, spatial computing, immersive media, fitness, and emerging display technologies with an emphasis on practical adoption, consumer behavior, and real-world impact.",
      "Alongside his editorial work, Craig works in digital experience and communication technology within the automotive industry, giving him a grounded perspective on how emerging technology is actually deployed in operational environments.",
    ],
    short:
      "XR writer and analyst — a contributor at UploadVR covering fitness, media, hardware, and immersive experiences.",
  },
  {
    name: "Justin Storm",
    role: "Developer",
    initials: "JS",
    linkedin: "https://www.linkedin.com/in/justin-storm-0208783b7/",
    bio: [
      "Justin Storm is the developer behind StormXR. He is studying Computer Science with a concentration in Cybersecurity at NJIT, bringing a strong technical foundation to everything built under the StormXR brand.",
      "Justin builds iOS apps using Swift, cross-platform mobile apps with React Native, and web experiences with Next.js — handling the full stack from design to deployment across every platform StormXR runs on.",
    ],
    short:
      "Builds StormXR's iOS, Android, VR, and web products end to end — from design to deployment.",
  },
]

export const contactTopics = [
  { value: "general", label: "General inquiry" },
  { value: "media", label: "Media partnership / sponsorship" },
  { value: "podcast", label: "VR Lens guest" },
  { value: "advisory", label: "Advisory call" },
  { value: "development", label: "Development project" },
  { value: "press", label: "Press" },
] as const

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}
