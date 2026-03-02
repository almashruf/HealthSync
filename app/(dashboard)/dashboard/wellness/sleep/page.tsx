// app/(dashboard)/dashboard/wellness/sleep/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Bed } from "lucide-react";

export const metadata = {
  title: "Sleep Tracking | HealthSync",
};

export default function SleepPage() {
  return (
    <ComingSoon
      title="Sleep Tracking"
      description="Log your sleep patterns, track quality, and get insights for better rest."
      iconName="Bed"
    />
  );
}
