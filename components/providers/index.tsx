// components/providers/index.tsx
"use client";

// ============================================
// APP PROVIDERS
// ============================================
// Wraps the entire app with necessary context providers
// This is a client component because providers need React Context
// ============================================

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Create QueryClient inside the component to avoid sharing state between requests
  // useState ensures the same client is used throughout the session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 30 seconds
            staleTime: 30 * 1000,
            // Retry failed requests once
            retry: 1,
            // Don't refetch when window regains focus
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
