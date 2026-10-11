"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const steps = [
  { title: "Free 20-minute call", time: "Day 1", text: "On WhatsApp, Google Meet or Zoom, at a time that suits your time zone. You tell me about your business; I tell you what I'd build and what it costs." },
  { title: "Pick a demo and customise", time: "Day 1–2", text: "We start from the demo you liked and decide on your colours, sections and features. You get a fixed quote and a date." },
  { title: "You send content, I design", time: "Day 2–5", text: "Send your logo, photos, prices and text. I design your homepage first so you can see the direction early." },
  { title: "Build and review", time: "Week 1–3", text: "I build the full site and share a private preview link. Two or three rounds of changes are included." },
  { title: "Launch and handover", time: "Launch day", text: "I connect your domain, test everything on real phones and hand over all access. You own it all." },
];

/**
 * Desktop: a connected five-step timeline with every detail visible.
 * Phones: compact cards; tap one to read its details.
 */
export function Process() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ol className="relative grid gap-2.5 md:grid-cols-5 md:gap-4">
      <span aria-hidden className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-accent via-accent-2 to-accent opacity-40 md:block" />
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.title} className="relative flex flex-col">
            <span
              aria-hidden
              className="relative z-10 mx-auto mb-5 hidden size-12 place-items-center rounded-full bg-paper font-display text-sm font-semibold text-accent ring-1 ring-accent/40 shadow-[0_0_0_6px_var(--color-paper)] md:grid"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={`flex-1 rounded-2xl bg-surface ring-1 transition md:p-5 md:hover:-translate-y-1 md:hover:ring-accent/40 ${isOpen ? "ring-accent/50" : "ring-ink/10"}`}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-4 py-3 text-left md:pointer-events-none md:block md:p-0"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-xs font-semibold text-accent md:hidden">
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[15px] leading-snug font-semibold md:text-lg">{s.title}</span>
                  <span className="mt-0.5 inline-block text-xs text-ink-3 md:mt-2 md:rounded-full md:bg-accent-soft md:px-2.5 md:py-0.5 md:font-semibold md:text-accent">
                    {s.time}
                  </span>
                </span>
                <ChevronDown className={`size-4 shrink-0 text-ink-3 transition md:hidden ${isOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              <p className={`px-4 pb-4 text-sm leading-relaxed text-ink-2 md:mt-3 md:block md:p-0 ${isOpen ? "block" : "hidden"}`}>{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
