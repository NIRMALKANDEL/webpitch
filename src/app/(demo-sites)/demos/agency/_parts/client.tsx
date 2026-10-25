"use client";

import { ArrowUpRight, CalendarDays, Check, CircleAlert, LoaderCircle, Menu, Moon, Sun, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { useClientValue } from "@/components/shared/useClientValue";
import { type Errors, hasErrors, validate } from "@/lib/validate";
import {
  BASE,
  budgets,
  callTimes,
  categories,
  type Category,
  categoryColor,
  disciplines,
  type Discipline,
  formatDate,
  nav,
  type Post,
  type Project,
  readMinutes,
  services as allServices,
  timelines,
} from "./data";
import { accentBg, btnPink, disp, ProjectCover, rail, railItem, wrap } from "./ui";

const WireScene = dynamic(() => import("./WireScene"), { ssr: false });
const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ theme */

const THEME_EVENT = "hw-theme";
const readTheme = () => (document.getElementById("hw")?.getAttribute("data-hw") === "light" ? "light" : "dark");
const onTheme = (cb: () => void) => {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
};
/** "dark" | "light", or null during server render and hydration. */
export const useHwTheme = () => useClientValue(readTheme, onTheme);

const THEME_SCRIPT = `try{var t=localStorage.getItem("hw-theme");if(t==="light"||t==="dark")document.getElementById("hw").setAttribute("data-hw",t)}catch(e){}`;

/**
 * Applies the saved light/dark choice. On a full page load the inline script runs before the first paint (no flash);
 * on client navigations scripts don't run, so the layout effect applies it before the browser paints instead.
 * The script type switches to text/plain on the client so React doesn't warn about rendering a script.
 */
export function ThemeBoot() {
  useLayoutEffect(() => {
    try {
      const t = localStorage.getItem("hw-theme");
      if ((t === "light" || t === "dark") && readTheme() !== t) {
        document.getElementById("hw")?.setAttribute("data-hw", t);
        window.dispatchEvent(new Event(THEME_EVENT));
      }
    } catch {
      /* storage blocked: stay on the default */
    }
  }, []);
  return <script type={typeof window === "undefined" ? "text/javascript" : "text/plain"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}

export function ThemeToggle() {
  const flip = () => {
    const next = readTheme() === "dark" ? "light" : "dark";
    document.getElementById("hw")?.setAttribute("data-hw", next);
    try {
      localStorage.setItem("hw-theme", next);
    } catch {
      /* storage blocked: the choice lasts for this visit */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };
  return (
    <button type="button" onClick={flip} className="grid size-11 place-items-center rounded-full border border-(--line) transition hover:border-(--fg)/40" aria-label="Switch between dark and light mode">
      <Sun className="size-[18px] [[data-hw=light]_&]:hidden" aria-hidden />
      <Moon className="hidden size-[18px] [[data-hw=light]_&]:block" aria-hidden />
    </button>
  );
}

/* ------------------------------------------------------------------ book a call */

const BOOK_EVENT = "hw-book";

/** Opens the "Book a call" dialog from anywhere. `topic` prefills what the call is about. */
export function BookCallButton({ className = btnPink, children = "Book a free call", topic }: { className?: string; children?: React.ReactNode; topic?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent(BOOK_EVENT, { detail: topic }))} aria-haspopup="dialog">
      {children}
    </button>
  );
}

function nextWeekdays(n: number) {
  const out: { iso: string; day: string; date: string }[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    out.push({
      iso: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString("en-GB", { weekday: "short" }),
      date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    });
  }
  return out;
}

type BF = "day" | "time" | "name" | "email" | "topic";
const EMPTY_CALL = { day: "", time: "", name: "", email: "", topic: "" };

/** One dialog for the whole site: pick a day and time, leave a name and email. Nothing is booked in the demo. */
export function BookCallDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [days, setDays] = useState<ReturnType<typeof nextWeekdays>>([]);
  const [v, setV] = useState(EMPTY_CALL);
  const [errors, setErrors] = useState<Errors<BF>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const open = (e: Event) => {
      const topic = (e as CustomEvent<string | undefined>).detail;
      setDays(nextWeekdays(5));
      setV((x) => ({ ...x, topic: topic ?? x.topic }));
      setErrors({});
      setDone(false);
      ref.current?.showModal();
    };
    window.addEventListener(BOOK_EVENT, open);
    return () => window.removeEventListener(BOOK_EVENT, open);
  }, []);

  const close = () => ref.current?.close();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate<BF>(v, {
      day: [{ kind: "required", message: "Pick a day." }],
      time: [{ kind: "required", message: "Pick a time." }],
      name: [{ kind: "required", message: "Tell us your name." }],
      email: [{ kind: "required", message: "We need an email to send the invite." }, { kind: "email" }],
      topic: [{ kind: "max", n: 300 }],
    });
    setErrors(errs);
    if (!hasErrors(errs)) setDone(true);
  };
  const pick = (k: BF, val: string) => {
    setV({ ...v, [k]: val });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };
  const chosen = days.find((d) => d.iso === v.day);
  const chip = (on: boolean) =>
    `min-h-11 rounded-2xl border px-3 text-sm transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--focus) ${on ? "border-(--pink) bg-(--pink) font-semibold text-[#0B0B0D]" : "border-(--line) hover:border-(--fg)/40"}`;
  const field = (k: BF) => `mt-1.5 w-full rounded-2xl border bg-(--bg) px-4 py-3 text-(--fg) outline-none transition focus:border-(--pink) ${errors[k] ? "border-[#FF4F8B]" : "border-(--line)"}`;
  const err = (k: BF) =>
    errors[k] ? (
      <p id={`bk-${k}-e`} className="mt-1.5 flex items-center gap-1.5 text-sm text-(--ink-pink)">
        <CircleAlert className="size-4 shrink-0" aria-hidden /> {errors[k]}
      </p>
    ) : null;

  return (
    <dialog
      ref={ref}
      aria-labelledby="bk-title"
      onClick={(e) => e.target === ref.current && close()}
      onClose={() => setTimeout(() => setDone(false), 300)}
      className="hw-sheet m-0 mt-auto max-h-[92svh] w-full max-w-none overflow-y-auto rounded-t-[28px] bg-(--card) p-0 text-(--fg) backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-lg sm:rounded-[28px]"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm text-(--muted)">
              <CalendarDays className="size-4" aria-hidden /> 20 minutes, video call
            </p>
            <h2 id="bk-title" className={`${disp} mt-1 text-2xl`}>
              {done ? "You're pencilled in" : "Book a free call"}
            </h2>
          </div>
          <button type="button" onClick={close} className="grid size-11 shrink-0 place-items-center rounded-full border border-(--line) hover:border-(--fg)/40" aria-label="Close">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {done ? (
          <div className="mt-6" role="status">
            <p className="rounded-2xl bg-(--lime) p-4 font-semibold text-[#0B0B0D]">
              {chosen ? `${chosen.day} ${chosen.date}` : ""} at {v.time} (IST), with {v.name.split(" ")[0] || "you"}.
            </p>
            <p className="mt-4 text-(--muted)">
              This is a demo, so nothing was booked and no email was sent. On a real site, a calendar invite would arrive at{" "}
              <span className="text-(--fg)">{v.email}</span> within a minute.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact?industry=agencies&demo=agency" className={btnPink}>
                Get a website like this
              </Link>
              <button type="button" onClick={close} className="min-h-12 rounded-full px-5 font-semibold hover:bg-(--fg)/5">
                Back to the site
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6 grid gap-5">
            <fieldset>
              <legend className="font-semibold">Day</legend>
              <div className="mt-2 grid grid-cols-5 gap-1.5" aria-describedby={errors.day ? "bk-day-e" : undefined}>
                {days.map((d) => (
                  <label key={d.iso} className={`${chip(v.day === d.iso)} flex flex-col items-center justify-center px-1 py-2 leading-tight`}>
                    <input type="radio" name="bk-day" className="sr-only" checked={v.day === d.iso} onChange={() => pick("day", d.iso)} />
                    <span className="font-semibold">{d.day}</span>
                    <span className="text-xs opacity-75">{d.date}</span>
                  </label>
                ))}
              </div>
              {err("day")}
            </fieldset>
            <fieldset>
              <legend className="font-semibold">
                Time <span className="font-normal text-(--muted)">(IST)</span>
              </legend>
              <div className="mt-2 grid grid-cols-4 gap-1.5" aria-describedby={errors.time ? "bk-time-e" : undefined}>
                {callTimes.map((t) => (
                  <label key={t} className={`${chip(v.time === t)} flex items-center justify-center`}>
                    <input type="radio" name="bk-time" className="sr-only" checked={v.time === t} onChange={() => pick("time", t)} />
                    {t}
                  </label>
                ))}
              </div>
              {err("time")}
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-name" className="font-semibold">Name</label>
                <input id="bk-name" autoComplete="name" value={v.name} onChange={(e) => pick("name", e.target.value)} className={field("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "bk-name-e" : undefined} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="bk-email" className="font-semibold">Email</label>
                <input id="bk-email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={(e) => pick("email", e.target.value)} className={field("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "bk-email-e" : undefined} />
                {err("email")}
              </div>
            </div>
            <div>
              <label htmlFor="bk-topic" className="font-semibold">
                What would you like to talk about? <span className="font-normal text-(--muted)">(optional)</span>
              </label>
              <textarea id="bk-topic" rows={2} value={v.topic} onChange={(e) => pick("topic", e.target.value)} className={field("topic")} placeholder="e.g. a new brand and website for our launch in spring" />
              {err("topic")}
            </div>
            <button type="submit" className={`${btnPink} w-full`}>
              Book the call
            </button>
            <p className="-mt-2 text-center text-xs text-(--muted)">Demo form: nothing is booked or sent.</p>
          </form>
        )}
      </div>
    </dialog>
  );
}

/* ------------------------------------------------------------------ chrome: nav, progress, cursor, floating CTA */

export function AgencyNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Close the menu whenever the page changes (menu links, back/forward buttons, links elsewhere on the page).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const btnEl = menuBtn.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      btnEl?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[70] isolate">
      {/* The blur sits on its own layer: a backdrop-filter on the header itself would trap the fixed mobile menu inside the 64px bar. */}
      <div aria-hidden className="absolute inset-0 -z-10 border-b border-(--line) bg-(--bg)/80 backdrop-blur-xl" />
      <a href="#main" className="sr-only rounded-full bg-(--lime) px-4 py-2 font-semibold text-[#0B0B0D] focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10">
        Skip to content
      </a>
      <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
        <Link href={BASE} className={`${disp} flex min-h-11 items-center gap-1.5 text-xl`} aria-label="Hotwire Studio home" onClick={() => setOpen(false)}>
          Hotwire<span aria-hidden className="mt-2 size-2 rounded-full bg-(--pink)" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative isolate rounded-full px-3.5 py-2 text-[15px] transition hover:text-(--fg) ${isActive(l.href) ? "text-(--fg)" : "text-(--muted)"}`}
            >
              {isActive(l.href) ? <motion.span layoutId="hw-nav-pill" aria-hidden className="absolute inset-0 -z-10 rounded-full bg-(--fg)/10" transition={{ duration: 0.35, ease }} /> : null}
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <BookCallButton className="hidden min-h-11 items-center gap-2 rounded-full bg-(--pink) px-5 text-sm font-semibold text-[#0B0B0D] transition hover:bg-(--lime) active:scale-[0.97] sm:inline-flex">
            Book a call
          </BookCallButton>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="hw-menu"
            className="grid size-11 place-items-center rounded-full border border-(--line) lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="hw-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-x-0 top-16 bottom-0 z-[70] overflow-y-auto bg-(--bg) lg:hidden"
          >
            <nav aria-label="Main menu" className={`${wrap} flex min-h-full flex-col pt-4 pb-32`}>
              <ul>
                {[{ href: BASE, label: "Home" }, ...nav].map((l, i) => (
                  <motion.li key={l.href} className="border-b border-(--line)" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.04, duration: 0.35, ease }}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={(l.href === BASE ? pathname === BASE : isActive(l.href)) ? "page" : undefined}
                      className={`${disp} flex min-h-15 items-center text-[clamp(1.75rem,8vw,2.5rem)] aria-[current=page]:text-(--ink-pink)`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="contents" onClickCapture={() => setOpen(false)}>
                  <BookCallButton className={btnPink}>Book a free call</BookCallButton>
                </span>
                <Link href={`${BASE}/enquire`} onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center rounded-full border border-(--line) px-6 font-semibold">
                  Send a brief
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/** Thin gradient bar under the header showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-16 z-[71] h-[3px] origin-left bg-gradient-to-r from-(--pink) to-(--violet)" />;
}

/** A dot that follows the mouse and swells over links and buttons (mouse and pen only, off for reduced motion). */
export function Cursor() {
  const enabled = useClientValue(() => window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45 });
  const sy = useSpring(y, { stiffness: 700, damping: 45 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(!!(e.target as Element | null)?.closest?.("a, button, label, summary"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: big ? 56 : 12, height: big ? 56 : 12 }}
      transition={{ duration: 0.25, ease }}
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-white mix-blend-difference"
    />
  );
}

/** Desktop: a "Book a call" pill appears bottom-right once the visitor has scrolled past the hero. */
export function FloatingBook() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (y: number) => setShow(y > 700)), [scrollY]);
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease }}
          className="fixed bottom-6 left-6 z-[80] hidden xl:block"
        >
          <BookCallButton className="flex min-h-13 items-center gap-2 rounded-full bg-(--pink) py-2 pr-6 pl-2 font-semibold text-[#0B0B0D] shadow-[0_12px_40px_-8px_rgb(255_46_147/0.6)] transition hover:bg-(--lime)">
            <span className="grid size-9 place-items-center rounded-full bg-[#0B0B0D] text-(--lime)">
              <CalendarDays className="size-4" aria-hidden />
            </span>
            Book a free call
          </BookCallButton>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ home hero */

export function HeroWire() {
  const theme = useHwTheme();
  const light = theme === "light";
  return (
    <Scene3DGate
      key={light ? "light" : "dark"}
      className="absolute inset-0 -z-10"
      render={(ready) => <WireScene onReady={ready} light={light} />}
      fallback={
        <picture>
          <source media="(max-width: 767px)" srcSet={`/demos/agency/wire-tall${light ? "-light" : ""}.webp`} />
          <img src={`/demos/agency/wire-wide${light ? "-light" : ""}.webp`} alt="" className="size-full object-cover object-top md:object-right" />
        </picture>
      }
    />
  );
}

const ROTATE = [
  { word: "challengers", bg: "bg-(--pink)" },
  { word: "food and drink", bg: "bg-(--lime)" },
  { word: "fashion labels", bg: "bg-(--violet)" },
  { word: "indie music", bg: "bg-(--pink)" },
];

/** Cycles who the studio is for inside a coloured pill. Stays on the first word for reduced motion. */
export function HeroRotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % ROTATE.length), 2400);
    return () => clearInterval(t);
  }, [reduce]);
  const item = ROTATE[i];
  return (
    <span className={`relative inline-grid max-w-full overflow-hidden rounded-[0.3em] px-[0.22em] pb-[0.04em] align-baseline text-[#0B0B0D] transition-colors duration-500 ${item.bg}`}>
      <AnimatePresence initial={false}>
        <motion.span key={item.word} className="whitespace-nowrap [grid-area:1/1]" initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "-110%" }} transition={{ duration: 0.5, ease }}>
          {item.word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ marquee */

/** A band of words that drifts sideways and speeds up, skews and reverses with the visitor's scrolling. */
export function VelocityMarquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8]);
  const dir = useRef(1);
  const x = useTransform(base, (v: number) => `${((((v % 50) + 50) % 50) - 50).toFixed(3)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    base.set(base.get() + dir.current * (delta / 1000) * (2 + Math.abs(f) * 2));
  });

  const row = items.map((w, i) => (
    <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
      <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--fg)]" : ""}>{w}</span>
      <span className={`size-4 rounded-full md:size-5 ${["bg-(--pink)", "bg-(--lime)", "bg-(--violet)"][i % 3]}`} />
    </span>
  ));
  return (
    <div className="overflow-hidden border-y border-(--line) py-5 md:py-7" aria-hidden>
      <motion.div style={{ x, skewX: skew }} className={`${disp} flex w-max text-[clamp(2rem,6vw,4.5rem)] leading-none`}>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ work */

/** Card that tilts toward the pointer in 3D (mouse only). */
export function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 20 });
  const sry = useSpring(ry, { stiffness: 250, damping: 20 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={(e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function ProjectCard({ p, coverClass = "h-[clamp(240px,30vw,420px)]" }: { p: Project; coverClass?: string }) {
  return (
    <Tilt className="h-full">
      <Link href={`${BASE}/work/${p.slug}`} className="group flex h-full flex-col rounded-[24px]">
        <ProjectCover project={p} className={`${coverClass} rounded-[24px] transition-[border-radius] duration-500 group-hover:rounded-[40px]`} />
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className={`${disp} text-xl md:text-2xl`}>{p.client}</h3>
            <p className="mt-1 text-(--muted)">{p.summary}</p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-(--line) transition duration-300 group-hover:rotate-45 group-hover:border-(--pink) group-hover:bg-(--pink) group-hover:text-[#0B0B0D]">
            <ArrowUpRight className="size-5" aria-hidden />
          </span>
        </div>
        <p className="mt-3 flex flex-wrap gap-1.5">
          {p.disciplines.map((d) => (
            <span key={d} className="rounded-full border border-(--line) px-2.5 py-0.5 text-xs text-(--muted)">
              {d}
            </span>
          ))}
        </p>
      </Link>
    </Tilt>
  );
}

// Varied widths on a 12-column grid so the portfolio doesn't read as a wall of identical cards.
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Discipline | "All">("All");
  const list = active === "All" ? projects : projects.filter((p) => p.disciplines.includes(active));
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by discipline">
        {(["All", ...disciplines] as const).map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={active === d}
            onClick={() => setActive(d)}
            className={`relative isolate min-h-11 rounded-full border px-4 text-sm font-medium transition ${active === d ? "border-transparent text-(--bg)" : "border-(--line) text-(--fg)/80 hover:border-(--fg)/40"}`}
          >
            {active === d ? <motion.span layoutId="hw-work-filter" aria-hidden className="absolute inset-0 -z-10 rounded-full bg-(--fg)" transition={{ duration: 0.35, ease }} /> : null}
            {d}
          </button>
        ))}
        <p className="ml-auto text-sm text-(--muted)" aria-live="polite">
          {list.length} {list.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <div className={`relative mt-6 md:mt-8 md:gap-x-5 md:gap-y-10 ${rail("md:grid-cols-12")}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease }}
              className={`${railItem} ${SPANS[i % SPANS.length]}`}
            >
              <ProjectCard p={p} />
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ journal */

export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`${BASE}/blog/${p.slug}`} className="group flex h-full flex-col rounded-[22px] border border-(--line) bg-(--card) p-5 transition duration-300 hover:-translate-y-1 hover:border-(--fg)/30 md:p-6">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className={`rounded-full px-2.5 py-0.5 font-semibold text-[#0B0B0D] ${accentBg[categoryColor[p.category]]}`}>{p.category}</span>
        <span className="text-(--muted)">{readMinutes(p)} min read</span>
      </div>
      <h3 className={`${disp} mt-5 text-[1.4rem] leading-[1.15] transition group-hover:text-(--ink-pink)`}>{p.title}</h3>
      <p className="mt-2 text-(--muted)">{p.excerpt}</p>
      <p className="mt-auto pt-5 text-sm text-(--muted)">
        <time dateTime={p.date}>{formatDate(p.date)}</time>
      </p>
    </Link>
  );
}

export function JournalGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const list = active === "All" ? posts : posts.filter((p) => p.category === active);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
        {(["All", ...categories] as const).map((c) => {
          const n = c === "All" ? posts.length : posts.filter((p) => p.category === c).length;
          const on = active === c;
          const onClass = c === "All" ? "bg-(--fg) text-(--bg)" : `${accentBg[categoryColor[c]]} text-[#0B0B0D]`;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={`min-h-11 rounded-full border px-4 text-sm font-medium transition ${on ? `border-transparent ${onClass}` : "border-(--line) text-(--fg)/80 hover:border-(--fg)/40"}`}
            >
              {c} <span className="opacity-60">{n}</span>
            </button>
          );
        })}
      </div>
      <ul className={`mt-6 md:mt-8 ${rail("md:grid-cols-2 lg:grid-cols-3")}`} aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.li key={p.slug} layout className={railItem} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease }}>
              <PostCard p={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ project brief form */

type F = "name" | "email" | "company" | "website" | "services" | "budget" | "timeline" | "message";
const MAX_MSG = 1500;

export function BriefForm() {
  const [v, setV] = useState({ name: "", email: "", company: "", website: "", budget: "", timeline: "", message: "" });
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors<F>>({});
  const [status, setStatus] = useState<"idle" | "checking" | "done">("idle");
  const [preview, setPreview] = useState("");
  const summary = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV({ ...v, [k]: e.target.value });
    if (errors[k as F]) setErrors({ ...errors, [k]: undefined });
  };
  const toggle = (s: string) => {
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
    if (errors.services) setErrors({ ...errors, services: undefined });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate<F>(
      { ...v, services: picked.length ? "yes" : "" },
      {
        name: [{ kind: "required", message: "Tell us your name." }],
        email: [{ kind: "required", message: "We need an email address to reply." }, { kind: "email" }],
        website: [{ kind: "url" }],
        services: [{ kind: "required", message: "Pick at least one thing you need." }],
        budget: [{ kind: "required", message: "Choose a budget range, or \"Not sure yet\"." }],
        message: [{ kind: "required", message: "Tell us a little about the project." }, { kind: "min", n: 20, message: "A couple of sentences helps: at least 20 characters." }, { kind: "max", n: MAX_MSG }],
      },
    );
    setErrors(errs);
    if (hasErrors(errs)) {
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setStatus("checking");
    // Nothing is sent: this demo only shows what the studio would receive.
    setTimeout(() => {
      setPreview(
        formatEnquiry("New project brief — hotwire.example", {
          Name: v.name,
          Email: v.email,
          Company: v.company,
          Website: v.website,
          Services: picked.join(", "),
          Budget: v.budget,
          Timeline: v.timeline,
          Message: v.message,
        }),
      );
      setStatus("done");
    }, 600);
  };

  if (status === "done")
    return (
      <DemoResult
        brand="Hotwire Studio"
        industryName="Creative agency"
        demoSlug="agency"
        industrySlug="agencies"
        preview={preview}
        channel="email"
        onReset={() => setStatus("idle")}
        className="border-transparent bg-(--lime) text-[#0B0B0D]"
      />
    );

  const field = (k: F) =>
    `mt-1.5 w-full rounded-2xl border bg-(--card) px-4 py-3 text-base text-(--fg) outline-none transition placeholder:text-(--muted)/70 focus:border-(--pink) ${errors[k] ? "border-[#FF4F8B]" : "border-(--line)"}`;
  const err = (k: F) =>
    errors[k] ? (
      <p id={`hw-${k}-e`} className="mt-1.5 flex items-center gap-1.5 text-sm text-(--ink-pink)">
        <CircleAlert className="size-4 shrink-0" aria-hidden /> {errors[k]}
      </p>
    ) : null;
  const aria = (k: F) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `hw-${k}-e` : undefined });
  const count = Object.values(errors).filter(Boolean).length;
  const chip = (on: boolean, onClass: string) =>
    `flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--focus) ${on ? `border-transparent font-semibold ${onClass}` : "border-(--line) hover:border-(--fg)/40"}`;

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-5 gap-y-6 md:grid-cols-2">
      <div ref={summary} tabIndex={-1} role="alert" className={count ? "rounded-2xl border border-[#FF4F8B]/50 bg-(--pink)/10 p-4 text-sm md:col-span-2" : "sr-only"}>
        {count ? `Please fix ${count === 1 ? "1 thing" : `${count} things`} below before sending your brief.` : ""}
      </div>

      <fieldset className="md:col-span-2">
        <legend className="font-semibold">
          What do you need? <span className="font-normal text-(--muted)">Pick all that apply.</span>
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2" aria-describedby={errors.services ? "hw-services-e" : undefined}>
          {allServices.map((s) => {
            const on = picked.includes(s.name);
            return (
              <label key={s.slug} className={chip(on, `${accentBg[s.color]} text-[#0B0B0D]`)}>
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(s.name)} />
                {on ? <Check className="size-4" aria-hidden /> : null}
                {s.name}
              </label>
            );
          })}
        </div>
        {err("services")}
      </fieldset>

      <fieldset className="md:col-span-2">
        <legend className="font-semibold">Budget range</legend>
        <div className="mt-2.5 flex flex-wrap gap-2" aria-describedby={errors.budget ? "hw-budget-e" : undefined}>
          {budgets.map((b) => (
            <label key={b} className={chip(v.budget === b, "bg-(--fg) text-(--bg)")}>
              <input
                type="radio"
                name="hw-budget"
                className="sr-only"
                checked={v.budget === b}
                onChange={() => {
                  setV({ ...v, budget: b });
                  if (errors.budget) setErrors({ ...errors, budget: undefined });
                }}
              />
              {b}
            </label>
          ))}
        </div>
        {err("budget")}
      </fieldset>

      <div>
        <label htmlFor="hw-name" className="font-semibold">Your name</label>
        <input id="hw-name" autoComplete="name" value={v.name} onChange={set("name")} className={field("name")} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="hw-email" className="font-semibold">Email</label>
        <input id="hw-email" type="email" autoComplete="email" inputMode="email" value={v.email} onChange={set("email")} className={field("email")} placeholder="you@company.com" {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="hw-company" className="font-semibold">
          Company or brand <span className="font-normal text-(--muted)">(optional)</span>
        </label>
        <input id="hw-company" autoComplete="organization" value={v.company} onChange={set("company")} className={field("company")} />
      </div>
      <div>
        <label htmlFor="hw-website" className="font-semibold">
          Current website <span className="font-normal text-(--muted)">(optional)</span>
        </label>
        <input id="hw-website" inputMode="url" autoComplete="url" value={v.website} onChange={set("website")} className={field("website")} placeholder="yourbrand.com" {...aria("website")} />
        {err("website")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="hw-timeline" className="font-semibold">
          When do you want to start? <span className="font-normal text-(--muted)">(optional)</span>
        </label>
        <select id="hw-timeline" value={v.timeline} onChange={set("timeline")} className={`${field("timeline")} md:max-w-sm`}>
          <option value="">Choose one</option>
          {timelines.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="hw-message" className="font-semibold">Tell us about the project</label>
          <span className={`text-xs ${v.message.length > MAX_MSG ? "text-(--ink-pink)" : "text-(--muted)"}`}>
            {v.message.length}/{MAX_MSG}
          </span>
        </div>
        <textarea id="hw-message" rows={5} value={v.message} onChange={set("message")} className={field("message")} placeholder="What are you launching, who is it for, and what has to change?" {...aria("message")} />
        {err("message")}
      </div>
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button type="submit" disabled={status === "checking"} className={`${btnPink} min-h-14 px-8 text-base disabled:opacity-70`}>
          {status === "checking" ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden /> Checking your brief
            </>
          ) : (
            "Send brief"
          )}
        </button>
        <p className="max-w-[44ch] text-sm text-(--muted)">This is a demo: nothing is sent. You&apos;ll see the email the studio would receive.</p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ small helpers */

/** Draws a gradient line across once it scrolls into view (used with the process steps). */
export function DrawLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-[2px] origin-left bg-gradient-to-r from-(--pink) to-(--violet) ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, ease }}
    />
  );
}

/** Newsletter sign-up with validation. In the demo nothing is stored or sent. */
export function NewsletterForm({ tone = "card" }: { tone?: "card" | "bright" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const bright = tone === "bright";
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate({ email }, { email: [{ kind: "required" }, { kind: "email" }] });
    setState(hasErrors(errs) ? "error" : "done");
  };
  if (state === "done")
    return (
      <p role="status" className={`flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold ${bright ? "bg-[#0B0B0D] text-white" : "bg-(--lime) text-[#0B0B0D]"}`}>
        <Check className="size-5 shrink-0" aria-hidden /> You&apos;d be subscribed now. (Demo: nothing was saved.)
      </p>
    );
  return (
    <form onSubmit={submit} noValidate className="w-full min-w-0">
      <label htmlFor={`nl-${tone}`} className="sr-only">
        Email address
      </label>
      <div className={`flex gap-2 rounded-full border p-1.5 ${bright ? "border-[#0B0B0D]/25 bg-white/50" : "border-(--line) bg-(--bg)"}`}>
        <input
          id={`nl-${tone}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@company.com"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `nl-${tone}-e` : undefined}
          className={`min-w-0 flex-1 bg-transparent px-4 outline-none ${bright ? "text-[#0B0B0D] placeholder:text-[#0B0B0D]/50" : "text-(--fg) placeholder:text-(--muted)"}`}
        />
        <button type="submit" className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition active:scale-[0.97] ${bright ? "bg-[#0B0B0D] text-white" : "bg-(--pink) text-[#0B0B0D] hover:bg-(--lime)"}`}>
          Subscribe
        </button>
      </div>
      {state === "error" ? (
        <p id={`nl-${tone}-e`} className={`mt-2 flex items-center gap-1.5 text-sm ${bright ? "text-[#0B0B0D]" : "text-(--ink-pink)"}`}>
          <CircleAlert className="size-4" aria-hidden /> Enter a valid email address, like name@example.com.
        </p>
      ) : null}
    </form>
  );
}

/** Copies the current page address, with feedback. */
export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard blocked: nothing to do */
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--line) px-4 text-sm font-semibold transition hover:border-(--fg)/40"
    >
      {copied ? <Check className="size-4 text-(--hi)" aria-hidden /> : null}
      <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
    </button>
  );
}
