import Link from "next/link";
import { industries } from "@/data/industries";
import { site } from "@/data/site";
import { waLink, waMessages } from "@/lib/whatsapp";
import { CurrencySwitcher } from "./CurrencySwitcher";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-night text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold">{site.brandName}</p>
          <p className="mt-1 text-sm text-white/55">{site.descriptor}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
          <div className="mt-6">
            <CurrencySwitcher className="text-white/70" />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Industries</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="hover:text-white hover:underline">
                  {i.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Pages</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {[
              ["/demos", "Live demos"],
              ["/whats-possible", "What's possible"],
              ["/pricing", "Pricing"],
              ["/#process", "How I work"],
              ["/contact", "Contact"],
              ["/privacy", "Privacy"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
            <li>Based in {site.basedIn} · working with clients worldwide</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>All demo websites are concept designs for fictional businesses.</p>
          <p>© 2026 {site.brandName}</p>
        </div>
      </div>
    </footer>
  );
}
