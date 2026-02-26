import {
  UtensilsCrossed,
  Dumbbell,
  Pill,
  Bed,
  Calendar,
  Stethoscope,
  Activity,
  Droplets,
  type LucideIcon,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────
export type QuickAction = {
  label: string;
  href: string;
  iconName: string;
  color: string;
  bgColor: string;
};

export type TodayStat = {
  label: string;
  value: number;
  goal: number;
  unit: string;
  iconName: string;
  color: string;
};

export type UpcomingItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: "appointment" | "medication" | "workout";
  iconName: string;
  color: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "food" | "workout" | "vitals" | "sleep" | "medication";
  iconName: string;
  color: string;
};

export type WeeklyStat = {
  day: string;
  steps: number;
  calories: number;
  sleep: number;
  water: number;
};

export type DashboardData = {
  healthScore: number;
  healthScoreTrend: number;
  healthScoreBreakdown: { label: string; score: number; color: string }[];
  todayStats: TodayStat[];
  quickActions: QuickAction[];
  upcoming: UpcomingItem[];
  recentActivity: ActivityItem[];
  weeklyStats: WeeklyStat[];
};

// ─── Helpers ───────────────────────────────────────────────────────
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getMotivationalMessage(): string {
  const messages = [
    "Let's make today a healthy one! 💪",
    "Small steps lead to big changes! 🌱",
    "Your health journey continues! 🚀",
    "Stay consistent, stay strong! ⭐",
    "Every healthy choice matters! 🎯",
    "You're doing amazing! Keep it up! 🔥",
    "Health is wealth — invest in yourself! 💚",
    "One day at a time, one step at a time! 🏃",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function formatDate(): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

// ─── Mock Data ─────────────────────────────────────────────────────
export const mockDashboardData: DashboardData = {
  healthScore: 78,
  healthScoreTrend: 3,
  healthScoreBreakdown: [
    { label: "Activity", score: 82, color: "#10b981" },
    { label: "Nutrition", score: 71, color: "#f59e0b" },
    { label: "Sleep", score: 85, color: "#6366f1" },
    { label: "Hydration", score: 65, color: "#3b82f6" },
    { label: "Mental", score: 88, color: "#ec4899" },
  ],

  todayStats: [
    {
      label: "Steps",
      value: 6432,
      goal: 10000,
      unit: "steps",
      iconName: "activity",
      color: "#10b981",
    },
    {
      label: "Calories",
      value: 1450,
      goal: 2000,
      unit: "kcal",
      iconName: "utensils-crossed",
      color: "#f59e0b",
    },
    {
      label: "Water",
      value: 5,
      goal: 8,
      unit: "glasses",
      iconName: "droplets",
      color: "#3b82f6",
    },
    {
      label: "Sleep",
      value: 7.5,
      goal: 8,
      unit: "hours",
      iconName: "bed",
      color: "#6366f1",
    },
  ],

  quickActions: [
    {
      label: "Log Food",
      href: "/dashboard/nutrition/log",
      iconName: "utensils-crossed",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      label: "Start Workout",
      href: "/dashboard/fitness/workouts",
      iconName: "dumbbell",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Check Symptoms",
      href: "/dashboard/health/symptoms",
      iconName: "stethoscope",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/30",
    },
    {
      label: "Log Sleep",
      href: "/dashboard/wellness/sleep",
      iconName: "bed",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
      label: "Medication",
      href: "/dashboard/medications",
      iconName: "pill",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      label: "Appointment",
      href: "/dashboard/appointments",
      iconName: "calendar",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ],

  upcoming: [
    {
      id: "1",
      title: "Dr. Sarah Chen",
      subtitle: "Annual checkup",
      time: "Tomorrow, 10:00 AM",
      type: "appointment",
      iconName: "calendar",
      color: "#8b5cf6",
    },
    {
      id: "2",
      title: "Vitamin D",
      subtitle: "1000 IU - Take with breakfast",
      time: "Today, 8:00 AM",
      type: "medication",
      iconName: "pill",
      color: "#10b981",
    },
    {
      id: "3",
      title: "Morning Run",
      subtitle: "5K planned route",
      time: "Tomorrow, 6:30 AM",
      type: "workout",
      iconName: "dumbbell",
      color: "#3b82f6",
    },
    {
      id: "4",
      title: "Metformin",
      subtitle: "500mg - Take after dinner",
      time: "Today, 7:00 PM",
      type: "medication",
      iconName: "pill",
      color: "#10b981",
    },
    {
      id: "5",
      title: "Dr. Mike Johnson",
      subtitle: "Dental cleaning",
      time: "Friday, 2:00 PM",
      type: "appointment",
      iconName: "calendar",
      color: "#8b5cf6",
    },
  ],

  recentActivity: [
    {
      id: "1",
      title: "Breakfast logged",
      description: "Oatmeal with berries — 380 kcal",
      time: "2 hours ago",
      type: "food",
      iconName: "utensils-crossed",
      color: "#f59e0b",
    },
    {
      id: "2",
      title: "Morning workout",
      description: "30 min HIIT — 320 kcal burned",
      time: "4 hours ago",
      type: "workout",
      iconName: "dumbbell",
      color: "#3b82f6",
    },
    {
      id: "3",
      title: "Blood pressure recorded",
      description: "120/80 mmHg — Normal range",
      time: "5 hours ago",
      type: "vitals",
      iconName: "activity",
      color: "#10b981",
    },
    {
      id: "4",
      title: "Sleep tracked",
      description: "7.5 hours — Good quality",
      time: "8 hours ago",
      type: "sleep",
      iconName: "bed",
      color: "#6366f1",
    },
    {
      id: "5",
      title: "Vitamin D taken",
      description: "1000 IU — Morning dose",
      time: "9 hours ago",
      type: "medication",
      iconName: "pill",
      color: "#ec4899",
    },
    {
      id: "6",
      title: "Lunch logged",
      description: "Grilled chicken salad — 520 kcal",
      time: "Yesterday",
      type: "food",
      iconName: "utensils-crossed",
      color: "#f59e0b",
    },
  ],

  weeklyStats: [
    { day: "Mon", steps: 8200, calories: 1800, sleep: 7.0, water: 6 },
    { day: "Tue", steps: 6500, calories: 2100, sleep: 6.5, water: 5 },
    { day: "Wed", steps: 9100, calories: 1900, sleep: 8.0, water: 7 },
    { day: "Thu", steps: 7300, calories: 1750, sleep: 7.5, water: 8 },
    { day: "Fri", steps: 10200, calories: 2000, sleep: 7.0, water: 6 },
    { day: "Sat", steps: 4500, calories: 2300, sleep: 8.5, water: 4 },
    { day: "Sun", steps: 6432, calories: 1450, sleep: 7.5, water: 5 },
  ],
};
