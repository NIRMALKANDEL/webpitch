import { MessagesSquare } from "lucide-react";
import { testimonials } from "@/data/work";
import { SectionHeading } from "./Cards";

/**
 * Real client testimonials from src/data/work.ts.
 * Renders nothing until the first one is added, so the site never shows an empty or fake section.
 */
export function Testimonials({ className = "" }: { className?: string }) {
  if (testimonials.length === 0) return null;
  return (
    <section className={className} aria-labelledby="testimonials-title">
      <SectionHeading id="testimonials-title" title="What clients say" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name + t.quote.slice(0, 20)} className="flex flex-col rounded-[22px] bg-surface p-6 ring-1 ring-ink/10">
            <MessagesSquare className="size-6 text-accent" aria-hidden />
            <blockquote className="mt-3 flex-1 leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <p className="mt-5 text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="text-ink-3">
                {" "}
                · {t.role}, {t.city}
              </span>
            </p>
            {t.sourceUrl ? (
              <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-xs text-ink-3 underline underline-offset-2">
                See the original
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
