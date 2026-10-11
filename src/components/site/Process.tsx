const steps = [
  { title: "Free 20-minute call", time: "Day 1", text: "On WhatsApp, Google Meet or Zoom, at a time that suits your time zone. You tell me about your business; I tell you what I'd build and what it costs." },
  { title: "Pick a demo and customise", time: "Day 1–2", text: "We start from the demo you liked and decide on your colours, sections and features. You get a fixed quote and a date." },
  { title: "You send content, I design", time: "Day 2–5", text: "Send your logo, photos, prices and text. I design your homepage first so you can see the direction early." },
  { title: "Build and review", time: "Week 1–3", text: "I build the full site and share a private preview link. Two or three rounds of changes are included." },
  { title: "Launch and handover", time: "Launch day", text: "I connect your domain, test everything on real phones and hand over all access. You own it all." },
];

export function Process() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[14px] border border-muted bg-muted md:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col bg-white p-6">
          <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-lg leading-snug font-semibold">{s.title}</h3>
          <p className="mt-1 text-xs text-ink-3">{s.time}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
