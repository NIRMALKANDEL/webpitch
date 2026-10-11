import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { ContactForm, CursorGlow, HeroScene, Scramble, ScrollLine, TiltCard } from "./_parts/Parts";

const work = [
  { title: "Tamarind & Smoke", kind: "Restaurant site", year: "2026", img: "/previews/restaurant.jpg", href: "/demos/restaurant" },
  { title: "Harbourline Estates", kind: "3D real estate", year: "2026", img: "/previews/real-estate.jpg", href: "/demos/real-estate" },
  { title: "Maison Ira", kind: "Fashion e-commerce", year: "2025", img: "/previews/fashion.jpg", href: "/demos/fashion" },
  { title: "Forgeline Industries", kind: "B2B + 3D viewer", year: "2025", img: "/previews/manufacturer.jpg", href: "/demos/manufacturer" },
];
const skills = ["Three.js", "React", "Next.js", "WebGL shaders", "Motion design", "TypeScript", "Blender", "Figma", "Creative coding", "Node"];
const timeline = [
  ["2026", "Independent", "Interactive sites and 3D product experiences for brands in India, the UK and the US."],
  ["2023", "Lead creative developer, Pixelfield Studio", "Shipped 30+ campaign sites and two award-shortlisted WebGL experiences."],
  ["2020", "Frontend developer, Northwind Labs", "Design systems and performance work for a fintech app used by 2M people."],
];

export default function PortfolioDemo() {
  return (
    <>
      <ScrollLine />
      <CursorGlow />
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="font-dd text-lg font-extrabold">KV<span className="text-[#22D3EE]">.</span></a>
          <nav aria-label="Portfolio" className="flex gap-1 rounded-full bg-white/5 p-1 text-sm ring-1 ring-white/10 backdrop-blur">
            {[["#work", "Work"], ["#skills", "Skills"], ["#about", "About"], ["#contact", "Contact"]].map(([h, l]) => <a key={h} href={h} className="rounded-full px-3 py-2 hover:bg-white/10 sm:px-4">{l}</a>)}
          </nav>
        </div>
      </header>
      <main id="top" className="relative z-10">
        <section className="relative h-[100svh] min-h-[640px] overflow-hidden" aria-labelledby="kv-h">
          <HeroScene />
          <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-32 md:px-10 md:pb-20">
            <p className="text-sm text-[#22D3EE]">Creative developer · Bengaluru → worldwide</p>
            <h1 id="kv-h" className="mt-3 font-dd text-[15vw] leading-[0.85] font-extrabold tracking-tight md:text-[150px]">
              <Scramble text="KAI VARMA" />
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/70">I build websites that people play with: 3D, motion and interaction, shipped fast and accessible.</p>
            <p className="mt-4 text-xs text-white/50">Tip: click the glowing shape.</p>
          </div>
        </section>

        <div className="overflow-hidden border-y border-white/10 py-5" aria-hidden>
          <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-10 font-dd text-3xl font-extrabold motion-reduce:animate-none md:text-5xl">
            {[...skills, ...skills].map((s, i) => <span key={i} className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(237,237,245,0.6)]" : ""}>{s} ✦</span>)}
          </div>
        </div>

        <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-10 md:py-32" aria-labelledby="wk-h">
          <h2 id="wk-h" className="font-dd text-4xl font-semibold md:text-7xl">Selected work</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {work.map((w, i) => <div key={w.title} className={i % 2 ? "md:mt-24" : ""}><TiltCard {...w} /></div>)}
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 py-24 md:py-32" aria-labelledby="sk-h">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <h2 id="sk-h" className="font-dd text-4xl font-semibold md:text-7xl">Toolkit</h2>
            <ul className="mt-12 flex flex-wrap gap-3 [perspective:800px]">
              {skills.map((s, i) => (
                <li key={s} className="rounded-2xl bg-gradient-to-br from-white/10 to-white/0 px-6 py-4 font-dd text-lg ring-1 ring-white/15 transition duration-500 hover:[transform:rotateX(18deg)_rotateY(-12deg)_translateZ(20px)]" style={{ animation: `float ${3 + (i % 4)}s ease-in-out ${i * 0.2}s infinite alternate` }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-10" aria-labelledby="ab-h">
          <h2 id="ab-h" className="font-dd text-4xl font-semibold md:text-7xl">The journey</h2>
          <ol className="mt-12 border-l border-white/15">
            {timeline.map(([y, r, d]) => (
              <li key={y} className="relative pb-12 pl-8">
                <span aria-hidden className="absolute top-2 -left-[7px] size-3.5 rounded-full bg-[#22D3EE] shadow-[0_0_20px_#22D3EE]" />
                <p className="font-dd text-sm text-[#22D3EE]">{y}</p>
                <p className="mt-1 font-dd text-2xl font-semibold">{r}</p>
                <p className="mt-2 max-w-xl text-white/65">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24 md:px-10 md:py-32" aria-labelledby="ct-h">
          <h2 id="ct-h" className="font-dd text-5xl leading-none font-extrabold md:text-8xl">Let&apos;s build something <span className="bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#F472B6] bg-clip-text text-transparent">loud.</span></h2>
          <div className="mt-14"><ContactForm /></div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-white/10 px-5 pt-10 pb-32 md:px-10 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd">© Kai Varma</p>
          <DemoDisclaimer slug="portfolio" className="max-w-lg text-white/50" />
        </div>
      </footer>
    </>
  );
}
