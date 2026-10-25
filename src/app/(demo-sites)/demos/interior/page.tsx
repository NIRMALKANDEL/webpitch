import Image from "next/image";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { unsplash } from "@/lib/media";
import { Consultation, ParallaxHero, Projects } from "./_parts/Parts";
import { RoomPlanner } from "./_parts/RoomPlanner";

const services = [
  ["Interior design", "Spatial planning, finishes, furniture and lighting for homes and workplaces."],
  ["Architecture", "New homes, extensions and alterations, from concept to planning approval."],
  ["Renovations & extensions", "We manage builders and trades so the drawing becomes the room."],
  ["Joinery & kitchens", "Custom kitchens, wardrobes and built-ins, made in our own Pune workshop."],
  ["3D visualisation", "Photoreal renders, so you can walk through before anything is built."],
];

const process = [
  ["Consultation", "We meet on site, listen, and measure. One week."],
  ["Concept & moodboard", "Layouts, materials and a direction you can feel. Two to three weeks."],
  ["3D & drawings", "Renders and documentation, ready for quotes. Three to five weeks."],
  ["Build", "We coordinate trades and visit site weekly. Varies by scope."],
  ["Handover", "Styling, a final walkthrough and a care guide for every surface."],
];

const materials = [
  { name: "Spotted gum", id: "1506968430777-bf7784a87f23" },
  { name: "Terrazzo", id: "1621885353353-474aee939bf6" },
  { name: "Carrara marble", id: "1733180388513-81ea320f6661" },
  { name: "Linen", id: "1507434745378-235a6297156b" },
];

export default function InteriorDemo() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#171717]/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#top" className="font-dd text-sm tracking-[0.35em]">STUDIO NEEM</a>
          <nav aria-label="Studio" className="hidden gap-10 font-dd text-xs tracking-[0.2em] md:flex">
            {[["#design-3d", "3D STUDIO"], ["#projects", "PROJECTS"], ["#services", "SERVICES"], ["#process", "PROCESS"], ["#consult", "CONTACT"]].map(([h, l]) => (
              <a key={h} href={h} className="hover:text-[#5B6B3A]">{l}</a>
            ))}
          </nav>
          <a href="#consult" className="font-dd text-xs tracking-[0.2em] underline underline-offset-8 md:hidden">BOOK</a>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-[1400px] px-5 pt-16 pb-12 md:px-10 md:pt-28 md:pb-20" aria-labelledby="sn-h">
          <h1 id="sn-h" className="max-w-5xl font-dd text-[11vw] leading-[0.95] font-extralight tracking-tight md:text-[104px]">
            Quiet rooms, made to be lived in.
          </h1>
          <div className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr]">
            <p className="max-w-xl text-lg leading-relaxed text-[#171717]/70">
              Studio Neem is an interior and architecture practice in Koregaon Park, Pune. We design homes, cafes and workplaces with
              natural materials, honest detailing and a lot of light.
            </p>
            <a href="#consult" className="self-end justify-self-start border-b border-[#171717] pb-1 font-dd text-sm tracking-[0.2em] md:justify-self-end">
              BOOK A CONSULTATION
            </a>
          </div>
        </section>

        <ParallaxHero />

        <section id="design-3d" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36" aria-labelledby="sn-3d">
          <div className="mb-12 grid gap-4 md:grid-cols-[1fr_2fr]">
            <h2 id="sn-3d" className="font-dd text-sm tracking-[0.3em]">DESIGN IT IN 3D</h2>
            <p className="max-w-xl font-dd text-3xl leading-tight font-extralight md:text-5xl">
              Walk through your room before a single nail goes in.
            </p>
          </div>
          <RoomPlanner />
        </section>

        <section id="projects" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-24 md:px-10 md:py-40" aria-labelledby="sn-p">
          <div className="mb-10 grid gap-4 md:grid-cols-[1fr_2fr]">
            <h2 id="sn-p" className="font-dd text-sm tracking-[0.3em]">SELECTED PROJECTS</h2>
            <p className="max-w-xl text-lg text-[#171717]/70">Open a project to see its details and drag the before/after slider.</p>
          </div>
          <Projects />
        </section>

        <section id="services" className="scroll-mt-20 bg-[#f6f5f2] py-24 md:py-36" aria-labelledby="sn-s">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-[1fr_2fr] md:px-10">
            <h2 id="sn-s" className="font-dd text-sm tracking-[0.3em]">SERVICES</h2>
            <ul className="divide-y divide-[#171717]/15 border-y border-[#171717]/15">
              {services.map(([t, d]) => (
                <li key={t} className="grid gap-2 py-7 md:grid-cols-[1fr_1.4fr] md:gap-10">
                  <h3 className="font-dd text-2xl font-light md:text-3xl">{t}</h3>
                  <p className="text-[#171717]/70">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-24 md:px-10 md:py-36" aria-labelledby="sn-pr">
          <h2 id="sn-pr" className="font-dd text-sm tracking-[0.3em]">HOW WE WORK</h2>
          <ol className="mt-12 grid gap-px bg-[#171717]/10 md:grid-cols-5">
            {process.map(([t, d], i) => (
              <li key={t} className="bg-white p-6 md:p-8">
                <span className="font-dd text-5xl font-extralight text-[#5B6B3A]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-dd text-lg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#171717]/65">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36" aria-labelledby="sn-m">
          <h2 id="sn-m" className="font-dd text-sm tracking-[0.3em]">MATERIALS WE RETURN TO</h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {materials.map((m) => (
              <li key={m.name}>
                <div className="relative aspect-square overflow-hidden">
                  <Image src={unsplash(m.id)} alt={`${m.name} sample`} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
                </div>
                <p className="mt-3 font-dd text-sm tracking-[0.15em]">{m.name.toUpperCase()}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="consult" className="scroll-mt-20 border-t border-[#171717]/10 py-24 md:py-36" aria-labelledby="sn-c">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-[1fr_2fr] md:px-10">
            <div>
              <h2 id="sn-c" className="font-dd text-4xl leading-tight font-extralight md:text-5xl">Book a consultation</h2>
              <p className="mt-4 text-[#171717]/65">An hour on site or in our Koregaon Park studio. Fee credited to your project if you go ahead.</p>
              <p className="mt-8 text-sm text-[#171717]/65">42 Lane 6, Koregaon Park, Pune 411001 (fictional)<br />+91 98765 51234 · hello@example.com</p>
            </div>
            <Consultation />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#171717]/10 px-5 pt-10 pb-32 md:px-10 md:pb-14">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 md:flex-row">
          <p className="font-dd text-sm tracking-[0.35em]">STUDIO NEEM</p>
          <DemoDisclaimer slug="interior" className="max-w-lg text-[#171717]/55" />
        </div>
      </footer>
    </>
  );
}
