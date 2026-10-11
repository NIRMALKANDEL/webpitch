import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Outfit({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--d-display", display: "swap" });
const body = Work_Sans({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("coaching");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="coaching" fontClassName={`${display.variable} ${body.variable}`} className="bg-white text-[#1C1917]" style={{ ["--focus" as string]: "#D97706" }}>
      {children}
    </DemoShell>
  );
}
