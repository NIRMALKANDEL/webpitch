import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { BrowserFrame, IndustryCard, SectionHeading } from "@/components/site/Cards";
import { NeedIcon } from "@/components/site/NeedIcon";
import { PricingCards } from "@/components/site/PricingCards";
import { demoPreview, demosForIndustry } from "@/data/demos";
import { industries, industryBySlug } from "@/data/industries";
import { site } from "@/data/site";
import { unsplash } from "@/lib/media";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { waLink, waMessages } from "@/lib/whatsapp";

// Every industry is prerendered; navigations wait for the full static page rather than streaming a fallback.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  return pageMeta({
    title: `${industry.short} website design — live demo`,
    description: `${industry.intro} See a live ${industry.short.toLowerCase()} website demo by ${site.brandName}.`,
    path: `/industries/${industry.slug}`,
    image: `industry-${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();
  const list = demosForIndustry(industry.slug);
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <div className="container-x pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-3">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li><Link href="/industries" className="hover:text-ink">Industries</Link></li>
            <ChevronRight className="size-3.5" aria-hidden />
            <li aria-current="page" className="text-ink">{industry.short}</li>
          </ol>
        </nav>
        <JsonLd
          data={[
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: industry.short, path: `/industries/${industry.slug}` },
            ]),
            serviceSchema({
              name: `${industry.short} website design`,
              description: industry.intro,
              path: `/industries/${industry.slug}`,
              serviceType: "Website design and development",
            }),
          ]}
        />
      </div>

      <section className="container-x grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 className="font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl">
            {industry.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{industry.intro}</p>
          <p className="mt-6 text-sm text-ink-3">Who it&apos;s for</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {industry.subtypes.map((s) => (
              <li key={s} className="rounded-full border border-muted bg-surface px-3 py-1.5 text-sm text-ink-2">{s}</li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-muted">
          <Image src={unsplash(industry.image)} alt={industry.imageAlt} fill priority sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
        </div>
      </section>

      <section className="border-y border-muted bg-alt py-16 sm:py-20" aria-labelledby="demo-title">
        <div className="container-x">
          <SectionHeading id="demo-title" title={`Live ${industry.short.toLowerCase()} demo`} intro="A working website, not a screenshot. Open it, try the menus and forms, then imagine your name on it." />
          <div className="grid gap-12">
            {list.map((d) => (
              <article key={d.slug} className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
                <Link href={`/demos/${d.slug}`} className="group block" aria-label={`Open the ${d.brand} demo`}>
                  <BrowserFrame url={`${d.brand.toLowerCase().replace(/[^a-z]+/g, "")}.com`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={demoPreview(d.slug)} alt={`Screenshot of the ${d.brand} demo website`} fill sizes="(min-width:1024px) 55vw, 92vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.02]" />
                    </div>
                  </BrowserFrame>
                </Link>
                <div>
                  <p className="text-sm text-ink-3">{d.city}, {d.country} · {d.tier} demo</p>
                  <h3 className="mt-1 font-display text-3xl font-semibold">{d.brand}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{d.summary}</p>
                  <p className="mt-5 text-sm font-semibold">What&apos;s inside</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {d.sections.map((s) => (
                      <li key={s} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink-2">{s}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-3 text-sm text-ink-3">
                    <span className="flex" aria-hidden>
                      {d.palette.map((c) => (
                        <span key={c} className="-ml-1 size-6 rounded-full border-2 border-white first:ml-0" style={{ background: c }} />
                      ))}
                    </span>
                    Designed with {d.fonts}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-2">
                    <Link href={`/demos/${d.slug}`} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
                      View Live Website <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                    <Link href={`/contact?industry=${industry.slug}&demo=${d.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-ink/15 px-5 text-sm font-semibold">
                      Get a Website Like This
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20" aria-labelledby="needs-title">
        <SectionHeading id="needs-title" title={`What a ${industry.short.toLowerCase()} website needs`} />
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {industry.needs.map((n) => (
            <li key={n.title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <NeedIcon name={n.icon} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{n.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{n.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-muted bg-alt py-16 sm:py-20" aria-labelledby="pkg-title">
        <div className="container-x">
          <SectionHeading id="pkg-title" title="Packages" intro={`Most ${industry.short.toLowerCase()} businesses choose the highlighted package. Pricing is customised according to your requirements.`} />
          <PricingCards highlight={industry.recommended} />
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="others-title">
        <div className="container-x">
          <SectionHeading id="others-title" title="Other industries" />
        </div>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-10">
          {others.map((o) => (
            <div key={o.slug} className="w-[260px] shrink-0 snap-start">
              <IndustryCard industry={o} compact />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[20px] bg-night ring-1 ring-white/10 p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Want this for your {industry.short.toLowerCase()} business?</h2>
            <p className="mt-2 text-white/70">Free 20-minute call, fixed quote, launch in one to three weeks.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/contact?industry=${industry.slug}`} className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 font-semibold text-ink">
              Discuss Your Project
            </Link>
            <a href={waLink(waMessages.industry(industry.short))} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold">
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
