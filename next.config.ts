import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "ledxenergie.com",
        "www.ledxenergie.com",
        "localhost:3000",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ledxenergie.com",
      },
    ],
  },
};

export default nextConfig;
