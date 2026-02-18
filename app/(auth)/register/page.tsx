// app/(auth)/register/page.tsx
import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account | HealthSync",
  description: "Create your free HealthSync account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
