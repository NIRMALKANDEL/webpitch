import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { industries } from "@/data/industries";
import { industryContent } from "@/data/industry-content";
import { site } from "@/data/site";
import { caseStudies } from "@/data/work";

/** Bump this date when you make a real change to the main pages, so Google re-checks them. */
const SITE_UPDATED = "2026-10-25";

// Demos are deliberately excluded: they are fictional businesses and marked noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  const page = (path: string, priority: number, lastModified = SITE_UPDATED) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  });
  return [
    page("", 1),
    page("/web-design-indore", 0.9),
    page("/pricing", 0.9),
    page("/demos", 0.8),
    page("/industries", 0.7),
    page("/about", 0.7),
    page("/blog", 0.7),
    ...(caseStudies.length ? [page("/work", 0.8)] : []),
    page("/whats-possible", 0.5),
    page("/contact", 0.6),
    page("/privacy", 0.2),
    page("/terms", 0.2),
    // Focus industries (with long-form content) rank higher than the rest.
    ...industries.map((i) => page(`/industries/${i.slug}`, industryContent[i.slug] ? 0.8 : 0.5)),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.6, p.updated ?? p.published)),
  ];
}
