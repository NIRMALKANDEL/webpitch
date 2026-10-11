import { ArrowRight, Gauge, Globe2, Inbox, KeyRound, MapPin, MessageCircle, Smartphone } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { AboutMe } from "@/components/site/AboutMe";
import { DemoCard, IndustryCard, SectionHeading } from "@/components/site/Cards";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { FAQ } from "@/components/site/FAQ";
import { FeatureTeaser } from "@/components/site/FeatureTeaser";
import { Hero } from "@/components/site/Hero";
import { PricingCards } from "@/components/site/PricingCards";
import { Process } from "@/components/site/Process";
import { CurrencySwitcher } from "@/components/site/CurrencySwitcher";
import { demoBySlug } from "@/data/demos";
import { homeFaq } from "@/data/faq";
import { industries } from "@/data/industries";
import { site } from "@/data/site";
import { waLink, waMessages } from "@/lib/whatsapp";

const deliverables = [
  { icon: Smartphone, title: "Mobile-first design", text: "Most of your customers will see your site on a phone, so that's where I start." },
  { icon: Gauge, title: "Fast loading", text: "Optimised images and lean code, so visitors don't leave before it loads." },
  { icon: MessageCircle, title: "WhatsApp and call buttons", text: "One tap from interested to talking to you." },
  { icon: Inbox, title: "Forms that reach you", text: "Enquiry, booking and quote forms delivered to your inbox." },
  { icon: MapPin, title: "Google Maps and basic SEO", text: "So people nearby can find you, and Google understands your site." },
  { icon: KeyRound, title: "You own everything", text: "Domain, hosting and content in your name. No lock-in." },
];

const featured = ["restaurant", "real-estate", "salon", "furniture"].map((s) => demoBySlug(s)!);

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-x py-16 sm:py-24" aria-labelledby="industries-title">
        <SectionHeading
          id="industries-title"
          title="Built for your kind of business"
          intro="Every industry has its own live demo, designed around what those customers actually look for."
          action={
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
              All industries <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {industries.map((i) => (
            <IndustryCard key={i.slug} industry={i} compact />
          ))}
        </div>
      </section>

      <section className="border-y border-muted bg-alt py-16 sm:py-24" aria-labelledby="featured-title">
        <div className="container-x">
          <SectionHeading
            id="featured-title"
            title="Open a demo. Click around. It's a real website."
            intro="These aren't screenshots. Each demo is a working site with its own brand, menus, forms and interactions."
            action={
              <Link href="/demos" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
                See all 13 demos <ArrowRight className="size-4" aria-hidden />
              </Link>
            }
          />
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
            {featured.map((d) => (
              <DemoCard key={d.slug} demo={d} large />
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24" aria-labelledby="possible-title">
        <SectionHeading
          id="possible-title"
          title="Your website can do more than you think"
          intro="Video heroes, 3D product viewers, ordering carts and booking flows. Every feature here is live in one of the demos."
          action={
            <Link href="/whats-possible" className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
              Explore everything that&apos;s possible <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <FeatureTeaser />
      </section>

      <section className="container-x pb-16 sm:pb-24">
        <AboutMe />
      </section>

      <section className="container-x pb-16 sm:pb-24" aria-labelledby="deliver-title">
        <SectionHeading id="deliver-title" title="What every website includes" />
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-muted bg-alt py-16 sm:py-24" aria-labelledby="pricing-title">
        <div className="container-x">
          <SectionHeading
            id="pricing-title"
            title="Simple, upfront pricing"
            intro="Starting prices in your currency. You get a fixed quote after a free 20-minute call."
            action={<CurrencySwitcher />}
          />
          <PricingCards />
          <p className="mt-8 text-sm text-ink-2">
            Need a redesign, ongoing care or a 3D product viewer?{" "}
            <Link href="/pricing" className="font-semibold text-ink underline underline-offset-4">
              See full pricing, add-ons and care plans
            </Link>
          </p>
        </div>
      </section>

      <section id="process" className="container-x scroll-mt-20 py-16 sm:py-24" aria-labelledby="process-title">
        <SectionHeading
          id="process-title"
          title="How I work"
          intro="From first message to launch, usually in one to three weeks. Wherever you are, I keep overlap hours with your time zone."
        />
        <Process />
        <p className="mt-6 flex items-center gap-2 text-sm text-ink-2">
          <Globe2 className="size-4 text-accent" aria-hidden /> {site.timezoneNote}
        </p>
      </section>

      <section className="container-x pb-16 sm:pb-24" aria-labelledby="faq-title">
        <SectionHeading id="faq-title" title="Questions people ask" />
        <FAQ items={homeFaq} />
      </section>

      <section className="container-x" aria-labelledby="contact-title">
        <div className="grid gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:p-14">
          <div>
            <h2 id="contact-title" className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
              Tell me about your business.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/75">
              Send a few lines and I&apos;ll reply with ideas and a price. Prefer to talk? Message me on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold"
              >
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 font-semibold">
                Email me
              </a>
            </div>
          </div>
          <div className="rounded-[14px] bg-paper p-5 text-ink sm:p-7">
            <EnquiryForm variant="short" />
          </div>
        </div>
      </section>
    </>
  );
}
