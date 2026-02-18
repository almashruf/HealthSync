// app/dashboard/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | HealthSync",
  description: "Your personal health dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
