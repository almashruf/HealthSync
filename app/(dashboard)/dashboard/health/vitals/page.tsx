// app/(dashboard)/dashboard/health/vitals/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Activity } from "lucide-react";

export const metadata = {
  title: "Vitals | HealthSync",
};

export default function VitalsPage() {
  return (
    <ComingSoon
      title="Vitals Tracking"
      description="Track your blood pressure, heart rate, temperature, and other vital signs over time."
      icon={Activity}
    />
  );
}
