import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, sortedPosts } from "@/data/blog";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Blog: websites and Google for ${site.city} businesses`,
  description: `Plain-language guides for small business owners in ${site.city}: website costs, Google Maps, getting more enquiries online.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = sortedPosts();
  return (
    <div className="container-x py-12 sm:py-20">
      <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Straight answers for small business owners: what websites cost, how to show up on Google, and how to get more enquiries.
      </p>
      <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-[22px] bg-surface p-6 ring-1 ring-ink/10 transition hover:ring-ink/25"
            >
              <p className="text-sm text-ink-3">
                <time dateTime={p.published}>{formatDate(p.published)}</time> · {p.minutes} min read
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight font-semibold tracking-tight">{p.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-ink-2">{p.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                Read <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
