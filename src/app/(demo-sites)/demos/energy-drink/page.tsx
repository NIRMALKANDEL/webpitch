import { Bike, Dumbbell, Gamepad2, GraduationCap, Leaf, MapPin, Shirt, Zap } from "lucide-react";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { FAQ } from "@/components/site/FAQ";
import { flavours } from "./_parts/data";
import { FlavourPicker, FlavourProvider, FlavourStory, Fizz, HeroCan, HeroCopy, OrderPacks, RetailerForm, SpinSection } from "./_parts/Parts";

const words = ["NO CRASH", "ZERO SUGAR", "REAL FRUIT", "MADE IN MUMBAI", "BOLT MODE ON"];
const card = "rounded-[32px] border-[3px] border-black bg-white p-6 shadow-[8px_8px_0_#000]";
const nutrition = [["Energy", "18 kcal"], ["Sugar", "0 g"], ["Caffeine (green tea)", "80 mg"], ["Vitamin B3", "8 mg · 50%"], ["Vitamin B6", "1.4 mg · 100%"], ["Vitamin B12", "2.5 µg · 100%"], ["Sodium", "45 mg"], ["Potassium", "120 mg"]];
const crew = [
  { icon: Gamepad2, t: "Gamers", d: "Six-hour raids, zero sugar crash." },
  { icon: Dumbbell, t: "Gym rats", d: "Pre-workout without the jitters." },
  { icon: GraduationCap, t: "Students", d: "Exam week's best friend." },
  { icon: Bike, t: "Riders", d: "Electrolytes for long, hot rides." },
];
const bundles = [
  { t: "Variety 12", d: "4 of each flavour", p: "₹1,099", tag: "Best seller", bg: "#FFD400" },
  { t: "Office stash 24", d: "Your team's fridge, sorted", p: "₹1,999", tag: "Save 16%", bg: "#00C2A8" },
  { t: "Merch drop", d: "Glow tee + 6 cans", p: "₹1,499", tag: "Limited", bg: "#FF5A1F", icon: true },
];
const faq = [
  { q: "How much caffeine is in a can?", a: "80 mg, from green tea, about the same as a strong cup of coffee. Not recommended for children, pregnant women or people sensitive to caffeine." },
  { q: "Is it really zero sugar?", a: "Yes. It's sweetened with stevia and monk fruit, so each can has 18 calories." },
  { q: "Where do you deliver?", a: "Across India. 12-packs and up ship free and arrive cold-packed in 2–4 days." },
  { q: "Can I stock FIZZBOLT in my store?", a: "Yes! Fill in the stockist form below for trade pricing and a free cooler for bigger orders." },
];

export default function EnergyDrinkDemo() {
  return (
    <FlavourProvider>
      <header className="fixed inset-x-0 top-3 z-40 px-3">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border-[3px] border-black bg-white px-4 shadow-[4px_4px_0_#000]">
          <a href="#top" className="flex items-center gap-1 font-dd text-lg"><Zap className="size-5 fill-[#FFD400]" aria-hidden /> FIZZBOLT</a>
          <nav aria-label="Brand" className="hidden gap-5 text-sm font-bold md:flex">
            {[["#flavours", "Flavours"], ["#inside", "Inside"], ["#bundles", "Bundles"], ["#order", "Order"], ["#stockists", "Stockists"]].map(([h, l]) => <a key={h} href={h} className="hover:underline">{l}</a>)}
          </nav>
          <a href="#order" className="inline-flex min-h-10 items-center rounded-full bg-black px-4 font-dd text-xs text-white">Grab a pack</a>
        </div>
      </header>
      <main id="top">
        <section className="relative grid min-h-[100svh] items-center gap-4 overflow-hidden px-5 pt-24 pb-28 lg:grid-cols-[1fr_1.15fr] lg:px-12 lg:pb-24" aria-label="FIZZBOLT flavours">
          <Fizz />
          <div className="relative z-10 order-2 lg:order-1">
            <HeroCopy />
            <div className="mt-8"><FlavourPicker /></div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#order" className="inline-flex min-h-16 items-center rounded-full border-[3px] border-black bg-black px-9 font-dd text-lg text-white shadow-[6px_6px_0_rgba(0,0,0,0.25)] transition hover:-translate-y-1">Order a pack</a>
              <a href="#flavours" className="inline-flex min-h-16 items-center rounded-full border-[3px] border-black bg-white px-9 font-dd text-lg transition hover:-translate-y-1">Meet the flavours</a>
            </div>
          </div>
          <div className="relative order-1 h-[60vh] lg:order-2 lg:h-[92vh]">
            <HeroCan />
            <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-white">Drag to spin</p>
          </div>
        </section>

        <div className="-rotate-2 overflow-hidden border-y-[3px] border-black bg-[#FFD400] py-4" aria-hidden>
          <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-10 font-dd text-3xl motion-reduce:animate-none md:text-5xl">
            {[...words, ...words, ...words].map((w, i) => <span key={i}>{w} ⚡</span>)}
          </div>
        </div>

        <section id="flavours" className="scroll-mt-20 pt-24" aria-labelledby="fl-h">
          <div className="px-5 md:px-12">
            <h2 id="fl-h" className="font-dd text-6xl md:text-9xl">Pick your poison*</h2>
            <p className="mt-3 text-lg font-bold">*it&apos;s actually fruit. Scroll: the can and the whole site change with each flavour.</p>
          </div>
          <FlavourStory />
        </section>

        <div id="inside" className="scroll-mt-0"><SpinSection /></div>

        <section className="px-5 py-24 md:px-12" aria-labelledby="nu-h">
          <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 id="nu-h" className="font-dd text-5xl md:text-7xl">Read the label</h2>
              <p className="mt-4 text-lg font-medium">Nothing to hide. Every can is vegan, gluten-free and made with real fruit juice.</p>
              <ul className="mt-6 flex flex-wrap gap-2">{["Vegan", "Gluten-free", "No artificial colours", "Recyclable can"].map((t) => <li key={t} className="flex items-center gap-1 rounded-full border-[3px] border-black bg-white px-4 py-2 font-bold"><Leaf className="size-4" aria-hidden /> {t}</li>)}</ul>
            </div>
            <table className={`${card} w-full text-left`}>
              <caption className="pb-3 text-left font-dd text-2xl">Nutrition · per 250 ml can</caption>
              <tbody>{nutrition.map(([k, v]) => <tr key={k} className="border-t-2 border-black"><th scope="row" className="py-2 font-bold">{k}</th><td className="py-2 text-right font-dd">{v}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="border-y-[3px] border-black bg-black px-5 py-24 text-white md:px-12" aria-labelledby="cr-h">
          <h2 id="cr-h" className="font-dd text-5xl md:text-7xl">Fuel for your thing</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {crew.map(({ icon: Icon, t, d }, i) => (
              <li key={t} className={`rounded-[28px] border-[3px] border-white p-6 transition hover:-translate-y-2 hover:rotate-0 ${i % 2 ? "rotate-1" : "-rotate-1"}`} style={{ background: [flavours[0].c1, flavours[1].c1, flavours[2].c1, "#FFD400"][i], color: "#000" }}>
                <Icon className="size-10" aria-hidden />
                <p className="mt-4 font-dd text-2xl">{t}</p>
                <p className="mt-1 font-bold">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="bundles" className="scroll-mt-20 px-5 py-24 md:px-12" aria-labelledby="bu-h">
          <h2 id="bu-h" className="font-dd text-5xl md:text-7xl">Bundles &amp; merch</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {bundles.map((b) => (
              <li key={b.t} className={`${card} flex flex-col transition hover:-translate-y-2`}>
                <div className="relative grid h-44 place-items-center overflow-hidden rounded-2xl border-[3px] border-black" style={{ background: b.bg }}>
                  {b.icon ? <Shirt className="size-24" aria-hidden /> : (
                    <div className="flex items-end gap-2" aria-hidden>
                      {flavours.map((f, i) => <span key={f.id} className="block w-10 rounded-[14px] border-[3px] border-black" style={{ height: 96 + (i % 2) * 14, background: `linear-gradient(135deg, ${f.c1}, ${f.c2})` }} />)}
                    </div>
                  )}
                  <span className="absolute top-3 right-3 rotate-6 rounded-lg border-2 border-black bg-white px-2 py-0.5 font-dd text-xs">{b.tag}</span>
                </div>
                <p className="mt-5 font-dd text-2xl">{b.t}</p>
                <p className="font-bold text-black/70">{b.d}</p>
                <p className="mt-4 font-dd text-3xl">{b.p}</p>
                <a href="#order" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full border-[3px] border-black bg-black font-dd text-sm text-white">Add to order</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="order" className="scroll-mt-20 px-5 py-24 md:px-12" aria-labelledby="or-h">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 id="or-h" className="font-dd text-5xl md:text-7xl">Load up</h2>
              <p className="mt-4 text-lg font-medium">Free delivery across India on 12-packs and up. Cold-packed, delivered in 2–4 days.</p>
              <p className="mt-3 text-sm font-bold">Your selected flavour is used for the order. Switch flavours anytime.</p>
              <div className="mt-6"><FlavourPicker dark /></div>
            </div>
            <OrderPacks />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-24" aria-labelledby="fq-h">
          <h2 id="fq-h" className="mb-8 font-dd text-4xl md:text-6xl">Questions</h2>
          <div className="rounded-[28px] border-[3px] border-black bg-white px-6"><FAQ items={faq} /></div>
        </section>

        <section id="stockists" className="scroll-mt-20 border-t-[3px] border-black bg-white px-5 py-24 md:px-12" aria-labelledby="st-h">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <h2 id="st-h" className="font-dd text-5xl md:text-7xl">Find a fridge</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[["Mumbai", "120+ stores"], ["Bengaluru", "80+ stores"], ["Delhi NCR", "95+ stores"], ["Pune", "40+ stores"]].map(([c, n]) => (
                  <li key={c} className="flex items-center gap-3 rounded-2xl border-[3px] border-black p-5"><MapPin className="size-6" aria-hidden /><div><p className="font-dd text-lg">{c}</p><p className="text-sm font-bold text-black/60">{n} · sample data</p></div></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-dd text-3xl">Stock FIZZBOLT</h3>
              <p className="mt-2 mb-6 font-bold text-black/70">Retailers, gyms, cafés and distributors: get trade pricing and a free branded cooler on bigger orders.</p>
              <RetailerForm />
            </div>
          </div>
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
