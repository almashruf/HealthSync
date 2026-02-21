// app/(dashboard)/dashboard/page.tsx

'use client'

import { useAuth } from '@/hooks/use-auth'
import { DashboardHome } from '@/components/dashboard/dashboard-home'
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return <DashboardHome user={user} />
}