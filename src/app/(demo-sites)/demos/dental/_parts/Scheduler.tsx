"use client";

import { CalendarDays, Check, ChevronLeft, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { useClientValue } from "@/components/shared/useClientValue";
import { type Errors, hasErrors, validate } from "@/lib/validate";
import { SLOTS, dentists, isBooked, treatments } from "./data";

type Day = { key: string; date: Date; label: string; dow: number };

function useDays(): Day[] {
  const today = useClientValue(() => new Date().toDateString());
  return useMemo(() => {
    if (!today) return [];
    const t = new Date(today);
    return Array.from({ length: 21 }, (_, i) => new Date(t.getFullYear(), t.getMonth(), t.getDate() + i))
      .filter((d) => d.getDay() !== 0)
      .slice(0, 14)
      .map((d) => ({ key: d.toDateString(), date: d, dow: d.getDay(), label: d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" }) }));
  }, [today]);
}

/** Which dentist (if any) is free at this slot. "any" picks the first dentist working that day who is free. */
function freeDentist(day: Day, dentist: string, slot: string, isToday: boolean) {
  if (isToday) {
    const now = new Date();
    const [h, m] = slot.split(":").map(Number);
    if (h * 60 + m <= now.getHours() * 60 + now.getMinutes() + 60) return null;
  }
  const pool = dentist === "any" ? dentists : dentists.filter((d) => d.id === dentist);
  return pool.find((d) => d.days.includes(day.dow) && !isBooked(day.key, d.id, slot)) ?? null;
}

export function Scheduler() {
  const days = useDays();
  const [treatment, setTreatment] = useState("checkup");
  const [dentist, setDentist] = useState("any");
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"time" | "details">("time");
  const [v, setV] = useState({ name: "", phone: "", email: "", dob: "", newPatient: "Yes", notes: "" });
  const [errors, setErrors] = useState<Errors<"name" | "phone" | "email">>({});
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ treatment?: string; dentist?: string }>).detail;
      if (d.treatment) setTreatment(d.treatment);
      if (d.dentist) setDentist(d.dentist);
      setSlot(null);
      setStep("time");
    };
    window.addEventListener("pp:book", on);
    return () => window.removeEventListener("pp:book", on);
  }, []);

  const day = days.find((d) => d.key === (dayKey ?? days[0]?.key)) ?? null;
  const isToday = !!day && day.key === days[0]?.key && day.date.toDateString() === new Date().toDateString();
  const available = day ? SLOTS.map((s) => ({ s, who: freeDentist(day, dentist, s, isToday) })) : [];
  const openCount = (d: Day) => SLOTS.filter((s) => freeDentist(d, dentist, s, d.key === days[0]?.key)).length;
  const t = treatments.find((x) => x.id === treatment)!;
  const who = available.find((a) => a.s === slot)?.who ?? null;

  const confirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, { name: [{ kind: "required", message: "Please add the patient's name." }], phone: [{ kind: "required" }, { kind: "phone" }], email: [{ kind: "required" }, { kind: "email" }] });
    setErrors(errs);
    if (hasErrors(errs) || !day || !slot || !who) return;
    setDone(formatEnquiry("New appointment — Pearl & Pine Dental", { Patient: v.name, Phone: v.phone, Email: v.email, "Date of birth": v.dob, "New patient": v.newPatient, Treatment: `${t.name} (${t.mins} min, ${t.fee})`, Dentist: who.name, When: `${day.label} at ${slot}`, Notes: v.notes }));
  };

  if (done)
    return <DemoResult brand="Pearl & Pine Dental" industryName="Clinic" demoSlug="dental" industrySlug="clinics" preview={done} onReset={() => { setDone(null); setStep("time"); setSlot(null); }} className="border-[#1F4D45]/15 bg-white" channel="clinic booking inbox and the patient's SMS" />;

  return (
    <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-40px_rgba(31,77,69,0.5)] ring-1 ring-[#1F4D45]/10 lg:grid-cols-[320px_1fr]">
      <aside className="border-b border-[#1F4D45]/10 bg-[#F2F7F6] p-6 lg:border-r lg:border-b-0">
        <label htmlFor="pp-t" className="text-sm font-medium">Treatment</label>
        <select id="pp-t" value={treatment} onChange={(e) => { setTreatment(e.target.value); setSlot(null); }} className="mt-1 min-h-12 w-full rounded-xl bg-white px-3 ring-1 ring-[#1F4D45]/15">
          {treatments.map((x) => <option key={x.id} value={x.id}>{x.name} · {x.fee}</option>)}
        </select>
        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Dentist</legend>
          <div className="mt-2 grid gap-2">
            {[{ id: "any", name: "First available", role: "Fastest appointment" }, ...dentists].map((d) => (
              <label key={d.id} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ring-1 transition ${dentist === d.id ? "bg-white ring-2 ring-[#3BA58B]" : "ring-[#1F4D45]/10 hover:bg-white"}`}>
                <input type="radio" name="pp-dentist" className="size-4 accent-[#1F4D45]" checked={dentist === d.id} onChange={() => { setDentist(d.id); setSlot(null); }} />
                <span className="text-sm"><span className="block font-medium">{d.name}</span><span className="text-xs text-[#0B1F1C]/60">{d.role}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-5 rounded-xl bg-white p-4 text-sm ring-1 ring-[#1F4D45]/10">
          <p className="flex items-center gap-2 font-medium"><Clock className="size-4 text-[#3BA58B]" aria-hidden /> {t.mins} minutes · {t.fee}</p>
          <p className="mt-1 text-[#0B1F1C]/65">{t.note}</p>
        </div>
      </aside>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {step === "time" ? (
            <motion.div key="time" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
              <p className="flex items-center gap-2 font-medium"><CalendarDays className="size-5 text-[#3BA58B]" aria-hidden /> Choose a day</p>
              <div className="no-scrollbar -mx-2 mt-3 flex gap-2 overflow-x-auto px-2 pb-2" role="group" aria-label="Available days">
                {days.length === 0 ? <p className="text-sm text-[#0B1F1C]/60">Loading calendar…</p> : null}
                {days.map((d) => {
                  const n = openCount(d);
                  const on = (dayKey ?? days[0]?.key) === d.key;
                  return (
                    <button key={d.key} type="button" disabled={n === 0} aria-pressed={on} onClick={() => { setDayKey(d.key); setSlot(null); }} className={`flex min-h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl text-sm transition disabled:opacity-35 ${on ? "bg-[#1F4D45] text-white" : "bg-[#F2F7F6] hover:bg-[#e3efec]"}`}>
                      <span>{d.label.split(" ")[0]}</span>
                      <span className="font-dd text-2xl">{d.date.getDate()}</span>
                      <span className={`text-[11px] ${on ? "text-white/80" : "text-[#1F4D45]"}`}>{n ? `${n} free` : "Full"}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-6 font-medium">Available times{day ? ` · ${day.label}` : ""}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-6" role="group" aria-label="Available times">
                {available.map(({ s, who: w }) => (
                  <button key={s} type="button" disabled={!w} aria-pressed={slot === s} onClick={() => setSlot(s)} className={`min-h-11 rounded-xl text-sm font-medium transition ${slot === s ? "bg-[#3BA58B] text-white" : w ? "bg-[#F2F7F6] hover:bg-[#e3efec]" : "cursor-not-allowed bg-white text-[#0B1F1C]/30 line-through ring-1 ring-[#1F4D45]/10"}`} aria-label={w ? s : `${s}, booked`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#F2F7F6] p-4 sm:flex-row sm:items-center" aria-live="polite">
                <p className="text-sm">{slot && who && day ? <><strong>{t.name}</strong> with <strong>{who.name}</strong>, {day.label} at {slot}</> : "Pick a time to continue."}</p>
                <button type="button" disabled={!slot} onClick={() => setStep("details")} className="min-h-12 rounded-full bg-[#1F4D45] px-6 font-medium text-white disabled:opacity-40">Continue</button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="details" onSubmit={confirm} noValidate initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="grid gap-4 sm:grid-cols-2">
              <button type="button" onClick={() => setStep("time")} className="inline-flex min-h-10 items-center gap-1 text-sm font-medium text-[#1F4D45] sm:col-span-2"><ChevronLeft className="size-4" aria-hidden /> Change time</button>
              <p className="flex items-center gap-2 rounded-2xl bg-[#F2F7F6] p-4 text-sm sm:col-span-2"><Check className="size-4 text-[#3BA58B]" aria-hidden /> {t.name} · {who?.name} · {day?.label} at {slot}</p>
              {(["name", "phone", "email"] as const).map((k) => (
                <div key={k} className={k === "name" ? "sm:col-span-2" : ""}>
                  <label htmlFor={`pp-${k}`} className="mb-1 block text-sm font-medium">{{ name: "Patient's full name", phone: "Mobile", email: "Email" }[k]}</label>
                  <input id={`pp-${k}`} type={k === "email" ? "email" : k === "phone" ? "tel" : "text"} autoComplete={k === "name" ? "name" : k === "phone" ? "tel" : "email"} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `pp-${k}-e` : undefined} className={`min-h-12 w-full rounded-xl px-3 ring-1 ${errors[k] ? "ring-2 ring-[#b42318]" : "ring-[#1F4D45]/20"}`} />
                  {errors[k] ? <p id={`pp-${k}-e`} className="mt-1 text-sm text-[#b42318]">{errors[k]}</p> : null}
                </div>
              ))}
              <div><label htmlFor="pp-dob" className="mb-1 block text-sm font-medium">Date of birth</label><input id="pp-dob" type="date" value={v.dob} onChange={(e) => setV({ ...v, dob: e.target.value })} className="min-h-12 w-full rounded-xl px-3 ring-1 ring-[#1F4D45]/20" /></div>
              <fieldset className="sm:col-span-2"><legend className="mb-1 text-sm font-medium">First visit to Pearl &amp; Pine?</legend>
                <div className="flex gap-2">{["Yes", "No"].map((o) => <label key={o} className={`flex min-h-11 cursor-pointer items-center rounded-xl px-5 text-sm ring-1 ${v.newPatient === o ? "bg-[#1F4D45] text-white ring-[#1F4D45]" : "ring-[#1F4D45]/20"}`}><input type="radio" name="pp-new" className="sr-only" checked={v.newPatient === o} onChange={() => setV({ ...v, newPatient: o })} />{o}</label>)}</div>
              </fieldset>
              <div className="sm:col-span-2"><label htmlFor="pp-notes" className="mb-1 block text-sm font-medium">Anything we should know? (anxiety, pain, medications)</label><textarea id="pp-notes" rows={3} value={v.notes} onChange={(e) => setV({ ...v, notes: e.target.value })} className="w-full rounded-xl px-3 py-2 ring-1 ring-[#1F4D45]/20" /></div>
              <button type="submit" className="min-h-13 rounded-full bg-[#1F4D45] px-8 font-medium text-white sm:col-span-2 sm:justify-self-start">Confirm appointment</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function BookFor({ treatment, dentist, className, children }: { treatment?: string; dentist?: string; className: string; children: React.ReactNode }) {
  return (
    <a href="#book" className={className} onClick={() => window.dispatchEvent(new CustomEvent("pp:book", { detail: { treatment, dentist } }))}>
      {children}
    </a>
  );
}
