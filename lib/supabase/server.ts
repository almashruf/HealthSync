// lib/supabase/server.ts
// ============================================================
// SERVER-SIDE SUPABASE CLIENT
// ============================================================
// Use this in:
// - Server Components (without "use client")
// - API routes (app/api/...)
// - Server Actions
// ============================================================

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase client for use on the server.
 * This handles cookie management for authentication.
 *
 * @example
 * // In a Server Component or API route
 * import { createServerSupabaseClient } from '@/lib/supabase/server'
 *
 * async function getData() {
 *   const supabase = await createServerSupabaseClient()
 *   const { data } = await supabase.from('table').select()
 *   return data
 * }
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
