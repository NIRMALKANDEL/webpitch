import { Clock, Mail } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { ContactForm } from "@/components/site/ContactForm";
import { site } from "@/data/site";
import { waLink, waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Discuss your project",
  description: "Tell me about your business and the website you need. I reply within 12 hours.",
};

function FormSkeleton() {
  return (
    <div className="grid gap-5" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-xl bg-ink/5" />
      ))}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="container-x py-12 sm:py-20">
      <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">Discuss your project</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Tell me about your business and the website you have in mind. I&apos;ll reply with ideas, a timeline and a fixed price.
      </p>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div className="rounded-[20px] border border-muted bg-surface p-5 sm:p-8">
          <Suspense fallback={<FormSkeleton />}>
            <ContactForm />
          </Suspense>
        </div>
        <aside className="space-y-6" aria-label="Other ways to reach me">
          <div className="rounded-[20px] bg-night ring-1 ring-white/10 p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Rather talk?</h2>
            <p className="mt-2 text-white/70">WhatsApp is the fastest way to reach me.</p>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold"
            >
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 font-semibold">
              <Mail className="size-4" aria-hidden /> {site.email}
            </a>
            <p className="mt-5 flex items-start gap-2 text-sm text-white/70">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden /> {site.timezoneNote}
            </p>
          </div>
          <div className="rounded-[20px] border border-muted bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {[
                ["I read your enquiry", "and look at your business and any current site."],
                ["We have a free 20-minute call", "on WhatsApp, Meet or Zoom, at a time that suits you."],
                ["You get a fixed quote and date", "with no obligation to go ahead."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">{i + 1}</span>
                  <p className="text-sm leading-relaxed text-ink-2"><strong className="text-ink">{t}</strong> {d}</p>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
