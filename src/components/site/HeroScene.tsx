"use client";

import { Image as DreiImage, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const W = 3.2;
const H = 2.0;
const R = 5.2;

function Frame({ url, angle, active }: { url: string; angle: number; active: boolean }) {
  return (
    <group position={[Math.sin(angle) * R, 0, Math.cos(angle) * R]} rotation={[0, angle, 0]}>
      <RoundedBox args={[W + 0.12, H + 0.34, 0.06]} radius={0.06} smoothness={4} position={[0, 0.1, -0.035]}>
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </RoundedBox>
      {/* window chrome dots */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-W / 2 + 0.14 + i * 0.13, H / 2 + 0.15, 0.001]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color={["#ff5f57", "#febc2e", "#28c840"][i]} />
        </mesh>
      ))}
      <DreiImage url={url} scale={[W, H]} radius={0.04} grayscale={active ? 0 : 0.55} toneMapped={false} />
    </group>
  );
}

function Carousel({ images, active, onReady }: { images: string[]; active: number; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const step = (Math.PI * 2) / images.length;
  const target = useRef(-active * step);
  const { pointer, invalidate } = useThree();
  const readyCalled = useRef(false);

  useEffect(() => {
    // Rotate the shortest way round to the chosen frame.
    const cur = group.current?.rotation.y ?? 0;
    let t = -active * step;
    while (t - cur > Math.PI) t -= Math.PI * 2;
    while (t - cur < -Math.PI) t += Math.PI * 2;
    target.current = t;
    invalidate();
  }, [active, step, invalidate]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (!readyCalled.current) {
      readyCalled.current = true;
      // Fade out the still fallback only after the first textured frame has rendered.
      requestAnimationFrame(onReady);
    }
    const k = 1 - Math.exp(-delta * 4);
    g.rotation.y += (target.current + pointer.x * 0.12 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.06 - g.rotation.x) * k;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
  });

  return (
    <group ref={group}>
      {images.map((url, i) => (
        <Frame key={url} url={url} angle={i * step} active={i === active} />
      ))}
    </group>
  );
}

export default function HeroScene({
  images,
  active,
  onReady,
}: {
  images: string[];
  active: number;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, R + 5.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="3D carousel of demo website previews"
      role="img"
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 5, 6]} intensity={1.2} />
      <Suspense fallback={null}>
        <Carousel images={images} active={active} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
