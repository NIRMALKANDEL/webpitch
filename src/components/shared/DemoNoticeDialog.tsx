"use client";

import { ArrowRight, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { demoBySlug } from "@/data/demos";
import { industryBySlug } from "@/data/industries";
import { waLink, waMessages } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Shown instead of dialing a fictional phone number or emailing a fictional address.
 * Explains what the button does on a real site and offers the real next steps.
 */
export function DemoNoticeDialog({
  slug,
  open,
  onClose,
  action,
}: {
  slug: string;
  open: boolean;
  onClose: () => void;
  action: string;
}) {
  const demo = demoBySlug(slug)!;
  const industry = industryBySlug(demo.industry)!;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[95] grid place-items-end bg-black/40 p-3 backdrop-blur-sm sm:place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-notice-title"
            className="w-full max-w-md rounded-3xl bg-white p-6 text-neutral-900 shadow-2xl"
            style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <p id="demo-notice-title" className="flex items-center gap-2 text-lg font-semibold">
                <Info className="size-5" aria-hidden /> This is a demo button
              </p>
              <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full hover:bg-black/5" aria-label="Close">
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-3 text-neutral-600">
              {demo.brand} is a fictional business. On your real website, this button would {action}.
            </p>
            <div className="mt-6 grid gap-2">
              <Link
                href={`/contact?industry=${industry.slug}&demo=${demo.slug}`}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-neutral-950 font-semibold text-white"
              >
                Get a Website Like This <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href={waLink(waMessages.demo(demo.brand, industry.short))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0f7a3f] font-semibold text-white"
              >
                <WhatsAppIcon className="size-4" /> Chat with the developer
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
