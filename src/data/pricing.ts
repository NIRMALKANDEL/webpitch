/**
 * ═══════════════════════════════ PACKAGES AND SERVICES ═══════════════════════════════
 * The site deliberately shows no prices. Pricing is customised per project and given
 * in a written quote after the first call.
 *
 *   packages   → the 4 main package cards (homepage, /pricing, industry pages)
 *   redesign   → "Website redesign" service on /pricing
 *   carePlans  → monthly care plans (also used by the "Build + care plan" toggle)
 *   addOns     → add-on list on /pricing
 * ═════════════════════════════════════════════════════════════════════════════════════
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
  featured?: boolean;
};

export const packages: Package[] = [
  {
    id: "starter",
    name: "Landing Page",
    tagline: "Single-page website",
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
  },
  {
    id: "business",
    name: "Business Website",
    tagline: "A proper multi-page website",
    bestFor: "Established local businesses, clinics, institutes and B2B suppliers.",
    includes: [
      "Up to 5 pages",
      "Enquiry and booking forms",
      "Photo gallery",
      "Google Business Profile tips",
      "Speed optimisation",
      "Everything in Landing Page",
      "2 rounds of revisions",
    ],
    notIncluded: ["Online payments"],
    timeline: "1–2 weeks",
    revisions: "2 rounds",
    featured: true,
  },
  {
    id: "premium",
    name: "Advanced Website",
    tagline: "Multi-page site with custom design",
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
  },
  {
    id: "store",
    name: "E-commerce Website",
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
  },
];

/** Custom web applications are quoted per project. */
export const customApp = {
  id: "custom",
  name: "Custom Web Applications",
  description: "Portals, dashboards and other web apps built around how your business works.",
  priceNote: "Custom quote based on project requirements.",
};

/** Headline shown above the package cards on the homepage. */
export const pricingHeadline = {
  intro: "Pricing is customised according to your requirements.",
  outro: "Contact me to discuss your project. Every website is quoted on the pages, features and content you need.",
  startingNote:
    "Just a quick call will give you clarity on what business website you need.",
};

export const redesign = {
  id: "redesign",
  name: "Website redesign",
  description: "An audit of your current site, then a new design built on your existing content, with redirects so you keep your Google rankings.",
  timeline: "1–3 weeks",
};

export const carePlans = [
  {
    id: "care-basic",
    name: "Care plan",
    includes: ["Updates and backups", "Uptime monitoring", "30 minutes of edits each month"],
  },
  {
    id: "care-plus",
    name: "Care plan Plus",
    includes: ["Everything in Care plan", "2 hours of edits each month", "Monthly report", "Priority replies"],
  },
];

export const addOns = [
  { id: "page", name: "Extra page" },
  { id: "logo", name: "Simple logo design" },
  { id: "copy", name: "Copywriting, per page" },
  { id: "products", name: "+25 products added to your store" },
  { id: "gbp", name: "Google Business Profile setup" },
  { id: "lang", name: "Extra language" },
  { id: "video", name: "Cinematic video hero" },
  { id: "3d-viewer", name: "3D product viewer (one model)" },
  { id: "3d-config", name: "3D configurator (materials and colours, up to 3 models)" },
];

export const finePrint = {
  terms: "50% to start, 50% before launch.",
  domainHosting: "Domain and hosting are billed at cost and registered in your name.",
  paymentIndia: "UPI or bank transfer.",
  paymentInternational: "International payment options are shared with your quote.",
  extraCharges:
    "Domain, hosting, paid third-party services (such as paid APIs, email services or payment gateway fees) and additional maintenance may incur extra charges where applicable.",
  /** Not GST-registered, so quotes are final. Add a note here if that changes. */
  taxNote: "",
};
