// app/page.tsx
// ============================================
// LANDING PAGE - Using Shadcn/ui Components
// ============================================

import Link from "next/link";
import {
  Activity,
  Brain,
  Heart,
  Moon,
  Droplets,
  Utensils,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Feature data
const features = [
  {
    icon: Activity,
    title: "Activity Tracking",
    description:
      "Monitor your daily steps, workouts, and physical activities with ease.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    icon: Moon,
    title: "Sleep Analysis",
    description: "Track your sleep patterns and get insights for better rest.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Utensils,
    title: "Nutrition Logging",
    description: "Log meals and track your nutritional intake effortlessly.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: Droplets,
    title: "Hydration Tracking",
    description:
      "Stay hydrated with smart reminders and daily water intake goals.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950",
  },
  {
    icon: Heart,
    title: "Mood & Wellness",
    description: "Track your emotional well-being and identify patterns.",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description: "Get personalized recommendations powered by AI.",
    color: "text-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-950",
  },
];

const benefits = [
  "100% Free to use",
  "No credit card required",
  "AI-powered insights",
  "Privacy focused",
  "Cross-platform sync",
  "Export your data anytime",
];

const stats = [
  { value: "100%", label: "Free Forever", color: "text-emerald-500" },
  { value: "AI", label: "Powered Insights", color: "text-blue-500" },
  { value: "24/7", label: "Available", color: "text-purple-500" },
  { value: "∞", label: "Data Storage", color: "text-cyan-500" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">HealthSync</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Benefits
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* HERO SECTION */}
      {/* ========================================= */}
      <section className="relative overflow-hidden bg-health-gradient py-20 dark:bg-health-gradient-dark md:py-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-[var(--color-health-primary-200)]/30 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-[var(--color-health-secondary-200)]/30 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center space-y-8 text-center">
            {/* Badge */}
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Powered by AI</span>
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Complete
              <span className="text-gradient-health block">
                Health & Wellness
              </span>
              Companion
            </h1>

            {/* Subheading */}
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Track your health metrics, get AI-powered insights, and achieve
              your wellness goals — all in one beautiful, free platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="px-8 text-lg">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-8 text-lg">
                  See Features
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 pt-8 text-sm text-muted-foreground">
              {benefits.slice(0, 3).map((benefit) => (
                <div key={benefit} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* FEATURES SECTION */}
      {/* ========================================= */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
              Comprehensive health tracking tools designed to help you live your
              best life.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:shadow-lg hover:border-primary/50"
              >
                <CardHeader>
                  <div
                    className={`mb-2 inline-flex w-fit rounded-lg p-3 ${feature.bgColor}`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="transition-colors group-hover:text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* BENEFITS SECTION */}
      {/* ========================================= */}
      <section id="benefits" className="bg-muted/50 py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left Content */}
            <div>
              <Badge variant="outline" className="mb-4">
                Benefits
              </Badge>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Why Choose HealthSync?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                We believe everyone deserves access to powerful health tracking
                tools. That's why HealthSync is completely free, forever.
              </p>

              {/* Benefits List */}
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-6 text-center">
                  <div className={`mb-2 text-4xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* CTA SECTION */}
      {/* ========================================= */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-[var(--color-health-secondary-500)]">
            <CardContent className="p-12 text-center text-primary-foreground">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Transform Your Health?
              </h2>
              <p className="mx-auto mb-8 max-w-[600px] text-lg opacity-90">
                Join thousands of users who are already tracking their health
                journey with HealthSync.
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="px-8 text-lg">
                  Get Started — It's Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">HealthSync</span>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HealthSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
