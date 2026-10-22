import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCallButton, CopyLinkButton, NewsletterForm, PostCard } from "../../_parts/client";
import { BASE, categoryColor, formatDate, memberByName, postBySlug, posts, readMinutes, slugify } from "../../_parts/data";
import { accentBg, Avatar, btnDark, CtaBand, disp, gapAfterHead, h2, rail, railItem, section, wrap, PageSkeleton } from "../../_parts/ui";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return posts.map((p) => ({ post: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ post: string }> }): Promise<Metadata> {
  const { post } = await params;
  const p = postBySlug(post);
  if (!p) return {};
  return { title: `${p.title} — Hotwire Studio demo`, description: p.excerpt };
}

// The page reads its slug inside <Suspense>, so client navigations can show the shared shell instantly.
export default function Article({ params }: { params: Promise<{ post: string }> }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ArticleBody params={params} />
    </Suspense>
  );
}

async function ArticleBody({ params }: { params: Promise<{ post: string }> }) {
  const { post } = await params;
  const p = postBySlug(post);
  if (!p) notFound();
  const others = posts.filter((x) => x.slug !== p.slug);
  const related = [...others.filter((x) => x.category === p.category), ...others.filter((x) => x.category !== p.category)].slice(0, 3);
  const author = memberByName(p.author);
  const toc = p.body.flatMap((b) => ("h2" in b ? [b.h2] : []));

  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-(--line)">
        <div aria-hidden className={`absolute -top-40 -right-32 -z-10 size-[520px] rounded-full opacity-25 blur-[120px] ${accentBg[categoryColor[p.category]]}`} />
        <div className={`${wrap} pt-10 pb-14 md:pt-16 md:pb-20`}>
          <Link href={`${BASE}/blog`} className="inline-flex min-h-11 items-center gap-2 text-sm text-(--muted) hover:text-(--fg)">
            <ArrowLeft className="size-4" aria-hidden /> All articles
          </Link>
          <p className={`hw-rise mt-3 inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold text-[#0B0B0D] ${accentBg[categoryColor[p.category]]}`}>{p.category}</p>
          <h1 className={`${disp} hw-rise mt-4 max-w-[22ch] text-[clamp(2.2rem,5.4vw,4.25rem)] leading-[1.02]`}>{p.title}</h1>
          <div className="hw-rise-2 mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            {author ? (
              <div className="flex items-center gap-3">
                <Avatar member={author} badge={false} className="size-11 rounded-full" />
                <div className="leading-tight">
                  <p className="font-semibold">{author.name}</p>
                  <p className="text-sm text-(--muted)">{author.role}</p>
                </div>
              </div>
            ) : null}
            <p className="text-sm text-(--muted)">
              <time dateTime={p.date}>{formatDate(p.date)}</time>, {readMinutes(p)} min read
            </p>
          </div>
        </div>
      </header>

      <div className={`${wrap} grid gap-10 ${section} lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16`}>
        <article className="max-w-[44rem] text-[1.0625rem] leading-[1.75] md:text-lg">
          {toc.length ? (
            <details className="mb-8 rounded-[20px] border border-(--line) bg-(--card) p-4 lg:hidden">
              <summary className="cursor-pointer font-semibold">In this article</summary>
              <ol className="mt-3 grid gap-2 text-[15px]">
                {toc.map((t) => (
                  <li key={t}>
                    <a href={`#${slugify(t)}`} className="text-(--muted) hover:text-(--fg)">
                      {t}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          ) : null}
          <p className="text-xl leading-relaxed md:text-2xl">{p.excerpt}</p>
          <div className="text-(--fg)/85">
            {p.body.map((b, i) =>
              "h2" in b ? (
                <h2 key={i} id={slugify(b.h2)} className={`${disp} mt-10 scroll-mt-24 text-[1.6rem] leading-tight text-(--fg)`}>
                  {b.h2}
                </h2>
              ) : "ul" in b ? (
                <ul key={i} className="mt-4 grid gap-2">
                  {b.ul.map((li) => (
                    <li key={li} className="flex gap-3">
                      <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-(--pink)" />
                      {li}
                    </li>
                  ))}
                </ul>
              ) : "quote" in b ? (
                <blockquote key={i} className={`${disp} my-8 rounded-[22px] bg-(--card) p-6 text-[1.4rem] leading-snug text-(--fg) shadow-[inset_4px_0_0_var(--pink)]`}>
                  {b.quote}
                </blockquote>
              ) : (
                <p key={i} className="mt-4">
                  {b.p}
                </p>
              ),
            )}
          </div>
          <p className="mt-10 rounded-2xl border border-(--line) px-4 py-3 text-sm text-(--muted)">
            Sample article written for this demo. On a real site, the studio&apos;s own posts would appear here.
          </p>
        </article>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
          {toc.length ? (
            <nav aria-label="In this article" className="hidden rounded-[22px] border border-(--line) bg-(--card) p-5 lg:block">
              <p className="font-semibold">In this article</p>
              <ol className="mt-3 grid gap-2 text-[15px]">
                {toc.map((t) => (
                  <li key={t}>
                    <a href={`#${slugify(t)}`} className="text-(--muted) transition hover:text-(--fg)">
                      {t}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="rounded-[22px] border border-(--line) bg-(--card) p-5">
            <p className="font-semibold">Share this article</p>
            <div className="mt-3">
              <CopyLinkButton />
            </div>
          </div>
          <div className="rounded-[22px] bg-(--pink) p-5 text-[#0B0B0D]">
            <p className="font-semibold">Working on something like this?</p>
            <p className="mt-1 text-[#0B0B0D]/75">Talk it through with {author ? author.name.split(" ")[0] : "us"} on a free call.</p>
            <BookCallButton className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#0B0B0D] px-5 text-sm font-semibold text-white" topic={`About "${p.title}": `}>
              Book a free call
            </BookCallButton>
          </div>
        </aside>
      </div>

      <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`} aria-labelledby="nl-h">
        <div className="hw-aurora grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[28px] p-6 text-[#0B0B0D] md:grid-cols-[1fr_1.1fr] md:items-center md:p-10">
          <div>
            <h2 id="nl-h" className={`${disp} text-[clamp(1.6rem,3vw,2.25rem)] leading-tight`}>
              Get the next article by email
            </h2>
            <p className="mt-1 text-[#0B0B0D]/75">About one a month. Unsubscribe any time.</p>
          </div>
          <NewsletterForm tone="bright" />
        </div>
      </section>

      <section className={`border-t border-(--line) bg-(--bg2) ${section}`} aria-labelledby="rel-h">
        <div className={wrap}>
          <h2 id="rel-h" className={h2}>
            Keep reading
          </h2>
          <ul className={`${gapAfterHead} ${rail("md:grid-cols-3")}`}>
            {related.map((r) => (
              <li key={r.slug} className={railItem}>
                <PostCard p={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="pt-16 md:pt-24 lg:pt-28">
        <CtaBand book={<BookCallButton className={btnDark} />} />
      </div>
    </>
  );
}
