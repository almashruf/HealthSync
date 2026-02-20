// config/navigation.ts

import {
  LayoutDashboard,
  Heart,
  Apple,
  Dumbbell,
  Moon,
  Pill,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Stethoscope,
  Activity,
  FileText,
  UtensilsCrossed,
  ClipboardList,
  BookOpen,
  Bed,
  Smile,
  Sparkles,
  UserSearch,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

export type NavChild = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export type NavItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  children?: NavChild[];
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const navigation: NavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Health",
    items: [
      {
        title: "Health",
        icon: Heart,
        children: [
          {
            title: "Symptom Checker",
            href: "/dashboard/health/symptoms",
            icon: Stethoscope,
          },
          {
            title: "Vitals",
            href: "/dashboard/health/vitals",
            icon: Activity,
          },
          {
            title: "Records",
            href: "/dashboard/health/records",
            icon: FileText,
          },
        ],
      },
      {
        title: "Nutrition",
        icon: Apple,
        children: [
          {
            title: "Food Log",
            href: "/dashboard/nutrition/log",
            icon: UtensilsCrossed,
          },
          {
            title: "Meal Plans",
            href: "/dashboard/nutrition/plans",
            icon: ClipboardList,
          },
          {
            title: "Recipes",
            href: "/dashboard/nutrition/recipes",
            icon: BookOpen,
          },
        ],
      },
      {
        title: "Fitness",
        icon: Dumbbell,
        children: [
          {
            title: "Workouts",
            href: "/dashboard/fitness/workouts",
            icon: Dumbbell,
          },
          {
            title: "Exercises",
            href: "/dashboard/fitness/exercises",
            icon: Activity,
          },
          {
            title: "Progress",
            href: "/dashboard/fitness/progress",
            icon: BarChart3,
          },
        ],
      },
    ],
  },
  {
    label: "Lifestyle",
    items: [
      {
        title: "Wellness",
        icon: Moon,
        children: [
          {
            title: "Sleep",
            href: "/dashboard/wellness/sleep",
            icon: Bed,
          },
          {
            title: "Mood",
            href: "/dashboard/wellness/mood",
            icon: Smile,
          },
          {
            title: "Journal",
            href: "/dashboard/wellness/journal",
            icon: Sparkles,
          },
        ],
      },
      {
        title: "Medications",
        href: "/dashboard/medications",
        icon: Pill,
      },
    ],
  },
  {
    label: "Care",
    items: [
      {
        title: "Appointments",
        icon: Calendar,
        children: [
          {
            title: "My Appointments",
            href: "/dashboard/appointments",
            icon: Calendar,
          },
          {
            title: "Find Doctors",
            href: "/dashboard/appointments/doctors",
            icon: UserSearch,
          },
        ],
      },
      {
        title: "Community",
        icon: Users,
        children: [
          {
            title: "Groups",
            href: "/dashboard/community/groups",
            icon: Users,
          },
          {
            title: "My Posts",
            href: "/dashboard/community/posts",
            icon: MessageSquare,
          },
        ],
      },
    ],
  },
  {
    label: "Other",
    items: [
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

// Flat list of all navigation hrefs — useful for breadcrumbs
export function getAllNavItems(): { title: string; href: string }[] {
  const items: { title: string; href: string }[] = [];
  for (const group of navigation) {
    for (const item of group.items) {
      if (item.href) {
        items.push({ title: item.title, href: item.href });
      }
      if (item.children) {
        for (const child of item.children) {
          items.push({ title: child.title, href: child.href });
        }
      }
    }
  }
  return items;
}
