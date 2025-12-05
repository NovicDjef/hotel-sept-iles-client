import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Configuration pour serveur Node.js (VPS)
  output: 'standalone',

  // Prefetch settings for better navigation performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

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
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**', // Permet tous les domaines HTTPS (pour dev)
      },
    ],
    qualities: [75, 90, 100],
    unoptimized: true, // Désactive l'optimisation pour les images externes
  },
};

export default nextConfig;
