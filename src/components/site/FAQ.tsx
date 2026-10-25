"use client";

import { ChevronDown, Plus } from "lucide-react";
import { useId, useState } from "react";

export type QA = { q: string; a: string };

/** How many questions phones show before "Show all questions" (the "cards" variant only). */
const MOBILE_VISIBLE = 5;

/**
 * Accordion. `plain` (default) is the divider list the demos use; `cards` is the main-site style:
 * numbered rounded cards, the open one highlighted, and a shorter list on phones.
 */
export function FAQ({ items, variant = "plain" }: { items: QA[]; variant?: "plain" | "cards" }) {
  const [open, setOpen] = useState<number | null>(0);
  const [all, setAll] = useState(false);
  const base = useId();
  const cards = variant === "cards";

  return (
    <div className={cards ? "space-y-2.5" : "divide-y divide-muted border-y border-muted"}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const hiddenOnPhone = cards && !all && i >= MOBILE_VISIBLE;
        return (
          <div
            key={it.q}
            className={
              cards
                ? `${hiddenOnPhone ? "hidden sm:block" : ""} rounded-2xl ring-1 transition-colors duration-300 ${
                    isOpen ? "bg-surface ring-accent/50 shadow-[0_18px_50px_-30px_var(--color-accent)]" : "bg-surface/50 ring-ink/10 hover:ring-ink/25"
                  }`
                : undefined
            }
          >
            <h3>
              <button
                type="button"
                id={`${base}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={
                  cards
                    ? "flex w-full items-center gap-3 px-4 py-3.5 text-left font-display text-[15px] leading-snug font-medium sm:gap-4 sm:px-6 sm:py-5 sm:text-lg"
                    : "flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium"
                }
              >
                {cards ? (
                  <span className={`hidden w-7 shrink-0 font-display text-sm font-semibold tabular-nums sm:block ${isOpen ? "text-accent" : "text-ink-3"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className={cards ? "flex-1" : undefined}>{it.q}</span>
                {cards ? (
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full transition duration-300 ${isOpen ? "rotate-45 bg-accent text-on-accent" : "bg-ink/5"}`}>
                    <Plus className="size-4" aria-hidden />
                  </span>
                ) : (
                  <Plus className={`size-5 shrink-0 transition duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden />
                )}
              </button>
            </h3>
            {/* Every answer is always in the HTML (so search engines and Ctrl+F can read it); closed ones are only collapsed visually. */}
            <div
              id={`${base}-p${i}`}
              role="region"
              aria-labelledby={`${base}-b${i}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className={cards ? "max-w-3xl px-4 pb-4 text-sm leading-relaxed text-ink-2 sm:pr-16 sm:pb-6 sm:pl-[68px] sm:text-base" : "max-w-3xl pb-6 leading-relaxed text-ink-2"}>
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      {cards && !all && items.length > MOBILE_VISIBLE ? (
        <button
          type="button"
          onClick={() => setAll(true)}
          className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-2xl text-sm font-semibold text-ink-2 ring-1 ring-ink/10 sm:hidden"
        >
          Show all {items.length} questions <ChevronDown className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
