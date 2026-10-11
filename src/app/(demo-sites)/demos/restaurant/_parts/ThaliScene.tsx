"use client";

import { ContactShadows, Environment, Float, Html, Lightformer, OrbitControls, Sparkles, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { unsplashSized } from "@/lib/media";
import * as THREE from "three";

type Bowl = { id: string; label: string; color: string; tex?: string };

function Curry({ tex, color, hover }: { tex: string; color: string; hover: boolean }) {
  const map = useTexture(unsplashSized(tex, 400), (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });
  return <meshStandardMaterial map={map} roughness={0.35} emissive={color} emissiveIntensity={hover ? 0.2 : 0.02} />;
}

function Katori({ bowl, angle, onAdd }: { bowl: Bowl; angle: number; onAdd?: (id: string) => void }) {
  const g = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const pop = useRef(0);
  const r = 1.55;
  useFrame((_, dt) => {
    if (!g.current) return;
    const lift = hover ? 0.18 : 0;
    g.current.position.y += (0.12 + lift - g.current.position.y) * (1 - Math.exp(-dt * 10));
    g.current.scale.setScalar(1 + pop.current * 0.25);
    pop.current = Math.max(0, pop.current - dt * 3);
  });
  return (
    <group
      ref={g}
      position={[Math.cos(angle) * r, 0.12, Math.sin(angle) * r]}
      onClick={(e) => { if (!onAdd) return; e.stopPropagation(); onAdd(bowl.id); pop.current = 1; }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
    >
      <mesh castShadow>
        <cylinderGeometry args={[0.46, 0.34, 0.26, 40, 1, true]} />
        <meshStandardMaterial color="#e6b450" metalness={0.6} roughness={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.12, 0]}><cylinderGeometry args={[0.34, 0.34, 0.02, 40]} /><meshStandardMaterial color="#d9a443" metalness={0.6} roughness={0.3} /></mesh>
      {/* curry surface with a swirl of cream */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.43, 40]} />
        {bowl.tex ? <Suspense fallback={<meshStandardMaterial color={bowl.color} />}><Curry tex={bowl.tex} color={bowl.color} hover={hover} /></Suspense> : <meshStandardMaterial color={bowl.color} roughness={0.35} />}
      </mesh>
      <mesh visible={!bowl.tex} position={[0.08, 0.09, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.022, 8, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color="#fff6e0" roughness={0.6} />
      </mesh>
      <Html center position={[0, 0.55, 0]} distanceFactor={6} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
        <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold shadow-lg transition ${hover ? "bg-[#12372A] text-white" : "bg-white/90 text-[#12372A]"}`}>
          {hover && onAdd ? `+ Add ${bowl.label}` : bowl.label}
        </span>
      </Html>
    </group>
  );
}

function Thali({ bowls, onAdd }: { bowls: Bowl[]; onAdd?: (id: string) => void }) {
  return (
    <group>
      {/* brass plate */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[2.35, 2.25, 0.1, 96]} />
        <meshStandardMaterial color="#f0c25a" metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.05, 12, 120]} />
        <meshStandardMaterial color="#d9a443" metalness={0.6} roughness={0.25} />
      </mesh>
      {/* rice mound */}
      <mesh position={[0, 0.06, 0]} scale={[0.85, 0.42, 0.85]} castShadow>
        <sphereGeometry args={[0.7, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fbf7ee" roughness={0.95} />
      </mesh>
      <mesh position={[0.05, 0.35, 0.05]}><sphereGeometry args={[0.06, 12, 12]} /><meshStandardMaterial color="#3f7a2c" /></mesh>
      {/* naan */}
      <mesh position={[0.2, 0.12, 0.95]} rotation={[-0.15, 0.4, 0.05]} scale={[0.75, 0.05, 0.45]} castShadow>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#e9c27a" roughness={0.85} />
      </mesh>
      {bowls.map((b, i) => (
        <Katori key={b.id} bowl={b} angle={(i / bowls.length) * Math.PI * 2 - Math.PI / 2 - 0.6} onAdd={onAdd} />
      ))}
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

export default function ThaliScene({ bowls, onAdd, onReady }: { bowls: Bowl[]; onAdd?: (id: string) => void; onReady?: () => void }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 5.4, 7.2], fov: 38 }} gl={{ antialias: true, alpha: true }} role="img" aria-label="3D thali plate. Tap a bowl to add that dish to your order, or drag to spin the plate." style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 6, 3]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[6, 2, 1]} color="#fff3d6" />
        <Lightformer intensity={2} position={[-4, 1, 0]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} color="#ffb347" />
      </Environment>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <Thali bowls={bowls} onAdd={onAdd} />
      </Float>
      {/* rising steam */}
      <Sparkles count={40} scale={[4, 2.5, 4]} position={[0, 1.4, 0]} size={4} speed={0.5} opacity={0.5} color="#ffe9c7" />
      <ContactShadows position={[0, -0.3, 0]} opacity={0.35} scale={8} blur={2.4} far={2} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} minPolarAngle={0.5} maxPolarAngle={1.2} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
