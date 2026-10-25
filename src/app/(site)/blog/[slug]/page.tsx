import { Suspense } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/shared/JsonLd";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { RichText } from "@/components/site/RichText";
import { type Block, formatDate, postBySlug, posts, sortedPosts } from "@/data/blog";
import { site } from "@/data/site";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { waLink, waMessages } from "@/lib/whatsapp";

// Every post is prerendered; navigations wait for the full static page.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    article: { published: post.published, modified: post.updated },
  });
}

function BlockView({ block }: { block: Block }) {
  if ("h2" in block) return <h2 className="mt-12 font-display text-3xl leading-tight font-semibold tracking-tight text-ink">{block.h2}</h2>;
  if ("p" in block)
    return (
      <p className="mt-5">
        <RichText text={block.p} />
      </p>
    );
  if ("ul" in block)
    return (
      <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-accent">
        {block.ul.map((li) => (
          <li key={li}>
            <RichText text={li} />
          </li>
        ))}
      </ul>
    );
  if ("ol" in block)
    return (
      <ol className="mt-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent">
        {block.ol.map((li) => (
          <li key={li}>
            <RichText text={li} />
          </li>
        ))}
      </ol>
    );
  if ("table" in block)
    return (
      <div className="mt-6 overflow-x-auto rounded-[14px] border border-muted">
        <table className="w-full min-w-[520px] text-left text-base">
          <thead className="bg-alt">
            <tr>
              {block.table.head.map((h) => (
                <th key={h} scope="col" className="p-3 font-semibold text-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {block.table.rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="p-3 font-normal text-ink">
                      {c}
                    </th>
                  ) : (
                    <td key={i} className="p-3">
                      {c}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return (
    <div className="mt-10 rounded-[20px] bg-night p-6 text-white ring-1 ring-white/10 sm:p-8">
      <p className="font-display text-2xl leading-snug font-semibold">{block.cta}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/demos" className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 text-base font-semibold text-ink">
          See live demos
        </Link>
        <a
          href={waLink(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 text-base font-semibold"
        >
          <WhatsAppIcon className="size-5" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

async function PostPageBody({ params }: { params: PageProps<"/blog/[slug]">["params"] }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  const more = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);
  const path = `/blog/${post.slug}`;

  return (
    <article className="container-x max-w-3xl py-10 sm:py-16">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-3">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <ChevronRight className="size-3.5" aria-hidden />
          <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
        </ol>
      </nav>
      <JsonLd
        data={[
          articleSchema({ title: post.title, description: post.description, path, published: post.published, updated: post.updated }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]),
        ]}
      />

      <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
      <p className="mt-5 text-sm text-ink-3">
        By{" "}
        <Link href="/about" className="font-medium text-ink-2 hover:text-ink">
          {site.ownerName}
        </Link>{" "}
        · <time dateTime={post.published}>{formatDate(post.published)}</time>
        {post.updated ? (
          <>
            {" "}
            · updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
          </>
        ) : null}{" "}
        · {post.minutes} min read
      </p>

      <div className="mt-8 text-lg leading-relaxed text-ink-2">
        {post.body.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>

      {post.sources?.length ? (
        <section className="mt-12 border-t border-muted pt-6" aria-labelledby="sources-title">
          <h2 id="sources-title" className="text-sm font-semibold text-ink">Sources</h2>
          <ul className="mt-2 space-y-1 text-sm text-ink-3">
            {post.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {more.length ? (
        <section className="mt-14" aria-labelledby="more-title">
          <h2 id="more-title" className="font-display text-2xl font-semibold">More from the blog</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="block h-full rounded-2xl bg-surface p-5 ring-1 ring-ink/10 transition hover:ring-ink/25">
                  <span className="font-display text-lg leading-snug font-semibold">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Link href="/blog" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
        <ArrowLeft className="size-4" aria-hidden /> All posts
      </Link>
    </article>
  );
}

/**
 * The page reads its slug inside <Suspense>, so client navigations can show the shell instantly
 * (Next.js "instant navigation" validation). Every slug is still prerendered by generateStaticParams.
 */
export default function PostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="container-x min-h-[70vh] py-12" aria-busy="true" />}>
      <PostPageBody params={params} />
    </Suspense>
  );
}
