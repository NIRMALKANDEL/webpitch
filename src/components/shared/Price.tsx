"use client";

import { formatPrice, type PriceTable } from "@/lib/currency";
import { useCurrency } from "./currency-store";

/** Renders a price in the visitor's currency. Reserves width while the currency is resolved, so nothing shifts. */
export function Price({ prices, className }: { prices: PriceTable; className?: string }) {
  const cur = useCurrency();
  if (!cur) {
    return (
      <span
        aria-hidden
        className={`inline-block min-w-[4.5ch] animate-pulse rounded bg-current/10 align-middle ${className ?? ""}`}
      >
        &nbsp;
      </span>
    );
  }
  return <span className={className}>{formatPrice(prices[cur], cur)}</span>;
}
