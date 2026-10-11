"use client";

import { Check, Plus, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { Scene3DGate } from "@/components/shared/Scene3DGate";
import { ROOM_ITEMS, ROOM_STYLES, type RoomItem, type RoomStyle } from "@/components/three/room-constants";
import { unsplash } from "@/lib/media";

const RoomScene = dynamic(() => import("@/components/three/RoomScene"), { ssr: false });

const empty = Object.fromEntries(ROOM_ITEMS.map((i) => [i.id, false])) as Record<RoomItem, boolean>;

/** "Design it in 3D": pick a style, watch the room furnish itself piece by piece, add or remove pieces. */
export function RoomPlanner() {
  const [style, setStyle] = useState<RoomStyle>("japandi");
  const [items, setItems] = useState(empty);
  const [last, setLast] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const furnish = () => {
    timers.current.forEach(clearTimeout);
    setItems(empty);
    timers.current = ROOM_ITEMS.map((it, i) =>
      setTimeout(() => {
        setItems((s) => ({ ...s, [it.id]: true }));
        setLast(it.name);
      }, 500 + i * 550),
    );
  };

  const toggle = (id: RoomItem, name: string) => {
    setItems((s) => ({ ...s, [id]: !s[id] }));
    setLast(items[id] ? null : name);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
      <div className="relative overflow-hidden bg-[#f4f2ee]">
        <Scene3DGate
          className="aspect-[4/3] w-full"
          render={(onReady) => (
            <RoomScene
              style={style}
              items={items}
              onReady={() => {
                onReady();
                setReady(true);
                furnish();
              }}
            />
          )}
          fallback={
            <Image src={unsplash("1664711942326-2c3351e215e6")} alt="A furnished loft living room" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          }
        />
        <AnimatePresence>
          {last ? (
            <motion.p
              key={last}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 bg-white/90 px-3 py-2 font-dd text-xs tracking-[0.15em] shadow-sm"
              aria-live="polite"
            >
              <Plus className="size-3.5 text-[#5B6B3A]" aria-hidden /> {last.toUpperCase()}
            </motion.p>
          ) : null}
        </AnimatePresence>
        {ready ? <p className="pointer-events-none absolute right-4 bottom-4 bg-white/80 px-2 py-1 text-[11px] text-[#171717]/70">Drag to look around</p> : null}
      </div>

      <div>
        <h3 className="font-dd text-sm tracking-[0.3em]">1 · CHOOSE A STYLE</h3>
        <div className="mt-4 grid gap-2" role="radiogroup" aria-label="Room style">
          {ROOM_STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={style === s.id}
              onClick={() => setStyle(s.id)}
              className={`flex min-h-14 items-center gap-4 border px-4 text-left transition ${style === s.id ? "border-[#171717] bg-[#171717] text-white" : "border-[#171717]/15 hover:border-[#171717]/50"}`}
            >
              <span className="flex" aria-hidden>
                {s.swatch.map((c) => <span key={c} className="-ml-1 size-6 rounded-full ring-2 ring-white first:ml-0" style={{ background: c }} />)}
              </span>
              <span>
                <span className="block font-dd text-sm tracking-[0.15em]">{s.name.toUpperCase()}</span>
                <span className={`block text-xs ${style === s.id ? "text-white/70" : "text-[#171717]/60"}`}>{s.note}</span>
              </span>
            </button>
          ))}
        </div>

        <h3 className="mt-8 font-dd text-sm tracking-[0.3em]">2 · ADD OR REMOVE PIECES</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {ROOM_ITEMS.map((it) => (
            <li key={it.id}>
              <button
                type="button"
                aria-pressed={items[it.id]}
                onClick={() => toggle(it.id, it.name)}
                disabled={!ready}
                className={`inline-flex min-h-10 items-center gap-1.5 border px-3 text-sm transition disabled:opacity-40 ${items[it.id] ? "border-[#5B6B3A] bg-[#5B6B3A]/10 text-[#3d4a25]" : "border-[#171717]/15 hover:border-[#171717]/50"}`}
              >
                {items[it.id] ? <Check className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
                {it.name}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={furnish} disabled={!ready} className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[#171717] font-dd text-xs tracking-[0.2em] disabled:opacity-40">
          <RotateCcw className="size-3.5" aria-hidden /> FURNISH FROM SCRATCH
        </button>
      </div>
    </div>
  );
}
