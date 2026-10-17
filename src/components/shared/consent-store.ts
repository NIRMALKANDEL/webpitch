"use client";

import { useSyncExternalStore } from "react";

/** The visitor's cookie choice. Essential cookies are always on; analytics only with consent. */
export type Consent = { analytics: boolean; updatedAt: string };

const KEY = "cookie-consent-v1";
export const OPEN_PREFS_EVENT = "open-cookie-preferences";

const listeners = new Set<() => void>();
let current: Consent | null | undefined;

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<Consent>;
    return typeof v.analytics === "boolean" ? { analytics: v.analytics, updatedAt: String(v.updatedAt ?? "") } : null;
  } catch {
    return null;
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  // Keep tabs in sync when the choice changes in another tab.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      current = read();
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Consent | null {
  if (current === undefined) current = read();
  return current;
}

/** undefined on the server and during hydration (unknown), null when the visitor hasn't chosen yet. */
function getServerSnapshot(): Consent | null | undefined {
  return undefined;
}

export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore<Consent | null | undefined>(subscribe, getSnapshot, getServerSnapshot);
}

/** Current choice, read outside React (e.g. in event handlers). */
export function getConsent(): Consent | null {
  return getSnapshot();
}

export function saveConsent(analytics: boolean) {
  current = { analytics, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    /* storage blocked: the choice still applies for this page view */
  }
  listeners.forEach((l) => l());
}

/** Opens the cookie preferences panel from anywhere (e.g. the footer link). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFS_EVENT));
}
