import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description: "What the enquiry form collects, where it goes and how to ask for it to be deleted.",
  path: "/privacy",
  image: "default",
});

export default function PrivacyPage() {
  return (
    <article className="container-x max-w-3xl py-12 sm:py-20">
      <h1 className="font-display text-5xl leading-[1] font-semibold tracking-tight">Privacy</h1>
      <p className="mt-3 text-sm text-ink-3">Last updated 17 October 2026</p>
      <div className="mt-10 space-y-8 text-lg leading-relaxed text-ink-2 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink">
        <section>
          <h2>What this site collects</h2>
          <p>
            Only what you type into the enquiry form: your name, email, phone or WhatsApp number (optional), country, business
            details, the website type, budget and timeline you choose, and any project details you write. The form also records which
            demo or package you came from, the currency you were shown, and the time it was sent.
          </p>
        </section>
        <section>
          <h2>Where it goes</h2>
          <p>
            The form is delivered by Web3Forms, a form-to-email service, straight to my inbox at {site.email}. Web3Forms keeps a copy of
            submissions for about 30 days. I use your details only to reply to your enquiry and discuss your project. I don&apos;t sell or
            share them, and I don&apos;t add you to mailing lists.
          </p>
        </section>
        <section>
          <h2>Cookies</h2>
          <p>
            The site sets one functional cookie, <code className="rounded bg-ink/5 px-1.5 py-0.5 text-base">cur</code>, to remember your likely
            currency, which pre-fills your country on the enquiry form. Your cookie choice is saved in your browser so the banner doesn&apos;t
            come back. If you accept analytics, Google Analytics sets its own cookies (named <code className="rounded bg-ink/5 px-1.5 py-0.5 text-base">_ga</code>)
            to count visits and see which pages are useful; nothing is used for advertising, and analytics stays off unless you opt in.
            You can change your choice any time with &ldquo;Cookie preferences&rdquo; at the bottom of every page. The demo websites
            remember whether you collapsed the demo controls for the current browser tab only.
          </p>
        </section>
        <section>
          <h2>WhatsApp</h2>
          <p>
            WhatsApp buttons open WhatsApp with a message already written. Nothing is sent until you press send in WhatsApp, and those
            conversations are covered by WhatsApp&apos;s own privacy policy.
          </p>
        </section>
        <section>
          <h2>Deleting your details</h2>
          <p>
            Email <a className="font-medium text-ink underline underline-offset-2" href={`mailto:${site.email}`}>{site.email}</a> and I&apos;ll
            delete your enquiry and any related messages.
          </p>
        </section>
      </div>
    </article>
  );
}
