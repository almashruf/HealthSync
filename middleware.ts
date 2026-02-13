// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Middleware runs on EVERY request before it reaches your pages.
 * We use it to:
 * 1. Refresh the auth token (keeps users logged in)
 * 2. Protect routes (redirect if not logged in)
 * 3. Redirect logged-in users away from auth pages
 */

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/health', '/settings', '/onboarding']

// Routes only for non-authenticated users
const authRoutes = ['/login', '/register', '/forgot-password']

export async function middleware(request: NextRequest) {
  // First, refresh the session token
  const { supabaseResponse, user } = await updateSession(request)

  const { pathname } = request.nextUrl

  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname.startsWith(route)
  )

  // Check if this is an auth route (login, register, etc.)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // If trying to access protected route without being logged in
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/login', request.url)
    // Save where they were trying to go (so we can redirect after login)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If logged in user tries to access auth pages, redirect to dashboard
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (we'll handle auth there separately if needed)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}