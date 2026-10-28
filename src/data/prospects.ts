/**
 * ═══════════════════════════════ PERSONALISED DEMOS ═══════════════════════════════
 * One entry = one private sample website at /for/<slug>, made for a real business you want to win.
 * These pages are hidden from Google (noindex, blocked in robots.txt, not in the sitemap).
 *
 * How to use (about 30 minutes per business):
 *   1. Find a business on Google Maps with no website (or a weak one).
 *   2. Copy the example below, fill in their real name, area, services/menu and prices
 *      (from their Google Maps listing, Instagram or menu card).
 *   3. Pick colours from their logo or signboard.
 *   4. Push the change, open /for/<slug> on your phone to check it, then send the link:
 *      "Hi, I'm Nirmal, a web developer in Indore. I made a sample website for <business>: <link>.
 *       It takes WhatsApp orders and shows up on Google. Happy to show you in 10 minutes, no obligation."
 *   5. Delete the entry if they say no, so you're not keeping someone's details around.
 *
 * Only use public information (what's on their signboard, Google listing or Instagram).
 * ═════════════════════════════════════════════════════════════════════════════════════
 */

export type ProspectKind = "cafe" | "restaurant" | "salon" | "clinic" | "coaching" | "home-services" | "agency" | "shop" | "other";

export type Prospect = {
  /** URL part: /for/<slug>. Lowercase, hyphens, e.g. "sharma-sweets-vijay-nagar". */
  slug: string;
  business: string;
  /** Optional first name of the owner, for the greeting. Leave empty if you don't know it. */
  ownerFirstName?: string;
  kind: ProspectKind;
  /** The matching full demo to link to: restaurant, salon, brightloop, home-services, dental, coaching, … */
  demo: string;
  area: string;
  city: string;
  /** Short line under their name, e.g. "Filter coffee, sandwiches and the best maggi in Vijay Nagar". */
  tagline: string;
  /** Two or three sentences about them, in their voice. */
  about: string;
  /** Menu items or services. Price is optional and shown as written (e.g. "₹120" or "from ₹499"). */
  highlights: { name: string; text?: string; price?: string }[];
  /** e.g. "Every day, 8am–11pm" */
  hours?: string;
  /** Their public phone number, digits only with country code (e.g. "919876543210"). Leave empty to hide call buttons. */
  phone?: string;
  /** Unsplash photo id for the hero, or a /public path. Leave empty to use the industry's photo. */
  heroImage?: string;
  /** Brand colours (hex). */
  colors: { bg: string; text: string; accent: string; onAccent: string };
  /** Your personal note to the owner, shown at the bottom of the page. */
  note: string;
  /** Mark the built-in example so it's labelled clearly. */
  example?: boolean;
};

export const prospects: Prospect[] = [
  {
    slug: "example-chai-corner",
    business: "Chai Corner (example)",
    ownerFirstName: "",
    kind: "cafe",
    demo: "restaurant",
    area: "Vijay Nagar",
    city: "Indore",
    tagline: "Kulhad chai, poha-jalebi and late-night maggi in Vijay Nagar",
    about:
      "A small chai café near Scheme 54, open from early morning to late night. Students come for the maggi, office crowds for the chai, and everyone for the poha-jalebi on Sunday mornings.",
    highlights: [
      { name: "Kulhad chai", text: "Ginger, cardamom, served in clay", price: "₹30" },
      { name: "Poha-jalebi", text: "The Indore breakfast", price: "₹60" },
      { name: "Cheese maggi", text: "Our late-night favourite", price: "₹90" },
      { name: "Bun maska", text: "Soft bun, lots of butter", price: "₹40" },
      { name: "Cold coffee", text: "Thick, with ice cream", price: "₹110" },
      { name: "Sabudana khichdi", text: "Fasting-friendly, every day", price: "₹70" },
    ],
    hours: "Every day, 7am – midnight",
    phone: "",
    heroImage: "1630748662359-40a2105640c7",
    colors: { bg: "#FFF8EE", text: "#2B1A0E", accent: "#C2410C", onAccent: "#FFFFFF" },
    note: "This is an example of the sample sites I make for local businesses. Yours would use your real menu, photos and contact details, and take orders straight to your WhatsApp.",
    example: true,
  },
];

export const prospectBySlug = (slug: string) => prospects.find((p) => p.slug === slug);
