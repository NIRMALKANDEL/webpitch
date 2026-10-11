"use client";

import { ChevronLeft, Clock, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useClientValue } from "@/components/shared/useClientValue";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Lightbox } from "@/components/shared/Lightbox";
import { unsplash } from "@/lib/media";

import { all, inr, services, team } from "./data";

type Ctx = { open: (serviceId?: string, stylist?: string) => void };
const BookingCtx = createContext<Ctx>({ open: () => {} });
export const useBooking = () => useContext(BookingCtx);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; service?: string; stylist?: string }>({ open: false });
  return (
    <BookingCtx.Provider value={{ open: (service, stylist) => setState({ open: true, service, stylist }) }}>
      {children}
      <AnimatePresence>{state.open ? <BookingPanel key="p" initial={state} onClose={() => setState({ open: false })} /> : null}</AnimatePresence>
    </BookingCtx.Provider>
  );
}

export function BookButton({ className, children, service, stylist }: { className: string; children: React.ReactNode; service?: string; stylist?: string }) {
  const { open } = useBooking();
  return (
    <button type="button" className={className} onClick={() => open(service, stylist)}>
      {children}
    </button>
  );
}

function BookingPanel({ initial, onClose }: { initial: { service?: string; stylist?: string }; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>(initial.service ? [initial.service] : []);
  const [stylist, setStylist] = useState(initial.stylist ?? "Any stylist");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const today = useClientValue(() => new Date().toDateString());
  const days = useMemo(() => {
    if (!today) return [];
    const d = new Date(today);
    return Array.from({ length: 7 }, (_, i) => {
      const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i + 1);
      return { key: x.toDateString(), label: x.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) };
    });
  }, [today]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const chosen = all.filter((s) => picked.includes(s.id));
  const total = chosen.reduce((a, s) => a + s.price, 0);
  const mins = chosen.reduce((a, s) => a + s.mins, 0);
  const next = () => {
    setErr("");
    if (step === 0 && !chosen.length) return setErr("Choose at least one service.");
    if (step === 1 && (!day || !time)) return setErr("Choose a day and a time.");
    if (step === 2) {
      if (name.trim().length < 2) return setErr("Please add your name.");
      if (!/^\+?[0-9\s-]{8,15}$/.test(phone)) return setErr("Enter a valid mobile number.");
      return setDone(formatEnquiry("New booking — Velvet Rooms", { Name: name, Phone: phone, Services: chosen.map((s) => s.name).join(", "), Stylist: stylist, Day: day, Time: time, Duration: `${mins} min`, Total: inr(total) }));
    }
    setStep(step + 1);
  };

  return (
    <motion.div className="fixed inset-0 z-[85] flex justify-end bg-[#831843]/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label="Book an appointment" className="flex h-full w-full max-w-lg flex-col rounded-l-[32px] bg-white" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 280 }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6">
          <div>
            <p className="font-dd text-2xl">Book your visit</p>
            {!done ? <p className="text-sm text-[#831843]/60">Step {step + 1} of 3 · {["Services", "Day & time", "Your details"][step]}</p> : null}
          </div>
          <button type="button" autoFocus onClick={onClose} className="grid size-11 place-items-center rounded-full bg-[#FDF2F8]" aria-label="Close booking">
            <X className="size-5" />
          </button>
        </div>
        {!done ? (
          <div className="mx-6 h-1.5 overflow-hidden rounded-full bg-[#FDF2F8]">
            <motion.div className="h-full rounded-full bg-[#BE185D]" animate={{ width: `${((step + 1) / 3) * 100}%` }} />
          </div>
        ) : null}
        <div className="flex-1 overflow-y-auto p-6">
          {done ? (
            <DemoResult brand="Velvet Rooms" industryName="Salon" demoSlug="salon" industrySlug="salons" preview={done} onReset={onClose} className="border-[#831843]/15 bg-[#FDF2F8] text-[#831843]" />
          ) : step === 0 ? (
            Object.entries(services).map(([cat, list]) => (
              <fieldset key={cat} className="mb-5">
                <legend className="mb-2 text-sm font-semibold text-[#831843]/60">{cat}</legend>
                <div className="grid gap-2">
                  {list.map((s) => {
                    const on = picked.includes(s.id);
                    return (
                      <label key={s.id} className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 px-4 transition ${on ? "border-[#BE185D] bg-[#FDF2F8]" : "border-[#FDF2F8]"}`}>
                        <span className="flex items-center gap-3">
                          <input type="checkbox" className="size-5 accent-[#BE185D]" checked={on} onChange={() => setPicked((p) => (on ? p.filter((x) => x !== s.id) : [...p, s.id]))} />
                          <span>
                            <span className="block font-semibold">{s.name}</span>
                            <span className="text-xs text-[#831843]/60">{s.mins} min</span>
                          </span>
                        </span>
                        <span className="font-semibold">{inr(s.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))
          ) : step === 1 ? (
            <div className="grid gap-6">
              <label className="grid gap-2 text-sm font-semibold">
                Stylist
                <select value={stylist} onChange={(e) => setStylist(e.target.value)} className="min-h-12 rounded-2xl border-2 border-[#FDF2F8] px-4 text-base font-normal">
                  <option>Any stylist</option>
                  {team.map((t) => <option key={t.name}>{t.name}</option>)}
                </select>
              </label>
              <fieldset>
                <legend className="mb-2 text-sm font-semibold">Day</legend>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {days.map((d) => (
                    <button key={d.key} type="button" aria-pressed={day === d.label} onClick={() => setDay(d.label)} className={`min-h-12 rounded-2xl text-sm ${day === d.label ? "bg-[#BE185D] text-white" : "bg-[#FDF2F8]"}`}>{d.label}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-sm font-semibold">Time</legend>
                <div className="grid grid-cols-4 gap-2">
                  {["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:00"].map((t) => (
                    <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)} className={`min-h-11 rounded-2xl text-sm ${time === t ? "bg-[#BE185D] text-white" : "bg-[#FDF2F8]"}`}>{t}</button>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : (
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-semibold">Name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="min-h-12 rounded-2xl border-2 border-[#FDF2F8] px-4 text-base font-normal" /></label>
              <label className="grid gap-2 text-sm font-semibold">Mobile<input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" className="min-h-12 rounded-2xl border-2 border-[#FDF2F8] px-4 text-base font-normal" /></label>
              <p className="rounded-2xl bg-[#FDF2F8] p-4 text-sm">{chosen.map((s) => s.name).join(", ")} · {stylist} · {day} at {time}</p>
            </div>
          )}
          {err ? <p role="alert" className="mt-4 text-sm font-semibold text-[#b42318]">{err}</p> : null}
        </div>
        {!done ? (
          <div className="flex items-center justify-between gap-3 border-t border-[#FDF2F8] p-6">
            <div>
              <p className="font-dd text-2xl">{inr(total)}</p>
              <p className="flex items-center gap-1 text-xs text-[#831843]/60"><Clock className="size-3" aria-hidden /> {mins} min</p>
            </div>
            <div className="flex gap-2">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="grid size-12 place-items-center rounded-full bg-[#FDF2F8]" aria-label="Back"><ChevronLeft className="size-5" /></button>
              ) : null}
              <button type="button" onClick={next} className="min-h-12 rounded-full bg-[#BE185D] px-7 font-semibold text-white">{step === 2 ? "Confirm booking" : "Continue"}</button>
            </div>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export function ServiceTabs() {
  const [tab, setTab] = useState("Hair");
  return (
    <div className="rounded-[32px] bg-white p-4 shadow-[0_20px_60px_-30px_rgba(131,24,67,0.35)] md:p-8">
      <div role="tablist" aria-label="Service categories" className="no-scrollbar flex gap-2 overflow-x-auto rounded-full bg-[#FDF2F8] p-1.5">
        {Object.keys(services).map((t) => (
          <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)} className="relative min-h-11 flex-1 shrink-0 rounded-full px-4 text-sm font-semibold">
            {tab === t ? <motion.span layoutId="salon-tab" className="absolute inset-0 rounded-full bg-[#BE185D]" /> : null}
            <span className={`relative ${tab === t ? "text-white" : ""}`}>{t}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={tab}>
      <ul className="mt-4 divide-y divide-[#FDF2F8]">
        {services[tab].map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-[#831843]/60">{s.mins} min · from {inr(s.price)}</p>
            </div>
            <BookButton service={s.id} className="min-h-10 rounded-full border-2 border-[#BE185D] px-5 text-sm font-semibold text-[#BE185D] transition hover:bg-[#BE185D] hover:text-white">Book</BookButton>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export function OfferBar() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="relative bg-[#6D4FC2] px-12 py-2.5 text-center text-sm text-white">
      Monsoon offer: 20% off hair spas until 31 October (sample offer)
      <button type="button" onClick={() => setShow(false)} className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full hover:bg-white/15" aria-label="Dismiss offer"><X className="size-4" /></button>
    </div>
  );
}

const gal = ["1600948836101-f9ffda59d250", "1610992015762-45dca7fa3a85", "1600334089648-b0d9d3028eb2", "1580618672591-eb180b1a973f", "1616394584738-fc6e612e71b9", "1521590832167-7bcbfaa6381f"];
export function SalonGallery() {
  const [i, setI] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {gal.map((id, n) => (
          <button key={id} type="button" onClick={() => setI(n)} className="relative aspect-square overflow-hidden rounded-[28px]" aria-label="Open photo">
            <Image src={unsplash(id)} alt="Inside Velvet Rooms" fill sizes="(min-width:768px) 30vw, 50vw" className="object-cover transition duration-500 hover:scale-105" />
          </button>
        ))}
      </div>
      <Lightbox items={gal.map((id) => ({ src: unsplash(id), alt: "Inside Velvet Rooms" }))} index={i} onClose={() => setI(null)} onIndex={setI} theme="light" />
    </>
  );
}

