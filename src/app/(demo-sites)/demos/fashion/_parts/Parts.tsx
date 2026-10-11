"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { unsplash, unsplashSized } from "@/lib/media";

const CurvedGallery = dynamic(() => import("@/components/three/CurvedGallery"), { ssr: false });
import { waLink } from "@/lib/whatsapp";

type Cur = "INR" | "USD" | "GBP";
const RATES: Record<Cur, { sym: string; k: number }> = { INR: { sym: "₹", k: 1 }, USD: { sym: "$", k: 1 / 83 }, GBP: { sym: "£", k: 1 / 105 } };
const fmt = (inr: number, c: Cur) => (c === "INR" ? `₹${inr.toLocaleString("en-IN")}` : `${RATES[c].sym}${Math.round(inr * RATES[c].k)}`);

type P = { id: string; name: string; cat: string; price: number; img: string; img2: string; colors: string[]; soldOut: string[]; isNew?: boolean };
const products: P[] = [
  { id: "a1", name: "Noor silk saree", cat: "Occasion", price: 24500, img: "1727430228383-aa1fb59db8bf", img2: "1617627143750-d86bc21e42bb", colors: ["#9f1239", "#ca8a04"], soldOut: [], isNew: true },
  { id: "a2", name: "Jade Kanjeevaram", cat: "Occasion", price: 32000, img: "1679006831648-7c9ea12e5807", img2: "1631005436794-ccaa79de61ba", colors: ["#3f6f5e"], soldOut: [], isNew: true },
  { id: "a3", name: "Chikan kurta set", cat: "Everyday", price: 6800, img: "1708534419572-6e6614a53ca1", img2: "1708534246055-d7b149acb731", colors: ["#6b1d2a", "#f5f0e6"], soldOut: ["XS"], isNew: true },
  { id: "a4", name: "Monsoon tunic", cat: "Everyday", price: 4200, img: "1622049605334-72e1e4432346", img2: "1689147782410-8630824fffa6", colors: ["#be185d", "#1e3a8a"], soldOut: ["XXL"] },
  { id: "a5", name: "Block-print co-ord", cat: "Everyday", price: 5600, img: "1507434745378-235a6297156b", img2: "1773846012458-e6a66c26e49f", colors: ["#b45309", "#0f766e"], soldOut: [] },
  { id: "a6", name: "Rose georgette saree", cat: "Festive", price: 14800, img: "1617627143750-d86bc21e42bb", img2: "1727430228383-aa1fb59db8bf", colors: ["#db2777"], soldOut: ["S"], isNew: true },
  { id: "a7", name: "Ivory blazer dress", cat: "Festive", price: 11200, img: "1571513800374-df1bbe650e56", img2: "1580478491436-fd6a937acc9e", colors: ["#f5f0e6", "#7f1d1d"], soldOut: [] },
  { id: "a8", name: "Garnet zari dupatta set", cat: "Festive", price: 9800, img: "1631005436794-ccaa79de61ba", img2: "1622049605334-72e1e4432346", colors: ["#7f1d1d"], soldOut: ["M"] },
];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

type Line = { id: string; size: string; qty: number };
const Ctx = createContext<{ cur: Cur; setCur: (c: Cur) => void; bag: Line[]; add: (l: Omit<Line, "qty">) => void; setQty: (i: number, q: number) => void; open: boolean; setOpen: (b: boolean) => void }>(null!);
const useShop = () => useContext(Ctx);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cur, setCur] = useState<Cur>("INR");
  const [bag, setBag] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({
    cur, setCur, bag, open, setOpen,
    add: (l: Omit<Line, "qty">) => setBag((b) => { const i = b.findIndex((x) => x.id === l.id && x.size === l.size); if (i >= 0) return b.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x)); return [...b, { ...l, qty: 1 }]; }),
    setQty: (i: number, q: number) => setBag((b) => (q <= 0 ? b.filter((_, j) => j !== i) : b.map((x, j) => (j === i ? { ...x, qty: q } : x)))),
  }), [cur, bag, open]);
  return <Ctx.Provider value={value}>{children}<Bag /></Ctx.Provider>;
}

export function HeaderActions() {
  const { cur, setCur, bag, setOpen } = useShop();
  const n = bag.reduce((a, l) => a + l.qty, 0);
  return (
    <div className="flex items-center gap-1">
      <label className="sr-only" htmlFor="mi-cur">Currency</label>
      <select id="mi-cur" value={cur} onChange={(e) => setCur(e.target.value as Cur)} className="min-h-10 bg-transparent px-1 text-xs tracking-widest">
        <option value="INR">₹ INR</option><option value="USD">$ USD</option><option value="GBP">£ GBP</option>
      </select>
      <button type="button" onClick={() => setOpen(true)} className="relative grid size-11 place-items-center" aria-label={`Shopping bag, ${n} items`}>
        <ShoppingBag className="size-5" aria-hidden />
        {n ? <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-[#BE185D] text-[10px] font-bold text-white">{n}</span> : null}
      </button>
    </div>
  );
}

export function Lookbook() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);
  const looks = [["1727430228383-aa1fb59db8bf", "Look 01 — Noor saree, temple gold"], ["1708534419572-6e6614a53ca1", "Look 02 — Chikan, wine"], ["1679006831648-7c9ea12e5807", "Look 03 — Jade Kanjeevaram"], ["1571513800374-df1bbe650e56", "Look 04 — Ivory, pared back"], ["1622049605334-72e1e4432346", "Look 05 — Monsoon print"], ["1631005436794-ccaa79de61ba", "Look 06 — Garnet zari"]];
  return (
    <section id="lookbook" ref={ref} className="relative h-[300vh] scroll-mt-0 bg-[#0A0A0A] text-white" aria-labelledby="lb-h">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <h2 id="lb-h" className="px-5 font-dd text-5xl italic md:px-12 md:text-8xl">The Monsoon Edit</h2>
        <motion.ol style={{ x }} className="mt-10 flex gap-6 pl-5 md:pl-12">
          {looks.map(([id, cap]) => (
            <li key={id} className="w-[70vw] shrink-0 md:w-[30vw]">
              <div className="relative aspect-[3/4] overflow-hidden"><Image src={unsplash(id)} alt={cap} fill sizes="(min-width:768px) 30vw, 70vw" className="object-cover" /></div>
              <p className="mt-3 text-sm tracking-wide text-white/70">{cap}</p>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

export function NewArrivals() {
  const { cur } = useShop();
  const [cat, setCat] = useState("All");
  const [qv, setQv] = useState<P | null>(null);
  const list = cat === "All" ? products : products.filter((p) => p.cat === cat);
  return (
    <>
      <div role="group" aria-label="Filter" className="flex flex-wrap gap-6 text-xs tracking-[0.2em]">
        {["All", "Festive", "Everyday", "Occasion"].map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`min-h-10 border-b-2 ${cat === c ? "border-[#0A0A0A]" : "border-transparent text-black/45"}`}>{c.toUpperCase()}</button>)}
      </div>
      <motion.ul layout className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li layout key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={i % 4 === 1 ? "lg:mt-16" : i % 4 === 3 ? "lg:mt-8" : ""}>
              <button type="button" onClick={() => setQv(p)} className="group block w-full text-left" aria-label={`Quick view ${p.name}`}>
                <motion.div layoutId={`img-${p.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
                  <Image src={unsplash(p.img)} alt={p.name} fill sizes="(min-width:1024px) 24vw, 48vw" className="object-cover transition duration-700 group-hover:opacity-0" />
                  <Image src={unsplash(p.img2)} alt="" fill sizes="(min-width:1024px) 24vw, 48vw" className="object-cover opacity-0 transition duration-700 group-hover:opacity-100" />
                  {p.isNew ? <span className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] tracking-[0.2em]">NEW</span> : null}
                </motion.div>
                <p className="mt-3 text-sm">{p.name}</p>
                <p className="text-sm text-black/60">{fmt(p.price, cur)}</p>
                <span className="mt-2 flex gap-1.5" aria-label={`${p.colors.length} colours`}>{p.colors.map((c) => <span key={c} className="size-3 rounded-full ring-1 ring-black/15" style={{ background: c }} />)}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <AnimatePresence>{qv ? <QuickView key={qv.id} p={qv} onClose={() => setQv(null)} /> : null}</AnimatePresence>
    </>
  );
}

function QuickView({ p, onClose }: { p: P; onClose: () => void }) {
  const { cur, add, setOpen } = useShop();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(p.colors[0]);
  const [guide, setGuide] = useState(false);
  const [err, setErr] = useState(false);
  const [care, setCare] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (guide) setGuide(false);
      else onClose();
    };
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [onClose, guide]);
  return (
    <motion.div className="fixed inset-0 z-[80] grid place-items-end bg-black/50 md:place-items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()} className="grid max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-white md:grid-cols-2">
        <motion.div layoutId={`img-${p.id}`} className="relative aspect-[3/4]"><Image src={unsplash(p.img)} alt={p.name} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /></motion.div>
        <div className="p-6 md:p-10">
          <div className="flex justify-between"><h3 className="font-dd text-3xl">{p.name}</h3><button type="button" autoFocus onClick={onClose} className="grid size-10 place-items-center" aria-label="Close"><X className="size-5" /></button></div>
          <p className="mt-2 text-lg">{fmt(p.price, cur)}</p>
          <fieldset className="mt-6"><legend className="text-xs tracking-[0.2em]">COLOUR</legend>
            <div className="mt-2 flex gap-2">{p.colors.map((c) => <button key={c} type="button" aria-pressed={color === c} aria-label={`Colour ${c}`} onClick={() => setColor(c)} className={`size-9 rounded-full ring-offset-2 ${color === c ? "ring-2 ring-black" : "ring-1 ring-black/15"}`} style={{ background: c }} />)}</div>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="flex w-full justify-between text-xs tracking-[0.2em]">SIZE</legend>
            <button type="button" onClick={() => setGuide(true)} className="float-right -mt-5 text-xs underline">Size guide</button>
            <div className="mt-2 grid grid-cols-6 gap-1.5">{SIZES.map((s) => { const out = p.soldOut.includes(s); return <button key={s} type="button" disabled={out} aria-pressed={size === s} onClick={() => { setSize(s); setErr(false); }} className={`min-h-11 text-sm ring-1 ${size === s ? "bg-black text-white ring-black" : "ring-black/20"} disabled:text-black/25 disabled:line-through`} aria-label={out ? `${s}, sold out` : s}>{s}</button>; })}</div>
            {err ? <p role="alert" className="mt-2 text-sm text-[#BE185D]">Please choose a size.</p> : null}
          </fieldset>
          <button type="button" onClick={() => { if (!size) return setErr(true); add({ id: p.id, size }); onClose(); setOpen(true); }} className="mt-6 min-h-13 w-full bg-black text-xs tracking-[0.25em] text-white">ADD TO BAG</button>
          <div className="mt-6 border-t border-black/10">
            <button type="button" aria-expanded={care} onClick={() => setCare(!care)} className="flex min-h-12 w-full items-center justify-between text-xs tracking-[0.2em]">FABRIC &amp; CARE {care ? <Minus className="size-4" /> : <Plus className="size-4" />}</button>
            {care ? <p className="pb-4 text-sm text-black/65">Handwoven in Varanasi and Kanchipuram. Dry clean only. Store folded in muslin, away from direct sunlight.</p> : null}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {guide ? (
          <motion.div className="fixed inset-0 z-[85] grid place-items-center bg-black/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { e.stopPropagation(); setGuide(false); }}>
            <div role="dialog" aria-modal="true" aria-label="Size guide" onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-white p-6">
              <div className="flex justify-between"><p className="font-dd text-2xl">Size guide</p><button type="button" autoFocus onClick={() => setGuide(false)} className="grid size-10 place-items-center" aria-label="Close size guide"><X className="size-5" /></button></div>
              <table className="mt-4 w-full text-sm"><thead><tr className="text-left text-black/55"><th className="py-2">Size</th><th>Bust (in)</th><th>Waist (in)</th></tr></thead><tbody>{SIZES.map((s, i) => <tr key={s} className="border-t border-black/10"><td className="py-2">{s}</td><td>{32 + i * 2}</td><td>{26 + i * 2}</td></tr>)}</tbody></table>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function Bag() {
  const { bag, setQty, open, setOpen, cur } = useShop();
  const lines = bag.map((l) => ({ ...l, p: products.find((x) => x.id === l.id)! }));
  const total = lines.reduce((a, l) => a + l.p.price * l.qty, 0);
  const msg = ["[Demo order from Maison Ira website]", "", ...lines.map((l) => `${l.qty} × ${l.p.name} (size ${l.size}) — ${fmt(l.p.price * l.qty, cur)}`), "", `Total: ${fmt(total, cur)}`].join("\n");
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, setOpen]);
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[85] flex justify-end bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={(e) => e.stopPropagation()} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 280 }} className="flex h-full w-full max-w-md flex-col bg-white">
            <div className="flex items-center justify-between border-b border-black/10 p-5"><p className="text-xs tracking-[0.25em]">YOUR BAG</p><button type="button" autoFocus onClick={() => setOpen(false)} className="grid size-10 place-items-center" aria-label="Close bag"><X className="size-5" /></button></div>
            <ul className="flex-1 divide-y divide-black/10 overflow-y-auto p-5">
              {lines.length ? lines.map((l, i) => (
                <li key={`${l.id}${l.size}`} className="flex gap-4 py-4">
                  <div className="relative h-24 w-18 shrink-0 overflow-hidden bg-[#f4f4f4]"><Image src={unsplash(l.p.img)} alt="" fill sizes="72px" className="object-cover" /></div>
                  <div className="flex-1"><p className="text-sm">{l.p.name}</p><p className="text-xs text-black/55">Size {l.size}</p><p className="mt-1 text-sm">{fmt(l.p.price * l.qty, cur)}</p></div>
                  <div className="flex items-center gap-1"><button type="button" onClick={() => setQty(i, l.qty - 1)} className="grid size-8 place-items-center ring-1 ring-black/15" aria-label="Fewer"><Minus className="size-3" /></button><span className="w-5 text-center text-sm">{l.qty}</span><button type="button" onClick={() => setQty(i, l.qty + 1)} className="grid size-8 place-items-center ring-1 ring-black/15" aria-label="More"><Plus className="size-3" /></button></div>
                </li>
              )) : <li className="text-sm text-black/55">Your bag is empty.</li>}
            </ul>
            <div className="border-t border-black/10 p-5">
              <p className="flex justify-between"><span>Subtotal</span><span>{fmt(total, cur)}</span></p>
              <p className="mt-1 text-xs text-black/50">Card payments are available in the live store version. Demo: WhatsApp checkout sends a labelled sample order to the website developer.</p>
              <a href={lines.length ? waLink(msg) : undefined} aria-disabled={!lines.length} target="_blank" rel="noopener noreferrer" className={`mt-4 flex min-h-13 items-center justify-center gap-2 text-xs tracking-[0.2em] text-white ${lines.length ? "bg-black" : "pointer-events-none bg-black/30"}`}><WhatsAppIcon className="size-4" /> CHECKOUT ON WHATSAPP</a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState<string | null>(null);
  if (done) return <DemoResult brand="Maison Ira" industryName="Fashion" demoSlug="fashion" industrySlug="fashion" preview={done} onReset={() => setDone(null)} className="border-black/10 bg-white text-left" channel="mailing list" />;
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setErr("Enter a valid email address."); setDone(formatEnquiry("New subscriber — Maison Ira", { Email: email, Source: "Website footer" })); }} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
      <label htmlFor="mi-email" className="sr-only">Email address</label>
      <input id="mi-email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} placeholder="Your email" aria-invalid={!!err} aria-describedby={err ? "mi-e" : undefined} className="min-h-12 flex-1 bg-white px-4 ring-1 ring-black/15" />
      <button type="submit" className="min-h-12 bg-black px-6 text-xs tracking-[0.2em] text-white">SUBSCRIBE</button>
      {err ? <p id="mi-e" role="alert" className="text-sm text-[#BE185D] sm:absolute sm:mt-14">{err}</p> : null}
    </form>
  );
}

/** 3D lookbook: stand inside a ring of looks, drag to browse, tap one to shop it. */
export function LookbookRing() {
  const [qv, setQv] = useState<P | null>(null);
  return (
    <>
      <Scene3DGate
        className="h-[75vh] min-h-[460px] w-full overflow-hidden"
        render={(ready) => <CurvedGallery portrait images={products.map((p) => unsplashSized(p.img, 700))} background="#f4f1ec" onOpen={(i) => setQv(products[i])} onReady={ready} />}
        fallback={<Image src={unsplash(products[0].img)} alt={products[0].name} fill sizes="100vw" className="object-cover" />}
      />
      <AnimatePresence>{qv ? <QuickView key={qv.id} p={qv} onClose={() => setQv(null)} /> : null}</AnimatePresence>
    </>
  );
}
