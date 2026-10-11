"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { useClientValue } from "@/components/shared/useClientValue";
import { type Errors, hasErrors, validate } from "@/lib/validate";

const PortfolioScene = dynamic(() => import("@/components/three/PortfolioScene"), { ssr: false });
const AvatarScene = dynamic(() => import("@/components/three/AvatarScene"), { ssr: false });
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/** Letters resolve from random glyphs into the final word, once, on load. */
export function Scramble({ text, className }: { text: string; className?: string }) {
  const reduced = useClientValue(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (reduced !== false) return;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setOut(text.split("").map((c, i) => (c === " " || i < frame / 2 ? c : GLYPHS[(i * 7 + frame) % GLYPHS.length])).join(""));
      if (frame / 2 > text.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [text, reduced]);
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/** A soft glow that follows the cursor on devices with a fine pointer. */
export function CursorGlow() {
  const fine = useClientValue(() => window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    if (!fine) return;
    const on = (e: PointerEvent) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [fine, x, y]);
  if (!fine) return null;
  return <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-0 size-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)]" />;
}

export function HeroScene() {
  return (
    <Scene3DGate
      className="absolute inset-0"
      render={(ready) => <PortfolioScene onReady={ready} />}
      fallback={<div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(139,92,246,0.55),transparent_35%),radial-gradient(circle_at_40%_60%,rgba(34,211,238,0.35),transparent_30%)]" />}
    />
  );
}

export function TiltCard({ title, kind, year, img, href }: { title: string; kind: string; year: string; img: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
      initial={{ opacity: 0, y: 40, clipPath: "inset(30% 0 0 0 round 24px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 24px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={img} alt={`${title} project screenshot`} fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover object-top transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-transparent to-transparent" />
      </div>
      <div className="flex items-end justify-between gap-4 p-6">
        <div>
          <p className="text-xs text-[#22D3EE]">{kind} · {year}</p>
          <p className="mt-1 font-dd text-2xl font-semibold">{title}</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition group-hover:rotate-45 group-hover:bg-[#8B5CF6]"><ArrowUpRight className="size-5" aria-hidden /></span>
      </div>
    </motion.a>
  );
}

export function ScrollLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#F472B6]" />;
}

type F = "name" | "email" | "msg";
export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", budget: "", msg: "" });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);
  if (done) return <DemoResult brand="Kai Varma" industryName="Portfolio" demoSlug="portfolio" industrySlug="personal-brands" preview={done} onReset={() => setDone(null)} className="border-white/15 bg-[#EDEDF5] text-[#07070B]" channel="email" />;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, { name: [{ kind: "required" }], email: [{ kind: "required" }, { kind: "email" }], msg: [{ kind: "required", message: "Tell me a little about the project." }, { kind: "min", n: 10 }] });
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(formatEnquiry("New project enquiry — kaivarma.dev", { Name: v.name, Email: v.email, Budget: v.budget, Message: v.msg }));
  };
  const inp = (k: F) => `w-full border-b-2 bg-transparent py-3 text-xl outline-none transition placeholder:text-white/30 focus:border-[#22D3EE] ${errors[k] ? "border-[#fca5a5]" : "border-white/20"}`;
  return (
    <form onSubmit={submit} noValidate className="grid gap-8 md:grid-cols-2">
      {(["name", "email"] as const).map((k) => (
        <div key={k}>
          <label htmlFor={`kv-${k}`} className="text-sm text-white/70">{k === "name" ? "Your name" : "Email"}</label>
          <input id={`kv-${k}`} type={k === "email" ? "email" : "text"} autoComplete={k} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={inp(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `kv-${k}-e` : undefined} />
          {errors[k] ? <p id={`kv-${k}-e`} className="mt-1 text-sm text-[#fca5a5]">{errors[k]}</p> : null}
        </div>
      ))}
      <fieldset className="md:col-span-2">
        <legend className="text-sm text-white/70">Budget</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {["< $2k", "$2k–5k", "$5k–15k", "$15k+"].map((b) => (
            <label key={b} className={`flex min-h-11 cursor-pointer items-center rounded-full px-5 text-sm ring-1 transition ${v.budget === b ? "bg-[#8B5CF6] ring-[#8B5CF6]" : "ring-white/20 hover:ring-white/50"}`}>
              <input type="radio" name="kv-budget" className="sr-only" checked={v.budget === b} onChange={() => setV({ ...v, budget: b })} />{b}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <label htmlFor="kv-msg" className="text-sm text-white/70">What are we building?</label>
        <textarea id="kv-msg" rows={3} value={v.msg} onChange={(e) => setV({ ...v, msg: e.target.value })} className={inp("msg")} aria-invalid={!!errors.msg} aria-describedby={errors.msg ? "kv-msg-e" : undefined} />
        {errors.msg ? <p id="kv-msg-e" className="mt-1 text-sm text-[#fca5a5]">{errors.msg}</p> : null}
      </div>
      <button type="submit" className="group relative min-h-14 overflow-hidden rounded-full bg-[#EDEDF5] px-10 font-dd font-semibold text-[#07070B] md:justify-self-start">
        <span className="relative z-10">Send it</span>
        <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#F472B6] transition duration-500 group-hover:translate-x-0" />
      </button>
    </form>
  );
}

/** Intro: a counter runs to 100 and the curtain lifts. Shown once per session; skipped under reduced motion. */
export function IntroLoader() {
  const skip = useClientValue(() => {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("kv-intro") === "1";
    } catch {
      return true;
    }
  });
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (skip !== false) return;
    const c = animate(0, 100, { duration: 1.3, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)), onComplete: () => { setGone(true); try { sessionStorage.setItem("kv-intro", "1"); } catch { /* ignore */ } } });
    return () => c.stop();
  }, [skip]);
  if (skip !== false) return null;
  return (
    <AnimatePresence>
      {!gone ? (
        <motion.div key="intro" aria-hidden exit={{ y: "-100%" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[120] flex items-end justify-between bg-[#07070B] p-6 md:p-12">
          <p className="font-dd text-sm text-white/60">Kai Varma — portfolio 2026</p>
          <p className="font-dd text-[22vw] leading-none font-extrabold text-transparent [-webkit-text-stroke:2px_#8B5CF6] md:text-[14vw]">{n}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Headline that rises in word by word when it scrolls into view. */
export function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span className="inline-block" initial={{ y: "110%" }} whileInView={{ y: "0%" }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
              {w}&nbsp;
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

/** Pulls toward the cursor while hovered; springs back on leave. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 15 });
  const y = useSpring(0, { stiffness: 220, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block ${className ?? ""}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export function AvatarBlock() {
  return (
    <Scene3DGate
      className="aspect-square w-full"
      render={(ready) => <AvatarScene onReady={ready} />}
      fallback={<div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.45),transparent_60%)]" />}
    />
  );
}

/** A ring of skill tags orbiting in 3D (CSS transforms, no WebGL). Drag or hover to pause. */
export function SkillOrbit({ skills }: { skills: string[] }) {
  const rot = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const reduced = useClientValue(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    if (paused || reduced !== false) return;
    const c = animate(rot, rot.get() + 360, { duration: 26, ease: "linear", repeat: Infinity });
    return () => c.stop();
  }, [paused, reduced, rot]);
  const transform = useTransform(rot, (r) => `rotateX(-14deg) rotateY(${r}deg)`);
  const step = 360 / skills.length;
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-3xl [perspective:1100px] md:h-[420px]" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#8B5CF6,transparent_70%)] blur-xl" aria-hidden />
      <motion.ul style={{ transform, transformStyle: "preserve-3d" }} className="absolute inset-0" aria-label="Skills">
        {skills.map((s, i) => (
          <li key={s} className="absolute top-1/2 left-1/2 -mt-6 -ml-20 flex h-12 w-40 items-center justify-center rounded-2xl bg-[#11111a]/90 font-dd text-sm ring-1 ring-white/20 backdrop-blur [backface-visibility:hidden]" style={{ transform: `rotateY(${i * step}deg) translateZ(clamp(170px, 30vw, 300px))` }}>
            {s}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/** Horizontal, draggable strip of behind-the-scenes photos. */
export function PhotoStrip({ photos }: { photos: { src: string; cap: string }[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [limit, setLimit] = useState(0);
  useEffect(() => {
    const m = () => setLimit(Math.max(0, (track.current?.scrollWidth ?? 0) - (wrap.current?.clientWidth ?? 0)));
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);
  return (
    <div ref={wrap} className="overflow-hidden">
      <motion.ul ref={track} drag="x" dragConstraints={{ left: -limit, right: 0 }} className="flex w-max cursor-grab gap-5 px-5 active:cursor-grabbing md:px-10" aria-label="Behind the scenes photos. Drag sideways.">
        {photos.map((p, i) => (
          <motion.li key={p.src} className="w-[70vw] shrink-0 md:w-[30vw]" initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/10">
              <Image src={p.src} alt={p.cap} fill draggable={false} sizes="(min-width:768px) 30vw, 70vw" className="pointer-events-none object-cover transition duration-700 hover:scale-105" />
            </div>
            <p className="mt-3 text-sm text-white/65">{p.cap}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
