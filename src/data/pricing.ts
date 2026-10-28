/**
 * ═══════════════════════════════ PACKAGES AND PRICES ═══════════════════════════════
 * Starting prices in Indian rupees for the Indore market (set October 2026).
 * Local benchmarks at the time: landing page ₹5k–20k, business site ₹15k–50k,
 * dynamic site ₹30k–80k, e-commerce ₹30k–1.5L, maintenance ₹2k–10k/month.
 * Every project still gets a fixed written quote after the first call.
 *
 *   packages   → the 4 main package cards (homepage, /pricing, industry pages)
 *   redesign   → "Website redesign" service on /pricing
 *   carePlans  → monthly care plans (also used by the "Build + care plan" toggle)
 *   addOns     → add-on list on /pricing
 * To change a price, edit `from` (a plain number of rupees). It is formatted for you.
 * ═════════════════════════════════════════════════════════════════════════════════════
 */

export type Package = {
  id: "starter" | "business" | "premium" | "store";
  name: string;
  tagline: string;
  /** Starting price in INR. */
  from: number;
  bestFor: string;
  includes: string[];
  notIncluded: string[];
  timeline: string;
  revisions: string;
  featured?: boolean;
};

/** "₹17,999" */
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const packages: Package[] = [
  {
    id: "starter",
    name: "Landing Page",
    tagline: "Single-page website",
    from: 7999,
    bestFor: "Cafes, salons, tutors, home services and anyone who needs to look professional fast.",
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
    from: 17999,
    bestFor: "Established local businesses, clinics, coaching institutes and B2B suppliers.",
    includes: [
      "Up to 5 pages",
      "Enquiry and booking forms",
      "Photo gallery",
      "Google Business Profile setup tips",
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
    from: 34999,
    bestFor: "Brands that want to stand out: restaurants, agencies, real estate, interiors, fashion.",
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
    from: 44999,
    bestFor: "Boutiques, furniture and product brands ready to sell online.",
    includes: [
      "Up to 50 products",
      "Cart and checkout",
      "Razorpay / UPI payment setup",
      "Order notifications",
      "Shipping and GST setup",
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
  description: "Portals, dashboards, booking systems and other web apps built around how your business works.",
};

export const redesign = {
  id: "redesign",
  name: "Website redesign",
  from: 14999,
  description: "An audit of your current site, then a new design built on your existing content, with redirects so you keep your Google rankings.",
  timeline: "1–3 weeks",
};

export const carePlans = [
  {
    id: "care-basic",
    name: "Care",
    perMonth: 3000,
    bestFor: "Keep the site safe, fast and up to date.",
    includes: ["Hosting checks, updates and backups", "Uptime monitoring", "1 hour of edits each month", "Reply within 24 hours"],
  },
  {
    id: "care-plus",
    name: "Care Plus",
    perMonth: 5000,
    bestFor: "Regular changes to menus, offers and photos.",
    includes: ["Everything in Care", "3 hours of edits each month", "Google Business Profile posts (2 a month)", "Monthly traffic report", "Priority replies"],
    featured: true,
  },
  {
    id: "care-growth",
    name: "Growth",
    perMonth: 10000,
    bestFor: "Grow on Google: content, local SEO and new features.",
    includes: ["Everything in Care Plus", "6 hours of edits or new features each month", "1 blog post or landing page each month", "Local SEO and Search Console fixes", "Monthly call to plan what's next"],
  },
];

export const addOns = [
  { id: "page", name: "Extra page", from: 1499 },
  { id: "logo", name: "Simple logo design", from: 2999 },
  { id: "copy", name: "Copywriting, per page", from: 999 },
  { id: "products", name: "+25 products added to your store", from: 1999 },
  { id: "gbp", name: "Google Business Profile setup", from: 1999 },
  { id: "lang", name: "Extra language (e.g. Hindi)", from: 4999 },
  { id: "video", name: "Cinematic video hero", from: 3999 },
  { id: "3d-viewer", name: "3D product viewer (one model)", from: 9999 },
  { id: "3d-config", name: "3D configurator (materials and colours, up to 3 models)", from: 24999 },
];

export const finePrint = {
  terms: "50% to start, 50% before launch.",
  domainHosting: "Domain and hosting are billed at cost and registered in your name. A .in or .com domain is usually ₹800–1,500 a year.",
  paymentIndia: "UPI or bank transfer.",
  paymentInternational: "Clients outside India can pay by international bank transfer or Wise; the quote is in your currency.",
  extraCharges:
    "Domain, hosting, paid third-party services (such as paid APIs, email services or payment gateway fees) and additional maintenance may incur extra charges where applicable.",
  /** Not GST-registered, so quotes are final. Add a note here if that changes. */
  taxNote: "",
};
