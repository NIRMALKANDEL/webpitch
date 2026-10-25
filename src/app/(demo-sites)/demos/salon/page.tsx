import { Car, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { DemoDisclaimer, SampleTag } from "@/components/shared/DemoShell";
import { unsplash } from "@/lib/media";
import { BookButton, BookingProvider, HeroBlobs, OfferBar, SalonGallery, ServiceTabs } from "./_parts/Parts";
import { team } from "./_parts/data";

const offers = [
  { t: "Bridal trial", d: "20% off when you book your wedding package", until: "Valid till 30 Nov" },
  { t: "First visit", d: "Complimentary hair spa with any colour service", until: "New clients only" },
  { t: "Tuesday glow", d: "Facial + mani for ₹3,600 instead of ₹4,200", until: "Every Tuesday" },
];
const reviews = [
  { n: "Kavya R.", t: "Riya understood exactly the balayage I wanted from one blurry photo. The booking took less than a minute." },
  { n: "Meher S.", t: "Calm, spotless and genuinely kind staff. My bridal trial made me cry happy tears." },
  { n: "Ishita P.", t: "Best gel manicure in Indore, and it lasted three weeks." },
];

export default function SalonDemo() {
  return (
    <BookingProvider>
      <OfferBar />
      <header className="sticky top-0 z-40 bg-[#FDF2F8]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-8">
          <a href="#top" className="font-dd text-2xl">Velvet Rooms</a>
          <nav aria-label="Salon" className="hidden gap-7 text-sm font-semibold md:flex">
            {[["#services", "Services"], ["#team", "Team"], ["#offers", "Offers"], ["#visit", "Visit"]].map(([h, l]) => <a key={h} href={h} className="hover:text-[#BE185D]">{l}</a>)}
          </nav>
          <BookButton className="min-h-11 rounded-full bg-[#BE185D] px-5 text-sm font-semibold text-white">Book now</BookButton>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-8 md:py-20" aria-labelledby="vr-h">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm"><Star className="size-4 fill-[#BE185D] text-[#BE185D]" aria-hidden /> 4.9 average · sample rating</p>
            <h1 id="vr-h" className="mt-6 font-dd text-5xl leading-[1.05] md:text-7xl">Hair, skin and a little bit of calm.</h1>
            <p className="mt-5 max-w-md text-lg text-[#831843]/75">A boutique studio in Old Palasia, Indore. Book online in three taps, any time of day.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton className="min-h-13 rounded-full bg-[#BE185D] px-8 font-semibold text-white shadow-lg shadow-[#BE185D]/30">Book an appointment</BookButton>
              <a href="#services" className="inline-flex min-h-13 items-center rounded-full bg-white px-8 font-semibold">See prices</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <HeroBlobs />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[40px] shadow-2xl shadow-[#831843]/20">
              <Image src={unsplash("1634449571010-02389ed0f9b0")} alt="A stylist washing a client's hair" fill priority sizes="(min-width:768px) 40vw, 92vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section id="offers" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 md:px-8" aria-labelledby="vr-o">
          <h2 id="vr-o" className="font-dd text-4xl md:text-5xl">This month&apos;s offers</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {offers.map((o) => (
              <li key={o.t} className="rounded-[28px] bg-gradient-to-br from-white to-[#f5e8ff] p-6 shadow-sm transition hover:-translate-y-1">
                <span className="rounded-full bg-[#6D4FC2] px-3 py-1 text-xs font-semibold text-white">{o.until}</span>
                <h3 className="mt-4 font-dd text-2xl">{o.t}</h3>
                <p className="mt-2 text-[#831843]/75">{o.d}</p>
                <p className="mt-3 text-xs text-[#831843]/50">Sample offer for this demo</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:px-8" aria-labelledby="vr-s">
          <h2 id="vr-s" className="mb-8 font-dd text-4xl md:text-5xl">Services &amp; prices</h2>
          <ServiceTabs />
        </section>

        <section id="team" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:px-8" aria-labelledby="vr-t">
          <h2 id="vr-t" className="font-dd text-4xl md:text-5xl">Meet the team</h2>
          <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {team.map((p) => (
              <li key={p.name} className="text-center">
                <div className="relative mx-auto aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl">
                  <Image src={unsplash(p.img)} alt={`${p.name} at work`} fill sizes="(min-width:768px) 22vw, 45vw" className="object-cover" />
                </div>
                <p className="mt-4 font-dd text-xl">{p.name}</p>
                <p className="text-sm text-[#831843]/65">{p.role} · {p.years} yrs</p>
                <BookButton stylist={p.name} className="mt-3 min-h-10 rounded-full bg-white px-4 text-sm font-semibold">Book with {p.name.split(" ")[0]}</BookButton>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8" aria-labelledby="vr-g">
          <h2 id="vr-g" className="mb-8 font-dd text-4xl md:text-5xl">Inside the studio</h2>
          <SalonGallery />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8" aria-labelledby="vr-r">
          <h2 id="vr-r" className="font-dd text-4xl md:text-5xl">Kind words</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.n} className="rounded-[28px] bg-white p-6">
                <SampleTag />
                <p className="mt-3 text-lg">&ldquo;{r.t}&rdquo;</p>
                <p className="mt-4 font-semibold">{r.n}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="visit" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:px-8" aria-labelledby="vr-v">
          <div className="grid overflow-hidden rounded-[32px] bg-white md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 id="vr-v" className="font-dd text-4xl">Visit us</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-3"><MapPin className="size-5 shrink-0 text-[#BE185D]" aria-hidden /> 2nd floor, 18 Old Palasia, Indore 452018 (fictional)</li>
                <li className="flex gap-3"><Clock className="size-5 shrink-0 text-[#BE185D]" aria-hidden /> Tue–Sun, 10am–9pm · Mondays closed</li>
                <li className="flex gap-3"><Car className="size-5 shrink-0 text-[#BE185D]" aria-hidden /> Valet parking available in the building</li>
              </ul>
              <BookButton className="mt-8 min-h-12 rounded-full bg-[#BE185D] px-7 font-semibold text-white">Book an appointment</BookButton>
            </div>
            <iframe title="Map of Old Palasia, Indore" src="https://www.google.com/maps?q=Old+Palasia,+Indore&z=15&output=embed" loading="lazy" className="h-80 w-full border-0 md:h-full" />
          </div>
        </section>
      </main>
      <footer className="px-4 pt-8 pb-32 text-center md:pb-12">
        <p className="font-dd text-2xl">Velvet Rooms</p>
        <DemoDisclaimer slug="salon" className="mx-auto mt-3 max-w-lg text-[#831843]/60" />
      </footer>
    </BookingProvider>
  );
}
