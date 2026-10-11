"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { waLink } from "@/lib/whatsapp";
import { gbp, menu } from "./data";

type Ctx = {
  items: Record<string, number>;
  add: (id: string) => void;
  dec: (id: string) => void;
  count: number;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const CartCtx = createContext<Ctx | null>(null);
export const useCart = () => useContext(CartCtx)!;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const value = useMemo<Ctx>(
    () => ({
      items,
      add: (id) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 })),
      dec: (id) =>
        setItems((s) => {
          const n = (s[id] ?? 0) - 1;
          const next = { ...s };
          if (n <= 0) delete next[id];
          else next[id] = n;
          return next;
        }),
      count: Object.values(items).reduce((a, b) => a + b, 0),
      open,
      setOpen,
    }),
    [items, open],
  );
  return (
    <CartCtx.Provider value={value}>
      {children}
      <CartDrawer />
    </CartCtx.Provider>
  );
}

export function CartButton({ className = "" }: { className?: string }) {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`relative grid size-11 place-items-center rounded-full ${className}`}
      aria-label={`Your order, ${count} item${count === 1 ? "" : "s"}`}
    >
      <ShoppingBag className="size-5" aria-hidden />
      {count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-[#E3A21A] px-1 text-[11px] font-bold text-[#1b1b1b]">
          {count}
        </span>
      ) : null}
    </button>
  );
}

function CartDrawer() {
  const { items, add, dec, open, setOpen } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const lines = Object.entries(items).map(([id, qty]) => ({ item: menu.find((m) => m.id === id)!, qty }));
  const total = lines.reduce((s, l) => s + l.item.price * l.qty, 0);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const message = [
    "[Demo order from Tamarind & Smoke website]",
    "",
    ...lines.map((l) => `${l.qty} × ${l.item.name} — ${gbp(l.item.price * l.qty)}`),
    "",
    `Total: ${gbp(total)}`,
    `Name: ${name || "—"}`,
    `Delivery address: ${address || "—"}`,
  ].join("\n");

  const valid = name.trim().length > 1 && address.trim().length > 5 && lines.length > 0;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[80] flex justify-end bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="flex h-full w-full max-w-md flex-col bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/10 p-5">
              <p className="font-dd text-2xl">Your order</p>
              <button type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-black/5" aria-label="Close order">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {lines.length === 0 ? (
                <p className="text-black/60">Your order is empty. Add dishes from the menu.</p>
              ) : (
                <ul className="divide-y divide-black/10">
                  {lines.map(({ item, qty }) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-black/60">{gbp(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => dec(item.id)} className="grid size-9 place-items-center rounded-full border border-black/15" aria-label={`Remove one ${item.name}`}>
                          <Minus className="size-4" />
                        </button>
                        <span className="w-5 text-center font-semibold" aria-live="polite">{qty}</span>
                        <button type="button" onClick={() => add(item.id)} className="grid size-9 place-items-center rounded-full border border-black/15" aria-label={`Add one ${item.name}`}>
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {lines.length > 0 ? (
                <div className="mt-6 grid gap-4">
                  <label className="grid gap-1.5 text-sm font-medium">
                    Your name
                    <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="min-h-12 rounded-xl border border-black/15 px-4 text-base font-normal" />
                  </label>
                  <label className="grid gap-1.5 text-sm font-medium">
                    Delivery address
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} autoComplete="street-address" className="rounded-xl border border-black/15 px-4 py-3 text-base font-normal" />
                  </label>
                  {touched && !valid ? <p className="text-sm text-[#B3261E]" role="alert">Please add your name and delivery address.</p> : null}
                </div>
              ) : null}
            </div>
            <div className="border-t border-black/10 p-5">
              <p className="flex justify-between text-lg font-semibold">
                <span>Total</span> <span>{gbp(total)}</span>
              </p>
              <p className="mt-2 text-xs text-black/55">
                Demo: this sends a sample order to the website developer on WhatsApp, labelled as a demo. On your live site it goes to your own number.
              </p>
              {valid ? (
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#12372A] font-semibold text-white"
                >
                  <WhatsAppIcon className="size-5" /> Send order on WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setTouched(true)}
                  disabled={lines.length === 0}
                  className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#12372A] font-semibold text-white disabled:opacity-40"
                >
                  <WhatsAppIcon className="size-5" /> Send order on WhatsApp
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
