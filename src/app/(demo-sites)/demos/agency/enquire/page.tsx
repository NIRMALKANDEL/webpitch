import type { Metadata } from "next";
import { BookCallButton, BriefForm } from "../_parts/client";
import { contactFaqs, studio } from "../_parts/data";
import { accentBg, Faq, h2, PageHero, section, wrap } from "../_parts/ui";

export const metadata: Metadata = {
  title: "Start a project — Hotwire Studio demo",
  description: "Send Hotwire Studio a project brief: what you need, your budget range, timeline and contact details.",
};

const next = [
  { text: "We read every brief within two working days.", color: "pink" },
  { text: "If it's a fit, we book a 20-minute call to ask questions.", color: "lime" },
  { text: "You get a written plan with timeline and price, free.", color: "violet" },
] as const;

export default function EnquirePage() {
  return (
    <>
      <PageHero
        crumb="Start a project"
        accent="lime"
        title="Start a project"
        lead="Tell us what you need and roughly what you can spend. Two minutes now saves a week of emails later."
        aside={
          <div className="rounded-[24px] border border-(--line) bg-(--card) p-6">
            <h2 className="text-lg font-semibold">What happens next</h2>
            <ol className="mt-4 grid gap-4">
              {next.map((n, i) => (
                <li key={n.text} className="flex gap-3 text-(--muted)">
                  <span className={`grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold text-[#0B0B0D] ${accentBg[n.color]}`}>{i + 1}</span>
                  {n.text}
                </li>
              ))}
            </ol>
          </div>
        }
      />
      <section className={`${wrap} grid gap-8 ${section} lg:grid-cols-[1fr_320px] lg:gap-12`} aria-label="Project brief">
        <div className="rounded-[28px] border border-(--line) bg-(--bg2) p-5 md:p-8">
          <BriefForm />
        </div>
        <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
          <div className="rounded-[24px] bg-(--pink) p-6 text-[#0B0B0D]">
            <h2 className="text-lg font-semibold">Rather talk first?</h2>
            <p className="mt-1 text-[#0B0B0D]/75">Pick a 20-minute slot instead. No brief needed.</p>
            <BookCallButton className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#0B0B0D] px-5 text-sm font-semibold text-white transition hover:bg-[#2a2a2e]">
              Book a free call
            </BookCallButton>
          </div>
          <p className="px-2 text-sm text-(--muted)">
            Prefer email? Write to <span className="text-(--fg)">{studio.email}</span> (placeholder address for this demo).
          </p>
        </aside>
      </section>
      <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="eq-faq">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 id="eq-faq" className={h2}>
            Common questions
          </h2>
          <Faq items={contactFaqs} />
        </div>
      </section>
    </>
  );
}
