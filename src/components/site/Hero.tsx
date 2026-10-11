"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Price } from "@/components/shared/Price";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { demoPreview, demos } from "@/data/demos";
import { industryBySlug } from "@/data/industries";
import { packages } from "@/data/pricing";
import { BrowserFrame } from "./Cards";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [active, setActive] = useState(0);
  const demo = demos[active];
  const starter = packages.find((p) => p.id === "starter")!;

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-20%] size-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(47,69,232,0.13),transparent)]"
      />
      <div className="container-x grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8 lg:pt-20 lg:pb-24">
        <div>
          <motion.h1
            id="hero-title"
            className="font-display text-[44px] leading-[0.98] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[76px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            See your new website before you pay for it.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            Pick your industry, open a live demo built for businesses like yours, and I&apos;ll build one that&apos;s
            yours — from <Price prices={starter.prices} className="font-semibold text-ink" />.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            <Link
              href="/demos"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition hover:bg-ink/85"
            >
              Explore Demos <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full border border-ink/15 bg-surface px-6 font-semibold transition hover:border-ink/40"
            >
              Discuss Your Project
            </Link>
          </motion.div>
          <p className="mt-6 text-sm text-ink-3">One developer · 13 industries · working with clients in India and worldwide</p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <div role="group" aria-label="Choose an industry to preview" className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,#000_85%,transparent)] lg:mx-0 lg:px-0">
            {demos.map((d, i) => (
              <button
                key={d.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`min-h-9 shrink-0 rounded-full border px-3.5 text-sm transition ${
                  i === active ? "border-ink bg-ink text-white" : "border-muted bg-surface text-ink-2 hover:border-ink/30"
                }`}
              >
                {industryBySlug(d.industry)!.short}
              </button>
            ))}
          </div>

          <Scene3DGate
            className="aspect-[16/11] w-full"
            render={(onReady) => (
              <HeroScene images={demos.map((d) => demoPreview(d.slug))} active={active} onReady={onReady} />
            )}
            fallback={
              <BrowserFrame url={`demo · ${demo.brand}`} className="mx-auto w-[92%] lg:mt-6">
                <div className="relative aspect-[16/10] bg-muted">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={demo.slug}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={demoPreview(demo.slug)}
                        alt={`Screenshot of the ${demo.brand} demo website`}
                        fill
                        priority={active === 0}
                        sizes="(min-width:1024px) 50vw, 92vw"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </BrowserFrame>
            }
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-2" aria-live="polite">
              <span className="font-semibold text-ink">{demo.brand}</span> · {demo.city} · {demo.tier}
            </p>
            <Link
              href={`/demos/${demo.slug}`}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              Open live demo <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
