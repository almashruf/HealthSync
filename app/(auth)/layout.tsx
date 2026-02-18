// app/(auth)/layout.tsx
import Link from "next/link";
import { Heart } from "lucide-react";

/**
 * This layout wraps all auth pages (login, register, etc.)
 * It provides a centered card design with the HealthSync branding
 */

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header with Logo */}
      <header className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <Heart className="h-7 w-7 fill-current" />
          <span>HealthSync</span>
        </Link>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} HealthSync. Your health journey starts
          here.
        </p>
      </footer>
    </div>
  );
}
