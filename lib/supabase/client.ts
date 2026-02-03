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

import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for use in the browser.
 * Call this function in client components to interact with Supabase.
 * 
 * @example
 * 'use client'
 * import { createClient } from '@/lib/supabase/client'
 * 
 * function MyComponent() {
 *   const supabase = createClient()
 *   // Use supabase...
 * }
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}