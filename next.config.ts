import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 * `enforced` holds rules that can't break the site (no plugins, no framing by other sites, forms post only here).
 * `reportOnly` is the full allow-list: browsers log anything it would block in the console without blocking it.
 * Once the console stays clean on the live site, move it into `enforced`.
 */
const csp = {
  enforced: [
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    // Not in dev: it would rewrite http://localhost requests to https and break `npm run dev`.
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ],
  reportOnly: [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://tagmanager.google.com https://vercel.live`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://www.googletagmanager.com https://*.google-analytics.com https://vercel.live https://vercel.com",
    "media-src 'self' blob: https://videos.pexels.com",
    "font-src 'self' data: https://vercel.live",
    `connect-src 'self' https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vercel.live wss://ws-us3.pusher.com${isDev ? " ws:" : ""}`,
    "frame-src 'self' https://creativewebsite-ten.vercel.app https://www.google.com https://maps.google.com https://www.googletagmanager.com https://vercel.live",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
  ],
};

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp.enforced.join("; ") },
  { key: "Content-Security-Policy-Report-Only", value: csp.reportOnly.join("; ") },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Security-only upgrade prompts from the Next.js agent upgrade flow (set when upgrading 16.4.0 -> 16.4.3).
    agentUpgrade: "security",
  },
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
