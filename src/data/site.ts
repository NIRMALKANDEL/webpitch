export const site = {
  brandName: "NirmalBuilds",
  descriptor: "Web Design & Development, Indore",
  ownerName: "Nirmal Kandel",
  tagline: "Websites for small businesses in Indore and across India, built by one developer you can actually talk to.",
  whatsappNumber: "918349692155",
  phoneDisplay: "+91 83496 92155",
  email: "nirmalatlance@gmail.com",
  /** Where you work from. Used in copy, the footer and search-engine data (schema.org). */
  city: "Indore",
  region: "Madhya Pradesh",
  regionCode: "MP",
  country: "India",
  countryCode: "IN",
  basedIn: "Indore, India",
  /** Places you serve, in order of priority. Shown in copy and in search-engine data. */
  areasServed: ["Indore", "Bhopal", "Ujjain", "Dewas", "Madhya Pradesh", "India"],
  timezoneNote: "I reply within 12 hours. In Indore I'm happy to meet you in person; everyone else, on WhatsApp or a video call.",
  /** Your own portfolio (developer CV site). Not linked from client-facing pages. */
  portfolioUrl: "https://nirmal-portfolio-eta.vercel.app",
  /** Social profiles. Add Instagram, Google Business Profile, Behance etc. here as you create them. */
  social: {
    linkedin: "https://www.linkedin.com/in/nirmal-kandel-36b4601b9",
    github: "https://github.com/NIRMALKANDEL",
    instagram: "",
    googleBusiness: "",
  },
  /** Optional Cal.com / Calendly link. Empty means "Book a call" opens WhatsApp. */
  calendarUrl: "",
  /** Profile photo: a 400×400 WebP made from public/me.jpg (the original is kept). */
  photo: "/me.webp",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Social profile URLs that are filled in, for schema.org `sameAs` and footer links. */
export const socialLinks = Object.entries(site.social)
  .filter(([, url]) => url)
  .map(([key, url]) => ({ key, url }));
