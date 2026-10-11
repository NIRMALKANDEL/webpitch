import Image from "next/image";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { unsplash } from "@/lib/media";
import { AvatarBlock, ContactForm, CursorGlow, HeroScene, IntroLoader, Magnetic, PhotoStrip, RevealText, Scramble, ScrollLine, SkillOrbit, TiltCard } from "./_parts/Parts";

const work = [
  { title: "Tamarind & Smoke", kind: "Restaurant site", year: "2026", img: "/previews/restaurant.jpg", href: "/demos/restaurant" },
  { title: "Harbourline Estates", kind: "3D real estate", year: "2026", img: "/previews/real-estate.jpg", href: "/demos/real-estate" },
  { title: "Maison Ira", kind: "Fashion e-commerce", year: "2025", img: "/previews/fashion.jpg", href: "/demos/fashion" },
  { title: "Forgeline Industries", kind: "B2B + 3D viewer", year: "2025", img: "/previews/manufacturer.jpg", href: "/demos/manufacturer" },
];
const skills = ["Three.js", "React", "Next.js", "WebGL", "Motion", "TypeScript", "Blender", "Figma", "GLSL", "Node"];
const timeline = [
  ["2026", "Independent", "Interactive sites and 3D product experiences for brands in India, the UK and the US."],
  ["2023", "Lead creative developer, Pixelfield Studio", "Shipped 30+ campaign sites and two award-shortlisted WebGL experiences."],
  ["2020", "Frontend developer, Northwind Labs", "Design systems and performance work for a fintech app used by 2M people."],
];
const photos = [
  { src: unsplash("1647790292957-c7f3b44b3973"), cap: "The desk where the shaders happen" },
  { src: unsplash("1487338875411-8880f74114a2"), cap: "Two screens: one for code, one for Blender" },
  { src: unsplash("1621111848501-8d3634f82336"), cap: "Client review day" },
  { src: unsplash("1519219788971-8d9797e0928e"), cap: "Sketching interactions on paper first" },
  { src: unsplash("1611269154421-4e27233ac5c7"), cap: "Weekend studio in Indiranagar" },
];

export default function PortfolioDemo() {
  return (
    <>
      <IntroLoader />
      <ScrollLine />
      <CursorGlow />
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="font-dd text-lg font-extrabold">KV<span className="text-[#22D3EE]">.</span></a>
          <nav aria-label="Portfolio" className="flex gap-1 rounded-full bg-white/5 p-1 text-sm ring-1 ring-white/10 backdrop-blur">
            {[["#work", "Work"], ["#about", "About"], ["#skills", "Skills"], ["#contact", "Contact"]].map(([h, l]) => (
              <Magnetic key={h}><a href={h} className="block rounded-full px-3 py-2 hover:bg-white/10 sm:px-4">{l}</a></Magnetic>
            ))}
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
            <div className="pointer-events-auto mt-6 flex items-center gap-4">
              <Magnetic><a href="#contact" className="inline-flex min-h-13 items-center rounded-full bg-[#EDEDF5] px-7 font-dd text-sm font-semibold text-[#07070B]">Let&apos;s talk</a></Magnetic>
              <p className="text-xs text-white/50">Tip: click the glowing shape.</p>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-white/10 py-5" aria-hidden>
          <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-10 font-dd text-3xl font-extrabold motion-reduce:animate-none md:text-5xl">
            {[...skills, ...skills].map((s, i) => <span key={i} className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgba(237,237,245,0.6)]" : ""}>{s} ✦</span>)}
          </div>
        </div>

        <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-10 md:py-32" aria-labelledby="wk-h">
          <h2 id="wk-h" className="font-dd text-4xl font-semibold md:text-7xl"><RevealText text="Selected work" /></h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {work.map((w, i) => <div key={w.title} className={i % 2 ? "md:mt-24" : ""}><TiltCard {...w} /></div>)}
          </div>
        </section>

        <section id="about" className="scroll-mt-24 py-24 md:py-32" aria-labelledby="ab-h">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative">
              <AvatarBlock />
              <p className="mt-2 text-center text-xs text-white/50">That&apos;s me in 3D. Move your cursor; click to say hi.</p>
            </div>
            <div>
              <h2 id="ab-h" className="font-dd text-4xl font-semibold md:text-7xl"><RevealText text="Hi, I'm Kai." /></h2>
              <p className="mt-6 max-w-xl text-lg text-white/70">
                I&apos;ve spent six years turning ideas into interactive, fast websites. I care about the details people feel but rarely notice:
                a button that leans toward your cursor, a scene that loads before you blink, a layout that still works on a ₹8,000 phone.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative size-20 overflow-hidden rounded-2xl ring-2 ring-[#8B5CF6]">
                  <Image src={unsplash("1737575655055-e3967cbefd03")} alt="Kai at his desk (stock photo for this demo)" fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <p className="font-dd font-semibold">Kai Varma</p>
                  <p className="text-sm text-white/60">Available for projects from November</p>
                </div>
              </div>
              <ol className="mt-10 border-l border-white/15">
                {timeline.map(([y, r, d]) => (
                  <li key={y} className="relative pb-8 pl-8">
                    <span aria-hidden className="absolute top-2 -left-[7px] size-3.5 rounded-full bg-[#22D3EE] shadow-[0_0_20px_#22D3EE]" />
                    <p className="font-dd text-sm text-[#22D3EE]">{y}</p>
                    <p className="mt-1 font-dd text-xl font-semibold">{r}</p>
                    <p className="mt-1 max-w-xl text-white/65">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="py-16" aria-labelledby="bs-h">
          <h2 id="bs-h" className="mx-auto mb-10 max-w-7xl px-5 font-dd text-4xl font-semibold md:px-10 md:text-6xl"><RevealText text="Behind the scenes" /></h2>
          <PhotoStrip photos={photos} />
        </section>

        <section id="skills" className="scroll-mt-24 py-24 md:py-32" aria-labelledby="sk-h">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <h2 id="sk-h" className="font-dd text-4xl font-semibold md:text-7xl"><RevealText text="Toolkit" /></h2>
            <p className="mt-3 text-white/60">Hover to stop the orbit.</p>
            <SkillOrbit skills={skills} />
          </div>
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
