"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";
import { type Errors, hasErrors, validate } from "@/lib/validate";
import { flavours, packs } from "./data";

const CanScene = dynamic(() => import("@/components/three/CanScene"), { ssr: false });
type F = (typeof flavours)[number];
const Ctx = createContext<{ f: F; set: (id: string) => void }>(null!);
const useFlavour = () => useContext(Ctx);

export function FlavourProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState(flavours[0].id);
  const value = useMemo(() => ({ f: flavours.find((x) => x.id === id)!, set: setId }), [id]);
  return (
    <Ctx.Provider value={value}>
      <motion.div animate={{ backgroundColor: value.f.bg }} transition={{ duration: 0.6 }} className="min-h-screen">
        {children}
      </motion.div>
    </Ctx.Provider>
  );
}

function CanFallback({ f }: { f: F }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-[70%] w-[30%] max-w-48 rounded-[40px] shadow-2xl" style={{ background: `linear-gradient(135deg, ${f.c1}, ${f.c2})` }} aria-hidden />
    </div>
  );
}

export function HeroCan() {
  const { f } = useFlavour();
  return <Scene3DGate className="absolute inset-0" render={(ready) => <CanScene flavour={f} distance={5} onReady={ready} />} fallback={<CanFallback f={f} />} />;
}

export function FlavourPicker({ dark = false }: { dark?: boolean }) {
  const { f, set } = useFlavour();
  return (
    <div role="radiogroup" aria-label="Choose a flavour" className="flex flex-wrap gap-2">
      {flavours.map((x) => (
        <button key={x.id} type="button" role="radio" aria-checked={f.id === x.id} onClick={() => set(x.id)} className={`flex min-h-12 items-center gap-2 rounded-full border-[3px] border-black px-4 font-dd text-sm transition ${f.id === x.id ? "bg-black text-white" : dark ? "bg-white" : "bg-white/80 hover:bg-white"}`}>
          <span className="size-4 rounded-full border-2 border-black" style={{ background: `linear-gradient(135deg, ${x.c1}, ${x.c2})` }} aria-hidden />
          {x.name}
        </button>
      ))}
    </div>
  );
}

export function HeroCopy() {
  const { f } = useFlavour();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={f.id} initial={{ opacity: 0, y: 20, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
        <p className="inline-block -rotate-2 rounded-lg border-[3px] border-black bg-white px-3 py-1 font-dd text-sm">{f.tag}</p>
        <h1 className="mt-4 font-dd text-6xl leading-[0.9] text-black md:text-8xl">{f.name}</h1>
        <p className="mt-5 max-w-md text-lg font-medium text-black/80">{f.blurb}</p>
      </motion.div>
    </AnimatePresence>
  );
}

/** A second can that spins with the page scroll. */
export function SpinSection() {
  const { f } = useFlavour();
  const ref = useRef<HTMLDivElement>(null);
  const spin = useRef<number>(0);
  const burst = useRef<number>(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    spin.current = v;
    burst.current = Math.min(1, Math.max(0, (v - 0.3) / 0.4));
    setStep(v < 0.4 ? 0 : v < 0.6 ? 1 : 2);
  });
  const facts = [["0 g", "added sugar"], ["80 mg", "natural caffeine from green tea"], ["B3, B6, B12", "plus electrolytes"]];
  return (
    <section ref={ref} className="relative h-[220vh] bg-black text-white" aria-labelledby="sp-h">
      <div className="sticky top-0 grid h-screen items-center overflow-hidden md:grid-cols-2">
        <div className="relative h-[55vh] md:h-full">
          <Scene3DGate className="absolute inset-0" render={(ready) => <CanScene flavour={f} spin={spin} burst={burst} distance={5.6} interactive={false} onReady={ready} />} fallback={<CanFallback f={f} />} />
        </div>
        <div className="px-6 pb-16 md:px-12 md:pb-0">
          <h2 id="sp-h" className="font-dd text-5xl md:text-8xl">What&apos;s inside</h2>
          <p className="mt-3 text-lg text-white/70">Keep scrolling: the can bursts open into everything that goes in it.</p>
          <ul className="mt-8 space-y-4">
            {facts.map(([n, l], i) => (
              <motion.li key={n} animate={{ opacity: step >= i ? 1 : 0.25, x: step >= i ? 0 : 20 }} className="border-b border-white/20 pb-4">
                <p className="font-dd text-5xl" style={{ color: f.c1 }}>{n}</p>
                <p className="text-white/70">{l}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

type OF = "name" | "phone" | "pin";
export function OrderPacks() {
  const { f } = useFlavour();
  const [qty, setQty] = useState<Record<string, number>>({ p12: 1 });
  const [v, setV] = useState({ name: "", phone: "", pin: "" });
  const [errors, setErrors] = useState<Errors<OF>>({});
  const [done, setDone] = useState<string | null>(null);
  const total = packs.reduce((a, p) => a + (qty[p.id] ?? 0) * p.price, 0);
  const lines = packs.filter((p) => qty[p.id]).map((p) => `${qty[p.id]} × ${p.name} (${f.name}) — ₹${(qty[p.id] * p.price).toLocaleString("en-IN")}`);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, { name: [{ kind: "required" }], phone: [{ kind: "required" }, { kind: "phone" }], pin: [{ kind: "required" }, { kind: "pattern", re: /^\d{6}$/, message: "Enter a 6-digit PIN code." }] });
    setErrors(errs);
    if (hasErrors(errs) || !total) return;
    setDone(formatEnquiry("New order — FIZZBOLT", { Name: v.name, Phone: v.phone, "PIN code": v.pin, Items: lines.join("; "), Total: `₹${total.toLocaleString("en-IN")}` }));
  };
  if (done) return <DemoResult brand="FIZZBOLT Energy" industryName="Product brand" demoSlug="energy-drink" industrySlug="beverages" preview={done} onReset={() => setDone(null)} className="border-[3px] border-black bg-white text-black" />;
  return (
    <form onSubmit={submit} noValidate className="grid gap-6 rounded-3xl border-[3px] border-black bg-white p-6 shadow-[8px_8px_0_#000] md:p-8">
      <p className="font-dd text-lg">Flavour: {f.name}</p>
      <ul className="grid gap-3">
        {packs.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border-2 border-black p-3">
            <div><p className="font-dd">{p.name}</p><p className="text-sm">₹{p.price.toLocaleString("en-IN")}</p></div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setQty({ ...qty, [p.id]: Math.max(0, (qty[p.id] ?? 0) - 1) })} className="grid size-10 place-items-center rounded-full border-2 border-black" aria-label={`Fewer ${p.name}`}><Minus className="size-4" /></button>
              <span className="w-6 text-center font-dd" aria-live="polite">{qty[p.id] ?? 0}</span>
              <button type="button" onClick={() => setQty({ ...qty, [p.id]: (qty[p.id] ?? 0) + 1 })} className="grid size-10 place-items-center rounded-full border-2 border-black bg-[#FFD400]" aria-label={`More ${p.name}`}><Plus className="size-4" /></button>
            </div>
          </li>
        ))}
      </ul>
      <div className="grid gap-4 sm:grid-cols-3">
        {(["name", "phone", "pin"] as const).map((k) => (
          <div key={k}>
            <label htmlFor={`fz-${k}`} className="mb-1 block font-dd text-xs">{{ name: "NAME", phone: "PHONE", pin: "PIN CODE" }[k]}</label>
            <input id={`fz-${k}`} inputMode={k === "name" ? "text" : "numeric"} autoComplete={k === "name" ? "name" : k === "phone" ? "tel" : "postal-code"} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `fz-${k}-e` : undefined} className={`min-h-12 w-full rounded-xl border-2 px-3 ${errors[k] ? "border-[#E11D48]" : "border-black"}`} />
            {errors[k] ? <p id={`fz-${k}-e`} className="mt-1 text-sm font-semibold text-[#be123c]">{errors[k]}</p> : null}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-dd text-3xl">₹{total.toLocaleString("en-IN")}</p>
        <div className="flex flex-wrap gap-2">
          <a href={total ? waLink(["[Demo order from FIZZBOLT website]", "", ...lines, `Total: ₹${total.toLocaleString("en-IN")}`].join("\n")) : undefined} aria-disabled={!total} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center gap-2 rounded-full border-[3px] border-black px-5 font-dd text-sm ${total ? "bg-[#25D366]" : "pointer-events-none opacity-40"}`}><WhatsAppIcon className="size-4" /> WhatsApp</a>
          <button type="submit" disabled={!total} className="min-h-12 rounded-full border-[3px] border-black bg-black px-6 font-dd text-sm text-white disabled:opacity-40">Place order</button>
        </div>
      </div>
    </form>
  );
}

/** Carbonation bubbles rising behind the hero. */
export function Fizz() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {Array.from({ length: 30 }, (_, i) => (
        <span
          key={i}
          className="absolute bottom-[-20px] rounded-full border-2 border-white/60 bg-white/20"
          style={{ left: `${(i * 31) % 100}%`, width: 8 + ((i * 13) % 26), height: 8 + ((i * 13) % 26), animation: `fizz ${6 + (i % 7)}s linear ${(i * 0.43) % 6}s infinite` }}
        />
      ))}
    </div>
  );
}

function StoryPanel({ f, onEnter }: { f: F; onEnter: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 });
  useEffect(() => {
    if (inView) onEnter(f.id);
  }, [inView, f.id, onEnter]);
  return (
    <div ref={ref} className="flex min-h-[90vh] flex-col justify-center py-16">
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.5 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
        <p className="inline-block -rotate-2 rounded-lg border-[3px] border-black bg-white px-3 py-1 font-dd text-sm">{f.tag}</p>
        <h3 className="mt-4 font-dd text-6xl leading-[0.9] md:text-8xl">{f.name}</h3>
        <p className="mt-6 max-w-lg text-xl font-medium">{f.blurb}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {f.notes.map((n) => <li key={n} className="rounded-full border-[3px] border-black bg-white px-4 py-2 font-bold">{n}</li>)}
        </ul>
      </motion.div>
    </div>
  );
}

/** Scrollytelling: one sticky 3D can that repaints as each flavour panel scrolls into view. */
export function FlavourStory() {
  const { f, set } = useFlavour();
  return (
    <div className="grid md:grid-cols-2">
      <div className="sticky top-0 h-[55vh] md:h-screen">
        <Scene3DGate className="absolute inset-0" render={(ready) => <CanScene flavour={f} distance={5.2} interactive={false} onReady={ready} />} fallback={<CanFallback f={f} />} />
      </div>
      <div className="px-5 md:px-12">
        {flavours.map((x) => <StoryPanel key={x.id} f={x} onEnter={set} />)}
      </div>
    </div>
  );
}

type RF = "biz" | "name" | "phone" | "city";
export function RetailerForm() {
  const [v, setV] = useState({ biz: "", name: "", phone: "", city: "", type: "Kirana / convenience store", cases: "10–50" });
  const [errors, setErrors] = useState<Errors<RF>>({});
  const [done, setDone] = useState<string | null>(null);
  if (done) return <DemoResult brand="FIZZBOLT Energy" industryName="Product brand" demoSlug="energy-drink" industrySlug="beverages" preview={done} onReset={() => setDone(null)} className="border-[3px] border-black bg-white text-black" channel="sales inbox" />;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, { biz: [{ kind: "required" }], name: [{ kind: "required" }], phone: [{ kind: "required" }, { kind: "phone" }], city: [{ kind: "required" }] });
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(formatEnquiry("Stockist enquiry — FIZZBOLT", { Business: v.biz, Contact: v.name, Phone: v.phone, City: v.city, Type: v.type, "Cases per month": v.cases }));
  };
  const box = (k: RF) => `min-h-12 w-full rounded-xl border-[3px] bg-white px-3 ${errors[k] ? "border-[#E11D48]" : "border-black"}`;
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      {([["biz", "Business name"], ["name", "Your name"], ["phone", "Phone"], ["city", "City"]] as const).map(([k, l]) => (
        <div key={k}>
          <label htmlFor={`rt-${k}`} className="mb-1 block font-dd text-xs">{l.toUpperCase()}</label>
          <input id={`rt-${k}`} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `rt-${k}-e` : undefined} className={box(k)} />
          {errors[k] ? <p id={`rt-${k}-e`} className="mt-1 text-sm font-semibold text-[#be123c]">{errors[k]}</p> : null}
        </div>
      ))}
      <div><label htmlFor="rt-type" className="mb-1 block font-dd text-xs">STORE TYPE</label><select id="rt-type" value={v.type} onChange={(e) => setV({ ...v, type: e.target.value })} className="min-h-12 w-full rounded-xl border-[3px] border-black bg-white px-3">{["Kirana / convenience store", "Supermarket", "Gym or café", "Distributor", "Online store"].map((o) => <option key={o}>{o}</option>)}</select></div>
      <div><label htmlFor="rt-cases" className="mb-1 block font-dd text-xs">CASES PER MONTH</label><select id="rt-cases" value={v.cases} onChange={(e) => setV({ ...v, cases: e.target.value })} className="min-h-12 w-full rounded-xl border-[3px] border-black bg-white px-3">{["Under 10", "10–50", "50–200", "200+"].map((o) => <option key={o}>{o}</option>)}</select></div>
      <button type="submit" className="min-h-13 rounded-full border-[3px] border-black bg-[#FFD400] px-8 font-dd sm:col-span-2 sm:justify-self-start">Get trade pricing</button>
    </form>
  );
}
