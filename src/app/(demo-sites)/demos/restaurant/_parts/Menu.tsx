"use client";

import { Flame, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "./Cart";
import { gbp, menu, menuCats } from "./data";

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-grid size-4 shrink-0 place-items-center border-2 ${veg ? "border-[#1f7a3a]" : "border-[#B3261E]"}`}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      role="img"
    >
      <span className={`size-1.5 rounded-full ${veg ? "bg-[#1f7a3a]" : "bg-[#B3261E]"}`} />
    </span>
  );
}

export function Menu() {
  const [cat, setCat] = useState<string>(menuCats[0]);
  const [vegOnly, setVegOnly] = useState(false);
  const { add, items, setOpen, count } = useCart();
  const list = menu.filter((m) => m.cat === cat && (!vegOnly || m.veg));

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:px-0">
          {menuCats.map((c) => (
            <button
              key={c}
              role="tab"
              type="button"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`relative min-h-11 shrink-0 px-4 text-[15px] font-semibold transition ${cat === c ? "text-[#12372A]" : "text-black/55 hover:text-black"}`}
            >
              {c}
              {cat === c ? <motion.span layoutId="menu-underline" className="absolute inset-x-3 bottom-1 h-[3px] rounded-full bg-[#E3A21A]" /> : null}
            </button>
          ))}
        </div>
        <label className="flex min-h-11 items-center gap-3 self-start text-sm font-semibold md:self-auto">
          <span>Veg only</span>
          <button
            type="button"
            role="switch"
            aria-checked={vegOnly}
            onClick={() => setVegOnly((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition ${vegOnly ? "bg-[#1f7a3a]" : "bg-black/15"}`}
          >
            <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${vegOnly ? "left-6" : "left-1"}`} />
          </button>
        </label>
      </div>

      <div role="tabpanel" aria-label={cat} className="mt-6 grid gap-x-10 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start justify-between gap-4 border-b border-dashed border-black/15 py-5"
            >
              <div>
                <p className="flex items-center gap-2 text-lg font-bold">
                  <VegMark veg={m.veg} /> {m.name}
                  {m.spice > 0 ? (
                    <span className="flex text-[#B3261E]" aria-label={`Spice level ${m.spice} of 3`} role="img">
                      {Array.from({ length: m.spice }).map((_, i) => (
                        <Flame key={i} className="size-3.5" aria-hidden />
                      ))}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-[15px] text-black/60">{m.desc}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="font-dd text-lg">{gbp(m.price)}</span>
                <button
                  type="button"
                  onClick={() => add(m.id)}
                  className="inline-flex min-h-9 items-center gap-1 rounded-full border-2 border-[#12372A] px-3 text-sm font-bold text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
                  aria-label={`Add ${m.name} to order`}
                >
                  <Plus className="size-4" aria-hidden /> {items[m.id] ? items[m.id] : "Add"}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {list.length === 0 ? <p className="py-6 text-black/60">No vegetarian dishes in this section. Try Grills or Curries.</p> : null}
      </div>

      <AnimatePresence>
        {count > 0 ? (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#E3A21A] px-6 font-bold text-[#1b1b1b]"
          >
            View order ({count}) and send on WhatsApp
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
