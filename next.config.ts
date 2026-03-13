import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/spiderweb',
  assetPrefix: '/spiderweb/',
  images: { unoptimized: true },
};

export default nextConfig;
