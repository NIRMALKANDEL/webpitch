/**
 * Conversion tracking. Nothing is loaded or sent until the visitor accepts analytics cookies,
 * so calls made before consent are dropped.
 *
 * - With NEXT_PUBLIC_GTM_ID: each event is pushed to the Tag Manager data layer as
 *   { event: "<name>", ...params }. Forward them to GA4 with one "GA4 Event" tag (see README).
 * - Otherwise with NEXT_PUBLIC_GA_ID: sent straight to Google Analytics 4 with gtag.
 *
 * Events sent:
 *   generate_lead       enquiry form sent successfully
 *   whatsapp_click      any WhatsApp link
 *   email_click         any mailto: link
 *   phone_click         any tel: link
 *   cta_click           any link to /contact
 *   demo_open           any link to a /demos/<slug> page
 *
 * Mark generate_lead (and optionally whatsapp_click) as key events in GA4 → Admin → Events.
 */
import { getConsent } from "@/components/shared/consent-store";

type Params = Record<string, string | number | boolean | undefined>;
type Gtag = (command: "event", name: string, params?: Params) => void;

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: Gtag; dataLayer?: unknown[] };
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
  if (getConsent()?.analytics !== true) return;
  if (GTM_ID) {
    // The data layer only exists once Tag Manager has been loaded after consent.
    w.dataLayer?.push({ event, ...params });
  } else if (w.gtag) {
    w.gtag("event", event, params);
  }
}
