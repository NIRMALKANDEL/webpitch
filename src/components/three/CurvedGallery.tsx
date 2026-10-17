"use client";

import { Image as DreiImage, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { quietShaderWarnings } from "./constants";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";

function Panel({ url, angle, radius, w, h, onOpen, index }: { url: string; angle: number; radius: number; w: number; h: number; onOpen?: (i: number) => void; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const s = hover ? 1.06 : 1;
    ref.current.scale.lerp(new THREE.Vector3(w * s, h * s, 1), 1 - Math.exp(-dt * 8));
  });
  return (
    <group position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]} rotation={[0, angle + Math.PI, 0]}>
      <DreiImage
        ref={ref}
        url={url}
        scale={[w, h]}
        radius={0.06}
        grayscale={hover ? 0 : 0.25}
        toneMapped={false}
        onClick={(e) => { e.stopPropagation(); onOpen?.(index); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
      />
    </group>
  );
}

function Ready({ onReady }: { onReady?: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current && onReady) {
      done.current = true;
      requestAnimationFrame(onReady);
    }
  });
  return null;
}

/**
 * Immersive 3D gallery: the viewer stands inside a ring of photos and drags to look around.
 * Used by the photography (landscape frames) and fashion (portrait frames) demos.
 */
export default function CurvedGallery({ images, portrait = false, background, onOpen, onReady }: { images: string[]; portrait?: boolean; background?: string; onOpen?: (i: number) => void; onReady?: () => void }) {
  const radius = portrait ? 4.9 : 5.6;
  const w = portrait ? 1.6 : 2.4;
  const h = portrait ? 2.2 : 1.6;
  // Repeat short sets so the ring is always full.
  const ring = images.length < 10 ? [...images, ...images] : images;
  return (
    <Canvas onCreated={quietShaderWarnings} dpr={[1, 1.75]} camera={{ position: [0, 0, 0.01], fov: 70 }} gl={{ antialias: true, alpha: !background }} role="img" aria-label="Immersive 3D gallery. Drag to look around; click a photo to open it." style={{ touchAction: "pan-y", cursor: "grab" }}>
      {background ? <color attach="background" args={[background]} /> : null}
      <Suspense fallback={null}>
        {ring.map((url, i) => (
          <Panel key={url + i} url={url} index={i % images.length} angle={(i / ring.length) * Math.PI * 2} radius={radius} w={w} h={h} onOpen={onOpen} />
        ))}
        <Ready onReady={onReady} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={-0.35} autoRotate autoRotateSpeed={-0.6} minPolarAngle={Math.PI / 2 - 0.25} maxPolarAngle={Math.PI / 2 + 0.25} target={[0, 0, 0]} />
    </Canvas>
  );
}
