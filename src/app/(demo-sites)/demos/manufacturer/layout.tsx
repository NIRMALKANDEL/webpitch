import type { Metadata } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--d-display", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--d-mono", display: "swap" });

export const metadata: Metadata = demoMetadata("manufacturer");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="manufacturer" fontClassName={`${display.variable} ${mono.variable}`} className="bg-[#F8FAFC] text-[#0F172A]" style={{ ["--focus" as string]: "#0369A1", ["--d-body" as string]: "var(--d-display)" }}>
      {children}
    </DemoShell>
  );
}
