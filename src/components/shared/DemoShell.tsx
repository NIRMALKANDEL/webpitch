import Link from "next/link";
import { demoBySlug } from "@/data/demos";
import { site } from "@/data/site";
import { DemoBar } from "./DemoBar";

/**
 * Wraps every demo site: applies its fonts and colour tokens, adds the floating DemoBar and the
 * mandatory "concept website" disclaimer. The demo's own design lives entirely in `children`.
 */
export function DemoShell({
  slug,
  fontClassName,
  style,
  className = "",
  children,
}: {
  slug: string;
  fontClassName: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${fontClassName} min-h-screen font-db ${className}`} style={style}>
      {children}
      <DemoBar slug={slug} />
    </div>
  );
}

export function DemoDisclaimer({ slug, className = "" }: { slug: string; className?: string }) {
  const demo = demoBySlug(slug)!;
  return (
    <p className={`text-xs leading-relaxed ${className}`}>
      Concept website by{" "}
      <Link href="/" className="underline underline-offset-2">
        {site.brandName}
      </Link>{" "}
      for a fictional business. {demo.brand} does not exist; names, prices, reviews and photos are illustrative.
      Photos from Unsplash, video from Pexels.
    </p>
  );
}

export function SampleTag({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block rounded-full border border-current/25 px-2 py-0.5 text-[10px] font-medium tracking-wide opacity-70 ${className}`}>
      Sample review
    </span>
  );
}

export const demoMetadata = (slug: string) => {
  const demo = demoBySlug(slug)!;
  return {
    title: `${demo.brand} — demo website`,
    description: `${demo.summary} A concept website by ${site.brandName}.`,
    // Fictional businesses must never appear in search results.
    robots: { index: false, follow: false },
  };
};
