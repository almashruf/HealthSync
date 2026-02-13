// app/auth/callback/route.ts
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * This route handles the callback after:
 * 1. Email confirmation (clicking link in signup email)
 * 2. Password reset (clicking link in reset email)
 * 3. OAuth login (Google, GitHub, etc. - if we add them later)
 *
 * Supabase adds a 'code' to the URL that we exchange for a session.
 */

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  // Get the auth code from URL
  const code = searchParams.get('code')

  // Get where to redirect after (defaults to dashboard)
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard'

  if (code) {
    const supabase = await createServerSupabaseClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Success! Redirect to the intended destination
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // If something went wrong, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
}