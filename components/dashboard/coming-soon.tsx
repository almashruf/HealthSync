// components/dashboard/coming-soon.tsx

"use client";

import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ComingSoonProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
};

export function ComingSoon({
  title,
  description = "This feature is coming soon. We're working hard to bring it to you!",
  icon: Icon = Construction,
}: ComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 items-center justify-center"
    >
      <Card className="w-full max-w-md border-0 shadow-sm">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <div className="mb-4 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
            <Icon className="h-10 w-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
