// middleware.ts
// ============================================================
// NEXT.JS MIDDLEWARE
// ============================================================
// This runs BEFORE every request (except static files)
// We use it to:
// 1. Refresh the auth session (keep users logged in)
// 2. Protect routes (redirect if not logged in)
// ============================================================

import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createMiddlewareClient(request);

  // Refresh the session if it exists
  // This keeps the user logged in and updates the cookie
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the current path
  const path = request.nextUrl.pathname;

  // Define which routes need authentication
  const protectedRoutes = ["/dashboard", "/profile", "/health"];
  const authRoutes = ["/login", "/signup"];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  // Check if current path is auth route
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // If trying to access protected route without session → redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", path);
    return NextResponse.redirect(redirectUrl);
  }

  // If logged in and trying to access auth routes → redirect to dashboard
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
