"use client";

import { ContactShadows, Environment, Float, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { quietShaderWarnings } from "./constants";
import { useRef } from "react";
import * as THREE from "three";

const SKIN = "#b07a52";
const HOODIE = "#8B5CF6";

function Eye({ x }: { x: number }) {
  const pupil = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!pupil.current) return;
    pupil.current.position.x = x + state.pointer.x * 0.035;
    pupil.current.position.y = 0.12 + state.pointer.y * 0.03;
  });
  return (
    <group>
      <mesh position={[x, 0.12, 0.5]}><sphereGeometry args={[0.1, 24, 24]} /><meshStandardMaterial color="#ffffff" roughness={0.2} /></mesh>
      <mesh ref={pupil} position={[x, 0.12, 0.585]}><sphereGeometry args={[0.045, 16, 16]} /><meshStandardMaterial color="#07070B" roughness={0.1} /></mesh>
    </group>
  );
}

function Avatar({ waveRef }: { waveRef: React.RefObject<number> }) {
  const head = useRef<THREE.Group>(null);
  const arm = useRef<THREE.Group>(null);
  const lids = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, state.pointer.x * 0.6, 0.08);
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -state.pointer.y * 0.35, 0.08);
    }
    // Blink every ~4 seconds.
    if (lids.current) lids.current.scale.y = t % 4 < 0.12 ? 1 : 0.05;
    if (arm.current) {
      const w = waveRef.current ?? 0;
      arm.current.rotation.z = THREE.MathUtils.lerp(arm.current.rotation.z, w > 0 ? 2.5 + Math.sin(t * 14) * 0.35 : 0.25, 0.15);
      if (waveRef.current) waveRef.current = Math.max(0, w - dt);
    }
  });
  return (
    <group position={[0, -0.6, 0]}>
      {/* hoodie torso */}
      <RoundedBox args={[1.9, 1.3, 1]} radius={0.4} smoothness={6} position={[0, -0.75, 0]}>
        <meshStandardMaterial color={HOODIE} roughness={0.7} />
      </RoundedBox>
      <mesh position={[0, -0.15, 0.1]} rotation={[0.3, 0, 0]}><torusGeometry args={[0.38, 0.1, 12, 40]} /><meshStandardMaterial color="#6d28d9" roughness={0.7} /></mesh>
      {/* waving arm */}
      <group ref={arm} position={[0.95, -0.45, 0]} rotation={[0, 0, 0.25]}>
        <mesh position={[0, -0.45, 0]}><capsuleGeometry args={[0.17, 0.6, 8, 16]} /><meshStandardMaterial color={HOODIE} roughness={0.7} /></mesh>
        <mesh position={[0, -0.92, 0]}><sphereGeometry args={[0.17, 20, 20]} /><meshStandardMaterial color={SKIN} roughness={0.6} /></mesh>
      </group>
      <mesh position={[-0.95, -0.9, 0]} rotation={[0, 0, -0.2]}><capsuleGeometry args={[0.17, 0.6, 8, 16]} /><meshStandardMaterial color={HOODIE} roughness={0.7} /></mesh>
      {/* neck + head */}
      <mesh position={[0, -0.05, 0]}><cylinderGeometry args={[0.2, 0.22, 0.3, 20]} /><meshStandardMaterial color={SKIN} roughness={0.6} /></mesh>
      <group ref={head} position={[0, 0.55, 0]}>
        <mesh><sphereGeometry args={[0.58, 48, 48]} /><meshStandardMaterial color={SKIN} roughness={0.55} /></mesh>
        {/* hair */}
        <mesh position={[0, 0.2, -0.05]} scale={[1.05, 0.75, 1.05]}><sphereGeometry args={[0.6, 40, 40, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#141016" roughness={0.9} /></mesh>
        <mesh position={[0.15, 0.45, 0.3]} rotation={[0.6, 0, -0.3]}><coneGeometry args={[0.18, 0.35, 12]} /><meshStandardMaterial color="#141016" roughness={0.9} /></mesh>
        <Eye x={-0.2} />
        <Eye x={0.2} />
        <group ref={lids}>
          {[-0.2, 0.2].map((x) => <mesh key={x} position={[x, 0.12, 0.52]}><sphereGeometry args={[0.105, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={SKIN} /></mesh>)}
        </group>
        {/* glasses */}
        {[-0.2, 0.2].map((x) => <mesh key={x} position={[x, 0.12, 0.6]}><torusGeometry args={[0.14, 0.018, 10, 32]} /><meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.6} /></mesh>)}
        <mesh position={[0, 0.12, 0.62]}><boxGeometry args={[0.12, 0.02, 0.02]} /><meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.6} /></mesh>
        {/* smile */}
        <mesh position={[0, -0.18, 0.5]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.12, 0.022, 8, 24, Math.PI]} /><meshStandardMaterial color="#5b2a1c" /></mesh>
        {/* headphones */}
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}><torusGeometry args={[0.62, 0.05, 12, 48, Math.PI]} /><meshStandardMaterial color="#F472B6" metalness={0.3} roughness={0.3} /></mesh>
        {[-0.62, 0.62].map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.16, 0.16, 0.12, 24]} /><meshStandardMaterial color="#F472B6" metalness={0.3} roughness={0.3} /></mesh>)}
      </group>
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

export default function AvatarScene({ onReady }: { onReady?: () => void }) {
  const waveRef = useRef(1.5);
  return (
    <Canvas onCreated={quietShaderWarnings} dpr={[1, 1.75]} camera={{ position: [0, 0.2, 4.6], fov: 40 }} gl={{ antialias: true, alpha: true }} role="img" aria-label="3D avatar of Kai. Its eyes follow your cursor; click to make it waveRef." onClick={() => (waveRef.current = 1.6)} style={{ cursor: "pointer" }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={30} color="#22D3EE" />
      <pointLight position={[-3, 2, 2]} intensity={25} color="#F472B6" />
      <Environment resolution={128}>
        <Lightformer intensity={3} color="#8B5CF6" position={[0, 3, 3]} scale={[5, 2, 1]} />
      </Environment>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Avatar waveRef={waveRef} />
      </Float>
      <Sparkles count={40} scale={[5, 4, 3]} size={2} speed={0.3} color="#c4b5fd" />
      <ContactShadows position={[0, -2.2, 0]} opacity={0.5} scale={5} blur={2.5} far={2} color="#8B5CF6" />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
