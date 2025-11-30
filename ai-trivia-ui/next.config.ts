import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this line to enable static HTML export
  output: "export",
  // Optional: other Next.js config options
  reactStrictMode: true,
};

export default nextConfig;
