import type { Metadata } from "next";
import { Bungee, Familjen_Grotesk } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Bungee({ subsets: ["latin"], weight: "400", variable: "--d-display", display: "swap" });
const body = Familjen_Grotesk({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("energy-drink");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="energy-drink" fontClassName={`${display.variable} ${body.variable}`} className="text-black" style={{ ["--focus" as string]: "#000" }}>
      {children}
    </DemoShell>
  );
}
