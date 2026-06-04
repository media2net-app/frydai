import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@whop/checkout"],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
