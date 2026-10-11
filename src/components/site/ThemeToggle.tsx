"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const read = () => document.documentElement.dataset.theme !== "light";

/** Dark / light switch. Choice is saved in localStorage and applied before paint by the script in app/layout.tsx. */
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, read, () => true);
  const flip = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0b0b0f" : "#eceae5");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };
  return (
    <button
      type="button"
      onClick={flip}
      className="grid size-10 place-items-center rounded-full text-ink-2 transition hover:bg-ink/5 hover:text-ink"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}
