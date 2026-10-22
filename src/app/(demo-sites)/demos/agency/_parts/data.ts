/**
 * Content for the Hotwire Studio demo. Everything here is fictional placeholder copy for a concept site:
 * swap in real services, projects, people and articles when building a real agency site.
 */

export const BASE = "/demos/agency";

export const studio = {
  name: "Hotwire Studio",
  city: "Berlin",
  // Placeholder details: the .example domain can never receive email.
  email: "hello@hotwire.example",
  address: "Studio address goes here, Berlin",
  hours: "Monday to Friday, 9:00 to 18:00 CET",
};

export const nav = [
  { href: `${BASE}/services`, label: "Services" },
  { href: `${BASE}/work`, label: "Work" },
  { href: `${BASE}/about`, label: "About" },
  { href: `${BASE}/team`, label: "Team" },
  { href: `${BASE}/blog`, label: "Journal" },
  { href: `${BASE}/contact`, label: "Contact" },
];

/** Accent colours (CSS variables set in the layout). Text on these is always near-black. */
/** Pink is the primary colour; lime and violet are secondary; mist is a neutral grey tile. */
export type Accent = "pink" | "lime" | "violet" | "mist";

export type Service = {
  slug: string;
  color: Accent;
  name: string;
  line: string;
  includes: string[];
  timeline: string;
};

export const services: Service[] = [
  {
    slug: "brand",
    color: "pink",
    name: "Brand identity",
    line: "Logo, type, colour and the rules that hold them together, built from a clear idea of who you are for.",
    includes: ["Positioning workshop", "Logo and wordmark", "Type and colour system", "Brand guidelines in PDF and Figma"],
    timeline: "4 to 6 weeks",
  },
  {
    slug: "web",
    color: "lime",
    name: "Websites and shops",
    line: "Fast marketing sites and online stores that look like your brand, with a CMS your team can edit.",
    includes: ["Page structure and UX", "Design in Figma", "Build in Next.js or Shopify", "Editor training"],
    timeline: "6 to 10 weeks",
  },
  {
    slug: "motion",
    color: "violet",
    name: "Motion and 3D",
    line: "Logo animations, product renders and short films for launch day, social and the web.",
    includes: ["Animated logo", "3D product renders", "Social cut-downs", "Website interactions"],
    timeline: "2 to 5 weeks",
  },
  {
    slug: "campaign",
    color: "mist",
    name: "Launch campaigns",
    line: "One campaign idea, the assets to run it and a plan for the first 90 days after launch.",
    includes: ["Campaign concept", "Key visuals", "Social templates", "Launch calendar"],
    timeline: "3 to 6 weeks",
  },
  {
    slug: "packaging",
    color: "pink",
    name: "Packaging",
    line: "Labels and boxes that stand out on a crowded shelf and still look good in a phone photo.",
    includes: ["Structure and dieline", "Label design", "Print-ready files", "Mock-ups for retailers"],
    timeline: "4 to 8 weeks",
  },
];

export const disciplines = ["Brand", "Web", "Motion", "Campaign", "Packaging"] as const;
export type Discipline = (typeof disciplines)[number];

export type CoverArt = "circle" | "rings" | "arch" | "stripes" | "wave" | "blob";

export type Project = {
  slug: string;
  client: string;
  sector: string;
  year: string;
  disciplines: Discipline[];
  summary: string;
  challenge: string;
  idea: string;
  made: string[];
  cover: { bg: string; fg: string; art: CoverArt; word: string };
};

export const projects: Project[] = [
  {
    slug: "sour-hour",
    client: "Sour Hour",
    sector: "Low-sugar soda",
    year: "2026",
    disciplines: ["Brand", "Packaging", "Web"],
    summary: "A loud identity for a low-sugar soda that wanted to be the can people photograph.",
    challenge:
      "Sour Hour had a good recipe and plain white cans. In a corner-shop fridge next to the big names, nobody noticed them, and their website looked like every other drinks start-up.",
    idea:
      "Build everything around one shape: a citrus slice cut into a perfect circle. It becomes the logo, the can, the loading animation on the website and the sticker in every delivery box.",
    made: ["Wordmark and circle symbol", "Can and multipack design", "Online shop with subscriptions", "Launch stickers and posters"],
    cover: { bg: "#FF2E93", fg: "#000000", art: "circle", word: "Sour Hour" },
  },
  {
    slug: "loop-records",
    client: "Loop Records",
    sector: "Independent record label",
    year: "2026",
    disciplines: ["Web", "Motion"],
    summary: "A website for a small label where every release gets its own animated cover.",
    challenge:
      "The label releases a record every month, and each one disappeared from their social feeds within a week. Their site was a list of links to streaming platforms.",
    idea:
      "Treat the website like a record shop wall. Each release gets an animated cover, a short listening clip and a page fans can share, so the back catalogue keeps working.",
    made: ["Release pages with audio previews", "Animated cover system", "Newsletter sign-up", "Social templates"],
    cover: { bg: "#D8FF3C", fg: "#000000", art: "rings", word: "Loop" },
  },
  {
    slug: "atelier-ruh",
    client: "Atelier Ruh",
    sector: "Slow fashion label",
    year: "2025",
    disciplines: ["Brand", "Web"],
    summary: "A quiet brand and shop for a label that makes small runs of clothes to order.",
    challenge:
      "Made-to-order means waiting four weeks. Shoppers used to next-day delivery left before they understood why the wait was worth it.",
    idea:
      "Show the making. Every product page has a short timeline from cutting to stitching, and the arch from the studio window frames every photo and the logo.",
    made: ["Identity and arch symbol", "Shop with made-to-order timeline", "Lookbook layouts", "Care-label system"],
    cover: { bg: "#F5F1F3", fg: "#000000", art: "arch", word: "Ruh" },
  },
  {
    slug: "night-shift",
    client: "Night Shift Run Club",
    sector: "Running community",
    year: "2025",
    disciplines: ["Campaign", "Motion"],
    summary: "A campaign that got a late-night running club noticed across the city.",
    challenge:
      "The club runs at 10 pm. Their audience is people who finish work late, and posters in daylight did nothing for them.",
    idea:
      "Reflective stripes. Posters printed with reflective ink only show their message under headlights and phone torches, and the social films use the same stripes as a motion system.",
    made: ["Campaign idea and line", "Reflective poster series", "Motion system for social", "Route maps"],
    cover: { bg: "#141414", fg: "#FF2E93", art: "stripes", word: "Night Shift" },
  },
  {
    slug: "fernweh",
    client: "Fernweh Bikes",
    sector: "E-bike start-up",
    year: "2025",
    disciplines: ["Web", "Motion"],
    summary: "A product site where you can spin the bike, change its colour and see it ride.",
    challenge:
      "Fernweh sells online only. People wanted to see the bike from every side before spending a month's salary on it.",
    idea:
      "Put a real-time 3D bike at the centre of the site. Visitors turn it, pick a colour and watch a short ride film that matches the colour they chose.",
    made: ["3D bike configurator", "Product films", "Comparison pages", "Test-ride booking"],
    cover: { bg: "#232323", fg: "#D8FF3C", art: "wave", word: "Fernweh" },
  },
  {
    slug: "mellow-fellow",
    client: "Mellow Fellow",
    sector: "Plant-based ice cream",
    year: "2024",
    disciplines: ["Brand", "Packaging", "Campaign"],
    summary: "A soft, funny brand for an oat-milk ice cream sold in supermarket freezers.",
    challenge:
      "Plant-based ice cream usually looks like medicine: green, earnest and full of claims. Mellow Fellow wanted to look like a treat first.",
    idea:
      "A melting blob character that changes shape for every flavour. It lives on the tubs, in the freezer-door stickers and in a set of short looping animations.",
    made: ["Character and logo", "Tub designs for six flavours", "Freezer-door stickers", "Looping social animations"],
    cover: { bg: "#FFB3D4", fg: "#000000", art: "blob", word: "Mellow" },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const steps = [
  { name: "Listen", text: "A workshop with your team to agree who the brand is for and what it has to do." },
  { name: "Define", text: "One idea, written down in a sentence, that every design decision is checked against." },
  { name: "Make", text: "Identity, website and assets designed together, reviewed with you every week." },
  { name: "Launch", text: "We ship, watch how people use it for 30 days, and fix what isn't working." },
];

export const values = [
  { name: "One idea, everywhere", text: "The logo, the website and the launch film should feel like they came from the same brain." },
  { name: "Senior people, small team", text: "The people you meet in the pitch are the people who design and build your project." },
  { name: "Plain language", text: "We explain what we're doing and why, without jargon, so you can make decisions quickly." },
];

export type Member = { name: string; role: string; focus: string[]; bio: string; hue: Accent };

// Fictional people for the demo: no photos of real people are used.
export const team: Member[] = [
  { name: "Mara Lindqvist", role: "Creative director", focus: ["Brand strategy", "Art direction"], bio: "Leads the idea on every project and runs the first workshop.", hue: "pink" },
  { name: "Tobi Adeyemi", role: "Design lead", focus: ["Identity", "Type"], bio: "Draws the logos and builds the type and colour systems.", hue: "lime" },
  { name: "Ana Ferreira", role: "Lead developer", focus: ["Next.js", "Shopify"], bio: "Builds the websites and makes sure they load quickly on a phone.", hue: "violet" },
  { name: "Jun Park", role: "Motion and 3D", focus: ["3D renders", "Animation"], bio: "Makes things move, from logo animations to product films.", hue: "mist" },
  { name: "Lea Hoffmann", role: "Strategist", focus: ["Research", "Naming"], bio: "Talks to your customers before anyone opens a design file.", hue: "lime" },
  { name: "Ravi Menon", role: "Producer", focus: ["Planning", "Budgets"], bio: "Keeps the timeline honest and your inbox free of surprises.", hue: "pink" },
];

export const categories = ["Branding", "Web", "Motion", "Studio notes"] as const;
export type Category = (typeof categories)[number];

export type Block = { h2: string } | { p: string } | { ul: string[] } | { quote: string };

export type Post = {
  slug: string;
  title: string;
  category: Category;
  date: string; // ISO
  excerpt: string;
  author: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "how-to-write-a-brief",
    title: "How to write a brief a studio can actually use",
    category: "Studio notes",
    date: "2026-09-18",
    author: "Ravi Menon",
    excerpt: "Five questions that save two weeks of back-and-forth before a project starts.",
    body: [
      { p: "Most briefs we receive are either one line long or forty pages. Neither helps. A good brief answers a handful of questions clearly, and leaves the solution to the studio." },
      { h2: "1. What has to change?" },
      { p: "Describe the problem, not the deliverable. \"Nobody notices our cans in the fridge\" is more useful than \"we need new packaging\", because it tells us what success looks like." },
      { h2: "2. Who is it for?" },
      { p: "Name one or two real customer types. Where do they hear about you, and what do they already buy instead?" },
      { h2: "3. What can't change?" },
      { p: "A name you're keeping, a colour your customers love, a platform your team already knows. Constraints are useful, so share them early." },
      { h2: "4. When and how much?" },
      { p: "A deadline and a budget range let us tell you straight away what's realistic. A range is fine; we'd rather hear it than guess." },
      { h2: "5. Who decides?" },
      { p: "Tell us who signs off. Projects slow down when the person with the final say only appears in week six." },
      { quote: "A brief is a conversation starter, not a contract. Half a page is often enough." },
      { p: "Our brief form asks exactly these questions. If you're not sure about an answer, leave it blank and we'll work it out together on the first call." },
    ],
  },
  {
    slug: "your-system-matters-more-than-your-logo",
    title: "Your system matters more than your logo",
    category: "Branding",
    date: "2026-08-27",
    author: "Tobi Adeyemi",
    excerpt: "People see your type, colours and layouts far more often than your logo. Design those first.",
    body: [
      { p: "Clients usually want to talk about the logo first. It's the most visible part of a brand, so that makes sense. But count how often a customer actually sees it compared with everything else you publish." },
      { h2: "Where people really meet your brand" },
      { ul: ["An Instagram post, where the logo is a small avatar", "A product page, where type and photography do the work", "A delivery box, where colour is what they remember", "An email, where the voice matters most"] },
      { p: "In every one of those moments, the system carries the brand: the typefaces, the colour proportions, the way images are cropped and how headlines are written." },
      { h2: "What a useful system includes" },
      { ul: ["Two typefaces with clear jobs", "A colour palette with rules for how much of each to use", "Layout patterns for the five things you make most often", "A few lines on tone of voice, with examples"] },
      { p: "Get those right, and the logo can be simple. Get them wrong, and even a brilliant logo can't hold the brand together." },
    ],
  },
  {
    slug: "speed-is-a-design-feature",
    title: "Speed is a design feature",
    category: "Web",
    date: "2026-07-30",
    author: "Ana Ferreira",
    excerpt: "A beautiful site that takes six seconds to load on a train is a beautiful site nobody sees.",
    body: [
      { p: "We design on large screens with fast connections. Most of your visitors are on a phone, half-way through a commute, with one bar of signal." },
      { h2: "What we budget for" },
      { p: "Before design starts, we agree on a performance budget: how heavy the first page can be and how quickly the main content must appear. Every image, font and animation has to fit inside it." },
      { h2: "Where the weight hides" },
      { ul: ["Images exported at the wrong size", "Three font families with six weights each", "Video that autoplays on mobile", "Tracking scripts nobody remembers adding"] },
      { h2: "3D without the wait" },
      { p: "Interactive 3D can work on a phone if it loads after the page is readable, and falls back to a still image on slow devices. The content should never wait for the effect." },
      { quote: "If it's slow, it's broken. It just doesn't show an error." },
    ],
  },
  {
    slug: "give-every-animation-a-job",
    title: "Give every animation a job",
    category: "Motion",
    date: "2026-06-12",
    author: "Jun Park",
    excerpt: "Motion should explain what just happened. If it only decorates, cut it.",
    body: [
      { p: "Animation is the easiest way to make a website feel expensive, and the easiest way to make it feel tiring. The difference is whether each movement has a reason." },
      { h2: "Three jobs motion does well" },
      { ul: ["Show cause and effect: a button press opens a panel that grows from the button", "Guide attention: one element moves, so you know where to look", "Show state: a loader that tells you something is happening"] },
      { h2: "And one it does badly" },
      { p: "Every section sliding in as you scroll. After the third one, people stop noticing, and on slower phones it makes the page feel stuck." },
      { h2: "Respect the setting" },
      { p: "Some people turn on reduced motion in their phone settings because animation makes them feel unwell. We always honour it: the content is the same, only the movement goes." },
    ],
  },
  {
    slug: "naming-without-losing-a-month",
    title: "Naming a product without losing a month",
    category: "Branding",
    date: "2026-05-21",
    author: "Lea Hoffmann",
    excerpt: "A simple process for finding a name that's available, sayable and yours.",
    body: [
      { p: "Naming projects stall for one reason: every name gets judged on gut feeling alone. A few clear filters make the conversation much faster." },
      { h2: "Our filters, in order" },
      { ul: ["Can you say it after hearing it once?", "Is the web address or a close variant available?", "Is it free to trademark in your markets?", "Does it mean something awkward in another language your customers speak?", "Does it leave room to grow beyond your first product?"] },
      { p: "We run long lists through these filters before anyone falls in love with a name. Usually only a handful survive, and choosing between five is much easier than choosing between fifty." },
      { quote: "The best name is often the one that felt slightly too bold in the first meeting." },
    ],
  },
  {
    slug: "what-we-check-in-launch-week",
    title: "What we check in launch week",
    category: "Web",
    date: "2026-04-09",
    author: "Ana Ferreira",
    excerpt: "The short list we run through before any website goes live.",
    body: [
      { p: "Launch week is not the time for new ideas. It's the time to make sure what's there works for everyone who visits." },
      { h2: "The list" },
      { ul: ["Every form sends to the right inbox, and the sender gets a confirmation", "Pages work on a small Android phone, not just the latest iPhone", "Keyboard users can reach every button and link", "Each page has a clear title and description for search and sharing", "Analytics only loads after visitors agree to it", "Old addresses redirect to their new pages"] },
      { p: "None of this is exciting. All of it is the difference between a launch that quietly works and one that needs a fix on day two." },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

/** Rough reading time at 220 words per minute. */
export function readMinutes(post: Post) {
  const words = post.body
    .map((b) => ("p" in b ? b.p : "h2" in b ? b.h2 : "quote" in b ? b.quote : b.ul.join(" ")))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const categoryColor: Record<Category, Accent> = {
  Branding: "pink",
  Web: "lime",
  Motion: "violet",
  "Studio notes": "mist",
};

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "Most identity-plus-website projects fall between €15k and €50k, depending on scope. After a short call we send a written plan with a fixed price, so there are no surprises.",
  },
  {
    q: "How long does it take?",
    a: "A brand identity takes 4 to 6 weeks; a website 6 to 10. Running both together usually takes about 10 to 12 weeks, because the work overlaps.",
  },
  {
    q: "Do you work with early-stage start-ups?",
    a: "Yes. Many of our clients are launching their first product. We can phase the work so you get what you need for launch first and add the rest later.",
  },
  {
    q: "Can my team edit the website after launch?",
    a: "Yes. We build on a CMS your team can use without a developer, and we include a training session and a short written guide.",
  },
  {
    q: "What happens on the first call?",
    a: "Twenty minutes, no slides. You tell us what you're launching and what's not working today; we ask questions and tell you honestly whether we're the right fit.",
  },
];

export const callTimes = ["10:00", "11:30", "14:00", "16:00"];

export const budgets = ["Under €10k", "€10k to €25k", "€25k to €50k", "Over €50k", "Not sure yet"];
export const timelines = ["As soon as possible", "In 1 to 3 months", "In 3 to 6 months", "Just exploring"];

/* ------------------------------------------------------------------ extra page content */

export const engagements: { name: string; color: Accent; who: string; includes: string[]; time: string }[] = [
  {
    name: "One service",
    color: "lime",
    who: "You need one thing done well, like a new website for an existing brand.",
    includes: ["One service from the list above", "Weekly review call", "Handover and training"],
    time: "2 to 10 weeks",
  },
  {
    name: "Launch bundle",
    color: "pink",
    who: "You're launching something new and want the brand, site and campaign to match.",
    includes: ["Brand identity and website", "Launch film and social kit", "30 days of fixes after launch"],
    time: "10 to 12 weeks",
  },
  {
    name: "Ongoing partner",
    color: "violet",
    who: "You already launched and need a design team on call every month.",
    includes: ["A set number of days each month", "Same team every time", "Monthly planning session"],
    time: "3 months or more",
  },
];

export const alwaysIncluded = [
  { name: "A named team", text: "The same three or four people from the first call to launch." },
  { name: "Weekly reviews", text: "A 30-minute call every week, with work you can comment on." },
  { name: "Plain-language plans", text: "Scope, timeline and price written down before we start." },
  { name: "Accessible by default", text: "Contrast, keyboard use and screen readers checked as we go." },
  { name: "Files you own", text: "Source files, fonts licences and logins handed over at the end." },
  { name: "30 days of fixes", text: "Anything that breaks in the month after launch, we fix free." },
];

export const serviceFaqs = [
  { q: "Can we book just one service?", a: "Yes. Each service works on its own. Bundling only makes sense when you're launching several things at once." },
  { q: "Do you work with our in-house team?", a: "Often. We can hand over to your designers and developers, or work alongside them with shared files from day one." },
  { q: "What do you need from us to start?", a: "A short brief, one person who can make decisions, and access to anything that already exists: logos, fonts, the current site." },
  { q: "Do you build on Shopify or WordPress?", a: "We build marketing sites in Next.js and shops in Shopify. If you're on another platform, we'll tell you honestly whether to stay or move." },
];

export const tools = ["Figma", "Blender", "After Effects", "Cinema 4D", "Next.js", "Shopify", "Three.js", "Framer"];

export const rhythm = [
  { day: "Monday", text: "Plan the week together: what we'll show you on Thursday.", color: "pink" as Accent },
  { day: "Tuesday", text: "Heads down. Questions go in one shared thread, not five inboxes.", color: "lime" as Accent },
  { day: "Thursday", text: "Review call: you see real work, not slides, and leave comments.", color: "violet" as Accent },
  { day: "Friday", text: "A short written summary of decisions and what's next.", color: "mist" as Accent },
];

export const aboutFaqs = [
  { q: "Where are you based?", a: "Berlin, with clients across Europe. Calls happen on video, and we visit for workshops when it helps." },
  { q: "How many clients do you take on?", a: "Four to six projects a year, so each one gets the senior team's full attention." },
  { q: "Do you work in languages other than English?", a: "We work in English and German. For other languages, we partner with native copywriters." },
];

export const teamPhases = [
  { phase: "Listen", people: ["Lea Hoffmann", "Mara Lindqvist"], text: "Research and the first workshop." },
  { phase: "Define", people: ["Mara Lindqvist", "Tobi Adeyemi"], text: "The idea and the identity direction." },
  { phase: "Make", people: ["Tobi Adeyemi", "Ana Ferreira", "Jun Park"], text: "Design, build and motion, in parallel." },
  { phase: "Launch", people: ["Ana Ferreira", "Ravi Menon"], text: "Go-live, training and the 30-day fix window." },
];

export const contactSteps = [
  { name: "You get in touch", text: "Book a call, send a brief or email. All three reach the same people." },
  { name: "We reply in two days", text: "With questions, or a time for a 20-minute call if it looks like a fit." },
  { name: "You get a written plan", text: "Scope, timeline and a fixed price, free of charge and with no obligation." },
];

export const contactFaqs = [
  { q: "Is the first call really free?", a: "Yes. Twenty minutes to understand what you need. If we're not the right fit, we'll try to point you to someone who is." },
  { q: "Do I need a finished brief?", a: "No. A few sentences about what you're launching is enough to start the conversation." },
  { q: "Can we sign an NDA first?", a: "Of course. Send it over with your brief and we'll sign before you share anything confidential." },
];

export const categoryBlurb: Record<Category, string> = {
  Branding: "Identity, naming and the systems that hold a brand together.",
  Web: "Building fast, accessible sites and shops that people enjoy using.",
  Motion: "Animation and 3D that explain things, not just decorate them.",
  "Studio notes": "How we run projects, and what we've learned doing it.",
};

export const memberByName = (name: string) => team.find((m) => m.name === name);

/** Turns a heading into an id for in-page links. */
export const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
