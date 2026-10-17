import type { Metadata } from "next";
import { site } from "@/data/site";

/** Absolute site origin without a trailing slash, e.g. "https://webpitch.vercel.app". */
export const siteOrigin = site.siteUrl.replace(/\/$/, "");

/** Absolute URL for a site path ("/pricing" → "https://…/pricing"). */
export const absoluteUrl = (path = "/") => `${siteOrigin}${path === "/" ? "" : path}`;

export const defaultTitle = `${site.brandName} — Websites built for your industry`;
export const defaultDescription =
  "Independent web designer and developer. Try live website demos built for restaurants, salons, real estate, fashion, furniture and more, then get one made for your business.";

/** Social share image for a page. Files live in /public/og (1200×630). */
export const ogImage = (name: string, alt: string) => ({ url: `/og/${name}.jpg`, width: 1200, height: 630, alt });

type PageMetaInput = {
  /** Page title without the brand suffix. Omit on the homepage to use the default title. */
  title?: string;
  description: string;
  /** Site path, used for the canonical URL and og:url. */
  path: string;
  /** Name of the image in /public/og, without extension. */
  image?: string;
};

/**
 * Title, description, canonical URL, Open Graph and Twitter card for one page.
 * Child metadata replaces nested objects (openGraph, twitter) completely, so every page builds its own.
 */
export function pageMeta({ title, description, path, image = "default" }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${site.brandName}` : defaultTitle;
  const img = ogImage(image, title ?? defaultTitle);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.brandName,
      url: path,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
  };
}
