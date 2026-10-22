import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "../_parts/client";
import { alwaysIncluded, BASE, engagements, serviceFaqs, services } from "../_parts/data";
import { accentBg, btnDark, CtaBand, disp, FactPanel, Faq, gapAfterHead, h2, PageHero, rail, railItem, section, SectionHead, wrap } from "../_parts/ui";

export const metadata: Metadata = {
  title: "Services — Hotwire Studio demo",
  description: "Brand identity, websites, motion and 3D, launch campaigns and packaging. What each service includes, how long it takes and how to work with us.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        accent="lime"
        title="Five things we do well"
        lead="Book one, or run them together so your brand, website and launch come from the same idea."
        aside={
          <FactPanel
            items={[
              { label: "Services", value: "5", color: "pink" },
              { label: "Timelines", value: "2 to 12 weeks", color: "lime" },
              { label: "First call", value: "Free, 20 min", color: "violet" },
              { label: "Pricing", value: "Fixed, in writing", color: "mist" },
            ]}
          />
        }
      >
        <nav aria-label="Jump to a service" className="mt-6 flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--line) bg-(--card) px-4 text-sm transition hover:border-(--fg)/40">
              <span aria-hidden className={`size-2.5 rounded-full ${accentBg[s.color]}`} />
              {s.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* Cards stick and stack as you scroll, each a little lower than the last. */}
      <section className={`${wrap} ${section}`} aria-label="Services">
        <ol>
          {services.map((s, i) => (
            <li key={s.slug} id={s.slug} className="sticky mb-5 scroll-mt-24" style={{ top: `${84 + i * 14}px` }}>
              <article
                className={`grid gap-6 rounded-[28px] p-6 text-[#0B0B0D] shadow-[0_-16px_40px_-24px_rgb(0_0_0/0.6)] md:grid-cols-[1.25fr_1fr] md:gap-10 md:p-10 ${accentBg[s.color]}`}
              >
                <div className="flex flex-col">
                  <h2 className={`${disp} text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.02]`}>{s.name}</h2>
                  <p className="mt-3 max-w-[44ch] text-[17px] text-[#0B0B0D]/80 md:text-lg">{s.line}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-auto md:pt-6">
                    <span className="inline-flex rounded-full bg-[#0B0B0D] px-3 py-1 text-sm font-semibold text-white">Usually {s.timeline}</span>
                    <BookCallButton className="hw-link min-h-11 text-sm font-semibold" topic={`${s.name}: `}>
                      Talk about {s.name.toLowerCase()}
                    </BookCallButton>
                  </div>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-1">
                  {s.includes.map((x) => (
                    <li key={x} className="flex items-center gap-3 rounded-2xl bg-white/45 px-4 py-3 font-medium">
                      <Check className="size-4 shrink-0" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className={`border-y border-(--line) bg-(--bg2) ${section}`} aria-labelledby="ways-h">
        <div className={wrap}>
          <SectionHead id="ways-h" title="Three ways to work with us" lead="Pick the shape that fits where you are. You can always switch later." />
          <ul className={`${gapAfterHead} ${rail("md:grid-cols-3")}`}>
            {engagements.map((e, i) => (
              <li key={e.name} className={railItem}>
                <article className={`flex h-full flex-col rounded-[24px] border p-6 md:p-7 ${i === 1 ? "border-transparent bg-(--fg) text-(--bg)" : "border-(--line) bg-(--card)"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`size-3 rounded-full ${accentBg[e.color]}`} aria-hidden />
                    {i === 1 ? <span className="rounded-full bg-(--pink) px-2.5 py-0.5 text-xs font-semibold text-[#0B0B0D]">Best for launches</span> : null}
                  </div>
                  <h3 className={`${disp} mt-4 text-2xl`}>{e.name}</h3>
                  <p className={`mt-2 ${i === 1 ? "opacity-75" : "text-(--muted)"}`}>{e.who}</p>
                  <ul className="mt-5 grid gap-2 text-[15px]">
                    {e.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-auto pt-6 text-sm font-semibold ${i === 1 ? "opacity-75" : "text-(--muted)"}`}>{e.time}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${wrap} ${section}`} aria-labelledby="incl-h">
        <SectionHead id="incl-h" title="Included in every project" lead="Whatever you book, these come as standard." />
        <ul className={`${gapAfterHead} grid gap-px overflow-hidden rounded-[24px] border border-(--line) bg-(--line) sm:grid-cols-2 lg:grid-cols-3`}>
          {alwaysIncluded.map((a, i) => (
            <li key={a.name} className="flex gap-4 bg-(--card) p-5 md:p-6">
              <span aria-hidden className={`mt-1 size-3 shrink-0 rounded-full ${accentBg[(["pink", "lime", "violet", "pink", "lime", "violet"] as const)[i]]}`} />
              <div>
                <h3 className="font-semibold">{a.name}</h3>
                <p className="mt-1 text-(--muted)">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="sfaq-h">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 id="sfaq-h" className={h2}>
              Questions about services
            </h2>
            <p className="mt-3 text-(--muted)">
              Not sure which you need?{" "}
              <Link href={`${BASE}/enquire`} className="hw-link font-semibold text-(--ink-pink)">
                Describe the problem in a brief
              </Link>{" "}
              and we&apos;ll suggest the smallest project that fixes it.
            </p>
          </div>
          <Faq items={serviceFaqs} />
        </div>
      </section>
      <CtaBand book={<BookCallButton className={btnDark} />} />
    </>
  );
}
