import { Suspense } from "react";
import { ArrowRight, Check, Clock, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { demoBySlug, demoLinkProps } from "@/data/demos";
import { inr, packages } from "@/data/pricing";
import { type Prospect, prospectBySlug, prospects } from "@/data/prospects";
import { site } from "@/data/site";
import { unsplash, unsplashSized } from "@/lib/media";
import { absoluteUrl } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return prospects.map((p) => ({ slug: p.slug }));
}

const heroFor = (p: Prospect) => p.heroImage || "1585937421612-70a008356fbe";

export async function generateMetadata({ params }: PageProps<"/for/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = prospectBySlug(slug);
  if (!p) return {};
  const title = `Sample website for ${p.business}`;
  const hero = heroFor(p);
  const image = hero.startsWith("/") ? absoluteUrl(hero) : unsplashSized(hero, 1200);
  return {
    title: { absolute: `${title} · by ${site.brandName}` },
    description: p.tagline,
    // Private pitch pages: never in search results. (Not blocked in robots.txt, so WhatsApp can still show a link preview.)
    robots: { index: false, follow: false },
    openGraph: { type: "website", title, description: p.tagline, images: [{ url: image, width: 1200, height: 630, alt: p.business }] },
    twitter: { card: "summary_large_image", title, description: p.tagline, images: [image] },
  };
}

const sectionTitle: Record<Prospect["kind"], string> = {
  cafe: "Menu",
  restaurant: "Menu",
  salon: "Services & prices",
  clinic: "Treatments",
  coaching: "Courses",
  "home-services": "Services & prices",
  agency: "What we do",
  shop: "Products",
  other: "What we offer",
};

const primaryCta: Record<Prospect["kind"], string> = {
  cafe: "Order on WhatsApp",
  restaurant: "Order on WhatsApp",
  salon: "Book on WhatsApp",
  clinic: "Book an appointment",
  coaching: "Book a free demo class",
  "home-services": "Get a free quote",
  agency: "Start a project",
  shop: "Order on WhatsApp",
  other: "Message us",
};

async function ProspectPageBody({ params }: { params: PageProps<"/for/[slug]">["params"] }) {
  const { slug } = await params;
  const p = prospectBySlug(slug);
  if (!p) notFound();
  const demo = demoBySlug(p.demo);
  const style = {
    "--p-bg": p.colors.bg,
    "--p-text": p.colors.text,
    "--p-accent": p.colors.accent,
    "--p-on-accent": p.colors.onAccent,
  } as React.CSSProperties;
  const theirWhatsApp = p.phone ? `https://wa.me/${p.phone}?text=${encodeURIComponent(`Hi ${p.business}!`)}` : "#pitch";
  const theirPhone = p.phone ? `tel:+${p.phone}` : "#pitch";
  const greeting = p.ownerFirstName ? `Hi ${p.ownerFirstName},` : `Hi ${p.business} team,`;
  const replyText = `Hi Nirmal, I saw the sample website you made for ${p.business}. Let's talk.`;
  const mapQuery = encodeURIComponent(`${p.area}, ${p.city}`);

  return (
    <div style={style} className="bg-(--p-bg) text-(--p-text)">
      {/* Sample banner: always visible, so nobody mistakes this for a live site */}
      <div className="sticky top-0 z-50 bg-[#0b0b0f] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-sm">
          <p className="min-w-0 truncate">
            <span className="font-semibold">Sample website</span>
            <span className="text-white/65"> made for {p.business} by {site.brandName}</span>
          </p>
          <a href="#pitch" className="shrink-0 rounded-full bg-[#c6f432] px-3 py-1 font-semibold text-[#0b0b0f]">
            Make it real
          </a>
        </div>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <p className="font-display text-xl font-bold tracking-tight">{p.business}</p>
        <div className="flex items-center gap-2">
          {p.phone ? (
            <a href={theirPhone} className="hidden min-h-10 items-center gap-1.5 rounded-full border border-current/20 px-4 text-sm font-semibold sm:inline-flex">
              <Phone className="size-4" aria-hidden /> Call
            </a>
          ) : null}
          <a href={theirWhatsApp} className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-(--p-accent) px-4 text-sm font-semibold text-(--p-on-accent)">
            <WhatsAppIcon className="size-4" /> {primaryCta[p.kind]}
          </a>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden" aria-labelledby="p-hero">
          <Image src={unsplash(heroFor(p))} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pt-24 pb-14 text-white">
            <p className="flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="size-4" aria-hidden /> {p.area}, {p.city}
            </p>
            <h1 id="p-hero" className="mt-3 max-w-3xl font-display text-5xl leading-[0.98] font-semibold tracking-tight sm:text-7xl">
              {p.business}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/85 sm:text-xl">{p.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={theirWhatsApp} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-(--p-accent) px-6 font-semibold text-(--p-on-accent)">
                <WhatsAppIcon className="size-5" /> {primaryCta[p.kind]}
              </a>
              <a href="#visit" className="inline-flex min-h-12 items-center rounded-full border border-white/60 px-6 font-semibold">
                Find us
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20" aria-labelledby="p-list">
          <h2 id="p-list" className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{sectionTitle[p.kind]}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.highlights.map((h) => (
              <li key={h.name} className="flex items-start justify-between gap-4 rounded-2xl border border-current/10 bg-white/50 p-5">
                <span>
                  <span className="block text-lg font-semibold">{h.name}</span>
                  {h.text ? <span className="mt-0.5 block text-sm opacity-70">{h.text}</span> : null}
                </span>
                {h.price ? <span className="shrink-0 font-display text-lg font-semibold text-(--p-accent)">{h.price}</span> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:pb-20 md:grid-cols-2" aria-labelledby="p-about">
          <div>
            <h2 id="p-about" className="font-display text-4xl font-semibold tracking-tight">About us</h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">{p.about}</p>
          </div>
          <div id="visit" className="scroll-mt-16">
            <h2 className="font-display text-4xl font-semibold tracking-tight">Visit us</h2>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex gap-2">
                <MapPin className="mt-1 size-5 shrink-0 text-(--p-accent)" aria-hidden /> {p.area}, {p.city}
              </li>
              {p.hours ? (
                <li className="flex gap-2">
                  <Clock className="mt-1 size-5 shrink-0 text-(--p-accent)" aria-hidden /> {p.hours}
                </li>
              ) : null}
            </ul>
            <iframe
              title={`Map of ${p.area}, ${p.city}`}
              src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 h-64 w-full rounded-2xl border-0"
            />
          </div>
        </section>

        {/* The pitch, in NirmalBuilds' own style */}
        <section id="pitch" className="scroll-mt-12 bg-[#0b0b0f] px-4 py-16 text-white sm:py-20" aria-labelledby="p-pitch">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-wide text-[#c6f432] uppercase">
              {p.example ? "Example" : `Made for ${p.business}`}
            </p>
            <h2 id="p-pitch" className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              {greeting} this could be your website.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">{p.note}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Your real photos, menu or services and prices",
                "Orders and enquiries straight to your WhatsApp",
                "Shows up on Google and Google Maps",
                "Your own domain, in your name",
                `Live in ${packages[0].timeline}`,
                "You talk to me directly, in person if you like",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-white/85">
                  <Check className="mt-0.5 size-5 shrink-0 text-[#c6f432]" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-white/70">
              Websites like this start at <span className="font-semibold text-white">{inr(packages[0].from)}</span>. Fixed price, 50% to
              start and 50% when you&apos;re happy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink(replyText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0f7a3f] px-6 font-semibold"
              >
                <WhatsAppIcon className="size-5" /> Reply to Nirmal on WhatsApp
              </a>
              {demo ? (
                <Link {...demoLinkProps(demo)} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-6 font-semibold">
                  See a full demo <ArrowRight className="size-4" aria-hidden />
                </Link>
              ) : null}
            </div>
            <p className="mt-10 text-sm text-white/50">
              {site.ownerName} · {site.brandName} · {site.city} ·{" "}
              <Link href="/" className="underline underline-offset-2">
                {site.siteUrl.replace(/^https?:\/\//, "")}
              </Link>
              <br />
              This sample uses only public information and is not a live website. Photos are illustrative.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * The page reads its slug inside <Suspense>, so client navigations can show the shell instantly
 * (Next.js "instant navigation" validation). Every slug is still prerendered by generateStaticParams.
 */
export default function ProspectPage({ params }: PageProps<"/for/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0b0f]" aria-busy="true" />}>
      <ProspectPageBody params={params} />
    </Suspense>
  );
}
