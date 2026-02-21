// app/(dashboard)/dashboard/wellness/mood/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Smile } from "lucide-react";

export const metadata = {
  title: "Mood Tracking | HealthSync",
};

export default function MoodPage() {
  return (
    <ComingSoon
      title="Mood Check-in"
      description="Track your emotional well-being, identify patterns, and build healthy habits."
      icon={Smile}
    />
  );
}
