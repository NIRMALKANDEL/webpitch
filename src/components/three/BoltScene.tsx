"use client";

import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { type PartId, quietShaderWarnings } from "./constants";

function hexShape(r: number, hole: number) {
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  if (hole > 0) {
    const h = new THREE.Path();
    h.absarc(0, 0, hole, 0, Math.PI * 2, true);
    s.holes.push(h);
  }
  return s;
}

/** A helical ridge around the shank, so the thread reads as a real thread. */
class Helix extends THREE.Curve<THREE.Vector3> {
  constructor(private r: number, private len: number, private turns: number) {
    super();
  }
  getPoint(t: number) {
    const a = t * this.turns * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * this.r, t * this.len, Math.sin(a) * this.r);
  }
}

function Part({
  id,
  offset,
  selected,
  onSelect,
  children,
}: {
  id: PartId;
  offset: number;
  selected: boolean;
  onSelect: (id: PartId) => void;
  children: React.ReactNode;
}) {
  const g = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.position.y += (offset - g.current.position.y) * (1 - Math.exp(-dt * 6));
    const s = hover || selected ? 1.03 : 1;
    g.current.scale.lerp(new THREE.Vector3(s, s, s), 1 - Math.exp(-dt * 10));
  });
  return (
    <group
      ref={g}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "";
      }}
    >
      {children}
    </group>
  );
}

function Assembly({
  exploded,
  selected,
  onSelect,
  spin,
}: {
  exploded: boolean;
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  spin: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const steel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c9d0d8", metalness: 0.85, roughness: 0.28 }),
    [],
  );
  const steelSel = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#7dd3fc", metalness: 0.9, roughness: 0.3, emissive: "#0369a1", emissiveIntensity: 0.25 }),
    [],
  );
  const headGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(hexShape(0.42, 0), { depth: 0.26, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 });
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const nutGeo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(hexShape(0.42, 0.2), { depth: 0.3, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 });
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const washerGeo = useMemo(() => {
    const pts = [new THREE.Vector2(0.21, 0), new THREE.Vector2(0.48, 0), new THREE.Vector2(0.48, 0.06), new THREE.Vector2(0.21, 0.06), new THREE.Vector2(0.21, 0)];
    return new THREE.LatheGeometry(pts, 48);
  }, []);
  const threadGeo = useMemo(() => new THREE.TubeGeometry(new Helix(0.2, 1.1, 22), 600, 0.022, 6, false), []);

  useFrame((_, dt) => {
    if (spin && root.current) root.current.rotation.y += dt * 0.4;
  });

  const m = (id: PartId) => (selected === id ? steelSel : steel);

  return (
    <group ref={root} position={[0, -0.25, 0]}>
      <Part id="bolt" offset={0} selected={selected === "bolt"} onSelect={onSelect}>
        <mesh geometry={headGeo} material={m("bolt")} position={[0, 1.6, 0]} castShadow />
        <mesh material={m("bolt")} position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.19, 0.19, 1.6, 32]} />
        </mesh>
        <mesh geometry={threadGeo} material={m("bolt")} position={[0, 0.02, 0]} />
      </Part>
      <Part id="washer" offset={exploded ? -0.55 : 0} selected={selected === "washer"} onSelect={onSelect}>
        <mesh geometry={washerGeo} material={m("washer")} position={[0, 0.5, 0]} castShadow />
      </Part>
      <Part id="nut" offset={exploded ? -1.15 : 0} selected={selected === "nut"} onSelect={onSelect}>
        <mesh geometry={nutGeo} material={m("nut")} position={[0, 0.15, 0]} castShadow />
      </Part>
    </group>
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

export default function BoltScene({
  exploded = false,
  selected = null,
  onSelect = () => {},
  compact = false,
  onReady,
}: {
  exploded?: boolean;
  selected?: PartId | null;
  onSelect?: (id: PartId) => void;
  compact?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      shadows="percentage"
      onCreated={quietShaderWarnings}
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ position: [3.4, 1.5, 5.2], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      role="img"
      aria-label={`3D model of a bolt, washer and nut assembly${exploded ? ", exploded view" : ""}`}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 3]} intensity={1.4} castShadow />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[6, 1.5, 1]} />
        <Lightformer intensity={1.5} position={[-4, 1, 0]} rotation-y={Math.PI / 2} scale={[4, 4, 1]} />
        <Lightformer intensity={1} color="#7dd3fc" position={[4, 0, -2]} rotation-y={-Math.PI / 2} scale={[3, 3, 1]} />
      </Environment>
      <Assembly exploded={compact ? true : exploded} selected={selected} onSelect={onSelect} spin={compact} />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.4} scale={5} blur={2.5} far={2} />
      {compact ? null : <OrbitControls enablePan={false} enableZoom={false} enableDamping />}
      <ReadySignal onReady={onReady} />
    </Canvas>
  );
}
