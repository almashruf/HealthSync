// lib/supabase/client.ts
// ============================================================
// BROWSER/CLIENT-SIDE SUPABASE CLIENT
// ============================================================
// Use this in:
// - React components with "use client"
// - Event handlers (onClick, onSubmit, etc.)
// - Custom hooks
// - Any client-side code
// ============================================================

import { createBrowserClient } from "@supabase/ssr";

// We create a function that returns a new client
// This ensures each component gets a fresh client instance
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// The ! after process.env tells TypeScript: "Trust me, this exists"
// This is safe because our app won't work without these anyway
