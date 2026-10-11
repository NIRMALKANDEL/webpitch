"use client";

import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { unsplash } from "@/lib/media";
import { type Errors, hasErrors, validate } from "@/lib/validate";

export const projects = [
  { slug: "fitzroy-terrace", name: "Fitzroy Terrace", type: "Residential", area: "186 m²", place: "Fitzroy", scope: "Full renovation, joinery, lighting", cover: "1724582586529-62622e50c0b3", images: ["1724582586529-62622e50c0b3", "1725257928373-dc6d2ac7b145", "1680210849951-34d1a56eb7aa"] },
  { slug: "brunswick-loft", name: "Brunswick Loft", type: "Residential", area: "112 m²", place: "Brunswick", scope: "Interior design, furniture", cover: "1664711942326-2c3351e215e6", images: ["1664711942326-2c3351e215e6", "1668089677938-b52086753f77", "1600489000022-c2086d79f9d4"] },
  { slug: "sorrento-house", name: "Sorrento House", type: "Residential", area: "240 m²", place: "Sorrento", scope: "Architecture, interiors, landscape", cover: "1628012209120-d9db7abf7eab", images: ["1628012209120-d9db7abf7eab", "1721815693498-cc28507c0ba2", "1609081144289-eacc3108cd03"] },
  { slug: "collins-cafe", name: "Pressed, Collins St", type: "Hospitality", area: "95 m²", place: "Melbourne CBD", scope: "Cafe fit-out, branding coordination", cover: "1554118811-1e0d58224f24", images: ["1554118811-1e0d58224f24", "1555396273-367ea4eb4db5"] },
  { slug: "richmond-studio", name: "Richmond Studio", type: "Commercial", area: "310 m²", place: "Richmond", scope: "Workplace design, acoustics", cover: "1519219788971-8d9797e0928e", images: ["1519219788971-8d9797e0928e", "1611269154421-4e27233ac5c7"] },
  { slug: "carlton-salon", name: "Atelier Hair, Carlton", type: "Commercial", area: "80 m²", place: "Carlton", scope: "Salon fit-out, custom mirrors", cover: "1600948836101-f9ffda59d250", images: ["1600948836101-f9ffda59d250", "1633681926022-84c23e8cb2d6"] },
];

const types = ["All", "Residential", "Commercial", "Hospitality"] as const;

export function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  return (
    <div ref={ref} className="relative h-[70svh] min-h-[420px] overflow-hidden md:h-[88svh]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={unsplash("1724582586529-62622e50c0b3")} alt="A calm living room with a deep sofa and soft daylight" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}

function BeforeAfter({ id }: { id: string }) {
  const [pos, setPos] = useState(50);
  return (
    <figure>
      <div className="relative aspect-[16/10] select-none overflow-hidden bg-[#E7E5E1]">
        <Image src={unsplash(id)} alt="After: the finished room" fill sizes="(min-width:768px) 60vw, 92vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={unsplash(id)} alt="Before: the room prior to renovation" fill sizes="(min-width:768px) 60vw, 92vw" className="object-cover brightness-[0.62] contrast-[0.85] grayscale sepia-[0.25]" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-semibold shadow">⇆</span>
        </div>
        <span className="absolute top-3 left-3 bg-white/90 px-2 py-1 font-dd text-[11px] tracking-[0.15em]">BEFORE</span>
        <span className="absolute top-3 right-3 bg-white/90 px-2 py-1 font-dd text-[11px] tracking-[0.15em]">AFTER</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(+e.target.value)}
          aria-label="Drag to compare before and after"
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-2 text-xs text-[#171717]/55">Illustrative before/after for this demo. Drag the slider or use the arrow keys.</figcaption>
    </figure>
  );
}

export function Projects() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [open, setOpen] = useState<(typeof projects)[number] | null>(null);
  const list = type === "All" ? projects : projects.filter((p) => p.type === type);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-[#171717]/10 pb-4 font-dd text-sm tracking-[0.12em]">
        {types.map((t) => (
          <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)} className={`min-h-10 transition ${type === t ? "text-[#5B6B3A]" : "text-[#171717]/45 hover:text-[#171717]"}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <motion.ul layout className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li layout key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <button type="button" onClick={() => setOpen(p)} className="group block w-full text-left" aria-label={`Open project ${p.name}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E7E5E1]">
                  <Image src={unsplash(p.cover)} alt={`${p.name}, ${p.place}`} fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover transition duration-1000 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-[#171717]/15 pt-3">
                  <p className="font-dd text-xl font-light">{p.name}</p>
                  <p className="text-sm text-[#171717]/55">{p.type} · {p.area}</p>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[80] overflow-y-auto bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={open.name}>
            <div className="mx-auto max-w-6xl px-5 py-6 md:px-10">
              <div className="flex items-center justify-between">
                <p className="font-dd text-sm tracking-[0.2em]">STUDIO NEEM</p>
                <button type="button" autoFocus onClick={() => setOpen(null)} className="grid size-11 place-items-center rounded-full hover:bg-black/5" aria-label="Close project">
                  <X className="size-6" />
                </button>
              </div>
              <div className="mt-10 grid gap-10 md:grid-cols-[1fr_2fr]">
                <div>
                  <h3 className="font-dd text-5xl leading-none font-light">{open.name}</h3>
                  <dl className="mt-8 divide-y divide-[#171717]/10 border-y border-[#171717]/10 text-sm">
                    {[["Type", open.type], ["Location", open.place], ["Area", open.area], ["Scope", open.scope]].map(([k, val]) => (
                      <div key={k} className="flex justify-between gap-4 py-3">
                        <dt className="text-[#171717]/55">{k}</dt>
                        <dd className="text-right">{val}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="#consult" onClick={() => setOpen(null)} className="mt-8 inline-flex min-h-12 items-center gap-2 bg-[#171717] px-6 text-sm tracking-wide text-white">
                    Start a project like this <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
                <div className="space-y-6">
                  <BeforeAfter id={open.cover} />
                  {open.images.slice(1).map((id) => (
                    <div key={id} className="relative aspect-[16/10] overflow-hidden bg-[#E7E5E1]">
                      <Image src={unsplash(id)} alt={`${open.name} interior detail`} fill sizes="(min-width:768px) 60vw, 92vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

type F = "name" | "email" | "phone" | "property" | "suburb" | "slot";

export function Consultation() {
  const [v, setV] = useState({ name: "", email: "", phone: "", property: "", area: "", budget: "", suburb: "", date: "", slot: "", notes: "" });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);
  const slots = ["Mon 10:00", "Tue 14:00", "Wed 11:30", "Thu 16:00", "Fri 09:30", "Sat 10:30"];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, {
      name: [{ kind: "required" }],
      email: [{ kind: "required" }, { kind: "email" }],
      phone: [{ kind: "phone" }],
      property: [{ kind: "required", message: "Choose a property type." }],
      suburb: [{ kind: "required", message: "Which suburb is the project in?" }],
      slot: [{ kind: "required", message: "Pick a consultation slot." }],
    });
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(formatEnquiry("Consultation request — Studio Neem", { Name: v.name, Email: v.email, Phone: v.phone, Property: v.property, "Area (m²)": v.area, Budget: v.budget, Suburb: v.suburb, Slot: v.slot, Notes: v.notes }));
  };

  if (done) return <DemoResult brand="Studio Neem" industryName="Interior design" demoSlug="interior" industrySlug="interiors" preview={done} onReset={() => setDone(null)} className="border-[#171717]/15 bg-[#f7f6f3]" channel="email" />;

  const input = "min-h-12 w-full border-0 border-b bg-transparent px-0 text-lg outline-none focus:border-[#5B6B3A]";
  const bc = (k: F) => (errors[k] ? "border-[#b42318]" : "border-[#171717]/20");
  const err = (k: F) => (errors[k] ? <p id={`sn-${k}-e`} className="mt-1 text-sm text-[#b42318]">{errors[k]}</p> : null);
  const a = (k: F) => ({ id: `sn-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `sn-${k}-e` : undefined });
  const lab = "font-dd text-xs tracking-[0.15em] text-[#171717]/55";

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 md:grid-cols-2">
      <div><label htmlFor="sn-name" className={lab}>NAME</label><input {...a("name")} autoComplete="name" className={`${input} ${bc("name")}`} value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />{err("name")}</div>
      <div><label htmlFor="sn-email" className={lab}>EMAIL</label><input {...a("email")} type="email" autoComplete="email" className={`${input} ${bc("email")}`} value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} />{err("email")}</div>
      <div><label htmlFor="sn-phone" className={lab}>PHONE (OPTIONAL)</label><input {...a("phone")} type="tel" autoComplete="tel" className={`${input} ${bc("phone")}`} value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />{err("phone")}</div>
      <div>
        <label htmlFor="sn-property" className={lab}>PROPERTY</label>
        <select {...a("property")} className={`${input} ${bc("property")}`} value={v.property} onChange={(e) => setV({ ...v, property: e.target.value })}>
          <option value="">Choose…</option>
          {["House", "Apartment", "Townhouse", "Office", "Cafe / restaurant", "Retail"].map((o) => <option key={o}>{o}</option>)}
        </select>
        {err("property")}
      </div>
      <div><label htmlFor="sn-area" className={lab}>AREA (M²)</label><input id="sn-area" inputMode="numeric" className={`${input} border-[#171717]/20`} value={v.area} onChange={(e) => setV({ ...v, area: e.target.value })} /></div>
      <div>
        <label htmlFor="sn-budget" className={lab}>BUDGET (AUD)</label>
        <select id="sn-budget" className={`${input} border-[#171717]/20`} value={v.budget} onChange={(e) => setV({ ...v, budget: e.target.value })}>
          <option value="">Choose…</option>
          {["Under $50k", "$50k–$150k", "$150k–$400k", "$400k+"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="md:col-span-2"><label htmlFor="sn-suburb" className={lab}>SUBURB</label><input {...a("suburb")} autoComplete="address-level2" className={`${input} ${bc("suburb")}`} value={v.suburb} onChange={(e) => setV({ ...v, suburb: e.target.value })} />{err("suburb")}</div>
      <fieldset className="md:col-span-2" aria-describedby={errors.slot ? "sn-slot-e" : undefined}>
        <legend className={lab}>CONSULTATION SLOT (NEXT WEEK, IN STUDIO OR ON SITE)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {slots.map((s) => (
            <label key={s} className={`flex min-h-11 cursor-pointer items-center border px-4 text-sm transition ${v.slot === s ? "border-[#5B6B3A] bg-[#5B6B3A] text-white" : "border-[#171717]/20 hover:border-[#171717]"}`}>
              <input type="radio" name="slot" value={s} checked={v.slot === s} onChange={() => setV({ ...v, slot: s })} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
        {err("slot")}
      </fieldset>
      <div className="md:col-span-2"><label htmlFor="sn-notes" className={lab}>ABOUT YOUR PROJECT</label><textarea id="sn-notes" rows={3} className={`${input} border-[#171717]/20 py-2`} value={v.notes} onChange={(e) => setV({ ...v, notes: e.target.value })} /></div>
      <button type="submit" className="min-h-13 bg-[#171717] px-10 font-dd text-sm tracking-[0.15em] text-white md:justify-self-start">REQUEST CONSULTATION</button>
    </form>
  );
}
