import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton, WorkGrid } from "../_parts/client";
import { BASE, disciplines, projects, services } from "../_parts/data";
import { accentBg, btnDark, CtaBand, disp, gapAfterHead, PageHero, ProjectCover, rail, railItem, section, SectionHead, wrap } from "../_parts/ui";

export const metadata: Metadata = {
  title: "Work — Hotwire Studio demo",
  description: "Concept case studies across brand identity, websites, motion, campaigns and packaging. Filter by discipline and open any project.",
};

const sectors = [...new Set(projects.map((p) => p.sector))];

export default function WorkPage() {
  const spotlight = projects[4];
  return (
    <>
      <PageHero
        crumb="Work"
        accent="violet"
        title="Work that gets noticed"
        lead="Six concept projects for food, drink, fashion, music and mobility brands. Filter by what we made, then open one for the brief and the idea."
        aside={
          <Link href={`${BASE}/work/${spotlight.slug}`} className="group block overflow-hidden rounded-[24px] border border-(--line) bg-(--card)">
            <ProjectCover project={spotlight} className="h-44 md:h-52" />
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-sm text-(--muted)">Spotlight</p>
                <p className={`${disp} text-xl`}>{spotlight.client}</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-(--pink) text-[#0B0B0D] transition group-hover:rotate-45">
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </div>
          </Link>
        }
      />

      <section className={`${wrap} ${section}`} aria-label="Projects">
        <WorkGrid projects={projects} />
      </section>

      <section className={`border-y border-(--line) bg-(--bg2) ${section}`} aria-labelledby="disc-h">
        <div className={wrap}>
          <SectionHead id="disc-h" title="What we make, by discipline" lead="Each project mixes two or three of these. Open a service to see what's included." link={{ href: `${BASE}/services`, label: "All services" }} />
          <ul className={`${gapAfterHead} ${rail("md:grid-cols-5")}`}>
            {disciplines.map((d, i) => {
              const s = services[i];
              const n = projects.filter((p) => p.disciplines.includes(d)).length;
              return (
                <li key={d} className={`${railItem} w-[62%]! sm:w-[40%]! md:w-auto!`}>
                  <Link href={`${BASE}/services#${s.slug}`} className={`group flex h-full flex-col justify-between gap-8 rounded-[22px] p-5 text-[#0B0B0D] transition hover:-translate-y-1 ${accentBg[s.color]}`}>
                    <span className={`${disp} text-4xl`}>{n}</span>
                    <span>
                      <span className="block font-semibold">{d}</span>
                      <span className="text-sm text-[#0B0B0D]/70">{n === 1 ? "project" : "projects"}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-10">
            <h3 className="font-semibold">Sectors in this portfolio</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s} className="rounded-full border border-(--line) bg-(--card) px-4 py-2 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="pt-16 md:pt-24 lg:pt-28">
        <CtaBand title="Want your launch on this page?" book={<BookCallButton className={btnDark} />} />
      </div>
    </>
  );
}
