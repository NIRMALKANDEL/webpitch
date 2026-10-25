import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton, DrawLine } from "../_parts/client";
import { aboutFaqs, BASE, rhythm, steps, team, tools, values } from "../_parts/data";
import { accentBg, Avatar, btnDark, CtaBand, disp, FactPanel, Faq, gapAfterHead, h2, PageHero, rail, railItem, section, SectionHead, wrap } from "../_parts/ui";

export const metadata: Metadata = {
  title: "About — Hotwire Studio demo",
  description: "Who Hotwire Studio is, what a week working with us looks like, how a project runs and the three things we won't compromise on.",
};

const valueColors = ["pink", "lime", "violet"] as const;
const stepColors = ["pink", "lime", "violet", "mist"] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        accent="pink"
        title="A small studio for brands that want to be noticed"
        lead="Six people in Indore, a handful of clients at a time. The people you meet on the first call are the people who do the work."
        aside={
          <FactPanel
            items={[
              { label: "Team", value: "6 people", color: "pink" },
              { label: "Based in", value: "Indore", color: "lime" },
              { label: "Projects a year", value: "4 to 6", color: "violet" },
              { label: "We work in", value: "English, Hindi", color: "mist" },
            ]}
          />
        }
      >
        <div className="mt-6 flex items-center gap-3">
          <div className="flex -space-x-3">
            {team.map((m) => (
              <Avatar key={m.name} member={m} badge={false} className="size-11 rounded-full ring-2 ring-(--bg)" />
            ))}
          </div>
          <Link href={`${BASE}/team`} className="inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline">
            Meet the team
          </Link>
        </div>
      </PageHero>

      <section className={`${wrap} ${section}`} aria-labelledby="ab-why">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 id="ab-why" className={h2}>
            Why one studio for brand, web and motion
          </h2>
          <div className="grid gap-4 text-lg leading-relaxed">
            <p className="text-(--muted)">
              Most brands are built in pieces: a logo from one agency, a website from another, launch content from a freelancer. Each piece is fine. Together, they
              don&apos;t feel like one brand.
            </p>
            <p>
              We do all three in one project, around one idea that fits in a sentence. When the logo, the website and the launch film share that idea, people
              recognise you faster.
            </p>
          </div>
        </div>
        <ul className={`${gapAfterHead} ${rail("md:grid-cols-3")}`}>
          {values.map((v, i) => (
            <li key={v.name} className={railItem}>
              <article className={`h-full rounded-[24px] p-6 text-[#0B0B0D] md:p-7 ${accentBg[valueColors[i]]}`}>
                <h3 className={`${disp} text-2xl leading-tight`}>{v.name}</h3>
                <p className="mt-3 text-[#0B0B0D]/80">{v.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className={`border-y border-(--line) bg-(--bg2) ${section}`} aria-labelledby="ab-week">
        <div className={wrap}>
          <SectionHead id="ab-week" title="A week working with us" lead="The same rhythm on every project, so you always know when you'll see something new." />
          <ol className={`${gapAfterHead} ${rail("md:grid-cols-4")}`}>
            {rhythm.map((r) => (
              <li key={r.day} className={`${railItem} w-[70%]! sm:w-[45%]! md:w-auto!`}>
                <div className="h-full rounded-[22px] border border-(--line) bg-(--card) p-5">
                  <p className="flex items-center gap-2 font-semibold">
                    <span aria-hidden className={`size-2.5 rounded-full ${accentBg[r.color]}`} />
                    {r.day}
                  </p>
                  <p className="mt-2 text-(--muted)">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} ${section}`} aria-labelledby="ab-process">
        <SectionHead id="ab-process" title="From first call to launch" lead="Ten to twelve weeks for a full launch. Shorter for a single service." />
        <div className={gapAfterHead}>
          <DrawLine className="hidden lg:block" />
          <ol className="grid grid-cols-2 gap-x-4 gap-y-7 lg:mt-6 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s.name}>
                <span className={`grid size-10 place-items-center rounded-full text-sm font-bold text-[#0B0B0D] ${accentBg[stepColors[i]]}`}>{i + 1}</span>
                <h3 className={`${disp} mt-4 text-xl`}>{s.name}</h3>
                <p className="mt-1.5 text-(--muted)">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12 rounded-[24px] border border-(--line) bg-(--card) p-6 md:flex md:items-center md:justify-between md:gap-10 md:p-8">
          <div>
            <h3 className="font-semibold">Tools we use every day</h3>
            <p className="mt-1 text-(--muted)">You don&apos;t need any of them: you&apos;ll review work in your browser.</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 md:mt-0 md:max-w-[55%] md:justify-end">
            {tools.map((t) => (
              <li key={t} className="rounded-full border border-(--line) px-3.5 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="ab-faq">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 id="ab-faq" className={h2}>
            About the studio
          </h2>
          <Faq items={aboutFaqs} />
        </div>
      </section>

      <CtaBand book={<BookCallButton className={btnDark} />} />
    </>
  );
}
