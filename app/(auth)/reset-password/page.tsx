// app/(auth)/reset-password/page.tsx
import { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | HealthSync",
  description: "Set your new HealthSync password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
