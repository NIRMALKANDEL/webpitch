"use client";

import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Price } from "@/components/shared/Price";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { demoPreview, demos } from "@/data/demos";
import { packages } from "@/data/pricing";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

/** The rotating word in the headline, one per demo. */
const who: Record<string, string> = {
  restaurant: "restaurants",
  photography: "photographers",
  interior: "interior designers",
  salon: "salons & spas",
  "real-estate": "real estate",
  coaching: "coaching institutes",
  furniture: "furniture brands",
  manufacturer: "manufacturers",
  fashion: "fashion labels",
  "home-services": "home services",
  dental: "clinics",
  portfolio: "creators",
  "energy-drink": "product brands",
};

export function Hero() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const demo = demos[active];
  const starter = packages.find((p) => p.id === "starter")!;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % demos.length), 2800);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-[-10%] size-[620px] rounded-full bg-accent/25 blur-[120px]" />
        <div className="absolute top-20 right-[-15%] size-[560px] rounded-full bg-accent-2/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--ink)_7%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--ink)_7%,transparent)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      </div>

      <div className="container-x relative grid items-center gap-10 pt-8 pb-10 sm:pt-16 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6 lg:pt-20 lg:pb-24">
        <div>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/70 px-3 py-1.5 text-sm text-ink-2 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="size-2 rounded-full bg-volt shadow-[0_0_10px_var(--color-volt)]" aria-hidden />
            Nirmal Kandel · independent web developer
          </motion.p>

          <motion.h1
            id="hero-title"
            className="mt-6 font-display text-[40px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[72px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            I build websites for{" "}
            <span className="relative block h-[1.15em] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={demo.slug}
                  className="text-shine block text-[0.82em] whitespace-nowrap sm:text-[1em]"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {who[demo.slug]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Phones/tablets: show a live demo right under the headline (the 3D carousel is desktop-only). */}
          <Link
            href={`/demos/${demo.slug}`}
            className="group relative mt-6 block overflow-hidden rounded-2xl ring-1 ring-ink/10 lg:hidden"
            aria-label={`Open the ${demo.brand} live demo`}
          >
            <div className="relative aspect-[16/10] bg-muted">
              <AnimatePresence initial={false}>
                <motion.div key={demo.slug} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <Image src={demoPreview(demo.slug)} alt="" fill priority={active === 0} sizes="(min-width:640px) 80vw, 92vw" className="object-cover object-top" />
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-full bg-black/70 py-1.5 pr-1.5 pl-3.5 text-sm text-white backdrop-blur">
              <span className="text-white/70">Live demo</span>
              <span className="min-w-0 flex-1 truncate font-semibold">{demo.brand}</span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-volt text-[#0b0b0f]">
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </span>
          </Link>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            Don&apos;t imagine your new website. <strong className="font-semibold text-ink">Open a live demo</strong> made for your
            industry, click around, then I&apos;ll build yours.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-3 sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            <a
              href="#demos"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent shadow-[0_10px_40px_-10px_var(--color-accent)] transition hover:brightness-110"
            >
              Try a live demo <ArrowDown className="size-4 transition group-hover:translate-y-0.5" aria-hidden />
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full border border-ink/15 bg-surface/60 px-6 font-semibold backdrop-blur transition hover:border-ink/40"
            >
              Get a quote
            </Link>
          </motion.div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2 sm:mt-8">
            <li className="flex items-center gap-1.5"><Check className="size-4 text-accent" aria-hidden /> {demos.length} live demos</li>
            <li className="flex items-center gap-1.5">
              <Check className="size-4 text-accent" aria-hidden /> Fixed price from <Price prices={starter.prices} className="font-semibold text-ink" />
            </li>
            <li className="flex items-center gap-1.5"><Check className="size-4 text-accent" aria-hidden /> Launch in 1–3 weeks</li>
          </ul>
        </div>

        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <Scene3DGate
            className="aspect-[16/11] w-full cursor-pointer"
            render={(onReady) => (
              <div className="size-full" onClick={() => router.push(`/demos/${demo.slug}`)}>
                <HeroScene images={demos.map((d) => demoPreview(d.slug))} active={active} onReady={onReady} />
              </div>
            )}
            fallback={
              <div className="relative mx-auto mt-6 aspect-[16/10] w-[92%] overflow-hidden rounded-xl ring-1 ring-ink/10">
                <Image
                  src={demoPreview(demo.slug)}
                  alt={`Screenshot of the ${demo.brand} demo website`}
                  fill
                  priority={active === 0}
                  sizes="(min-width:1024px) 50vw, 92vw"
                  className="object-cover object-top"
                />
              </div>
            }
          />
          <Link
            href={`/demos/${demo.slug}`}
            className="mx-auto -mt-2 flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-surface/80 py-1.5 pr-1.5 pl-4 text-sm backdrop-blur transition hover:border-ink/30"
          >
            <span className="text-ink-3">Now showing</span>
            <span className="font-semibold">{demo.brand}</span>
            <span className="grid size-7 place-items-center rounded-full bg-volt text-[#0b0b0f]">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
