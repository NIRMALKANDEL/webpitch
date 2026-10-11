import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.brandName} — Websites built for your industry`,
    template: `%s | ${site.brandName}`,
  },
  description:
    "Independent web designer and developer. Try live website demos built for restaurants, salons, real estate, fashion, furniture and more, then get one made for your business.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafaf9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
