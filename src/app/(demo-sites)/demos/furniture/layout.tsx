import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Fraunces({ subsets: ["latin"], variable: "--d-display", display: "swap" });
const body = Nunito_Sans({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("furniture");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="furniture" fontClassName={`${display.variable} ${body.variable}`} className="bg-[#F5F5F4] text-[#1C1917]" style={{ ["--focus" as string]: "#6B4226" }}>
      {children}
    </DemoShell>
  );
}
