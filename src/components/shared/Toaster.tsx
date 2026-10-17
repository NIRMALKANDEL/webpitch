"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { dismissToast, useToasts } from "./toast-store";

const icons = {
  success: <CheckCircle2 className="size-4 shrink-0 text-volt" aria-hidden />,
  error: <AlertCircle className="size-4 shrink-0 text-danger" aria-hidden />,
  info: <Info className="size-4 shrink-0 text-accent" aria-hidden />,
};

/** Renders toasts from toast(). Mounted once in the site layout. */
export function Toaster() {
  const list = useToasts();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-4 z-[95] flex flex-col items-center gap-2 px-3 [padding-top:env(safe-area-inset-top)]"
    >
      <AnimatePresence initial={false}>
        {list.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex max-w-md items-center gap-2.5 rounded-full bg-night py-2 pr-2 pl-4 text-sm text-white shadow-2xl ring-1 ring-white/10"
          >
            {icons[t.kind]}
            <p className="min-w-0 flex-1">{t.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss notification"
              className="grid size-8 shrink-0 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" aria-hidden />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
