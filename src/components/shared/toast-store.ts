"use client";

import { useSyncExternalStore } from "react";

export type ToastKind = "success" | "error" | "info";
export type Toast = { id: number; message: string; kind: ToastKind };

const EMPTY: Toast[] = [];
const listeners = new Set<() => void>();
let toasts: Toast[] = EMPTY;
let nextId = 0;

const emit = () => listeners.forEach((l) => l());

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

/** Shows a short notification. Errors stay a little longer so they can be read. */
export function toast(message: string, kind: ToastKind = "info", ms = kind === "error" ? 7000 : 4500) {
  const t = { id: ++nextId, message, kind };
  toasts = [...toasts.slice(-2), t];
  emit();
  setTimeout(() => dismissToast(t.id), ms);
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => toasts,
    () => EMPTY,
  );
}
