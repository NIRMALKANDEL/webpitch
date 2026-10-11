"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

export type LightboxItem = { src: string; alt: string; caption?: string };

/** Accessible image lightbox: arrow keys, Esc, swipe, focus trap and focus restore. */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
  theme = "dark",
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  theme?: "dark" | "light";
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus();
    };
  }, [open, go, onClose]);

  const item = index !== null ? items[index] : null;
  const dark = theme === "dark";

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className={`fixed inset-0 z-[100] flex flex-col ${dark ? "bg-black/95 text-white" : "bg-white/97 text-neutral-900"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between p-3 text-sm">
            <span aria-live="polite">
              {index! + 1} / {items.length}
            </span>
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="grid size-11 place-items-center rounded-full hover:bg-current/10"
              aria-label="Close image viewer"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.src}
                className="absolute inset-0 mx-auto max-w-6xl px-2 sm:px-16"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-current/10 backdrop-blur hover:bg-current/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-current/10 backdrop-blur hover:bg-current/20"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
          <p className="min-h-12 p-4 text-center text-sm opacity-80">{item.caption ?? item.alt}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
