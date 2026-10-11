import type { Metadata } from "next";
import { Josefin_Sans, Lora } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Josefin_Sans({ subsets: ["latin"], weight: ["200", "300", "400", "600"], variable: "--d-display", display: "swap" });
const body = Lora({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("interior");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="interior" fontClassName={`${display.variable} ${body.variable}`} className="bg-white text-[#171717]" style={{ ["--focus" as string]: "#5B6B3A" }}>
      {children}
    </DemoShell>
  );
}
