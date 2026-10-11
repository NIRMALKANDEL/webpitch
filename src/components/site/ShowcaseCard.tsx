"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Demo } from "@/data/demos";
import { industryBySlug } from "@/data/industries";

/** Tall full-page screenshot that scrolls inside the card on hover (falls back to the regular preview). */
export const demoTall = (slug: string) => `/previews/tall/${slug}.jpg`;

/**
 * The one card used for demos everywhere: a real screenshot of the live demo that scrolls on hover,
 * a cursor spotlight, a gentle 3D tilt, and one click straight into the demo website.
 */
export function ShowcaseCard({ demo, label, priority = false, wide = false }: { demo: Demo; label?: string; priority?: boolean; wide?: boolean }) {
  const industry = industryBySlug(demo.industry)!;
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x);
    my.set(y);
    e.currentTarget.style.setProperty("--sx", `${x * 100}%`);
    e.currentTarget.style.setProperty("--sy", `${y * 100}%`);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} className="h-full">
      <Link
        href={`/demos/${demo.slug}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        aria-label={`Open the ${demo.brand} live demo (${label ?? industry.short})`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-surface p-2 ring-1 ring-ink/10 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
      >
        {/* cursor spotlight + glowing edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(420px circle at var(--sx,50%) var(--sy,50%), color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[22px] p-px opacity-0 transition-opacity duration-300 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] group-hover:opacity-100"
          style={{ background: "radial-gradient(260px circle at var(--sx,50%) var(--sy,50%), var(--accent), var(--accent-2) 40%, transparent 70%)" }}
        />

        <div className={`relative overflow-hidden rounded-[16px] bg-muted ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          <Image
            src={demoTall(demo.slug)}
            alt={`${demo.brand}, a live ${industry.short.toLowerCase()} demo website`}
            fill
            priority={priority}
            sizes={wide ? "(min-width:1024px) 62vw, 92vw" : "(min-width:1024px) 31vw, (min-width:640px) 46vw, 92vw"}
            className="object-cover object-top transition-[object-position] duration-[4000ms] ease-in-out group-hover:object-bottom motion-reduce:transition-none"
          />
          <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-volt" />
              <span className="relative size-1.5 rounded-full bg-volt" />
            </span>
            Live demo
          </span>
          <span className="absolute right-3 bottom-3 grid size-11 translate-y-2 place-items-center rounded-full bg-volt text-[#0b0b0f] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-5" aria-hidden />
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 px-3 pt-4 pb-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-accent uppercase">{label ?? industry.short}</p>
            <h3 className="mt-1 truncate font-display text-xl font-semibold tracking-tight">{demo.brand}</h3>
          </div>
          <span className="shrink-0 text-xs text-ink-3">{demo.city}</span>
        </div>
      </Link>
    </motion.div>
  );
}
