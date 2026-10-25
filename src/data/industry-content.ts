import type { QA } from "@/components/site/FAQ";

/**
 * Long-form copy for the industries you focus on. Each one gets its own search title and description,
 * a few short guide sections and an FAQ (with FAQ schema). Industries without an entry here
 * fall back to the shorter template, which is fine for the ones you don't target.
 *
 * Keep it true and specific: no invented statistics, no fake client names.
 */
export type IndustryContent = {
  /** <title> without the brand. Aim for under 50 characters. */
  seoTitle: string;
  /** Meta description, about 150 characters. */
  seoDescription: string;
  sections: { heading: string; paragraphs: string[] }[];
  faq: QA[];
};

export const industryContent: Record<string, IndustryContent> = {
  restaurants: {
    seoTitle: "Restaurant & Café Website Design in Indore",
    seoDescription:
      "Websites for cafés, restaurants and cloud kitchens in Indore: menus that work on phones, WhatsApp ordering without commission, table booking and Google Maps.",
    sections: [
      {
        heading: "Take orders without paying commission",
        paragraphs: [
          "Food apps are good for discovery, but every order through them costs you a commission. Your own website lets regulars order directly: they build their order from your menu and send it to your WhatsApp in one tap, with no app fee.",
          "Use the apps to get found, and your website and Google Business Profile to keep the customers you've already won.",
        ],
      },
      {
        heading: "A menu people can read on a phone",
        paragraphs: [
          "Most people look at your menu on their phone, often while standing outside. A PDF menu or a photo of a printed one is hard to read and impossible to update. A web menu has tabs, veg and non-veg filters and prices you can change in minutes.",
          "Add your best dish photos, opening hours that show \"open now\", and directions that open straight in Google Maps.",
        ],
      },
      {
        heading: "Built for how Indore eats out",
        paragraphs: [
          "Whether you run a café near Vijay Nagar, a family restaurant in Palasia or a cloud kitchen delivering across the city, the site is shaped around how your customers decide: the menu, the vibe, the location and how to order.",
          "Open the Tamarind & Smoke demo to try the menu tabs, the WhatsApp order cart and the table booking form yourself.",
        ],
      },
    ],
    faq: [
      {
        q: "Can customers order on WhatsApp from the website?",
        a: "Yes. They add dishes to a cart on your site, enter their address, and the full order arrives on your WhatsApp as a message. There's no app to install and no commission.",
      },
      {
        q: "Can I change prices and the menu myself?",
        a: "Yes. Menu items and prices can be set up so you can edit them in minutes, or you can send changes to me on WhatsApp if you're on a care plan.",
      },
      {
        q: "Can you add online payment for orders?",
        a: "Yes, with Razorpay or a UPI payment link. Many cafés start with WhatsApp orders and cash or UPI on delivery, then add online payment later.",
      },
      {
        q: "Will my café show up on Google Maps?",
        a: "Your Google Business Profile is what puts you on Maps. I help you set it up and link it to your website, which together help people nearby find you.",
      },
    ],
  },

  salons: {
    seoTitle: "Salon & Spa Website Design in Indore",
    seoDescription:
      "Websites for salons, spas, nail studios and bridal makeup artists in Indore: clear price lists, online booking, offers and WhatsApp reminders.",
    sections: [
      {
        heading: "Fill your chairs while you sleep",
        paragraphs: [
          "People book beauty appointments on impulse, often late at night. If the only way to book is calling during working hours, many of them never call. A three-step booking flow (service, stylist, time) lets them book the moment they decide.",
          "Every booking lands on your WhatsApp and email, so you see it first thing in the morning.",
        ],
      },
      {
        heading: "Prices up front build trust",
        paragraphs: [
          "Clear price lists for hair, skin, nails, spa and bridal answer the question clients are too shy to ask. Show starting prices, what's included, and how long each service takes.",
          "Add seasonal offers with real end dates for wedding season, festivals and weekdays when you're quiet.",
        ],
      },
      {
        heading: "Show your team and your work",
        paragraphs: [
          "Clients come back for a stylist, not just a salon. Profiles with photos and specialities help new clients choose, and a gallery of your real work does more than any stock photo.",
          "Open the Velvet Rooms demo to try the booking flow and price tabs.",
        ],
      },
    ],
    faq: [
      {
        q: "Can clients book appointments online?",
        a: "Yes. They pick a service, a stylist and a time, see the total, and the booking reaches you on WhatsApp and email. You confirm it with one message.",
      },
      {
        q: "Can I use it for bridal and party makeup bookings?",
        a: "Yes. Bridal enquiries usually need a date, venue and number of people, so they get their own form and a separate packages section.",
      },
      {
        q: "Do I need an app?",
        a: "No. A fast website does everything most salons need, and clients don't have to download anything.",
      },
      {
        q: "Which package do most salons choose?",
        a: "The Business Website: up to 5 pages with services, prices, team, gallery and booking. A single Landing Page also works well for a new studio.",
      },
    ],
  },

  agencies: {
    seoTitle: "Website Design for Marketing Agencies",
    seoDescription:
      "Websites for marketing, creative and digital agencies in Indore and across India: case studies, a clear services page, a journal and a brief form that brings real leads.",
    sections: [
      {
        heading: "Your website is your first pitch",
        paragraphs: [
          "Clients judge a marketing agency by its own website before they read a word. If it looks like a template, they assume your client work will too. A site with a strong first screen, fast case studies and plain-language services sets the tone before the first call.",
        ],
      },
      {
        heading: "Case studies that sell",
        paragraphs: [
          "Each project gets its own page: the problem, what you did and what changed. Filters by service or industry help a prospect find work like theirs in seconds.",
          "A journal or blog with your thinking brings in search traffic and gives your sales team something to share.",
        ],
      },
      {
        heading: "A brief form instead of \"contact us\"",
        paragraphs: [
          "A proper brief form asks for services, budget range, timeline and goals, so the leads that reach you are already qualified. It saves a discovery call on every enquiry that was never a fit.",
          "Open the Hotwire Studio demo to see a multi-page agency site with case studies, a team page, a journal and the brief form.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you work with agencies as a white-label developer?",
        a: "Yes. Agencies can bring me in to build their clients' websites under their own name. You handle the client; I build to your designs and deadlines.",
      },
      {
        q: "Can you build from our Figma designs?",
        a: "Yes. Send the Figma file and I'll build it pixel-accurate, responsive and fast, with animations where the design calls for them.",
      },
      {
        q: "Can we update case studies and blog posts ourselves?",
        a: "Yes. Case studies and articles can be set up so your team adds them without touching code.",
      },
      {
        q: "Which package fits an agency site?",
        a: "Usually the Advanced Website: custom design, up to 10 pages, case studies, a journal and motion. A 3D hero is available as an add-on.",
      },
    ],
  },

  "home-services": {
    seoTitle: "Websites for Plumbers, Electricians & AC Repair",
    seoDescription:
      "Fast websites for home services in Indore: plumbers, electricians, AC repair, pest control and cleaners. Call and WhatsApp buttons, PIN code checker and quote forms.",
    sections: [
      {
        heading: "Be the first number they call",
        paragraphs: [
          "When an AC stops cooling in May or a pipe bursts, people search on their phone and call the first business that looks trustworthy. Your site has to load instantly, show a call button that never leaves the screen, and tell them you cover their area.",
        ],
      },
      {
        heading: "Upfront prices win the job",
        paragraphs: [
          "Visit charges and typical job prices, like a split AC service or fixing a leaking tap, remove the fear of being overcharged. Customers who know the price are far more likely to book.",
          "A PIN code checker answers \"do you come to my area?\" without a phone call.",
        ],
      },
      {
        heading: "Show up on Google Maps",
        paragraphs: [
          "For home services, Google Maps brings more calls than almost anything else. Your website and Google Business Profile work together, so I set both up and link them.",
          "Open the FixRight demo to try the PIN code checker and quote form.",
        ],
      },
    ],
    faq: [
      {
        q: "I'm a one-person business. Do I need a big website?",
        a: "No. A Landing Page with your services, prices, areas, reviews and a call button is enough for most plumbers, electricians and technicians.",
      },
      {
        q: "Will customers be able to call me directly?",
        a: "Yes. A call button and a WhatsApp button stay visible on every phone screen.",
      },
      {
        q: "Can the site show which areas of Indore I cover?",
        a: "Yes. Customers enter their PIN code and get an instant answer, and your areas are listed for Google too.",
      },
      {
        q: "How fast will it load on a slow connection?",
        a: "Home service sites are built lightweight on purpose, so they open quickly even on a weak mobile signal.",
      },
    ],
  },

  clinics: {
    seoTitle: "Clinic & Dental Website Design in Indore",
    seoDescription:
      "Websites for dental clinics, doctors, physiotherapists and skin clinics in Indore: online appointments, doctor profiles, treatment fees and Google Maps.",
    sections: [
      {
        heading: "Let patients book without calling",
        paragraphs: [
          "Many patients would rather book online than call, especially outside clinic hours. An appointment form with treatments, doctors and real time slots lets them book in under a minute, and the request reaches your reception on WhatsApp.",
        ],
      },
      {
        heading: "Trust comes first",
        paragraphs: [
          "Patients choose a clinic they trust. Doctor profiles with qualifications and experience, clear treatment fees, photos of your clinic and answers to common worries (pain, cost, EMI, insurance) do the reassuring before they arrive.",
        ],
      },
      {
        heading: "Calm, fast and accessible",
        paragraphs: [
          "Clinic websites should feel calm: plenty of space, readable text and nothing flashy. They should also be easy to use for older patients, with large buttons and good contrast.",
          "Open the Pearl & Pine Dental demo to try the appointment scheduler.",
        ],
      },
    ],
    faq: [
      {
        q: "Can patients choose a doctor and time slot?",
        a: "Yes. They pick a treatment, a doctor, a date and an open slot. You can start with requests you confirm on WhatsApp, and add a full booking system later.",
      },
      {
        q: "Can I show treatment prices?",
        a: "Yes, as exact fees or starting prices. Clear fees reduce anxious phone calls and help patients come prepared.",
      },
      {
        q: "Is patient data safe?",
        a: "Forms collect only what you need to book an appointment, over a secure connection. Medical records should stay in your clinic software, not on the website.",
      },
      {
        q: "Which package do clinics usually choose?",
        a: "The Business Website: home, treatments, doctors, about and contact, with an appointment form.",
      },
    ],
  },

  coaching: {
    seoTitle: "Coaching Institute Website Design in Indore",
    seoDescription:
      "Websites for coaching institutes, tuition centres and training academies in Indore: courses, batch timings, faculty, results and admission enquiries.",
    sections: [
      {
        heading: "Parents compare before they visit",
        paragraphs: [
          "Indore has a huge coaching scene, and parents shortlist institutes online before they ever visit. Your website should answer their questions fast: courses, batch timings, fees, faculty and results.",
        ],
      },
      {
        heading: "Turn visits into admissions",
        paragraphs: [
          "A free demo class or counselling session is the easiest first step for a family. An admission enquiry form with student and parent details, class and exam sends each lead straight to your counsellors on WhatsApp.",
        ],
      },
      {
        heading: "Results, presented honestly",
        paragraphs: [
          "A results section with real toppers, selections and testimonials builds trust, as long as every claim is true and verifiable. Faculty profiles with experience and subjects matter just as much.",
          "Open the Apex Academy demo to try the course filters, timetable and admission form.",
        ],
      },
    ],
    faq: [
      {
        q: "Can students filter courses by class or exam?",
        a: "Yes. Courses can be filtered by class, exam (JEE, NEET, CA, government exams) and mode (offline or online).",
      },
      {
        q: "Can I update batch timings myself?",
        a: "Yes. Batches and timings can be set up so your office staff can change them without calling me.",
      },
      {
        q: "Can the site be in Hindi as well?",
        a: "Yes. A Hindi version is available as an add-on, which helps when parents prefer to read in Hindi.",
      },
      {
        q: "Which package do coaching institutes choose?",
        a: "Usually the Business Website, with courses, faculty, results, timetable and an admission enquiry form.",
      },
    ],
  },
};
