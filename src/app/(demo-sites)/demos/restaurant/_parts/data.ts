export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  veg: boolean;
  spice: 0 | 1 | 2 | 3;
  cat: string;
};

export const menuCats = ["Starters", "Grills", "Curries", "Breads & Rice", "Desserts", "Drinks"] as const;

export const menu: MenuItem[] = [
  { id: "s1", cat: "Starters", name: "Amritsari fish pakora", desc: "Carom-spiced batter, mint chutney, pickled onion", price: 8.5, veg: false, spice: 1 },
  { id: "s2", cat: "Starters", name: "Dahi puri", desc: "Crisp shells, spiced potato, sweet yoghurt, tamarind", price: 6.5, veg: true, spice: 1 },
  { id: "s3", cat: "Starters", name: "Paneer tikka", desc: "Charred cottage cheese, peppers, smoked chilli", price: 8, veg: true, spice: 2 },
  { id: "s4", cat: "Starters", name: "Chicken 65", desc: "Curry-leaf fried chicken, garlic, red chilli", price: 8.5, veg: false, spice: 3 },
  { id: "g1", cat: "Grills", name: "Lamb seekh kebab", desc: "Hand-minced lamb, ginger, green chilli, charcoal grilled", price: 14, veg: false, spice: 2 },
  { id: "g2", cat: "Grills", name: "Tandoori chicken", desc: "Half bird, 24-hour yoghurt marinade, lime", price: 15.5, veg: false, spice: 2 },
  { id: "g3", cat: "Grills", name: "Malai broccoli", desc: "Cream cheese, cardamom, toasted almonds", price: 11, veg: true, spice: 0 },
  { id: "g4", cat: "Grills", name: "Tiger prawns", desc: "Kashmiri chilli, garlic butter, ajwain", price: 18, veg: false, spice: 2 },
  { id: "c1", cat: "Curries", name: "Butter chicken", desc: "Smoked tomato, fenugreek, cultured butter", price: 15, veg: false, spice: 1 },
  { id: "c2", cat: "Curries", name: "Dal makhani", desc: "Black lentils slow-cooked overnight on the tandoor", price: 11, veg: true, spice: 1 },
  { id: "c3", cat: "Curries", name: "Goan prawn curry", desc: "Coconut, kokum, Goan red masala", price: 17, veg: false, spice: 2 },
  { id: "c4", cat: "Curries", name: "Laal maas", desc: "Rajasthani lamb, mathania chilli, smoked ghee", price: 17.5, veg: false, spice: 3 },
  { id: "c5", cat: "Curries", name: "Palak paneer", desc: "Spinach, garlic, house-made paneer", price: 12.5, veg: true, spice: 1 },
  { id: "b1", cat: "Breads & Rice", name: "Garlic naan", desc: "Tandoor-baked, brushed with garlic butter", price: 4, veg: true, spice: 0 },
  { id: "b2", cat: "Breads & Rice", name: "Lachha paratha", desc: "Flaky layered wholewheat bread", price: 4.5, veg: true, spice: 0 },
  { id: "b3", cat: "Breads & Rice", name: "Hyderabadi chicken biryani", desc: "Dum-cooked basmati, saffron, raita", price: 16, veg: false, spice: 2 },
  { id: "b4", cat: "Breads & Rice", name: "Jeera rice", desc: "Basmati with toasted cumin", price: 4, veg: true, spice: 0 },
  { id: "d1", cat: "Desserts", name: "Gulab jamun", desc: "Warm, with pistachio and rose", price: 6, veg: true, spice: 0 },
  { id: "d2", cat: "Desserts", name: "Mango kulfi", desc: "Alphonso mango, slow-reduced milk", price: 6.5, veg: true, spice: 0 },
  { id: "k1", cat: "Drinks", name: "Salted lassi", desc: "Roasted cumin, mint", price: 4.5, veg: true, spice: 0 },
  { id: "k2", cat: "Drinks", name: "Masala chai", desc: "Assam, ginger, cardamom", price: 3.5, veg: true, spice: 0 },
  { id: "k3", cat: "Drinks", name: "Tamarind smash", desc: "Tamarind, lime, soda, chaat masala (alcohol-free)", price: 6, veg: true, spice: 0 },
];

export const gbp = (n: number) => `£${n.toFixed(2).replace(/\.00$/, "")}`;

// Opening hours in Europe/London time; index = day of week (0 = Sunday)
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
  { name: "Priya S.", text: "The laal maas is the best I've had outside Jaipur. Ordered on WhatsApp and it arrived in 25 minutes, still smoking hot.", stars: 5 },
  { name: "Tom H.", text: "Proper charcoal flavour on the seekh kebabs. The dining room is gorgeous at night. We've booked again for my birthday.", stars: 5 },
  { name: "Aisha K.", text: "Dal makhani that tastes like it's been cooking all day, because it has. Friendly staff and great alcohol-free drinks.", stars: 5 },
  { name: "Marcus L.", text: "Came for the butter chicken, stayed for the gulab jamun. Booking online took ten seconds.", stars: 4 },
];
