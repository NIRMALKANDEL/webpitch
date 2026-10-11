import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Cinzel({ subsets: ["latin"], variable: "--d-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("real-estate");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="real-estate" fontClassName={`${display.variable} ${body.variable}`} style={{ ["--focus" as string]: "#0F766E", ["--d-mono" as string]: "var(--d-body)" }}>
      {children}
    </DemoShell>
  );
}
