"use client";

import { ArrowRight, Info, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { waLink, waMessages } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * The honest result shown after a demo form validates: nothing is sent, and we show what the
 * business would receive on their live site, plus the two real next steps.
 */
export function DemoResult({
  brand,
  industryName,
  demoSlug,
  industrySlug,
  preview,
  onReset,
  className = "",
  channel = "WhatsApp or email",
}: {
  brand: string;
  industryName: string;
  demoSlug: string;
  industrySlug: string;
  preview: string;
  onReset: () => void;
  className?: string;
  channel?: string;
}) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border p-5 sm:p-6 ${className}`}
    >
      <p className="flex items-start gap-2 font-semibold">
        <Info className="mt-0.5 size-5 shrink-0" aria-hidden />
        This is a demo, so nothing was sent.
      </p>
      <p className="mt-2 text-sm opacity-80">
        On your real website, this enquiry would arrive on your {channel} looking like this:
      </p>
      <pre className="mt-3 max-h-64 overflow-auto rounded-xl bg-black/[0.06] p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {preview}
      </pre>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/contact?industry=${industrySlug}&demo=${demoSlug}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0c0a09] px-5 text-sm font-semibold text-white"
        >
          Get a Website Like This <ArrowRight className="size-4" aria-hidden />
        </Link>
        <a
          href={waLink(waMessages.demo(brand, industryName))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0f7a3f] px-5 text-sm font-semibold text-white"
        >
          <WhatsAppIcon className="size-4" /> Chat on WhatsApp
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium underline-offset-4 hover:underline"
        >
          <RotateCcw className="size-4" aria-hidden /> Try the form again
        </button>
      </div>
    </motion.div>
  );
}

/** Formats a demo enquiry as the message the business owner would receive. */
export function formatEnquiry(title: string, fields: Record<string, string | number | undefined>) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${v}`);
  return `${title}\n${"-".repeat(Math.min(title.length, 40))}\n${lines.join("\n")}`;
}
