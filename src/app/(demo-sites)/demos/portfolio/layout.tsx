import type { Metadata } from "next";
import { Sora, Unbounded } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Unbounded({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--d-display", display: "swap" });
const body = Sora({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("portfolio");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="portfolio" fontClassName={`${display.variable} ${body.variable}`} className="bg-[#07070B] text-[#EDEDF5]" style={{ ["--focus" as string]: "#22D3EE" }}>
      {children}
    </DemoShell>
  );
}
