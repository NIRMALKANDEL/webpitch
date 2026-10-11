import type { Metadata } from "next";
import { Cormorant_Infant, Great_Vibes, Jost } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Cormorant_Infant({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--d-display", display: "swap" });
const body = Jost({ subsets: ["latin"], variable: "--d-body", display: "swap" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--d-mono", display: "swap" });

export const metadata: Metadata = demoMetadata("photography");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell
      slug="photography"
      fontClassName={`${display.variable} ${body.variable} ${script.variable}`}
      className="bg-[#121212] text-[#F2EFEA]"
      style={{ ["--focus" as string]: "#C9A3A0" }}
    >
      {children}
    </DemoShell>
  );
}
