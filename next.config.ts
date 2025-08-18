import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",        // your backend port
        pathname: "uploads/**",
      },
    ],
  },
};

export default nextConfig;
