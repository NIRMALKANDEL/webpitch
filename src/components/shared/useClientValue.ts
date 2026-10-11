"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Reads a browser-only primitive (media query, storage, today's date) without a hydration mismatch:
 * null during SSR and hydration, then the real value. Pass `subscribe` to re-read on changes.
 */
export function useClientValue<T extends string | number | boolean>(
  read: () => T,
  subscribe: (onChange: () => void) => () => void = noop,
): T | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

/** Ticks every `ms` milliseconds; use with useClientValue for clock-driven values. */
export const everyMs = (ms: number) => (cb: () => void) => {
  const t = setInterval(cb, ms);
  return () => clearInterval(t);
};
