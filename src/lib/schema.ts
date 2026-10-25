import type { QA } from "@/components/site/FAQ";
import { packages } from "@/data/pricing";
import { site, socialLinks } from "@/data/site";
import { absoluteUrl, defaultDescription } from "./seo";

/** Schema.org builders. Rendered with <JsonLd />. */

const orgId = `${absoluteUrl("/")}#business`;
const personId = `${absoluteUrl("/")}#person`;

const areaServed = site.areasServed.map((name) =>
  name === site.country
    ? { "@type": "Country", name }
    : name === site.region
      ? { "@type": "State", name }
      : { "@type": "City", name },
);

const lowest = Math.min(...packages.map((p) => p.from));

export const businessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": orgId,
  name: site.brandName,
  description: defaultDescription,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/icon-512.png"),
  image: absoluteUrl("/og/default.jpg"),
  email: site.email,
  telephone: `+${site.whatsappNumber}`,
  priceRange: `₹${lowest.toLocaleString("en-IN")}+`,
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, Bank transfer",
  founder: { "@id": personId },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.countryCode,
  },
  areaServed,
  knowsAbout: ["Web design", "Website development", "Next.js", "Local SEO", "E-commerce websites"],
  sameAs: socialLinks.map((s) => s.url),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website packages",
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.name, description: p.tagline },
      priceSpecification: { "@type": "PriceSpecification", minPrice: p.from, priceCurrency: "INR" },
      url: absoluteUrl(`/pricing#${p.id}`),
    })),
  },
});

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.ownerName,
  jobTitle: "Web designer and developer",
  image: absoluteUrl(site.photo),
  url: absoluteUrl("/about"),
  worksFor: { "@id": orgId },
  homeLocation: { "@type": "Place", name: `${site.city}, ${site.region}, ${site.country}` },
  sameAs: [...socialLinks.map((s) => s.url), site.portfolioUrl],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.brandName,
  url: absoluteUrl("/"),
  inLanguage: "en-IN",
  publisher: { "@id": orgId },
});

export const faqSchema = (items: QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

export type Crumb = { name: string; path: string };

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const serviceSchema = ({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: absoluteUrl(path),
  serviceType,
  provider: { "@id": orgId },
  areaServed,
});

export const articleSchema = ({ title, description, path, published, updated }: { title: string; description: string; path: string; published: string; updated?: string }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  datePublished: published,
  dateModified: updated ?? published,
  inLanguage: "en-IN",
  author: { "@id": personId, "@type": "Person", name: site.ownerName, url: absoluteUrl("/about") },
  publisher: { "@id": orgId },
  image: absoluteUrl("/og/default.jpg"),
});
