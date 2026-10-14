import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { site } from "@/data/site";

// Demos are deliberately excluded: they are fictional businesses and marked noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  const pages = ["", "/industries", "/demos", "/whats-possible", "/pricing", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...industries.map((i) => ({ url: `${base}/industries/${i.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
