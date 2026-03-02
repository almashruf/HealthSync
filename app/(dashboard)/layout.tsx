// app/(dashboard)/layout.tsx

import { DashboardLayout } from '@/components/layout'

export const dynamic = 'force-dynamic'

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}