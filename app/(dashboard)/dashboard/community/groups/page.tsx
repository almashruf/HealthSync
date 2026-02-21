// app/(dashboard)/dashboard/community/groups/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { Users } from "lucide-react";

export const metadata = {
  title: "Community Groups | HealthSync",
};

export default function GroupsPage() {
  return (
    <ComingSoon
      title="Support Groups"
      description="Join health communities, share experiences, and find support from others."
      icon={Users}
    />
  );
}
