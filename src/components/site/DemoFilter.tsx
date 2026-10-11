"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { demos } from "@/data/demos";
import { industries } from "@/data/industries";
import { DemoCard } from "./Cards";

export function DemoFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = params.get("industry") ?? "all";
  const list = active === "all" ? demos : demos.filter((d) => d.industry === active);

  const choose = (slug: string) => {
    const q = slug === "all" ? "" : `?industry=${slug}`;
    router.replace(`${pathname}${q}`, { scroll: false });
  };

  return (
    <>
      <div role="group" aria-label="Filter demos by industry" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ slug: "all", short: "All" }, ...industries].map((i) => (
          <button
            key={i.slug}
            type="button"
            aria-pressed={active === i.slug}
            onClick={() => choose(i.slug)}
            className={`min-h-10 shrink-0 rounded-full border px-4 text-sm transition ${
              active === i.slug ? "border-ink bg-ink text-white" : "border-muted bg-white text-ink-2 hover:border-ink/30"
            }`}
          >
            {i.short}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} demo{list.length === 1 ? "" : "s"}
      </p>
      <motion.div layout className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((d) => (
            <motion.div
              key={d.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <DemoCard demo={d} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
