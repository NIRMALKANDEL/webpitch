"use client";

import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { FABRICS, WOODS, type Fabric, type Wood, quietShaderWarnings } from "./constants";

/** Procedural wood grain so the timber reads as timber without downloading textures. */
function useGrainTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const g = c.getContext("2d")!;
    // Deterministic pseudo-random grain, so the texture is identical on every render.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    g.fillStyle = "#ffffff";
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 70; i++) {
      const y = rand() * 256;
      g.strokeStyle = `rgba(0,0,0,${0.04 + rand() * 0.08})`;
      g.lineWidth = 0.5 + rand() * 1.6;
      g.beginPath();
      g.moveTo(0, y);
      for (let x = 0; x <= 256; x += 16) g.lineTo(x, y + Math.sin(x / 30 + i) * 3);
      g.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Chair({ wood, fabric }: { wood: Wood; fabric: Fabric }) {
  const grain = useGrainTexture();
  const woodMat = useMemo(() => new THREE.MeshStandardMaterial({ map: grain, roughness: 0.55 }), [grain]);
  const fabricMat = useMemo(() => new THREE.MeshStandardMaterial({ roughness: 0.95 }), []);
  const target = useRef({ wood: new THREE.Color(WOODS[wood].color), fabric: new THREE.Color(FABRICS[fabric].color) });

  useEffect(() => {
    target.current.wood.set(WOODS[wood].color);
    target.current.fabric.set(FABRICS[fabric].color);
  }, [wood, fabric]);

  // Smoothly blend to the newly chosen finish.
  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 8);
    woodMat.color.lerp(target.current.wood, k);
    fabricMat.color.lerp(target.current.fabric, k);
  });

  const leg = (x: number, z: number, lean: number) => (
    <mesh key={`${x}${z}`} position={[x, 0.27, z]} rotation={[lean * 0.12, 0, -Math.sign(x) * 0.05]} material={woodMat} castShadow>
      <cylinderGeometry args={[0.028, 0.02, 0.56, 16]} />
    </mesh>
  );

  return (
    <group position={[0, -0.45, 0]}>
      {leg(-0.34, 0.3, 1)}
      {leg(0.34, 0.3, 1)}
      {leg(-0.34, -0.3, -1)}
      {leg(0.34, -0.3, -1)}
      {/* seat frame */}
      <RoundedBox args={[0.78, 0.06, 0.72]} radius={0.02} position={[0, 0.56, 0]} material={woodMat} castShadow />
      {/* seat cushion */}
      <RoundedBox args={[0.68, 0.12, 0.62]} radius={0.05} smoothness={6} position={[0, 0.65, 0.02]} material={fabricMat} castShadow />
      {/* back frame + cushion */}
      <group position={[0, 0.98, -0.33]} rotation={[-0.2, 0, 0]}>
        <RoundedBox args={[0.74, 0.62, 0.05]} radius={0.02} material={woodMat} castShadow />
        <RoundedBox args={[0.64, 0.5, 0.11]} radius={0.05} smoothness={6} position={[0, 0.02, 0.07]} material={fabricMat} castShadow />
      </group>
      {/* arms */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.4, 0.82, -0.02]}>
          <RoundedBox args={[0.07, 0.04, 0.7]} radius={0.015} material={woodMat} castShadow />
          <mesh position={[0, -0.12, 0.27]} material={woodMat}>
            <cylinderGeometry args={[0.018, 0.018, 0.24, 12]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CameraRig({ azimuth, zoom }: { azimuth: number; zoom: number }) {
  const controls = useRef<OrbitControlsImpl>(null);
  useEffect(() => {
    controls.current?.setAzimuthalAngle(azimuth);
  }, [azimuth]);
  useFrame((state, dt) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const next = cam.zoom + (zoom - cam.zoom) * (1 - Math.exp(-dt * 6));
    if (Math.abs(next - cam.zoom) > 0.0005) {
      cam.zoom = next;
      cam.updateProjectionMatrix();
    }
  });
  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.05}
      enableDamping
    />
  );
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      if (onReady) requestAnimationFrame(onReady);
    }
  });
  return null;
}

function AutoSpin({ enabled }: { enabled: boolean }) {
  const { scene } = useThree();
  useFrame((_, dt) => {
    if (!enabled) return;
    const g = scene.getObjectByName("chair-root");
    if (g) g.rotation.y += dt * 0.35;
  });
  return null;
}

export default function ChairScene({
  wood = "walnut",
  fabric = "linen",
  azimuth = 0.6,
  zoom = 1,
  compact = false,
  onReady,
}: {
  wood?: Wood;
  fabric?: Fabric;
  azimuth?: number;
  zoom?: number;
  compact?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      shadows="percentage"
      onCreated={quietShaderWarnings}
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ position: [1.6, 1.0, 2.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      role="img"
      aria-label={`3D armchair in ${WOODS[wood].label} with ${FABRICS[fabric].label} upholstery`}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.5, 4, 2]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 3, 2]} scale={[5, 2, 1]} />
        <Lightformer intensity={1} position={[-3, 1, -2]} scale={[2, 4, 1]} />
      </Environment>
      <group name="chair-root">
        <Chair wood={wood} fabric={fabric} />
      </group>
      <ContactShadows position={[0, -0.45, 0]} opacity={0.45} scale={3} blur={2.4} far={1.2} />
      {compact ? <AutoSpin enabled /> : <CameraRig azimuth={azimuth} zoom={zoom} />}
      <ReadySignal onReady={onReady} />
    </Canvas>
  );
}
