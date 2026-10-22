import { CalendarDays, Clock, FileText, Globe, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "../_parts/client";
import { BASE, contactFaqs, contactSteps, studio } from "../_parts/data";
import { accentBg, disp, FactPanel, Faq, gapAfterHead, h2, PageHero, section, SectionHead, wrap } from "../_parts/ui";

export const metadata: Metadata = {
  title: "Contact — Hotwire Studio demo",
  description: "How to reach Hotwire Studio: book a free call, send a project brief, or email the studio in Berlin. What happens after you get in touch.",
};

const tile = "group flex h-full flex-col justify-between gap-6 rounded-[26px] p-6 text-left text-[#0B0B0D] transition duration-300 hover:-translate-y-1 md:gap-12 md:p-8";
const stepColors = ["pink", "lime", "violet"] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        accent="pink"
        title="Say hello"
        lead="Three ways to start. Pick the one that suits you; all of them reach the same small team."
        aside={
          <FactPanel
            items={[
              { label: "We reply in", value: "2 working days", color: "pink" },
              { label: "First call", value: "Free, 20 min", color: "lime" },
              { label: "Languages", value: "English, German", color: "violet" },
              { label: "Time zone", value: "Berlin (CET)", color: "mist" },
            ]}
          />
        }
      />

      <section className={`${wrap} ${section}`} aria-label="Ways to get in touch">
        <div className="grid gap-4 md:grid-cols-3">
          <BookCallButton className={`${tile} bg-(--pink)`}>
            <CalendarDays className="size-8" aria-hidden />
            <span>
              <span className={`${disp} block text-2xl`}>Book a free call</span>
              <span className="mt-1 block text-[#0B0B0D]/75">20 minutes on video. Pick a day and time.</span>
            </span>
          </BookCallButton>
          <Link href={`${BASE}/enquire`} className={`${tile} bg-(--lime)`}>
            <FileText className="size-8" aria-hidden />
            <span>
              <span className={`${disp} block text-2xl`}>Send a brief</span>
              <span className="mt-1 block text-[#0B0B0D]/75">Services, budget and timeline in one form.</span>
            </span>
          </Link>
          <a href={`mailto:${studio.email}`} className={`${tile} bg-(--violet)`}>
            <Mail className="size-8" aria-hidden />
            <span>
              <span className={`${disp} block text-2xl`}>Email us</span>
              <span className="mt-1 block break-all text-[#0B0B0D]/75">{studio.email}</span>
            </span>
          </a>
        </div>
        <p className="mt-4 text-sm text-(--muted)">Contact details on this page are placeholders for a fictional studio. Nothing here reaches a real inbox.</p>
      </section>

      <section className={`border-y border-(--line) bg-(--bg2) ${section}`} aria-labelledby="ct-next">
        <div className={wrap}>
          <SectionHead id="ct-next" title="What happens after you get in touch" />
          <ol className={`${gapAfterHead} grid gap-4 md:grid-cols-3`}>
            {contactSteps.map((s, i) => (
              <li key={s.name} className="flex gap-4 rounded-[22px] border border-(--line) bg-(--card) p-5 md:block">
                <span className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-[#0B0B0D] ${accentBg[stepColors[i]]}`}>{i + 1}</span>
                <div>
                  <h3 className={`${disp} text-xl md:mt-4`}>{s.name}</h3>
                  <p className="mt-1 text-(--muted)">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} ${section}`} aria-labelledby="ct-faq">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 id="ct-faq" className={h2}>
              Before you write
            </h2>
            <ul className="mt-6 grid gap-3 text-(--muted)">
              {[
                { icon: MapPin, text: studio.address },
                { icon: Clock, text: studio.hours },
                { icon: Globe, text: "Clients across Europe, on video" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-(--ink-pink)" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <Faq items={contactFaqs} />
        </div>
      </section>
    </>
  );
}
