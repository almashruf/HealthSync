// app/(dashboard)/dashboard/appointments/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Appointments | HealthSync",
};

export default function AppointmentsPage() {
  return (
    <ComingSoon
      title="My Appointments"
      description="Schedule, manage, and track your medical appointments in one place."
      iconName="book-open"
    />
  );
}
