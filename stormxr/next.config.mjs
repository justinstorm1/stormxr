/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.ghost.io",
      },
      {
        protocol: "https",
        hostname: "*.convex.cloud",
      },
    ],
  },
};

export default nextConfig;