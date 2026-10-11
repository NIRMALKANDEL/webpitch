export type Unit = { id: string; project: string; bhk: 2 | 3 | 4; sqft: number; floor: number; price: number; facing: string; status: "Ready" | "Under construction" };

export const units: Unit[] = [
  { id: "HR-0402", project: "Harbourline Residences", bhk: 2, sqft: 1180, floor: 4, price: 8900000, facing: "Garden", status: "Ready" },
  { id: "HR-0703", project: "Harbourline Residences", bhk: 3, sqft: 1640, floor: 7, price: 12900000, facing: "Backwaters", status: "Ready" },
  { id: "HR-1101", project: "Harbourline Residences", bhk: 3, sqft: 1710, floor: 11, price: 14200000, facing: "Backwaters", status: "Ready" },
  { id: "HR-1404", project: "Harbourline Residences", bhk: 4, sqft: 2380, floor: 14, price: 21500000, facing: "Sea", status: "Ready" },
  { id: "MH-0301", project: "Marina Heights", bhk: 2, sqft: 1095, floor: 3, price: 7400000, facing: "City", status: "Under construction" },
  { id: "MH-0904", project: "Marina Heights", bhk: 3, sqft: 1580, floor: 9, price: 11600000, facing: "Marina", status: "Under construction" },
  { id: "MH-1202", project: "Marina Heights", bhk: 2, sqft: 1150, floor: 12, price: 9100000, facing: "Marina", status: "Under construction" },
  { id: "MH-1603", project: "Marina Heights", bhk: 4, sqft: 2450, floor: 16, price: 23800000, facing: "Sea", status: "Under construction" },
];

export const FLOORS = 16;
export const inr = (n: number) => (n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : `₹${(n / 100000).toFixed(0)} L`);

export const amenities = [
  "Infinity pool", "Gym & yoga deck", "Clubhouse", "Kids' play area", "EV charging", "24×7 security", "Jogging track", "Co-working lounge",
];

export const gallery: Record<string, { id: string; alt: string }[]> = {
  Exterior: [
    { id: "1545324418-cc1a3fa10c00", alt: "Tower facade against the sky" },
    { id: "1624204386084-dd8c05e32226", alt: "Balconies at dusk" },
    { id: "1460317442991-0ec209397118", alt: "Low-angle view of the building" },
  ],
  Interiors: [
    { id: "1738168246881-40f35f8aba0a", alt: "Living room with a green sofa" },
    { id: "1680416124510-5eae1beca412", alt: "Open-plan living and dining" },
    { id: "1715985160053-d339e8b6eb94", alt: "Modular kitchen" },
  ],
  Amenities: [
    { id: "1578058997959-66ffdee9f807", alt: "Rooftop infinity pool at sunset" },
    { id: "1593079831268-3381b0db4a77", alt: "Residents' gym" },
  ],
  "Construction progress": [
    { id: "1515263487990-61b07816b324", alt: "Marina Heights structure, level 14" },
  ],
};
