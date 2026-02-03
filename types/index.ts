// types/index.ts
// ============================================================
// TYPESCRIPT TYPE DEFINITIONS
// ============================================================
// Central place for all app-wide types
// ============================================================

// ============================================
// USER TYPES
// ============================================
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

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

// ============================================
// FORM TYPES
// ============================================
export interface FormState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// ============================================
// NAVIGATION TYPES
// ============================================
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
}

// ============================================
// THEME TYPES
// ============================================
export type Theme = "light" | "dark" | "system";

// ============================================
// HEALTH-SPECIFIC TYPES
// ============================================
export type HealthMetricType =
  | "weight"
  | "sleep"
  | "water"
  | "steps"
  | "mood"
  | "calories"
  | "exercise";

export interface HealthMetric {
  id: string;
  user_id: string;
  type: HealthMetricType;
  value: number;
  unit: string;
  recorded_at: string;
  notes?: string;
  created_at: string;
}

export type MoodLevel = "great" | "good" | "okay" | "bad" | "terrible";

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: MoodLevel;
  notes?: string;
  recorded_at: string;
  created_at: string;
}

export interface DateRange {
  from: Date;
  to: Date;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================
export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameProps {
  className?: string;
}
