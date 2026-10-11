"use client";

import { ContactShadows, Environment, Float, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type Flavour = { id: string; name: string; tag: string; c1: string; c2: string; ink: string; bits: { color: string; shape: "slice" | "chili" | "berry" | "leaf" | "ice" }[] };

/** Paints the can label on a canvas, so each flavour gets its own artwork without image downloads. */
function makeLabel(f: Flavour) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 1024, 512);
  grad.addColorStop(0, f.c1);
  grad.addColorStop(1, f.c2);
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 512);
  // halftone dots
  g.fillStyle = "rgba(255,255,255,0.12)";
  for (let y = 0; y < 512; y += 22) for (let x = (y / 22) % 2 ? 11 : 0; x < 1024; x += 22) { g.beginPath(); g.arc(x, y, 4, 0, Math.PI * 2); g.fill(); }
  // lightning bolt
  g.fillStyle = f.ink;
  g.beginPath();
  [[560, 60], [470, 260], [540, 260], [480, 460], [640, 220], [565, 220], [620, 60]].forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  g.fill();
  g.save();
  g.translate(250, 256);
  g.rotate(-Math.PI / 2);
  g.textAlign = "center";
  g.fillStyle = "#ffffff";
  g.font = "900 92px Impact, 'Arial Black', sans-serif";
  g.fillText("FIZZBOLT", 0, 30);
  g.restore();
  g.fillStyle = f.ink;
  g.font = "800 40px 'Arial Black', sans-serif";
  g.textAlign = "center";
  g.fillText(f.name.toUpperCase(), 820, 230);
  g.font = "600 26px Arial, sans-serif";
  g.fillText("ENERGY · 250 ML", 820, 280);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function Can({ flavour, spin }: { flavour: Flavour; spin?: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const label = useMemo(() => makeLabel(flavour), [flavour]);
  useEffect(() => () => label.dispose(), [label]);
  const body = useMemo(() => {
    const pts = [
      [0, -1.25], [0.5, -1.25], [0.58, -1.18], [0.6, -1.05], [0.6, 1.0], [0.56, 1.12], [0.47, 1.2], [0.47, 1.26], [0, 1.26],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 96);
  }, []);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    if (spin && spin.current !== null) g.rotation.y = spin.current * Math.PI * 4;
    else g.rotation.y += dt * 0.6;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.15 + 0.12, 0.05);
  });
  return (
    <group ref={group}>
      <mesh geometry={body} castShadow>
        <meshStandardMaterial color="#d9dde3" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.603, 0.603, 1.95, 96, 1, true]} />
        <meshPhysicalMaterial map={label} metalness={0.45} roughness={0.28} clearcoat={1} clearcoatRoughness={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* ring pull */}
      <mesh position={[0.1, 1.27, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.025, 12, 40]} />
        <meshStandardMaterial color="#c0c6ce" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Bit({ shape, color, position, speed }: { shape: Flavour["bits"][number]["shape"]; color: string; position: [number, number, number]; speed: number }) {
  return (
    <Float speed={speed} rotationIntensity={2.5} floatIntensity={2.2} position={position}>
      {shape === "ice" ? (
        <RoundedBox args={[0.42, 0.42, 0.42]} radius={0.07}>
          <meshPhysicalMaterial color="#e0f7ff" transmission={0.9} roughness={0.05} thickness={0.5} transparent />
        </RoundedBox>
      ) : shape === "slice" ? (
        <mesh rotation={[0.6, 0.4, 0]}><cylinderGeometry args={[0.32, 0.32, 0.08, 32, 1, false, 0, Math.PI]} /><meshStandardMaterial color={color} roughness={0.5} /></mesh>
      ) : shape === "chili" ? (
        <mesh rotation={[0, 0, 0.8]}><capsuleGeometry args={[0.08, 0.5, 8, 16]} /><meshStandardMaterial color={color} roughness={0.35} /></mesh>
      ) : shape === "leaf" ? (
        <mesh scale={[0.32, 0.06, 0.18]}><sphereGeometry args={[1, 24, 16]} /><meshStandardMaterial color={color} roughness={0.6} /></mesh>
      ) : (
        <mesh><sphereGeometry args={[0.16, 24, 24]} /><meshStandardMaterial color={color} roughness={0.25} /></mesh>
      )}
    </Float>
  );
}

const SPOTS: [number, number, number][] = [[-1.7, 1.1, -0.4], [1.8, 0.9, -0.6], [-1.5, -1.0, 0.4], [1.6, -1.2, 0.2], [-0.9, 1.9, -1], [1.0, 1.9, -1.2], [-2.2, -0.1, -1], [2.3, 0.0, -0.8]];

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

export default function CanScene({ flavour, spin, interactive = true, onReady }: { flavour: Flavour; spin?: React.RefObject<number>; interactive?: boolean; onReady?: () => void }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 0.3, 6.2], fov: 38 }} gl={{ antialias: true, alpha: true }} role="img" aria-label={`3D ${flavour.name} can surrounded by floating ingredients${interactive ? ". Drag to spin it." : ""}`} style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} castShadow />
      <Environment resolution={256}>
        <Lightformer intensity={4} position={[0, 4, 3]} scale={[8, 1.5, 1]} />
        <Lightformer intensity={3} color={flavour.c1} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} />
        <Lightformer intensity={3} color={flavour.c2} position={[4, 0, 2]} rotation-y={-Math.PI / 2} scale={[3, 6, 1]} />
      </Environment>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <Can flavour={flavour} spin={spin} />
      </Float>
      {flavour.bits.flatMap((b, i) => [SPOTS[i * 2 % SPOTS.length], SPOTS[(i * 2 + 1) % SPOTS.length]].map((p, j) => <Bit key={`${flavour.id}${i}${j}`} shape={b.shape} color={b.color} position={p} speed={1.5 + i * 0.4 + j * 0.3} />))}
      <ContactShadows position={[0, -1.9, 0]} opacity={0.35} scale={6} blur={2.6} far={2.5} />
      {interactive ? <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.8} /> : null}
      <Ready onReady={onReady} />
    </Canvas>
  );
}
