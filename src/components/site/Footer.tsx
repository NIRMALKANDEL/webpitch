import Link from "next/link";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/work";
import { site, socialLinks } from "@/data/site";
import { waLink, waMessages } from "@/lib/whatsapp";
import { CookiePreferencesLink } from "./CookieConsent";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 bg-night text-white sm:mt-20">
      <div className="container-x grid gap-8 py-7 sm:grid-cols-2 sm:py-10 lg:grid-cols-[1.3fr_1.4fr_0.8fr_1fr]">
        <div className="hidden sm:block">
          <p className="font-display text-xl font-bold">{site.brandName}</p>
          <p className="mt-1 text-sm text-white/55">{site.descriptor}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold">Industries</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-white/70">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="hover:text-white hover:underline">
                  {i.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold">Pages</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/70">
            {[
              ["/demos", "Live demos"],
              ["/web-design-indore", "Web design in Indore"],
              ["/pricing", "Pricing"],
              ["/about", "About me"],
              ...(caseStudies.length ? [["/work", "Client work"]] : []),
              ["/blog", "Blog"],
              ["/whats-possible", "What's possible"],
              ["/contact", "Contact"],
              ["/privacy", "Privacy"],
              ["/terms", "Terms & Conditions"],
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
          <p className="text-sm font-semibold">
            <span className="sm:hidden">{site.brandName} · </span>Contact
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/70">
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
            <li>Based in {site.basedIn} · working with businesses across India</li>
            {socialLinks.length ? (
              <li className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                {socialLinks.map((s) => (
                  <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer me" className="capitalize hover:text-white hover:underline">
                    {s.key === "linkedin" ? "LinkedIn" : s.key === "github" ? "GitHub" : s.key === "googleBusiness" ? "Google reviews" : s.key}
                  </a>
                ))}
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-1 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Live demos are concept designs for fictional businesses.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <CookiePreferencesLink className="hover:text-white hover:underline" />
            <span>© 2026 {site.brandName} · {site.ownerName}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
