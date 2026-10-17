/**
 * Conversion tracking. Events go to Google Analytics 4 only after the visitor accepts analytics cookies
 * (gtag is never loaded otherwise, so calls before consent are dropped).
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
type Params = Record<string, string | number | boolean | undefined>;
type Gtag = (command: "event", name: string, params?: Params) => void;

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (gtag) gtag("event", event, params);
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
}
