import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--d-display", display: "swap" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("home-services");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="home-services" fontClassName={`${display.variable} ${body.variable}`} className="bg-white text-[#0F172A]" style={{ ["--focus" as string]: "#C2410C" }}>
      {children}
    </DemoShell>
  );
}
