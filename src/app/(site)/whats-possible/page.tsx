import { ArrowRight, Gauge, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/site/Cards";
import { FeatureGallery } from "@/components/site/FeatureGallery";
import { demoBySlug, demoPreview } from "@/data/demos";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "What your website can do",
  description: "3D product viewers, 4K video heroes, scroll-driven lookbooks, ordering carts and booking flows — all live in working demos.",
  path: "/whats-possible",
  image: "whats-possible",
});

export default function WhatsPossiblePage() {
  const essential = demoBySlug("salon")!;
  const signature = demoBySlug("furniture")!;
  return (
    <>
      <section className="container-x py-12 sm:py-20">
        <h1 className="max-w-4xl font-display text-5xl leading-[1] font-semibold tracking-tight text-balance sm:text-7xl">
          What your website can do
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
          From fast and simple to cinematic and 3D. Every feature on this page is live in one of the demos, so you can try it
          yourself before deciding what you want.
        </p>
        <FeatureGallery />
      </section>

      <section className="border-y border-muted bg-alt py-16 sm:py-24" aria-labelledby="compare-title">
        <div className="container-x">
          <h2 id="compare-title" className="max-w-3xl font-display text-3xl leading-[1.08] font-semibold tracking-tight sm:text-[40px]">
            Essential or Signature: the same craft, two speeds
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-2">
            Video and 3D make a big first impression but take a little longer to load. Simpler sites load almost instantly on
            any phone. Both are built to look premium, and you can mix the two.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {[
              {
                d: essential,
                icon: Gauge,
                label: "Essential",
                points: ["Loads in about a second on 4G", "Clean micro-interactions", "Booking flow, offers, prices", "Starter and Business packages"],
              },
              {
                d: signature,
                icon: Sparkles,
                label: "Signature",
                points: ["Live 3D product configurator", "4K workshop film", "Scroll-driven storytelling", "Premium or Store package + 3D add-on"],
              },
            ].map(({ d, icon: Icon, label, points }) => (
              <div key={d.slug} className="flex flex-col">
                <Link href={`/demos/${d.slug}`} className="group block">
                  <BrowserFrame url={`${d.brand.toLowerCase().replace(/[^a-z]+/g, "")}.com`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={demoPreview(d.slug)} alt={`Screenshot of the ${d.brand} demo website`} fill sizes="(min-width:1024px) 45vw, 92vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
                    </div>
                  </BrowserFrame>
                </Link>
                <p className="mt-5 inline-flex items-center gap-2 font-display text-xl font-semibold">
                  <Icon className="size-5 text-accent" aria-hidden /> {label}: {d.brand}
                </p>
                <ul className="mt-3 space-y-1.5 text-ink-2">
                  {points.map((p) => (
                    <li key={p}>— {p}</li>
                  ))}
                </ul>
                <Link href={`/demos/${d.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
                  Try the {label.toLowerCase()} demo <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
