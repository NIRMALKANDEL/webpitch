import type { Package } from "./pricing";

export type Industry = {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  intro: string;
  image: string;
  imageAlt: string;
  subtypes: string[];
  needs: { title: string; text: string; icon: string }[];
  recommended: Package["id"];
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants, Cafes & Cloud Kitchens",
    short: "Restaurant",
    blurb: "Menus people can actually read on a phone, and a WhatsApp order button.",
    intro:
      "Your customers decide where to eat on their phone in under a minute. Your website should show the menu, the food and the order button before they scroll.",
    image: "1585937421612-70a008356fbe",
    imageAlt: "Bowls of curry and rice on a table",
    subtypes: ["Restaurants", "Cafes", "Cloud kitchens", "Bakeries", "Food trucks", "Caterers"],
    needs: [
      { title: "A menu that's easy to update", text: "Tabs, veg filters and prices you can change in minutes.", icon: "UtensilsCrossed" },
      { title: "WhatsApp ordering", text: "Customers build an order and send it straight to your phone.", icon: "MessageCircle" },
      { title: "Table reservations", text: "A booking form with date, time and party size.", icon: "CalendarCheck" },
      { title: "Food photography", text: "A gallery that makes people hungry.", icon: "Camera" },
      { title: "Maps and opening hours", text: "\"Open now\" shown automatically, with directions.", icon: "MapPin" },
      { title: "Reviews up front", text: "Show what diners say right next to the menu.", icon: "Star" },
    ],
    recommended: "premium",
  },
  {
    slug: "salons",
    name: "Salons, Spas & Beauty Studios",
    short: "Salon & spa",
    blurb: "Services, prices, your team and a booking flow that fills your chairs.",
    intro:
      "People book beauty appointments on impulse, usually late at night on their phone. Your site should show prices clearly and let them book in three taps.",
    image: "1633681926022-84c23e8cb2d6",
    imageAlt: "Modern hair salon with styling chairs and round mirrors",
    subtypes: ["Hair salons", "Spas", "Nail studios", "Barbers", "Bridal makeup", "Skin clinics"],
    needs: [
      { title: "Services with prices", text: "Tabs for hair, skin, nails, spa and bridal.", icon: "Scissors" },
      { title: "3-step booking", text: "Service, stylist and time, with a running total.", icon: "CalendarCheck" },
      { title: "Meet the team", text: "Let clients choose their favourite stylist.", icon: "Users" },
      { title: "Offers that expire", text: "Seasonal deals with real dates.", icon: "BadgePercent" },
      { title: "Location and parking", text: "Directions and hours, one tap away.", icon: "MapPin" },
      { title: "WhatsApp reminders", text: "Bookings arrive on your phone.", icon: "MessageCircle" },
    ],
    recommended: "business",
  },
  {
    slug: "agencies",
    name: "Creative, Design & Marketing Agencies",
    short: "Agency",
    blurb: "A studio site that shows your taste in the first second and turns visitors into briefs.",
    intro:
      "Clients judge an agency by its own website before they read a word. Yours should show the work fast, explain what you do in plain language, and make sending a brief the easiest thing on the page.",
    image: "/previews/agency.jpg",
    imageAlt: "A black, pink and chartreuse creative agency website",
    subtypes: ["Branding studios", "Web & digital agencies", "Motion & 3D studios", "Marketing agencies", "Freelance collectives", "Production houses"],
    needs: [
      { title: "Work first", text: "Case studies people can filter and open in a click.", icon: "LayoutGrid" },
      { title: "A signature moment", text: "One interactive 3D or motion piece that sets your tone.", icon: "Sparkles" },
      { title: "Services in plain words", text: "What you do, what's included and how long it takes.", icon: "ListChecks" },
      { title: "Team and approach", text: "The people and the process clients will work with.", icon: "Users" },
      { title: "A journal", text: "Articles with categories that show how you think.", icon: "PenLine" },
      { title: "A real brief form", text: "Services, budget, timeline and details in one go.", icon: "ClipboardList" },
    ],
    recommended: "premium",
  },
  {
    slug: "home-services",
    name: "Local Home & Repair Services",
    short: "Home services",
    blurb: "Services, coverage areas and a quote form that rings your phone.",
    intro:
      "When a pipe bursts, people call the first business that looks trustworthy. Your site should load instantly, show where you work and get them to call or request a quote.",
    image: "1676210134188-4c05dd172f89",
    imageAlt: "Plumber repairing a pipe in a wall",
    subtypes: ["Plumbers", "Electricians", "AC repair", "Cleaners", "Pest control", "Painters", "Handymen"],
    needs: [
      { title: "Call and WhatsApp buttons", text: "Always visible on mobile.", icon: "PhoneCall" },
      { title: "Coverage checker", text: "Customers enter a PIN code and get an instant answer.", icon: "MapPinned" },
      { title: "Services and prices", text: "Upfront call-out charges build trust.", icon: "Wrench" },
      { title: "Trust signals", text: "Verified, insured, guaranteed.", icon: "ShieldCheck" },
      { title: "Quote request", text: "Issue, address and a time window.", icon: "FileText" },
      { title: "Loads instantly", text: "Built lightweight for slow connections.", icon: "Zap" },
    ],
    recommended: "starter",
  },
  {
    slug: "clinics",
    name: "Dental Clinics & Healthcare",
    short: "Clinic",
    blurb: "Calm, trustworthy design with online appointments and real time slots.",
    intro:
      "Patients choose a clinic they trust, then want to book without a phone call. Your site should feel reassuring, show your doctors and prices, and let people pick a real time slot in under a minute.",
    image: "1629909613654-28e377c37b09",
    imageAlt: "A bright, modern dental surgery",
    subtypes: ["Dentists", "Clinics", "Physiotherapy", "Dermatology", "Eye care", "Veterinary"],
    needs: [
      { title: "Online appointments", text: "Pick a treatment, a dentist, a date and an open slot.", icon: "CalendarCheck" },
      { title: "Doctor profiles", text: "Qualifications and a friendly face build trust.", icon: "Users" },
      { title: "Treatments and prices", text: "Clear fees reduce anxious phone calls.", icon: "ListChecks" },
      { title: "Insurance, EMI and payment", text: "Answer the money questions up front.", icon: "ShieldCheck" },
      { title: "Location and hours", text: "Parking, accessibility and emergency numbers.", icon: "MapPin" },
      { title: "Calm, fast design", text: "Readable on any phone, accessible to everyone.", icon: "Gauge" },
    ],
    recommended: "business",
  },
  {
    slug: "coaching",
    name: "Coaching Institutes & Training Centers",
    short: "Coaching",
    blurb: "Courses, faculty, results and an admission enquiry parents trust.",
    intro:
      "Parents compare institutes carefully. Your site should make courses, fees, faculty and results easy to find, and turn interest into a counselling session.",
    image: "1509062522246-3755977927d7",
    imageAlt: "Students in a classroom listening to a teacher",
    subtypes: ["Coaching institutes", "Tuition centres", "Language schools", "Coding bootcamps", "Training providers"],
    needs: [
      { title: "Course catalogue", text: "Filter by class, exam and mode.", icon: "BookOpen" },
      { title: "Batch timetable", text: "Upcoming batches and timings at a glance.", icon: "CalendarDays" },
      { title: "Faculty profiles", text: "Build trust with real teachers.", icon: "GraduationCap" },
      { title: "Results section", text: "Toppers and outcomes, presented honestly.", icon: "Trophy" },
      { title: "Admission enquiry", text: "Student and parent details in one form.", icon: "ClipboardList" },
      { title: "Free demo class", text: "A low-commitment first step.", icon: "PlayCircle" },
    ],
    recommended: "business",
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property Developers",
    short: "Real estate",
    blurb: "Listings, floor plans, amenities and site-visit enquiries.",
    intro:
      "Buyers shortlist projects online long before they visit. Your site should answer every question about price, size and possession date, then book the site visit.",
    image: "1545324418-cc1a3fa10c00",
    imageAlt: "Low-angle view of a modern apartment tower",
    subtypes: ["Developers", "Brokers", "Rentals", "Commercial property", "Co-working", "Villas"],
    needs: [
      { title: "Filterable listings", text: "By BHK, budget and status, with sorting.", icon: "Building2" },
      { title: "Drone video hero", text: "Show the location the way buyers want to see it.", icon: "Plane" },
      { title: "3D floor picker", text: "Tap a floor to see the units on it.", icon: "Box" },
      { title: "Floor plans and amenities", text: "Everything buyers compare.", icon: "LayoutPanelTop" },
      { title: "EMI calculator", text: "Help buyers see the monthly cost.", icon: "Calculator" },
      { title: "Site-visit booking", text: "Date, slot and pick-up in one form.", icon: "CalendarCheck" },
    ],
    recommended: "premium",
  },
  {
    slug: "interiors",
    name: "Interior Designers & Architects",
    short: "Interior design",
    blurb: "Big project images, a calm layout and a consultation booking.",
    intro:
      "Clients hire a designer after seeing spaces they wish they lived in. Your site should present projects like a magazine and make the first consultation easy to book.",
    image: "1724582586529-62622e50c0b3",
    imageAlt: "Minimal modern living room with a large sofa",
    subtypes: ["Interior designers", "Architects", "Modular kitchens", "Renovation firms", "Landscape designers"],
    needs: [
      { title: "Project case studies", text: "Before and after, scope, area and location.", icon: "LayoutGrid" },
      { title: "Before/after slider", text: "Drag to reveal the transformation.", icon: "SplitSquareHorizontal" },
      { title: "Your design process", text: "Show clients exactly what happens and when.", icon: "ListOrdered" },
      { title: "Consultation booking", text: "Property type, budget and a preferred slot.", icon: "CalendarClock" },
      { title: "Materials and mood", text: "Swatches that show your taste.", icon: "Palette" },
      { title: "Fast on mobile", text: "Large images, carefully optimised.", icon: "Gauge" },
    ],
    recommended: "business",
  },
  {
    slug: "photographers",
    name: "Photographers & Wedding Businesses",
    short: "Photography",
    blurb: "A portfolio that lets your work speak, with packages and date checks.",
    intro:
      "Couples book the photographer whose work moves them. Your site should feel like flipping through your best album, then make it easy to check a date.",
    image: "1722952934708-749c22eb2e58",
    imageAlt: "Bride and groom in traditional Indian wedding clothes",
    subtypes: ["Wedding photographers", "Videographers", "Planners", "Decorators", "Makeup artists"],
    needs: [
      { title: "Full-screen portfolio", text: "Filterable galleries with a smooth lightbox.", icon: "Images" },
      { title: "A showreel", text: "A cinematic video that plays the moment the site opens.", icon: "Film" },
      { title: "Clear packages", text: "Hours, deliverables and starting prices.", icon: "Package" },
      { title: "Date enquiry form", text: "Event date, venue and package in one form.", icon: "CalendarHeart" },
      { title: "Love notes", text: "Testimonials from couples, displayed beautifully.", icon: "Heart" },
      { title: "Instagram-style grid", text: "Keep the site feeling fresh.", icon: "Grid3x3" },
    ],
    recommended: "premium",
  },
  {
    slug: "fashion",
    name: "Clothing Boutiques & Fashion Brands",
    short: "Fashion",
    blurb: "Lookbooks, new arrivals and a bag that checks out on WhatsApp or card.",
    intro:
      "Fashion sells on feeling. Your site should look like your brand's lookbook, make new arrivals irresistible and let customers order in a few taps.",
    image: "1727430228383-aa1fb59db8bf",
    imageAlt: "Woman in a silk saree and gold jewellery",
    subtypes: ["Boutiques", "Designer labels", "Ethnic wear", "Jewellery", "Accessories", "Footwear"],
    needs: [
      { title: "Video lookbook", text: "A full-screen campaign film.", icon: "Clapperboard" },
      { title: "New arrivals", text: "Filterable products with quick view.", icon: "Sparkles" },
      { title: "Sizes and colours", text: "With a size guide and sold-out states.", icon: "Ruler" },
      { title: "Shopping bag", text: "Checkout on WhatsApp now, cards later.", icon: "ShoppingBag" },
      { title: "Multi-currency", text: "Show prices to overseas customers.", icon: "Globe2" },
      { title: "Brand story", text: "Your craft and your founder's voice.", icon: "PenLine" },
    ],
    recommended: "store",
  },
  {
    slug: "furniture",
    name: "Furniture & Home Decor",
    short: "Furniture",
    blurb: "Collections, room inspiration and quotes, with 3D product views.",
    intro:
      "Furniture is a considered purchase. Your site should let customers explore pieces from every angle, see them in real rooms and ask for a quote without friction.",
    image: "1658211312038-4293c7bdd37e",
    imageAlt: "Wooden lounge chair with a cane seat",
    subtypes: ["Furniture makers", "Showrooms", "Home decor", "Lighting", "Mattresses", "Custom carpentry"],
    needs: [
      { title: "3D product viewer", text: "Rotate the piece and change the finish live.", icon: "Rotate3d" },
      { title: "Collections", text: "Living, dining, bedroom, office and decor.", icon: "Sofa" },
      { title: "Shop the room", text: "Hotspots on room photos that link to products.", icon: "ScanSearch" },
      { title: "Quote list", text: "Customers collect items and request one quote.", icon: "ListChecks" },
      { title: "Downloadable catalogue", text: "A PDF for trade buyers.", icon: "FileDown" },
      { title: "Showroom visit", text: "Address, map and opening hours.", icon: "Store" },
    ],
    recommended: "store",
  },
  {
    slug: "manufacturing",
    name: "Manufacturers, Distributors & B2B Suppliers",
    short: "Manufacturing",
    blurb: "A credible company profile, product catalogue and bulk enquiries.",
    intro:
      "B2B buyers check your website before they reply to your email. It should prove you're capable, show your catalogue with specs, and make bulk enquiries effortless.",
    image: "1717386255773-1e3037c81788",
    imageAlt: "Large industrial machine on a factory floor",
    subtypes: ["Manufacturers", "Exporters", "Distributors", "Wholesalers", "Industrial suppliers"],
    needs: [
      { title: "Searchable catalogue", text: "Part numbers, grades, sizes and MOQ.", icon: "Search" },
      { title: "3D part viewer", text: "Rotate parts and see an exploded view.", icon: "Cog" },
      { title: "Capabilities", text: "Machines, processes and capacity.", icon: "Factory" },
      { title: "Certifications", text: "Quality systems presented clearly.", icon: "BadgeCheck" },
      { title: "Bulk enquiry form", text: "Quantities, destination and timelines.", icon: "PackageSearch" },
      { title: "Export ready", text: "Incoterms, metric and imperial sizes.", icon: "Globe" },
    ],
    recommended: "business",
  },
  {
    slug: "personal-brands",
    name: "Personal Portfolios & Creators",
    short: "Portfolio",
    blurb: "A bold portfolio with 3D, motion and personality that gets you hired.",
    intro:
      "Clients and recruiters remember the portfolio that surprised them. Yours should feel like your work: bold, interactive and unmistakably you, while still making it easy to see projects and get in touch.",
    image: "/previews/portfolio.jpg",
    imageAlt: "A futuristic 3D portfolio website",
    subtypes: ["Developers", "Designers", "Photographers", "Creators", "Consultants", "Speakers"],
    needs: [
      { title: "A 3D first impression", text: "Interactive objects that react to the cursor.", icon: "Box" },
      { title: "Case studies", text: "Projects with the problem, process and result.", icon: "LayoutGrid" },
      { title: "Creative transitions", text: "Motion that feels crafted, never slow.", icon: "Sparkles" },
      { title: "Skills and timeline", text: "What you do and where you've done it.", icon: "ListOrdered" },
      { title: "Contact that converts", text: "A short form and links that work.", icon: "MessageCircle" },
      { title: "Fast despite the 3D", text: "Loads the heavy parts only when needed.", icon: "Zap" },
    ],
    recommended: "premium",
  },
  {
    slug: "beverages",
    name: "Drinks, FMCG & Product Brands",
    short: "Product brand",
    blurb: "Loud, playful launch sites with 3D packshots and flavour stories.",
    intro:
      "A product brand lives or dies on shelf appeal. Online, that means a 3D packshot people can spin, flavours with real personality, and a clear route to buy or stock it.",
    image: "/previews/energy-drink.jpg",
    imageAlt: "A colourful energy drink brand website",
    subtypes: ["Beverages", "Snacks", "Personal care", "Supplements", "D2C brands", "Distributors"],
    needs: [
      { title: "3D packshots", text: "Rotate the can, bottle or box in the browser.", icon: "Rotate3d" },
      { title: "Flavour stories", text: "Each variant gets its own colours and mood.", icon: "Palette" },
      { title: "Animated hero", text: "Floating ingredients and bold motion.", icon: "Sparkles" },
      { title: "Buy or stock it", text: "Order packs, or retailer and distributor enquiries.", icon: "ShoppingBag" },
      { title: "Nutrition facts", text: "Ingredients and labels, clearly laid out.", icon: "ClipboardList" },
      { title: "Launch-ready", text: "Countdowns, drops and newsletter sign-ups.", icon: "Zap" },
    ],
    recommended: "premium",
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
