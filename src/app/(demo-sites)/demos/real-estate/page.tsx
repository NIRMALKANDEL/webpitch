import { Bike, Car, Dumbbell, Laptop, ShieldCheck, Trees, Waves, Zap } from "lucide-react";
import Image from "next/image";
import { BackgroundVideo } from "@/components/shared/BackgroundVideo";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { unsplash, videos } from "@/lib/media";
import { amenities } from "./_parts/data";
import { Emi, EstateGallery, EstateProvider, FloorPicker, FloorPlans, HeroSearch, Listings, SiteVisit } from "./_parts/Parts";

const icons = [Waves, Dumbbell, Trees, Bike, Zap, ShieldCheck, Car, Laptop];
const projects = [
  { name: "Harbourline Residences", status: "Ready to move in", poss: "Possession now", conf: "2, 3 & 4 BHK", from: "₹89 L", img: "1624204386084-dd8c05e32226" },
  { name: "Marina Heights", status: "Under construction", poss: "Possession Dec 2027", conf: "2, 3 & 4 BHK", from: "₹74 L", img: "1460317442991-0ec209397118" },
];
const sec = "mx-auto max-w-7xl px-4 md:px-8";
const h2 = "font-dd text-3xl md:text-5xl";

export default function RealEstateDemo() {
  return (
    <EstateProvider>
      <header className="absolute inset-x-0 top-0 z-30 text-white">
        <div className={`${sec} flex h-20 items-center justify-between`}>
          <a href="#top" className="font-dd text-xl tracking-wider">HARBOURLINE</a>
          <nav aria-label="Developer" className="hidden gap-7 text-sm md:flex">
            {[["#projects", "Projects"], ["#floors", "Floor picker"], ["#listings", "Homes"], ["#amenities", "Amenities"], ["#emi", "EMI"]].map(([h, l]) => <a key={h} href={h} className="hover:text-[#5eead4]">{l}</a>)}
          </nav>
          <a href="#visit" className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0B2540]">Site visit</a>
        </div>
      </header>
      <main id="top" className="bg-[#f8fafc] text-[#0B2540]">
        <section className="relative min-h-[100svh] text-white" aria-labelledby="he-h">
          <BackgroundVideo video={videos.coastalSkyline} posterAlt="Aerial view of a coastal city skyline" className="absolute inset-0" controlsClassName="top-24 right-4 md:right-8" overlay={<div className="absolute inset-0 bg-gradient-to-b from-[#0B2540]/60 via-[#0B2540]/25 to-[#0B2540]/85" />} />
          <div className={`${sec} relative z-10 flex min-h-[100svh] flex-col justify-end pt-28 pb-32 md:pb-20`}>
            <p className="text-sm tracking-[0.3em] text-[#5eead4]">MARINE DRIVE, KOCHI</p>
            <h1 id="he-h" className="mt-3 max-w-4xl font-dd text-5xl leading-[1.05] md:text-7xl">Homes where the backwaters meet the sea</h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">Two RERA-registered projects with 2, 3 and 4 BHK residences, from ₹74 lakh.</p>
            <div className="mt-8 max-w-4xl"><HeroSearch /></div>
          </div>
        </section>

        <section id="projects" className={`${sec} scroll-mt-10 py-20 md:py-28`} aria-labelledby="pr-h">
          <h2 id="pr-h" className={h2}>Featured projects</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <article key={p.name} className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200">
                <div className="relative aspect-[16/10]"><Image src={unsplash(p.img)} alt={p.name} fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover" /></div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-[#0F766E]">{p.status}</p>
                  <h3 className="mt-1 font-dd text-3xl">{p.name}</h3>
                  <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div><dt className="text-slate-500">Homes</dt><dd className="font-semibold">{p.conf}</dd></div>
                    <div><dt className="text-slate-500">Possession</dt><dd className="font-semibold">{p.poss}</dd></div>
                    <div><dt className="text-slate-500">From</dt><dd className="font-semibold">{p.from}</dd></div>
                  </dl>
                  <p className="mt-4 text-xs text-slate-500">RERA no. K-RERA/PRJ/0000/2026 (sample)</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="floors" className="scroll-mt-10 bg-white py-20 md:py-28" aria-labelledby="fl-h">
          <div className={sec}>
            <h2 id="fl-h" className={h2}>Pick your floor in 3D</h2>
            <p className="mt-3 mb-10 max-w-xl text-[#334155]">Drag to rotate Harbourline Residences. Tap a floor to see the homes still available on it.</p>
            <FloorPicker />
          </div>
        </section>

        <section id="listings" className={`${sec} scroll-mt-10 py-20 md:py-28`} aria-labelledby="li-h">
          <h2 id="li-h" className={`${h2} mb-8`}>Available homes</h2>
          <Listings />
        </section>

        <section className="bg-white py-20 md:py-28" aria-labelledby="fp-h">
          <div className={sec}>
            <h2 id="fp-h" className={`${h2} mb-10`}>Floor plans</h2>
            <FloorPlans />
          </div>
        </section>

        <section id="amenities" className={`${sec} scroll-mt-10 py-20 md:py-28`} aria-labelledby="am-h">
          <h2 id="am-h" className={h2}>Amenities</h2>
          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {amenities.map((a, i) => {
              const I = icons[i];
              return <li key={a} className="flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200"><I className="size-6 text-[#0F766E]" aria-hidden /> {a}</li>;
            })}
          </ul>
        </section>

        <section className="bg-[#0B2540] py-20 text-white md:py-28" aria-labelledby="ga-h">
          <div className={sec}>
            <h2 id="ga-h" className={`${h2} mb-8`}>Gallery</h2>
            <EstateGallery />
          </div>
        </section>

        <section id="emi" className={`${sec} scroll-mt-10 py-20 md:py-28`} aria-labelledby="em-h">
          <h2 id="em-h" className={`${h2} mb-8`}>EMI calculator</h2>
          <Emi />
          <div className="mt-12 grid items-center gap-6 rounded-3xl bg-[#E6F4F1] p-8 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-dd text-2xl">Buying from abroad?</h3>
              <p className="mt-2 text-[#334155]">NRI buyers get live video site tours, NRI home-loan assistance and power-of-attorney support for registration.</p>
            </div>
            <a href="#visit" className="inline-flex min-h-12 items-center rounded-full bg-[#0B2540] px-6 font-semibold text-white">Book a virtual tour</a>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28" aria-labelledby="lo-h">
          <div className={`${sec} grid gap-10 md:grid-cols-2`}>
            <div>
              <h2 id="lo-h" className={h2}>Location advantages</h2>
              <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {[["Kochi Metro (MG Road)", "1.2 km"], ["Lulu Mall", "8 km"], ["Cochin International Airport", "28 km"], ["Medical Trust Hospital", "3 km"], ["Choice School", "5 km"]].map(([p, d]) => (
                  <li key={p} className="flex justify-between py-3"><span>{p}</span><span className="font-semibold">{d}</span></li>
                ))}
              </ul>
            </div>
            <iframe title="Map of Marine Drive, Kochi" src="https://www.google.com/maps?q=Marine+Drive,+Kochi&z=14&output=embed" loading="lazy" className="h-80 w-full rounded-3xl border-0 md:h-full" />
          </div>
        </section>

        <section id="visit" className="scroll-mt-10 bg-[#0B2540] py-20 text-white md:py-28" aria-labelledby="vi-h">
          <div className={`${sec} grid gap-10 md:grid-cols-[1fr_1.4fr]`}>
            <div>
              <h2 id="vi-h" className={h2}>Schedule a site visit</h2>
              <p className="mt-4 text-white/75">Visit the show apartment with our team, or take a live video tour from anywhere in the world.</p>
            </div>
            <SiteVisit />
          </div>
        </section>
      </main>
      <footer className="bg-[#07182b] px-4 pt-10 pb-32 text-white/60 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd tracking-wider text-white">HARBOURLINE ESTATES</p>
          <DemoDisclaimer slug="real-estate" className="max-w-lg" />
        </div>
      </footer>
    </EstateProvider>
  );
}
