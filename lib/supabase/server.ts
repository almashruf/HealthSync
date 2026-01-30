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

export async function createServerSupabaseClient() {
  // Get the cookie store from Next.js
  // This is how we access cookies on the server
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // GET: Read a cookie value
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        // SET: Create or update a cookie
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // This can fail in Server Components (they're read-only)
            // That's okay - the middleware will handle it
          }
        },

        // REMOVE: Delete a cookie (by setting empty value)
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Same as above - middleware handles this
          }
        },
      },
    },
  );
}
