import { NextResponse, type NextRequest } from "next/server";
import { CURRENCY_COOKIE, currencyForCountry } from "@/lib/currency";

/**
 * Sets the visitor's currency cookie from Vercel's geo header on first visit.
 * Pages stay static; prices are rendered client-side from this cookie.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (request.cookies.has(CURRENCY_COOKIE)) return response;

  const country = request.headers.get("x-vercel-ip-country");
  // Locally there is no geo header; the client falls back to the timezone instead.
  if (!country) return response;

  response.cookies.set(CURRENCY_COOKIE, currencyForCountry(country), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Page routes only: skip Next internals, demo assets and files with an extension.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
