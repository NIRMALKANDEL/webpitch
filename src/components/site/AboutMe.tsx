import Image from "next/image";
import { site } from "@/data/site";

export function AboutMe() {
  return (
    <div className="grid items-center gap-10 rounded-[20px] border border-muted bg-white p-6 sm:p-10 md:grid-cols-[220px_1fr] lg:gap-14">
      <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-full md:w-full">
        <Image src={site.photo} alt={`Illustrated portrait of ${site.ownerName}`} fill sizes="220px" className="object-cover" unoptimized />
      </div>
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Hi, I&apos;m {site.ownerName.split(" ")[0]}.</h2>
        <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-2">
          <p>
            I design and build websites for small businesses: restaurants, salons, studios, shops and local services.
            I&apos;m based in {site.basedIn} and work with clients in India and English-speaking countries around the world.
          </p>
          <p>
            You talk directly to the person who builds your site. No account managers, no hand-offs, and no
            surprise invoices. I&apos;d rather show you what your website could look like than tell you, which is
            why every industry on this site has a live demo you can try.
          </p>
        </div>
      </div>
    </div>
  );
}
