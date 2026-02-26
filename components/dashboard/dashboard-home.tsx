"use client";

import { useEffect, useState } from "react";
import {
  WelcomeCard,
  HealthScoreCard,
  QuickActionsCard,
  TodaysSummaryCard,
  UpcomingCard,
  RecentActivityCard,
  WeeklyStatsChart,
} from "./widgets";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { mockDashboardData } from "@/lib/mock-data/dashboard";
import { useAuth } from "@/hooks/use-auth";

export function DashboardHome() {
  const { user, loading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);

  // Simulate data fetch — will be replaced with real queries later
  useEffect(() => {
    const timer = setTimeout(() => setDataLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (authLoading || dataLoading) {
    return <DashboardSkeleton />;
  }

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  const d = mockDashboardData;

  return (
    <div className="space-y-6">
      {/* Row 1: Welcome + Health Score */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WelcomeCard firstName={firstName} />
        </div>
        <HealthScoreCard
          score={d.healthScore}
          trend={d.healthScoreTrend}
          breakdown={d.healthScoreBreakdown}
        />
      </div>

      {/* Row 2: Quick Actions */}
      <QuickActionsCard actions={d.quickActions} />

      {/* Row 3: Today's Summary */}
      <TodaysSummaryCard stats={d.todayStats} />

      {/* Row 4: Upcoming + Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingCard items={d.upcoming} />
        <RecentActivityCard activities={d.recentActivity} />
      </div>

      {/* Row 5: Weekly Stats */}
      <WeeklyStatsChart data={d.weeklyStats} />
    </div>
  );
}
