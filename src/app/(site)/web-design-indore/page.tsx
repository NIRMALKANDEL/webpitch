import { ArrowRight, Check, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { SectionHeading } from "@/components/site/Cards";
import { FAQ, type QA } from "@/components/site/FAQ";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { industries } from "@/data/industries";
import { industryContent } from "@/data/industry-content";
import { carePlans, finePrint, inr, packages } from "@/data/pricing";
import { site } from "@/data/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { waLink, waMessages } from "@/lib/whatsapp";

const path = "/web-design-indore";
const description = `Website designer and developer in ${site.city}. Fast, mobile-first websites for cafés, salons, clinics, coaching institutes and agencies, from ${inr(packages[0].from)}. Meet in person, fixed price.`;

export const metadata: Metadata = pageMeta({
  title: `Website Designer in ${site.city}, from ${inr(packages[0].from)}`,
  description,
  path,
});

/** Neighbourhoods named for people (and search engines). Only list places you are happy to travel to. */
const neighbourhoods = [
  "Vijay Nagar", "Palasia", "MG Road", "AB Road", "Rajwada", "Sapna Sangeeta", "Bhawarkua", "Annapurna",
  "Sudama Nagar", "Rau", "Nipania", "Super Corridor", "Scheme 54", "Scheme 78", "Bengali Square", "Khajrana",
];

const faq: QA[] = [
  {
    q: `How much does a website cost in ${site.city}?`,
    a: `Most small business websites in ${site.city} cost between ₹5,000 and ₹50,000, depending on pages and features. My packages start at ${inr(packages[0].from)} for a one-page site and ${inr(packages[1].from)} for a 5-page business website. You get a fixed written quote after a free call.`,
  },
  {
    q: "Can we meet in person?",
    a: `Yes. I'm based in ${site.city} and can meet at your shop, clinic or office anywhere in the city. Many clients prefer a quick WhatsApp call instead, which works just as well.`,
  },
  {
    q: "How long does it take?",
    a: `A one-page site takes ${packages[0].timeline} once I have your content; a business website takes ${packages[1].timeline}. You get a fixed launch date with your quote.`,
  },
  {
    q: "Will you help us show up on Google Maps?",
    a: "Yes. Every website includes basic SEO, and I help you set up or improve your Google Business Profile and link it to the site, which is what gets local customers to find you on Maps.",
  },
  {
    q: "What happens after the website is live?",
    a: `You own everything and can stop there. Or choose a care plan from ${inr(carePlans[0].perMonth)}/month for updates, backups and monthly edits.`,
  },
];

export default function WebDesignIndorePage() {
  const focus = industries.filter((i) => industryContent[i.slug]);
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: `Website design in ${site.city}`, description, path, serviceType: "Website design and development" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `Web design in ${site.city}`, path },
          ]),
          faqSchema(faq),
        ]}
      />

      <section className="container-x py-12 sm:py-20">
        <p className="inline-flex items-center gap-1.5 text-sm text-ink-3">
          <MapPin className="size-4 text-accent" aria-hidden /> {site.city}, {site.region}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1] font-semibold tracking-tight text-balance sm:text-7xl">
          Web design in {site.city} for small businesses
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
          I&apos;m {site.ownerName}, a web developer based in {site.city}. I design and build fast, mobile-first websites for
          local businesses, starting at {inr(packages[0].from)}. You talk to me directly, we can meet in person, and you get a
          fixed price before any work starts.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold text-white"
          >
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </a>
          <Link href="/demos" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/15 px-6 font-semibold transition hover:border-ink/40">
            Open a live demo <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="border-y border-muted bg-alt py-12 sm:py-20" aria-labelledby="who-title">
        <div className="container-x">
          <SectionHeading id="who-title" title={`Who I build for in ${site.city}`} intro="Each of these has a live demo website you can open and use." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {focus.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="group flex h-full flex-col rounded-[22px] bg-surface p-6 ring-1 ring-ink/10 transition hover:ring-ink/25">
                  <span className="font-display text-xl font-semibold">{i.name}</span>
                  <span className="mt-2 flex-1 leading-relaxed text-ink-2">{i.blurb}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                    See the demo <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-12 sm:py-20" aria-labelledby="price-title">
        <SectionHeading id="price-title" title={`Website prices in ${site.city}`} intro="Starting prices. You get a fixed written quote after a free call." />
        <div className="overflow-x-auto rounded-[14px] border border-muted">
          <table className="w-full min-w-[560px] text-left">
            <thead className="bg-alt text-sm text-ink-3">
              <tr>
                <th scope="col" className="p-4 font-medium">Package</th>
                <th scope="col" className="p-4 font-medium">Best for</th>
                <th scope="col" className="p-4 font-medium">Ready in</th>
                <th scope="col" className="p-4 text-right font-medium">From</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {packages.map((p) => (
                <tr key={p.id}>
                  <th scope="row" className="p-4 font-display text-lg font-semibold">{p.name}</th>
                  <td className="p-4 text-sm leading-relaxed text-ink-2">{p.bestFor}</td>
                  <td className="p-4 text-sm whitespace-nowrap text-ink-2">{p.timeline}</td>
                  <td className="p-4 text-right font-display text-xl font-semibold whitespace-nowrap">{inr(p.from)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-ink-3">
          {finePrint.terms} {finePrint.domainHosting}{" "}
          <Link href="/pricing" className="font-semibold text-ink-2 underline underline-offset-4">
            Full pricing, add-ons and care plans
          </Link>
        </p>
      </section>

      <section className="container-x pb-12 sm:pb-20" aria-labelledby="why-title">
        <SectionHeading id="why-title" title="Why work with a local developer" />
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {[
            "Meet face to face, at your shop or over a chai.",
            "One person from first call to launch, so nothing gets lost in hand-offs.",
            "I know how people here search and buy: WhatsApp first, phone second, Google Maps always.",
            "Fixed price in rupees, paid 50% to start and 50% before launch, by UPI or bank transfer.",
            "Your domain, hosting and content are registered in your name.",
            "When something needs changing, you message someone who lives in the same city.",
          ].map((t) => (
            <li key={t} className="flex gap-3 text-ink-2">
              <Check className="mt-1 size-5 shrink-0 text-accent" aria-hidden /> {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-muted bg-alt py-12 sm:py-20" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeading id="process-title" title="How it works" />
          <Process />
        </div>
      </section>

      <Testimonials className="container-x py-12 sm:py-20" />

      <section className="container-x py-12 sm:py-20" aria-labelledby="areas-title">
        <SectionHeading id="areas-title" title={`Areas I cover in and around ${site.city}`} />
        <ul className="flex flex-wrap gap-2">
          {neighbourhoods.map((n) => (
            <li key={n} className="rounded-full border border-muted bg-surface px-3.5 py-1.5 text-sm text-ink-2">
              {n}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-ink-2">
          Also {site.areasServed.filter((a) => a !== site.city && a !== site.region && a !== site.country).join(", ")} and the rest of{" "}
          {site.region}, plus clients anywhere in {site.country} on WhatsApp and video calls.
        </p>
      </section>

      <section className="container-x pb-12 sm:pb-20" aria-labelledby="lfaq-title">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14">
          <SectionHeading id="lfaq-title" title="Questions from local businesses" />
          <FAQ items={faq} variant="cards" />
        </div>
      </section>

      <section className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[20px] bg-night p-8 text-white ring-1 ring-white/10 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Tell me about your business</h2>
            <p className="mt-2 text-white/70">Free 20-minute call, fixed quote, launch in one to three weeks.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/contact" className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 font-semibold text-ink">
              Discuss Your Project
            </Link>
            <a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold">
              <WhatsAppIcon className="size-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
