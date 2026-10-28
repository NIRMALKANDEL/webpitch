import type { Metadata } from "next";
import { DemoShell, demoMetadata } from "@/components/shared/DemoShell";

export const metadata: Metadata = demoMetadata("brightloop");

/** Brightloop is its own website; this route shows it full-screen with the demo bar on top. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DemoShell slug="brightloop" fontClassName="" className="bg-[#140B0F] text-[#F5EFE9]">
      {children}
    </DemoShell>
  );
}
