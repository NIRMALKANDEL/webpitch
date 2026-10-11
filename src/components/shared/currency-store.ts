"use client";

import { useSyncExternalStore } from "react";
import {
  CURRENCY_COOKIE,
  type Currency,
  currencyFromTimezone,
  isCurrency,
} from "@/lib/currency";

const listeners = new Set<() => void>();
let current: Currency | null = null;

function readInitial(): Currency {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${CURRENCY_COOKIE}=([^;]+)`));
    if (match && isCurrency(match[1])) return match[1];
  } catch {
    /* cookies blocked */
  }
  return currencyFromTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot(): Currency {
  if (current === null) current = readInitial();
  return current;
}

/** null on the server and during hydration, so prices render a placeholder instead of a wrong guess. */
function getServerSnapshot(): Currency | null {
  return null;
}

export function useCurrency(): Currency | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setCurrency(c: Currency) {
  current = c;
  try {
    document.cookie = `${CURRENCY_COOKIE}=${c}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}
