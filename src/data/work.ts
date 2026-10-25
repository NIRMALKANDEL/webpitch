/**
 * ═══════════════════════════════ REAL CLIENT WORK ═══════════════════════════════
 * Everything here is REAL: real clients, real quotes, real results. Never add a made-up entry.
 *
 * While both lists are empty, the site hides the testimonials section, the /work page shows a
 * short "first projects" note, and the footer leaves out the "Client work" link.
 * Add your first entry the day a client says yes to being featured.
 * ════════════════════════════════════════════════════════════════════════════════
 */

export type Testimonial = {
  /** The client's words, exactly as they sent them (edit only for typos, with their OK). */
  quote: string;
  name: string;
  /** e.g. "Owner, Chai Sutta Cafe" */
  role: string;
  city: string;
  /** Optional: link to their Google review, LinkedIn post or website. */
  sourceUrl?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  city: string;
  /** Live website URL. */
  url: string;
  /** One line: what they needed. */
  problem: string;
  /** What you built, as short bullet points. */
  built: string[];
  /** Measurable results, only if true: "Calls up from 3 to 11 a week", "Ranks #2 for 'cafe in Vijay Nagar'". */
  results: string[];
  /** Screenshot in /public/work/<slug>.webp (1440×900). */
  image: string;
  testimonial?: Testimonial;
  /** ISO date the site went live, e.g. "2026-11-20". */
  launched: string;
};

export const testimonials: Testimonial[] = [
  // Example (delete the // to use, and replace with a real client):
  // {
  //   quote: "Nirmal built our site in a week and we started getting WhatsApp orders the same day.",
  //   name: "Rahul Jain",
  //   role: "Owner, Example Cafe",
  //   city: "Indore",
  //   sourceUrl: "https://g.page/r/...",
  // },
];

export const caseStudies: CaseStudy[] = [
  // Example:
  // {
  //   slug: "example-cafe",
  //   client: "Example Cafe",
  //   industry: "Cafe",
  //   city: "Indore",
  //   url: "https://examplecafe.in",
  //   problem: "Only on Zomato, paying 25% commission on every order.",
  //   built: ["Menu with WhatsApp ordering", "Google Maps and opening hours", "Instagram feed"],
  //   results: ["40 direct WhatsApp orders in the first month"],
  //   image: "/work/example-cafe.webp",
  //   launched: "2026-11-20",
  // },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
