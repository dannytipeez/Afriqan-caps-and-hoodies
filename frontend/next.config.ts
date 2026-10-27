import type { NextConfig } from "next";

const getBackendBase = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    return apiUrl.replace(/\/api\/shop\/?$/, "");
  }
  return process.env.INTERNAL_BACKEND_URL || "http://127.0.0.1:8000";
};

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    const backendBase = getBackendBase();
    return [
      {
        source: "/admin/:path*",
        destination: `${backendBase}/admin/:path*`,
      },
      {
        source: "/admin",
        destination: `${backendBase}/admin/`,
      },
      {
        source: "/static/admin/:path*",
        destination: `${backendBase}/static/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
