"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import { createContext, useContext, useMemo, useRef, useState } from "react";
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
  return <Scene3DGate className="absolute inset-0" render={(ready) => <CanScene flavour={f} onReady={ready} />} fallback={<CanFallback f={f} />} />;
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const [step, setStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    spin.current = v;
    setStep(v < 0.4 ? 0 : v < 0.6 ? 1 : 2);
  });
  const facts = [["0 g", "added sugar"], ["80 mg", "natural caffeine from green tea"], ["B3, B6, B12", "plus electrolytes"]];
  return (
    <section ref={ref} className="relative h-[220vh] bg-black text-white" aria-labelledby="sp-h">
      <div className="sticky top-0 grid h-screen items-center overflow-hidden md:grid-cols-2">
        <div className="relative h-[55vh] md:h-full">
          <Scene3DGate className="absolute inset-0" render={(ready) => <CanScene flavour={f} spin={spin} interactive={false} onReady={ready} />} fallback={<CanFallback f={f} />} />
        </div>
        <div className="px-6 pb-16 md:px-12 md:pb-0">
          <h2 id="sp-h" className="font-dd text-4xl md:text-6xl">What&apos;s inside</h2>
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
