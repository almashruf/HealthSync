// lib/supabase/middleware.ts
// ============================================================
// MIDDLEWARE SUPABASE CLIENT
// ============================================================
// Special client for Next.js middleware
// Handles session refresh and cookie management
// ============================================================

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Updates the Supabase session in middleware.
 * This ensures the user stays logged in across requests.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do NOT remove this line
  // It refreshes the auth token and keeps the user logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user };
}
