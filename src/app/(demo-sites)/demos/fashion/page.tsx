import Image from "next/image";
import { BackgroundVideo } from "@/components/shared/BackgroundVideo";
import { DemoDisclaimer } from "@/components/shared/DemoShell";
import { unsplash, videos } from "@/lib/media";
import { HeaderActions, Lookbook, NewArrivals, Newsletter, ShopProvider } from "./_parts/Parts";

const collections = [["Festive", "1617627143750-d86bc21e42bb"], ["Everyday Cotton", "1708534419572-6e6614a53ca1"], ["The Monsoon Edit", "1622049605334-72e1e4432346"], ["Occasion Sarees", "1679006831648-7c9ea12e5807"]];
const marquee = ["Noor silk saree", "Jade Kanjeevaram", "Chikan kurta set", "Rose georgette", "Garnet zari", "Monsoon tunic"];

export default function FashionDemo() {
  return (
    <ShopProvider>
      <header className="fixed inset-x-0 top-0 z-40 mix-blend-normal">
        <div className="flex h-16 items-center justify-between bg-white/90 px-5 backdrop-blur md:px-10">
          <nav aria-label="Shop" className="hidden gap-6 text-xs tracking-[0.2em] md:flex">
            {[["#new", "NEW IN"], ["#lookbook", "LOOKBOOK"], ["#story", "OUR STORY"]].map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <a href="#top" className="font-dd text-2xl tracking-[0.15em] md:absolute md:left-1/2 md:-translate-x-1/2">MAISON IRA</a>
          <HeaderActions />
        </div>
      </header>
      <main id="top">
        <section className="relative grid min-h-[100svh] pt-16 md:grid-cols-2" aria-labelledby="mi-h">
          <BackgroundVideo video={videos.sareeOutdoors} posterAlt="A woman in a traditional outfit outdoors" className="min-h-[60svh] md:min-h-0" controlsClassName="bottom-4 left-4" />
          <div className="flex flex-col justify-end p-6 md:p-14">
            <p className="text-xs tracking-[0.3em] text-[#BE185D]">AUTUMN / WINTER 2026</p>
            <h1 id="mi-h" className="mt-4 font-dd text-6xl leading-[0.9] md:text-[112px]">The Monsoon <em>Edit</em></h1>
            <p className="mt-6 max-w-sm text-black/65">Handwoven silks and block-printed cottons, made in small batches in Delhi. Shipping worldwide.</p>
            <a href="#new" className="mt-8 inline-flex min-h-13 items-center justify-center bg-black px-8 text-xs tracking-[0.25em] text-white sm:self-start">SHOP NEW ARRIVALS</a>
          </div>
        </section>

        <div className="overflow-hidden border-y border-black py-4" aria-hidden>
          <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-12 hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...marquee, ...marquee].map((m, i) => <span key={i} className="font-dd text-2xl italic">{m} <span className="text-[#BE185D]">✦</span></span>)}
          </div>
        </div>

        <section className="px-5 py-20 md:px-10" aria-labelledby="co-h">
          <h2 id="co-h" className="sr-only">Collections</h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {collections.map(([n, id], i) => (
              <li key={n} className={i % 2 ? "md:mt-20" : ""}>
                <a href="#new" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden"><Image src={unsplash(id)} alt="" fill sizes="(min-width:768px) 24vw, 48vw" className="object-cover transition duration-1000 group-hover:scale-105" /></div>
                  <p className="mt-3 font-dd text-xl">{n}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Lookbook />

        <section id="new" className="scroll-mt-16 px-5 py-20 md:px-10" aria-labelledby="ne-h">
          <h2 id="ne-h" className="mb-8 font-dd text-5xl md:text-7xl">New arrivals</h2>
          <NewArrivals />
        </section>

        <section id="story" className="grid scroll-mt-16 bg-[#FCE7F3] md:grid-cols-2" aria-labelledby="st-h">
          <div className="relative min-h-[60vh]"><Image src={unsplash("1507434745378-235a6297156b")} alt="Hand block-printed textiles" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /></div>
          <div className="flex flex-col justify-center p-8 md:p-16">
            <h2 id="st-h" className="font-dd text-5xl">Made slowly, worn forever</h2>
            <p className="mt-6 text-lg text-black/70">Ira Malhotra started Maison Ira in 2019 with three weavers in Varanasi. Today we work with forty artisan families across India, paying fair wages and keeping block printing and handloom weaving alive.</p>
            <p className="mt-6 font-dd text-3xl italic">— Ira</p>
          </div>
        </section>

        <section className="px-5 py-20 text-center md:px-10" aria-labelledby="nl-h">
          <h2 id="nl-h" className="font-dd text-4xl">First look at new drops</h2>
          <Newsletter />
        </section>
      </main>
      <footer className="border-t border-black px-5 pt-10 pb-32 md:px-10 md:pb-12">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <p className="font-dd tracking-[0.15em]">MAISON IRA · Free shipping in India over ₹5,000 · Easy 14-day returns (sample)</p>
          <DemoDisclaimer slug="fashion" className="max-w-md text-black/55" />
        </div>
      </footer>
    </ShopProvider>
  );
}
