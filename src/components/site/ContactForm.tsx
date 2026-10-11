"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./EnquiryForm";

/** Reads ?industry=&demo=&package=&features= so enquiries arrive with context. Rendered inside <Suspense>. */
export function ContactForm() {
  const p = useSearchParams();
  const prefill = {
    industry: p.get("industry") ?? undefined,
    demo: p.get("demo") ?? undefined,
    package: p.get("package") ?? undefined,
    features: p.get("features") ?? undefined,
  };
  // Remount when the context changes so the form re-initialises from the new prefill.
  return <EnquiryForm key={p.toString()} variant="full" prefill={prefill} />;
}
