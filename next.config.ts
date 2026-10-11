import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Unsplash and Pexels resize on their own CDNs, so we skip Vercel's
    // image optimizer and build the sized URL ourselves.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/categories", destination: "/industries", permanent: true },
      { source: "/categories/:slug", destination: "/industries/:slug", permanent: true },
      { source: "/services", destination: "/pricing", permanent: true },
    ];
  },
};

export default nextConfig;
