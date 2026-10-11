import type { PriceTable } from "@/lib/currency";

/**
 * Every price on the site comes from this file. Prices are hand-set per currency
 * (not converted at runtime) from the market research in docs/SITE-SPEC.md §7.
 */

export type Package = {
  id: "starter" | "business" | "premium" | "store";
  name: string;
  tagline: string;
  bestFor: string;
  includes: string[];
  notIncluded: string[];
  timeline: string;
  revisions: string;
  prices: PriceTable;
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "A single, beautifully built page",
    bestFor: "Cafes, salons, home services and anyone who needs to look professional fast.",
    includes: [
      "One long page with up to 7 sections",
      "WhatsApp and call buttons",
      "Enquiry form that emails you",
      "Google Map and opening hours",
      "Basic SEO setup",
      "Mobile-first and fast",
      "2 rounds of revisions",
    ],
    notIncluded: ["Online payments", "Blog"],
    timeline: "4–7 days",
    revisions: "2 rounds",
    prices: { INR: 4999, USD: 299, GBP: 249, EUR: 279, AUD: 449, CAD: 399, NZD: 499 },
  },
  {
    id: "business",
    name: "Business",
    tagline: "A proper multi-page website",
    bestFor: "Established local businesses, clinics, institutes and B2B suppliers.",
    includes: [
      "Up to 5 pages",
      "Enquiry and booking forms",
      "Photo gallery",
      "Google Business Profile tips",
      "Speed optimisation",
      "Everything in Starter",
      "2 rounds of revisions",
    ],
    notIncluded: ["Online payments"],
    timeline: "1–2 weeks",
    revisions: "2 rounds",
    prices: { INR: 12999, USD: 699, GBP: 549, EUR: 649, AUD: 999, CAD: 949, NZD: 1149 },
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Custom design with the wow factor",
    bestFor: "Brands that want to stand out: restaurants, real estate, interiors, fashion.",
    includes: [
      "Up to 10 pages, fully custom design",
      "Booking, catalogue or menu system",
      "Cinematic video hero",
      "Scroll animations and transitions",
      "Blog ready",
      "3 rounds of revisions",
    ],
    notIncluded: ["3D viewers (available as an add-on)"],
    timeline: "2–3 weeks",
    revisions: "3 rounds",
    prices: { INR: 24999, USD: 1199, GBP: 949, EUR: 1099, AUD: 1799, CAD: 1599, NZD: 1999 },
  },
  {
    id: "store",
    name: "Online Store",
    tagline: "Sell online, take payments",
    bestFor: "Boutiques, furniture and product brands ready to sell online.",
    includes: [
      "Up to 50 products",
      "Cart and checkout",
      "Payment gateway setup",
      "Order notifications",
      "Shipping and tax setup",
      "Cinematic video hero",
      "3 rounds of revisions",
    ],
    notIncluded: ["Product photography"],
    timeline: "3–4 weeks",
    revisions: "3 rounds",
    prices: { INR: 39999, USD: 1799, GBP: 1399, EUR: 1649, AUD: 2699, CAD: 2399, NZD: 2999 },
  },
];

export const redesign = {
  id: "redesign",
  name: "Website redesign",
  description: "An audit of your current site, then a new design built on your existing content, with redirects so you keep your Google rankings.",
  timeline: "1–3 weeks",
  prices: { INR: 7999, USD: 499, GBP: 399, EUR: 449, AUD: 749, CAD: 649, NZD: 849 } as PriceTable,
};

export const carePlans = [
  {
    id: "care-basic",
    name: "Care plan",
    includes: ["Updates and backups", "Uptime monitoring", "30 minutes of edits each month"],
    prices: { INR: 799, USD: 39, GBP: 29, EUR: 35, AUD: 59, CAD: 49, NZD: 65 } as PriceTable,
  },
  {
    id: "care-plus",
    name: "Care plan Plus",
    includes: ["Everything in Care plan", "2 hours of edits each month", "Monthly report", "Priority replies"],
    prices: { INR: 1999, USD: 99, GBP: 79, EUR: 89, AUD: 149, CAD: 129, NZD: 165 } as PriceTable,
  },
];

export const addOns = [
  { id: "page", name: "Extra page", prices: { INR: 1499, USD: 79, GBP: 59, EUR: 69, AUD: 119, CAD: 99, NZD: 129 } as PriceTable },
  { id: "logo", name: "Simple logo design", prices: { INR: 2499, USD: 99, GBP: 79, EUR: 89, AUD: 149, CAD: 129, NZD: 165 } as PriceTable },
  { id: "copy", name: "Copywriting, per page", prices: { INR: 999, USD: 49, GBP: 39, EUR: 45, AUD: 75, CAD: 65, NZD: 79 } as PriceTable },
  { id: "products", name: "+25 products added to your store", prices: { INR: 1999, USD: 79, GBP: 59, EUR: 69, AUD: 119, CAD: 99, NZD: 129 } as PriceTable },
  { id: "gbp", name: "Google Business Profile setup", prices: { INR: 1499, USD: 69, GBP: 55, EUR: 59, AUD: 99, CAD: 89, NZD: 109 } as PriceTable },
  { id: "lang", name: "Extra language", prices: { INR: 3999, USD: 149, GBP: 119, EUR: 135, AUD: 229, CAD: 199, NZD: 249 } as PriceTable },
  { id: "video", name: "Cinematic video hero", prices: { INR: 2999, USD: 99, GBP: 79, EUR: 89, AUD: 149, CAD: 129, NZD: 165 } as PriceTable },
  { id: "3d-viewer", name: "3D product viewer (one model)", prices: { INR: 9999, USD: 349, GBP: 279, EUR: 319, AUD: 529, CAD: 469, NZD: 579 } as PriceTable },
  { id: "3d-config", name: "3D configurator (materials and colours, up to 3 models)", prices: { INR: 19999, USD: 699, GBP: 549, EUR: 649, AUD: 1049, CAD: 949, NZD: 1149 } as PriceTable },
];

export const finePrint = {
  terms: "50% to start, 50% before launch.",
  domainHosting: "Domain and hosting are billed at cost and registered in your name.",
  paymentIndia: "UPI or bank transfer.",
  paymentInternational: "International payment options are shared with your quote.",
  /** Not GST-registered, so prices are final. Add a note here if that changes. */
  taxNote: "",
};

/** Budget ranges for the enquiry form, built from the package prices in the visitor's currency. */
export function budgetBands(p: Record<Package["id"], number>) {
  return [
    { max: p.starter, kind: "under" as const },
    { min: p.starter, max: p.business },
    { min: p.business, max: p.premium },
    { min: p.premium, max: p.store },
    { min: p.store, kind: "over" as const },
  ];
}
