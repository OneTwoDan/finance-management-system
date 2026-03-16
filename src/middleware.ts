import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/api/auth"];
const ADMIN_ONLY_ROUTES = ["/home", "/users", "/reports", "/api-docs", "/api/users", "/api/reports"];
const AUTH_ROUTES = ["/movements", "/api/movements"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

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
    session = null;
  }

  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.user?.role;

  if (role === "USER") {
    const isAllowed =
      AUTH_ROUTES.some((route) => pathname.startsWith(route));

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/movements", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
