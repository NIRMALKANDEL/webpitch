"use client";

import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createContext, useContext, useMemo, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Lightbox } from "@/components/shared/Lightbox";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { unsplash } from "@/lib/media";
import { type Errors, hasErrors, validate } from "@/lib/validate";
import { FLOORS, gallery, inr, units, type Unit } from "./data";

const TowerScene = dynamic(() => import("./TowerScene"), { ssr: false });

type Filters = { bhk: string; budget: string; status: string; floor: number | null; sort: string };
type Ctx = { f: Filters; set: (p: Partial<Filters>) => void; pickUnit: (u: Unit) => void; unit: Unit | null };
const C = createContext<Ctx>(null!);

export function EstateProvider({ children }: { children: React.ReactNode }) {
  const [f, setF] = useState<Filters>({ bhk: "any", budget: "any", status: "any", floor: null, sort: "price" });
  const [unit, setUnit] = useState<Unit | null>(null);
  const value = useMemo<Ctx>(
    () => ({
      f,
      set: (p) => setF((s) => ({ ...s, ...p })),
      unit,
      pickUnit: (u) => {
        setUnit(u);
        document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" });
      },
    }),
    [f, unit],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}

const sel = "min-h-12 w-full rounded-xl border border-white/30 bg-white/15 px-3 text-white backdrop-blur [&>option]:text-black";

export function HeroSearch() {
  const { f, set } = useContext(C);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="grid gap-3 rounded-3xl border border-white/25 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:grid-cols-4"
      aria-label="Find your home"
    >
      <label className="text-xs text-white/80">Configuration
        <select className={`${sel} mt-1`} value={f.bhk} onChange={(e) => set({ bhk: e.target.value })}>
          <option value="any">Any BHK</option><option value="2">2 BHK</option><option value="3">3 BHK</option><option value="4">4 BHK</option>
        </select>
      </label>
      <label className="text-xs text-white/80">Budget
        <select className={`${sel} mt-1`} value={f.budget} onChange={(e) => set({ budget: e.target.value })}>
          <option value="any">Any budget</option><option value="1">Under ₹1 Cr</option><option value="2">₹1–1.5 Cr</option><option value="3">Above ₹1.5 Cr</option>
        </select>
      </label>
      <label className="text-xs text-white/80">Status
        <select className={`${sel} mt-1`} value={f.status} onChange={(e) => set({ status: e.target.value })}>
          <option value="any">Any</option><option>Ready</option><option>Under construction</option>
        </select>
      </label>
      <button type="submit" className="mt-auto flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0F766E] font-semibold text-white">
        <Search className="size-4" aria-hidden /> Search homes
      </button>
    </form>
  );
}

function match(u: Unit, f: Filters) {
  if (f.bhk !== "any" && u.bhk !== +f.bhk) return false;
  if (f.status !== "any" && u.status !== f.status) return false;
  if (f.budget === "1" && u.price >= 10000000) return false;
  if (f.budget === "2" && (u.price < 10000000 || u.price > 15000000)) return false;
  if (f.budget === "3" && u.price <= 15000000) return false;
  if (f.floor !== null && u.floor !== f.floor) return false;
  return true;
}

export function FloorPicker() {
  const { f, set, pickUnit } = useContext(C);
  const [night, setNight] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const available = units.map((u) => u.floor);
  const onFloor = units.filter((u) => u.floor === f.floor);
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
      <Scene3DGate
        className="aspect-square w-full max-w-2xl justify-self-center overflow-hidden rounded-3xl"
        render={(ready) => <TowerScene floors={FLOORS} selected={f.floor} availableFloors={available} units={units} onPickUnit={pickUnit} night={night} resetKey={resetKey} onSelect={(n) => set({ floor: n === f.floor ? null : n })} onReady={ready} />}
        fallback={<Image src={unsplash("1545324418-cc1a3fa10c00")} alt="Harbourline Residences tower" fill sizes="(min-width:1024px) 40vw, 92vw" className="rounded-3xl object-cover" />}
      />
      <div>
        <p className="text-sm text-[#334155]">Tap a floor on the tower, or choose here. The floor slides out with its plan; tap a home on it to book a visit.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" aria-pressed={night} onClick={() => setNight(!night)} className="min-h-10 rounded-full bg-[#0B2540] px-4 text-sm font-semibold text-white">{night ? "Switch to day" : "See it at night"}</button>
          <button type="button" onClick={() => { set({ floor: null }); setResetKey((k) => k + 1); }} className="min-h-10 rounded-full px-4 text-sm font-semibold ring-1 ring-slate-300">Reset view</button>
        </div>
        <div className="mt-4 grid grid-cols-8 gap-1.5" role="group" aria-label="Choose a floor">
          {Array.from({ length: FLOORS }, (_, i) => FLOORS - i).map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={f.floor === n}
              onClick={() => set({ floor: f.floor === n ? null : n })}
              className={`min-h-10 rounded-lg text-sm font-semibold transition ${f.floor === n ? "bg-[#0F766E] text-white" : available.includes(n) ? "bg-[#E6F4F1] text-[#0B2540] hover:bg-[#cfe9e4]" : "bg-slate-100 text-slate-600"}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-6 min-h-28 rounded-2xl border border-slate-200 p-5" aria-live="polite">
          {f.floor === null ? (
            <p className="text-[#334155]">No floor selected. Showing every floor in the listings below.</p>
          ) : onFloor.length ? (
            <>
              <p className="font-dd text-xl">Floor {f.floor}</p>
              {onFloor.map((u) => (
                <p key={u.id} className="mt-1 text-[#334155]">{u.id} · {u.bhk} BHK · {u.sqft} sq ft · {inr(u.price)}</p>
              ))}
              <a href="#listings" className="mt-3 inline-block text-sm font-semibold text-[#0F766E] underline">See in listings</a>
            </>
          ) : (
            <p className="text-[#334155]">Floor {f.floor} is fully booked. Choose a highlighted floor.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Listings() {
  const { f, set, pickUnit } = useContext(C);
  const list = units.filter((u) => match(u, f)).sort((a, b) => (f.sort === "price" ? a.price - b.price : b.sqft - a.sqft));
  const chip = (on: boolean) => `min-h-10 rounded-full px-4 text-sm font-semibold transition ${on ? "bg-[#0B2540] text-white" : "bg-white text-[#0B2540] ring-1 ring-slate-200"}`;
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {["any", "2", "3", "4"].map((b) => (
          <button key={b} type="button" aria-pressed={f.bhk === b} onClick={() => set({ bhk: b })} className={chip(f.bhk === b)}>{b === "any" ? "All" : `${b} BHK`}</button>
        ))}
        <span className="mx-1 h-6 w-px bg-slate-300" aria-hidden />
        {["any", "Ready", "Under construction"].map((s) => (
          <button key={s} type="button" aria-pressed={f.status === s} onClick={() => set({ status: s })} className={chip(f.status === s)}>{s === "any" ? "Any status" : s}</button>
        ))}
        {f.floor !== null || f.budget !== "any" ? (
          <button type="button" onClick={() => set({ floor: null, budget: "any" })} className="min-h-10 px-3 text-sm font-semibold text-[#0F766E] underline">Clear floor & budget</button>
        ) : null}
        <label className="ml-auto flex items-center gap-2 text-sm">Sort
          <select value={f.sort} onChange={(e) => set({ sort: e.target.value })} className="min-h-10 rounded-full bg-white px-3 ring-1 ring-slate-200">
            <option value="price">Price, low to high</option><option value="area">Area, largest first</option>
          </select>
        </label>
      </div>
      <p className="sr-only" aria-live="polite">{list.length} homes match</p>
      <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((u) => (
            <motion.li layout key={u.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-dm text-xs text-slate-500">{u.id}</span>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${u.status === "Ready" ? "bg-[#E6F4F1] text-[#0F766E]" : "bg-amber-50 text-amber-800"}`}>{u.status}</span>
              </div>
              <p className="mt-3 font-dd text-2xl">{u.bhk} BHK</p>
              <p className="text-sm text-[#334155]">{u.project}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div><dt className="text-xs text-slate-500">Area</dt><dd className="font-semibold">{u.sqft} ft²</dd></div>
                <div><dt className="text-xs text-slate-500">Floor</dt><dd className="font-semibold">{u.floor}</dd></div>
                <div><dt className="text-xs text-slate-500">Facing</dt><dd className="font-semibold">{u.facing}</dd></div>
              </dl>
              <p className="mt-4 text-xl font-bold text-[#0B2540]">{inr(u.price)}</p>
              <button type="button" onClick={() => pickUnit(u)} className="mt-4 min-h-11 rounded-full bg-[#0F766E] text-sm font-semibold text-white">Schedule site visit</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 ? <p className="mt-6 text-[#334155]">No homes match those filters. Try widening your budget or status.</p> : null}
    </>
  );
}

export function FloorPlans() {
  const [t, setT] = useState<2 | 3 | 4>(3);
  const plans = { 2: ["Living + dining 18′×12′", "Master bedroom 14′×12′", "Bedroom 2 11′×10′", "Kitchen 10′×8′", "2 bathrooms, 1 balcony"], 3: ["Living + dining 22′×13′", "Master bedroom 15′×13′", "Bedrooms 2 & 3 12′×11′", "Kitchen + utility 12′×9′", "3 bathrooms, 2 balconies"], 4: ["Living + dining 26′×15′", "Master suite 17′×14′", "3 bedrooms 13′×12′", "Kitchen + utility 14′×10′", "4 bathrooms, sea-facing deck"] };
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
      <div>
        <div role="tablist" aria-label="Floor plans" className="flex gap-2">
          {([2, 3, 4] as const).map((b) => (
            <button key={b} role="tab" type="button" aria-selected={t === b} onClick={() => setT(b)} className={`min-h-11 flex-1 rounded-xl font-semibold ${t === b ? "bg-[#0B2540] text-white" : "bg-[#E6F4F1] text-[#0B2540]"}`}>{b} BHK</button>
          ))}
        </div>
        <div role="tabpanel" aria-label={`${t} BHK rooms`}>
          <ul className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {plans[t].map((p) => <li key={p} className="py-3 text-[#334155]">{p}</li>)}
          </ul>
        </div>
      </div>
      <div className="grid aspect-[4/3] place-items-center rounded-3xl bg-[#E6F4F1] p-6" aria-label={`${t} BHK plan diagram`} role="img">
        <svg viewBox="0 0 400 300" className="h-full w-full text-[#0B2540]" fill="none" stroke="currentColor" strokeWidth="3">
          <rect x="10" y="10" width="380" height="280" />
          <line x1={t === 2 ? 220 : 180} y1="10" x2={t === 2 ? 220 : 180} y2="290" />
          <line x1="10" y1="160" x2={t === 2 ? 220 : 180} y2="160" />
          {t >= 3 ? <line x1="180" y1="150" x2="390" y2="150" /> : null}
          {t === 4 ? <line x1="290" y1="150" x2="290" y2="290" /> : null}
          <text x="40" y="90" fill="currentColor" stroke="none" fontSize="16">Living + dining</text>
          <text x="40" y="230" fill="currentColor" stroke="none" fontSize="16">Master bedroom</text>
          <text x={t === 2 ? 250 : 210} y="90" fill="currentColor" stroke="none" fontSize="16">{t === 2 ? "Bedroom 2" : "Bedroom 2"}</text>
          {t >= 3 ? <text x="205" y="230" fill="currentColor" stroke="none" fontSize="16">Bedroom 3</text> : null}
          {t === 4 ? <text x="305" y="230" fill="currentColor" stroke="none" fontSize="16">Bed 4</text> : null}
        </svg>
      </div>
    </div>
  );
}

export function EstateGallery() {
  const tabs = Object.keys(gallery);
  const [tab, setTab] = useState(tabs[0]);
  const [i, setI] = useState<number | null>(null);
  const list = gallery[tab];
  return (
    <>
      <div role="tablist" aria-label="Gallery" className="no-scrollbar flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)} className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold ${tab === t ? "bg-white text-[#0B2540]" : "bg-white/10 text-white"}`}>{t}</button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {list.map((g, n) => (
          <button key={g.id} type="button" onClick={() => setI(n)} className={`relative overflow-hidden rounded-2xl ${n === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"}`} aria-label={`Open: ${g.alt}`}>
            <Image src={unsplash(g.id)} alt={g.alt} fill sizes="(min-width:768px) 40vw, 50vw" className="object-cover transition duration-500 hover:scale-105" />
          </button>
        ))}
      </div>
      <Lightbox items={list.map((g) => ({ src: unsplash(g.id), alt: g.alt }))} index={i} onClose={() => setI(null)} onIndex={setI} />
    </>
  );
}

export function Emi() {
  const [price, setPrice] = useState(12900000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const P = price * (1 - down / 100);
  const r = rate / 1200;
  const n = years * 12;
  const emi = r ? (P * r * (1 + r) ** n) / ((1 + r) ** n - 1) : P / n;
  const row = (label: string, value: string, input: React.ReactNode) => (
    <label className="grid gap-2">
      <span className="flex justify-between text-sm"><span>{label}</span><strong>{value}</strong></span>
      {input}
    </label>
  );
  const range = "w-full accent-[#0F766E]";
  return (
    <div className="grid gap-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:grid-cols-[1.4fr_1fr] md:p-10">
      <div className="grid gap-6">
        {row("Property price", inr(price), <input type="range" min={5000000} max={30000000} step={100000} value={price} onChange={(e) => setPrice(+e.target.value)} className={range} />)}
        {row("Down payment", `${down}%`, <input type="range" min={10} max={50} value={down} onChange={(e) => setDown(+e.target.value)} className={range} />)}
        {row("Interest rate", `${rate}%`, <input type="range" min={6.5} max={12} step={0.1} value={rate} onChange={(e) => setRate(+e.target.value)} className={range} />)}
        {row("Tenure", `${years} years`, <input type="range" min={5} max={30} value={years} onChange={(e) => setYears(+e.target.value)} className={range} />)}
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-[#0B2540] p-6 text-white" aria-live="polite">
        <p className="text-sm text-white/70">Estimated monthly EMI</p>
        <p className="mt-1 font-dd text-4xl">₹{Math.round(emi).toLocaleString("en-IN")}</p>
        <p className="mt-3 text-sm text-white/70">Loan amount {inr(P)} · Indicative only</p>
      </div>
    </div>
  );
}

type F = "name" | "phone" | "email" | "date" | "slot";
export function SiteVisit() {
  const { unit } = useContext(C);
  const [v, setV] = useState({ name: "", phone: "", email: "", date: "", slot: "", mode: "In person", pickup: false });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v as unknown as Record<F, string>, {
      name: [{ kind: "required" }], phone: [{ kind: "required" }, { kind: "phone" }], email: [{ kind: "email" }],
      date: [{ kind: "required", message: "Choose a preferred date." }], slot: [{ kind: "required", message: "Choose a time slot." }],
    });
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(formatEnquiry("Site visit request — Harbourline Estates", { Name: v.name, Phone: v.phone, Email: v.email, Unit: unit ? `${unit.id} (${unit.bhk} BHK, ${unit.project})` : "Not chosen", "Preferred date": v.date, Slot: v.slot, Visit: v.mode, "Pick-up needed": v.mode === "In person" ? (v.pickup ? "Yes" : "No") : undefined }));
  };
  if (done) return <DemoResult brand="Harbourline Estates" industryName="Real estate" demoSlug="real-estate" industrySlug="real-estate" preview={done} onReset={() => setDone(null)} className="border-white/20 bg-white text-[#0B2540]" />;
  const inp = "min-h-12 w-full rounded-xl bg-white px-4 text-[#0B2540]";
  const er = (k: F) => (errors[k] ? <p id={`hv-${k}-e`} className="mt-1 text-sm text-[#fca5a5]">{errors[k]}</p> : null);
  const a = (k: F) => ({ id: `hv-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `hv-${k}-e` : undefined });
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      {unit ? <p className="rounded-xl bg-white/10 p-3 text-sm sm:col-span-2">Visiting: <strong>{unit.id}</strong> · {unit.bhk} BHK · {inr(unit.price)}</p> : null}
      <div><label htmlFor="hv-name" className="mb-1 block text-sm">Name</label><input {...a("name")} autoComplete="name" className={inp} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />{er("name")}</div>
      <div><label htmlFor="hv-phone" className="mb-1 block text-sm">Phone</label><input {...a("phone")} type="tel" autoComplete="tel" className={inp} value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />{er("phone")}</div>
      <div><label htmlFor="hv-email" className="mb-1 block text-sm">Email (optional)</label><input {...a("email")} type="email" autoComplete="email" className={inp} value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />{er("email")}</div>
      <div><label htmlFor="hv-date" className="mb-1 block text-sm">Preferred date</label><input {...a("date")} type="date" className={inp} value={v.date} onChange={(e) => setV({ ...v, date: e.target.value })} />{er("date")}</div>
      <div><label htmlFor="hv-slot" className="mb-1 block text-sm">Time slot</label><select {...a("slot")} className={inp} value={v.slot} onChange={(e) => setV({ ...v, slot: e.target.value })}><option value="">Choose…</option><option>10:00–12:00</option><option>12:00–14:00</option><option>15:00–17:00</option></select>{er("slot")}</div>
      <fieldset><legend className="mb-1 text-sm">Visit type</legend>
        <div className="flex gap-2">{["In person", "Virtual tour"].map((m) => <button key={m} type="button" aria-pressed={v.mode === m} onClick={() => setV({ ...v, mode: m })} className={`min-h-12 flex-1 rounded-xl text-sm font-semibold ${v.mode === m ? "bg-[#0F766E]" : "bg-white/10"}`}>{m}</button>)}</div>
      </fieldset>
      {v.mode === "In person" ? <label className="flex items-center gap-3 text-sm sm:col-span-2"><input type="checkbox" className="size-5 accent-[#0F766E]" checked={v.pickup} onChange={(e) => setV({ ...v, pickup: e.target.checked })} /> I&apos;d like a free pick-up from Kochi city</label> : null}
      <button type="submit" className="min-h-12 rounded-full bg-[#0F766E] px-8 font-semibold sm:col-span-2 sm:justify-self-start">Book site visit</button>
    </form>
  );
}
