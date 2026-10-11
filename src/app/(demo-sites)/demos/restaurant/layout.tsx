import type { Metadata } from "next";
import { Karla, Playfair_Display_SC } from "next/font/google";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

const display = Playfair_Display_SC({ subsets: ["latin"], weight: ["400", "700"], variable: "--d-display", display: "swap" });
const body = Karla({ subsets: ["latin"], variable: "--d-body", display: "swap" });

export const metadata: Metadata = demoMetadata("restaurant");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell
      slug="restaurant"
      fontClassName={`${display.variable} ${body.variable}`}
      className="bg-white text-[#1b1b1b]"
      style={{ ["--focus" as string]: "#E3A21A" }}
    >
      {children}
    </DemoShell>
  );
}
