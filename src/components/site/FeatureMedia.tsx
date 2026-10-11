"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useClientValue } from "@/components/shared/useClientValue";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import type { Feature } from "@/data/features";
import { unsplash, videos } from "@/lib/media";

const ChairMini = dynamic(() => import("@/components/three/ChairScene"), { ssr: false });
const BoltMini = dynamic(() => import("@/components/three/BoltScene"), { ssr: false });

/** A short muted clip that plays only while on screen (poster otherwise, and under reduced motion). */
function ClipLoop({ video }: { video: keyof typeof videos }) {
  const v = videos[video];
  const ref = useRef<HTMLVideoElement>(null);
  const allowed = useClientValue(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches) === true;

  useEffect(() => {
    const el = ref.current;
    if (!el || !allowed) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [allowed]);

  return (
    <>
      <Image src={v.poster} alt="" fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover" />
      {allowed ? (
        <video ref={ref} src={v.sd} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 size-full object-cover" />
      ) : null}
    </>
  );
}

export function FeatureMedia({ feature, alt }: { feature: Feature; alt: string }) {
  const m = feature.media;
  if (m.kind === "video") return <ClipLoop video={m.video} />;
  if (m.kind === "image")
    return <Image src={unsplash(m.image)} alt={alt} fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover" />;
  const poster = m.scene === "chair" ? "1658211312038-4293c7bdd37e" : "1607733067403-a0396fa4d3d0";
  return (
    <Scene3DGate
      className="absolute inset-0"
      render={(onReady) =>
        m.scene === "chair" ? <ChairMini compact onReady={onReady} /> : <BoltMini compact onReady={onReady} />
      }
      fallback={<Image src={unsplash(poster)} alt={alt} fill sizes="(min-width:1024px) 30vw, 92vw" className="object-cover" />}
    />
  );
}
