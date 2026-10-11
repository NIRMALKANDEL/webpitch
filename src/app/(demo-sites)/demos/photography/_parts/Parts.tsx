"use client";

import { Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { useEffect, useRef, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Lightbox } from "@/components/shared/Lightbox";
import { unsplash, unsplashSized, videos } from "@/lib/media";

const CurvedGallery = dynamic(() => import("@/components/three/CurvedGallery"), { ssr: false });
import { type Errors, hasErrors, validate } from "@/lib/validate";

export const portfolio = [
  { id: "1722952934708-749c22eb2e58", cat: "Weddings", alt: "Bride and groom under warm fairy lights", tall: true },
  { id: "1615966650071-855b15f29ad1", cat: "Pre-wedding", alt: "Couple dancing in silhouette at sunset" },
  { id: "1610173827043-9db50e0d8ef9", cat: "Portraits", alt: "Bride in red with kundan jewellery", tall: true },
  { id: "1681717166573-f71589207785", cat: "Haldi & Mehendi", alt: "Bride laughing as turmeric is showered at her haldi" },
  { id: "1587271636175-90d58cdad458", cat: "Weddings", alt: "Wedding mandap decorated with pink flowers" },
  { id: "1732118400647-a81e3b37be87", cat: "Haldi & Mehendi", alt: "Hands with intricate mehendi", tall: true },
  { id: "1542460533-50ac46fb13d7", cat: "Pre-wedding", alt: "Couple silhouetted against a red sky" },
  { id: "1617627143750-d86bc21e42bb", cat: "Portraits", alt: "Woman in a pink silk saree in a forest" },
  { id: "1621801306185-8c0ccf9c8eb8", cat: "Weddings", alt: "Groom holding the bride's hennaed hand" },
  { id: "1681717075175-19feb7a6f664", cat: "Haldi & Mehendi", alt: "Bride in yellow with marigold jewellery", tall: true },
  { id: "1519307212971-dd9561667ffb", cat: "Pre-wedding", alt: "Couple by the sea at golden hour", tall: true },
  { id: "1727430228383-aa1fb59db8bf", cat: "Portraits", alt: "Portrait of a woman in a red silk saree" },
  { id: "1591604466107-ec97de577aff", cat: "Weddings", alt: "Couple by a lake in autumn" },
  { id: "1789971649652-ae5dfeeaa7b4", cat: "Haldi & Mehendi", alt: "Marigold garlands hanging for a ceremony" },
  { id: "1679006831648-7c9ea12e5807", cat: "Portraits", alt: "Woman in a green silk saree with temple jewellery", tall: true },
];

const cats = ["All", "Weddings", "Pre-wedding", "Portraits", "Haldi & Mehendi"] as const;

export function Portfolio() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [idx, setIdx] = useState<number | null>(null);
  const list = cat === "All" ? portfolio : portfolio.filter((p) => p.cat === cat);
  return (
    <>
      <div role="group" aria-label="Filter portfolio" className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 md:mx-0 md:justify-center md:px-0">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`min-h-11 shrink-0 border-b text-sm tracking-wide transition ${cat === c ? "border-[#C9A3A0] text-[#C9A3A0]" : "border-transparent text-[#8A8580] hover:text-[#F2EFEA]"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-10 columns-2 gap-3 md:columns-3 md:gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.button
              layout
              key={p.id}
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setIdx(i)}
              className="group mb-3 block w-full overflow-hidden md:mb-5"
              aria-label={`View photo: ${p.alt}`}
            >
              <Image
                src={unsplash(p.id)}
                alt={p.alt}
                width={700}
                height={p.tall ? 980 : 520}
                sizes="(min-width:768px) 33vw, 50vw"
                className="h-auto w-full object-cover grayscale-[20%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <Lightbox items={list.map((p) => ({ src: unsplash(p.id), alt: p.alt, caption: `${p.alt} · ${p.cat}` }))} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}

/** Full showreel in a modal with real controls (the hero loop is muted and decorative). */
export function ShowreelButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group inline-flex min-h-12 items-center gap-3 text-sm tracking-wide">
        <span className="grid size-12 place-items-center rounded-full border border-[#F2EFEA]/40 transition group-hover:bg-[#F2EFEA] group-hover:text-[#121212]">
          <Play className="size-4" aria-hidden />
        </span>
        Watch the showreel
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Showreel"
            className="fixed inset-0 z-[95] grid place-items-center bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" autoFocus onClick={() => setOpen(false)} className="absolute top-4 right-4 grid size-11 place-items-center rounded-full text-white hover:bg-white/10" aria-label="Close showreel">
              <X className="size-6" />
            </button>
            <video ref={ref} src={videos.henna.hd} poster={`${videos.henna.poster}?auto=compress&cs=tinysrgb&w=1600`} controls autoPlay playsInline className="max-h-[80vh] w-full max-w-5xl" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export const packages = [
  { id: "Essential", price: "₹1,45,000", hours: "1 day · 8 hours", items: ["1 lead photographer", "400+ edited photos", "Online gallery", "Delivery in 4 weeks"] },
  { id: "Signature", price: "₹2,95,000", hours: "2 days · all events", items: ["2 photographers + 1 filmmaker", "800+ edited photos", "3-minute highlight film", "30-page heirloom album"], popular: true },
  { id: "Heirloom", price: "₹4,80,000", hours: "3 days · destination ready", items: ["Full team of 4", "Pre-wedding shoot", "Feature film + highlight film", "Two 40-page albums"] },
];

export function PackagePicker() {
  return (
    <div className="grid gap-px bg-[#F2EFEA]/10 md:grid-cols-3">
      {packages.map((p) => (
        <article key={p.id} className="relative flex flex-col bg-[#121212] p-8 md:p-10">
          {p.popular ? <p className="absolute top-8 right-8 font-dm text-2xl text-[#C9A3A0]">most booked</p> : null}
          <h3 className="font-dd text-4xl font-light">{p.id}</h3>
          <p className="mt-1 text-sm text-[#8A8580]">{p.hours}</p>
          <p className="mt-6 font-dd text-3xl">from {p.price}</p>
          <ul className="mt-6 space-y-2 text-[#F2EFEA]/80">
            {p.items.map((i) => (
              <li key={i}>— {i}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("kg:package", { detail: p.id }));
              document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-auto inline-flex min-h-12 items-center justify-center border border-[#F2EFEA]/40 pt-0 text-sm tracking-wide transition hover:bg-[#F2EFEA] hover:text-[#121212]"
            style={{ marginTop: "2rem" }}
          >
            Enquire about {p.id}
          </button>
        </article>
      ))}
    </div>
  );
}

type F = "name" | "email" | "phone" | "date" | "venue" | "event";

export function EnquiryForm() {
  const [v, setV] = useState({ name: "", email: "", phone: "", date: "", venue: "", event: "", guests: "", pkg: "", heard: "", message: "" });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    const on = (e: Event) => setV((s) => ({ ...s, pkg: (e as CustomEvent<string>).detail }));
    window.addEventListener("kg:package", on);
    return () => window.removeEventListener("kg:package", on);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, {
      name: [{ kind: "required", message: "Please add your names." }],
      email: [{ kind: "required", message: "We reply by email first." }, { kind: "email" }],
      phone: [{ kind: "phone" }],
      event: [{ kind: "required", message: "Which event are we photographing?" }],
      date: [{ kind: "required", message: "Your date helps us check availability." }],
      venue: [{ kind: "required", message: "City or venue, even roughly." }],
    });
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(
      formatEnquiry("New date enquiry — Kohl & Gold Studio", {
        Names: v.name, Email: v.email, Phone: v.phone, Event: v.event, Date: v.date, Venue: v.venue,
        Guests: v.guests, Package: v.pkg, "Heard about us": v.heard, Message: v.message,
      }),
    );
  };

  if (done)
    return (
      <DemoResult brand="Kohl & Gold Studio" industryName="Photography" demoSlug="photography" industrySlug="photographers" preview={done} onReset={() => setDone(null)} className="border-[#F2EFEA]/20 bg-[#F2EFEA] text-[#121212]" channel="email and WhatsApp" />
    );

  const input = "min-h-12 w-full border-b bg-transparent py-2 text-lg text-[#F2EFEA] outline-none transition placeholder:text-[#8A8580]/70 focus:border-[#C9A3A0]";
  const bc = (k: F) => (errors[k] ? "border-[#e8a0a0]" : "border-[#F2EFEA]/25");
  const Field = ({ k, label, type = "text", auto }: { k: F; label: string; type?: string; auto?: string }) => (
    <div>
      <label htmlFor={`kg-${k}`} className="text-xs tracking-wide text-[#8A8580]">{label}</label>
      <input id={`kg-${k}`} type={type} autoComplete={auto} className={`${input} ${bc(k)}`} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `kg-${k}-e` : undefined} />
      {errors[k] ? <p id={`kg-${k}-e`} className="mt-1 text-sm text-[#e8a0a0]">{errors[k]}</p> : null}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 md:grid-cols-2">
      {Field({ k: "name", label: "Your names", auto: "name" })}
      {Field({ k: "email", label: "Email", type: "email", auto: "email" })}
      {Field({ k: "phone", label: "Phone / WhatsApp (optional)", type: "tel", auto: "tel" })}
      <div>
        <label htmlFor="kg-event" className="text-xs tracking-wide text-[#8A8580]">Event</label>
        <select id="kg-event" className={`${input} ${bc("event")} [&>option]:text-black`} value={v.event} onChange={(e) => setV({ ...v, event: e.target.value })} aria-invalid={!!errors.event} aria-describedby={errors.event ? "kg-event-e" : undefined}>
          <option value="">Choose…</option>
          {["Wedding", "Pre-wedding shoot", "Engagement", "Haldi & mehendi only", "Portrait session"].map((o) => <option key={o}>{o}</option>)}
        </select>
        {errors.event ? <p id="kg-event-e" className="mt-1 text-sm text-[#e8a0a0]">{errors.event}</p> : null}
      </div>
      {Field({ k: "date", label: "Date", type: "date" })}
      {Field({ k: "venue", label: "City or venue" })}
      <div>
        <label htmlFor="kg-guests" className="text-xs tracking-wide text-[#8A8580]">Approximate guests</label>
        <input id="kg-guests" inputMode="numeric" className={`${input} border-[#F2EFEA]/25`} value={v.guests} onChange={(e) => setV({ ...v, guests: e.target.value })} />
      </div>
      <div>
        <label htmlFor="kg-pkg" className="text-xs tracking-wide text-[#8A8580]">Package</label>
        <select id="kg-pkg" className={`${input} border-[#F2EFEA]/25 [&>option]:text-black`} value={v.pkg} onChange={(e) => setV({ ...v, pkg: e.target.value })}>
          <option value="">Not sure yet</option>
          {packages.map((p) => <option key={p.id}>{p.id}</option>)}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="kg-msg" className="text-xs tracking-wide text-[#8A8580]">Tell us about your day</label>
        <textarea id="kg-msg" rows={3} className={`${input} border-[#F2EFEA]/25`} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} />
      </div>
      <button type="submit" className="min-h-13 bg-[#F2EFEA] px-10 text-sm font-medium tracking-wide text-[#121212] transition hover:bg-[#C9A3A0] md:justify-self-start">
        Check our availability
      </button>
    </form>
  );
}

/** Stand inside the album: a 3D ring of photographs you drag to look around. */
export function GalleryWalk() {
  const picks = portfolio.slice(0, 12);
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <Scene3DGate
        className="h-[70vh] min-h-[420px] w-full overflow-hidden"
        render={(ready) => <CurvedGallery images={picks.map((p) => unsplashSized(p.id, 800))} background="#121212" onOpen={setIdx} onReady={ready} />}
        fallback={<Image src={unsplash(picks[0].id)} alt={picks[0].alt} fill sizes="100vw" className="object-cover opacity-70" />}
      />
      <Lightbox items={picks.map((p) => ({ src: unsplash(p.id), alt: p.alt, caption: p.alt }))} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}
