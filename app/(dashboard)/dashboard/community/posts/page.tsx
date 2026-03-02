// app/(dashboard)/dashboard/community/posts/page.tsx

import { ComingSoon } from "@/components/dashboard";
import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "My Posts | HealthSync",
};

export default function PostsPage() {
  return (
    <ComingSoon
      title="My Posts"
      description="View and manage your community posts, comments, and interactions."
      iconName="MessageSquare"
    />
  );
}
