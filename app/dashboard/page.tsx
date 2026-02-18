// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/auth/logout-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Activity,
  Moon,
  Brain,
  Pill,
  Users,
  Utensils,
  Droplets,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user, redirect to login (middleware should catch this, but double-check)
  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || user.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="h-7 w-7 text-emerald-600 fill-current" />
              <span className="text-xl font-bold text-gray-900">
                HealthSync
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {displayName}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good {getGreeting()}, {displayName}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s an overview of your health journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <QuickStatCard
            icon={Activity}
            label="Today's Activity"
            value="--"
            subtext="No workouts logged"
            color="emerald"
          />
          <QuickStatCard
            icon={Droplets}
            label="Hydration"
            value="--"
            subtext="0 glasses today"
            color="blue"
          />
          <QuickStatCard
            icon={Moon}
            label="Last Night's Sleep"
            value="--"
            subtext="Not tracked"
            color="purple"
          />
          <QuickStatCard
            icon={Brain}
            label="Mood"
            value="--"
            subtext="How are you feeling?"
            color="orange"
          />
        </div>

        {/* Feature Cards */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Explore Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Activity}
            title="Symptom Checker"
            description="AI-powered symptom analysis to help you understand your health concerns"
            href="/health/symptoms"
            color="emerald"
          />
          <FeatureCard
            icon={Utensils}
            title="Nutrition Tracker"
            description="Log your meals and track your daily nutrition goals"
            href="/health/nutrition"
            color="orange"
          />
          <FeatureCard
            icon={Activity}
            title="Fitness Tracker"
            description="Plan workouts and track your exercise progress"
            href="/health/fitness"
            color="blue"
          />
          <FeatureCard
            icon={Moon}
            title="Sleep Tracker"
            description="Monitor your sleep patterns and improve your rest"
            href="/health/sleep"
            color="purple"
          />
          <FeatureCard
            icon={Brain}
            title="Mental Wellness"
            description="Track your mood and practice mindfulness"
            href="/health/mental"
            color="pink"
          />
          <FeatureCard
            icon={Pill}
            title="Medications"
            description="Never miss a dose with medication reminders"
            href="/health/medications"
            color="red"
          />
          <FeatureCard
            icon={Users}
            title="Community"
            description="Connect with others on similar health journeys"
            href="/community"
            color="teal"
          />
          <FeatureCard
            icon={Heart}
            title="Vital Signs"
            description="Track blood pressure, heart rate, and more"
            href="/health/vitals"
            color="rose"
          />
        </div>

        {/* Getting Started Section */}
        {!profile?.date_of_birth && (
          <Card className="mt-8 border-emerald-200 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-emerald-800">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-emerald-700">
                Add your health information to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
              >
                Complete Profile Setup
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

// Helper function to get time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

// Quick Stat Card Component
function QuickStatCard({
  icon: Icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  color: "emerald" | "blue" | "purple" | "orange";
}) {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400">{subtext}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  color:
    | "emerald"
    | "blue"
    | "purple"
    | "orange"
    | "pink"
    | "red"
    | "teal"
    | "rose";
}) {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200",
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
    purple: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
    orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
    pink: "bg-pink-100 text-pink-600 group-hover:bg-pink-200",
    red: "bg-red-100 text-red-600 group-hover:bg-red-200",
    teal: "bg-teal-100 text-teal-600 group-hover:bg-teal-200",
    rose: "bg-rose-100 text-rose-600 group-hover:bg-rose-200",
  };

  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-md hover:border-gray-300 cursor-pointer group">
        <CardContent className="p-6">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${colorClasses[color]}`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
