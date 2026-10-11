import { Award, Globe, Phone } from "lucide-react";
import Image from "next/image";
import { BackgroundVideo } from "@/components/shared/BackgroundVideo";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { unsplash, videos } from "@/lib/media";
import { BulkEnquiry, Catalogue, EnquiryProvider, PartViewer } from "./_parts/Parts";

const w = "mx-auto max-w-7xl px-4 md:px-8";
const h2 = "text-3xl font-extrabold tracking-tight md:text-5xl";
const caps = [["Cold forging", "14 headers, M6–M24"], ["Hot forging", "Up to 8 kg components"], ["CNC machining", "22 turning & VMC centres"], ["Heat treatment", "Continuous mesh-belt furnace"], ["Surface finish", "Zinc flake, HDG, black oxide"], ["Testing lab", "Tensile, hardness, salt spray"]];

export default function ManufacturerDemo() {
  return (
    <EnquiryProvider>
      <div className="bg-[#0F172A] text-sm text-white">
        <div className={`${w} flex h-10 items-center justify-between`}>
          <span className="hidden sm:inline">Exporting to 18 countries · illustrative</span>
          <span className="flex items-center gap-2 font-dm"><Phone className="size-3.5" aria-hidden /> +91 161 000 0000 (display only)</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className={`${w} flex h-16 items-center justify-between`}>
          <a href="#top" className="flex items-center gap-2 text-lg font-extrabold"><span className="grid size-8 place-items-center bg-[#FACC15] font-dm text-sm">FL</span> Forgeline Industries</a>
          <nav aria-label="Company" className="hidden gap-6 text-sm font-semibold lg:flex">
            {[["#about", "Company"], ["#viewer", "3D viewer"], ["#catalogue", "Products"], ["#capabilities", "Capabilities"], ["#quality", "Quality"]].map(([h, l]) => <a key={h} href={h} className="hover:text-[#0369A1]">{l}</a>)}
          </nav>
          <a href="#enquiry" className="inline-flex min-h-11 items-center rounded bg-[#0369A1] px-4 text-sm font-semibold text-white">Request Bulk Quote</a>
        </div>
      </header>
      <main id="top">
        <section className="relative overflow-hidden bg-[#0F172A] text-white" aria-labelledby="fl-h">
          <Image src={unsplash("1717386255773-1e3037c81788")} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
          <div className={`${w} relative py-20 md:py-32`}>
            <h1 id="fl-h" className="max-w-3xl text-5xl leading-[1.02] font-extrabold tracking-tight md:text-7xl">Precision fasteners for OEMs and distributors worldwide.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">High-tensile bolts, nuts, washers and custom forgings, made in Ludhiana to ISO and DIN standards.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogue" className="inline-flex min-h-12 items-center rounded bg-white px-6 font-semibold text-[#0F172A]">View Catalogue</a>
              <a href="#enquiry" className="inline-flex min-h-12 items-center rounded bg-[#FACC15] px-6 font-semibold text-[#0F172A]">Request Bulk Quote</a>
            </div>
            <dl className="mt-14 grid max-w-3xl grid-cols-3 gap-px bg-white/15">
              {[["1994", "Founded"], ["1,20,000 ft²", "Plant area"], ["900 t", "Monthly capacity"]].map(([v, l]) => <div key={l} className="bg-[#0F172A]/80 p-4"><dt className="text-xs text-slate-400">{l}</dt><dd className="mt-1 font-dm text-xl md:text-2xl">{v}</dd></div>)}
            </dl>
            <p className="mt-2 text-xs text-slate-400">Illustrative figures</p>
          </div>
        </section>

        <section id="about" className={`${w} grid scroll-mt-20 gap-10 py-20 md:grid-cols-2`} aria-labelledby="ab-h">
          <div>
            <h2 id="ab-h" className={h2}>Three decades of forging</h2>
            <p className="mt-4 text-lg text-slate-600">A family-run manufacturer supplying automotive, construction, agriculture and railway customers in India, Europe and North America.</p>
            <ul className="mt-6 flex flex-wrap gap-2">{["Automotive", "Construction", "Agriculture", "Railways", "Wind energy"].map((i) => <li key={i} className="rounded bg-white px-3 py-1.5 text-sm ring-1 ring-slate-200">{i}</li>)}</ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["1589793463357-5fb813435467", "1586528116311-ad8dd3c8310d"].map((id) => <div key={id} className="relative aspect-[3/4] overflow-hidden rounded-lg"><Image src={unsplash(id)} alt="Inside the plant" fill sizes="25vw" className="object-cover" /></div>)}
          </div>
        </section>

        <section id="viewer" className="scroll-mt-20 bg-white py-20" aria-labelledby="vw-h">
          <div className={w}>
            <h2 id="vw-h" className={h2}>Inspect it in 3D</h2>
            <p className="mt-3 mb-10 max-w-xl text-slate-600">Rotate the M16 assembly, explode it and click a part for its specification.</p>
            <PartViewer />
          </div>
        </section>

        <section id="catalogue" className={`${w} scroll-mt-20 py-20`} aria-labelledby="ca-h">
          <h2 id="ca-h" className={`${h2} mb-8`}>Product catalogue</h2>
          <Catalogue />
        </section>

        <section className="relative h-72 overflow-hidden md:h-96" aria-label="Production film">
          <BackgroundVideo video={videos.moltenSteel} posterAlt="Molten steel being poured" className="absolute inset-0" overlay={<div className="absolute inset-0 bg-[#0F172A]/40" />} />
        </section>

        <section id="capabilities" className={`${w} scroll-mt-20 py-20`} aria-labelledby="cp-h">
          <h2 id="cp-h" className={`${h2} mb-8`}>Capabilities</h2>
          <ul className="grid border-t border-l border-slate-300 sm:grid-cols-2 lg:grid-cols-3">
            {caps.map(([t, d]) => <li key={t} className="border-r border-b border-slate-300 p-6"><p className="font-dm text-xs text-[#0369A1]">■ CAPABILITY</p><p className="mt-2 text-xl font-bold">{t}</p><p className="mt-1 font-dm text-sm text-slate-600">{d}</p></li>)}
          </ul>
          <p className="mt-2 text-xs text-slate-500">Machine counts are illustrative.</p>
        </section>

        <section id="quality" className="scroll-mt-20 bg-white py-20" aria-labelledby="qa-h">
          <div className={w}>
            <h2 id="qa-h" className={h2}>Certifications &amp; quality</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {["Quality management certification", "Environmental management certification", "Automotive quality certification"].map((c) => (
                <li key={c} className="flex items-start gap-3 rounded-lg p-5 ring-1 ring-slate-200"><Award className="size-6 shrink-0 text-[#0369A1]" aria-hidden /><div><p className="font-semibold">{c}</p><p className="text-sm text-slate-500">Sample certificate for this demo</p></div></li>
              ))}
            </ul>
            <ol className="mt-12 flex flex-wrap gap-2">
              {["Raw material", "Forging", "Machining", "Heat treatment", "Plating", "Inspection", "Dispatch"].map((s, i) => <li key={s} className="flex items-center gap-2 rounded bg-[#F8FAFC] px-3 py-2 ring-1 ring-slate-200"><span className="font-dm text-xs text-[#0369A1]">{String(i + 1).padStart(2, "0")}</span>{s}</li>)}
            </ol>
          </div>
        </section>

        <section className={`${w} grid gap-6 py-20 md:grid-cols-[auto_1fr]`} aria-labelledby="ex-h">
          <Globe className="size-12 text-[#0369A1]" aria-hidden />
          <div>
            <h2 id="ex-h" className={h2}>Export ready</h2>
            <p className="mt-3 max-w-2xl text-slate-600">FOB Mundra/Nhava Sheva or CIF to your port. Metric and imperial sizes, USD and EUR quotes, full material test certificates with every shipment.</p>
          </div>
        </section>

        <section id="enquiry" className="scroll-mt-20 bg-[#0F172A] py-20 text-white" aria-labelledby="en-h">
          <div className={w}>
            <h2 id="en-h" className={`${h2} mb-8`}>Bulk enquiry</h2>
            <BulkEnquiry />
          </div>
        </section>
      </main>
      <footer className="px-4 pt-10 pb-32 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-extrabold">Forgeline Industries · Focal Point, Ludhiana (fictional)</p>
          <DemoDisclaimer slug="manufacturer" className="max-w-lg text-slate-500" />
        </div>
      </footer>
    </EnquiryProvider>
  );
}
