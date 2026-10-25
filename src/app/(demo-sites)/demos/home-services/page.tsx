import { BadgeCheck, BadgeIndianRupee, CalendarCheck, Clock, Mail, MapPin, Phone, ShieldCheck, Star, Wrench } from "lucide-react";
import Image from "next/image";
import { DemoDisclaimer, SampleTag } from "@/components/shared/DemoShell";
import { unsplash } from "@/lib/media";
import { AREAS, JOBS, SERVICES } from "./_parts/data";
import { CallButton, CoverageChecker, QuoteForm, ServiceQuoteLink, StickyBar } from "./_parts/Parts";

const w = "mx-auto max-w-7xl px-4 md:px-8";
const h2 = "font-dd text-4xl font-extrabold uppercase md:text-6xl";

export default function HomeServicesDemo() {
  const zones = [...new Set(AREAS.map((a) => a.zone))];
  return (
    <>
      <div className="bg-[#0F172A] text-sm text-white">
        <div className={`${w} flex h-10 items-center justify-between`}>
          <span className="flex items-center gap-2"><Clock className="size-4" aria-hidden /> Open 7 days · 8am–9pm</span>
          <span className="hidden sm:inline">+91 98765 50182 · display only</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-[#1E40AF] text-white shadow">
        <div className={`${w} flex h-16 items-center justify-between`}>
          <a href="#top" className="flex items-center gap-2 font-dd text-2xl font-extrabold uppercase"><Wrench className="size-6 text-[#fdba74]" aria-hidden /> FixRight</a>
          <nav aria-label="Services" className="hidden gap-6 font-semibold md:flex">
            {[["#services", "Services"], ["#areas", "Areas"], ["#pricing", "Pricing"], ["#quote", "Quote"]].map(([h, l]) => <a key={h} href={h} className="hover:text-[#fdba74]">{l}</a>)}
          </nav>
          <CallButton className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#C2410C] px-4 font-bold"><Phone className="size-4" aria-hidden /> Call now</CallButton>
        </div>
      </header>
      <main id="top">
        <section className="relative overflow-hidden bg-[#1E40AF] text-white" aria-labelledby="fx-h">
          <Image src={unsplash("1570129477492-45c003edd2be")} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
          <div className={`${w} relative grid gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:py-24`}>
            <div>
              <p className="inline-block rounded bg-[#C2410C] px-3 py-1 font-dd text-lg font-bold uppercase">Same-day service across Indore</p>
              <h1 id="fx-h" className="mt-5 font-dd text-6xl leading-[0.92] font-extrabold uppercase md:text-8xl">Plumber, electrician or AC repair — at your door today.</h1>
              <p className="mt-5 max-w-lg text-lg text-white/85">Verified technicians, upfront prices before we start, and a 90-day workmanship guarantee.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#quote" className="inline-flex min-h-13 items-center rounded-lg bg-[#C2410C] px-7 font-dd text-xl font-bold uppercase">Get a free quote</a>
                <CallButton className="inline-flex min-h-13 items-center gap-2 rounded-lg bg-white px-7 font-dd text-xl font-bold text-[#1E40AF] uppercase"><Phone className="size-5" aria-hidden /> Call now</CallButton>
              </div>
            </div>
            <div className="self-end"><CoverageChecker /></div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-[#EFF6FF]" aria-label="Why choose us">
          <ul className={`${w} grid grid-cols-2 gap-4 py-6 md:grid-cols-4`}>
            {[[ShieldCheck, "Verified & insured"], [BadgeIndianRupee, "Upfront pricing"], [BadgeCheck, "90-day guarantee"], [Star, "4.8 average · sample rating"]].map(([I, t]) => {
              const Icon = I as typeof ShieldCheck;
              return <li key={t as string} className="flex items-center gap-2 font-semibold"><Icon className="size-6 shrink-0 text-[#1E40AF]" aria-hidden /> {t as string}</li>;
            })}
          </ul>
        </section>

        <section id="services" className={`${w} scroll-mt-20 py-16 md:py-24`} aria-labelledby="sv-h">
          <h2 id="sv-h" className={h2}>Services</h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <li key={s.name} className="flex flex-col overflow-hidden rounded-xl border-2 border-slate-200">
                <div className="relative aspect-[4/3]"><Image src={unsplash(s.img)} alt="" fill sizes="(min-width:1024px) 24vw, 48vw" className="object-cover" /></div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-dd text-2xl font-bold uppercase">{s.name}</h3>
                  <p className="text-sm text-slate-600">{s.text}</p>
                  <p className="mt-2 font-semibold">Visit from ₹{s.from}</p>
                  <div className="mt-auto"><ServiceQuoteLink name={s.name} /></div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#0F172A] py-16 text-white md:py-24" aria-labelledby="hw-h">
          <div className={w}>
            <h2 id="hw-h" className={h2}>How it works</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-4">
              {["Book online or call", "A technician is assigned within the hour", "Upfront price, then we fix it", "Pay only when you're happy"].map((s, i) => (
                <li key={s} className="rounded-xl bg-white/5 p-6"><span className="font-dd text-5xl font-extrabold text-[#fdba74]">{i + 1}</span><p className="mt-2 text-lg font-semibold">{s}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="areas" className={`${w} scroll-mt-20 grid gap-10 py-16 md:grid-cols-2 md:py-24`} aria-labelledby="ar-h">
          <div>
            <h2 id="ar-h" className={h2}>Areas we cover</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {zones.map((z) => (
                <div key={z}>
                  <p className="font-dd text-xl font-bold uppercase text-[#1E40AF]">{z}</p>
                  <ul className="mt-2 space-y-1">{AREAS.filter((a) => a.zone === z).map((a) => <li key={a.name} className="flex items-center gap-2"><MapPin className="size-4 text-[#C2410C]" aria-hidden /> {a.name}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-xl"><Image src={unsplash("1522832712787-3fbd36c9fe2d")} alt="A FixRight technician at work" fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover" /></div>
        </section>

        <section id="pricing" className="scroll-mt-20 bg-[#EFF6FF] py-16 md:py-24" aria-labelledby="pr-h">
          <div className={w}>
            <h2 id="pr-h" className={h2}>Common jobs, upfront prices</h2>
            <table className="mt-8 w-full rounded-xl bg-white text-left">
              <caption className="sr-only">Indicative prices</caption>
              <tbody>{JOBS.map(([j, p]) => <tr key={j} className="border-b border-slate-200 last:border-0"><th scope="row" className="p-4 font-semibold">{j}</th><td className="p-4 text-right font-dd text-2xl font-bold text-[#1E40AF]">{p}</td></tr>)}</tbody>
            </table>
            <p className="mt-3 text-sm text-slate-600">Indicative prices including labour and GST. Parts extra.</p>
          </div>
        </section>

        <section className={`${w} py-16 md:py-24`} aria-labelledby="rv-h">
          <h2 id="rv-h" className={h2}>Neighbours say</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[["Neha, Vijay Nagar", "Burst pipe at 7pm on a Sunday. They were here in 50 minutes and told me the price before touching anything."], ["Raj, Palasia", "AC stopped cooling in the middle of May. Fixed the same afternoon, and the tech explained everything."], ["Mohit, Annapurna", "Booked online for three small jobs. One visit, all done, fair price."]].map(([n, t]) => (
              <li key={n} className="rounded-xl border-2 border-slate-200 p-6"><SampleTag className="text-[#0F172A]" /><p className="mt-3 text-lg">&ldquo;{t}&rdquo;</p><p className="mt-4 font-bold">{n}</p></li>
            ))}
          </ul>
        </section>

        <section id="quote" className="scroll-mt-20 bg-[#1E40AF] py-16 text-white md:py-24" aria-labelledby="qt-h">
          <div className={`${w} grid gap-10 md:grid-cols-[1fr_1.6fr]`}>
            <div>
              <h2 id="qt-h" className={h2}>Free quote</h2>
              <p className="mt-4 text-lg text-white/85">Tell us what&apos;s wrong. We reply within 15 minutes during opening hours.</p>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3"><Phone className="size-5 text-[#fdba74]" aria-hidden /> +91 98765 50182 (display only)</li>
                <li className="flex items-center gap-3"><Mail className="size-5 text-[#fdba74]" aria-hidden /> help@example.com</li>
                <li className="flex items-center gap-3"><MapPin className="size-5 text-[#fdba74]" aria-hidden /> 22 Scheme 78, Vijay Nagar, Indore 452010 (fictional)</li>
                <li className="flex items-center gap-3"><CalendarCheck className="size-5 text-[#fdba74]" aria-hidden /> 7 days, 8am–9pm</li>
              </ul>
            </div>
            <QuoteForm />
          </div>
        </section>
      </main>
      <footer className="px-4 pt-10 pb-40 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd text-xl font-extrabold uppercase">FixRight Home Services</p>
          <DemoDisclaimer slug="home-services" className="max-w-lg text-slate-500" />
        </div>
      </footer>
      <StickyBar />
    </>
  );
}
