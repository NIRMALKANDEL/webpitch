"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { industries } from "@/data/industries";
import { site } from "@/data/site";
import { waLink, waMessages } from "@/lib/whatsapp";

const links = [
  { href: "/demos", label: "Demos" },
  { href: "/industries", label: "Industries" },
  { href: "/whats-possible", label: "What's possible" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#process", label: "How I work" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && sheet.current) {
        const f = sheet.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const toggleEl = toggle.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleEl?.focus();
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-muted bg-paper/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.brandName}, home`}>
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-display text-[13px] font-extrabold tracking-tight text-white">
            NK
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold tracking-tight">{site.brandName}</span>
            <span className="hidden text-[11px] text-ink-2 sm:block">{site.descriptor}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm transition hover:bg-ink/5 ${
                isActive(l.href) ? "font-semibold text-ink" : "text-ink-2"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-10 place-items-center rounded-full text-whatsapp transition hover:bg-whatsapp/10"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <Link
            href="/contact"
            className="hidden min-h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink/85 sm:inline-flex"
          >
            Discuss Your Project <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="sheet"
            id="mobile-menu"
            ref={sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-x flex h-16 shrink-0 items-center justify-between">
              <span className="font-display text-[15px] font-bold">{site.brandName}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center rounded-full hover:bg-ink/5"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex flex-col pb-6">
              {[...links, { href: "/contact", label: "Contact" }].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-muted py-4 font-display text-2xl font-semibold"
                >
                  {l.label}
                </Link>
              ))}
              <p className="mt-8 mb-3 text-sm text-ink-3">Jump to an industry</p>
              <div className="flex flex-wrap gap-2">
                {industries.map((i) => (
                  <Link
                    key={i.slug}
                    href={`/industries/${i.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-muted px-3.5 py-2 text-sm"
                  >
                    {i.short}
                  </Link>
                ))}
              </div>
              <div className="mt-8 grid gap-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-full bg-ink font-semibold text-white"
                >
                  Discuss Your Project
                </Link>
                <a
                  href={waLink(waMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-white"
                >
                  <WhatsAppIcon className="size-5" /> Chat on WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
