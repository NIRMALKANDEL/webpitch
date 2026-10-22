"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { useConsent } from "./consent-store";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
// With Tag Manager set, GA4 is configured inside the container instead, so it is never loaded twice.
const GA_ID = GTM_ID ? "" : (process.env.NEXT_PUBLIC_GA_ID ?? "");

/** Removes Google Analytics cookies when a visitor withdraws consent. */
function clearGaCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; path=/; max-age=0${d ? `; domain=${d}` : ""}`;
    });
  });
}

/**
 * Analytics, loaded only after the visitor accepts analytics cookies:
 * - NEXT_PUBLIC_GTM_ID set: Google Tag Manager (GA4 and any other tags are configured in the container).
 * - otherwise NEXT_PUBLIC_GA_ID set: Google Analytics 4 directly.
 * Conversion clicks are recorded site-wide from one delegated listener (see lib/analytics.ts).
 */
export function Analytics() {
  const consent = useConsent();
  const granted = consent?.analytics === true;
  const gtmOn = Boolean(GTM_ID) && granted;
  const gaOn = Boolean(GA_ID) && granted;

  useEffect(() => {
    if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !gaOn;
    if (!consent) return;
    // Tag Manager can't be unloaded, so a changed choice is passed to the tags it already loaded (consent mode).
    const w = window as unknown as { dataLayer?: unknown[] };
    if (GTM_ID && w.dataLayer) {
      // gtag-style command (it must push the `arguments` object): Google tags in the container honour it.
      const gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer?.push(arguments);
      } as (...args: unknown[]) => void;
      gtag("consent", "update", { analytics_storage: consent.analytics ? "granted" : "denied" });
    }
    if (!consent.analytics) clearGaCookies();
  }, [consent, gaOn]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!a || !href) return;
      const label = (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 80);
      const page = location.pathname;
      if (href.includes("wa.me/")) track("whatsapp_click", { page, label });
      else if (href.startsWith("mailto:")) track("email_click", { page });
      else if (href.startsWith("tel:")) track("phone_click", { page });
      else if (href.startsWith("/contact")) track("cta_click", { page, label, destination: href });
      else if (/^\/demos\/[a-z-]+/.test(href)) track("demo_open", { page, demo: href.split("/")[2]?.split(/[?#]/)[0] });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (gtmOn) {
    // Consent is already given when this runs, so storage is granted up front. Page views (including
    // client-side navigations) come from the GA4 tag's enhanced measurement inside the container.
    return (
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';document.head.appendChild(s)})();`}
      </Script>
    );
  }

  if (!gaOn) return null;
  // Page views (including client-side navigations) are recorded by GA4's enhanced measurement.
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`}
      </Script>
    </>
  );
}
