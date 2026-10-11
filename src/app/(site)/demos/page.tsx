import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoCard } from "@/components/site/Cards";
import { DemoFilter } from "@/components/site/DemoFilter";
import { demos } from "@/data/demos";

export const metadata: Metadata = {
  title: "Live website demos",
  description: "Thirteen working website demos for restaurants, clinics, salons, real estate, fashion, furniture, product brands, portfolios and more.",
};

export default function DemosPage() {
  return (
    <div className="container-x py-12 sm:py-20">
      <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">Live website demos</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Every demo is a working concept site for a fictional business, each with its own brand, layout and features.
        Signature demos show off video and 3D; Essential demos show how fast and focused a site can be.
      </p>
      <Suspense
        fallback={
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {demos.map((d) => (
              <DemoCard key={d.slug} demo={d} />
            ))}
          </div>
        }
      >
        <DemoFilter />
      </Suspense>
    </div>
  );
}
