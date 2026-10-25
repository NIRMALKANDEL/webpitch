import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { inr, packages } from "@/data/pricing";
import { site, socialLinks } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { waLink, waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = pageMeta({
  title: `About ${site.ownerName}, web developer in ${site.city}`,
  description: `I'm ${site.ownerName}, a full-stack web developer in ${site.city}. I design and build websites for small businesses myself: no agency, no middlemen, fixed prices from ${inr(packages[0].from)}.`,
  path: "/about",
});

const principles = [
  ["Show, don't describe", "Every industry on this site has a live demo, so you can click around before you pay anything."],
  ["One person, start to finish", "You talk to me on the first call, and I write every line of your website's code."],
  ["Fixed price, in writing", "You get a written quote before work starts. Pay half to start and half before launch."],
  ["You own everything", "Domain, hosting and content are in your name. If we stop working together, nothing breaks."],
];

const tools = ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Three.js", "MongoDB", "Vercel"];

export default function AboutPage() {
  const first = site.ownerName.split(" ")[0];
  return (
    <>
      <section className="container-x grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-1.5 text-sm text-ink-3">
            <MapPin className="size-4 text-accent" aria-hidden /> {site.city}, {site.region}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1] font-semibold tracking-tight text-balance sm:text-6xl">
            Hi, I&apos;m {first}. I build websites for small businesses.
          </h1>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink-2">
            <p>
              I&apos;m a full-stack web developer based in {site.city}, with a B.Tech in Computer Science and professional
              experience building React and TypeScript apps. Under the name {site.brandName}, I design and build websites for
              cafés, salons, clinics, coaching institutes, agencies and other small businesses.
            </p>
            <p>
              Most small businesses get a choice between a cheap template that looks like everyone else&apos;s and an agency
              quote they can&apos;t justify. I sit in between: a custom, fast website, built by the person you talk to, at a price
              that makes sense for a local business.
            </p>
            <p>
              I&apos;d rather show you than tell you, which is why every industry here has a live demo you can open and use.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold text-white"
            >
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
            <Link href="/demos" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/15 px-6 font-semibold transition hover:border-ink/40">
              See the live demos <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          {socialLinks.length ? (
            <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-3">
              Find me on
              {socialLinks.map((s) => (
                <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer me" className="font-semibold text-ink-2 underline underline-offset-4 hover:text-ink">
                  {s.key === "linkedin" ? "LinkedIn" : s.key === "github" ? "GitHub" : s.key === "googleBusiness" ? "Google" : s.key}
                </a>
              ))}
            </p>
          ) : null}
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[28px] bg-muted ring-1 ring-ink/10">
          <Image src={site.photo} alt={`Photo of ${site.ownerName}`} fill priority sizes="(min-width:1024px) 384px, 80vw" className="object-cover" unoptimized />
        </div>
      </section>

      <section className="border-y border-muted bg-alt py-12 sm:py-20" aria-labelledby="principles-title">
        <div className="container-x">
          <h2 id="principles-title" className="font-display text-[28px] leading-[1.08] font-semibold tracking-tight sm:text-[40px]">
            How I work with clients
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(([t, d]) => (
              <li key={t} className="rounded-[22px] bg-surface p-6 ring-1 ring-ink/10">
                <h3 className="font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-12 sm:py-20" aria-labelledby="process-title">
        <h2 id="process-title" className="mb-8 font-display text-[28px] leading-[1.08] font-semibold tracking-tight sm:mb-12 sm:text-[40px]">
          From first message to launch
        </h2>
        <Process />
      </section>

      <Testimonials className="container-x pb-12 sm:pb-20" />

      <section className="container-x pb-12 sm:pb-20" aria-labelledby="tools-title">
        <h2 id="tools-title" className="font-display text-2xl font-semibold">What I build with</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {tools.map((t) => (
            <li key={t} className="rounded-full border border-muted bg-surface px-3.5 py-1.5 text-sm text-ink-2">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-ink-2">
          Modern tools mean faster sites and lower hosting costs for you. You don&apos;t need to know any of this: you get a website
          that loads fast on a phone and a simple way to update it.
        </p>
      </section>

      <section className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[20px] bg-night p-8 text-white ring-1 ring-white/10 sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s talk about your business</h2>
            <p className="mt-2 text-white/70">
              Free 20-minute call or a chai in {site.city}. Fixed quote, no obligation.
            </p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 font-semibold text-ink">
            Discuss Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
