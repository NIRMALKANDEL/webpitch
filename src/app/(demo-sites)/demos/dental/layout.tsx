import type { Metadata } from "next";
import { Lexend, Newsreader } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Newsreader({ subsets: ["latin"], variable: "--d-display", display: "swap" });
const body = Lexend({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("dental");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="dental" fontClassName={`${display.variable} ${body.variable}`} className="bg-white text-[#0B1F1C]" style={{ ["--focus" as string]: "#3BA58B" }}>
      {children}
    </DemoShell>
  );
}
