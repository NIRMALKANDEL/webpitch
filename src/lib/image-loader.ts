"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs) {
  const q = quality ?? 72;
  if (src.startsWith("https://images.unsplash.com/")) {
    return `${src}?auto=format&fit=crop&w=${width}&q=${q}`;
  }
  if (src.startsWith("https://images.pexels.com/")) {
    return `${src}?auto=compress&cs=tinysrgb&w=${width}`;
  }
  // Local files in /public are served as-is; the width param satisfies next/image and is ignored by the server.
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
