import type { Metadata } from "next";
import { BookCallButton } from "../_parts/client";
import { memberByName, team, teamPhases } from "../_parts/data";
import { accentBg, Avatar, btnDark, btnLine, CtaBand, disp, FactPanel, gapAfterHead, PageHero, rail, railItem, section, SectionHead, TeamCard, wrap } from "../_parts/ui";

export const metadata: Metadata = {
  title: "Team — Hotwire Studio demo",
  description: "The six people who run every Hotwire project, who you'll work with at each stage, and how to join the studio.",
};

const phaseColors = ["pink", "lime", "violet", "mist"] as const;

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumb="Team"
        accent="violet"
        title="Six people, every project"
        lead="No juniors hidden behind a pitch team. Here's who you'd work with, and what to ask each of them about."
        aside={
          <FactPanel
            items={[
              { label: "Strategy", value: "2 people", color: "pink" },
              { label: "Design and motion", value: "2 people", color: "lime" },
              { label: "Development", value: "1 person", color: "violet" },
              { label: "Production", value: "1 person", color: "mist" },
            ]}
          />
        }
      >
        <p className="mt-5 inline-block rounded-full border border-(--line) px-4 py-2 text-sm text-(--muted)">
          Fictional team for this demo. A real site would use real names and photos.
        </p>
      </PageHero>

      <section className={`${wrap} ${section}`} aria-label="Team members">
        <ul className={rail("md:grid-cols-2 lg:grid-cols-3")}>
          {team.map((m) => (
            <li key={m.name} className={railItem}>
              <TeamCard member={m} />
            </li>
          ))}
        </ul>
      </section>

      <section className={`border-y border-(--line) bg-(--bg2) ${section}`} aria-labelledby="tm-who">
        <div className={wrap}>
          <SectionHead id="tm-who" title="Who you'll talk to, and when" lead="Each stage has a lead, so you always know who to ask." />
          <ol className={`${gapAfterHead} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
            {teamPhases.map((p, i) => (
              <li key={p.phase} className="flex flex-col rounded-[22px] border border-(--line) bg-(--card) p-5">
                <p className="flex items-center gap-2.5">
                  <span className={`grid size-8 place-items-center rounded-full text-sm font-bold text-[#0B0B0D] ${accentBg[phaseColors[i]]}`}>{i + 1}</span>
                  <span className={`${disp} text-xl`}>{p.phase}</span>
                </p>
                <p className="mt-2 text-(--muted)">{p.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.people.map((name) => {
                    const m = memberByName(name);
                    return m ? (
                      <li key={name} className="flex items-center gap-2 rounded-full border border-(--line) py-1 pr-3 pl-1 text-sm">
                        <Avatar member={m} badge={false} className="size-7 rounded-full" />
                        {name.split(" ")[0]}
                      </li>
                    ) : null;
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} ${section}`} aria-labelledby="tm-join">
        <div className="grid gap-6 rounded-[28px] border border-(--line) bg-(--card) p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
          <div>
            <h2 id="tm-join" className={`${disp} text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight`}>
              Want to join us?
            </h2>
            <p className="mt-2 max-w-[48ch] text-(--muted)">
              We&apos;re not hiring right now, but we always read portfolios from designers, developers and motion artists. On a real site, this would link to open roles.
            </p>
          </div>
          <a href="mailto:hello@hotwire.example?subject=Portfolio" className={`${btnLine} md:justify-self-end`}>
            Send your portfolio
          </a>
        </div>
      </section>
      <CtaBand title="Want to work with us?" book={<BookCallButton className={btnDark} />} />
    </>
  );
}
