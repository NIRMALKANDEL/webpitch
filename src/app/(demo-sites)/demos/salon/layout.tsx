import type { Metadata } from "next";
import { DM_Sans, Marcellus } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Marcellus({ subsets: ["latin"], weight: "400", variable: "--d-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("salon");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="salon" fontClassName={`${display.variable} ${body.variable}`} className="bg-[#FDF2F8] text-[#831843]" style={{ ["--focus" as string]: "#BE185D" }}>
      {children}
    </DemoShell>
  );
}
