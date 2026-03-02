// app/(dashboard)/dashboard/nutrition/log/page.tsx

import { ComingSoon } from '@/components/dashboard'
import { UtensilsCrossed } from 'lucide-react'

export const metadata = {
  title: 'Food Log | HealthSync',
}

export default function FoodLogPage() {
  return (
    <ComingSoon
      title="Food Log"
      description="Log your meals, track calories, macros, and get AI-powered nutritional insights."
      iconName="UtensilsCrossed"
    />
  )
}