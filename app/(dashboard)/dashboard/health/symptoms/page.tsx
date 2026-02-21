// app/(dashboard)/dashboard/health/symptoms/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Stethoscope } from "lucide-react";

export const metadata = {
  title: "Symptom Checker | HealthSync",
};

export default function SymptomsPage() {
  return (
    <ComingSoon
      title="Symptom Checker"
      description="AI-powered symptom analysis is coming soon. You'll be able to describe your symptoms and get intelligent health insights."
      icon={Stethoscope}
    />
  );
}
