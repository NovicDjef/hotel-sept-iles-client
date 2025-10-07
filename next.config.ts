import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lenord-cotier.com',
      },
    ],
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
