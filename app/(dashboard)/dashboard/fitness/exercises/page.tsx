// app/(dashboard)/dashboard/fitness/exercises/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Activity } from "lucide-react";

export const metadata = {
  title: "Exercises | HealthSync",
};

export default function ExercisesPage() {
  return (
    <ComingSoon
      title="Exercise Library"
      description="Browse our library of exercises with instructions, videos, and muscle group targeting."
      //icon={Activity}
      iconName="Activity"
    />
  );
}
