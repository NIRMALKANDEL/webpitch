"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Price } from "@/components/shared/Price";
import { useCurrency } from "@/components/shared/currency-store";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
// ─────────────────────────────────────────────────────────────────────────────
// PRICES ARE NOT SET HERE. To change any price, edit src/data/pricing.ts:
//   • packages[].prices   → the four package cards below (one number per currency)
//   • carePlans[].prices  → the monthly "care plan" amount shown with the toggle
//   • packages[].includes → the tick list on each card
// ─────────────────────────────────────────────────────────────────────────────
import { carePlans, packages } from "@/data/pricing";
import { formatPrice } from "@/lib/currency";
import { waLink, waMessages } from "@/lib/whatsapp";

const accents: Record<string, string> = {
  starter: "from-sky-400 to-cyan-300",
  business: "from-accent to-accent-2",
  premium: "from-amber-400 to-pink-500",
  store: "from-emerald-400 to-lime-300",
};

export function PricingCards({ highlight }: { highlight?: string }) {
  const cur = useCurrency();
  const [care, setCare] = useState(false);
  const plan = carePlans[0];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8">
        <div role="radiogroup" aria-label="Pricing option" className="inline-flex rounded-full bg-surface p-1 ring-1 ring-ink/10">
          {[
            [false, "One-time build"],
            [true, "Build + care plan"],
          ].map(([v, label]) => (
            <button
              key={String(v)}
              type="button"
              role="radio"
              aria-checked={care === v}
              onClick={() => setCare(v as boolean)}
              className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${care === v ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"}`}
            >
              {label as string}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink-3">
          {care ? (
            <>Updates, backups and monthly edits, so you never touch the code.</>
          ) : (
            <>Pay once. You own the site, domain and content.</>
          )}
        </p>
      </div>

      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:py-0 xl:grid-cols-4">
        {packages.map((p) => {
          const featured = highlight ? p.id === highlight : p.featured;
          return (
            <div
              key={p.id}
              id={p.id}
              className={`group relative flex w-[84%] shrink-0 snap-center flex-col rounded-[22px] p-px transition duration-300 sm:w-auto sm:hover:-translate-y-1.5 ${
                featured ? "bg-gradient-to-b from-accent via-accent-2 to-transparent shadow-[0_30px_80px_-30px_var(--color-accent)] xl:-my-3" : "bg-ink/10"
              }`}
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[21px] bg-surface p-5 sm:p-6">
                <div aria-hidden className={`pointer-events-none absolute -top-24 -right-16 size-48 rounded-full bg-gradient-to-br opacity-25 blur-3xl transition duration-500 group-hover:opacity-50 ${accents[p.id]}`} />
                {featured ? (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-volt px-2.5 py-1 text-[11px] font-bold text-[#0b0b0f]">
                    <Sparkles className="size-3" aria-hidden /> {highlight ? "Best for you" : "Most chosen"}
                  </span>
                ) : null}
                <span className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${accents[p.id]}`} aria-hidden />
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-ink-3">{p.tagline}</p>

                <div className="mt-6">
                  <p className="flex items-baseline gap-1.5">
                    <span className="text-sm text-ink-3">from</span>
                    <Price prices={p.prices} className="font-display text-[44px] leading-none font-semibold tracking-tight" />
                  </p>
                  <p className="mt-2 min-h-5 text-sm text-ink-2">
                    {care ? (
                      <>
                        + <Price prices={plan.prices} className="font-semibold text-ink" /> / month care
                      </>
                    ) : (
                      <>one-time · {p.timeline}</>
                    )}
                  </p>
                </div>

                <ul className="mt-5 space-y-2 border-t border-ink/10 pt-5 text-sm sm:mt-6 sm:space-y-2.5 sm:pt-6">
                  {(care ? [...p.includes.slice(0, 5), ...plan.includes] : p.includes).map((inc) => (
                    <li key={inc} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                      <span className="text-ink-2">{inc}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto grid gap-1 pt-5 sm:gap-2 sm:pt-7">
                  <Link
                    href={`/contact?package=${p.id}`}
                    className={`flex min-h-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                      featured ? "bg-accent text-on-accent hover:brightness-110" : "bg-ink text-paper hover:bg-ink/85"
                    }`}
                  >
                    Start with {p.name}
                  </Link>
                  <a
                    href={waLink(waMessages.pkg(p.name, cur ? formatPrice(p.prices[cur], cur) : ""))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold text-ink-2 transition hover:bg-ink/5 hover:text-ink"
                  >
                    <WhatsAppIcon className="size-4 text-whatsapp" /> Ask on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
