// app/(dashboard)/dashboard/analytics/page.tsx

import { ComingSoon } from '@/components/dashboard'
import { BarChart3 } from 'lucide-react'

export const metadata = {
  title: 'Analytics | HealthSync',
}

export default function AnalyticsPage() {
  return (
    <ComingSoon
      title="Health Analytics"
      description="Deep insights into your health data with comprehensive charts and AI analysis."
      icon={BarChart3}
    />
  )
}