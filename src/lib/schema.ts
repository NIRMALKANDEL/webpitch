import type { QA } from "@/components/site/FAQ";
import { site } from "@/data/site";
import { absoluteUrl, defaultDescription } from "./seo";

/** Schema.org builders. Rendered with <JsonLd />. */

const orgId = `${absoluteUrl("/")}#business`;

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
  founder: { "@type": "Person", name: site.ownerName, url: site.portfolioUrl },
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  areaServed: "Worldwide",
  sameAs: [site.portfolioUrl],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.brandName,
  url: absoluteUrl("/"),
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
  areaServed: "Worldwide",
});
