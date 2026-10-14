import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // UploadVR (Ghost) article header images.
      { protocol: "https", hostname: "storage.ghost.io" },
      // Images uploaded to Convex file storage.
      { protocol: "https", hostname: "*.convex.cloud" },
      // StormyCs VR YouTube thumbnails.
      { protocol: "https", hostname: "*.ytimg.com" },
      // VR Lens episode artwork (Spotify for Creators).
      { protocol: "https", hostname: "d3t3ozftmdmh3i.cloudfront.net" },
    ],
  },
  // The old NextWave XR sub-site pages were folded into /nextwavexr and /contact.
  async redirects() {
    return [
      {
        source: "/nextwavexr/articles",
        destination: "/nextwavexr",
        permanent: true,
      },
      {
        source: "/nextwavexr/about",
        destination: "/nextwavexr",
        permanent: true,
      },
      {
        source: "/nextwavexr/contact",
        destination: "/contact?topic=media",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
