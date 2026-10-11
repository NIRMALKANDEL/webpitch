"use client";

import { CheckCircle2, FileText, Phone, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { DemoNoticeDialog } from "@/components/shared/DemoNoticeDialog";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { type Errors, hasErrors, validate } from "@/lib/validate";
import { waLink, waMessages } from "@/lib/whatsapp";
import { AREAS, SERVICES } from "./data";

const FSA = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const areaFor = (code: string) => {
  const p = code.toUpperCase().replace(/\s/g, "").slice(0, 3);
  return AREAS.find((a) => a.fsa.includes(p));
};

export function CoverageChecker() {
  const [code, setCode] = useState("");
  const [res, setRes] = useState<null | { ok: boolean; text: string }>(null);
  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (!FSA.test(code.trim())) return setRes({ ok: false, text: "Enter a full Canadian postal code, like M5V 2T6." });
    const a = areaFor(code);
    setRes(a ? { ok: true, text: `Yes, we cover ${a.name}. A technician can usually be there today.` } : { ok: false, text: "Not yet in your area. Leave your number in the quote form and we'll call if we expand." });
  };
  return (
    <form onSubmit={check} className="rounded-xl bg-white p-4 text-[#0F172A] shadow-2xl" aria-label="Check if we cover your area">
      <label htmlFor="fx-code" className="font-dd text-xl font-bold uppercase">Do we cover you?</label>
      <div className="mt-2 flex gap-2">
        <input id="fx-code" value={code} onChange={(e) => { setCode(e.target.value); setRes(null); }} placeholder="Postal code, e.g. M5V 2T6" autoComplete="postal-code" className="min-h-12 flex-1 rounded-lg border-2 border-slate-300 px-3 text-base uppercase" aria-describedby="fx-res" />
        <button type="submit" className="min-h-12 rounded-lg bg-[#1E40AF] px-5 font-bold text-white">Check</button>
      </div>
      <div id="fx-res" aria-live="polite">
        <AnimatePresence mode="wait">
          {res ? (
            <motion.p key={res.text} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mt-3 flex items-start gap-2 font-semibold ${res.ok ? "text-[#15803d]" : "text-[#b42318]"}`}>
              {res.ok ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden /> : <XCircle className="mt-0.5 size-5 shrink-0" aria-hidden />} {res.text}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

export function CallButton({ className, children }: { className: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>{children}</button>
      <DemoNoticeDialog slug="home-services" open={open} onClose={() => setOpen(false)} action="call your business phone directly" />
    </>
  );
}

export function StickyBar() {
  return (
    <div className="fixed inset-x-3 z-40 grid grid-cols-3 gap-1 rounded-xl bg-[#0F172A] p-1.5 text-white shadow-2xl md:hidden" style={{ bottom: "calc(var(--demobar-h, 64px) + 16px)" }}>
      <CallButton className="flex min-h-12 flex-col items-center justify-center rounded-lg bg-[#C2410C] text-xs font-bold"><Phone className="size-4" aria-hidden /> Call</CallButton>
      <a href={waLink(waMessages.demo("FixRight Home Services", "Home services"))} target="_blank" rel="noopener noreferrer" className="flex min-h-12 flex-col items-center justify-center rounded-lg text-xs font-bold"><WhatsAppIcon className="size-4" /> WhatsApp</a>
      <a href="#quote" className="flex min-h-12 flex-col items-center justify-center rounded-lg text-xs font-bold"><FileText className="size-4" aria-hidden /> Quote</a>
    </div>
  );
}

export function ServiceQuoteLink({ name }: { name: string }) {
  return (
    <a href="#quote" onClick={() => window.dispatchEvent(new CustomEvent("fx:service", { detail: name }))} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-[#1E40AF] px-4 font-dd text-lg font-bold text-[#1E40AF] uppercase hover:bg-[#1E40AF] hover:text-white">
      Get quote
    </a>
  );
}

type F = "name" | "phone" | "postal" | "service" | "issue" | "address";
export function QuoteForm() {
  const [v, setV] = useState({ name: "", phone: "", postal: "", service: "", issue: "", date: "", window: "Any time", address: "" });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);
  useEffect(() => {
    const on = (e: Event) => setV((s) => ({ ...s, service: (e as CustomEvent<string>).detail }));
    window.addEventListener("fx:service", on);
    return () => window.removeEventListener("fx:service", on);
  }, []);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, {
      name: [{ kind: "required" }], phone: [{ kind: "required" }, { kind: "phone" }],
      postal: [{ kind: "required" }, { kind: "pattern", re: FSA, message: "Enter a valid postal code, like M5V 2T6." }],
      service: [{ kind: "required", message: "Which service do you need?" }], issue: [{ kind: "required", message: "Describe the problem briefly." }], address: [{ kind: "required" }],
    });
    if (!errs.postal && !areaFor(v.postal)) errs.postal = "Sorry, that postal code is outside our service area.";
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(formatEnquiry("New quote request — FixRight Home Services", { Name: v.name, Phone: v.phone, "Postal code": v.postal.toUpperCase(), Area: areaFor(v.postal)?.name, Service: v.service, Issue: v.issue, "Preferred date": v.date, "Time window": v.window, Address: v.address }));
  };
  if (done) return <DemoResult brand="FixRight Home Services" industryName="Home services" demoSlug="home-services" industrySlug="home-services" preview={done} onReset={() => setDone(null)} className="border-white/20 bg-white text-[#0F172A]" channel="phone (SMS/WhatsApp) and email" />;
  const inp = "min-h-12 w-full rounded-lg border-2 bg-white px-3 text-base text-[#0F172A]";
  const a = (k: F) => ({ id: `fq-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `fq-${k}-e` : undefined, className: `${inp} ${errors[k] ? "border-[#fca5a5]" : "border-transparent"}` });
  const er = (k: F) => (errors[k] ? <p id={`fq-${k}-e`} className="mt-1 text-sm font-semibold text-[#fecaca]">{errors[k]}</p> : null);
  const lb = (k: string, t: string) => <label htmlFor={`fq-${k}`} className="mb-1 block font-semibold">{t}</label>;
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 md:grid-cols-2">
      <div>{lb("name", "Name")}<input {...a("name")} autoComplete="name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />{er("name")}</div>
      <div>{lb("phone", "Phone")}<input {...a("phone")} type="tel" autoComplete="tel" value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />{er("phone")}</div>
      <div>{lb("postal", "Postal code")}<input {...a("postal")} autoComplete="postal-code" value={v.postal} onChange={(e) => setV({ ...v, postal: e.target.value })} />{er("postal")}</div>
      <div>{lb("service", "Service")}<select {...a("service")} value={v.service} onChange={(e) => setV({ ...v, service: e.target.value })}><option value="">Choose…</option>{SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}</select>{er("service")}</div>
      <div className="md:col-span-2">{lb("issue", "What's the problem?")}<textarea {...a("issue")} rows={3} value={v.issue} onChange={(e) => setV({ ...v, issue: e.target.value })} />{er("issue")}</div>
      <div>{lb("date", "Preferred date")}<input id="fq-date" type="date" className={`${inp} border-transparent`} value={v.date} onChange={(e) => setV({ ...v, date: e.target.value })} /></div>
      <div>{lb("window", "Time window")}<select id="fq-window" className={`${inp} border-transparent`} value={v.window} onChange={(e) => setV({ ...v, window: e.target.value })}>{["Any time", "8am–12pm", "12pm–4pm", "4pm–9pm"].map((w) => <option key={w}>{w}</option>)}</select></div>
      <div className="md:col-span-2">{lb("address", "Street address")}<input {...a("address")} autoComplete="street-address" value={v.address} onChange={(e) => setV({ ...v, address: e.target.value })} />{er("address")}</div>
      <button type="submit" className="min-h-13 rounded-lg bg-[#C2410C] px-8 font-dd text-xl font-bold text-white uppercase md:justify-self-start">Get my free quote</button>
    </form>
  );
}
