"use client";

import { ArrowUpRight, BadgeIndianRupee, KeyRound, MapPin, MessageCircle } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const orbit = ["React", "Next.js", "Node.js", "Three.js", "MongoDB", "Tailwind", "TypeScript", "AI"];
const ease = [0.22, 1, 0.36, 1] as const;

const reasons = [
  { icon: MapPin, title: "Local and reachable", text: `Based in ${site.city}. We can meet at your shop, and I reply on WhatsApp within 12 hours.` },
  { icon: MessageCircle, title: "You talk to the developer", text: "No account managers or hand-offs. The person on the call writes your code." },
  { icon: BadgeIndianRupee, title: "Fixed price, 50/50 payment", text: "A written quote before work starts, and half the payment only before launch." },
  { icon: KeyRound, title: "You own everything", text: "Domain, hosting and content in your name. No lock-in, ever." },
];

/** "Hi, I'm Nirmal": spinning avatar ring with orbiting skills, letter-by-letter headline, and why local businesses work with me. */
export function AboutMe() {
  const first = site.ownerName.split(" ")[0];
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });
  const glare = useTransform([mx, my], ([x, y]: number[]) => `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18), transparent 50%)`);

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-surface p-5 ring-1 ring-ink/10 sm:p-10 lg:p-14">
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-accent/20 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 size-96 rounded-full bg-accent-2/15 blur-[100px]" />

      <div className="relative grid items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-5 sm:gap-16 sm:text-left sm:items-center">
            {/* avatar with a spinning gradient ring and orbiting skills */}
            <div className="relative grid size-24 shrink-0 place-items-center sm:size-48">
              <div aria-hidden className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--accent),var(--accent-2),#f59e0b,var(--color-volt),var(--accent))] motion-reduce:animate-none" />
              <div className="relative size-[92%] overflow-hidden rounded-full bg-paper">
                <Image src={site.photo} alt={`Photo of ${site.ownerName}`} fill sizes="200px" className="object-cover" unoptimized />
              </div>
              <ul aria-hidden className="absolute -inset-10 hidden animate-[spin_30s_linear_infinite] motion-reduce:animate-none sm:block">
                {orbit.map((s, i) => {
                  const a = (i / orbit.length) * Math.PI * 2;
                  return (
                    <li key={s} className="absolute top-1/2 left-1/2" style={{ transform: `translate(-50%,-50%) translate(${Math.cos(a) * 128}px, ${Math.sin(a) * 128}px)` }}>
                      <span className="block animate-[spin_30s_linear_infinite_reverse] rounded-full bg-paper/90 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-ink-2 ring-1 ring-ink/10 backdrop-blur motion-reduce:animate-none">
                        {s}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <h2 className="font-display text-4xl leading-[0.95] font-semibold tracking-tight sm:text-5xl xl:text-6xl" aria-label={`Hi, I'm ${first}.`}>
              <span aria-hidden className="block">
                Hi
                <span className="ml-2 inline-block origin-[70%_70%] animate-[wave_2.4s_ease-in-out_infinite] motion-reduce:animate-none">👋</span>
              </span>
              <span aria-hidden className="block whitespace-nowrap">
                I&apos;m{" "}
                {[...first].map((c, i) => (
                  <motion.span
                    key={i}
                    className="text-shine inline-block"
                    initial={{ y: "0.6em", opacity: 0, rotate: 12 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.15 + i * 0.06 }}
                  >
                    {c}
                  </motion.span>
                ))}
                .
              </span>
            </h2>
          </div>

          <motion.div
            className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-ink-2 sm:mt-10 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p>
              I&apos;m a full-stack developer based in {site.city}.{" "}
              <span className="hidden sm:inline">I build with React, Next.js, Node.js and Three.js, and </span>
              <span className="sm:hidden">I </span>design and build every one of these sites myself. <span className="sm:hidden">You talk directly to me, no middlemen.</span>
            </p>
            <p className="hidden sm:block">
              You talk directly to the person writing your code. No account managers, no hand-offs, no surprise invoices. I&apos;d
              rather <strong className="font-semibold text-ink">show</strong> you your website than describe it, which is why every
              industry here has a live demo.
            </p>
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href="/about"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-paper transition hover:bg-ink/85"
            >
              More about me <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
            {site.social.linkedin ? (
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex min-h-12 items-center rounded-full border border-ink/15 px-6 font-semibold transition hover:border-ink/40"
              >
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>

        {/* why local businesses work with me: a tilting card */}
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width);
            my.set((e.clientY - r.top) / r.height);
          }}
          onPointerLeave={() => {
            mx.set(0.5);
            my.set(0.5);
          }}
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="group relative block"
        >
          <div aria-hidden className="absolute -inset-3 rounded-[26px] bg-gradient-to-br from-accent via-accent-2 to-volt opacity-30 blur-2xl transition duration-500 group-hover:opacity-50" />
          <div className="relative overflow-hidden rounded-[18px] bg-paper p-6 ring-1 ring-ink/10 shadow-2xl sm:p-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight">Why {site.city} businesses work with me</h3>
            <ul className="mt-6 space-y-5">
              {reasons.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold">{title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-2">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glare }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
