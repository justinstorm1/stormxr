/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.ghost.io",
      },
    ],
  },
};

export default nextConfig;