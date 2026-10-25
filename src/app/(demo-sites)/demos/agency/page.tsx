import { Check } from "lucide-react";
import Link from "next/link";
import { BookCallButton, DrawLine, HeroRotator, HeroWire, PostCard, ProjectCard, VelocityMarquee } from "./_parts/client";
import { BASE, faqs, posts, projects, services, steps } from "./_parts/data";
import { accentBg, btnDark, btnLine, CtaBand, disp, Faq, gapAfterHead, h2, rail, railItem, section, SectionHead, wrap } from "./_parts/ui";

const shapes = ["rounded-full", "rounded-[30%]", "rotate-45 rounded-md", "rounded-t-full", "rounded-full border-[10px] border-[#0B0B0D] bg-transparent!"];
const stepColors = ["pink", "lime", "violet", "mist"] as const;

export default function AgencyHome() {
  const [lead, ...rest] = projects.slice(0, 3);
  return (
    <>
      {/* Hero: who we are, who it's for, and the two ways to start, all above the fold. */}
      <section className="relative isolate overflow-hidden" aria-labelledby="hero-h">
        <HeroWire />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[-5] bg-linear-to-t from-(--bg) via-(--bg)/70 to-transparent md:bg-linear-to-r md:from-(--bg) md:via-(--bg)/60"
        />
        <div className={`${wrap} pointer-events-none flex min-h-150 flex-col justify-end pt-32 pb-16 md:h-[min(calc(100svh-4rem),780px)] md:justify-center md:py-0`}>
          <p className="hw-rise mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-(--line) bg-(--card)/70 px-3 py-1.5 text-sm backdrop-blur">
            <span aria-hidden className="size-2 rounded-full bg-(--lime) shadow-[0_0_12px_var(--lime)]" />
            Independent studio in Indore
          </p>
          <h1 id="hero-h" className={`${disp} text-[clamp(2.1rem,5.6vw,5rem)] leading-[1.04]`}>
            <span className="sr-only">Brand, web and motion for challenger brands.</span>
            <span aria-hidden className="hw-lines">
              <span>
                <span style={{ ["--i" as string]: 0 }}>Brand, web and motion</span>
              </span>
              <span>
                <span style={{ ["--i" as string]: 1 }}>
                  for <HeroRotator />
                </span>
              </span>
            </span>
          </h1>
          <p className="hw-rise-2 mt-5 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
            We design your identity, build your website and make your launch film as one project, so all three feel like the same idea.
          </p>
          <div className="hw-rise-3 pointer-events-auto mt-7 flex flex-wrap items-center gap-3">
            <BookCallButton />
            <Link href={`${BASE}/work`} className={btnLine}>
              See the work
            </Link>
          </div>
          <ul className="hw-rise-3 mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {["Free 20-minute call", "Written plan within a week", "No obligation"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-(--hi)" aria-hidden /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <VelocityMarquee items={services.map((s) => s.name)} />

      {/* Services as a colourful bento: one look tells you what we do. */}
      <section className={`${wrap} ${section}`} aria-labelledby="svc-h">
        <SectionHead id="svc-h" title="What we make" lead="Five services you can book on their own, or together as one launch." link={{ href: `${BASE}/services`, label: "What's included" }} />
        <ul className={`${gapAfterHead} ${rail("md:auto-rows-[minmax(190px,auto)] md:grid-cols-2 lg:grid-cols-6")}`}>
          {services.map((s, i) => (
            <li key={s.slug} className={`${railItem} min-h-57.5 md:min-h-0 ${i === 0 ? "md:col-span-2 lg:col-span-2 lg:row-span-2" : "lg:col-span-2"}`}>
              <Link
                href={`${BASE}/services#${s.slug}`}
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 text-[#0B0B0D] transition duration-300 hover:-translate-y-1 ${accentBg[s.color]}`}
              >
                <span aria-hidden className={`hw-tile-shape absolute -top-8 -right-8 size-20 bg-[#0B0B0D]/90 sm:size-28 ${shapes[i]} ${i === 0 ? "lg:size-44" : ""}`} />
                <span className="relative pr-14 text-sm font-semibold opacity-70">{s.timeline}</span>
                <span className="relative">
                  <span className={`${disp} block ${i === 0 ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-2xl"} leading-tight`}>{s.name}</span>
                  <span className="mt-2 block max-w-[34ch] text-[#0B0B0D]/75">{s.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Work: one big project and two smaller ones. */}
      <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="work-h">
        <SectionHead id="work-h" title="Selected work" lead="Concept projects that show how we think." link={{ href: `${BASE}/work`, label: "All projects" }} />
        <div className={`${gapAfterHead} grid gap-x-5 gap-y-10 lg:grid-cols-12`}>
          <div className="lg:col-span-7">
            <ProjectCard p={lead} coverClass="h-[clamp(260px,40vw,560px)]" />
          </div>
          <div className="grid gap-10 lg:col-span-5">
            {rest.map((p) => (
              <ProjectCard key={p.slug} p={p} coverClass="h-[clamp(200px,18vw,230px)]" />
            ))}
          </div>
        </div>
      </section>

      {/* Process: a real sequence, so it's numbered. */}
      <section className={`border-y border-(--line) bg-(--bg2) ${section}`} aria-labelledby="how-h">
        <div className={wrap}>
          <SectionHead id="how-h" title="How a project runs" lead="Ten to twelve weeks from first call to launch, with a review every week." />
          <div className={gapAfterHead}>
            <DrawLine className="hidden lg:block" />
            <ol className="grid grid-cols-2 gap-x-4 gap-y-7 lg:mt-6 lg:grid-cols-4 lg:gap-6">
              {steps.map((s, i) => (
                <li key={s.name} className="hw-reveal">
                  <span className={`grid size-10 place-items-center rounded-full text-sm font-bold text-[#0B0B0D] ${accentBg[stepColors[i]]}`}>{i + 1}</span>
                  <h3 className={`${disp} mt-4 text-xl`}>{s.name}</h3>
                  <p className="mt-1.5 max-w-[32ch] text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* A low-commitment way in for visitors who aren't ready to write a brief. */}
      <section className={`${wrap} ${section}`} aria-labelledby="talk-h">
        <div className="grid items-center gap-8 rounded-[28px] border border-(--line) bg-(--card) p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <h2 id="talk-h" className={h2}>
              Not ready for a brief? Just talk to us.
            </h2>
            <p className="mt-3 max-w-[48ch] text-muted">
              Twenty minutes on video, no slides. Tell us what you&apos;re launching and we&apos;ll tell you honestly whether we&apos;re the right fit.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <BookCallButton className="inline-flex min-h-14 items-center justify-center rounded-full bg-(--pink) px-8 text-base font-semibold text-[#0B0B0D] transition hover:bg-(--lime) active:scale-[0.97]">
              Pick a time
            </BookCallButton>
            <p className="text-sm text-muted">Times available on the next five working days</p>
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="jr-h">
        <SectionHead id="jr-h" title="From the journal" link={{ href: `${BASE}/blog`, label: "All articles" }} />
        <ul className={`${gapAfterHead} ${rail("md:grid-cols-3")}`}>
          {posts.slice(0, 3).map((p) => (
            <li key={p.slug} className={railItem}>
              <PostCard p={p} />
            </li>
          ))}
        </ul>
      </section>

      <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="faq-h">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 id="faq-h" className={h2}>
              Questions people ask first
            </h2>
            <p className="mt-3 text-muted">Something else on your mind? Ask it on a call.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand book={<BookCallButton className={btnDark} />} />
    </>
  );
}
