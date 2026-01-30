// types/index.ts
// ============================================================
// TYPESCRIPT TYPE DEFINITIONS
// ============================================================
// Central place for all app-wide types
// These will grow as we build out features
// ============================================================

// User profile type (extends Supabase auth user)
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// API response wrapper type
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Pagination type
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form state type (for handling loading/error states)
export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Navigation item type
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
}

// Theme type
export type Theme = "light" | "dark" | "system";

// Health-specific types (we'll expand these on Day 2+)
export interface HealthMetric {
  id: string;
  user_id: string;
  type: "weight" | "sleep" | "water" | "steps" | "mood";
  value: number;
  unit: string;
  recorded_at: string;
  notes?: string;
}

// Date range for reports
export interface DateRange {
  from: Date;
  to: Date;
}
