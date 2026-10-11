"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { waLink, waMessages } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <a
      href={waLink(waMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/30 transition hover:scale-105 [margin-bottom:env(safe-area-inset-bottom)]"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
