// app/(dashboard)/dashboard/medications/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Pill } from "lucide-react";

export const metadata = {
  title: "Medications | HealthSync",
};

export default function MedicationsPage() {
  return (
    <ComingSoon
      title="Medications"
      description="Manage your medications, set reminders, and track your adherence."
      iconName="Pill"
    />
  );
}
