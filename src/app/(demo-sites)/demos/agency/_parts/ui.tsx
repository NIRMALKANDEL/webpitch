import Link from "next/link";
import { type Accent, BASE, type CoverArt, type Member, type Project } from "./data";

/*
 * Design tokens live as CSS variables on #hw (see layout.tsx), so every class below works in dark and light mode:
 * --bg page, --bg2 alternate band, --card raised surface, --fg text, --muted secondary text, --line hairlines,
 * --pink (primary), --lime and --violet (secondary) and --mist (neutral) accents, always with near-black text on top; --ink-pink and --hi for
 * accent-coloured text that stays readable on both backgrounds.
 */

/** Page width and gutters used on every Hotwire page. */
export const wrap = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10";

/** Vertical rhythm: one section size, one heading gap, used everywhere. */
export const section = "py-16 md:py-24 lg:py-28";
export const gapAfterHead = "mt-10 md:mt-14";

/** Display type: Anybody, semibold, slightly expanded. */
export const disp = "font-dd font-semibold [font-stretch:106%] tracking-[-0.025em]";

export const h2 = `${disp} text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.02]`;

export const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition duration-200 active:scale-[0.97]";
export const btnPink = `${btn} bg-(--pink) text-[#0B0B0D] hover:bg-(--lime)`;
export const btnLine = `${btn} border border-(--fg)/25 text-(--fg) hover:border-(--fg) hover:bg-(--fg)/5`;
/** For use on the bright gradient band, in both themes. */
export const btnDark = `${btn} bg-[#0B0B0D] text-white hover:bg-[#2a2a2e]`;
export const btnInk = `${btn} bg-(--fg) text-(--bg) hover:bg-(--pink) hover:text-[#0B0B0D]`;

export const accentBg: Record<Accent, string> = {
  pink: "bg-(--pink)",
  lime: "bg-(--lime)",
  violet: "bg-(--violet)",
  mist: "bg-(--mist)",
};

/**
 * The top of every inner page: a path back home, the page's purpose in one line, and an optional panel on the right
 * (`aside`) for quick facts or shortcuts, so the first screen is full without being tall.
 */
export function PageHero({
  title,
  lead,
  crumb,
  accent = "pink",
  aside,
  children,
}: {
  title: string;
  lead: string;
  crumb: string;
  accent?: Accent;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-(--line)">
      <div aria-hidden className={`absolute -top-40 -right-32 -z-10 size-[520px] rounded-full opacity-25 blur-[120px] ${accentBg[accent]}`} />
      <div className={`${wrap} grid gap-10 pt-10 pb-14 md:pt-16 md:pb-20 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16`}>
        <div>
          <nav aria-label="Breadcrumb" className="hw-rise text-sm text-(--muted)">
            <Link href={BASE} className="hover:text-(--fg)">
              Home
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span aria-current="page" className="text-(--fg)">
              {crumb}
            </span>
          </nav>
          <h1 className={`${disp} hw-rise mt-4 max-w-[17ch] text-[clamp(2.5rem,6.2vw,5.25rem)] leading-[0.98]`}>{title}</h1>
          <p className="hw-rise-2 mt-5 max-w-[52ch] text-lg leading-relaxed text-(--muted) md:text-xl">{lead}</p>
          {children}
        </div>
        {aside ? <div className="hw-rise-3">{aside}</div> : null}
      </div>
    </section>
  );
}

/** Quick facts panel for the right side of a PageHero. */
export function FactPanel({ items }: { items: { label: string; value: string; color?: Accent }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-(--line) bg-(--line)">
      {items.map((f) => (
        <div key={f.label} className="bg-(--card) p-5">
          <dt className="flex items-center gap-2 text-sm text-(--muted)">
            {f.color ? <span aria-hidden className={`size-2 rounded-full ${accentBg[f.color]}`} /> : null}
            {f.label}
          </dt>
          <dd className={`${disp} mt-1.5 text-xl leading-tight md:text-2xl`}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Lists that become a swipeable row on phones (with snap points and a peek of the next card) and a grid from `md`.
 * Pass the desktop column classes in `cols`.
 */
export const rail = (cols: string) =>
  `-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 ${cols}`;
export const railItem = "w-[84%] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none";

/** Accessible accordion built on <details>: works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-(--line)">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-(--line)">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 text-[17px] font-semibold md:text-lg">
            {f.q}
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-(--line) transition group-open:rotate-45 group-open:border-(--pink) group-open:bg-(--pink) group-open:text-[#0B0B0D]">
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-[62ch] pb-5 text-(--muted)">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function SectionHead({ id, title, lead, link }: { id?: string; title: string; lead?: string; link?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div>
        <h2 id={id} className={h2}>
          {title}
        </h2>
        {lead ? <p className="mt-2 max-w-[52ch] text-(--muted)">{lead}</p> : null}
      </div>
      {link ? (
        <Link href={link.href} className="hw-link inline-flex min-h-11 items-center font-semibold text-(--ink-pink)">
          {link.label}
        </Link>
      ) : null}
    </div>
  );
}

function Art({ art, fg, bg }: { art: CoverArt; fg: string; bg: string }) {
  switch (art) {
    case "circle":
      return (
        <g>
          <circle cx="250" cy="190" r="150" fill={fg} />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="250" y1="190" x2={250 + 150 * Math.cos((i * Math.PI) / 4)} y2={190 + 150 * Math.sin((i * Math.PI) / 4)} stroke={bg} strokeWidth="9" />
          ))}
          <circle cx="250" cy="190" r="116" fill="none" stroke={bg} strokeWidth="9" />
        </g>
      );
    case "rings":
      return (
        <g fill="none" stroke={fg}>
          {[150, 122, 96, 72, 50].map((r, i) => (
            <circle key={r} cx="230" cy="200" r={r} strokeWidth={i === 0 ? 18 : 3} />
          ))}
          <circle cx="230" cy="200" r="14" fill={fg} />
        </g>
      );
    case "arch":
      return <path d="M120 380 V200 a130 130 0 0 1 260 0 V380 Z" fill="none" stroke={fg} strokeWidth="14" />;
    case "stripes":
      return (
        <g stroke={fg} strokeWidth="22">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={-260 + i * 70} y1="420" x2={-60 + i * 70} y2="0" />
          ))}
        </g>
      );
    case "wave":
      return (
        <g fill="none" stroke={fg} strokeWidth="6">
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M-120 ${110 + i * 34} C -20 ${60 + i * 34}, 60 ${170 + i * 34}, 160 ${110 + i * 34} S 330 ${60 + i * 34}, 420 ${110 + i * 34} S 590 ${60 + i * 34}, 680 ${110 + i * 34}`} />
          ))}
        </g>
      );
    case "blob":
      return (
        <path
          d="M140 120 C 150 50, 350 40, 370 130 C 390 220, 380 250, 360 290 C 345 320, 352 360, 330 372 C 305 386, 300 330, 280 330 C 258 330, 262 392, 232 392 C 205 392, 214 340, 192 336 C 168 332, 170 370, 148 362 C 120 350, 132 300, 124 250 C 116 200, 132 170, 140 120 Z"
          fill={fg}
        />
      );
  }
}

/**
 * Project cover drawn in code: each concept client gets its own mark, so there are no stock photos to licence
 * and covers stay sharp at any size. The mark moves when the surrounding `.group` is hovered (see layout CSS).
 */
export function ProjectCover({ project, className = "", invert = false, hideWord = false }: { project: Project; className?: string; invert?: boolean; hideWord?: boolean }) {
  const { art, word } = project.cover;
  const bg = invert ? project.cover.fg : project.cover.bg;
  const fg = invert ? project.cover.bg : project.cover.fg;
  return (
    <div className={`hw-cover relative isolate overflow-hidden [container-type:inline-size] ${className}`} style={{ background: bg, color: fg }}>
      <svg viewBox="0 0 500 420" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
        <g className={`hw-art hw-art-${art}`}>
          <Art art={art} fg={fg} bg={bg} />
        </g>
      </svg>
      {hideWord ? null : (
        <p className={`${disp} absolute right-[6%] bottom-[6%] left-[6%] text-[clamp(1.5rem,7cqi,3rem)] leading-[0.95]`} aria-hidden>
          {word}
        </p>
      )}
    </div>
  );
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

/** Illustrated placeholder portrait (the team is fictional, so no photos of real people are used). */
export function Avatar({ member, className = "", badge = true }: { member: Member; className?: string; badge?: boolean }) {
  const fill = `var(--${member.hue})`;
  return (
    <span className={`relative block overflow-hidden bg-(--bg2) ${className}`}>
      <svg viewBox="0 0 300 240" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="150" cy="104" r="56" fill={fill} className="hw-head" />
        <path d="M46 240 C 46 172, 92 152, 150 152 C 208 152, 254 172, 254 240 Z" fill={fill} />
      </svg>
      {badge ? (
        <span className={`absolute top-4 left-4 ${disp} rounded-full bg-(--card) px-3 py-1 text-sm`} aria-hidden>
          {initials(member.name)}
        </span>
      ) : null}
    </span>
  );
}

/** Reusable team member card. */
export function TeamCard({ member: m }: { member: Member }) {
  return (
    <article className="group h-full overflow-hidden rounded-[22px] border border-(--line) bg-(--card) transition duration-300 hover:-translate-y-1">
      <Avatar member={m} className="aspect-[5/4]" />
      <div className="p-5">
        <h2 className={`${disp} text-xl`}>{m.name}</h2>
        <p className="text-sm font-medium text-(--ink-pink)">{m.role}</p>
        <p className="mt-2 text-(--muted)">{m.bio}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Ask about">
          {m.focus.map((f) => (
            <li key={f} className="rounded-full border border-(--line) px-2.5 py-0.5 text-xs">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Closing call to action used at the bottom of most pages. `book` is the client-side "Book a call" button. */
export function CtaBand({
  title = "Got a brand that needs a jolt?",
  lead = "Book a free 20-minute call, or send a brief and get a written plan within a week.",
  book,
}: {
  title?: string;
  lead?: string;
  book: React.ReactNode;
}) {
  return (
    <section className={`${wrap} pb-16 md:pb-24 lg:pb-28`}>
      <div className="hw-aurora relative overflow-hidden rounded-[28px] px-6 py-10 text-[#0B0B0D] md:px-12 md:py-14">
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <h2 className={`${disp} max-w-[16ch] text-[clamp(2rem,4.6vw,3.5rem)] leading-[1]`}>{title}</h2>
            <p className="mt-3 max-w-[44ch] text-lg text-[#0B0B0D]/75">{lead}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {book}
            <Link href={`${BASE}/enquire`} className={`${btn} border border-[#0B0B0D]/40 hover:border-[#0B0B0D] hover:bg-[#0B0B0D]/5`}>
              Send a brief
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Placeholder with the same outline as a case study or article, shown while its content streams in. */
export function PageSkeleton() {
  const bar = "rounded-full bg-(--fg)/10";
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse">
      <div className="border-b border-(--line)">
        <div className={`${wrap} pt-10 pb-14 md:pt-16 md:pb-20`}>
          <div className={`${bar} h-4 w-24`} />
          <div className={`${bar} mt-6 h-14 w-3/4 max-w-2xl md:h-20`} />
          <div className={`${bar} mt-5 h-5 w-2/3 max-w-xl`} />
          <div className={`${bar} mt-3 h-5 w-1/2 max-w-md`} />
        </div>
      </div>
      <div className={`${wrap} pt-8`}>
        <div className="h-[clamp(260px,46vw,580px)] rounded-[28px] bg-(--fg)/10" />
      </div>
    </div>
  );
}
