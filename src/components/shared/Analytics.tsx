"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { useConsent } from "./consent-store";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

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
 * Loads Google Analytics 4 only after consent (set NEXT_PUBLIC_GA_ID to enable),
 * and records conversion clicks site-wide from one delegated listener.
 */
export function Analytics() {
  const consent = useConsent();
  const allowed = Boolean(GA_ID) && consent?.analytics === true;

  useEffect(() => {
    if (!GA_ID) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !allowed;
    if (consent && !consent.analytics) clearGaCookies();
  }, [allowed, consent]);

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

  // Page views (including client-side navigations) are recorded by GA4's enhanced measurement.
  if (!allowed) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`}
      </Script>
    </>
  );
}
