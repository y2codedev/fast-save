import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
    ],
    unoptimized: true, 
  },
};

export default nextConfig;
