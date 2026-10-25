import type { Metadata } from "next";
import { inr, packages } from "@/data/pricing";
import { site } from "@/data/site";

/** Absolute site origin without a trailing slash, e.g. "https://nirmalbuilds.com". */
export const siteOrigin = site.siteUrl.replace(/\/$/, "");

/** Absolute URL for a site path ("/pricing" → "https://…/pricing"). */
export const absoluteUrl = (path = "/") => `${siteOrigin}${path === "/" ? "" : path}`;

export const defaultTitle = `Web Designer in ${site.city} for Small Businesses | ${site.brandName}`;
export const defaultDescription = `Web designer and developer in ${site.city}. Open a live demo website for your café, salon, clinic, coaching institute or agency, then get yours built. Packages from ${inr(packages[0].from)}.`;

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
  /** For blog posts: makes the Open Graph type "article" with these dates (ISO). */
  article?: { published: string; modified?: string };
};

/**
 * Title, description, canonical URL, Open Graph and Twitter card for one page.
 * Child metadata replaces nested objects (openGraph, twitter) completely, so every page builds its own.
 */
export function pageMeta({ title, description, path, image = "default", article }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${site.brandName}` : defaultTitle;
  const img = ogImage(image, title ?? defaultTitle);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: article
      ? {
          type: "article",
          siteName: site.brandName,
          url: path,
          title: fullTitle,
          description,
          images: [img],
          publishedTime: article.published,
          modifiedTime: article.modified ?? article.published,
          authors: [site.ownerName],
        }
      : {
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
