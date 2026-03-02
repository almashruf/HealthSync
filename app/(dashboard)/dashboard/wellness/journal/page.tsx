// app/(dashboard)/dashboard/wellness/journal/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Journal | HealthSync",
};

export default function JournalPage() {
  return (
    <ComingSoon
      title="Wellness Journal"
      description="Write daily reflections, track gratitude, and maintain your mental wellness."
      iconName="Sparkles"
    />
  );
}
