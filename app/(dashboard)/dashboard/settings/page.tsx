// app/(dashboard)/dashboard/settings/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Settings } from "lucide-react";

export const metadata = {
  title: "Settings | HealthSync",
};

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      description="Manage your profile, preferences, notifications, and account settings."
      iconName="Settings"
    />
  );
}
