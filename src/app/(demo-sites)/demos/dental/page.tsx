import { Accessibility, Car, Clock, HeartHandshake, Mail, MapPin, Phone, ShieldCheck, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { DemoDisclaimer, SampleTag } from "@/components/shared/DemoShell";
import { FAQ } from "@/components/site/FAQ";
import { unsplash } from "@/lib/media";
import { dentists, treatments } from "./_parts/data";
import { BookFor, Scheduler } from "./_parts/Scheduler";

const w = "mx-auto max-w-7xl px-4 md:px-8";
const h2 = "font-dd text-4xl leading-tight md:text-6xl";
const faq = [
  { q: "Do you accept insurance or EMI?", a: "Yes. We help with cashless claims for most health insurers, and treatments over ₹10,000 can be paid in no-cost EMIs. UPI, cards and cash are all accepted." },
  { q: "I'm nervous about the dentist. Can you help?", a: "Tell us when you book. We'll give you a longer appointment, explain every step, and you can stop at any time. Happy-gas sedation is available." },
  { q: "Do you see children?", a: "Yes, from their first tooth. Our paediatric visits are gentle, short and fun, with a small prize at the end." },
  { q: "What if I need to cancel?", a: "Just reply to your WhatsApp reminder at least 24 hours before your appointment. There's no fee." },
];

export default function DentalDemo() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#1F4D45]/10 bg-white/90 backdrop-blur">
        <div className={`${w} flex h-16 items-center justify-between md:h-20`}>
          <a href="#top" className="flex items-center gap-2 font-dd text-2xl"><Sparkles className="size-5 text-[#3BA58B]" aria-hidden /> Pearl &amp; Pine</a>
          <nav aria-label="Clinic" className="hidden gap-7 text-sm md:flex">
            {[["#treatments", "Treatments"], ["#book", "Book online"], ["#team", "Our dentists"], ["#visit", "Visit"], ["#faq", "FAQ"]].map(([h, l]) => <a key={h} href={h} className="hover:text-[#3BA58B]">{l}</a>)}
          </nav>
          <a href="#book" className="inline-flex min-h-11 items-center rounded-full bg-[#1F4D45] px-5 text-sm font-medium text-white">Book appointment</a>
        </div>
      </header>
      <main id="top">
        <section className={`${w} grid items-center gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:py-20`} aria-labelledby="pp-h">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#F2F7F6] px-4 py-2 text-sm"><Star className="size-4 fill-[#3BA58B] text-[#3BA58B]" aria-hidden /> 4.9 from 1,200 patients · sample rating</p>
            <h1 id="pp-h" className="mt-6 font-dd text-5xl leading-[1.02] md:text-7xl">Gentle dentistry, booked in a minute.</h1>
            <p className="mt-5 max-w-lg text-lg text-[#0B1F1C]/70">A calm, modern clinic in Arera Colony, Bhopal. See real appointment times, choose your dentist and confirm online, day or night.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#book" className="inline-flex min-h-13 items-center rounded-full bg-[#1F4D45] px-7 font-medium text-white">See available times</a>
              <BookFor treatment="emergency" className="inline-flex min-h-13 items-center rounded-full bg-[#F2F7F6] px-7 font-medium">Emergency? Same-day care</BookFor>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#0B1F1C]/70">
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#3BA58B]" aria-hidden /> Insurance & no-cost EMI</li>
              <li className="flex items-center gap-2"><HeartHandshake className="size-4 text-[#3BA58B]" aria-hidden /> Nervous patients welcome</li>
              <li className="flex items-center gap-2"><Clock className="size-4 text-[#3BA58B]" aria-hidden /> Open Saturdays</li>
            </ul>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px]">
              <Image src={unsplash("1489278353717-f64c6ee8a4d2")} alt="A woman smiling" fill priority sizes="(min-width:768px) 45vw, 92vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-[#1F4D45]/10 md:-left-8">
              <p className="text-xs text-[#0B1F1C]/60">Next available</p>
              <p className="font-dd text-xl">Tomorrow, 9:30 am</p>
            </div>
          </div>
        </section>

        <section id="treatments" className={`${w} scroll-mt-24 py-16 md:py-24`} aria-labelledby="tr-h">
          <h2 id="tr-h" className={h2}>Treatments &amp; fees</h2>
          <p className="mt-3 max-w-xl text-[#0B1F1C]/65">Transparent prices before you book. Pay by UPI, card or no-cost EMI.</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <li key={t.id} className="flex flex-col rounded-3xl bg-[#F2F7F6] p-6">
                <p className="font-dd text-2xl">{t.name}</p>
                <p className="mt-1 text-sm text-[#0B1F1C]/65">{t.note}</p>
                <p className="mt-4 text-lg font-medium text-[#1F4D45]">{t.fee} <span className="text-sm font-normal text-[#0B1F1C]/75">· {t.mins} min</span></p>
                <BookFor treatment={t.id} className="mt-5 inline-flex min-h-11 items-center justify-center self-start rounded-full bg-white px-5 text-sm font-medium ring-1 ring-[#1F4D45]/15 hover:bg-[#1F4D45] hover:text-white">Book this</BookFor>
              </li>
            ))}
          </ul>
        </section>

        <section id="book" className="scroll-mt-20 bg-[#F2F7F6] py-16 md:py-24" aria-labelledby="bk-h">
          <div className={w}>
            <h2 id="bk-h" className={h2}>Book an appointment</h2>
            <p className="mt-3 mb-10 max-w-xl text-[#0B1F1C]/65">Live availability for the next two weeks. Greyed-out times are already booked.</p>
            <Scheduler />
          </div>
        </section>

        <section id="team" className={`${w} scroll-mt-24 py-16 md:py-24`} aria-labelledby="tm-h">
          <h2 id="tm-h" className={h2}>Our dentists</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dentists.map((d) => (
              <li key={d.id}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#F2F7F6]"><Image src={unsplash(d.img)} alt={`Portrait of ${d.name}`} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" /></div>
                <p className="mt-4 font-dd text-2xl">{d.name}</p>
                <p className="text-sm text-[#0B1F1C]/65">{d.role} · {d.quals}</p>
                <p className="mt-1 text-sm">Special interest: {d.focus}</p>
                <BookFor dentist={d.id} className="mt-3 inline-flex min-h-10 items-center rounded-full bg-[#F2F7F6] px-4 text-sm font-medium hover:bg-[#1F4D45] hover:text-white">Book with {d.name.split(" ")[1]}</BookFor>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#1F4D45] py-16 text-white md:py-24" aria-labelledby="wy-h">
          <div className={`${w} grid gap-10 md:grid-cols-2`}>
            <div>
              <h2 id="wy-h" className={h2}>Why patients stay with us</h2>
              <ul className="mt-8 space-y-5">
                {[["Unhurried appointments", "We book longer slots so nobody feels rushed."], ["Modern, low-dose X-rays", "Digital imaging with up to 80% less radiation."], ["Upfront treatment plans", "Every option and price in writing before we start."]].map(([t, d]) => <li key={t}><p className="font-dd text-2xl">{t}</p><p className="text-white/75">{d}</p></li>)}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["1629909613654-28e377c37b09", "1598256989800-fe5f95da9787", "1663755489920-5e09f66d011a", "1681939282781-341ac4f61996"].map((id) => <div key={id} className="relative aspect-square overflow-hidden rounded-3xl"><Image src={unsplash(id)} alt="Inside the clinic" fill sizes="25vw" className="object-cover" /></div>)}
            </div>
          </div>
        </section>

        <section className={`${w} py-16 md:py-24`} aria-labelledby="rv-h">
          <h2 id="rv-h" className={h2}>Patients say</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {[["Sneha, MP Nagar", "I hadn't been to a dentist in eight years. Dr. Patel was so patient I actually booked my next clean before leaving."], ["Arjun, Arera Colony", "Booked a Saturday slot online at midnight with a cracked tooth. Sorted by lunchtime."], ["Priya, Kolar Road", "Clear prices, no upselling, and the whitening results are lovely."]].map(([n, t]) => (
              <li key={n} className="rounded-3xl bg-[#F2F7F6] p-6"><SampleTag /><p className="mt-3 text-lg">&ldquo;{t}&rdquo;</p><p className="mt-4 font-medium">{n}</p></li>
            ))}
          </ul>
        </section>

        <section id="visit" className="scroll-mt-24 bg-[#F2F7F6] py-16 md:py-24" aria-labelledby="vs-h">
          <div className={`${w} grid gap-10 md:grid-cols-2`}>
            <div>
              <h2 id="vs-h" className={h2}>Visit us</h2>
              <ul className="mt-8 space-y-4">
                <li className="flex gap-3"><MapPin className="size-5 shrink-0 text-[#3BA58B]" aria-hidden /> 1st floor, 88 E-5, Arera Colony, Bhopal 462016 (fictional)</li>
                <li className="flex gap-3"><Phone className="size-5 shrink-0 text-[#3BA58B]" aria-hidden /> +91 98765 01180 · display only</li>
                <li className="flex gap-3"><Mail className="size-5 shrink-0 text-[#3BA58B]" aria-hidden /> hello@example.com</li>
                <li className="flex gap-3"><Clock className="size-5 shrink-0 text-[#3BA58B]" aria-hidden /> Mon–Fri 8am–6pm · Sat 8am–2pm</li>
                <li className="flex gap-3"><Car className="size-5 shrink-0 text-[#3BA58B]" aria-hidden /> Free parking for patients; 10 minutes from Rani Kamlapati station</li>
                <li className="flex gap-3"><Accessibility className="size-5 shrink-0 text-[#3BA58B]" aria-hidden /> Lift access and wheelchair-friendly surgery</li>
              </ul>
              <a href="#book" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#1F4D45] px-6 font-medium text-white">Book online</a>
            </div>
            <iframe title="Map of Arera Colony, Bhopal" src="https://www.google.com/maps?q=Arera+Colony,+Bhopal&z=15&output=embed" loading="lazy" className="h-80 w-full rounded-3xl border-0 md:h-full" />
          </div>
        </section>

        <section id="faq" className={`mx-auto max-w-4xl scroll-mt-24 px-4 py-16 md:px-8 md:py-24`} aria-labelledby="fq-h">
          <h2 id="fq-h" className={`${h2} mb-8`}>Questions</h2>
          <FAQ items={faq} />
        </section>
      </main>
      <footer className="border-t border-[#1F4D45]/10 px-4 pt-10 pb-32 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd text-xl">Pearl &amp; Pine Dental</p>
          <DemoDisclaimer slug="dental" className="max-w-lg text-[#0B1F1C]/60" />
        </div>
      </footer>
    </>
  );
}
