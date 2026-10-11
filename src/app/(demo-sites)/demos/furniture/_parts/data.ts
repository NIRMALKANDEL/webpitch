export type Product = { id: string; name: string; col: string; wood: "Walnut" | "Oak" | "Maple"; price: number; dims: [number, number, number]; img: string; img2: string };

export const products: Product[] = [
  { id: "p1", name: "Hollis lounge chair", col: "Living", wood: "Walnut", price: 1290, dims: [30, 33, 31], img: "1658211312038-4293c7bdd37e", img2: "1617364852223-75f57e78dc96" },
  { id: "p2", name: "Ada armchair", col: "Living", wood: "Oak", price: 980, dims: [28, 30, 32], img: "1723804685588-b8e95b2044f3", img2: "1763279934323-edb3735f6a6e" },
  { id: "p3", name: "Pecan three-seat sofa", col: "Living", wood: "Oak", price: 2450, dims: [84, 36, 33], img: "1759722665629-29df6ee4f9a5", img2: "1590251024078-8a6d9f90b02d" },
  { id: "p4", name: "Harvest dining table", col: "Dining", wood: "Oak", price: 2100, dims: [84, 38, 30], img: "1636138388621-258a72ecb07e", img2: "1758977403865-f79e156415b3" },
  { id: "p5", name: "Mesa dining set", col: "Dining", wood: "Walnut", price: 3200, dims: [72, 36, 30], img: "1758977403865-f79e156415b3", img2: "1636138388621-258a72ecb07e" },
  { id: "p6", name: "Linden platform bed", col: "Bedroom", wood: "Maple", price: 1850, dims: [64, 86, 14], img: "1688384452844-8364c3e2fc28", img2: "1633944095397-878622ebc01c" },
  { id: "p7", name: "Juniper writing desk", col: "Office", wood: "Oak", price: 890, dims: [48, 24, 30], img: "1611269154421-4e27233ac5c7", img2: "1519219788971-8d9797e0928e" },
  { id: "p8", name: "Studio side table", col: "Living", wood: "Walnut", price: 340, dims: [18, 18, 22], img: "1597960194599-22929afc25b1", img2: "1547062200-f195b1c77e30" },
  { id: "p9", name: "Clay vase set", col: "Decor", wood: "Maple", price: 120, dims: [8, 8, 14], img: "1631125915902-d8abe9225ff2", img2: "1597696929736-6d13bed8e6a8" },
  { id: "p10", name: "Ivory floor vase", col: "Decor", wood: "Maple", price: 95, dims: [10, 10, 18], img: "1612196808214-b8e1d6145a8c", img2: "1660721671073-e139688fa3cf" },
];

export const collections = [
  { name: "Living", img: "1590251024078-8a6d9f90b02d" },
  { name: "Dining", img: "1636138388621-258a72ecb07e" },
  { name: "Bedroom", img: "1688384452844-8364c3e2fc28" },
  { name: "Office", img: "1611269154421-4e27233ac5c7" },
  { name: "Decor", img: "1597696929736-6d13bed8e6a8" },
];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
