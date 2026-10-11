import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Demo } from "@/data/demos";
import { demoPreview, demosForIndustry } from "@/data/demos";
import { industryBySlug, type Industry } from "@/data/industries";
import { unsplash } from "@/lib/media";

export function IndustryCard({ industry, compact = false }: { industry: Industry; compact?: boolean }) {
  const count = demosForIndustry(industry.slug).length;
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-muted bg-white transition hover:border-ink/20 hover:shadow-[0_8px_30px_-12px_rgba(12,10,9,0.18)]"
    >
      <div className={`relative overflow-hidden bg-muted ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <Image
          src={unsplash(industry.image)}
          alt={industry.imageAlt}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug font-semibold text-balance">{industry.name}</h3>
        {!compact ? <p className="mt-2 text-sm leading-relaxed text-ink-2">{industry.blurb}</p> : null}
        <p className="mt-auto flex items-center justify-between pt-4 text-sm font-semibold">
          <span>Explore demos</span>
          <span className="flex items-center gap-2 text-xs font-normal text-ink-3">
            {count} live demo{count === 1 ? "" : "s"}
            <ArrowRight className="size-4 text-ink transition group-hover:translate-x-0.5" aria-hidden />
          </span>
        </p>
      </div>
    </Link>
  );
}

/** A browser window frame used to present demo previews. */
export function BrowserFrame({
  children,
  url,
  className = "",
}: {
  children: React.ReactNode;
  url: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_24px_60px_-28px_rgba(12,10,9,0.35)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-ink/5 bg-[#f4f4f3] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-ink-3">{url}</span>
      </div>
      {children}
    </div>
  );
}

export function DemoCard({ demo, large = false }: { demo: Demo; large?: boolean }) {
  const industry = industryBySlug(demo.industry)!;
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/demos/${demo.slug}`} className="block" aria-label={`View the ${demo.brand} live website`}>
        <BrowserFrame url={`${demo.brand.toLowerCase().replace(/[^a-z]+/g, "")}.com`}>
          <div className={`relative overflow-hidden bg-muted ${large ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
            <Image
              src={demoPreview(demo.slug)}
              alt={`Screenshot of the ${demo.brand} demo website`}
              fill
              sizes={large ? "(min-width:1024px) 46vw, 92vw" : "(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"}
              className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.02]"
            />
            <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink">
              {demo.tier}
            </span>
          </div>
        </BrowserFrame>
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs text-ink-3">
          {industry.short} · {demo.city}, {demo.country}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{demo.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {demo.tags.map((t) => (
            <li key={t} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink-2">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link
            href={`/demos/${demo.slug}`}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink/85"
          >
            View Live Website <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={`/contact?industry=${demo.industry}&demo=${demo.slug}`}
            className="inline-flex min-h-10 items-center rounded-full border border-ink/15 px-4 text-sm font-semibold transition hover:border-ink/40"
          >
            Get a Website Like This
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SectionHeading({
  title,
  intro,
  action,
  id,
}: {
  title: string;
  intro?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="font-display text-3xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-[40px]">
          {title}
        </h2>
        {intro ? <p className="mt-3 text-base leading-relaxed text-ink-2 sm:text-lg">{intro}</p> : null}
      </div>
      {action}
    </div>
  );
}
