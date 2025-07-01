import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    loader: 'custom',
    loaderFile: './src/components/ui/FallbackLoader.tsx',
    domains: [
      'cdn.pixabay.com',
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
