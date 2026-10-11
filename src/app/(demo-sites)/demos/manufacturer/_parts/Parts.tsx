"use client";

import { ChevronDown, Plus, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createContext, useContext, useMemo, useState } from "react";
import { DemoResult, formatEnquiry } from "@/components/shared/DemoResult";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { PARTS, type PartId } from "@/components/three/constants";
import { unsplash } from "@/lib/media";
import { type Errors, hasErrors, validate } from "@/lib/validate";

const BoltScene = dynamic(() => import("@/components/three/BoltScene"), { ssr: false });

const catalogue = [
  { pn: "FL-HB-M16", name: "Hex bolt", cat: "Bolts", grade: "8.8 / 10.9", sizes: "M6–M36", finish: "Zinc flake, HDG, plain", moq: "5,000 pcs", std: "ISO 4014 / 4017" },
  { pn: "FL-CB-M12", name: "Carriage bolt", cat: "Bolts", grade: "4.6 / 8.8", sizes: "M6–M20", finish: "HDG", moq: "10,000 pcs", std: "DIN 603" },
  { pn: "FL-SB-M10", name: "Socket head cap screw", cat: "Bolts", grade: "12.9", sizes: "M3–M24", finish: "Black oxide", moq: "10,000 pcs", std: "ISO 4762" },
  { pn: "FL-HN-M16", name: "Hex nut", cat: "Nuts", grade: "Class 8 / 10", sizes: "M6–M42", finish: "Zinc flake, HDG", moq: "10,000 pcs", std: "ISO 4032" },
  { pn: "FL-NL-M12", name: "Nylon insert lock nut", cat: "Nuts", grade: "Class 8", sizes: "M4–M24", finish: "Zinc plated", moq: "10,000 pcs", std: "ISO 7040" },
  { pn: "FL-PW-16", name: "Plain washer", cat: "Washers", grade: "200 HV", sizes: "Ø3–Ø48", finish: "Zinc, plain", moq: "20,000 pcs", std: "ISO 7089" },
  { pn: "FL-SW-12", name: "Spring washer", cat: "Washers", grade: "Spring steel", sizes: "Ø4–Ø36", finish: "Zinc", moq: "20,000 pcs", std: "DIN 127B" },
  { pn: "FL-WA-M12", name: "Wedge anchor", cat: "Anchors", grade: "Carbon steel", sizes: "M8–M20", finish: "Zinc, SS304", moq: "2,000 pcs", std: "ETA option 7" },
  { pn: "FL-CF-01", name: "Custom forged component", cat: "Custom forgings", grade: "To drawing", sizes: "Up to 8 kg", finish: "To spec", moq: "1,000 pcs", std: "Customer drawing" },
];
const cats = ["All", "Bolts", "Nuts", "Washers", "Anchors", "Custom forgings"];

const C = createContext<{ list: string[]; add: (pn: string) => void; remove: (pn: string) => void }>(null!);
export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<string[]>([]);
  const v = useMemo(() => ({ list, add: (pn: string) => setList((l) => (l.includes(pn) ? l : [...l, pn])), remove: (pn: string) => setList((l) => l.filter((x) => x !== pn)) }), [list]);
  return <C.Provider value={v}>{children}</C.Provider>;
}

export function PartViewer() {
  const [exploded, setExploded] = useState(true);
  const [sel, setSel] = useState<PartId | null>("bolt");
  const { add } = useContext(C);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Scene3DGate
        className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_40%,#1e293b,#0F172A)]"
        render={(ready) => <BoltScene exploded={exploded} selected={sel} onSelect={setSel} onReady={ready} />}
        fallback={<Image src={unsplash("1607733067403-a0396fa4d3d0")} alt="Bolts and screws" fill sizes="(min-width:1024px) 55vw, 92vw" className="object-cover" />}
      />
      <div className="flex flex-col">
        <div className="flex gap-2">
          <button type="button" aria-pressed={exploded} onClick={() => setExploded(!exploded)} className="min-h-11 flex-1 rounded bg-[#0369A1] px-4 text-sm font-semibold text-white">{exploded ? "Assemble" : "Exploded view"}</button>
        </div>
        <p className="mt-6 text-xs font-semibold tracking-wide text-slate-500">PARTS IN THIS ASSEMBLY · CLICK IN 3D OR BELOW</p>
        <ul className="mt-2 divide-y divide-slate-200 rounded-lg bg-white ring-1 ring-slate-200">
          {(Object.keys(PARTS) as PartId[]).map((id) => (
            <li key={id}>
              <button type="button" aria-pressed={sel === id} onClick={() => setSel(id)} className={`w-full p-4 text-left transition ${sel === id ? "bg-[#e0f2fe]" : "hover:bg-slate-50"}`}>
                <span className="font-dm text-sm text-[#0369A1]">{PARTS[id].name.split(" ").pop()}</span>
                <span className="block font-semibold">{PARTS[id].name.replace(/ FL-.*/, "")}</span>
                <span className="block text-sm text-slate-600">{PARTS[id].spec}</span>
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => (Object.keys(PARTS) as PartId[]).forEach((p) => add(PARTS[p].name.split(" ").pop()!))} className="mt-4 min-h-11 rounded border-2 border-[#0F172A] text-sm font-semibold hover:bg-[#0F172A] hover:text-white">Add full assembly to enquiry</button>
      </div>
    </div>
  );
}

export function Catalogue() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const { add, list: picked } = useContext(C);
  const list = catalogue.filter((c) => (cat === "All" || c.cat === cat) && (`${c.pn} ${c.name}`.toLowerCase().includes(q.toLowerCase())));
  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div>
        <label htmlFor="fl-cat" className="sr-only">Category</label>
        <select id="fl-cat" value={cat} onChange={(e) => setCat(e.target.value)} className="min-h-11 w-full rounded bg-white px-3 ring-1 ring-slate-300 lg:hidden">{cats.map((c) => <option key={c}>{c}</option>)}</select>
        <ul className="hidden space-y-1 lg:block" aria-label="Categories">
          {cats.map((c) => <li key={c}><button type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`min-h-10 w-full rounded px-3 text-left text-sm font-semibold ${cat === c ? "bg-[#0F172A] text-white" : "hover:bg-slate-200"}`}>{c}</button></li>)}
        </ul>
      </div>
      <div>
        <label className="relative block">
          <span className="sr-only">Search by name or part number</span>
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or part no., e.g. FL-HN" className="min-h-12 w-full rounded bg-white pr-3 pl-10 ring-1 ring-slate-300" />
        </label>
        <p className="mt-2 text-sm text-slate-500" aria-live="polite">{list.length} products</p>
        <ul className="mt-3 divide-y divide-slate-200 rounded-lg bg-white ring-1 ring-slate-200">
          {list.map((c) => (
            <li key={c.pn}>
              <div className="flex flex-wrap items-center gap-3 p-4">
                <span className="w-28 font-dm text-sm text-[#0369A1]">{c.pn}</span>
                <span className="flex-1 font-semibold">{c.name}</span>
                <span className="hidden text-sm text-slate-500 sm:inline">MOQ {c.moq}</span>
                <button type="button" aria-expanded={open === c.pn} onClick={() => setOpen(open === c.pn ? null : c.pn)} className="inline-flex min-h-10 items-center gap-1 rounded px-3 text-sm font-semibold ring-1 ring-slate-300">Specs <ChevronDown className={`size-4 transition ${open === c.pn ? "rotate-180" : ""}`} aria-hidden /></button>
                <button type="button" onClick={() => add(c.pn)} disabled={picked.includes(c.pn)} className="inline-flex min-h-10 items-center gap-1 rounded bg-[#0369A1] px-3 text-sm font-semibold text-white disabled:bg-slate-300">{picked.includes(c.pn) ? "Added" : <><Plus className="size-4" aria-hidden /> Enquiry</>}</button>
              </div>
              {open === c.pn ? (
                <table className="mx-4 mb-4 w-[calc(100%-2rem)] font-dm text-sm">
                  <tbody>
                    {[["Material grade", c.grade], ["Sizes", c.sizes], ["Finish", c.finish], ["Standard", c.std], ["MOQ", c.moq]].map(([k, v]) => (
                      <tr key={k} className="border-t border-slate-200"><th scope="row" className="py-2 pr-4 text-left font-normal text-slate-500">{k}</th><td className="py-2">{v}</td></tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type F = "company" | "contact" | "email" | "phone" | "country" | "qty" | "dest";
export function BulkEnquiry() {
  const { list, remove } = useContext(C);
  const [v, setV] = useState({ company: "", contact: "", role: "", email: "", phone: "", country: "", tax: "", qty: "", unit: "pcs", dest: "", by: "", link: "", notes: "" });
  const [errors, setErrors] = useState<Errors<F>>({});
  const [done, setDone] = useState<string | null>(null);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v, { company: [{ kind: "required" }], contact: [{ kind: "required" }], email: [{ kind: "required" }, { kind: "email" }], phone: [{ kind: "phone" }], country: [{ kind: "required" }], qty: [{ kind: "required", message: "Approximate quantity, please." }, { kind: "pattern", re: /^[\d,.\s]+$/, message: "Numbers only." }], dest: [{ kind: "required", message: "Destination port or city." }] });
    setErrors(errs);
    if (hasErrors(errs)) return;
    setDone(formatEnquiry("Bulk enquiry — Forgeline Industries", { Company: v.company, Contact: v.contact, Designation: v.role, Email: v.email, Phone: v.phone, Country: v.country, "Tax ID": v.tax, Products: list.join(", ") || "Not specified", Quantity: `${v.qty} ${v.unit}`, Destination: v.dest, "Required by": v.by, "Drawing link": v.link, Notes: v.notes }));
  };
  if (done) return <DemoResult brand="Forgeline Industries" industryName="Manufacturing" demoSlug="manufacturer" industrySlug="manufacturing" preview={done} onReset={() => setDone(null)} className="border-white/20 bg-white text-[#0F172A]" channel="email" />;
  const inp = "min-h-11 w-full rounded bg-white px-3 text-[#0F172A]";
  const f = (k: F | "role" | "tax" | "by" | "link", label: string, type = "text") => (
    <div>
      <label htmlFor={`fe-${k}`} className="mb-1 block text-sm text-slate-300">{label}</label>
      <input id={`fe-${k}`} type={type} className={`${inp} ${errors[k as F] ? "ring-2 ring-[#fca5a5]" : ""}`} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!errors[k as F]} aria-describedby={errors[k as F] ? `fe-${k}-e` : undefined} />
      {errors[k as F] ? <p id={`fe-${k}-e`} className="mt-1 text-sm text-[#fca5a5]">{errors[k as F]}</p> : null}
    </div>
  );
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-3">
        <p className="text-sm text-slate-300">Products</p>
        <ul className="mt-2 flex min-h-11 flex-wrap gap-2" aria-live="polite">
          {list.length ? list.map((pn) => (
            <li key={pn} className="inline-flex items-center gap-1 rounded bg-white/10 py-1 pr-1 pl-3 font-dm text-sm">{pn}<button type="button" onClick={() => remove(pn)} className="grid size-8 place-items-center rounded hover:bg-white/10" aria-label={`Remove ${pn}`}><X className="size-3.5" /></button></li>
          )) : <li className="text-sm text-slate-400">Add products from the catalogue or 3D viewer, or describe them in the notes.</li>}
        </ul>
      </div>
      {f("company", "Company")}{f("contact", "Contact person")}{f("role", "Designation")}
      {f("email", "Email", "email")}{f("phone", "Phone (with country code)", "tel")}{f("country", "Country")}
      {f("tax", "GST / VAT / EIN (optional)")}
      <div className="grid grid-cols-[1fr_auto] gap-2">
        {f("qty", "Quantity")}
        <div><label htmlFor="fe-unit" className="mb-1 block text-sm text-slate-300">Unit</label><select id="fe-unit" className={inp} value={v.unit} onChange={(e) => setV({ ...v, unit: e.target.value })}><option>pcs</option><option>kg</option><option>tonnes</option></select></div>
      </div>
      {f("dest", "Destination port / city")}
      {f("by", "Required by", "date")}
      <div className="md:col-span-2">{f("link", "Drawing / spec link (optional)", "url")}</div>
      <div className="md:col-span-3"><label htmlFor="fe-notes" className="mb-1 block text-sm text-slate-300">Notes</label><textarea id="fe-notes" rows={3} className={`${inp} py-2`} value={v.notes} onChange={(e) => setV({ ...v, notes: e.target.value })} /></div>
      <button type="submit" className="min-h-12 rounded bg-[#FACC15] px-8 font-bold text-[#0F172A] md:justify-self-start">Request bulk quote</button>
    </form>
  );
}
