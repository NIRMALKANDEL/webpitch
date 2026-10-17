"use client";

import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { quietShaderWarnings } from "./constants";
import { useRef, useState } from "react";
import * as THREE from "three";

const PALETTE = ["#8B5CF6", "#22D3EE", "#F472B6", "#A3E635"];

function Core() {
  const mesh = useRef<THREE.Mesh>(null);
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const target = useRef(new THREE.Color(PALETTE[0]));
  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += dt * 0.25;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, state.pointer.y * 0.4, 0.05);
    const s = hover ? 1.12 : 1;
    m.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-dt * 6));
    const mat = m.material as THREE.MeshPhysicalMaterial;
    mat.color.lerp(target.current, 1 - Math.exp(-dt * 4));
  });
  return (
    <mesh
      ref={mesh}
      onClick={(e) => {
        e.stopPropagation();
        const n = (i + 1) % PALETTE.length;
        setI(n);
        target.current.set(PALETTE[n]);
      }}
      onPointerOver={() => { setHover(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = ""; }}
    >
      <icosahedronGeometry args={[1.25, 32]} />
      <MeshDistortMaterial color={PALETTE[0]} distort={hover ? 0.55 : 0.38} speed={2.2} roughness={0.12} metalness={0.35} clearcoat={1} clearcoatRoughness={0.1} iridescence={1} iridescenceIOR={1.4} />
    </mesh>
  );
}

function Orbiters() {
  const g = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    g.current.rotation.y += dt * 0.15;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -state.pointer.y * 0.3, 0.04);
    g.current.rotation.z = THREE.MathUtils.lerp(g.current.rotation.z, state.pointer.x * 0.25, 0.04);
  });
  const glass = { roughness: 0.05, metalness: 0.1, transmission: 0.9, thickness: 0.6, transparent: true } as const;
  return (
    <group ref={g}>
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5} position={[2.4, 1.1, -0.4]}>
        <mesh><torusKnotGeometry args={[0.42, 0.13, 160, 24]} /><meshPhysicalMaterial color="#22D3EE" {...glass} /></mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={3} floatIntensity={2} position={[-2.5, -0.9, 0.3]}>
        <mesh><octahedronGeometry args={[0.55]} /><meshStandardMaterial color="#F472B6" metalness={0.9} roughness={0.15} /></mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1} floatIntensity={1} position={[-1.9, 1.6, -1]}>
        <mesh rotation={[1.2, 0, 0]}><torusGeometry args={[0.45, 0.06, 16, 80]} /><meshStandardMaterial color="#A3E635" emissive="#A3E635" emissiveIntensity={0.6} /></mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.4} position={[2.1, -1.4, 0.5]}>
        <mesh><boxGeometry args={[0.5, 0.5, 0.5]} /><meshPhysicalMaterial color="#8B5CF6" {...glass} /></mesh>
      </Float>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.1, 0.008, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
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

export default function PortfolioScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas onCreated={quietShaderWarnings} dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }} role="img" aria-label="Interactive 3D sculpture. Click the centre shape to change its colour.">
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#22D3EE" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#F472B6" />
      <Environment resolution={256}>
        <Lightformer intensity={4} color="#8B5CF6" position={[0, 3, 4]} scale={[6, 2, 1]} />
        <Lightformer intensity={3} color="#22D3EE" position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} />
        <Lightformer intensity={2} color="#F472B6" position={[4, -1, 2]} rotation-y={-Math.PI / 2} scale={[4, 4, 1]} />
      </Environment>
      <Core />
      <Orbiters />
      <Sparkles count={90} scale={[9, 6, 4]} size={2.2} speed={0.4} color="#c4b5fd" />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
