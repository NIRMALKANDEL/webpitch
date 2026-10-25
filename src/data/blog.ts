import { carePlans, inr, packages } from "./pricing";

/**
 * ═══════════════════════════════ BLOG POSTS ═══════════════════════════════
 * Each post is plain data. Block types:
 *   { p: "Paragraph text" }
 *   { h2: "Section heading" }
 *   { ul: ["Bullet", "Bullet"] }   { ol: ["Step", "Step"] }
 *   { table: { head: ["Col", "Col"], rows: [["a", "b"]] } }
 *   { cta: "Text for a call-to-action box" }
 * Links inside text: write [label](/path) or [label](https://…).
 *
 * Aim for two posts a month, each answering one question a business owner would type into Google.
 * ═════════════════════════════════════════════════════════════════════════
 */

export type Block =
  | { p: string }
  | { h2: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: string[]; rows: string[][] } }
  | { cta: string };

export type Post = {
  slug: string;
  title: string;
  /** Meta description, about 150 characters. */
  description: string;
  /** ISO date, e.g. "2026-10-25". */
  published: string;
  updated?: string;
  /** Minutes to read. */
  minutes: number;
  tags: string[];
  body: Block[];
  /** Pages you actually used for facts and figures. */
  sources?: { label: string; url: string }[];
};

const [landing, business, advanced, store] = packages;

export const posts: Post[] = [
  {
    slug: "website-cost-in-indore",
    title: "How much does a website cost in Indore in 2026?",
    description:
      "Real price ranges for landing pages, business websites and online stores in Indore, what changes the price, and the hidden costs to ask about.",
    published: "2026-10-25",
    minutes: 6,
    tags: ["Pricing", "Indore", "Small business"],
    body: [
      {
        p: "Ask five web designers in Indore what a website costs and you'll hear five different numbers, from ₹5,000 to ₹5 lakh. Both can be fair. The price depends on what the site has to do, who builds it and what is included after launch. Here is a straight breakdown.",
      },
      { h2: "Typical price ranges in Indore" },
      {
        p: "These are the ranges local agencies and freelancers publish for 2026. They are a market snapshot, not a rule.",
      },
      {
        table: {
          head: ["Type of website", "Typical range in Indore", "Good for"],
          rows: [
            ["Landing page (1 page)", "₹5,000 – ₹20,000", "Cafés, salons, tutors, home services"],
            ["Business website (5–10 pages)", "₹15,000 – ₹50,000", "Clinics, institutes, local businesses"],
            ["Dynamic website", "₹30,000 – ₹80,000", "Sites you update often, with a blog or catalogue"],
            ["E-commerce website", "₹30,000 – ₹1,50,000+", "Shops selling online with payments"],
            ["Custom web application", "₹75,000 – ₹5,00,000+", "Portals, dashboards, booking systems"],
          ],
        },
      },
      { h2: "What changes the price" },
      {
        ul: [
          "Number of pages, and whether the content is written for you or by you.",
          "Features: online booking, WhatsApp ordering, payments, a product catalogue, a blog, a second language.",
          "Design: a template with your logo, or a custom design made for your brand.",
          "Who builds it: a freelancer, a small agency or a large agency, each with different overheads.",
          "What happens after launch: updates, backups and small edits each month.",
        ],
      },
      { h2: "The hidden costs to ask about" },
      {
        p: "The build price is not the whole story. Before you say yes, ask who pays for these and whose name they're in:",
      },
      {
        ul: [
          "Domain name: usually ₹800 – ₹1,500 a year for a .in or .com. It should be registered in your name.",
          "Hosting: from free for a small static site to a few thousand rupees a year. Ask what happens if you stop paying the designer.",
          "Business email (you@yourbusiness.in): optional, around ₹100 – ₹200 per person per month.",
          "Payment gateway fees if you sell online, usually a small percentage per transaction.",
          "Maintenance: a monthly plan for updates and edits, or pay per change.",
        ],
      },
      { h2: "My prices, for comparison" },
      {
        p: `At NirmalBuilds a ${landing.name} starts at ${inr(landing.from)}, a ${business.name} at ${inr(business.from)}, an ${advanced.name} at ${inr(advanced.from)} and an ${store.name} at ${inr(store.from)}. Care plans start at ${inr(carePlans[0].perMonth)} a month. Every project gets a fixed written quote, and you pay 50% to start and 50% before launch. The full list is on the [pricing page](/pricing).`,
      },
      { h2: "How to choose" },
      {
        ol: [
          "Write down the one thing the website must do: get calls, take bookings, take orders or sell products.",
          "Open a few demo sites for your industry and note what you like.",
          "Ask two or three designers for a fixed written quote with everything listed.",
          "Check that the domain, hosting and content will be in your name.",
          "Ask to see real sites they've built, and call one of their clients.",
        ],
      },
      { cta: "Want a fixed quote for your business? Open a live demo for your industry, then send me a message." },
    ],
    sources: [
      { label: "Discover Websoft: Website designing cost in Indore (2026)", url: "https://discoverwebsoft.com/website-designing-cost-in-indore/" },
      { label: "Mayank Digital Labs: How much does a website cost in India (2026)", url: "https://www.mayankdigitallabs.in/blog/how-much-does-a-website-cost-in-india-2026" },
    ],
  },
  {
    slug: "do-i-need-a-website-if-i-have-instagram",
    title: "Do you need a website if your business is on Instagram?",
    description:
      "Instagram is great for being seen. A website is what shows up when people search on Google. Here's when you need both, and when Instagram alone is enough.",
    published: "2026-10-25",
    minutes: 4,
    tags: ["Small business", "Marketing"],
    body: [
      {
        p: "Many cafés, salons and boutiques in Indore run their whole business from an Instagram page and WhatsApp. It works, up to a point. Here's where it stops working.",
      },
      { h2: "What Instagram does well" },
      {
        ul: [
          "Showing your food, work or products in photos and reels.",
          "Keeping regular customers up to date.",
          "Reaching new people through reels, hashtags and shares.",
        ],
      },
      { h2: "What Instagram can't do" },
      {
        ul: [
          "Show up when someone searches Google for \"salon near me\" or \"café in Vijay Nagar\".",
          "Show your full price list, menu or services in a way people can scan in ten seconds.",
          "Take bookings or orders in a structured way, without endless DMs.",
          "Belong to you. If your account is hacked, restricted or the algorithm changes, your shop window disappears.",
        ],
      },
      { h2: "When you need a website" },
      {
        p: "If people search for what you do (doctors, coaching, home repairs, wedding services), you need a website and a Google Business Profile. If customers ask the same questions in DMs every day (prices, timings, location), a website answers them for you. And if you want to look established to bigger clients, a website with your own domain does that in a way a social profile can't.",
      },
      { h2: "The best setup for most small businesses" },
      {
        ol: [
          "A simple website with your services, prices, photos, location and a WhatsApp button.",
          "A Google Business Profile linked to that website.",
          "Instagram for reach, with the website link in your bio.",
        ],
      },
      {
        p: `A one-page website is enough to start. Mine start at ${inr(landing.from)}, and you can see live examples for your industry on the [demos page](/demos).`,
      },
      { cta: "Not sure if you need a website yet? Ask me on WhatsApp. I'll give you an honest answer." },
    ],
  },
  {
    slug: "google-maps-listing-indore-business",
    title: "How to get your Indore business on Google Maps (step by step)",
    description:
      "A plain-language guide to creating and verifying a Google Business Profile, so customers nearby find you on Google Search and Maps.",
    published: "2026-10-25",
    minutes: 5,
    tags: ["Local SEO", "Google Maps", "Indore"],
    body: [
      {
        p: "When someone in Indore searches \"AC repair near me\" or \"best café in Palasia\", the map with three businesses at the top is what most people tap. Getting there starts with a free Google Business Profile.",
      },
      { h2: "Step by step" },
      {
        ol: [
          "Go to google.com/business and sign in with a Google account you'll keep (not a staff member's personal one).",
          "Enter your business name exactly as it appears on your signboard. Don't add keywords to the name.",
          "Pick the most specific category, such as \"Hair salon\" rather than \"Beauty\".",
          "If customers visit you, add your shop address. If you travel to customers (plumbers, tutors, web designers), choose service areas instead and hide your home address.",
          "Add your phone number and your website.",
          "Verify the profile. Google will offer one or more methods, often a short video of your premises or a phone call. Follow the steps it shows you.",
          "Fill in everything: opening hours, services with prices, a description, and at least ten real photos.",
        ],
      },
      { h2: "What helps you rank higher" },
      {
        ul: [
          "Reviews. Ask every happy customer, and reply to every review, good or bad.",
          "A website that matches: the same name, phone and address on your site and your profile.",
          "Fresh photos and posts, roughly once a week.",
          "The right category and accurate opening hours.",
        ],
      },
      { h2: "What to avoid" },
      {
        ul: [
          "Using a virtual office or a friend's address. Google doesn't allow it and may suspend the profile.",
          "Stuffing keywords into your business name.",
          "Buying fake reviews. They get removed and can get the profile suspended.",
        ],
      },
      {
        p: "Google's own rules are in its [Business Profile guidelines](https://support.google.com/business/answer/3038177). Read them once; they're shorter than you'd think.",
      },
      { cta: "I set up and link Google Business Profiles as part of every website. Want help with yours?" },
    ],
    sources: [{ label: "Google: Guidelines for representing your business on Google", url: "https://support.google.com/business/answer/3038177" }],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

/** Newest first. */
export const sortedPosts = () => [...posts].sort((a, b) => b.published.localeCompare(a.published));

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
