// app/(dashboard)/dashboard/nutrition/plans/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { ClipboardList } from "lucide-react";

export const metadata = {
  title: "Meal Plans | HealthSync",
};

export default function MealPlansPage() {
  return (
    <ComingSoon
      title="Meal Plans"
      description="Get personalized meal plans tailored to your dietary preferences and health goals."
      icon={ClipboardList}
    />
  );
}
