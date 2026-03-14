import { NextRequest, NextResponse } from "next/server";

// Routes that are publicly accessible (no auth required)
const PUBLIC_ROUTES = ["/login", "/api/auth"];

// Routes accessible only to ADMIN role
const ADMIN_ONLY_ROUTES = ["/home", "/users", "/reports", "/api-docs", "/api/users", "/api/reports"];

// Routes accessible to all authenticated users (ADMIN + USER)
const AUTH_ROUTES = ["/movements", "/api/movements"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and static assets to pass through
  if (
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Fetch the current session from the better-auth endpoint
  // We pass the original cookies so the session can be resolved server-side
  let session: { user: { role: string } } | null = null;
  try {
    const sessionRes = await fetch(
      new URL("/api/auth/get-session", req.url).toString(),
      {
        headers: {
          cookie: req.headers.get("cookie") ?? "",
        },
      }
    );
    if (sessionRes.ok) {
      const data = await sessionRes.json();
      session = data?.user ? data : null;
    }
  } catch {
    // If the session fetch fails, treat as unauthenticated
    session = null;
  }

  // ── 1. Root route "/" ──────────────────────────────────────────────────────
  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // ── 2. Unauthenticated user trying to access a protected page ─────────────
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.user?.role;

  // ── 3. USER role: only allowed to access /movements (and its sub-paths) ───
  if (role === "USER") {
    const isAllowed =
      AUTH_ROUTES.some((route) => pathname.startsWith(route));

    if (!isAllowed) {
      // Redirect USER to the only page they can access
      return NextResponse.redirect(new URL("/movements", req.url));
    }
  }

  // ADMIN can access everything — no restrictions needed
  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths EXCEPT:
   * - _next/static  (Next.js static files)
   * - _next/image   (Next.js image optimization)
   * - favicon.ico
   * - public assets
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
