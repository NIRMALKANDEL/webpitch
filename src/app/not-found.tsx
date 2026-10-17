import { Bricolage_Grotesque, Geist } from "next/font/google";
import Link from "next/link";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--f-sans", display: "swap" });

export default function NotFound() {
  return (
    <main className={`${display.variable} ${sans.variable} grid min-h-screen place-items-center bg-paper px-4 font-sans text-ink`}>
      <div className="max-w-xl text-center">
        <p className="font-display text-sm font-semibold text-accent">404</p>
        <h1 className="mt-3 font-display text-5xl leading-[1.02] font-semibold tracking-tight text-balance">
          This page doesn&apos;t exist — but your website could.
        </h1>
        <p className="mt-4 text-lg text-ink-2">The link may be old or mistyped. Here are some good places to go instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link href="/demos" className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-semibold text-paper">
            Explore Demos
          </Link>
          <Link href="/industries" className="inline-flex min-h-12 items-center rounded-full border border-ink/15 bg-surface px-6 font-semibold">
            Industries
          </Link>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full px-6 font-semibold underline-offset-4 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
