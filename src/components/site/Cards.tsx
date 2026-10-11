import type { Demo } from "@/data/demos";
import { demosForIndustry } from "@/data/demos";
import type { Industry } from "@/data/industries";
import { ShowcaseCard } from "./ShowcaseCard";

/** Industry card: opens that industry's live demo directly (no in-between page). */
export function IndustryCard({ industry }: { industry: Industry; compact?: boolean }) {
  const demo = demosForIndustry(industry.slug)[0];
  return <ShowcaseCard demo={demo} label={industry.short} />;
}

/** A browser window frame used to present demo previews. */
export function BrowserFrame({
  children,
  url,
  className = "",
}: {
  children: React.ReactNode;
  url: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-[0_24px_60px_-28px_rgba(12,10,9,0.35)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-ink/5 bg-alt px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto truncate rounded-md bg-surface px-3 py-0.5 text-[11px] text-ink-3">{url}</span>
      </div>
      {children}
    </div>
  );
}

export function DemoCard({ demo }: { demo: Demo; large?: boolean }) {
  return <ShowcaseCard demo={demo} />;
}

export function SectionHeading({
  title,
  intro,
  action,
  id,
}: {
  title: string;
  intro?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-12 sm:gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="font-display text-[28px] leading-[1.08] font-semibold tracking-tight text-balance sm:text-[40px]">
          {title}
        </h2>
        {intro ? <p className="mt-2 text-[15px] leading-relaxed text-ink-2 sm:mt-3 sm:text-lg">{intro}</p> : null}
      </div>
      {action}
    </div>
  );
}
