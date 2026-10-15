import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/site/Cards";
import { FAQ } from "@/components/site/FAQ";
import { PricingCards } from "@/components/site/PricingCards";
import { pricingFaq } from "@/data/faq";
import { addOns, carePlans, finePrint, packages, redesign } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Website packages tailored to your requirements: Landing Page, Business, Advanced and E-commerce websites, plus redesigns, add-ons and care plans. Contact me for a custom quote.",
};

const rows: { label: string; values: (string | boolean)[] }[] = [
  { label: "Pages", values: ["1 long page", "Up to 5", "Up to 10", "Up to 10 + shop"] },
  { label: "WhatsApp and call buttons", values: [true, true, true, true] },
  { label: "Enquiry form", values: [true, true, true, true] },
  { label: "Booking, catalogue or menu system", values: [false, "Simple", true, true] },
  { label: "Cinematic video hero", values: [false, false, true, true] },
  { label: "Scroll animations", values: ["Light", "Light", true, true] },
  { label: "Blog", values: [false, false, true, true] },
  { label: "Products", values: [false, false, false, "Up to 50"] },
  { label: "Payment gateway", values: [false, false, false, true] },
  { label: "Basic SEO setup", values: [true, true, true, true] },
  { label: "Revision rounds", values: ["2", "2", "3", "3"] },
  { label: "Typical delivery", values: packages.map((p) => p.timeline) },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto size-5 text-accent" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto size-5 text-ink-3/50" aria-label="Not included" />;
  return <span>{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <section className="container-x py-12 sm:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">Pricing tailored to you</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
              Pricing is customised according to your requirements. Contact me to discuss your project. After a free 20-minute call
              you get a fixed quote, so there are no surprises.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <PricingCards />
        </div>
      </section>

      <section className="border-y border-muted bg-alt py-16 sm:py-20" aria-labelledby="compare-title">
        <div className="container-x">
          <SectionHeading id="compare-title" title="Compare packages" />
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-[14px] border border-muted md:block">
            <table className="w-full text-sm">
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="p-4 text-left font-medium text-ink-3">Feature</th>
                  {packages.map((p) => (
                    <th key={p.id} scope="col" className="p-4 text-center font-display text-base font-semibold">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="p-4 text-left font-normal text-ink-2">{r.label}</th>
                    {r.values.map((v, i) => (
                      <td key={i} className="p-4 text-center"><Cell v={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile: swipe between package cards */}
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:hidden">
            {packages.map((p, pi) => (
              <div key={p.id} className="w-[84%] shrink-0 snap-center rounded-[14px] border border-muted bg-surface p-4">
                <p className="font-display text-lg font-semibold">
                  {p.name}
                </p>
                <dl className="mt-3 divide-y divide-muted text-sm">
                  {rows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-4 py-2">
                      <dt className="text-ink-2">{r.label}</dt>
                      <dd className="text-right"><Cell v={r.values[pi]} /></dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 sm:py-20 lg:grid-cols-2">
        <div id="redesign" className="rounded-[14px] border border-muted bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">{redesign.name}</h2>
          <p className="mt-2 leading-relaxed text-ink-2">{redesign.description}</p>
          <p className="mt-5 font-display text-2xl font-semibold">Custom quote</p>
          <p className="mt-1 text-xs text-ink-3">{redesign.timeline}</p>
          <Link href="/contact?package=redesign" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper">
            Discuss a Redesign
          </Link>
        </div>
        <div id="care" className="rounded-[14px] border border-muted bg-surface p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Care plans</h2>
          <p className="mt-2 leading-relaxed text-ink-2">Optional monthly support after launch, so your site stays updated, backed up and fresh.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {carePlans.map((c) => (
              <div key={c.id} className="rounded-xl bg-paper p-4">
                <p className="font-semibold">{c.name}</p>
                <p className="mt-1 text-sm text-ink-3">Monthly · quoted with your project</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-2">
                  {c.includes.map((i) => (
                    <li key={i} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden /> {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x pb-16 sm:pb-20" aria-labelledby="addons-title">
        <SectionHeading id="addons-title" title="Add-ons" intro="Add any of these to a package. 3D viewers and video heroes are shown live on the What's possible page." />
        <ul className="divide-y divide-muted rounded-[14px] border border-muted bg-surface">
          {addOns.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="text-ink-2">{a.name}</span>
              <span className="shrink-0 text-sm font-semibold">On request</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x pb-16 sm:pb-20" aria-labelledby="terms-title">
        <SectionHeading id="terms-title" title="Payment and fine print" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            ["Payment terms", finePrint.terms],
            ["Domain and hosting", finePrint.domainHosting],
            ["Paying from India", finePrint.paymentIndia],
            ["Paying from abroad", finePrint.paymentInternational],
          ].map(([t, d]) => (
            <li key={t} className="rounded-[14px] border border-muted bg-surface p-5">
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{d}</p>
            </li>
          ))}
        </ul>
        {finePrint.taxNote ? <p className="mt-4 text-sm text-ink-3">{finePrint.taxNote}</p> : null}
      </section>

      <section className="container-x" aria-labelledby="pfaq-title">
        <SectionHeading id="pfaq-title" title="Pricing questions" />
        <FAQ items={pricingFaq} variant="cards" />
      </section>
    </>
  );
}
