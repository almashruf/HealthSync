// components/dashboard/dashboard-home.tsx

"use client";

import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  Heart,
  Activity,
  Apple,
  Dumbbell,
  Moon,
  Pill,
  TrendingUp,
  Droplets,
  Flame,
  Footprints,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type DashboardHomeProps = {
  user: User;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Placeholder stats — will be wired to real data later
const quickStats = [
  {
    label: "Heart Rate",
    value: "--",
    unit: "bpm",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
  },
  {
    label: "Steps Today",
    value: "--",
    unit: "steps",
    icon: Footprints,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    label: "Calories",
    value: "--",
    unit: "kcal",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    label: "Water",
    value: "--",
    unit: "glasses",
    icon: Droplets,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
  },
  {
    label: "Sleep",
    value: "--",
    unit: "hours",
    icon: Moon,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  {
    label: "Mood",
    value: "--",
    unit: "",
    icon: Activity,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
];

const quickActions = [
  {
    title: "Check Symptoms",
    description: "AI-powered symptom analysis",
    icon: Heart,
    href: "/dashboard/health/symptoms",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Log Meal",
    description: "Track your nutrition",
    icon: Apple,
    href: "/dashboard/nutrition/log",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Start Workout",
    description: "Begin a training session",
    icon: Dumbbell,
    href: "/dashboard/fitness/workouts",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Log Medication",
    description: "Record your medications",
    icon: Pill,
    href: "/dashboard/medications",
    color: "from-purple-500 to-violet-500",
  },
];

export function DashboardHome({ user }: DashboardHomeProps) {
  const fullName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "there";
  const firstName = fullName.split(" ")[0];

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* ─── Welcome Banner ─── */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 text-white shadow-lg shadow-emerald-500/20 md:p-8">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="200"
                cy="200"
                r="150"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="200"
                cy="200"
                r="100"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="200"
                cy="200"
                r="50"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="300"
                cy="100"
                r="80"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle
                cx="100"
                cy="300"
                r="60"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold md:text-3xl">
                {greeting}, {firstName}! 👋
              </h1>
            </div>
            <p className="mt-2 max-w-lg text-emerald-100">
              Welcome to your health dashboard. Track your wellness journey,
              monitor vitals, and stay on top of your health goals.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 border-0"
              >
                <Clock className="mr-1 h-3 w-3" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 border-0"
              >
                <TrendingUp className="mr-1 h-3 w-3" />
                Profile incomplete — complete setup
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Quick Stats Grid ─── */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Today&apos;s Overview
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="border-0 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div
                    className={`mb-3 inline-flex rounded-lg p-2 ${stat.bgColor}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* ─── Quick Actions ─── */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.title}
                className="group cursor-pointer border-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300 transition-transform group-hover:translate-x-0.5 dark:text-gray-600" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* ─── Recent Activity & Upcoming ─── */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  No recent activity
                </p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Start tracking to see your activity here
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Nothing upcoming
                </p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Schedule appointments and set medication reminders
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
