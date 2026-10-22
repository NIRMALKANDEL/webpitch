"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { quietShaderWarnings } from "@/components/three/constants";

const PINK = "#FF2E93";
const LIME = "#D8FF3C";
const SPARK_LIGHT = "#7B5CFF";

// A neon cable that enters bottom-left, ties one loose knot on the right and leaves top-right.
const PATH: [number, number, number][] = [
  [-9, -3.9, -3], [-5, -3.3, -1.5], [-1.2, -2.8, 0], [1.6, -1.6, 1], [3.4, 0, 0.6], [3, 1.9, -0.6], [1.2, 2.5, -1.2],
  [0.4, 1, 0.4], [1.9, -0.3, 1.6], [4.4, -0.9, 0.2], [5.6, 1.2, -1], [4.8, 3.2, -2], [7.5, 4.6, -3], [11, 5, -4],
];

function Wire({ onReady, light }: { onReady?: () => void; light: boolean }) {
  const group = useRef<THREE.Group>(null);
  const spark = useRef<THREE.Group>(null);
  const core = useRef<THREE.MeshStandardMaterial>(null);
  const t = useRef(0.18);
  const boost = useRef(0);
  const ready = useRef(false);
  const { viewport } = useThree();

  const { curve, tube, glow, shadow } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(PATH.map((p) => new THREE.Vector3(...p)), false, "centripetal");
    const behind = new THREE.CatmullRomCurve3(
      PATH.map(([x, y, z], i) => new THREE.Vector3(x + 0.5 * Math.sin(i * 1.3), y - 0.7 + 0.4 * Math.cos(i), z - 1.2)),
      false,
      "centripetal",
    );
    return {
      curve,
      tube: new THREE.TubeGeometry(curve, 520, 0.13, 18, false),
      glow: [new THREE.TubeGeometry(curve, 260, 0.24, 12, false), new THREE.TubeGeometry(curve, 200, 0.42, 12, false)],
      shadow: new THREE.TubeGeometry(behind, 400, 0.07, 10, false),
    };
  }, []);

  // Narrow screens: pull the knot up and in so it sits behind the top of the headline, not off-screen.
  const narrow = viewport.aspect < 1;

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-dt * 3);
    g.rotation.y += (state.pointer.x * 0.22 - g.rotation.y) * k;
    g.rotation.x += (-state.pointer.y * 0.12 - g.rotation.x) * k;

    // The spark runs along the wire; a click (or tap) sends a surge through it.
    boost.current = Math.max(0, boost.current - dt * 1.4);
    t.current = (t.current + dt * (0.045 + boost.current * 0.35)) % 1;
    if (spark.current) spark.current.position.copy(curve.getPointAt(t.current));
    if (core.current) core.current.emissiveIntensity = (light ? 0.3 : 0.55) + boost.current * 1.6;

    if (!ready.current && onReady) {
      ready.current = true;
      requestAnimationFrame(onReady);
    }
  });

  return (
    <group
      ref={group}
      position={narrow ? [-2.6, 1.6, 0] : [0, 0, 0]}
      scale={narrow ? 0.72 : 1}
      onClick={() => (boost.current = 1)}
    >
      <mesh geometry={tube}>
        <meshStandardMaterial ref={core} color={PINK} emissive={PINK} emissiveIntensity={light ? 0.3 : 0.55} roughness={0.28} metalness={0.1} />
      </mesh>
      {glow.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial
            color={PINK}
            transparent
            opacity={light ? (i ? 0 : 0.07) : i ? 0.045 : 0.16}
            blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      <mesh geometry={shadow}>
        <meshStandardMaterial color={light ? "#c9c6cf" : "#3a3a3a"} roughness={0.3} metalness={light ? 0.2 : 0.7} />
      </mesh>
      <group ref={spark}>
        <mesh>
          <sphereGeometry args={[0.17, 20, 20]} />
          <meshBasicMaterial color={light ? SPARK_LIGHT : LIME} toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.45, 20, 20]} />
          <meshBasicMaterial color={light ? SPARK_LIGHT : LIME} transparent opacity={light ? 0.22 : 0.16} blending={light ? THREE.NormalBlending : THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <pointLight color={light ? SPARK_LIGHT : LIME} intensity={14} distance={6} />
      </group>
    </group>
  );
}

/** Hero scene: a hot-pink neon wire with a chartreuse spark. Follows the pointer; click to send a surge. */
export default function WireScene({ onReady, light = false }: { onReady?: () => void; light?: boolean }) {
  return (
    <Canvas
      onCreated={quietShaderWarnings}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      role="img"
      aria-label="A glowing pink neon wire with a spark running along it. Click to send a surge through it."
    >
      <ambientLight intensity={light ? 0.9 : 0.35} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} />
      <pointLight position={[-3, 2, 4]} intensity={30} distance={20} color={PINK} />
      <Wire onReady={onReady} light={light} />
    </Canvas>
  );
}
