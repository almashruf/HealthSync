// app/(auth)/login/page.tsx
import { Suspense } from 'react'
import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Login | HealthSync',
  description: 'Sign in to your HealthSync account',
}

// We wrap in Suspense because LoginForm uses useSearchParams
// which requires Suspense boundary in Next.js 14+
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}

// Simple loading skeleton
function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-6" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}