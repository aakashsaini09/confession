import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Only proxy the external API routes you need
        source: "/api/external/:path*",
        destination: "https://api.example.com/:path*",
      },
    ];
  },
};

export default nextConfig;

