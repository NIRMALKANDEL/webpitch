"use client";

import { AlertCircle, CheckCircle2, Loader2, Send, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { useCurrency } from "@/components/shared/currency-store";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { demoBySlug, demoHref } from "@/data/demos";
import { industries, industryBySlug } from "@/data/industries";
import { carePlans, inr, packages } from "@/data/pricing";
import { site } from "@/data/site";
import type { Currency } from "@/lib/currency";
import { track } from "@/lib/analytics";
import { type Errors, hasErrors, type Rules, validate } from "@/lib/validate";
import { waLink } from "@/lib/whatsapp";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const ENDPOINT = "https://api.web3forms.com/submit";

const COUNTRIES = ["India", "United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Ireland", "Other"];
const CURRENCY_COUNTRY: Partial<Record<Currency, string>> = {
  INR: "India",
  GBP: "United Kingdom",
  CAD: "Canada",
  AUD: "Australia",
  NZD: "New Zealand",
  EUR: "Ireland",
};
/** Built from the packages in src/data/pricing.ts, so names and prices always match the pricing cards. */
const PACKAGE_TYPES = packages.map((p) => `${p.name} (from ${inr(p.from)})`);
const WEBSITE_TYPES = [...PACKAGE_TYPES, "Website redesign", "Custom web application", "Care plan / maintenance", "Not sure yet"];
const PKG_TO_TYPE: Record<string, string> = {
  ...Object.fromEntries(packages.map((p, i) => [p.id, PACKAGE_TYPES[i]])),
  redesign: "Website redesign",
  ...Object.fromEntries(carePlans.map((c) => [c.id, "Care plan / maintenance"])),
};
const BUDGETS = ["Under ₹10,000", "₹10,000–25,000", "₹25,000–50,000", "₹50,000–1 lakh", "Over ₹1 lakh", "Not sure yet"];
const TIMELINES = ["As soon as possible", "Within 2 weeks", "Within a month", "In 1–3 months", "Just exploring"];

type Field =
  | "name" | "email" | "phone" | "country" | "business" | "category" | "websiteType"
  | "budget" | "timeline" | "website" | "details" | "consent";

type Values = Record<Field, string | boolean>;

export type Prefill = { industry?: string; demo?: string; package?: string; features?: string };

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function EnquiryForm({ variant = "full", prefill = {} }: { variant?: "full" | "short"; prefill?: Prefill }) {
  const id = useId();
  const cur = useCurrency();
  // Spam check: real people take more than a couple of seconds to fill the form.
  const tooFast = useRef(true);
  useEffect(() => {
    const t = setTimeout(() => {
      tooFast.current = false;
    }, 2500);
    return () => clearTimeout(t);
  }, []);
  const honeypot = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const demo = prefill.demo ? demoBySlug(prefill.demo) : undefined;
  const prefIndustry = industryBySlug(prefill.industry ?? demo?.industry ?? "");
  const [context, setContext] = useState(!!(demo || prefill.package || prefIndustry || prefill.features));

  const [values, setValues] = useState<Values>(() => ({
    name: "",
    email: "",
    phone: "",
    country: "",
    business: "",
    category: prefIndustry?.name ?? "",
    websiteType: prefill.package ? (PKG_TO_TYPE[prefill.package] ?? "") : "",
    budget: "",
    timeline: "",
    website: "",
    details: prefill.features ? `Features I'd like: ${prefill.features}

` : "",
    consent: false,
  }));
  const [errors, setErrors] = useState<Errors<Field>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Phones: the two optional fields stay tucked away until asked for, to keep the form short.
  const [more, setMore] = useState(false);

  // Pre-select the visitor's country from their currency, once known, if they haven't chosen one.
  const country = String(values.country) || (cur ? (CURRENCY_COUNTRY[cur] ?? "") : "");

  const full = variant === "full";
  const rules: Rules<Field> = full
    ? {
        name: [{ kind: "required", message: "Please tell me your name." }, { kind: "max", n: 80 }],
        email: [{ kind: "required", message: "I need an email to reply to you." }, { kind: "email" }],
        phone: [{ kind: "phone" }],
        country: [{ kind: "required", message: "Please choose your country." }],
        category: [{ kind: "required", message: "Please choose your business category." }],
        websiteType: [{ kind: "required", message: "Please choose a website type." }],
        budget: [{ kind: "required", message: "Please choose an approximate budget." }],
        timeline: [{ kind: "required", message: "Please choose a timeline." }],
        website: [{ kind: "url" }],
        details: [{ kind: "max", n: 3000 }],
        consent: [{ kind: "checked", message: "Please agree to be contacted about your enquiry." }],
      }
    : {
        name: [{ kind: "required", message: "Please tell me your name." }, { kind: "max", n: 80 }],
        email: [{ kind: "required", message: "I need an email to reply to you." }, { kind: "email" }],
        phone: [{ kind: "phone" }],
        category: [{ kind: "required", message: "Please choose your business category." }],
        details: [{ kind: "max", n: 2000 }],
      };

  const set = (k: Field, v: string | boolean) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const payloadText = () => {
    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone && `WhatsApp/phone: ${values.phone}`,
      full && `Country: ${country}`,
      values.business && `Business: ${values.business}`,
      `Category: ${values.category}`,
      full && `Website type: ${values.websiteType}`,
      full && `Budget: ${values.budget}`,
      full && `Timeline: ${values.timeline}`,
      values.website && `Current website: ${values.website}`,
      demo && `Demo of interest: ${demo.brand} (${demo.slug})`,
      prefill.package && `Package: ${prefill.package}`,
      values.details && `Details: ${values.details}`,
    ].filter(Boolean);
    return `Hi ${site.ownerName.split(" ")[0]}, here's my website enquiry:\n\n${lines.join("\n")}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = { ...values, country };
    const errs = validate(v, rules);
    setErrors(errs);
    if (hasErrors(errs)) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Spam checks: bots fill the hidden field, or submit within a couple of seconds of page load.
    if (honeypot.current?.checked || tooFast.current) {
      setStatus({ kind: "error", message: "That was a little too fast. Please wait a moment and try again." });
      return;
    }
    if (!WEB3FORMS_KEY) {
      setStatus({
        kind: "error",
        message: "The form isn't available right now. Please send your enquiry on WhatsApp instead; it's already written for you.",
      });
      return;
    }

    setStatus({ kind: "sending" });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry — ${v.category} — ${full ? v.websiteType : "Quick enquiry"} — ${v.name}${full ? ` (${country})` : ""}`,
          from_name: `${site.brandName} website`,
          replyto: v.email,
          botcheck: false,
          Name: v.name,
          Email: v.email,
          "WhatsApp / phone": v.phone || "—",
          Country: full ? country : "—",
          Business: v.business || "—",
          Category: v.category,
          "Website type": full ? v.websiteType : "—",
          Budget: full ? v.budget : "—",
          Timeline: full ? v.timeline : "—",
          "Current website": v.website || "—",
          "Demo of interest": demo ? `${demo.brand} (${demoHref(demo)})` : "—",
          Package: prefill.package ?? "—",
          "Currency shown": cur ?? "—",
          Details: v.details || "—",
          "Form": full ? "Contact page" : "Homepage quick form",
          "Page": typeof window !== "undefined" ? window.location.href : "",
          "Sent at": new Date().toISOString(),
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (res.ok && data?.success === true) {
        setStatus({ kind: "success" });
        // Conversion: only after Web3Forms confirms delivery. No personal details are sent.
        track("generate_lead", {
          form: full ? "contact_page" : "homepage_quick",
          category: String(v.category),
          website_type: full ? String(v.websiteType) : undefined,
          demo: demo?.slug,
          package: prefill.package,
        });
      } else {
        setStatus({
          kind: "error",
          message:
            res.status === 429
              ? "Too many enquiries were sent from this connection. Please try again in a few minutes, or use WhatsApp."
              : (data?.message ?? "Something went wrong while sending.") + " Your details are still here.",
        });
      }
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof DOMException && err.name === "AbortError"
            ? "Sending took too long. Please check your connection and try again."
            : "Couldn't reach the form service. Please check your connection and try again.",
      });
    } finally {
      clearTimeout(timer);
    }
  }

  if (status.kind === "success") {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[14px] border border-muted bg-surface p-6 sm:p-8"
      >
        <CheckCircle2 className="size-8 text-whatsapp" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold">Thanks, {String(values.name).split(" ")[0]} — your enquiry is sent.</h3>
        <p className="mt-2 text-ink-2">
          It&apos;s in my inbox now. I&apos;ll reply to <strong className="text-ink">{String(values.email)}</strong> within 12 hours
          {values.phone ? ", or on WhatsApp if that's easier" : ""}.
        </p>
        <a
          href={waLink(payloadText())}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="size-4" /> Also send this on WhatsApp
        </a>
      </motion.div>
    );
  }

  const fieldErrorIds = Object.keys(errors).filter((k) => errors[k as Field]);
  const label = "mb-1 block text-sm font-medium sm:mb-1.5";
  const input =
    "w-full min-h-11 rounded-xl border bg-surface px-3.5 text-base sm:min-h-12 sm:px-4 text-ink transition placeholder:text-ink-3/70 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";
  const cls = (k: Field) => `${input} ${errors[k] ? "border-danger" : "border-muted"}`;
  const err = (k: Field) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
        <AlertCircle className="size-4 shrink-0" aria-hidden /> {errors[k]}
      </p>
    ) : null;
  const a11y = (k: Field) => ({
    id: `${id}-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:gap-5" aria-describedby={`${id}-req`}>
      {context && full ? (
        <div className="flex items-start justify-between gap-3 rounded-xl bg-accent-soft px-4 py-3 text-sm">
          <p>
            {demo ? (
              <>
                You&apos;re asking about a website like <strong>{demo.brand}</strong> ({industryBySlug(demo.industry)?.short} demo).
              </>
            ) : prefill.features ? (
              <>
                You picked these features: <strong>{prefill.features}</strong>. They&apos;re added to your project details below.
              </>
            ) : prefill.package ? (
              <>
                You&apos;re asking about the <strong>{packages.find((p) => p.id === prefill.package)?.name ?? carePlans.find((c) => c.id === prefill.package)?.name ?? prefill.package}</strong> {carePlans.some((c) => c.id === prefill.package) ? "care plan" : "package"}.
              </>
            ) : (
              <>
                You&apos;re asking about a <strong>{prefIndustry?.short}</strong> website.
              </>
            )}
          </p>
          <button
            type="button"
            onClick={() => setContext(false)}
            className="grid size-7 shrink-0 place-items-center rounded-full hover:bg-ink/10"
            aria-label="Clear this context"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      {fieldErrorIds.length > 0 ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          Please fix {fieldErrorIds.length === 1 ? "1 field" : `${fieldErrorIds.length} fields`} below.
        </div>
      ) : null}

      <p id={`${id}-req`} className="-mb-1 text-xs text-ink-3 sm:mb-0 sm:text-sm">
        Fields marked * are required.
      </p>

      <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-5">
        <div>
          <label htmlFor={`${id}-name`} className={label}>Your name *</label>
          <input {...a11y("name")} autoComplete="name" className={cls("name")} value={String(values.name)} onChange={(e) => set("name", e.target.value)} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>Email *</label>
          <input {...a11y("email")} type="email" inputMode="email" autoComplete="email" className={cls("email")} value={String(values.email)} onChange={(e) => set("email", e.target.value)} />
          {err("email")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>WhatsApp / phone <span className="font-normal text-ink-3">(with country code)</span></label>
          <input {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" className={cls("phone")} value={String(values.phone)} onChange={(e) => set("phone", e.target.value)} />
          {err("phone")}
        </div>
        {full ? (
          // Phones: country is prefilled, so it moves behind "More details" with the optional fields.
          <div className={`${more || errors.country ? "" : "hidden"} sm:block`}>
            <label htmlFor={`${id}-country`} className={label}>Country *</label>
            <select {...a11y("country")} autoComplete="country-name" className={cls("country")} value={country} onChange={(e) => set("country", e.target.value)}>
              <option value="">Choose…</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {err("country")}
          </div>
        ) : (
          <div>
            <label htmlFor={`${id}-category`} className={label}>Business category *</label>
            <select {...a11y("category")} className={cls("category")} value={String(values.category)} onChange={(e) => set("category", e.target.value)}>
              <option value="">Choose…</option>
              {industries.map((i) => <option key={i.slug} value={i.name}>{i.name}</option>)}
              <option value="Other">Other</option>
            </select>
            {err("category")}
          </div>
        )}
      </div>

      {full ? (
        <>
          <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 sm:gap-5">
            <div className={`${more ? "" : "hidden"} col-span-2 sm:col-span-1 sm:block`}>
              <label htmlFor={`${id}-business`} className={label}>Business name</label>
              <input {...a11y("business")} autoComplete="organization" className={cls("business")} value={String(values.business)} onChange={(e) => set("business", e.target.value)} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor={`${id}-category`} className={label}>Business category *</label>
              <select {...a11y("category")} className={cls("category")} value={String(values.category)} onChange={(e) => set("category", e.target.value)}>
                <option value="">Choose…</option>
                {industries.map((i) => <option key={i.slug} value={i.name}>{i.name}</option>)}
                <option value="Other">Other</option>
              </select>
              {err("category")}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor={`${id}-websiteType`} className={label}>Website type *</label>
              <select {...a11y("websiteType")} className={cls("websiteType")} value={String(values.websiteType)} onChange={(e) => set("websiteType", e.target.value)}>
                <option value="">Choose…</option>
                {WEBSITE_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              {err("websiteType")}
            </div>
            <div className="min-w-0">
              <label htmlFor={`${id}-budget`} className={label}>
                <span className="sm:hidden">Budget *</span>
                <span className="hidden sm:inline">Approximate budget *</span>
              </label>
              <select {...a11y("budget")} className={`${cls("budget")} max-sm:px-2.5 max-sm:text-sm`} value={String(values.budget)} onChange={(e) => set("budget", e.target.value)}>
                <option value="">Choose…</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
              {err("budget")}
            </div>
            <div className="min-w-0">
              <label htmlFor={`${id}-timeline`} className={label}>
                <span className="sm:hidden">Timeline *</span>
                <span className="hidden sm:inline">Expected timeline *</span>
              </label>
              <select {...a11y("timeline")} className={`${cls("timeline")} max-sm:px-2.5 max-sm:text-sm`} value={String(values.timeline)} onChange={(e) => set("timeline", e.target.value)}>
                <option value="">Choose…</option>
                {TIMELINES.map((t) => <option key={t}>{t}</option>)}
              </select>
              {err("timeline")}
            </div>
            <div className={`${more || errors.website ? "" : "hidden"} col-span-2 sm:col-span-1 sm:block`}>
              <label htmlFor={`${id}-website`} className={label}>Current website <span className="font-normal text-ink-3">(if any)</span></label>
              <input {...a11y("website")} inputMode="url" placeholder="yourbusiness.in" className={cls("website")} value={String(values.website)} onChange={(e) => set("website", e.target.value)} />
              {err("website")}
            </div>
          </div>
          {!more ? (
            <button type="button" onClick={() => setMore(true)} className="-mt-1 justify-self-start text-left text-sm font-semibold text-accent underline-offset-4 hover:underline sm:hidden">
              + More details: business name, website{country ? `, country (${country})` : ", country"}
            </button>
          ) : null}
        </>
      ) : null}

      <div>
        <label htmlFor={`${id}-details`} className={label}>
          {full ? "Project details" : "Tell me about your business"} <span className="font-normal text-ink-3">(optional)</span>
        </label>
        <textarea
          {...a11y("details")}
          rows={full ? 4 : 3}
          placeholder={full ? "What does your business do? Which features matter most? Anything you liked in the demos?" : "What do you do, and what should the website help with?"}
          className={`${cls("details")} py-3 max-sm:h-24`}
          value={String(values.details)}
          onChange={(e) => set("details", e.target.value)}
        />
        {err("details")}
      </div>

      {/* Honeypot: hidden from people, irresistible to bots */}
      <input ref={honeypot} type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {full ? (
        <div>
          <label className="flex items-start gap-3 text-xs text-ink-2 sm:text-sm">
            <input
              {...a11y("consent")}
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]"
              checked={values.consent === true}
              onChange={(e) => set("consent", e.target.checked)}
            />
            <span>
              I agree to be contacted about this enquiry. Read the{" "}
              <a href="/privacy" className="font-medium text-ink underline underline-offset-2">privacy note</a>. *
            </span>
          </label>
          {err("consent")}
        </div>
      ) : null}

      {status.kind === "error" ? (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm">
          <p className="flex items-start gap-2 text-danger">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden /> {status.message}
          </p>
          <a
            href={waLink(payloadText())}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-whatsapp px-4 font-semibold text-white"
          >
            <WhatsAppIcon className="size-4" /> Send via WhatsApp instead
          </a>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 sm:w-auto font-semibold text-paper transition hover:bg-ink/85 disabled:opacity-60"
        >
          {status.kind === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send Enquiry <Send className="size-4" aria-hidden />
            </>
          )}
        </button>
        <p className="text-xs text-ink-3 sm:text-sm">Replies within 12 hours, usually sooner.</p>
      </div>
    </form>
  );
}
