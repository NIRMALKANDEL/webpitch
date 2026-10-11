import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { BackgroundVideo } from "@/components/shared/BackgroundVideo";
import { DemoDisclaimer, SampleTag } from "@/components/shared/DemoShell";
import { unsplash, videos } from "@/lib/media";
import { CartProvider } from "./_parts/Cart";
import { DishReveal, FoodGallery, MobileActions, OpenNow, Reservation, RestaurantNav, TodayHours } from "./_parts/Interactive";
import { Menu } from "./_parts/Menu";
import { reviews } from "./_parts/data";

const signature = [
  { id: "1603894584373-5ac82b2ae398", name: "Smoked butter chicken", price: "£15", veg: false, note: "Our most ordered dish" },
  { id: "1589302168068-964664d93dc0", name: "Hyderabadi dum biryani", price: "£16", veg: false, note: "Sealed and slow-cooked" },
  { id: "1565557623262-b51c2513a641", name: "Dal makhani & naan", price: "£15", veg: true, note: "Overnight on the tandoor" },
];

export default function RestaurantDemo() {
  return (
    <CartProvider>
      <RestaurantNav />
      <main id="top">
        {/* Hero: cinematic tandoor video */}
        <section className="relative h-[100svh] min-h-[600px] text-white" aria-labelledby="hero-t">
          <BackgroundVideo
            video={videos.tandoor}
            posterAlt="Bread baking in a clay tandoor oven"
            className="absolute inset-0"
            controlsClassName="bottom-28 right-4 md:bottom-8 md:right-8"
            overlay={<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />}
          />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-36 md:px-8 md:pb-24">
            <OpenNow />
            <h1 id="hero-t" className="mt-5 max-w-4xl font-dd text-[13vw] leading-[0.92] md:text-8xl">
              Fire, smoke &amp; slow curries
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">
              Charcoal grills and dishes from across India, cooked over real flame in Shoreditch and delivered hot across East London.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className="inline-flex min-h-13 items-center rounded-full bg-[#E3A21A] px-7 text-lg font-bold text-[#1b1b1b]">
                Order on WhatsApp
              </a>
              <a href="#reserve" className="inline-flex min-h-13 items-center rounded-full border-2 border-white/70 px-7 text-lg font-bold">
                Reserve a Table
              </a>
            </div>
          </div>
        </section>

        {/* Signature dishes */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28" aria-labelledby="sig-dishes">
          <h2 id="sig-dishes" className="font-dd text-4xl text-[#12372A] md:text-6xl">From the coals</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {signature.map((d) => (
              <article key={d.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image src={unsplash(d.id)} alt={d.name} fill sizes="(min-width:768px) 30vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#12372A]">{d.note}</span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <span className="font-dd text-xl text-[#B3261E]">{d.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Menu + cart */}
        <section id="menu" className="scroll-mt-20 bg-[#f4f7f3] py-20 md:py-28" aria-labelledby="menu-t">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 id="menu-t" className="font-dd text-4xl text-[#12372A] md:text-6xl">The menu</h2>
              <p className="max-w-md text-black/65">Add dishes, then send your order straight to our kitchen on WhatsApp. Delivery within 3 miles, about 30 minutes.</p>
            </div>
            <div className="mt-10">
              <Menu />
            </div>
          </div>
        </section>

        <DishReveal />

        {/* Gallery */}
        <section id="gallery" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 md:px-8 md:py-28" aria-labelledby="gal-t">
          <h2 id="gal-t" className="font-dd text-4xl text-[#12372A] md:text-6xl">Eat with your eyes first</h2>
          <div className="mt-10">
            <FoodGallery />
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="scroll-mt-20 bg-[#E3A21A] py-20 text-[#1b1b1b] md:py-28" aria-labelledby="rev-t">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 id="rev-t" className="font-dd text-4xl md:text-6xl">What diners say</h2>
            <ul className="no-scrollbar -mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:px-0">
              {reviews.map((r) => (
                <li key={r.name} className="flex w-[80vw] shrink-0 snap-start flex-col rounded-2xl bg-white p-6 md:w-auto">
                  <div className="flex items-center justify-between">
                    <span className="flex text-[#B3261E]" role="img" aria-label={`${r.stars} out of 5 stars`}>
                      {Array.from({ length: r.stars }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" aria-hidden />
                      ))}
                    </span>
                    <SampleTag />
                  </div>
                  <p className="mt-4 flex-1 text-[17px] leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-4 font-bold">{r.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reservation */}
        <section id="reserve" className="scroll-mt-20 bg-[#12372A] py-20 text-white md:py-28" aria-labelledby="res-t">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-[1fr_1.3fr] md:px-8">
            <div>
              <h2 id="res-t" className="font-dd text-4xl md:text-6xl">Book a table</h2>
              <p className="mt-4 max-w-sm text-lg text-white/75">
                Tables for up to 12. For bigger groups and private dining, mention it in the notes and we&apos;ll call you back.
              </p>
              <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-2xl md:block">
                <Image src={unsplash("1709548145082-04d0cde481d4")} alt="The dining room at night" fill sizes="35vw" className="object-cover" />
              </div>
            </div>
            <Reservation />
          </div>
        </section>

        {/* Visit */}
        <section id="visit" className="scroll-mt-20 bg-[#0d2a20] py-20 text-white md:py-28" aria-labelledby="visit-t">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-8">
            <div>
              <h2 id="visit-t" className="font-dd text-4xl md:text-6xl">Find us</h2>
              <p className="mt-4 flex items-start gap-2 text-lg">
                <MapPin className="mt-1 size-5 shrink-0 text-[#E3A21A]" aria-hidden /> 14 Calvert Yard, Shoreditch, London E2 (fictional address)
              </p>
              <p className="mt-2 text-white/70">Phone: 020 7946 0321 · Delivery via our own riders within 3 miles</p>
              <div className="mt-8 max-w-md">
                <TodayHours />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shoreditch+London"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#E3A21A] px-6 font-bold text-[#1b1b1b]"
              >
                Get directions
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <iframe
                title="Map of Shoreditch, London"
                src="https://www.google.com/maps?q=Shoreditch,+London&z=14&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full border-0 md:h-full md:min-h-[420px]"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#081a14] px-4 pt-12 pb-40 text-white/70 md:px-8 md:pb-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-dd text-2xl text-white">Tamarind &amp; Smoke</p>
            <nav aria-label="Footer" className="mt-3 flex flex-wrap gap-4 text-sm">
              {["menu", "gallery", "reviews", "reserve", "visit"].map((s) => (
                <a key={s} href={`#${s}`} className="capitalize hover:text-white">{s}</a>
              ))}
            </nav>
          </div>
          <DemoDisclaimer slug="restaurant" className="max-w-md text-white/55" />
        </div>
      </footer>
      <MobileActions />
    </CartProvider>
  );
}
