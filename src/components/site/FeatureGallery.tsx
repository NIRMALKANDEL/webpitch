"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { demoBySlug } from "@/data/demos";
import { type FeatureCategory, featureCategories, features } from "@/data/features";
import { FeatureMedia } from "./FeatureMedia";

export function FeatureGallery() {
  const [cat, setCat] = useState<FeatureCategory | "all">("all");
  const [picked, setPicked] = useState<string[]>([]);
  const list = cat === "all" ? features : features.filter((f) => f.category === cat);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const contactHref = `/contact?features=${encodeURIComponent(picked.map((id) => features.find((f) => f.id === id)!.title).join(", "))}`;

  return (
    <>
      <div role="group" aria-label="Filter features" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {featureCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`min-h-10 shrink-0 rounded-full border px-4 text-sm transition ${
              cat === c.id ? "border-ink bg-ink text-paper" : "border-muted bg-surface text-ink-2 hover:border-ink/30"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((f) => {
            const demo = demoBySlug(f.demo)!;
            const on = picked.includes(f.id);
            return (
              <motion.li
                key={f.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className={`grid grid-cols-[36%_1fr] overflow-hidden rounded-[14px] border bg-surface transition sm:flex sm:flex-col ${on ? "border-accent ring-2 ring-accent/20" : "border-muted"}`}
              >
                <div className="relative h-full min-h-32 overflow-hidden bg-ink/5 sm:aspect-[16/10] sm:h-auto">
                  <FeatureMedia feature={f} alt={f.title} />
                  {f.media.kind === "live3d" ? (
                    <span className="absolute top-2 left-2 rounded-full bg-surface/90 px-2 py-0.5 text-[10px] font-semibold sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[11px]">Live 3D</span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[15px] leading-snug font-semibold sm:text-lg">{f.title}</h3>
                    <span className="hidden shrink-0 rounded-full bg-ink/5 px-2.5 py-1 text-[11px] text-ink-2 sm:inline">{f.pkg}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-ink-2 sm:mt-2 sm:text-sm sm:leading-relaxed">{f.benefit}</p>
                  <p className="mt-2 hidden text-xs text-ink-3 sm:block">In the {demo.brand} demo</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3 sm:gap-2 sm:pt-5">
                    <Link
                      href={`/demos/${f.demo}${f.anchor ? `#${f.anchor}` : ""}`}
                      className="inline-flex min-h-9 items-center gap-1 rounded-full bg-ink px-3 text-xs font-semibold text-paper sm:min-h-10 sm:gap-1.5 sm:px-4 sm:text-sm"
                    >
                      Try it live <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(f.id)}
                      className={`inline-flex min-h-9 items-center gap-1 rounded-full border px-3 text-xs font-semibold transition sm:min-h-10 sm:gap-1.5 sm:px-4 sm:text-sm ${
                        on ? "border-accent bg-accent-soft text-accent" : "border-ink/15 hover:border-ink/40"
                      }`}
                    >
                      {on ? <Check className="size-4" aria-hidden /> : null}
                      {on ? "Added" : "I want this"}
                    </button>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {picked.length > 0 ? (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed inset-x-3 bottom-20 z-40 mx-auto flex max-w-xl items-center justify-between gap-3 rounded-full bg-night py-2 pr-2 pl-5 text-white ring-1 ring-white/10 shadow-2xl sm:bottom-6"
            role="status"
          >
            <p className="text-sm">
              {picked.length} feature{picked.length === 1 ? "" : "s"} picked
            </p>
            <Link href={contactHref} className="inline-flex min-h-10 items-center rounded-full bg-surface px-4 text-sm font-semibold text-ink">
              Ask for these features
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
