import { site } from "@/data/site";

export function waLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const waMessages = {
  general: "Hi, I'm interested in a website for my business.",
  industry: (industry: string) =>
    `Hi, I run a ${industry.toLowerCase()} business and I'd like to discuss a website.`,
  demo: (brand: string, industry: string) =>
    `Hi! I viewed the ${brand} ${industry.toLowerCase()} demo on your site and I'd like a similar website for my business.`,
  pkg: (pkg: string, price: string) => `Hi, I'm interested in the ${pkg} package (from ${price}).`,
};
