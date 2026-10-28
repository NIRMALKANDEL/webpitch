import { demoBySlug } from "@/data/demos";

export default function BrightloopDemo() {
  const demo = demoBySlug("brightloop")!;
  return (
    <>
      <h1 className="sr-only">{demo.brand}: social media agency demo website</h1>
      {/* The live site, full-screen. The demo bar from DemoShell floats above it. */}
      <iframe
        src={demo.embedUrl}
        title={`${demo.brand} demo website`}
        className="fixed inset-0 block h-dvh w-full border-0"
        allow="fullscreen"
      />
    </>
  );
}
