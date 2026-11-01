import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "i1.wp.com",
      },
      {
        protocol: "https",
        hostname: "i2.wp.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/service/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      {
        source: "/category/services",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
