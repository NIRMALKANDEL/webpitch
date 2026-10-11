export type Service = { id: string; name: string; mins: number; price: number };
export const services: Record<string, Service[]> = {
  Hair: [
    { id: "h1", name: "Cut & blow-dry", mins: 60, price: 1800 },
    { id: "h2", name: "Global colour", mins: 120, price: 4500 },
    { id: "h3", name: "Balayage", mins: 180, price: 7500 },
    { id: "h4", name: "Keratin smoothing", mins: 150, price: 6500 },
  ],
  Skin: [
    { id: "s1", name: "Hydrating facial", mins: 60, price: 2800 },
    { id: "s2", name: "Vitamin C glow facial", mins: 75, price: 3500 },
    { id: "s3", name: "De-tan & polish", mins: 45, price: 1600 },
  ],
  Nails: [
    { id: "n1", name: "Gel manicure", mins: 45, price: 1400 },
    { id: "n2", name: "Spa pedicure", mins: 60, price: 1800 },
    { id: "n3", name: "Nail art (per set)", mins: 30, price: 900 },
  ],
  Spa: [
    { id: "p1", name: "Balinese massage", mins: 60, price: 3200 },
    { id: "p2", name: "Hot stone therapy", mins: 90, price: 4200 },
  ],
  Bridal: [
    { id: "b1", name: "Bridal trial", mins: 120, price: 6000 },
    { id: "b2", name: "Bridal makeup & hair", mins: 180, price: 22000 },
  ],
};
export const all = Object.values(services).flat();
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const team = [
  { name: "Riya Kapoor", role: "Creative director, colour", years: 12, img: "1580618672591-eb180b1a973f" },
  { name: "Arjun Mehta", role: "Senior stylist, cuts", years: 8, img: "1634449571010-02389ed0f9b0" },
  { name: "Sneha Iyer", role: "Skin therapist", years: 6, img: "1570172619644-dfd03ed5d881" },
  { name: "Fatima Shaikh", role: "Nail artist", years: 5, img: "1632345031435-8727f6897d53" },
];


