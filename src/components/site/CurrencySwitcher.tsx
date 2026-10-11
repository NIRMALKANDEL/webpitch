"use client";

import { CURRENCIES, type Currency, currencyMeta } from "@/lib/currency";
import { setCurrency, useCurrency } from "@/components/shared/currency-store";

export function CurrencySwitcher({ label = "Prices shown in", className = "" }: { label?: string; className?: string }) {
  const cur = useCurrency();
  return (
    <label className={`inline-flex items-center gap-2 text-sm ${className || "text-ink-2"}`}>
      <span>{label}</span>
      <span className="relative">
        <select
          value={cur ?? ""}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="min-h-10 appearance-none rounded-full border border-muted bg-surface py-1.5 pr-8 pl-3 text-sm font-medium text-ink"
          aria-label="Currency"
        >
          {cur === null ? <option value="">…</option> : null}
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {currencyMeta[c].symbol} {c}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-ink-3">
          ▾
        </span>
      </span>
    </label>
  );
}
