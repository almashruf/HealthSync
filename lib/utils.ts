// lib/utils.ts
// ============================================================
// UTILITY FUNCTIONS
// ============================================================
// Reusable helper functions used throughout the app
// ============================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names intelligently
 * - Merges Tailwind classes properly (no conflicts)
 * - Handles conditional classes
 *
 * Example:
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-6")
 * Result: "py-2 px-6 bg-blue-500" (px-6 overrides px-4)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to readable string
 * Example: formatDate(new Date()) → "Jan 15, 2024"
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a date with time
 * Example: formatDateTime(new Date()) → "Jan 15, 2024, 3:30 PM"
 */
export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Delay execution (useful for loading states, testing)
 * Example: await sleep(1000) // wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely parse JSON with fallback
 * Example: safeJsonParse('{"a":1}', {}) → { a: 1 }
 * Example: safeJsonParse('invalid', {}) → {}
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Truncate text with ellipsis
 * Example: truncate("Hello World", 5) → "Hello..."
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Capitalize first letter
 * Example: capitalize("hello") → "Hello"
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate initials from name
 * Example: getInitials("John Doe") → "JD"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
