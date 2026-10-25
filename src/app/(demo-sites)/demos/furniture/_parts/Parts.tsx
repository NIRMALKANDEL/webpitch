"use client";

import { ClipboardList, Minus, Plus, RotateCcw, RotateCw, X, ZoomIn, ZoomOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { FABRICS, WOODS, type Fabric, type Wood } from "@/components/three/constants";
import { unsplash } from "@/lib/media";
import { type Errors, hasErrors, validate } from "@/lib/validate";
import { collections, products, inr, type Product } from "./data";

const ChairScene = dynamic(() => import("@/components/three/ChairScene"), { ssr: false });

type Ctx = { quote: Record<string, number>; add: (id: string, n?: number) => void; setQty: (id: string, n: number) => void; open: boolean; setOpen: (b: boolean) => void; col: string; setCol: (c: string) => void };
const C = createContext<Ctx>(null!);
const useShop = () => useContext(C);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [quote, setQuote] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [col, setCol] = useState("All");
  const value = useMemo<Ctx>(() => ({
    quote, open, setOpen, col, setCol,
    add: (id, n = 1) => setQuote((q) => ({ ...q, [id]: (q[id] ?? 0) + n })),
    setQty: (id, n) => setQuote((q) => { const x = { ...q }; if (n <= 0) delete x[id]; else x[id] = n; return x; }),
  }), [quote, open, col]);
  return <C.Provider value={value}>{children}<QuoteDrawer /></C.Provider>;
}

export function QuoteButton() {
  const { quote, setOpen } = useShop();
  const n = Object.values(quote).reduce((a, b) => a + b, 0);
  return (
    <button type="button" onClick={() => setOpen(true)} className="relative inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1C1917] px-4 text-sm font-semibold text-white">
      <ClipboardList className="size-4" aria-hidden /> Quote list
      <span className="grid min-w-6 place-items-center rounded-full bg-[#A3B18A] px-1.5 text-xs text-[#1C1917]" aria-label={`${n} items`}>{n}</span>
    </button>
  );
}

export function Configurator() {
  const [wood, setWood] = useState<Wood>("walnut");
  const [fabric, setFabric] = useState<Fabric>("linen");
  const [az, setAz] = useState(0.6);
  const [zoom, setZoom] = useState(1);
  const { add } = useShop();
  const btn = "grid size-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:bg-[#f0eeeb]";
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="relative">
        <Scene3DGate
          className="aspect-square w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-white to-[#e9e7e3]"
          render={(ready) => <ChairScene wood={wood} fabric={fabric} azimuth={az} zoom={zoom} onReady={ready} />}
          fallback={<Image src={unsplash("1658211312038-4293c7bdd37e")} alt="Hollis lounge chair" fill sizes="(min-width:1024px) 55vw, 92vw" className="object-cover" />}
        />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="group" aria-label="3D view controls">
          <button type="button" className={btn} onClick={() => setAz((a) => a - 0.6)} aria-label="Rotate left"><RotateCcw className="size-4" /></button>
          <button type="button" className={btn} onClick={() => setAz((a) => a + 0.6)} aria-label="Rotate right"><RotateCw className="size-4" /></button>
          <button type="button" className={btn} onClick={() => setZoom((z) => Math.min(1.6, z + 0.2))} aria-label="Zoom in"><ZoomIn className="size-4" /></button>
          <button type="button" className={btn} onClick={() => setZoom((z) => Math.max(0.8, z - 0.2))} aria-label="Zoom out"><ZoomOut className="size-4" /></button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold text-[#6B4226]">Live 3D · drag to turn it around</p>
        <h3 className="mt-2 font-dd text-4xl">Hollis lounge chair</h3>
        <p className="mt-2 text-[#1C1917]/70">Hand-cut mortise and tenon joints, a deep reclined back and a cushion you can sink into.</p>
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold">Wood · {WOODS[wood].label}</legend>
          <div className="mt-2 flex gap-3">
            {(Object.keys(WOODS) as Wood[]).map((w) => (
              <button key={w} type="button" aria-pressed={wood === w} aria-label={WOODS[w].label} onClick={() => setWood(w)} className={`size-11 rounded-full ring-offset-2 transition ${wood === w ? "ring-2 ring-[#1C1917]" : ""}`} style={{ background: WOODS[w].color }} />
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">Upholstery · {FABRICS[fabric].label}</legend>
          <div className="mt-2 flex gap-3">
            {(Object.keys(FABRICS) as Fabric[]).map((f) => (
              <button key={f} type="button" aria-pressed={fabric === f} aria-label={FABRICS[f].label} onClick={() => setFabric(f)} className={`size-11 rounded-full ring-offset-2 transition ${fabric === f ? "ring-2 ring-[#1C1917]" : ""}`} style={{ background: FABRICS[f].color }} />
            ))}
          </div>
        </fieldset>
        <p className="mt-6 font-dd text-3xl">{inr(34900 + (wood === "walnut" ? 0 : -3000) + (fabric === "ochre" ? 2000 : 0))}</p>
        <button type="button" onClick={() => add("p1")} className="mt-4 min-h-12 rounded-full bg-[#6B4226] px-6 font-semibold text-white sm:self-start">Add to quote list</button>
      </div>
    </div>
  );
}

export function CollectionTiles() {
  const { setCol } = useShop();
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-5 md:px-0">
      {collections.map((c) => (
        <li key={c.name} className="w-[60vw] shrink-0 snap-start md:w-auto">
          <a href="#catalogue" onClick={() => setCol(c.name)} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl">
            <Image src={unsplash(c.img)} alt="" fill sizes="(min-width:768px) 20vw, 60vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/90 py-2 text-center font-dd text-lg">{c.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Catalogue() {
  const { col, setCol, add } = useShop();
  const [wood, setWood] = useState("All");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<Product | null>(null);
  const [cm, setCm] = useState(true);
  let list = products.filter((p) => (col === "All" || p.col === col) && (wood === "All" || p.wood === wood));
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  useEffect(() => {
    if (!view) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setView(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [view]);
  const s = "min-h-11 rounded-full bg-white px-4 text-sm ring-1 ring-black/10";
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="wg-col">Collection</label>
        <select id="wg-col" value={col} onChange={(e) => setCol(e.target.value)} className={s}><option>All</option>{collections.map((c) => <option key={c.name}>{c.name}</option>)}</select>
        <label className="sr-only" htmlFor="wg-wood">Wood</label>
        <select id="wg-wood" value={wood} onChange={(e) => setWood(e.target.value)} className={s}><option value="All">All woods</option><option>Walnut</option><option>Oak</option><option>Maple</option></select>
        <label className="sr-only" htmlFor="wg-sort">Sort</label>
        <select id="wg-sort" value={sort} onChange={(e) => setSort(e.target.value)} className={`${s} ml-auto`}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
      </div>
      <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li layout key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button type="button" onClick={() => setView(p)} className="group block w-full text-left" aria-label={`Quick view: ${p.name}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white">
                  <Image src={unsplash(p.img)} alt={p.name} fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover transition duration-500 group-hover:opacity-0" />
                  <Image src={unsplash(p.img2)} alt="" fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="absolute top-3 left-3 rounded-full bg-[#A3B18A] px-2.5 py-1 text-xs font-semibold">{p.wood}</span>
                </div>
                <p className="mt-3 font-dd text-lg">{p.name}</p>
                <p className="text-sm text-[#1C1917]/65">from {inr(p.price)}</p>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <AnimatePresence>
        {view ? (
          <motion.div className="fixed inset-0 z-[80] grid place-items-end bg-black/40 p-3 md:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setView(null)}>
            <motion.div role="dialog" aria-modal="true" aria-label={view.name} onClick={(e) => e.stopPropagation()} initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }} className="grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-[#F5F5F4] md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto"><Image src={unsplash(view.img)} alt={view.name} fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover" /></div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <h3 className="font-dd text-3xl">{view.name}</h3>
                  <button type="button" autoFocus onClick={() => setView(null)} className="grid size-10 place-items-center rounded-full hover:bg-black/5" aria-label="Close"><X className="size-5" /></button>
                </div>
                <p className="mt-2 font-dd text-2xl">from {inr(view.price)}</p>
                <p className="mt-4 text-[#1C1917]/70">Solid {view.wood.toLowerCase()}, finished with hard-wax oil. Made to order in our Jodhpur workshop in 4–6 weeks.</p>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-semibold">Dimensions</p>
                  <button type="button" onClick={() => setCm(!cm)} className="text-sm underline" aria-pressed={cm}>Show in {cm ? "inches" : "cm"}</button>
                </div>
                <dl className="mt-2 grid grid-cols-3 gap-2 rounded-2xl bg-white p-4 text-center text-sm">
                  {["Width", "Depth", "Height"].map((d, i) => <div key={d}><dt className="text-[#1C1917]/55">{d}</dt><dd className="font-semibold">{cm ? Math.round(view.dims[i] * 2.54) + " cm" : view.dims[i] + " in"}</dd></div>)}
                </dl>
                <button type="button" onClick={() => { add(view.id); setView(null); }} className="mt-6 min-h-12 w-full rounded-full bg-[#6B4226] font-semibold text-white">Add to quote list</button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const spots = [
  { x: 30, y: 62, id: "p3" },
  { x: 70, y: 70, id: "p8" },
  { x: 82, y: 38, id: "p10" },
];
export function RoomHotspots() {
  const [active, setActive] = useState<string | null>(null);
  const { add } = useShop();
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[28px]">
        <Image src={unsplash("1724582586529-62622e50c0b3")} alt="A styled living room" fill sizes="(min-width:1024px) 60vw, 92vw" className="object-cover" />
        {spots.map((s) => {
          const p = products.find((x) => x.id === s.id)!;
          return (
            <button key={s.id} type="button" onClick={() => setActive(active === s.id ? null : s.id)} aria-expanded={active === s.id} aria-label={`Show ${p.name}`} className="absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <span className="size-3 animate-ping rounded-full bg-[#6B4226]" />
            </button>
          );
        })}
        <AnimatePresence>
          {active ? (() => {
            const s = spots.find((x) => x.id === active)!;
            const p = products.find((x) => x.id === active)!;
            return (
              <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute hidden w-56 rounded-2xl bg-white p-4 shadow-xl md:block" style={{ left: `min(${s.x}%, calc(100% - 15rem))`, top: `calc(${s.y}% + 28px)` }}>
                <p className="font-dd text-lg">{p.name}</p>
                <p className="text-sm text-[#1C1917]/60">from {inr(p.price)}</p>
                <button type="button" onClick={() => add(p.id)} className="mt-3 min-h-10 w-full rounded-full bg-[#1C1917] text-sm font-semibold text-white">Add to quote</button>
              </motion.div>
            );
          })() : null}
        </AnimatePresence>
      </div>
      <ul className="grid content-start gap-3" aria-label="Pieces in this room">
        {spots.map((s) => {
          const p = products.find((x) => x.id === s.id)!;
          return (
            <li key={s.id} className={`flex items-center gap-3 rounded-2xl bg-white p-3 ${active === s.id ? "ring-2 ring-[#6B4226]" : ""}`}>
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl"><Image src={unsplash(p.img)} alt="" fill sizes="64px" className="object-cover" /></div>
              <div className="flex-1"><p className="font-dd">{p.name}</p><p className="text-sm text-[#1C1917]/60">{inr(p.price)}</p></div>
              <button type="button" onClick={() => add(p.id)} className="grid size-10 place-items-center rounded-full bg-[#F5F5F4]" aria-label={`Add ${p.name} to quote`}><Plus className="size-4" /></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type F = "name" | "email" | "phone" | "pin";
function QuoteDrawer() {
  const { quote, setQty, open, setOpen } = useShop();
  const [v, setV] = useState({ name: "", email: "", phone: "", pin: "", notes: "" });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);
  const lines = Object.entries(quote).map(([id, q]) => ({ p: products.find((x) => x.id === id)!, q }));
  const total = lines.reduce((a, l) => a + l.p.price * l.q, 0);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open, setOpen]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, { name: [{ kind: "required" }], email: [{ kind: "required" }, { kind: "email" }], phone: [{ kind: "phone" }], pin: [{ kind: "required" }, { kind: "pattern", re: /^[1-9]\d{5}$/, message: "Enter a 6-digit PIN code." }] });
    setErrors(errs);
    if (hasErrors(errs) || !lines.length) return;
    setDone(formatEnquiry("Quote request — Woodgrain & Co.", { Name: v.name, Email: v.email, Phone: v.phone, "PIN code": v.pin, Items: lines.map((l) => `${l.q} × ${l.p.name} (${inr(l.p.price)})`).join("; "), "Estimated total": inr(total), Notes: v.notes }));
  };
  const inp = "min-h-11 w-full rounded-xl bg-white px-3 ring-1 ring-black/10";
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[85] flex justify-end bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div role="dialog" aria-modal="true" aria-label="Quote list" onClick={(e) => e.stopPropagation()} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 280 }} className="flex h-full w-full max-w-md flex-col bg-[#F5F5F4]">
            <div className="flex items-center justify-between p-5"><p className="font-dd text-2xl">Quote list</p><button type="button" autoFocus onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-black/5" aria-label="Close"><X className="size-5" /></button></div>
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {done ? (
                <DemoResult brand="Woodgrain & Co." industryName="Furniture" demoSlug="furniture" industrySlug="furniture" preview={done} onReset={() => setDone(null)} className="border-black/10 bg-white" channel="email" />
              ) : lines.length === 0 ? (
                <p className="text-[#1C1917]/60">Your list is empty. Add pieces from the catalogue or the 3D configurator.</p>
              ) : (
                <>
                  <ul className="divide-y divide-black/10">
                    {lines.map(({ p, q }) => (
                      <li key={p.id} className="flex items-center gap-3 py-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl"><Image src={unsplash(p.img)} alt="" fill sizes="56px" className="object-cover" /></div>
                        <div className="flex-1"><p className="font-semibold">{p.name}</p><p className="text-sm text-[#1C1917]/60">{inr(p.price)}</p></div>
                        <button type="button" onClick={() => setQty(p.id, q - 1)} className="grid size-8 place-items-center rounded-full bg-white" aria-label={`Fewer ${p.name}`}><Minus className="size-3.5" /></button>
                        <span className="w-4 text-center">{q}</span>
                        <button type="button" onClick={() => setQty(p.id, q + 1)} className="grid size-8 place-items-center rounded-full bg-white" aria-label={`More ${p.name}`}><Plus className="size-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex justify-between font-semibold"><span>Estimated total</span><span>{inr(total)}</span></p>
                  <form onSubmit={submit} noValidate className="mt-6 grid gap-3">
                    {(["name", "email", "phone", "pin"] as F[]).map((k) => (
                      <div key={k}>
                        <label htmlFor={`wq-${k}`} className="mb-1 block text-sm font-semibold">{{ name: "Name", email: "Email", phone: "Phone (optional)", pin: "Delivery PIN code" }[k]}</label>
                        <input id={`wq-${k}`} className={inp} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `wq-${k}-e` : undefined} />
                        {errors[k] ? <p id={`wq-${k}-e`} className="mt-1 text-sm text-[#b42318]">{errors[k]}</p> : null}
                      </div>
                    ))}
                    <label className="text-sm font-semibold">Notes<textarea rows={2} className={`${inp} mt-1 py-2 font-normal`} value={v.notes} onChange={(e) => setV({ ...v, notes: e.target.value })} /></label>
                    <button type="submit" className="min-h-12 rounded-full bg-[#6B4226] font-semibold text-white">Request quotation</button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
