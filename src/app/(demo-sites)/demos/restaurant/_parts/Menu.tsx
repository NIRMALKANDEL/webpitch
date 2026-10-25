"use client";

import { Flame, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { unsplash } from "@/lib/media";
import { useCart } from "./Cart";
import { inr, menu, menuCats } from "./data";

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-grid size-4 shrink-0 place-items-center border-2 bg-white ${veg ? "border-[#1f7a3a]" : "border-[#B3261E]"}`}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      role="img"
    >
      <span className={`size-1.5 rounded-full ${veg ? "bg-[#1f7a3a]" : "bg-[#B3261E]"}`} />
    </span>
  );
}

const badgeStyle: Record<string, string> = {
  Popular: "bg-[#E3A21A] text-[#1b1b1b]",
  "Chef's pick": "bg-[#B3261E] text-white",
  New: "bg-[#12372A] text-white",
};

export function Menu() {
  const [cat, setCat] = useState<string>(menuCats[0]);
  const [vegOnly, setVegOnly] = useState(false);
  const [q, setQ] = useState("");
  const { add, dec, items, setOpen, count } = useCart();
  const query = q.trim().toLowerCase();
  const list = menu.filter((m) => (query ? `${m.name} ${m.desc}`.toLowerCase().includes(query) : m.cat === cat) && (!vegOnly || m.veg));
  const total = Object.entries(items).reduce((s, [id, n]) => s + (menu.find((m) => m.id === id)?.price ?? 0) * n, 0);

  return (
    <div>
      {/* Category bar stays visible while scrolling the menu */}
      <div className="sticky top-16 z-30 -mx-4 bg-[#FFF6E5]/95 px-4 py-3 backdrop-blur md:top-20 md:mx-0 md:rounded-2xl md:px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div role="tablist" aria-label="Menu categories" className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
            {menuCats.map((c) => (
              <button
                key={c}
                role="tab"
                type="button"
                aria-selected={!query && cat === c}
                onClick={() => {
                  setCat(c);
                  setQ("");
                }}
                className={`relative min-h-11 shrink-0 rounded-full px-4 text-[15px] font-bold transition ${!query && cat === c ? "text-white" : "bg-white text-[#12372A] hover:bg-[#12372A]/10"}`}
              >
                {!query && cat === c ? <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-[#12372A]" transition={{ type: "spring", stiffness: 400, damping: 32 }} /> : null}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="relative flex-1 md:w-56 md:flex-none">
              <span className="sr-only">Search the menu</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black/45" aria-hidden />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dishes" className="min-h-11 w-full rounded-full bg-white pr-9 pl-9 text-[15px] ring-1 ring-black/10 focus:ring-2 focus:ring-[#E3A21A] focus:outline-none" />
              {q ? (
                <button type="button" onClick={() => setQ("")} className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full hover:bg-black/5" aria-label="Clear search">
                  <X className="size-4" />
                </button>
              ) : null}
            </label>
            <label className="flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold">
              Veg
              <button type="button" role="switch" aria-checked={vegOnly} aria-label="Vegetarian only" onClick={() => setVegOnly((v) => !v)} className={`relative h-7 w-12 rounded-full transition ${vegOnly ? "bg-[#1f7a3a]" : "bg-black/20"}`}>
                <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${vegOnly ? "left-6" : "left-1"}`} />
              </button>
            </label>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{list.length} dishes shown</p>
      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((m) => {
            const qty = items[m.id] ?? 0;
            return (
              <motion.article
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={`group flex gap-4 overflow-hidden rounded-3xl bg-white p-3 shadow-[0_10px_30px_-18px_rgba(18,55,42,0.45)] ring-2 transition ${qty ? "ring-[#E3A21A]" : "ring-transparent hover:ring-[#12372A]/15"}`}
              >
                <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl bg-[#FFF6E5]">
                  {m.img ? <Image src={unsplash(m.img)} alt={m.name} fill sizes="112px" className="object-cover transition duration-500 group-hover:scale-110" /> : null}
                  {m.badge ? <span className={`absolute top-1.5 left-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeStyle[m.badge]}`}>{m.badge}</span> : null}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="flex items-start gap-2 text-[17px] leading-snug font-bold">
                    <VegMark veg={m.veg} />
                    <span>{m.name}</span>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-black/65">{m.desc}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <span className="flex items-center gap-2">
                      <span className="font-dd text-lg text-[#B3261E]">{inr(m.price)}</span>
                      {m.spice > 0 ? (
                        <span className="flex text-[#B3261E]" aria-label={`Spice level ${m.spice} of 3`} role="img">
                          {Array.from({ length: m.spice }).map((_, i) => <Flame key={i} className="size-3.5" aria-hidden />)}
                        </span>
                      ) : null}
                    </span>
                    {qty ? (
                      <span className="flex items-center gap-1 rounded-full bg-[#12372A] p-1 text-white">
                        <button type="button" onClick={() => dec(m.id)} className="grid size-8 place-items-center rounded-full hover:bg-white/15" aria-label={`Remove one ${m.name}`}><Minus className="size-4" /></button>
                        <span className="w-5 text-center font-bold" aria-live="polite">{qty}</span>
                        <button type="button" onClick={() => add(m.id)} className="grid size-8 place-items-center rounded-full hover:bg-white/15" aria-label={`Add one more ${m.name}`}><Plus className="size-4" /></button>
                      </span>
                    ) : (
                      <motion.button whileTap={{ scale: 0.9 }} type="button" onClick={() => add(m.id)} className="inline-flex min-h-10 items-center gap-1 rounded-full bg-[#E3A21A] px-4 text-sm font-bold text-[#1b1b1b] transition hover:bg-[#f2b22a]" aria-label={`Add ${m.name} to order`}>
                        <Plus className="size-4" aria-hidden /> Add
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 ? <p className="py-6 text-black/60">No dishes match. Try another search or turn off Veg only.</p> : null}

      {/* Floating order summary (desktop; mobile uses the sticky action bar) */}
      <AnimatePresence>
        {count > 0 ? (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed right-6 bottom-20 z-40 hidden min-h-14 items-center gap-3 rounded-full bg-[#12372A] py-2 pr-6 pl-2 font-bold text-white shadow-2xl shadow-[#12372A]/40 md:inline-flex"
          >
            <span className="grid size-10 place-items-center rounded-full bg-[#E3A21A] text-[#1b1b1b]"><ShoppingBag className="size-5" aria-hidden /></span>
            View order ({count}) · {inr(total)}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
