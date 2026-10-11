import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { features } from "@/data/features";
import { FeatureMedia } from "./FeatureMedia";

const picks = ["3d-configurator", "video-hero", "lookbook", "booking", "wa-cart", "before-after"];

export function FeatureTeaser() {
  const items = picks.map((id) => features.find((f) => f.id === id)!);
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li key={f.id}>
          <Link
            href={`/demos/${f.demo}${f.anchor ? `#${f.anchor}` : ""}`}
            className="group block overflow-hidden rounded-[14px] border border-muted bg-surface transition hover:border-ink/20"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
              <FeatureMedia feature={f} alt={f.title} />
            </div>
            <div className="flex items-start justify-between gap-3 p-5">
              <div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{f.benefit}</p>
              </div>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-ink-3 transition group-hover:text-ink" aria-hidden />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
