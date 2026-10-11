"use client";

import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { RoomItem, RoomStyle } from "./room-constants";

type Palette = { wall: string; floor: string; sofa: string; accent: string; rug: string; metal: string; wood: string; art: string };

export const PALETTES: Record<RoomStyle, Palette> = {
  japandi: { wall: "#ebe5da", floor: "#c9a47c", sofa: "#d8d0c2", accent: "#5b6b3a", rug: "#b8ab95", metal: "#26231f", wood: "#8a6544", art: "#c9b79c" },
  industrial: { wall: "#77726b", floor: "#5b4231", sofa: "#7b4a2b", accent: "#c2703d", rug: "#2f3033", metal: "#151515", wood: "#3c2a1e", art: "#d9a066" },
  coastal: { wall: "#e8f0f2", floor: "#e2d4bb", sofa: "#f3f0e8", accent: "#3d7ea6", rug: "#cfe0e6", metal: "#b9b9b9", wood: "#c9b08c", art: "#7fb3cf" },
};

/** Material whose colour eases toward `color`, so switching styles feels like a fade, not a cut. */
function Mat({ color, roughness = 0.7, metalness = 0, map, emissive }: { color: string; roughness?: number; metalness?: number; map?: THREE.Texture; emissive?: string }) {
  const m = useRef<THREE.MeshStandardMaterial>(null);
  const target = useMemo(() => new THREE.Color(color), [color]);
  useFrame((_, dt) => {
    m.current?.color.lerp(target, 1 - Math.exp(-dt * 5));
  });
  return <meshStandardMaterial ref={m} color={color} roughness={roughness} metalness={metalness} map={map} emissive={emissive ?? "#000"} emissiveIntensity={emissive ? 1.4 : 0} />;
}

/** Drops a piece of furniture into the room with a soft bounce when `on` becomes true. */
function Drop({ on, children, position = [0, 0, 0], rotation = 0 }: { on: boolean; children: React.ReactNode; position?: [number, number, number]; rotation?: number }) {
  const g = useRef<THREE.Group>(null);
  const v = useRef(0);
  useFrame((_, dt) => {
    const el = g.current;
    if (!el) return;
    const ty = on ? position[1] : position[1] + 3.5;
    // critically-damped-ish spring on y for a little landing bounce
    v.current += ((ty - el.position.y) * 60 - v.current * 9) * Math.min(dt, 0.05);
    el.position.y += v.current * Math.min(dt, 0.05);
    const s = THREE.MathUtils.damp(el.scale.x, on ? 1 : 0.001, 8, dt);
    el.scale.setScalar(s);
    el.visible = s > 0.01;
  });
  return (
    <group ref={g} position={[position[0], position[1] + 3.5, position[2]]} rotation={[0, rotation, 0]} scale={0.001}>
      {children}
    </group>
  );
}

function usePlanks() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const x = c.getContext("2d")!;
    for (let i = 0; i < 16; i++) {
      const shade = 225 + ((i * 37) % 30);
      x.fillStyle = `rgb(${shade},${shade},${shade})`;
      x.fillRect(0, i * 32, 512, 32);
      x.fillStyle = "rgba(0,0,0,0.18)";
      x.fillRect(0, i * 32, 512, 1.5);
      x.fillRect(((i * 173) % 400) + 40, i * 32, 1.5, 32);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Sofa({ p }: { p: Palette }) {
  return (
    <group>
      <RoundedBox args={[2.5, 0.42, 1]} radius={0.08} position={[0, 0.33, 0]} castShadow><Mat color={p.sofa} roughness={0.95} /></RoundedBox>
      <RoundedBox args={[2.5, 0.62, 0.26]} radius={0.1} position={[0, 0.76, -0.38]} castShadow><Mat color={p.sofa} roughness={0.95} /></RoundedBox>
      {[-1.18, 1.18].map((x) => (
        <RoundedBox key={x} args={[0.24, 0.52, 1]} radius={0.1} position={[x, 0.5, 0]} castShadow><Mat color={p.sofa} roughness={0.95} /></RoundedBox>
      ))}
      {[-0.55, 0.55].map((x) => (
        <RoundedBox key={x} args={[1.05, 0.16, 0.78]} radius={0.07} position={[x, 0.62, 0.06]} castShadow><Mat color={p.sofa} roughness={1} /></RoundedBox>
      ))}
      {[-0.7, 0.7].map((x) => (
        <RoundedBox key={x} args={[0.45, 0.4, 0.14]} radius={0.06} position={[x, 0.86, -0.18]} rotation={[-0.2, 0, x > 0 ? -0.12 : 0.12]} castShadow><Mat color={p.accent} roughness={1} /></RoundedBox>
      ))}
      {[-1.1, 1.1].map((x) => [-0.4, 0.4].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.06, z]}><cylinderGeometry args={[0.03, 0.025, 0.12, 8]} /><Mat color={p.metal} /></mesh>
      )))}
    </group>
  );
}

function Armchair({ p }: { p: Palette }) {
  return (
    <group>
      <RoundedBox args={[0.9, 0.38, 0.85]} radius={0.1} position={[0, 0.4, 0]} castShadow><Mat color={p.accent} roughness={0.95} /></RoundedBox>
      <RoundedBox args={[0.9, 0.6, 0.2]} radius={0.09} position={[0, 0.82, -0.34]} rotation={[-0.15, 0, 0]} castShadow><Mat color={p.accent} roughness={0.95} /></RoundedBox>
      {[-0.35, 0.35].map((x) => [-0.32, 0.32].map((z) => (
        <mesh key={`${x}${z}`} position={[x, 0.11, z]} rotation={[z * 0.3, 0, -x * 0.3]}><cylinderGeometry args={[0.025, 0.02, 0.24, 8]} /><Mat color={p.wood} /></mesh>
      )))}
    </group>
  );
}

function Table({ p }: { p: Palette }) {
  return (
    <group>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow><cylinderGeometry args={[0.55, 0.55, 0.05, 48]} /><Mat color={p.wood} roughness={0.45} /></mesh>
      <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.08, 0.16, 0.38, 16]} /><Mat color={p.metal} roughness={0.4} metalness={0.4} /></mesh>
      <mesh position={[0.15, 0.48, 0.1]} castShadow><cylinderGeometry args={[0.07, 0.06, 0.12, 20]} /><Mat color="#f2efe8" roughness={0.3} /></mesh>
      <mesh position={[-0.18, 0.445, -0.05]} rotation={[0, 0.4, 0]} castShadow><boxGeometry args={[0.32, 0.04, 0.24]} /><Mat color={p.accent} /></mesh>
    </group>
  );
}

function Lamp({ p }: { p: Palette }) {
  return (
    <group>
      <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.18, 0.2, 0.04, 24]} /><Mat color={p.metal} metalness={0.5} roughness={0.35} /></mesh>
      <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.015, 0.015, 1.6, 8]} /><Mat color={p.metal} metalness={0.5} roughness={0.35} /></mesh>
      <mesh position={[0, 1.62, 0]}><cylinderGeometry args={[0.16, 0.26, 0.3, 32, 1, true]} /><meshStandardMaterial color="#fff3dc" emissive="#ffd9a0" emissiveIntensity={1.2} side={THREE.DoubleSide} /></mesh>
      <pointLight position={[0, 1.5, 0]} intensity={2.2} distance={4} color="#ffc98a" />
    </group>
  );
}

function Plant() {
  const leaves = [0, 1, 2, 3, 4, 5, 6];
  return (
    <group>
      <mesh position={[0, 0.25, 0]} castShadow><cylinderGeometry args={[0.24, 0.18, 0.5, 24]} /><meshStandardMaterial color="#d8cfc0" roughness={0.8} /></mesh>
      {leaves.map((i) => (
        <mesh key={i} position={[Math.sin(i * 0.9) * 0.18, 0.75 + (i % 3) * 0.22, Math.cos(i * 0.9) * 0.18]} rotation={[Math.cos(i) * 0.6, i, Math.sin(i) * 0.6]} castShadow>
          <sphereGeometry args={[0.2, 12, 8]} />
          <meshStandardMaterial color={i % 2 ? "#4f6b3a" : "#3d5a2e"} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Art({ p }: { p: Palette }) {
  return (
    <group>
      <mesh castShadow><boxGeometry args={[1.3, 0.9, 0.04]} /><Mat color={p.metal} /></mesh>
      <mesh position={[0, 0, 0.025]}><planeGeometry args={[1.2, 0.8]} /><Mat color={p.art} roughness={0.9} /></mesh>
      <mesh position={[-0.15, -0.05, 0.03]}><circleGeometry args={[0.24, 40]} /><Mat color={p.accent} roughness={0.9} /></mesh>
    </group>
  );
}

function Shelf({ p }: { p: Palette }) {
  const books = ["#a24936", "#2e4a62", "#d9b26f", "#4f6b3a", "#f1ece2"];
  return (
    <group>
      {[0.9, 1.5].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow><boxGeometry args={[0.28, 0.04, 1.4]} /><Mat color={p.wood} roughness={0.5} /></mesh>
      ))}
      {books.map((c, i) => (
        <mesh key={c} position={[0, 1.07 + (i % 2) * 0.02, -0.5 + i * 0.13]} castShadow><boxGeometry args={[0.2, 0.3 + (i % 3) * 0.04, 0.1]} /><meshStandardMaterial color={c} roughness={0.8} /></mesh>
      ))}
      <mesh position={[0, 1.6, 0.35]} castShadow><sphereGeometry args={[0.09, 20, 20]} /><Mat color={p.accent} roughness={0.3} /></mesh>
    </group>
  );
}

function Room({ style, items }: { style: RoomStyle; items: Record<RoomItem, boolean> }) {
  const p = PALETTES[style];
  const planks = usePlanks();
  return (
    <group>
      {/* shell: floor, back wall, left wall with a sunny window */}
      <mesh position={[0, -0.05, 0]} receiveShadow><boxGeometry args={[6.4, 0.1, 6.4]} /><Mat color={p.floor} roughness={0.55} map={planks} /></mesh>
      <mesh position={[0, 1.6, -3.2]} receiveShadow><boxGeometry args={[6.4, 3.3, 0.12]} /><Mat color={p.wall} roughness={0.95} /></mesh>
      <mesh position={[-3.2, 1.6, 0]} receiveShadow><boxGeometry args={[0.12, 3.3, 6.4]} /><Mat color={p.wall} roughness={0.95} /></mesh>
      <mesh position={[0, 0.06, -3.12]}><boxGeometry args={[6.4, 0.12, 0.04]} /><Mat color={p.wood} /></mesh>
      <group position={[-3.13, 1.75, 0.9]}>
        <mesh><boxGeometry args={[0.06, 1.9, 1.7]} /><Mat color={p.metal} /></mesh>
        <mesh position={[0.035, 0, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[1.56, 1.76]} /><meshStandardMaterial color="#fffaf0" emissive="#fff4dc" emissiveIntensity={1.6} /></mesh>
        <mesh position={[0.05, 0, 0]}><boxGeometry args={[0.02, 1.76, 0.04]} /><Mat color={p.metal} /></mesh>
      </group>

      <Drop on={items.rug} position={[0.2, 0.012, -0.6]}>
        <RoundedBox args={[3.4, 0.024, 2.3]} radius={0.01} receiveShadow><Mat color={p.rug} roughness={1} /></RoundedBox>
      </Drop>
      <Drop on={items.sofa} position={[0.2, 0, -2.45]}><Sofa p={p} /></Drop>
      <Drop on={items.table} position={[0.2, 0, -0.75]}><Table p={p} /></Drop>
      <Drop on={items.armchair} position={[2, 0, -0.2]} rotation={-1.1}><Armchair p={p} /></Drop>
      <Drop on={items.lamp} position={[-1.75, 0, -2.6]}><Lamp p={p} /></Drop>
      <Drop on={items.plant} position={[2.55, 0, -2.6]}><Plant /></Drop>
      <Drop on={items.art} position={[0.2, 1.85, -3.11]}><Art p={p} /></Drop>
      <Drop on={items.shelf} position={[-2.98, 0, -1.2]}><Shelf p={p} /></Drop>
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

/** A small furnished living room. Styles recolour every surface; furniture drops in piece by piece. */
export default function RoomScene({ style, items, onReady }: { style: RoomStyle; items: Record<RoomItem, boolean>; onReady?: () => void }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [5.6, 3.6, 5.4], fov: 38 }}
      gl={{ antialias: true }}
      role="img"
      aria-label="3D living room. Drag to look around; use the buttons to change the style and add furniture."
      style={{ touchAction: "pan-y", cursor: "grab" }}
    >
      <color attach="background" args={["#f4f2ee"]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#fffaf0", "#b8a58c", 0.5]} />
      <directionalLight
        position={[-7, 6, 2.5]}
        intensity={2.6}
        color="#fff1d6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />
      <Environment resolution={64}>
        <Lightformer intensity={1.5} position={[0, 4, 4]} scale={[8, 3, 1]} />
      </Environment>
      <Room style={style} items={items} />
      <ContactShadows position={[0, 0.005, 0]} opacity={0.35} scale={7} blur={2.2} far={1.5} />
      <OrbitControls
        target={[0, 0.9, -0.8]}
        enablePan={false}
        minDistance={4.5}
        maxDistance={10}
        minPolarAngle={0.5}
        maxPolarAngle={1.35}
        minAzimuthAngle={0.05}
        maxAzimuthAngle={1.4}
        enableDamping
      />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
