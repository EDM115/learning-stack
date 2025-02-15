import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  bundlePagesRouterDependencies: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/me",
        destination: "/me/dashboard",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
