export const site = {
  brandName: "Nirmal Kandel",
  descriptor: "Web Design & Development",
  ownerName: "Nirmal Kandel",
  tagline: "Websites for small businesses, built by one developer you can actually talk to.",
  whatsappNumber: "918349692155",
  phoneDisplay: "+91 83496 92155",
  email: "nirmalatlance@gmail.com",
  basedIn: "India",
  timezoneNote:
    "I reply within 12 hours and keep overlap hours for UK/EU, US and Australian clients.",
  /** Your own portfolio, shown in the "Hi, I'm Nirmal" section. */
  portfolioUrl: "https://nirmal-portfolio-eta.vercel.app",
  /** Optional Cal.com / Calendly link. Empty means "Book a call" opens WhatsApp. */
  calendarUrl: "",
  /** Swap for "/me.jpg" once you add a real photo to /public. */
  photo: "/avatar.svg",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
