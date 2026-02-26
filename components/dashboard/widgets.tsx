"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Bed,
  Calendar,
  Clock,
  Dumbbell,
  Droplets,
  Pill,
  Stethoscope,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  type DashboardData,
  type QuickAction,
  type TodayStat,
  type UpcomingItem,
  type ActivityItem,
  type WeeklyStat,
  getGreeting,
  getMotivationalMessage,
  formatDate,
} from "@/lib/mock-data/dashboard";

// ─── Shared Icon Map ───────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  bed: Bed,
  calendar: Calendar,
  dumbbell: Dumbbell,
  droplets: Droplets,
  pill: Pill,
  stethoscope: Stethoscope,
  "utensils-crossed": UtensilsCrossed,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Activity;
}

// ─── Animation Variants ───────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

// ═══════════════════════════════════════════════════════════════════
// 1. WELCOME CARD
// ═══════════════════════════════════════════════════════════════════
type WelcomeCardProps = {
  firstName: string;
};

export function WelcomeCard({ firstName }: WelcomeCardProps) {
  const greeting = useMemo(() => getGreeting(), []);
  const message = useMemo(() => getMotivationalMessage(), []);
  const date = useMemo(() => formatDate(), []);

  return (
    <motion.div
      custom={0}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10" />
        <CardContent className="relative p-6">
          <p className="text-sm font-medium text-emerald-100">{date}</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
            {greeting}, {firstName || "there"}! 👋
          </h2>
          <p className="mt-2 text-sm text-emerald-100">{message}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border-0"
            >
              <Link href="/dashboard/health/symptoms">
                <Stethoscope className="mr-2 h-4 w-4" />
                Check Symptoms
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border-0"
            >
              <Link href="/dashboard/nutrition/log">
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Log Meal
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 2. HEALTH SCORE CARD
// ═══════════════════════════════════════════════════════════════════
type HealthScoreCardProps = {
  score: number;
  trend: number;
  breakdown: { label: string; score: number; color: string }[];
};

export function HealthScoreCard({
  score,
  trend,
  breakdown,
}: HealthScoreCardProps) {
  // SVG circle parameters
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  const scoreColor =
    score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <motion.div
      custom={1}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Health Score
            </CardTitle>
            <Badge
              variant="outline"
              className={
                trend >= 0
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400"
              }
            >
              {trend >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {Math.abs(trend)}%
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Your overall wellness
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 pb-6">
          {/* Circular Progress */}
          <div className="relative flex items-center justify-center">
            <svg width="132" height="132" className="-rotate-90">
              <circle
                cx="66"
                cy="66"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-gray-100 dark:text-gray-800"
              />
              <motion.circle
                cx="66"
                cy="66"
                r={radius}
                fill="none"
                stroke={scoreColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <motion.span
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {score}
              </motion.span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="w-full space-y-2">
            {breakdown.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="w-16 text-xs text-muted-foreground truncate">
                  {item.label}
                </span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
                <span className="w-8 text-xs font-medium text-right">
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3. QUICK ACTIONS CARD
// ═══════════════════════════════════════════════════════════════════
type QuickActionsCardProps = {
  actions: QuickAction[];
};

export function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <motion.div
      custom={2}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Quick Actions
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {actions.map((action) => {
              const Icon = getIcon(action.iconName);
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.bgColor} transition-transform group-hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 4. TODAY'S SUMMARY CARD
// ═══════════════════════════════════════════════════════════════════
type TodaysSummaryCardProps = {
  stats: TodayStat[];
};

export function TodaysSummaryCard({ stats }: TodaysSummaryCardProps) {
  return (
    <motion.div
      custom={3}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Today&apos;s Summary
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              <Clock className="mr-1 h-3 w-3" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = getIcon(stat.iconName);
              const percentage = Math.min(
                Math.round((stat.value / stat.goal) * 100),
                100,
              );
              const isComplete = stat.value >= stat.goal;

              return (
                <motion.div
                  key={stat.label}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 dark:border-gray-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: stat.color }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {percentage}%
                    </span>
                  </div>

                  <div>
                    <p className="text-2xl font-bold tracking-tight">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      / {stat.goal.toLocaleString()} {stat.unit}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    />
                  </div>

                  <p
                    className="text-xs font-medium"
                    style={{ color: stat.color }}
                  >
                    {stat.label}
                    {isComplete && " ✓"}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 5. UPCOMING CARD
// ═══════════════════════════════════════════════════════════════════
type UpcomingCardProps = {
  items: UpcomingItem[];
};

export function UpcomingCard({ items }: UpcomingCardProps) {
  return (
    <motion.div
      custom={4}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Upcoming</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-auto p-0 text-xs text-emerald-600 hover:text-emerald-700"
            >
              <Link href="/dashboard/appointments">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          <CardDescription className="text-xs">
            Your schedule &amp; reminders
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nothing upcoming — enjoy your free time! 🎉
            </p>
          ) : (
            <div className="space-y-1">
              {items.map((item, index) => {
                const Icon = getIcon(item.iconName);
                return (
                  <motion.div
                    key={item.id}
                    className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.08 }}
                  >
                    <div
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: item.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
                      {item.time}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 6. RECENT ACTIVITY CARD
// ═══════════════════════════════════════════════════════════════════
type RecentActivityCardProps = {
  activities: ActivityItem[];
};

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  return (
    <motion.div
      custom={5}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-0 shadow-sm h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Recent Activity
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-auto p-0 text-xs text-emerald-600 hover:text-emerald-700"
            >
              <Link href="/dashboard/analytics">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          <CardDescription className="text-xs">
            Your latest health actions
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          {activities.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No recent activity yet. Start tracking! 📋
            </p>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-800" />

              <div className="space-y-1">
                {activities.map((activity, index) => {
                  const Icon = getIcon(activity.iconName);
                  return (
                    <motion.div
                      key={activity.id}
                      className="relative flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.08 }}
                    >
                      <div
                        className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-gray-900"
                        style={{ boxShadow: `0 0 0 2px ${activity.color}30` }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: activity.color }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.description}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 7. WEEKLY STATS CHART
// ═══════════════════════════════════════════════════════════════════
type WeeklyStatsChartProps = {
  data: WeeklyStat[];
};

type ChartTab = "steps" | "calories" | "sleep" | "water";

const chartTabs: {
  key: ChartTab;
  label: string;
  color: string;
  unit: string;
}[] = [
  { key: "steps", label: "Steps", color: "#10b981", unit: "" },
  { key: "calories", label: "Calories", color: "#f59e0b", unit: " kcal" },
  { key: "sleep", label: "Sleep", color: "#6366f1", unit: " hrs" },
  { key: "water", label: "Water", color: "#3b82f6", unit: " glasses" },
];

export function WeeklyStatsChart({ data }: WeeklyStatsChartProps) {
  const [activeTab, setActiveTab] = useState<ChartTab>("steps");
  const activeConfig = chartTabs.find((t) => t.key === activeTab)!;

  // Calculate average and trend
  const values = data.map((d) => d[activeTab]);
  const avg =
    Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  const lastTwo = values.slice(-2);
  const trend = lastTwo.length === 2 ? lastTwo[1] - lastTwo[0] : 0;

  return (
    <motion.div
      custom={6}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Weekly Overview
              </CardTitle>
              <CardDescription className="text-xs">
                Your {activeConfig.label.toLowerCase()} trend this week
              </CardDescription>
            </div>

            {/* Tab pills */}
            <div className="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              {chartTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-white text-foreground shadow-sm dark:bg-gray-700"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary stats */}
          <div className="mt-2 flex gap-6">
            <div>
              <p className="text-2xl font-bold">
                {avg.toLocaleString()}
                {activeConfig.unit}
              </p>
              <p className="text-xs text-muted-foreground">Daily average</p>
            </div>
            <div>
              <p className="flex items-center text-sm font-medium">
                {trend >= 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={trend >= 0 ? "text-emerald-600" : "text-red-600"}
                >
                  {trend >= 0 ? "+" : ""}
                  {trend.toLocaleString()}
                  {activeConfig.unit}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">vs yesterday</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                barSize={32}
                margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--border))"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  width={45}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [
                    `${value.toLocaleString()}${activeConfig.unit}`,
                    activeConfig.label,
                  ]}
                />
                <Bar
                  dataKey={activeTab}
                  fill={activeConfig.color}
                  radius={[6, 6, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
