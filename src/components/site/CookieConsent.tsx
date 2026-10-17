"use client";

import { Cookie } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getConsent, OPEN_PREFS_EVENT, saveConsent, useConsent } from "@/components/shared/consent-store";
import { toast } from "@/components/shared/toast-store";

const btn = "inline-flex min-h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition";
const primary = `${btn} bg-ink text-paper hover:bg-ink/85`;
const secondary = `${btn} border border-ink/15 hover:border-ink/40`;

/**
 * Cookie banner (first visit) and preferences panel (reopened from the footer).
 * Essential cookies are always on; analytics stays off until the visitor opts in.
 */
export function CookieConsent() {
  const consent = useConsent();
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  // Opening the panel starts from the saved choice.
  const openPanel = () => {
    setAnalytics(getConsent()?.analytics ?? false);
    setOpen(true);
  };

  useEffect(() => {
    const onOpen = () => {
      setAnalytics(getConsent()?.analytics ?? false);
      setOpen(true);
    };
    window.addEventListener(OPEN_PREFS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, onOpen);
  }, []);

  // Keep the native <dialog> in step with `open` (showModal gives focus trapping and Escape for free).
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const choose = (value: boolean, message: string) => {
    saveConsent(value);
    setOpen(false);
    toast(message, "success");
  };

  return (
    <>
      {consent === null && !open ? (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-24 z-50 rounded-[20px] bg-surface p-5 text-ink shadow-2xl ring-1 ring-ink/10 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-md"
        >
          <p className="flex items-center gap-2 font-display text-lg font-semibold">
            <Cookie className="size-5 text-accent" aria-hidden /> Cookies &amp; privacy
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            One essential cookie remembers your region. With your OK, I&apos;d also use analytics cookies to see which pages help
            visitors. Nothing is used for ads. <Link href="/privacy" className="font-medium text-ink underline underline-offset-2">Privacy note</Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={primary} onClick={() => choose(true, "Thanks — analytics cookies are on.")}>
              Accept all
            </button>
            <button type="button" className={secondary} onClick={() => choose(false, "Only essential cookies will be used.")}>
              Essential only
            </button>
            <button type="button" className={`${btn} text-ink-2 hover:text-ink`} onClick={openPanel}>
              Preferences
            </button>
          </div>
        </section>
      ) : null}

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        aria-labelledby="cookie-prefs-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-[20px] bg-surface p-0 text-ink shadow-2xl ring-1 ring-ink/10 backdrop:bg-black/60"
      >
        <div className="p-6 sm:p-8">
          <h2 id="cookie-prefs-title" className="font-display text-2xl font-semibold">Cookie preferences</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Choose which cookies this site may use. You can change this any time from the footer.
          </p>
          <ul className="mt-6 divide-y divide-muted rounded-[14px] border border-muted bg-paper">
            <li className="flex items-start justify-between gap-4 p-4">
              <div>
                <p className="font-semibold">Essential</p>
                <p className="mt-0.5 text-sm text-ink-2">Remembers your region and theme so the site works properly.</p>
              </div>
              <span className="shrink-0 rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink-2">Always on</span>
            </li>
            <li className="flex items-start justify-between gap-4 p-4">
              <div>
                <p id="cookie-analytics-label" className="font-semibold">Analytics</p>
                <p className="mt-0.5 text-sm text-ink-2">Anonymous visit statistics (Google Analytics) that show which pages are useful.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                aria-labelledby="cookie-analytics-label"
                onClick={() => setAnalytics((v) => !v)}
                className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${analytics ? "bg-accent" : "bg-ink/15"}`}
              >
                <span className={`inline-block size-5 rounded-full bg-surface shadow transition ${analytics ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="button" className={secondary} onClick={() => choose(analytics, "Cookie preferences saved.")}>
              Save preferences
            </button>
            <button type="button" className={primary} onClick={() => choose(true, "Thanks — analytics cookies are on.")}>
              Accept all
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

/** Footer link that reopens the preferences panel. */
export function CookiePreferencesLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
      className={className}
    >
      Cookie preferences
    </button>
  );
}
