// app/(auth)/forgot-password/page.tsx
import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | HealthSync",
  description: "Reset your HealthSync password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
