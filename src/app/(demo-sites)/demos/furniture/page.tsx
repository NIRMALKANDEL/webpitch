import { Download, MapPin } from "lucide-react";
import Image from "next/image";
import { BackgroundVideo } from "@/components/shared/BackgroundVideo";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { unsplash, videos } from "@/lib/media";
import { Catalogue, CollectionTiles, Configurator, QuoteButton, RoomHotspots, ShopProvider } from "./_parts/Parts";

const wrap = "mx-auto max-w-7xl px-4 md:px-8";
const h2 = "font-dd text-4xl leading-tight md:text-6xl";

export default function FurnitureDemo() {
  return (
    <ShopProvider>
      <header className="sticky top-0 z-40 bg-[#F5F5F4]/85 backdrop-blur">
        <div className={`${wrap} flex h-16 items-center justify-between md:h-20`}>
          <a href="#top" className="font-dd text-2xl italic">Woodgrain &amp; Co.</a>
          <nav aria-label="Shop" className="hidden gap-7 text-sm font-semibold md:flex">
            {[["#configurator", "Configure"], ["#collections", "Collections"], ["#catalogue", "Catalogue"], ["#rooms", "Rooms"], ["#showroom", "Showroom"]].map(([h, l]) => <a key={h} href={h} className="hover:text-[#6B4226]">{l}</a>)}
          </nav>
          <QuoteButton />
        </div>
      </header>
      <main id="top">
        <section className={`${wrap} grid items-end gap-8 pt-10 pb-16 md:grid-cols-2 md:pt-16`} aria-labelledby="wg-h">
          <div>
            <h1 id="wg-h" className="font-dd text-6xl leading-[0.95] md:text-8xl">Solid wood, built to be handed down.</h1>
            <p className="mt-6 max-w-md text-lg text-[#1C1917]/70">Chairs, tables and beds made by hand in our Austin workshop from walnut, oak and maple.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogue" className="inline-flex min-h-13 items-center rounded-full bg-[#1C1917] px-7 font-semibold text-white">Browse Collection</a>
              <a href="#configurator" className="inline-flex min-h-13 items-center rounded-full bg-white px-7 font-semibold ring-1 ring-black/10">Try the 3D chair</a>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] md:aspect-[4/4.5]">
            <Image src={unsplash("1623353283172-2518d7e6f5ab")} alt="An armchair beside a window" fill priority sizes="(min-width:768px) 45vw, 92vw" className="object-cover" />
          </div>
        </section>

        <section id="configurator" className="scroll-mt-20 bg-white py-20 md:py-28" aria-labelledby="cf-h">
          <div className={wrap}>
            <h2 id="cf-h" className={`${h2} mb-10`}>Make it yours</h2>
            <Configurator />
          </div>
        </section>

        <section id="collections" className={`${wrap} scroll-mt-20 py-20 md:py-28`} aria-labelledby="cl-h">
          <h2 id="cl-h" className={`${h2} mb-10`}>Collections</h2>
          <CollectionTiles />
        </section>

        <section id="catalogue" className={`${wrap} scroll-mt-20 pb-20 md:pb-28`} aria-labelledby="ca-h">
          <h2 id="ca-h" className={`${h2} mb-8`}>The catalogue</h2>
          <Catalogue />
        </section>

        <section id="craft" className="relative scroll-mt-20 overflow-hidden text-white" aria-labelledby="cr-h">
          <BackgroundVideo video={videos.woodShaving} posterAlt="A carpenter shaving a plank of wood" className="absolute inset-0" overlay={<div className="absolute inset-0 bg-[#1C1917]/55" />} controlsClassName="bottom-6 right-6" />
          <div className={`${wrap} relative z-10 py-28 md:py-40`}>
            <h2 id="cr-h" className={h2}>How a Woodgrain piece is made</h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-4">
              {[["Selection", "Boards chosen by hand for grain and colour."], ["Drying", "Air-dried, then kiln-dried to 8% moisture."], ["Joinery", "Mortise, tenon and dovetail. No staples."], ["Finish", "Three coats of hard-wax oil, sanded between each."]].map(([t, d], i) => (
                <li key={t} className="border-t border-white/40 pt-4"><span className="font-dd text-3xl">{i + 1}</span><p className="mt-2 font-semibold">{t}</p><p className="text-white/75">{d}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="rooms" className={`${wrap} scroll-mt-20 py-20 md:py-28`} aria-labelledby="ro-h">
          <h2 id="ro-h" className={`${h2} mb-3`}>Shop the room</h2>
          <p className="mb-10 text-[#1C1917]/65">Tap the dots to see each piece.</p>
          <RoomHotspots />
        </section>

        <section className={`${wrap} pb-20`} aria-labelledby="dl-h">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-[#A3B18A] p-8 md:flex-row md:items-center md:p-12">
            <div>
              <h2 id="dl-h" className="font-dd text-3xl">2026 trade catalogue</h2>
              <p className="mt-1">Every piece, every finish and dimensions for designers and architects.</p>
            </div>
            <a href="/demos/furniture/woodgrain-catalogue-sample.pdf" download className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1C1917] px-6 font-semibold text-white"><Download className="size-4" aria-hidden /> Download PDF (sample)</a>
          </div>
        </section>

        <section id="showroom" className="scroll-mt-20 bg-white py-20" aria-labelledby="sh-h">
          <div className={`${wrap} grid gap-8 md:grid-cols-2`}>
            <div>
              <h2 id="sh-h" className={h2}>Visit the showroom</h2>
              <p className="mt-6 flex gap-2"><MapPin className="size-5 shrink-0 text-[#6B4226]" aria-hidden /> 1801 E Cesar Chavez St, Austin, TX (fictional)</p>
              <p className="mt-2 text-[#1C1917]/65">Thu–Sun, 10am–6pm · (512) 555-0147</p>
            </div>
            <iframe title="Map of East Austin" src="https://www.google.com/maps?q=East+Cesar+Chavez,+Austin,+TX&z=14&output=embed" loading="lazy" className="h-72 w-full rounded-[28px] border-0" />
          </div>
        </section>
      </main>
      <footer className="px-4 pt-10 pb-32 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd text-xl italic">Woodgrain &amp; Co.</p>
          <DemoDisclaimer slug="furniture" className="max-w-lg text-[#1C1917]/60" />
        </div>
      </footer>
    </ShopProvider>
  );
}
