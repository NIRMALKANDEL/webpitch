import type { Flavour } from "@/components/three/CanScene";

export const flavours: (Flavour & { blurb: string; notes: string[]; bg: string })[] = [
  {
    id: "mango", name: "Mango Chili Blast", tag: "Sweet heat", c1: "#FF8A00", c2: "#FF2E63", ink: "#2B0A3D", bg: "#FFB020",
    blurb: "Alphonso mango meets a kick of Kashmiri chili. Tastes like summer, hits like a power cut ending.",
    notes: ["Alphonso mango", "Kashmiri chili", "Lime zest"],
    bits: [{ color: "#FFB000", shape: "slice" }, { color: "#E11D48", shape: "chili" }, { color: "#e0f7ff", shape: "ice" }],
  },
  {
    id: "kokum", name: "Kokum Berry Riot", tag: "Tangy & wild", c1: "#7C3AED", c2: "#EC4899", ink: "#FFE600", bg: "#8B5CF6",
    blurb: "Konkan kokum, blackcurrant and a pinch of black salt. Purple, sour, unstoppable.",
    notes: ["Kokum", "Blackcurrant", "Black salt"],
    bits: [{ color: "#6D28D9", shape: "berry" }, { color: "#DB2777", shape: "berry" }, { color: "#e0f7ff", shape: "ice" }],
  },
  {
    id: "mint", name: "Lemon Mint Zap", tag: "Ice cold", c1: "#00C2A8", c2: "#C6F432", ink: "#0B3B2E", bg: "#22D3B4",
    blurb: "Nimbu, fresh pudina and a cooling finish. The one you reach for at 3 pm.",
    notes: ["Lemon", "Fresh mint", "Sea salt"],
    bits: [{ color: "#FDE047", shape: "slice" }, { color: "#16A34A", shape: "leaf" }, { color: "#e0f7ff", shape: "ice" }],
  },
];

export const packs = [
  { id: "p6", name: "Starter 6-pack", price: 594 },
  { id: "p12", name: "Party 12-pack", price: 1099 },
  { id: "p24", name: "Fuel 24-pack", price: 1999 },
];
