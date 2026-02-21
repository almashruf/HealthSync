// app/(dashboard)/dashboard/fitness/workouts/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Dumbbell } from "lucide-react";

export const metadata = {
  title: "Workouts | HealthSync",
};

export default function WorkoutsPage() {
  return (
    <ComingSoon
      title="Workouts"
      description="Create custom workout plans, track sessions, and monitor your fitness progress."
      icon={Dumbbell}
    />
  );
}
