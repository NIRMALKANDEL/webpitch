"use client";

import { ChevronDown, ChevronLeft, ChevronRight, Home, Layers, LogOut, Maximize2, Minimize2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { demoBySlug, demoLinkProps, demos } from "@/data/demos";
import { industries } from "@/data/industries";
import { waLink, waMessages } from "@/lib/whatsapp";
import { useClientValue } from "./useClientValue";
import { WhatsAppIcon } from "./WhatsAppIcon";

const KEY = "demobar-collapsed";

/**
 * Floating control bar on every demo: back to the industry, switch demos, request a similar site,
 * WhatsApp. Top-centre on desktop, bottom on mobile. Collapses to a small tab.
 */
export function DemoBar({ slug }: { slug: string }) {
  const demo = demoBySlug(slug)!;
  const industry = industries.find((i) => i.slug === demo.industry)!;
  const stored = useClientValue(() => {
    try {
      return sessionStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });
  const [override, setCollapsed] = useState<boolean | null>(null);
  const collapsed = override ?? stored ?? false;
  const [menu, setMenu] = useState(false);
  const autoDone = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-minimise once, a few seconds after the visitor starts scrolling, so the demo can breathe.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (autoDone.current || window.scrollY < 400) return;
      autoDone.current = true;
      window.removeEventListener("scroll", onScroll);
      timer = setTimeout(() => setCollapsed(true), 5000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
    document.documentElement.style.setProperty("--demobar-h", collapsed ? "0px" : "64px");
  }, [collapsed]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [menu]);

  // In-page links (#menu, #gallery…) must not add browser-history steps, otherwise visitors have to press
  // Back once per click to leave the demo. Scroll to the section and replace the URL hash instead.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!a || !href || !href.startsWith("#")) return;
      e.preventDefault();
      const el = href.length > 1 ? document.getElementById(decodeURIComponent(href.slice(1))) : null;
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      else window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      history.replaceState(history.state, "", href.length > 1 ? href : window.location.pathname);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const contactHref = `/contact?industry=${industry.slug}&demo=${demo.slug}`;
  const idx = demos.findIndex((d) => d.slug === slug);
  const prev = demos[(idx - 1 + demos.length) % demos.length];
  const next = demos[(idx + 1) % demos.length];
  const pill = "flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-white/85 hover:bg-white/10";

  return (
    <>
    <nav
      aria-label="Demo navigation"
      className="pointer-events-none fixed inset-x-0 bottom-3 z-90 flex justify-center px-3 font-sans text-white pb-[env(safe-area-inset-bottom)]"
      style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {collapsed ? (
          <motion.div key="tab" className="pointer-events-auto ml-auto flex gap-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
          <Link
            href="/demos"
            className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-neutral-950/80 px-4 text-xs font-semibold shadow-lg backdrop-blur-md"
          >
            <LogOut className="size-4 rotate-180" aria-hidden /> Exit demo
          </Link>
          <motion.button
            key="tab-btn"
            type="button"
            onClick={() => setCollapsed(false)}
            className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-neutral-950/80 px-4 text-xs font-semibold shadow-lg backdrop-blur-md"
            aria-label="Show demo controls"
          >
            <Maximize2 className="size-4" aria-hidden />
            Demo controls
          </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="bar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto relative flex max-w-full items-center gap-1 rounded-full border border-white/15 bg-neutral-950/80 p-1.5 shadow-2xl backdrop-blur-md"
          >
            <span className="hidden rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/80 lg:inline">
              Demo concept
            </span>
            <Link href="/demos" className={`${pill} bg-white/10 font-semibold`} aria-label="Exit demo and see all demos">
              <LogOut className="size-4 rotate-180" aria-hidden />
              <span className="text-xs sm:hidden">Exit</span>
              <span className="hidden sm:inline">Exit demo</span>
            </Link>
            <Link {...demoLinkProps(prev)} className="hidden size-11 shrink-0 place-items-center rounded-full text-white/85 hover:bg-white/10 sm:grid" aria-label={`Previous demo: ${prev.brand}`} title={prev.brand}>
              <ChevronLeft className="size-4" />
            </Link>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                aria-haspopup="true"
                aria-label="Switch demo"
                className="flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-white/85 hover:bg-white/10"
              >
                <Layers className="size-4" aria-hidden />
                <span className="hidden sm:inline">Other demos</span>
                <ChevronDown className={`size-4 transition ${menu ? "rotate-180" : ""}`} aria-hidden />
              </button>
              <AnimatePresence>
                {menu ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute bottom-14 left-1/2 w-[min(88vw,320px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between px-2 pt-1 pb-2">
                      <p className="text-xs text-white/60">Live demos</p>
                      <button
                        type="button"
                        onClick={() => setMenu(false)}
                        className="grid size-8 place-items-center rounded-full hover:bg-white/10"
                        aria-label="Close demo list"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <ul className="max-h-[50vh] overflow-auto">
                      {demos.map((d) => {
                        const ind = industries.find((i) => i.slug === d.industry)!;
                        const current = d.slug === slug;
                        return (
                          <li key={d.slug}>
                            <Link
                              {...demoLinkProps(d)}
                              aria-current={current ? "page" : undefined}
                              className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-white/10 ${current ? "bg-white/10" : ""}`}
                              onClick={() => setMenu(false)}
                            >
                              <span>
                                <span className="block font-medium">{d.brand}</span>
                                <span className="block text-xs text-white/55">
                                  {ind.short} · {d.city}
                                </span>
                              </span>
                              {current ? <span className="text-[11px] text-white/60">Viewing</span> : null}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-2 grid grid-cols-2 gap-1 border-t border-white/10 pt-2 text-xs">
                      <Link href="/" className="flex min-h-10 items-center gap-1.5 rounded-xl px-3 hover:bg-white/10" onClick={() => setMenu(false)}>
                        <Home className="size-3.5" aria-hidden /> Main website
                      </Link>
                      <Link href={`/industries/${industry.slug}`} className="flex min-h-10 items-center rounded-xl px-3 hover:bg-white/10" onClick={() => setMenu(false)}>
                        More {industry.short.toLowerCase()} ideas
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <Link {...demoLinkProps(next)} className="hidden size-11 shrink-0 place-items-center rounded-full text-white/85 hover:bg-white/10 sm:grid" aria-label={`Next demo: ${next.brand}`} title={next.brand}>
              <ChevronRight className="size-4" />
            </Link>
            <Link
              href={contactHref}
              className="flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold whitespace-nowrap text-neutral-950 hover:bg-white/90"
            >
              <span className="sm:hidden">Get one like this</span>
              <span className="hidden sm:inline">Get a Website Like This</span>
            </Link>
            <a
              href={waLink(waMessages.demo(demo.brand, industry.short))}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-[#0f7a3f] hover:bg-[#0c6835]"
              aria-label="Chat about this demo on WhatsApp"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="grid size-11 shrink-0 place-items-center rounded-full text-white/70 hover:bg-white/10"
              aria-label="Minimise demo controls"
            >
              <Minimize2 className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}
