export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  veg: boolean;
  spice: 0 | 1 | 2 | 3;
  cat: string;
  img?: string;
  badge?: "Popular" | "Chef's pick" | "New";
};

export const menuCats = ["Starters", "Grills", "Curries", "Breads & Rice", "Desserts", "Drinks"] as const;

export const menu: MenuItem[] = [
  { id: "s1", cat: "Starters", name: "Amritsari fish pakora", desc: "Carom-spiced batter, mint chutney, pickled onion", price: 329, veg: false, spice: 1 , img: "1666001120694-3ebe8fd207be" },
  { id: "s2", cat: "Starters", name: "Dahi puri", desc: "Crisp shells, spiced potato, sweet yoghurt, tamarind", price: 179, veg: true, spice: 1 , img: "1760263051323-fcd7da7040b0" },
  { id: "s3", cat: "Starters", name: "Paneer tikka", desc: "Charred cottage cheese, peppers, smoked chilli", price: 299, veg: true, spice: 2 , img: "1631452180519-c014fe946bc7", badge: "Popular" },
  { id: "s4", cat: "Starters", name: "Chicken 65", desc: "Curry-leaf fried chicken, garlic, red chilli", price: 319, veg: false, spice: 3 , img: "1610057099431-d73a1c9d2f2f" },
  { id: "g1", cat: "Grills", name: "Lamb seekh kebab", desc: "Hand-minced lamb, ginger, green chilli, charcoal grilled", price: 449, veg: false, spice: 2 , img: "1599487488170-d11ec9c172f0", badge: "Chef's pick" },
  { id: "g2", cat: "Grills", name: "Tandoori chicken", desc: "Half bird, 24-hour yoghurt marinade, lime", price: 399, veg: false, spice: 2 , img: "1617692855027-33b14f061079", badge: "Popular" },
  { id: "g3", cat: "Grills", name: "Malai broccoli", desc: "Cream cheese, cardamom, toasted almonds", price: 329, veg: true, spice: 0 , img: "1585937421612-70a008356fbe" },
  { id: "g4", cat: "Grills", name: "Tiger prawns", desc: "Kashmiri chilli, garlic butter, ajwain", price: 649, veg: false, spice: 2 , img: "1565557623262-b51c2513a641" },
  { id: "c1", cat: "Curries", name: "Butter chicken", desc: "Smoked tomato, fenugreek, cultured butter", price: 429, veg: false, spice: 1 , img: "1603894584373-5ac82b2ae398", badge: "Popular" },
  { id: "c2", cat: "Curries", name: "Dal makhani", desc: "Black lentils slow-cooked overnight on the tandoor", price: 299, veg: true, spice: 1 , img: "1596797038530-2c107229654b" },
  { id: "c3", cat: "Curries", name: "Goan prawn curry", desc: "Coconut, kokum, Goan red masala", price: 549, veg: false, spice: 2 , img: "1631452180539-96aca7d48617" },
  { id: "c4", cat: "Curries", name: "Laal maas", desc: "Rajasthani lamb, mathania chilli, smoked ghee", price: 499, veg: false, spice: 3 , img: "1585937421612-70a008356fbe", badge: "Chef's pick" },
  { id: "c5", cat: "Curries", name: "Palak paneer", desc: "Spinach, garlic, house-made paneer", price: 329, veg: true, spice: 1 , img: "1728910156510-77488f19b152", badge: "New" },
  { id: "b1", cat: "Breads & Rice", name: "Garlic naan", desc: "Tandoor-baked, brushed with garlic butter", price: 69, veg: true, spice: 0 , img: "1655979284091-eea0e93405ee", badge: "Popular" },
  { id: "b2", cat: "Breads & Rice", name: "Lachha paratha", desc: "Flaky layered wholewheat bread", price: 79, veg: true, spice: 0 , img: "1655979284091-eea0e93405ee" },
  { id: "b3", cat: "Breads & Rice", name: "Hyderabadi chicken biryani", desc: "Dum-cooked basmati, saffron, raita", price: 429, veg: false, spice: 2 , img: "1631515243349-e0cb75fb8d3a", badge: "Chef's pick" },
  { id: "b4", cat: "Breads & Rice", name: "Jeera rice", desc: "Basmati with toasted cumin", price: 149, veg: true, spice: 0 , img: "1589302168068-964664d93dc0" },
  { id: "d1", cat: "Desserts", name: "Gulab jamun", desc: "Warm, with pistachio and rose", price: 129, veg: true, spice: 0 , img: "1666190092159-3171cf0fbb12" },
  { id: "d2", cat: "Desserts", name: "Mango kulfi", desc: "Alphonso mango, slow-reduced milk", price: 149, veg: true, spice: 0 , img: "1728910156510-77488f19b152" },
  { id: "k1", cat: "Drinks", name: "Salted lassi", desc: "Roasted cumin, mint", price: 99, veg: true, spice: 0 , img: "1738986589529-4e64555b399a" },
  { id: "k2", cat: "Drinks", name: "Masala chai", desc: "Assam, ginger, cardamom", price: 49, veg: true, spice: 0 , img: "1630748662359-40a2105640c7" },
  { id: "k3", cat: "Drinks", name: "Tamarind smash", desc: "Tamarind, lime, soda, chaat masala (alcohol-free)", price: 149, veg: true, spice: 0 , img: "1514362545857-3bc16c4c7d1b", badge: "New" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Opening hours in Indian time (Asia/Kolkata); index = day of week (0 = Sunday)
export const hours: { day: string; open: string; close: string }[] = [
  { day: "Sunday", open: "12:00", close: "22:00" },
  { day: "Monday", open: "17:00", close: "23:00" },
  { day: "Tuesday", open: "17:00", close: "23:00" },
  { day: "Wednesday", open: "17:00", close: "23:00" },
  { day: "Thursday", open: "12:00", close: "23:00" },
  { day: "Friday", open: "12:00", close: "23:30" },
  { day: "Saturday", open: "12:00", close: "23:30" },
];

export const gallery = [
  { id: "1728910156510-77488f19b152", alt: "A table full of curries, breads and rice" },
  { id: "1565557623262-b51c2513a641", alt: "Lamb curry with naan" },
  { id: "1631515243349-e0cb75fb8d3a", alt: "Chicken biryani with raita" },
  { id: "1603894584373-5ac82b2ae398", alt: "Butter chicken in a copper pot" },
  { id: "1709548145082-04d0cde481d4", alt: "The dining room at night" },
  { id: "1655979284091-eea0e93405ee", alt: "Fresh naan from the tandoor" },
  { id: "1596797038530-2c107229654b", alt: "Curry simmering in a black pot" },
  { id: "1514362545857-3bc16c4c7d1b", alt: "Tamarind smash cocktail" },
  { id: "1577219491135-ce391730fb2c", alt: "Chef plating under copper lamps" },
];

export const reviews = [
  { name: "Priya S.", text: "The laal maas is the best I've had outside Jaipur, right here in Vijay Nagar. Ordered on WhatsApp and it arrived in 25 minutes, still smoking hot.", stars: 5 },
  { name: "Rohit M.", text: "Proper charcoal flavour on the seekh kebabs. The dining room is gorgeous at night. We've booked again for my birthday.", stars: 5 },
  { name: "Aisha K.", text: "Dal makhani that tastes like it's been cooking all day, because it has. Friendly staff and great alcohol-free drinks.", stars: 5 },
  { name: "Megha J.", text: "Came for the butter chicken, stayed for the gulab jamun. Booking online took ten seconds.", stars: 4 },
];

/** Dishes on the 3D thali; tapping a bowl adds its dish to the order. */
export const thali = [
  { id: "c1", label: "Butter chicken", color: "#E8662A", tex: "1603894584373-5ac82b2ae398" },
  { id: "c2", label: "Dal makhani", color: "#7A3B1E", tex: "1596797038530-2c107229654b" },
  { id: "c5", label: "Palak paneer", color: "#3F7A2C", tex: "1631452180519-c014fe946bc7" },
  { id: "c3", label: "Goan prawn curry", color: "#F2A33A", tex: "1631452180539-96aca7d48617" },
  { id: "d2", label: "Mango kulfi", color: "#FFC93C", tex: "1666190092159-3171cf0fbb12" },
];
