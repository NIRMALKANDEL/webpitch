export const treatments = [
  { id: "checkup", name: "Check-up & clean", mins: 45, fee: "₹800", note: "Exam, scale & polish, two X-rays" },
  { id: "whitening", name: "Teeth whitening", mins: 90, fee: "₹7,500", note: "In-chair whitening + take-home trays" },
  { id: "filling", name: "Tooth-coloured filling", mins: 45, fee: "from ₹1,200", note: "Per tooth, composite resin" },
  { id: "invisalign", name: "Clear aligner consult", mins: 30, fee: "Free", note: "3D scan and treatment plan" },
  { id: "implant", name: "Implant consultation", mins: 30, fee: "₹500", note: "Credited if you go ahead" },
  { id: "emergency", name: "Emergency appointment", mins: 30, fee: "₹700", note: "Same-day pain relief" },
];

export const dentists = [
  { id: "sharma", name: "Dr. Ananya Sharma", role: "Principal dentist", quals: "BDS, MDS (Prosthodontics), 14 years", focus: "Implants & cosmetic", img: "1673865641073-4479f93a7776", days: [1, 2, 3, 4, 5] },
  { id: "patel", name: "Dr. Rohan Patel", role: "General dentist", quals: "BDS, 9 years", focus: "Family & nervous patients", img: "1758691463582-11aea602cd4a", days: [1, 3, 5, 6] },
  { id: "iyer", name: "Dr. Kavya Iyer", role: "Orthodontist", quals: "BDS, MDS (Orthodontics), 11 years", focus: "Clear aligners & braces", img: "1622253692010-333f2da6031d", days: [2, 4, 6] },
  { id: "khan", name: "Dr. Yusuf Khan", role: "General dentist", quals: "BDS, 6 years", focus: "Emergency & restorative", img: "1612531385446-f7e6d131e1d0", days: [1, 2, 3, 4, 5, 6] },
];

export const SLOTS = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

/** Deterministic "already booked" pattern, so availability looks realistic and stays stable. */
export function isBooked(dateKey: string, dentist: string, slot: string) {
  let h = 2166136261;
  for (const c of `${dateKey}|${dentist}|${slot}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) % 100 < 42;
}
