import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "**.wordpress.com" },
    ],
  },
  async redirects() {
    return [
      // Old WordPress single-service URLs → new slugged routes
      {
        source: "/service/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      // Old WordPress category archive → services index
      {
        source: "/category/services",
        destination: "/services",
        permanent: true,
      },
      // /contact-us → /contact (real page now)
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;