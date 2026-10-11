"use client";

import { useEffect, useRef, useState } from "react";

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

/** True when this device should get the real-time 3D scene rather than the still fallback. */
export function canRender3D(): boolean {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const nav = navigator as Nav;
    if (nav.connection?.saveData) return false;
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Shows `fallback` first (same box, so no layout shift). Once the container is near the viewport and
 * the device can handle WebGL, mounts the scene from `render` underneath and fades the fallback out
 * only after the scene calls `onReady` (textures loaded, first frame drawn). `render` should return a
 * next/dynamic (ssr: false) component so three.js never lands in the initial bundle.
 */
export function Scene3DGate({
  render,
  fallback,
  className = "",
}: {
  render: (onReady: () => void) => React.ReactNode;
  fallback: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={/\babsolute\b/.test(className) ? className : `relative ${className}`}>
      {mount ? <div className="absolute inset-0">{render(() => setReady(true))}</div> : null}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-hidden={ready}
      >
        {fallback}
      </div>
    </div>
  );
}
