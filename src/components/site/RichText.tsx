import Link from "next/link";

/** Renders text with [label](url) links. Internal paths use <Link>, external URLs open in a new tab. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return part;
        const [, label, href] = m;
        const cls = "font-medium text-ink underline underline-offset-4 hover:text-accent";
        return href.startsWith("/") ? (
          <Link key={i} href={href} className={cls}>
            {label}
          </Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {label}
          </a>
        );
      })}
    </>
  );
}
