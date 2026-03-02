// app/(dashboard)/dashboard/nutrition/recipes/page.tsx

import { ComingSoon } from '@/components/dashboard'

export const metadata = {
  title: 'Recipes | HealthSync',
}

export default function RecipesPage() {
  return (
    <ComingSoon
      title="Healthy Recipes"
      description="Discover healthy recipes matched to your dietary needs and nutritional goals."
      iconName="book-open"
    />
  )
}