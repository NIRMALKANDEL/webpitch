"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Price } from "@/components/shared/Price";
import { useCurrency } from "@/components/shared/currency-store";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { packages } from "@/data/pricing";
import { formatPrice } from "@/lib/currency";
import { waLink, waMessages } from "@/lib/whatsapp";

export function PricingCards({ highlight }: { highlight?: string }) {
  const cur = useCurrency();
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {packages.map((p) => {
        const featured = highlight ? p.id === highlight : p.featured;
        return (
          <div
            key={p.id}
            id={p.id}
            className={`relative flex flex-col rounded-[14px] border p-6 ${
              featured ? "border-ink bg-ink text-white" : "border-muted bg-white"
            }`}
          >
            {featured ? (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                {highlight ? "Recommended for you" : "Most chosen"}
              </span>
            ) : null}
            <h3 className="font-display text-xl font-semibold">{p.name}</h3>
            <p className={`mt-1 text-sm ${featured ? "text-white/70" : "text-ink-3"}`}>{p.tagline}</p>
            <p className="mt-5 flex items-baseline gap-1.5">
              <span className={`text-sm ${featured ? "text-white/70" : "text-ink-3"}`}>from</span>
              <Price prices={p.prices} className="font-display text-4xl font-semibold tracking-tight" />
            </p>
            <p className={`mt-1 text-xs ${featured ? "text-white/60" : "text-ink-3"}`}>
              One-time · {p.timeline} · {p.revisions} of revisions
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {p.includes.map((inc) => (
                <li key={inc} className="flex gap-2.5">
                  <Check className={`mt-0.5 size-4 shrink-0 ${featured ? "text-white" : "text-accent"}`} aria-hidden />
                  <span className={featured ? "text-white/85" : "text-ink-2"}>{inc}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-5 text-xs leading-relaxed ${featured ? "text-white/60" : "text-ink-3"}`}>
              Best for: {p.bestFor}
            </p>
            <div className="mt-auto grid gap-2 pt-6">
              <Link
                href={`/contact?package=${p.id}`}
                className={`flex min-h-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                  featured ? "bg-white text-ink hover:bg-white/90" : "bg-ink text-white hover:bg-ink/85"
                }`}
              >
                Discuss This Package
              </Link>
              <a
                href={waLink(waMessages.pkg(p.name, cur ? formatPrice(p.prices[cur], cur) : ""))}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                  featured ? "text-white hover:bg-white/10" : "text-whatsapp hover:bg-whatsapp/10"
                }`}
              >
                <WhatsAppIcon className="size-4" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
