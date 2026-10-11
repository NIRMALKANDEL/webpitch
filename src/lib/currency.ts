export const CURRENCIES = ["INR", "USD", "GBP", "EUR", "AUD", "CAD", "NZD"] as const;
export type Currency = (typeof CURRENCIES)[number];
export type PriceTable = Record<Currency, number>;

export const CURRENCY_COOKIE = "cur";
export const DEFAULT_CURRENCY: Currency = "USD";

export const currencyMeta: Record<Currency, { locale: string; label: string; symbol: string }> = {
  INR: { locale: "en-IN", label: "Indian rupee", symbol: "₹" },
  USD: { locale: "en-US", label: "US dollar", symbol: "$" },
  GBP: { locale: "en-GB", label: "British pound", symbol: "£" },
  EUR: { locale: "en-IE", label: "Euro", symbol: "€" },
  AUD: { locale: "en-AU", label: "Australian dollar", symbol: "A$" },
  CAD: { locale: "en-CA", label: "Canadian dollar", symbol: "C$" },
  NZD: { locale: "en-NZ", label: "New Zealand dollar", symbol: "NZ$" },
};

const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  IE: "EUR",
  AU: "AUD",
  CA: "CAD",
  NZ: "NZD",
};

export function currencyForCountry(country: string | null | undefined): Currency {
  if (!country) return DEFAULT_CURRENCY;
  return COUNTRY_TO_CURRENCY[country.toUpperCase()] ?? DEFAULT_CURRENCY;
}

/** Local-dev fallback when the Vercel geo header (and so the cookie) is missing. */
export function currencyFromTimezone(tz: string | undefined): Currency {
  if (!tz) return DEFAULT_CURRENCY;
  if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "INR";
  if (tz === "Europe/London") return "GBP";
  if (tz === "Europe/Dublin") return "EUR";
  if (tz.startsWith("Australia/")) return "AUD";
  if (tz === "Pacific/Auckland" || tz === "Pacific/Chatham") return "NZD";
  if (
    /^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Moncton|Whitehorse|Yellowknife|Iqaluit)$/.test(tz)
  )
    return "CAD";
  return DEFAULT_CURRENCY;
}

export function isCurrency(v: unknown): v is Currency {
  return typeof v === "string" && (CURRENCIES as readonly string[]).includes(v);
}

export function formatPrice(amount: number, currency: Currency) {
  const { locale } = currencyMeta[currency];
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(amount);
  // Disambiguate dollars that would otherwise all render as "$".
  if (currency === "AUD" || currency === "CAD" || currency === "NZD") {
    return formatted.replace("$", currencyMeta[currency].symbol);
  }
  return formatted;
}

/** Compact form for budget ranges: ₹5k, $1.2k, £950. */
export function formatCompact(amount: number, currency: Currency) {
  const sym = currencyMeta[currency].symbol;
  if (currency === "INR" && amount >= 100000) return `${sym}${+(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `${sym}${+(amount / 1000).toFixed(1)}k`;
  return `${sym}${amount}`;
}
