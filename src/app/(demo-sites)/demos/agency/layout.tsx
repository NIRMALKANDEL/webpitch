import type { Metadata } from "next";
import { Anybody, Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";
import { site } from "@/data/site";
import { AgencyNav, BookCallButton, BookCallDialog, Cursor, FloatingBook, ScrollProgress, ThemeBoot } from "./_parts/client";
import { BASE, nav, studio } from "./_parts/data";
import { disp, wrap } from "./_parts/ui";

const display = Anybody({ subsets: ["latin"], axes: ["wdth"], variable: "--d-display", display: "swap" });
const body = Schibsted_Grotesk({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("agency");

/* Theme tokens and the demo's CSS-only motion. Kept here so nothing leaks into the main site's stylesheet. */
const css = `
#hw{--bg:#060607;--bg2:#0E0E11;--card:#141417;--fg:#F5F1F3;--muted:#A6A0AA;--line:rgb(245 241 243/.12);
--pink:#FF2E93;--lime:#D8FF3C;--violet:#9B7BFF;--mist:#D9D5DD;--ink-pink:#FF5AA9;--hi:#D8FF3C;--focus:#D8FF3C;color-scheme:dark}
#hw[data-hw=light]{--bg:#F6F5F8;--bg2:#ECEAF0;--card:#FFFFFF;--fg:#0B0B0D;--muted:#5C5663;--line:rgb(11 11 13/.12);
--lime:#CBF23A;--mist:#D3CED9;--ink-pink:#C8005F;--hi:#5B2BD9;--focus:#C8005F;color-scheme:light}
#hw ::selection{background:var(--pink);color:#0B0B0D}
html:has(#hw dialog[open]){overflow:hidden}
@keyframes hw-rise{from{transform:translateY(22px);opacity:0}to{transform:none;opacity:1}}
@keyframes hw-line{from{transform:translateY(108%)}to{transform:none}}
@keyframes hw-wipe{from{transform:scaleY(1)}to{transform:scaleY(0)}}
@keyframes hw-aurora{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes hw-sheet{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}
.hw-rise{animation:hw-rise .8s cubic-bezier(.22,1,.36,1) .1s both}
.hw-rise-2{animation:hw-rise .8s cubic-bezier(.22,1,.36,1) .22s both}
.hw-rise-3{animation:hw-rise .8s cubic-bezier(.22,1,.36,1) .34s both}
.hw-lines>span{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.hw-lines>span>span{display:block;animation:hw-line .9s cubic-bezier(.22,1,.36,1) both;animation-delay:calc(var(--i)*90ms + 120ms)}
.hw-wipe{position:fixed;inset:0;z-index:85;pointer-events:none;display:grid}
.hw-wipe>i{grid-area:1/1;transform-origin:top;animation:hw-wipe .65s cubic-bezier(.76,0,.24,1) both}
.hw-wipe>i:nth-child(1){background:var(--violet);animation-delay:.14s}
.hw-wipe>i:nth-child(2){background:var(--lime);animation-delay:.07s}
.hw-wipe>i:nth-child(3){background:var(--pink)}
.hw-enter{animation:hw-rise .6s cubic-bezier(.22,1,.36,1) .25s both}
.hw-aurora{background:linear-gradient(120deg,var(--pink),#FF6FB3 40%,var(--violet) 80%,var(--pink));background-size:300% 300%;animation:hw-aurora 14s ease-in-out infinite}
.hw-link{background:linear-gradient(currentColor,currentColor) 0 100%/0 2px no-repeat;transition:background-size .3s}
.hw-link:hover{background-size:100% 2px}
.hw-sheet[open]{animation:hw-sheet .35s cubic-bezier(.22,1,.36,1)}
.hw-art{transform-box:fill-box;transform-origin:center;transition:transform .9s cubic-bezier(.22,1,.36,1)}
.group:hover .hw-art-circle{transform:rotate(45deg)}
.group:hover .hw-art-rings{transform:scale(1.12)}
.group:hover .hw-art-arch{transform:translateY(-16px)}
.group:hover .hw-art-stripes{transform:translateX(70px)}
.group:hover .hw-art-wave{transform:translateX(-120px)}
.group:hover .hw-art-blob{transform:scale(1.08) rotate(-6deg)}
.hw-head{transform-box:fill-box;transform-origin:center;transition:transform .5s cubic-bezier(.22,1,.36,1)}
.group:hover .hw-head{transform:translateY(-8px)}
.hw-tile-shape{transition:transform .7s cubic-bezier(.22,1,.36,1)}
.group:hover .hw-tile-shape{transform:rotate(90deg) scale(1.1)}
#hw details>summary{list-style:none}#hw details>summary::-webkit-details-marker{display:none}
#hw details[open] .hw-plus{transform:rotate(45deg)}
@supports (animation-timeline: view()){
  .hw-reveal{animation:hw-rise linear both;animation-timeline:view();animation-range:entry 0% entry 55%}
}
@media (prefers-reduced-motion: reduce){.hw-wipe{display:none}.hw-aurora{animation:none}}
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="agency" fontClassName={`${display.variable} ${body.variable}`} className="bg-[#060607]">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div id="hw" data-hw="dark" suppressHydrationWarning className="min-h-screen bg-(--bg) text-(--fg) antialiased transition-colors duration-500">
        <ThemeBoot />
        <AgencyNav />
        <ScrollProgress />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <footer className="border-t border-(--line) bg-(--bg2) pt-10 pb-28 md:pt-16 md:pb-12">
          <div className={`${wrap} grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10`}>
            <div className="flex items-center justify-between gap-4 md:block">
              <div>
                <p className={`${disp} flex items-center gap-1.5 text-2xl`}>
                  Hotwire<span aria-hidden className="mt-2.5 size-2 rounded-full bg-(--pink)" />
                </p>
                <p className="mt-2 hidden max-w-[34ch] text-(--muted) md:block">Brand, web and motion for challenger brands. A small studio in {studio.city}.</p>
              </div>
              <BookCallButton className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-(--pink) px-5 text-sm font-semibold text-[#0B0B0D] transition hover:bg-(--fg) hover:text-(--bg) md:mt-6">
                Book a call
              </BookCallButton>
            </div>
            {/* Phones get three key links; the full list and studio details appear from tablet width. */}
            <nav aria-label="Footer" className="md:hidden">
              <ul className="flex flex-wrap gap-x-6 gap-y-1">
                {[nav[1], nav[0], nav[5]].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center text-(--fg)/80 hover:text-(--ink-pink)">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer, all pages" className="hidden md:block">
              <ul className="grid grid-cols-2 gap-x-6">
                {nav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center text-(--fg)/80 hover:text-(--ink-pink)">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`${BASE}/enquire`} className="inline-flex min-h-11 items-center text-(--fg)/80 hover:text-(--ink-pink)">
                    Send a brief
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="hidden text-sm text-(--muted) md:block">
              <p>{studio.email}</p>
              <p className="mt-1">{studio.hours}</p>
            </div>
          </div>
          <p className={`${wrap} mt-8 border-t border-(--line) pt-6 text-xs leading-relaxed text-(--muted) md:mt-12`}>
            Concept website by{" "}
            <Link href="/" className="underline underline-offset-2 hover:text-(--fg)">
              {site.brandName}
            </Link>{" "}
            for a fictional studio.<span className="hidden sm:inline"> Hotwire Studio, its clients, team, projects and articles do not exist; contact details are placeholders.</span>
          </p>
        </footer>
        <BookCallDialog />
        <FloatingBook />
        <Cursor />
      </div>
    </DemoShell>
  );
}
