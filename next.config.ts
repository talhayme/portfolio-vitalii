import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// When deploying to https://<user>.github.io/portfolio-vitalii we need a basePath.
// Override with PAGES_BASE_PATH="" for a custom domain.
const basePath =
  process.env.PAGES_BASE_PATH ?? (isProd ? "/portfolio-vitalii" : "");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  // Tell client-side Link components about the prefix.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    // Where the site is actually served from. Set SITE_URL in the build
    // environment when a custom domain is in place.
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL ?? "https://talhayme.github.io",
  },
};

export default nextConfig;
