import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dyt6y8t5r/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
