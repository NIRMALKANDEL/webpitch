import type { videos } from "@/lib/media";

export type FeatureCategory = "wow" | "selling" | "booking" | "trust";

export type Feature = {
  id: string;
  title: string;
  benefit: string;
  category: FeatureCategory;
  demo: string;
  /** anchor inside the demo, so "Try it live" lands on the feature */
  anchor?: string;
  pkg: string;
  media:
    | { kind: "video"; video: keyof typeof videos }
    | { kind: "image"; image: string }
    | { kind: "live3d"; scene: "chair" | "bolt" };
};

export const featureCategories: { id: FeatureCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wow", label: "Visual wow" },
  { id: "selling", label: "Selling" },
  { id: "booking", label: "Booking & enquiries" },
  { id: "trust", label: "Trust & local" },
];

export const features: Feature[] = [
  {
    id: "3d-configurator",
    title: "3D product configurator",
    benefit: "Customers spin the chair and change the wood before they call you.",
    category: "wow",
    demo: "furniture",
    anchor: "configurator",
    pkg: "Add-on",
    media: { kind: "live3d", scene: "chair" },
  },
  {
    id: "3d-part",
    title: "3D part viewer with exploded view",
    benefit: "Buyers inspect every component of your product from any angle.",
    category: "wow",
    demo: "manufacturer",
    anchor: "viewer",
    pkg: "Add-on",
    media: { kind: "live3d", scene: "bolt" },
  },
  {
    id: "video-hero",
    title: "4K cinematic video hero",
    benefit: "The first three seconds feel like walking into your restaurant.",
    category: "wow",
    demo: "restaurant",
    pkg: "Premium & Store",
    media: { kind: "video", video: "tandoor" },
  },
  {
    id: "drone-hero",
    title: "Drone flyover video",
    benefit: "Show the location and skyline the way buyers want to see it.",
    category: "wow",
    demo: "real-estate",
    pkg: "Premium & Store",
    media: { kind: "video", video: "coastalSkyline" },
  },
  {
    id: "floor-picker",
    title: "3D building floor picker",
    benefit: "Tap a floor and see exactly which flats are still available.",
    category: "wow",
    demo: "real-estate",
    anchor: "floors",
    pkg: "Add-on",
    media: { kind: "video", video: "housingComplex" },
  },
  {
    id: "showreel",
    title: "Wedding showreel",
    benefit: "Couples feel your style before they see a single price.",
    category: "wow",
    demo: "photography",
    pkg: "Premium",
    media: { kind: "video", video: "weddingRitual" },
  },
  {
    id: "lookbook",
    title: "Scroll-driven lookbook",
    benefit: "A collection that moves sideways as you scroll, like flipping a magazine.",
    category: "wow",
    demo: "fashion",
    anchor: "lookbook",
    pkg: "Premium",
    media: { kind: "video", video: "sareeOutdoors" },
  },
  {
    id: "workshop-film",
    title: "Craft film background",
    benefit: "Show the hands and the process behind what you sell.",
    category: "wow",
    demo: "furniture",
    anchor: "craft",
    pkg: "Premium & Store",
    media: { kind: "video", video: "woodShaving" },
  },
  {
    id: "wa-cart",
    title: "WhatsApp ordering cart",
    benefit: "Customers build an order and send it to your phone in one tap.",
    category: "selling",
    demo: "restaurant",
    anchor: "menu",
    pkg: "Starter+",
    media: { kind: "image", image: "1728910156510-77488f19b152" },
  },
  {
    id: "bag",
    title: "Shopping bag with quick view",
    benefit: "Sizes, colours and a bag that checks out on WhatsApp or card.",
    category: "selling",
    demo: "fashion",
    anchor: "new",
    pkg: "Store",
    media: { kind: "image", image: "1679006831648-7c9ea12e5807" },
  },
  {
    id: "catalogue",
    title: "Searchable spec catalogue",
    benefit: "Part numbers, grades and MOQs that buyers can filter in seconds.",
    category: "selling",
    demo: "manufacturer",
    anchor: "catalogue",
    pkg: "Business+",
    media: { kind: "image", image: "1607733067403-a0396fa4d3d0" },
  },
  {
    id: "booking",
    title: "3-step booking with live total",
    benefit: "Service, stylist and time in three taps, with the price adding up.",
    category: "booking",
    demo: "salon",
    anchor: "services",
    pkg: "Business+",
    media: { kind: "image", image: "1580618672591-eb180b1a973f" },
  },
  {
    id: "before-after",
    title: "Before/after slider",
    benefit: "Drag to reveal the transformation you delivered.",
    category: "booking",
    demo: "interior",
    anchor: "projects",
    pkg: "Business+",
    media: { kind: "image", image: "1664711942326-2c3351e215e6" },
  },
  {
    id: "emi",
    title: "EMI calculator",
    benefit: "Buyers see their monthly cost and book a site visit straight away.",
    category: "booking",
    demo: "real-estate",
    anchor: "emi",
    pkg: "Premium",
    media: { kind: "image", image: "1738168246881-40f35f8aba0a" },
  },
  {
    id: "coverage",
    title: "Postal code coverage checker",
    benefit: "Customers know instantly whether you serve their street.",
    category: "trust",
    demo: "home-services",
    pkg: "Starter+",
    media: { kind: "image", image: "1603466182843-75f713ba06b3" },
  },
  {
    id: "timetable",
    title: "Course filters and batch timetable",
    benefit: "Parents find the right course and batch without calling.",
    category: "trust",
    demo: "coaching",
    anchor: "courses",
    pkg: "Business+",
    media: { kind: "image", image: "1509062522246-3755977927d7" },
  },
];
