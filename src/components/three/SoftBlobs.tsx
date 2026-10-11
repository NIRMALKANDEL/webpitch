"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Blob({ color, position, scale, speed }: { color: string; position: [number, number, number]; scale: number; speed: number }) {
  const m = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!m.current) return;
    m.current.position.x = position[0] + state.pointer.x * 0.3 * scale;
    m.current.position.y = position[1] + state.pointer.y * 0.2 * scale;
  });
  return (
    <Float speed={speed} floatIntensity={1.2} rotationIntensity={0.6}>
      <mesh ref={m} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color={color} distort={0.45} speed={1.6} roughness={0.25} transparent opacity={0.85} />
      </mesh>
    </Float>
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

/** Soft, slowly morphing pastel shapes that drift with the cursor. Decorative background. */
export default function SoftBlobs({ colors, onReady }: { colors: string[]; onReady?: () => void }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true, antialias: true }} aria-hidden>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} />
      <Blob color={colors[0]} position={[2.2, 0.8, -1]} scale={1.5} speed={1.2} />
      <Blob color={colors[1]} position={[-2.4, -1, -0.5]} scale={1.1} speed={1.6} />
      <Blob color={colors[2] ?? colors[0]} position={[0.4, -1.8, -2]} scale={0.8} speed={2} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
