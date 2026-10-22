"use client";

import { useEffect } from "react";

// True once the first page of the demo has rendered: the colour wipe only plays on navigations inside the demo,
// never on the first load, so it can't delay the first paint.
let navigated = false;

/** Re-mounts on every navigation inside the demo: a pink, lime and violet wipe, then the page rises in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const wipe = navigated;
  useEffect(() => {
    navigated = true;
  }, []);
  if (!wipe) return children;
  return (
    <>
      <div className="hw-wipe" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="hw-enter">{children}</div>
    </>
  );
}
