// middleware.ts
// ============================================================
// NEXT.JS MIDDLEWARE
// ============================================================
// Runs before every request to:
// 1. Refresh the auth session
// 2. Protect routes that require authentication
// 3. Redirect logged-in users away from auth pages
// ============================================================

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Update the session (refresh auth token)
  const { supabaseResponse, user } = await updateSession(request);

  // Get the current path
  const path = request.nextUrl.pathname;

  // Define protected routes (require login)
  const protectedRoutes = ["/dashboard", "/profile", "/health", "/settings"];

  // Define auth routes (login, signup pages)
  const authRoutes = ["/login", "/signup", "/auth"];

  // Check route types
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", path);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to dashboard if logged in and accessing auth routes
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

// Configure which routes middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - Public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
