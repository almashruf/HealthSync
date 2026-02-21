// app/(dashboard)/dashboard/appointments/doctors/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { UserSearch } from "lucide-react";

export const metadata = {
  title: "Find Doctors | HealthSync",
};

export default function FindDoctorsPage() {
  return (
    <ComingSoon
      title="Find Doctors"
      description="Search for healthcare providers, read reviews, and book appointments."
      icon={UserSearch}
    />
  );
}
