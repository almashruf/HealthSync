"use server";


import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
} from "./validation";

// Types for action responses
type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * LOGIN ACTION
 * Authenticates user with email and password
 */
export async function loginAction(
  formData: LoginFormData,
): Promise<ActionResponse> {
  // Validate the form data on the server (double validation for security)
  const validatedFields = loginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // Create Supabase client for server
  const supabase = await createServerSupabaseClient();

  // Attempt to sign in
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Handle specific error types
    if (error.message.includes("Invalid login credentials")) {
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
      };
    }
    if (error.message.includes("Email not confirmed")) {
      return {
        success: false,
        message: "Please verify your email address before logging in.",
      };
    }
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Login successful! Redirecting...",
  };
}

/**
 * REGISTER ACTION
 * Creates a new user account
 */
export async function registerAction(
  formData: RegisterFormData,
): Promise<ActionResponse> {
  // Validate form data
  const validatedFields = registerSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, fullName } = validatedFields.data;

  const supabase = await createServerSupabaseClient();

  // Get the origin for email redirect URL
  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  // Sign up the user
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This is where we pass the user's name to be stored
      data: {
        full_name: fullName,
      },
      // Where to redirect after email confirmation
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      return {
        success: false,
        message:
          "An account with this email already exists. Try logging in instead.",
      };
    }
    return {
      success: false,
      message: error.message,
    };
  }

  // Check if email confirmation is required
  // In development, you might disable this in Supabase dashboard
  if (data.user && !data.session) {
    return {
      success: true,
      message:
        "Account created! Please check your email to verify your account.",
    };
  }

  return {
    success: true,
    message: "Account created successfully! Redirecting...",
  };
}

/**
 * FORGOT PASSWORD ACTION
 * Sends a password reset email
 */
export async function forgotPasswordAction(
  formData: ForgotPasswordFormData,
): Promise<ActionResponse> {
  const validatedFields = forgotPasswordSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  const supabase = await createServerSupabaseClient();
  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  // Always return success to prevent email enumeration attacks
  // (Don't tell attackers if an email exists in your system)
  return {
    success: true,
    message:
      "If an account with that email exists, we sent a password reset link.",
  };
}

/**
 * RESET PASSWORD ACTION
 * Updates the user's password (called after clicking reset email link)
 */
export async function resetPasswordAction(
  formData: ResetPasswordFormData,
): Promise<ActionResponse> {
  const validatedFields = resetPasswordSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password } = validatedFields.data;

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Password updated successfully! Redirecting to login...",
  };
}

/**
 * LOGOUT ACTION
 * Signs out the current user
 */
export async function logoutAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}

/**
 * GET CURRENT USER
 * Returns the currently logged-in user (server-side)
 */
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
