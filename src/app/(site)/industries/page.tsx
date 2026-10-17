import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { IndustryCard } from "@/components/site/Cards";
import { industries } from "@/data/industries";
import { pageMeta } from "@/lib/seo";
import { waLink, waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = pageMeta({
  title: "Website design by industry",
  description: "Choose your industry and open a live website demo built for businesses like yours.",
  path: "/industries",
  image: "industries",
});

export default function IndustriesPage() {
  return (
    <div className="container-x py-12 sm:py-20">
      <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">Choose your industry</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Each industry has a live demo website designed around what its customers look for. Open one, click around,
        then ask for one made for your business.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
        {industries.map((i) => (
          <IndustryCard key={i.slug} industry={i} />
        ))}
      </div>
      <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[20px] border border-muted bg-surface p-8 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-semibold">Don&apos;t see your industry?</h2>
          <p className="mt-1 text-ink-2">I build for all kinds of businesses. Tell me what you do.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper">
            Discuss Your Project
          </Link>
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-white"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
