import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "**.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
