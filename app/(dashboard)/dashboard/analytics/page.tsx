// app/(dashboard)/dashboard/analytics/page.tsx

import { ComingSoon } from '@/components/dashboard'

export const metadata = {
  title: 'Analytics | HealthSync',
}

export default function AnalyticsPage() {
  return (
    <ComingSoon
      title="Health Analytics"
      description="Deep insights into your health data with comprehensive charts and AI analysis."
      iconName="bar-chart"
    />
  )
}