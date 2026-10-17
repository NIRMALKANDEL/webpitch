"use client";

import { ContactShadows, Environment, Html, Lightformer, MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { quietShaderWarnings } from "@/components/three/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { inr, type Unit } from "./data";

const H = 0.34;
const W = 2.2;
const D = 1.6;

/** Deterministic random so the neighbourhood and lit windows never jump between renders. */
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function Neighbourhood({ night }: { night: boolean }) {
  const blocks = useMemo(() => {
    const r = rng(11);
    const out: { p: [number, number, number]; s: [number, number, number] }[] = [];
    for (let i = 0; i < 26; i++) {
      const a = r() * Math.PI * 1.4 + Math.PI * 0.8;
      const dist = 5 + r() * 6;
      const h = 0.6 + r() * 2.6;
      out.push({ p: [Math.cos(a) * dist, h / 2, Math.sin(a) * dist - 2], s: [0.8 + r() * 1.2, h, 0.8 + r() * 1.2] });
    }
    return out;
  }, []);
  const trees = useMemo(() => {
    const r = rng(5);
    return Array.from({ length: 22 }, () => [(r() - 0.5) * 7, 0, 1.8 + r() * 1.6] as [number, number, number]);
  }, []);
  return (
    <group>
      {blocks.map((b, i) => (
        <mesh key={i} position={b.p} castShadow receiveShadow>
          <boxGeometry args={b.s} />
          <meshStandardMaterial color={night ? "#1e293b" : i % 3 ? "#e2e8f0" : "#cbd5e1"} roughness={0.8} emissive={night && i % 2 ? "#fbbf24" : "#000"} emissiveIntensity={night ? 0.08 : 0} />
        </mesh>
      ))}
      {trees.map((p, i) => (
        <group key={i} position={p} scale={0.7 + (i % 4) * 0.12}>
          <mesh position={[0, 0.15, 0]} castShadow><cylinderGeometry args={[0.03, 0.04, 0.3, 6]} /><meshStandardMaterial color="#6b4f3a" /></mesh>
          <mesh position={[0, 0.45, 0]} castShadow><icosahedronGeometry args={[0.24, 0]} /><meshStandardMaterial color={night ? "#14532d" : "#3f8f5a"} flatShading /></mesh>
        </group>
      ))}
    </group>
  );
}

function Floor({ n, selected, hovered, available, lit, night, units, onSelect, onHover, onPickUnit }: {
  n: number; selected: boolean; hovered: boolean; available: boolean; lit: boolean; night: boolean; units: Unit[];
  onSelect: (n: number) => void; onHover: (n: number | null) => void; onPickUnit: (u: Unit) => void;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    const tz = selected ? 1.25 : hovered ? 0.12 : 0;
    g.current.position.z += (tz - g.current.position.z) * (1 - Math.exp(-dt * 7));
  });
  const glass = selected ? "#5eead4" : hovered ? "#99f6e4" : night ? (lit ? "#fcd34d" : "#1e3a5f") : available ? "#a7d3e0" : "#94a3b8";
  const tiles = useMemo(() => {
    const list = [...units];
    while (list.length < 4) list.push(null as unknown as Unit);
    return list.slice(0, 4);
  }, [units]);
  return (
    <group
      ref={g}
      position={[0, n * H, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect(n); }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(n); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { onHover(null); document.body.style.cursor = ""; }}
    >
      {/* concrete slab */}
      <mesh position={[0, -H / 2 + 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[W + 0.12, 0.05, D + 0.12]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
      </mesh>
      {/* glass curtain wall */}
      <mesh castShadow>
        <boxGeometry args={[W, H - 0.05, D]} />
        <meshPhysicalMaterial color={glass} metalness={0.3} roughness={0.08} clearcoat={1} transparent opacity={selected ? 0.35 : 0.88} emissive={night && lit ? "#f59e0b" : selected ? "#0F766E" : "#000"} emissiveIntensity={night && lit ? 0.35 : selected ? 0.25 : 0} envMapIntensity={1.4} />
      </mesh>
      {/* balcony rail */}
      <mesh position={[0, -H / 2 + 0.1, D / 2 + 0.07]}>
        <boxGeometry args={[W + 0.1, 0.07, 0.015]} />
        <meshStandardMaterial color="#0B2540" metalness={0.6} roughness={0.3} transparent opacity={0.7} />
      </mesh>
      {selected
        ? tiles.map((u, i) => {
            const x = (i % 2 ? 0.5 : -0.5) * (W / 2 + 0.05);
            const z = (i < 2 ? -0.5 : 0.5) * (D / 2 + 0.05);
            return (
              <group key={i} position={[x, -H / 2 + 0.07, z]}>
                <mesh onClick={(e) => { e.stopPropagation(); if (u) onPickUnit(u); }}>
                  <boxGeometry args={[W / 2 - 0.08, 0.04, D / 2 - 0.08]} />
                  <meshStandardMaterial color={u ? "#0F766E" : "#cbd5e1"} emissive={u ? "#14b8a6" : "#000"} emissiveIntensity={u ? 0.3 : 0} />
                </mesh>
                <Html center position={[0, 0.12, 0]} distanceFactor={7} zIndexRange={[20, 0]}>
                  {u ? (
                    <button type="button" onClick={() => onPickUnit(u)} className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#0B2540] shadow-lg ring-1 ring-[#0F766E]">
                      {u.bhk} BHK · {inr(u.price)} · Visit →
                    </button>
                  ) : (
                    <span className="whitespace-nowrap rounded-full bg-slate-700/80 px-2 py-0.5 text-[10px] text-white">Sold</span>
                  )}
                </Html>
              </group>
            );
          })
        : null}
    </group>
  );
}

function Rig({ selected, resetKey }: { selected: number | null; resetKey: number }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const animating = useRef(true);
  useEffect(() => { animating.current = true; }, [selected, resetKey]);
  useFrame((state, dt) => {
    const c = controls.current;
    if (!c || !animating.current) return;
    const y = selected === null ? 2.6 : selected * H - 2.6 + 0.2;
    const camGoal = selected === null ? new THREE.Vector3(7.5, 4.8, 9.5) : new THREE.Vector3(3.2, y + 2.4, 5.6);
    const lookGoal = selected === null ? new THREE.Vector3(0, 0.8, 0) : new THREE.Vector3(0, y, 0.9);
    const k = 1 - Math.exp(-dt * 3);
    state.camera.position.lerp(camGoal, k);
    c.target.lerp(lookGoal, k);
    c.update();
    if (state.camera.position.distanceTo(camGoal) < 0.02) animating.current = false;
  });
  return <OrbitControls ref={controls} enablePan={false} enableZoom={false} enableDamping autoRotate={selected === null} autoRotateSpeed={0.5} minPolarAngle={0.5} maxPolarAngle={1.45} onStart={() => (animating.current = false)} />;
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

export default function TowerScene({ floors, selected, availableFloors, onSelect, onReady, units = [], onPickUnit = () => {}, night = false, resetKey = 0 }: {
  floors: number; selected: number | null; availableFloors: number[]; onSelect: (n: number) => void; onReady?: () => void;
  units?: Unit[]; onPickUnit?: (u: Unit) => void; night?: boolean; resetKey?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const lit = useMemo(() => {
    const r = rng(3);
    return Array.from({ length: floors + 1 }, () => r() > 0.35);
  }, [floors]);
  const sky = night ? "#0b1324" : "#dbeafe";
  return (
    <Canvas shadows="percentage" onCreated={quietShaderWarnings} dpr={[1, 1.75]} camera={{ position: [7.5, 4.8, 9.5], fov: 38 }} gl={{ antialias: true }} role="img" aria-label="3D model of Harbourline Residences by the water. Use the floor buttons to choose a floor." style={{ touchAction: "pan-y" }}>
      <color attach="background" args={[sky]} />
      <fog attach="fog" args={[sky, 14, 30]} />
      <hemisphereLight args={[night ? "#334155" : "#ffffff", night ? "#0f172a" : "#9ca3af", night ? 0.25 : 0.7]} />
      <directionalLight position={night ? [-4, 6, -3] : [6, 9, 5]} intensity={night ? 0.25 : 2.2} color={night ? "#93c5fd" : "#fff7e6"} castShadow shadow-mapSize={[2048, 2048]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} />
      <Environment resolution={256}>
        <Lightformer intensity={night ? 0.4 : 2.5} position={[0, 5, 5]} scale={[10, 3, 1]} />
        <Lightformer intensity={night ? 0.8 : 1} color={night ? "#f59e0b" : "#bae6fd"} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
      </Environment>

      <group position={[0, -2.6, 0]}>
        {/* plinth + podium garden */}
        <mesh position={[0, 0.06, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.6, 0.12, 3.2]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.9} />
        </mesh>
        {/* land */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -3]} receiveShadow>
          <planeGeometry args={[40, 16]} />
          <meshStandardMaterial color={night ? "#1f2937" : "#c7d8c3"} roughness={1} />
        </mesh>
        {/* backwaters */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 8]}>
          <planeGeometry args={[40, 12]} />
          <MeshReflectorMaterial resolution={512} blur={[300, 100]} mixBlur={1} mixStrength={night ? 2 : 6} roughness={0.6} depthScale={0.6} minDepthThreshold={0.4} maxDepthThreshold={1.4} color={night ? "#0c1d33" : "#3b7ea1"} metalness={0.4} mirror={0.6} />
        </mesh>
        <Neighbourhood night={night} />
        <group position={[0, 0.12 + H / 2, 0]}>
          {Array.from({ length: floors }, (_, i) => i + 1).map((n) => (
            <Floor key={n} n={n - 1} selected={selected === n} hovered={hover === n} available={availableFloors.includes(n)} lit={lit[n]} night={night} units={units.filter((u) => u.floor === n)} onSelect={() => onSelect(n)} onHover={(h) => setHover(h === null ? null : n)} onPickUnit={onPickUnit} />
          ))}
          {/* rooftop with infinity pool */}
          <group position={[0, floors * H - H / 2 + 0.05, 0]}>
            <mesh castShadow><boxGeometry args={[W + 0.12, 0.08, D + 0.12]} /><meshStandardMaterial color="#f8fafc" /></mesh>
            <mesh position={[0.35, 0.05, 0.15]}><boxGeometry args={[1.2, 0.03, 0.8]} /><meshPhysicalMaterial color="#22d3ee" roughness={0.05} metalness={0.2} emissive="#0891b2" emissiveIntensity={night ? 0.6 : 0.1} /></mesh>
          </group>
        </group>
        <ContactShadows position={[0, 0.13, 0]} opacity={0.4} scale={8} blur={2} far={6} />
      </group>
      <Rig selected={selected} resetKey={resetKey} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
