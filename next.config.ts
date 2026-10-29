import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about/story", permanent: true },
      { source: "/leadership", destination: "/about/team", permanent: true },
      { source: "/impact", destination: "/", permanent: true },
      { source: "/get-involved", destination: "/contact", permanent: true },
      { source: "/get-involved/volunteer", destination: "/contact", permanent: true },
      { source: "/get-involved/partner", destination: "/contact", permanent: true },
      { source: "/stories", destination: "/blog", permanent: true },
      { source: "/stories/:slug*", destination: "/blog/:slug*", permanent: true },
      { source: "/updates", destination: "/blog", permanent: true },
      { source: "/studio", destination: "/admin", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
