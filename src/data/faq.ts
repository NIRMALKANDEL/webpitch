import type { QA } from "@/components/site/FAQ";
import { carePlans, inr, packages } from "./pricing";

const [landing, business, advanced, store] = packages;

export const homeFaq: QA[] = [
  {
    q: "How much does a website cost?",
    a: `A ${landing.name} starts at ${inr(landing.from)}, a ${business.name} at ${inr(business.from)}, an ${advanced.name} at ${inr(advanced.from)} and an ${store.name} at ${inr(store.from)}. After a free call you get a fixed written quote, so the price we agree is the price you pay.`,
  },
  {
    q: "How long does a website take?",
    a: `A ${landing.name} usually takes ${landing.timeline} once I have your content. A ${business.name} takes ${business.timeline}, an ${advanced.name} ${advanced.timeline} and an ${store.name} ${store.timeline}. I'll give you a fixed date after our first call.`,
  },
  {
    q: "Are you based in Indore? Can we meet?",
    a: "Yes. I'm based in Indore and happy to meet at your shop, clinic or office, or over a chai. Clients elsewhere in India work with me on WhatsApp and short video calls.",
  },
  {
    q: "What do I need to provide?",
    a: "Your logo (if you have one), photos of your work or products, your prices and the basics: address, hours, phone. If you don't have good photos yet, I can use carefully chosen stock photos to start with. Copywriting is available as an add-on.",
  },
  {
    q: "Do I own the website and domain?",
    a: "Yes. The domain and hosting are registered in your name and billed at cost. You own your content, and I hand over everything at launch.",
  },
  {
    q: "How do payments work?",
    a: "50% to start and 50% before launch, by UPI or bank transfer. No hidden charges: domain and hosting are billed at cost, and anything extra is agreed in writing first.",
  },
  {
    q: "Can I edit the website myself later?",
    a: `Simple changes like prices, menus and photos can be set up so you can edit them easily. For anything bigger, care plans from ${inr(carePlans[0].perMonth)}/month include editing time, or you can message me for one-off changes.`,
  },
  {
    q: "Will my website show up on Google?",
    a: "Every site comes with basic SEO: page titles, descriptions, a sitemap, fast loading and Google Maps. I also help you set up your Google Business Profile, which is what makes local customers in Indore find you on Maps.",
  },
  {
    q: "I already have a website. Can you improve it?",
    a: "Yes. The website redesign service starts with an audit of your current site, then rebuilds it with a modern design while keeping your content and Google rankings intact.",
  },
  {
    q: "Will my website look like one of these demos?",
    a: "It starts from the demo you like, then everything is changed to fit your business: your name, colours, photos, services and content. No two client sites look the same.",
  },
];

export const pricingFaq: QA[] = [
  {
    q: "Why do you show starting prices?",
    a: "So you know the ballpark before we talk. The final price depends on the pages, features and content you need, and you get it as a fixed written quote after a free call, with no obligation to go ahead.",
  },
  {
    q: "Are there any hidden costs?",
    a: "No. The only extra costs are your domain and hosting, which are billed at cost in your name, and any add-ons you choose. The fixed quote after our call lists everything.",
  },
  {
    q: "Why are you cheaper than big agencies?",
    a: "You work directly with me, the person writing the code. No office overheads, account managers or sales team, so you pay for the website, not the agency.",
  },
  {
    q: "What if I need something that isn't listed?",
    a: "Tell me what you need. Custom features like booking systems, integrations or extra languages can be quoted separately.",
  },
];
