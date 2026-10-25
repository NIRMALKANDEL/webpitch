import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/site/Cards";
import { Testimonials } from "@/components/site/Testimonials";
import { caseStudies } from "@/data/work";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

const hasWork = caseStudies.length > 0;

export const metadata: Metadata = {
  ...pageMeta({
    title: `Client work: websites built in ${site.city}`,
    description: `Real websites I've built for businesses in ${site.city} and across India, with what they needed and what changed.`,
    path: "/work",
  }),
  // An empty page shouldn't be in Google. It becomes indexable as soon as the first case study is added.
  ...(hasWork ? {} : { robots: { index: false, follow: true } }),
};

export default function WorkPage() {
  return (
    <div className="container-x py-12 sm:py-20">
      <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">Client work</h1>

      {hasWork ? (
        <>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            Real websites for real businesses: what they needed, what I built and what changed.
          </p>
          <ul className="mt-12 grid gap-14">
            {caseStudies.map((c) => (
              <li key={c.slug} className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Open ${c.client}'s website`}>
                  <BrowserFrame url={c.url.replace(/^https?:\/\//, "")}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={c.image} alt={`${c.client} website`} fill sizes="(min-width:1024px) 55vw, 92vw" className="object-cover object-top transition duration-700 group-hover:scale-[1.02]" />
                    </div>
                  </BrowserFrame>
                </a>
                <div>
                  <p className="text-sm text-ink-3">
                    {c.industry} · {c.city}
                  </p>
                  <h2 className="mt-1 font-display text-3xl font-semibold">{c.client}</h2>
                  <p className="mt-3 leading-relaxed text-ink-2">
                    <strong className="text-ink">The problem:</strong> {c.problem}
                  </p>
                  <p className="mt-4 text-sm font-semibold">What I built</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-2">
                    {c.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {c.results.length ? (
                    <>
                      <p className="mt-4 text-sm font-semibold">Results</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-2">
                        {c.results.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  {c.testimonial ? (
                    <blockquote className="mt-5 border-l-2 border-accent pl-4 text-ink">
                      &ldquo;{c.testimonial.quote}&rdquo;
                      <footer className="mt-1 text-sm text-ink-3">
                        {c.testimonial.name}, {c.testimonial.role}
                      </footer>
                    </blockquote>
                  ) : null}
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-semibold text-paper">
                    Visit the site <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <Testimonials className="mt-20" />
        </>
      ) : (
        <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-2">
          <p>
            {site.brandName} is new, and my first client websites in {site.city} are being built right now. Each one will be
            added here with what the business needed and what changed after launch.
          </p>
          <p>
            In the meantime, every industry has a live demo you can open and use, so you can judge the work for yourself.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/demos" className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-base font-semibold text-paper">
              Open the live demos
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center rounded-full border border-ink/15 px-6 text-base font-semibold">
              Be one of my first clients
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
