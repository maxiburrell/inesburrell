import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // jsdom is only used server-side by /api/sync-substack; keep it out of the bundle.
  serverExternalPackages: ["jsdom"],
};

export default nextConfig;
