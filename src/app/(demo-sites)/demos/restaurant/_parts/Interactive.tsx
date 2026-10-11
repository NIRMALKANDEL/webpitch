"use client";

import { CalendarCheck, Menu as MenuIcon, Minus, Phone, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DemoNoticeDialog } from "@/components/shared/DemoNoticeDialog";
import { everyMs, useClientValue } from "@/components/shared/useClientValue";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Lightbox } from "@/components/shared/Lightbox";
import { type Errors, hasErrors, validate } from "@/lib/validate";
import { unsplash } from "@/lib/media";
import { CartButton, useCart } from "./Cart";
import { gallery, hours, thali } from "./data";

const ThaliScene = dynamic(() => import("./ThaliScene"), { ssr: false });

const links = [
  ["#menu", "Menu"],
  ["#gallery", "Gallery"],
  ["#reviews", "Reviews"],
  ["#reserve", "Reserve"],
  ["#visit", "Visit"],
] as const;

/** Day and time in London, re-read every minute. */
function londonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${get("weekday")}|${get("hour")}:${get("minute")}`;
}
const tick = everyMs(60000);

function useOpenStatus() {
  const now = useClientValue(londonNow, tick);
  if (!now) return null;
  const [day, time] = now.split("|");
  const today = hours.find((h) => h.day === day)!;
  if (time >= today.open && time < today.close) return `Open now · closes ${today.close}`;
  if (time < today.open) return `Closed · opens ${today.open} today`;
  return "Closed now · order for tomorrow";
}

export function OpenNow({ className = "" }: { className?: string }) {
  const status = useOpenStatus();
  return (
    <p className={`inline-flex min-h-8 items-center gap-2 rounded-full bg-white/15 px-3 text-sm backdrop-blur ${className}`} aria-live="polite">
      <span className={`size-2 rounded-full ${status?.startsWith("Open") ? "bg-[#4ade80]" : "bg-[#E3A21A]"}`} aria-hidden />
      {status ?? "Checking opening hours…"}
    </p>
  );
}

export function TodayHours() {
  const today = useClientValue(londonNow, tick)?.split("|")[0] ?? null;
  return (
    <table className="w-full text-[15px]">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} className={`border-b border-white/15 ${today === h.day ? "font-bold text-[#E3A21A]" : ""}`}>
            <th scope="row" className="py-2 text-left font-normal">{h.day}{today === h.day ? " (today)" : ""}</th>
            <td className="py-2 text-right">{h.open}–{h.close}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function RestaurantNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(([h]) => {
      const el = document.querySelector(h);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", on);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled ? "bg-[#12372A]/95 shadow-lg backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 text-white md:h-20 md:px-8">
        <a href="#top" className="font-dd text-xl tracking-wide md:text-2xl">
          Tamarind <span className="text-[#E3A21A]">&amp;</span> Smoke
        </a>
        <nav aria-label="Restaurant" className="hidden items-center gap-1 md:flex">
          {links.map(([h, l]) => (
            <a key={h} href={h} className={`rounded-full px-3 py-2 text-[15px] font-semibold transition hover:text-[#E3A21A] ${active === h ? "text-[#E3A21A]" : ""}`}>
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <CartButton className="hover:bg-white/10" />
          <a href="#menu" className="hidden min-h-11 items-center rounded-full bg-[#E3A21A] px-5 font-bold text-[#1b1b1b] md:inline-flex">
            Order Now
          </a>
          <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-white/10 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-[#12372A] p-6 text-white md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button type="button" onClick={() => setOpen(false)} className="ml-auto grid size-11 place-items-center rounded-full hover:bg-white/10" aria-label="Close menu">
              <X className="size-6" />
            </button>
            <nav className="mt-8 grid gap-2">
              {links.map(([h, l]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="font-dd text-4xl">
                  {l}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/** Mobile sticky action bar, sitting above the demo controls. */
export function MobileActions() {
  const { setOpen, count } = useCart();
  const [call, setCall] = useState(false);
  return (
    <>
      <div
        className="fixed inset-x-3 z-40 grid grid-cols-3 gap-1 rounded-2xl bg-[#12372A] p-1.5 text-white shadow-2xl md:hidden"
        style={{ bottom: "calc(var(--demobar-h, 64px) + 16px)" }}
      >
        <button type="button" onClick={() => setCall(true)} className="flex min-h-12 flex-col items-center justify-center rounded-xl text-xs font-semibold hover:bg-white/10">
          <Phone className="size-4" aria-hidden /> Call
        </button>
        <button type="button" onClick={() => (count ? setOpen(true) : document.querySelector("#menu")?.scrollIntoView())} className="flex min-h-12 flex-col items-center justify-center rounded-xl bg-[#E3A21A] text-xs font-bold text-[#1b1b1b]">
          <ShoppingBag className="size-4" aria-hidden /> {count ? `Order (${count})` : "Order"}
        </button>
        <a href="#reserve" className="flex min-h-12 flex-col items-center justify-center rounded-xl text-xs font-semibold hover:bg-white/10">
          <CalendarCheck className="size-4" aria-hidden /> Reserve
        </a>
      </div>
      <DemoNoticeDialog slug="restaurant" open={call} onClose={() => setCall(false)} action="call your restaurant's phone number directly" />
    </>
  );
}

/** Scroll-scrubbed reveal of the signature dish. */
export function DishReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1.08]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 10]);
  const ingredients = ["Mathania chillies", "Slow-smoked ghee", "Bone-in lamb shoulder", "Whole spices, ground daily", "Six hours on the coals"];

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#12372A] py-24 text-white md:py-36" aria-labelledby="sig-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <motion.div style={{ scale }} className="relative mx-auto aspect-square w-[min(88vw,600px)]">
          <Scene3DGate
            className="absolute inset-0"
            render={(ready) => <ThaliScene bowls={thali} onReady={ready} />}
            fallback={<motion.div style={{ rotate }} className="absolute inset-[8%] overflow-hidden rounded-full"><Image src={unsplash("1585937421612-70a008356fbe")} alt="Laal maas lamb curry, seen from above" fill sizes="(min-width:768px) 520px, 80vw" className="object-cover" /></motion.div>}
          />
        </motion.div>
        <div>
          <p className="text-lg font-bold text-[#E3A21A]">The one to order</p>
          <h2 id="sig-title" className="mt-3 font-dd text-5xl leading-[1.02] md:text-7xl">Laal maas</h2>
          <p className="mt-5 max-w-md text-lg text-white/75">Served as a full thali. Drag the plate to spin it. 
            A Rajasthani hunters&apos; curry, made our way: fiery, smoky and worth the wait. £17.50, serves one generously.
          </p>
          <ul className="mt-8 space-y-3">
            {ingredients.map((i, n) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ delay: n * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 border-b border-white/15 pb-3 text-lg"
              >
                <span className="size-2 rounded-full bg-[#E3A21A]" aria-hidden /> {i}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FoodGallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const items = gallery.map((g) => ({ src: unsplash(g.id), alt: g.alt }));
  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4">
        {gallery.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setIdx(i)}
            className="group relative mb-3 block w-full overflow-hidden rounded-xl md:mb-4"
            aria-label={`Open photo: ${g.alt}`}
          >
            <Image
              src={unsplash(g.id)}
              alt={g.alt}
              width={600}
              height={i % 3 === 0 ? 760 : 460}
              sizes="(min-width:768px) 33vw, 50vw"
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>
      <Lightbox items={items} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </>
  );
}

type RField = "name" | "phone" | "date" | "time" | "notes";

export function Reservation() {
  const [v, setV] = useState({ name: "", phone: "", date: "", time: "", notes: "" });
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("None");
  const [errors, setErrors] = useState<Errors<RField>>({});
  const [done, setDone] = useState<string | null>(null);
  const minDate = useClientValue(() => new Date().toISOString().slice(0, 10)) ?? "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, {
      name: [{ kind: "required", message: "Please add your name." }],
      phone: [{ kind: "required", message: "We need a number to confirm." }, { kind: "phone" }],
      date: [{ kind: "required", message: "Choose a date." }],
      time: [{ kind: "required", message: "Choose a time." }],
    });
    if (v.date && minDate && v.date < minDate) errs.date = "Please choose today or a future date.";
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(
      formatEnquiry("New table booking — Tamarind & Smoke", {
        Name: v.name,
        Phone: v.phone,
        Date: v.date,
        Time: v.time,
        Guests: guests,
        Occasion: occasion,
        Notes: v.notes,
      }),
    );
  };

  if (done)
    return (
      <DemoResult
        brand="Tamarind & Smoke"
        industryName="Restaurant"
        demoSlug="restaurant"
        industrySlug="restaurants"
        preview={done}
        onReset={() => setDone(null)}
        className="border-white/20 bg-white text-[#1b1b1b]"
      />
    );

  const field = "min-h-12 w-full rounded-xl border-2 bg-white px-4 text-base text-[#1b1b1b]";
  const bc = (k: RField) => (errors[k] ? "border-[#B3261E]" : "border-transparent");
  const err = (k: RField) => (errors[k] ? <p id={`r-${k}-e`} className="mt-1 text-sm text-[#fca5a5]">{errors[k]}</p> : null);

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="r-name" className="mb-1.5 block text-sm font-bold">Name</label>
        <input id="r-name" autoComplete="name" className={`${field} ${bc("name")}`} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "r-name-e" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="r-phone" className="mb-1.5 block text-sm font-bold">Phone</label>
        <input id="r-phone" type="tel" autoComplete="tel" className={`${field} ${bc("phone")}`} value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "r-phone-e" : undefined} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="r-date" className="mb-1.5 block text-sm font-bold">Date</label>
        <input id="r-date" type="date" min={minDate} className={`${field} ${bc("date")}`} value={v.date} onChange={(e) => setV({ ...v, date: e.target.value })} aria-invalid={!!errors.date} aria-describedby={errors.date ? "r-date-e" : undefined} />
        {err("date")}
      </div>
      <div>
        <label htmlFor="r-time" className="mb-1.5 block text-sm font-bold">Time</label>
        <select id="r-time" className={`${field} ${bc("time")}`} value={v.time} onChange={(e) => setV({ ...v, time: e.target.value })} aria-invalid={!!errors.time} aria-describedby={errors.time ? "r-time-e" : undefined}>
          <option value="">Choose a time</option>
          {["12:30", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {err("time")}
      </div>
      <div>
        <p className="mb-1.5 text-sm font-bold" id="r-guests">Guests</p>
        <div className="flex min-h-12 items-center justify-between rounded-xl bg-white px-2 text-[#1b1b1b]" role="group" aria-labelledby="r-guests">
          <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid size-9 place-items-center rounded-full hover:bg-black/5" aria-label="Fewer guests">
            <Minus className="size-4" />
          </button>
          <span className="font-bold" aria-live="polite">{guests} {guests === 1 ? "guest" : "guests"}</span>
          <button type="button" onClick={() => setGuests((g) => Math.min(12, g + 1))} className="grid size-9 place-items-center rounded-full hover:bg-black/5" aria-label="More guests">
            <Plus className="size-4" />
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="r-occ" className="mb-1.5 block text-sm font-bold">Occasion</label>
        <select id="r-occ" className={`${field} border-transparent`} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
          {["None", "Birthday", "Anniversary", "Business dinner", "Date night"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="r-notes" className="mb-1.5 block text-sm font-bold">Notes (allergies, high chair…)</label>
        <textarea id="r-notes" rows={3} className={`${field} border-transparent py-3`} value={v.notes} onChange={(e) => setV({ ...v, notes: e.target.value })} />
      </div>
      <button type="submit" className="min-h-12 rounded-full bg-[#E3A21A] px-8 font-bold text-[#1b1b1b] sm:col-span-2 sm:justify-self-start">
        Request Booking
      </button>
    </form>
  );
}

/** Floating spice particles over the hero: turmeric, chili and cardamom specks drifting upward. */
export function SpiceParticles() {
  const reduced = useClientValue(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (reduced !== false) return null;
  const colors = ["#E3A21A", "#FF6B2C", "#B3261E", "#7FB069", "#FFD166"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {Array.from({ length: 26 }, (_, i) => {
        const left = (i * 37) % 100;
        const size = 4 + ((i * 7) % 9);
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full blur-[0.5px]"
            style={{ left: `${left}%`, width: size, height: size, background: colors[i % colors.length] }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: [-20, -700], x: [0, (i % 2 ? 1 : -1) * (20 + (i % 5) * 12)], opacity: [0, 0.9, 0] }}
            transition={{ duration: 7 + (i % 6), repeat: Infinity, delay: (i * 0.37) % 6, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
