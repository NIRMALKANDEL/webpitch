import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--d-display", display: "swap" });
const body = Archivo({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("fashion");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="fashion" fontClassName={`${display.variable} ${body.variable}`} className="bg-white text-[#0A0A0A]" style={{ ["--focus" as string]: "#BE185D" }}>
      {children}
    </DemoShell>
  );
}
