// app/(dashboard)/dashboard/health/records/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Health Records | HealthSync",
};

export default function RecordsPage() {
  return (
    <ComingSoon
      title="Health Records"
      description="View and manage your health records, test results, and medical history in one place."
      icon={FileText}
    />
  );
}
