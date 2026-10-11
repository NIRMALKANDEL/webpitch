"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { VideoSource } from "@/lib/media";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** Picks a rendition for this screen and connection. Returns null when video should not play at all. */
function pickSource(v: VideoSource): string | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (conn?.saveData) return null;
  const slow = conn?.effectiveType && /(^|-)2g|3g/.test(conn.effectiveType);
  const w = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  if (slow || window.innerWidth < 768) return v.sd;
  if (w >= 2400 && window.innerWidth >= 1600) return v.uhd;
  return v.hd;
}

/**
 * Muted, looping background video. The poster image is always rendered first (it is the LCP element),
 * and the video only loads once the component is on screen. Pauses off-screen and has a visible
 * pause control, as required for motion longer than five seconds.
 */
export function BackgroundVideo({
  video,
  className = "",
  posterAlt = "",
  controlsClassName = "bottom-4 right-4",
  overlay,
}: {
  video: VideoSource;
  className?: string;
  posterAlt?: string;
  controlsClassName?: string;
  overlay?: React.ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        // First time on screen: choose a rendition (empty string = poster only).
        if (e.isIntersecting) setSrc((s) => s ?? pickSource(video) ?? "");
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    const shouldPlay = visible && !paused && document.visibilityState === "visible";
    if (shouldPlay) v.play().catch(() => setPaused(true));
    else v.pause();
    const onVis = () => {
      if (document.visibilityState === "hidden") v.pause();
      else if (visible && !paused) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [visible, paused, src]);

  return (
    <div ref={wrap} className={`overflow-hidden ${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- poster must render before any JS to be the LCP element */}
      <img
        src={`${video.poster}?auto=compress&cs=tinysrgb&w=1600`}
        alt={posterAlt}
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
      />
      {src ? (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}
      {overlay}
      {src ? (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className={`absolute z-10 grid size-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65 ${controlsClassName}`}
          aria-label={paused ? "Play background video" : "Pause background video"}
        >
          {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>
      ) : null}
    </div>
  );
}
