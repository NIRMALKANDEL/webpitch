"use client";

import { Image as DreiImage, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { quietShaderWarnings } from "@/components/three/constants";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const W = 3.6;
const H = 2.25;

/** Coverflow: the active frame sits front and centre, neighbours fan out behind it. */
function Frame({ url, offset }: { url: string; offset: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const el = g.current;
    if (!el) return;
    const k = 1 - Math.exp(-dt * 6);
    const d = Math.max(-2.5, Math.min(2.5, offset));
    el.position.x += (d * 2.1 - el.position.x) * k;
    el.position.z += (-Math.abs(d) * 1.8 - el.position.z) * k;
    el.rotation.y += (-d * 0.45 - el.rotation.y) * k;
    el.visible = Math.abs(offset) <= 2.2;
  });
  return (
    <group ref={g} position={[offset * 2.1, 0, -Math.abs(offset) * 1.8]}>
      <RoundedBox args={[W + 0.14, H + 0.36, 0.05]} radius={0.06} smoothness={4} position={[0, 0.11, -0.03]}>
        <meshStandardMaterial color="#1c1b24" roughness={0.4} metalness={0.2} />
      </RoundedBox>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-W / 2 + 0.15 + i * 0.13, H / 2 + 0.16, 0.001]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color={["#ff5f57", "#febc2e", "#28c840"][i]} />
        </mesh>
      ))}
      <DreiImage url={url} scale={[W, H]} radius={0.04} grayscale={offset === 0 ? 0 : 0.6} toneMapped={false} />
    </group>
  );
}

function Carousel({ images, active, onReady }: { images: string[]; active: number; onReady: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const readyCalled = useRef(false);
  const n = images.length;
  useFrame((state) => {
    if (!readyCalled.current) {
      readyCalled.current = true;
      requestAnimationFrame(onReady);
    }
    const g = group.current;
    if (!g) return;
    g.rotation.y += (pointer.x * 0.12 - g.rotation.y) * 0.05;
    g.rotation.x += (-pointer.y * 0.06 - g.rotation.x) * 0.05;
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
  });
  return (
    <group ref={group}>
      {images.map((url, i) => {
        let d = i - active;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        return <Frame key={url} url={url} offset={d} />;
      })}
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
      onCreated={quietShaderWarnings}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 6.1], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-label="3D carousel of demo website previews"
      role="img"
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 5, 6]} intensity={1.2} />
      <Sparkles count={60} scale={[14, 6, 10]} size={2.5} speed={0.35} opacity={0.6} color="#9686ff" />
      <Suspense fallback={null}>
        <Carousel images={images} active={active} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
