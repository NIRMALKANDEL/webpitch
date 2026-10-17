import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/shared/Analytics";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { site } from "@/data/site";
import { defaultDescription, defaultTitle, ogImage } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.brandName}`,
  },
  description: defaultDescription,
  applicationName: site.brandName,
  authors: [{ name: site.ownerName, url: site.portfolioUrl }],
  creator: site.ownerName,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  // Defaults for pages that don't set their own (each main page builds its own with pageMeta()).
  openGraph: {
    type: "website",
    siteName: site.brandName,
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage("default", defaultTitle)],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og/default.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0f",
};

// Runs before paint so the saved theme (dark by default) never flashes the wrong colours.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
