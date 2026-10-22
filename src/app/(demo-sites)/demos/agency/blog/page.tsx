import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton, JournalGrid, NewsletterForm } from "../_parts/client";
import { BASE, categories, categoryBlurb, categoryColor, formatDate, posts, readMinutes } from "../_parts/data";
import { accentBg, btnDark, CtaBand, disp, gapAfterHead, PageHero, section, SectionHead, wrap } from "../_parts/ui";

export const metadata: Metadata = {
  title: "Journal — Hotwire Studio demo",
  description: "Short articles on branding, websites, motion and how we run projects. Filter by category, or get new posts by email.",
};

export default function JournalPage() {
  const latest = posts[0];
  return (
    <>
      <PageHero
        crumb="Journal"
        accent="pink"
        title="Notes from the studio"
        lead="Short, practical articles on branding, websites and motion, written by the people doing the work."
        aside={
          <div className="rounded-3xl border border-(--line) bg-(--card) p-6">
            <h2 className="text-lg font-semibold">New posts by email</h2>
            <p className="mt-1 mb-4 text-muted">About one a month. No spam, unsubscribe any time.</p>
            <NewsletterForm />
          </div>
        }
      />

      <section className={`${wrap} pt-10 md:pt-14`} aria-labelledby="jr-latest">
        <h2 id="jr-latest" className="sr-only">
          Latest article
        </h2>
        <Link href={`${BASE}/blog/${latest.slug}`} className="hw-aurora group grid gap-6 rounded-[28px] p-6 text-[#0B0B0D] md:grid-cols-[1fr_auto] md:items-end md:p-10">
          <div>
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              <span className="rounded-full bg-[#0B0B0D] px-2.5 py-0.5 text-white">Latest</span>
              <span className={`rounded-full px-2.5 py-0.5 ring-1 ring-[#0B0B0D]/20 ${accentBg[categoryColor[latest.category]]}`}>{latest.category}</span>
            </p>
            <p className={`${disp} mt-4 max-w-[22ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.02]`}>{latest.title}</p>
            <p className="mt-3 max-w-[52ch] text-lg text-[#0B0B0D]/75">{latest.excerpt}</p>
          </div>
          <p className="text-sm text-[#0B0B0D]/70 md:text-right">
            <time dateTime={latest.date}>{formatDate(latest.date)}</time>
            <span className="block">{readMinutes(latest)} min read</span>
          </p>
        </Link>
      </section>

      <section className={`${wrap} ${section}`} aria-labelledby="jr-all">
        <SectionHead id="jr-all" title="All articles" lead="Filter by what you're working on." />
        <div className={gapAfterHead}>
          <JournalGrid posts={posts} />
        </div>
      </section>

      <section className={`border-y border-(--line) bg-(--bg2) ${section}`} aria-labelledby="jr-topics">
        <div className={wrap}>
          <SectionHead id="jr-topics" title="What we write about" />
          <ul className={`${gapAfterHead} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
            {categories.map((c) => {
              const n = posts.filter((p) => p.category === c).length;
              return (
                <li key={c} className="rounded-[22px] border border-(--line) bg-(--card) p-5">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold text-[#0B0B0D] ${accentBg[categoryColor[c]]}`}>{c}</span>
                  <p className="mt-3 text-muted">{categoryBlurb[c]}</p>
                  <p className="mt-3 text-sm font-semibold">
                    {n} {n === 1 ? "article" : "articles"}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="pt-16 md:pt-24 lg:pt-28">
        <CtaBand book={<BookCallButton className={btnDark} />} />
      </div>
    </>
  );
}
