import { Leaf, MapPin, Zap } from "lucide-react";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { flavours } from "./_parts/data";
import { FlavourPicker, FlavourProvider, HeroCan, HeroCopy, OrderPacks, SpinSection } from "./_parts/Parts";

const words = ["NO CRASH", "ZERO SUGAR", "REAL FRUIT", "MADE IN MUMBAI", "BOLT MODE ON"];

export default function EnergyDrinkDemo() {
  return (
    <FlavourProvider>
      <header className="fixed inset-x-0 top-3 z-40 px-3">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border-[3px] border-black bg-white px-4 shadow-[4px_4px_0_#000]">
          <a href="#top" className="flex items-center gap-1 font-dd text-lg"><Zap className="size-5 fill-[#FFD400]" aria-hidden /> FIZZBOLT</a>
          <nav aria-label="Brand" className="hidden gap-5 text-sm font-bold md:flex">
            {[["#flavours", "Flavours"], ["#inside", "Inside"], ["#order", "Order"], ["#stockists", "Stockists"]].map(([h, l]) => <a key={h} href={h} className="hover:underline">{l}</a>)}
          </nav>
          <a href="#order" className="inline-flex min-h-10 items-center rounded-full bg-black px-4 font-dd text-xs text-white">Grab a pack</a>
        </div>
      </header>
      <main id="top">
        <section className="relative grid min-h-[100svh] items-center gap-6 px-5 pt-24 pb-28 md:grid-cols-2 md:px-12 md:pb-12" aria-label="FIZZBOLT flavours">
          <div className="relative z-10 order-2 md:order-1">
            <HeroCopy />
            <div className="mt-8"><FlavourPicker /></div>
            <a href="#order" className="mt-8 inline-flex min-h-14 items-center rounded-full border-[3px] border-black bg-black px-8 font-dd text-white shadow-[6px_6px_0_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5">Order a pack</a>
          </div>
          <div className="relative order-1 h-[52vh] md:order-2 md:h-[80vh]">
            <HeroCan />
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-white">Drag to spin</p>
          </div>
        </section>

        <div className="-rotate-2 overflow-hidden border-y-[3px] border-black bg-[#FFD400] py-3" aria-hidden>
          <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-8 font-dd text-2xl motion-reduce:animate-none md:text-4xl">
            {[...words, ...words, ...words].map((w, i) => <span key={i}>{w} ⚡</span>)}
          </div>
        </div>

        <section id="flavours" className="scroll-mt-20 px-5 py-24 md:px-12" aria-labelledby="fl-h">
          <h2 id="fl-h" className="font-dd text-5xl md:text-7xl">Pick your poison*</h2>
          <p className="mt-2 font-bold">*it&apos;s actually fruit. Tap a flavour to repaint the whole site.</p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {flavours.map((f, i) => (
              <li key={f.id} className={`rounded-[32px] border-[3px] border-black p-6 shadow-[8px_8px_0_#000] transition hover:-translate-y-1 hover:rotate-0 ${["-rotate-1", "rotate-1", "-rotate-2"][i]}`} style={{ background: `linear-gradient(160deg, ${f.c1}, ${f.c2})` }}>
                <p className="inline-block rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-bold">{f.tag}</p>
                <h3 className="mt-6 font-dd text-3xl" style={{ color: f.ink }}>{f.name}</h3>
                <ul className="mt-4 space-y-1 font-bold" style={{ color: f.ink }}>{f.notes.map((n) => <li key={n} className="flex items-center gap-2"><Leaf className="size-4" aria-hidden /> {n}</li>)}</ul>
              </li>
            ))}
          </ul>
          <div className="mt-10"><FlavourPicker dark /></div>
        </section>

        <div id="inside" className="scroll-mt-0"><SpinSection /></div>

        <section id="order" className="scroll-mt-20 px-5 py-24 md:px-12" aria-labelledby="or-h">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 id="or-h" className="font-dd text-5xl md:text-7xl">Load up</h2>
              <p className="mt-4 text-lg font-medium">Free delivery across India on 12-packs and up. Cold-packed, delivered in 2–4 days.</p>
              <p className="mt-3 text-sm font-bold">Your selected flavour is used for the order. Switch flavours above anytime.</p>
            </div>
            <OrderPacks />
          </div>
        </section>

        <section id="stockists" className="scroll-mt-20 border-t-[3px] border-black bg-white px-5 py-20 md:px-12" aria-labelledby="st-h">
          <h2 id="st-h" className="font-dd text-4xl md:text-6xl">Find a fridge</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[["Mumbai", "120+ stores"], ["Bengaluru", "80+ stores"], ["Delhi NCR", "95+ stores"], ["Pune", "40+ stores"]].map(([c, n]) => (
              <li key={c} className="flex items-center gap-3 rounded-2xl border-[3px] border-black p-5"><MapPin className="size-6" aria-hidden /><div><p className="font-dd text-lg">{c}</p><p className="text-sm font-bold text-black/60">{n} · sample data</p></div></li>
            ))}
          </ul>
          <p className="mt-8 font-bold">Retailer or distributor? <a href="#order" className="underline">Get trade pricing</a></p>
        </section>
      </main>
      <footer className="border-t-[3px] border-black bg-black px-5 pt-10 pb-32 text-white md:px-12 md:pb-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd text-xl">FIZZBOLT ⚡</p>
          <DemoDisclaimer slug="energy-drink" className="max-w-lg text-white/60" />
        </div>
      </footer>
    </FlavourProvider>
  );
}
