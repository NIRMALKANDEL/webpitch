import { Bricolage_Grotesque, Geist } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--f-sans", display: "swap" });

/** Personalised sample websites (/for/<slug>). No main-site nav: the page should feel like the business's own site. */
export default function PitchLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${sans.variable} min-h-screen font-sans`}>{children}</div>;
}
