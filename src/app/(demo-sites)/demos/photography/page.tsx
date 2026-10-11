import Image from "next/image";
import { BackgroundVideo } from "@/components/shared/BackgroundVideo";
import { DemoDisclaimer, SampleTag } from "@/components/shared/DemoShell";
import { unsplash, videos } from "@/lib/media";
import { EnquiryForm, PackagePicker, Portfolio, ShowreelButton } from "./_parts/Parts";

const story = [
  { id: "1789971649660-eefc756ee5dd", cap: "6:40 am — marigolds go up at the haveli" },
  { id: "1681717166573-f71589207785", cap: "10:15 am — the haldi gets loud" },
  { id: "1753597500229-d2534c9a01f8", cap: "2:30 pm — Meera's mehendi, finished" },
  { id: "1610173827043-9db50e0d8ef9", cap: "6:05 pm — the first look" },
  { id: "1722952934708-749c22eb2e58", cap: "8:50 pm — under the lights" },
  { id: "1542460533-50ac46fb13d7", cap: "The morning after, on the dunes" },
];

const testimonials = [
  { q: "We cried looking at the album. They caught my grandmother laughing at the haldi, and that photo is now framed in every house in the family.", by: "Ananya & Rohan · Udaipur" },
  { q: "Calm, invisible and somehow everywhere. Our highlight film had our friends in London asking who shot it.", by: "Sana & Imran · Jaipur" },
  { q: "They planned every shot around the light at our destination wedding in Bali. Worth every rupee.", by: "Divya & Karthik · Bali" },
];

export default function PhotographyDemo() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-dm text-3xl text-[#C9A3A0]">Kohl</span>
            <span className="font-dd text-xl tracking-wide">&amp; Gold</span>
          </a>
          <nav aria-label="Studio" className="hidden gap-8 text-sm tracking-wide md:flex">
            {[["#work", "Work"], ["#story", "Stories"], ["#packages", "Packages"], ["#love", "Kind words"], ["#enquire", "Enquire"]].map(([h, l]) => (
              <a key={h} href={h} className="hover:text-[#C9A3A0]">{l}</a>
            ))}
          </nav>
          <a href="#enquire" className="inline-flex min-h-11 items-center border border-[#F2EFEA]/50 px-5 text-sm tracking-wide hover:bg-[#F2EFEA] hover:text-[#121212]">
            Check your date
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative h-[100svh] min-h-[620px]" aria-labelledby="pg-hero">
          <BackgroundVideo
            video={videos.weddingRitual}
            posterAlt="A traditional Indian wedding ritual"
            className="absolute inset-0"
            controlsClassName="bottom-28 right-5 md:bottom-10 md:right-10"
            overlay={<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#121212]" />}
          />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-5 pb-32 md:px-10 md:pb-24">
            <p className="font-dm text-3xl text-[#C9A3A0] md:text-4xl">Jaipur · Udaipur · wherever you are</p>
            <h1 id="pg-hero" className="mt-2 max-w-4xl font-dd text-6xl leading-[0.95] font-light md:text-[120px]">
              Stories in <em className="font-normal">kohl</em> and gold
            </h1>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a href="#enquire" className="inline-flex min-h-13 items-center bg-[#F2EFEA] px-8 text-sm font-medium tracking-wide text-[#121212]">
                Check Your Date
              </a>
              <ShowreelButton />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-[1fr_1.1fr] md:px-10 md:py-36" aria-labelledby="pg-about">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={unsplash("1617627143750-d86bc21e42bb")} alt="Portrait of a woman in a pink saree in the forest, from our portfolio" fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover" />
          </div>
          <div>
            <h2 id="pg-about" className="font-dd text-5xl leading-tight font-light md:text-6xl">We&apos;re Aarav and Meera.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#F2EFEA]/75">
              Two photographers who would rather catch your father&apos;s face during the pheras than line everyone up for another group
              photo. For eleven years we&apos;ve photographed weddings across Rajasthan, and destination celebrations in Bali, Dubai and
              Lake Como.
            </p>
            <p className="mt-6 font-dm text-4xl text-[#C9A3A0]">Aarav &amp; Meera</p>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl scroll-mt-10 px-5 pb-24 md:px-10 md:pb-36" aria-labelledby="pg-work">
          <h2 id="pg-work" className="mb-10 text-center font-dd text-5xl font-light md:text-7xl">Selected work</h2>
          <Portfolio />
        </section>

        <section id="story" className="scroll-mt-10 border-y border-[#F2EFEA]/10 py-24 md:py-32" aria-labelledby="pg-story">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <h2 id="pg-story" className="font-dd text-5xl font-light md:text-6xl">A day with Meera &amp; Kabir</h2>
            <p className="mt-3 text-[#8A8580]">Samode Haveli, February · scroll sideways</p>
          </div>
          <ol className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:px-10" tabIndex={0} aria-label="Wedding day story, scrollable">
            {story.map((s, i) => (
              <li key={s.id} className="w-[78vw] shrink-0 snap-center md:w-[34vw]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={unsplash(s.id)} alt={s.cap} fill sizes="(min-width:768px) 34vw, 78vw" className="object-cover" />
                </div>
                <p className="mt-4 flex gap-3 text-sm text-[#F2EFEA]/75">
                  <span className="font-dd text-xl text-[#C9A3A0]">{String(i + 1).padStart(2, "0")}</span> {s.cap}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section id="packages" className="mx-auto max-w-7xl scroll-mt-10 px-5 py-24 md:px-10 md:py-36" aria-labelledby="pg-pkg">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 id="pg-pkg" className="font-dd text-5xl font-light md:text-7xl">Collections</h2>
            <p className="max-w-sm text-[#8A8580]">Indian rupee prices. Destination weddings and USD quotes on request.</p>
          </div>
          <PackagePicker />
          <ol className="mt-16 grid gap-8 md:grid-cols-4">
            {["Enquire with your date", "A video call with us both", "Book with a 30% advance", "Your wedding, then your gallery"].map((s, i) => (
              <li key={s} className="border-t border-[#F2EFEA]/15 pt-5">
                <span className="font-dd text-3xl text-[#C9A3A0]">{i + 1}</span>
                <p className="mt-2 text-[#F2EFEA]/80">{s}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="love" className="scroll-mt-10 bg-[#1a1918] py-24 md:py-36" aria-labelledby="pg-love">
          <div className="mx-auto max-w-5xl px-5 md:px-10">
            <h2 id="pg-love" className="sr-only">Kind words from couples</h2>
            <ul className="space-y-20">
              {testimonials.map((t) => (
                <li key={t.by}>
                  <blockquote className="font-dd text-3xl leading-snug font-light italic md:text-5xl">&ldquo;{t.q}&rdquo;</blockquote>
                  <p className="mt-6 flex items-center gap-3 text-sm tracking-wide text-[#8A8580]">— {t.by} <SampleTag /></p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="enquire" className="mx-auto max-w-5xl scroll-mt-10 px-5 py-24 md:px-10 md:py-36" aria-labelledby="pg-enq">
          <h2 id="pg-enq" className="font-dd text-5xl font-light md:text-7xl">Tell us about your day</h2>
          <p className="mt-4 mb-12 max-w-lg text-[#F2EFEA]/70">We take a limited number of weddings each season. Send your date and we&apos;ll reply within a day.</p>
          <EnquiryForm />
        </section>
      </main>

      <footer className="border-t border-[#F2EFEA]/10 px-5 pt-12 pb-32 md:px-10 md:pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-end">
          <div className="grid grid-cols-4 gap-2" aria-hidden>
            {["1732118400647-a81e3b37be87", "1591604466107-ec97de577aff", "1615966650071-855b15f29ad1", "1679006831648-7c9ea12e5807"].map((id) => (
              <div key={id} className="relative aspect-square overflow-hidden">
                <Image src={unsplash(id)} alt="" fill sizes="12vw" className="object-cover opacity-80" />
              </div>
            ))}
          </div>
          <DemoDisclaimer slug="photography" className="text-[#8A8580] md:text-right" />
        </div>
      </footer>
    </>
  );
}
