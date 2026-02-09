// hooks/use-auth.ts
"use client";

/**
 * This hook provides authentication state to client components.
 * It listens for auth changes and keeps the state updated.
 */

import { useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
  });

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get the initial session when the component mounts
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        }

        setAuthState({
          user: session?.user ?? null,
          session: session ?? null,
          loading: false,
          isAuthenticated: !!session?.user,
        });
      } catch (error) {
        console.error("Auth initialization error:", error);
        setAuthState((prev) => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    // This fires when user logs in, logs out, or token refreshes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event); // Helpful for debugging

      setAuthState({
        user: session?.user ?? null,
        session: session ?? null,
        loading: false,
        isAuthenticated: !!session?.user,
      });

      // Refresh the page data when auth state changes
      // This ensures server components get the new auth state
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Sign out function (can be called from any component using this hook)
  const signOut = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    await supabase.auth.signOut();
    router.push("/login");
  }, [supabase, router]);

  return {
    ...authState,
    signOut,
  };
}
