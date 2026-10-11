export const WOODS = {
  walnut: { label: "American walnut", color: "#5a3820" },
  oak: { label: "White oak", color: "#b48a5a" },
  maple: { label: "Hard maple", color: "#d8bb8e" },
} as const;

export const FABRICS = {
  linen: { label: "Natural linen", color: "#d9d2c5" },
  sage: { label: "Sage wool", color: "#8e9c78" },
  charcoal: { label: "Charcoal boucle", color: "#3b3a38" },
  ochre: { label: "Ochre velvet", color: "#b8862f" },
} as const;

export type Wood = keyof typeof WOODS;
export type Fabric = keyof typeof FABRICS;

export type PartId = "bolt" | "washer" | "nut";

export const PARTS: Record<PartId, { name: string; spec: string }> = {
  bolt: { name: "Hex bolt FL-HB-M16", spec: "M16 × 80 mm · Grade 8.8 · ISO 4014 · Zinc flake" },
  washer: { name: "Plain washer FL-PW-16", spec: "Ø17 × Ø30 × 3 mm · 200 HV · ISO 7089" },
  nut: { name: "Hex nut FL-HN-M16", spec: "M16 · Class 8 · ISO 4032 · Zinc flake" },
};

