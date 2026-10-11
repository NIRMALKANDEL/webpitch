export type RoomStyle = "japandi" | "industrial" | "coastal";
export type RoomItem = "rug" | "sofa" | "table" | "armchair" | "lamp" | "plant" | "art" | "shelf";

export const ROOM_STYLES: { id: RoomStyle; name: string; note: string; swatch: [string, string, string] }[] = [
  { id: "japandi", name: "Japandi", note: "Warm oak, linen and olive", swatch: ["#ebe5da", "#c9a47c", "#5b6b3a"] },
  { id: "industrial", name: "Industrial", note: "Concrete, leather and rust", swatch: ["#77726b", "#5b4231", "#c2703d"] },
  { id: "coastal", name: "Coastal", note: "Whitewash, sand and sea blue", swatch: ["#e8f0f2", "#e2d4bb", "#3d7ea6"] },
];

/** In the order they flow into the room. */
export const ROOM_ITEMS: { id: RoomItem; name: string }[] = [
  { id: "rug", name: "Wool rug" },
  { id: "sofa", name: "Three-seat sofa" },
  { id: "table", name: "Round coffee table" },
  { id: "armchair", name: "Lounge chair" },
  { id: "lamp", name: "Floor lamp" },
  { id: "shelf", name: "Wall shelves" },
  { id: "art", name: "Artwork" },
  { id: "plant", name: "Fiddle-leaf fig" },
];
