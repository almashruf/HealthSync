// app/(dashboard)/dashboard/fitness/progress/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { BarChart3 } from "lucide-react";

export const metadata = {
  title: "Fitness Progress | HealthSync",
};

export default function FitnessProgressPage() {
  return (
    <ComingSoon
      title="Fitness Progress"
      description="Visualize your fitness journey with detailed charts and progress tracking."
      iconName="BarChart3"
      
    />
  );
}
