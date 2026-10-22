import { Suspense } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCallButton, ProjectCard } from "../../_parts/client";
import { BASE, disciplines, projectBySlug, projects, services } from "../../_parts/data";
import { accentBg, btnDark, CtaBand, disp, gapAfterHead, h2, ProjectCover, rail, railItem, section, wrap, PageSkeleton } from "../../_parts/ui";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ project: string }> }): Promise<Metadata> {
  const { project } = await params;
  const p = projectBySlug(project);
  if (!p) return {};
  return { title: `${p.client} case study — Hotwire Studio demo`, description: p.summary };
}

// The page reads its slug inside <Suspense>, so client navigations can show the shared shell instantly.
export default function CaseStudy({ params }: { params: Promise<{ project: string }> }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CaseStudyBody params={params} />
    </Suspense>
  );
}

async function CaseStudyBody({ params }: { params: Promise<{ project: string }> }) {
  const { project } = await params;
  const p = projectBySlug(project);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const used = p.disciplines.map((d) => services[disciplines.indexOf(d)]);
  const more = projects.filter((x) => x.slug !== p.slug && x.disciplines.some((d) => p.disciplines.includes(d))).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-(--line)">
          <div aria-hidden className="absolute -top-40 -right-32 -z-10 size-[520px] rounded-full opacity-25 blur-[120px]" style={{ background: p.cover.bg }} />
          <div className={`${wrap} pt-10 pb-14 md:pt-16 md:pb-20`}>
            <Link href={`${BASE}/work`} className="inline-flex min-h-11 items-center gap-2 text-sm text-(--muted) hover:text-(--fg)">
              <ArrowLeft className="size-4" aria-hidden /> All work
            </Link>
            <div className="mt-3 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-14">
              <div>
                <h1 className={`${disp} hw-rise text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98]`}>{p.client}</h1>
                <p className="hw-rise-2 mt-4 max-w-[46ch] text-lg text-(--muted) md:text-xl">{p.summary}</p>
              </div>
              <dl className="hw-rise-3 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-(--line) bg-(--line) text-sm">
                <div className="bg-(--card) p-5">
                  <dt className="text-(--muted)">Sector</dt>
                  <dd className="mt-1 font-semibold">{p.sector}</dd>
                </div>
                <div className="bg-(--card) p-5">
                  <dt className="text-(--muted)">Year</dt>
                  <dd className="mt-1 font-semibold">{p.year}</dd>
                </div>
                <div className="col-span-2 bg-(--card) p-5">
                  <dt className="text-(--muted)">What we made</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {used.map((s) => (
                      <Link key={s.slug} href={`${BASE}/services#${s.slug}`} className={`rounded-full px-3 py-1 font-semibold text-[#0B0B0D] ${accentBg[s.color]}`}>
                        {s.name}
                      </Link>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className={`${wrap} group pt-8 md:pt-10`}>
          <ProjectCover project={p} className="h-[clamp(260px,46vw,580px)] rounded-[28px]" />
          <p className="mt-3 text-sm text-(--muted)">
            Concept project: {p.client} is not a real client, and we don&apos;t show invented results. On a real studio site, the outcome and a client quote would go
            here.
          </p>
        </div>

        <div className={`${wrap} grid gap-5 ${section} md:grid-cols-2`}>
          <section className="rounded-[24px] border border-(--line) bg-(--card) p-6 md:p-8" aria-labelledby="cs-brief">
            <h2 id="cs-brief" className={`${disp} text-2xl`}>
              The brief
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-(--muted)">{p.challenge}</p>
          </section>
          <section className="rounded-[24px] p-6 text-[#0B0B0D] md:p-8" style={{ background: p.cover.bg === "#141414" || p.cover.bg === "#232323" ? "var(--lime)" : p.cover.bg }} aria-labelledby="cs-idea">
            <h2 id="cs-idea" className={`${disp} text-2xl`}>
              The idea
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-[#0B0B0D]/80">{p.idea}</p>
          </section>
        </div>

        <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="cs-made">
          <h2 id="cs-made" className={h2}>
            What we made
          </h2>
          <div className={`${gapAfterHead} grid gap-8 lg:grid-cols-[1fr_1.5fr]`}>
            <ul className="grid content-start gap-2">
              {p.made.map((m) => (
                <li key={m} className="flex items-center gap-3 rounded-2xl border border-(--line) bg-(--card) px-4 py-3.5">
                  <Check className="size-4 shrink-0 text-(--hi)" aria-hidden />
                  {m}
                </li>
              ))}
            </ul>
            <ul className={rail("md:grid-cols-2")} aria-label="Identity variations">
              <li className={`${railItem} group`}>
                <ProjectCover project={p} invert className="h-56 rounded-[22px] md:h-64" />
                <p className="mt-2 text-sm text-(--muted)">Reversed colourway</p>
              </li>
              <li className={`${railItem} group`}>
                <ProjectCover project={p} hideWord className="h-56 rounded-[22px] md:h-64" />
                <p className="mt-2 text-sm text-(--muted)">Symbol on its own</p>
              </li>
            </ul>
          </div>
        </section>
      </article>

      {more.length ? (
        <section className={`border-t border-(--line) bg-(--bg2) ${section}`} aria-labelledby="cs-more">
          <div className={wrap}>
            <h2 id="cs-more" className={h2}>
              Similar projects
            </h2>
            <ul className={`${gapAfterHead} ${rail("md:grid-cols-2")}`}>
              {more.map((m) => (
                <li key={m.slug} className={railItem}>
                  <ProjectCard p={m} coverClass="h-[clamp(200px,24vw,320px)]" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <nav aria-label="More projects" className={`${wrap} grid grid-cols-2 gap-3 py-10`}>
        <Link href={`${BASE}/work/${prev.slug}`} className="group flex min-h-20 items-center gap-3 rounded-[22px] border border-(--line) bg-(--card) p-4 md:p-5">
          <ArrowLeft className="size-5 shrink-0 transition group-hover:-translate-x-1" aria-hidden />
          <span className="min-w-0">
            <span className="block text-sm text-(--muted)">Previous</span>
            <span className={`${disp} block truncate text-lg`}>{prev.client}</span>
          </span>
        </Link>
        <Link href={`${BASE}/work/${next.slug}`} className="group flex min-h-20 items-center justify-end gap-3 rounded-[22px] border border-(--line) bg-(--card) p-4 text-right md:p-5">
          <span className="min-w-0">
            <span className="block text-sm text-(--muted)">Next</span>
            <span className={`${disp} block truncate text-lg`}>{next.client}</span>
          </span>
          <ArrowRight className="size-5 shrink-0 transition group-hover:translate-x-1" aria-hidden />
        </Link>
      </nav>
      <CtaBand title={`Want something like ${p.client}?`} book={<BookCallButton className={btnDark} topic={`Something like ${p.client}: `} />} />
    </>
  );
}
