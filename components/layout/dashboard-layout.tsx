// components/layout/dashboard-layout.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "@/stores/ui-store";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const sidebarWidth = isDesktop ? (sidebarCollapsed ? 68 : 280) : 0;

  // Static shell during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="hidden lg:block">
            <div className="fixed left-0 top-0 z-40 h-screen w-[280px] border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950" />
          </div>
          <div className="flex min-h-screen flex-col lg:ml-[280px]">
            <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 md:px-6">
              <div className="flex-1" />
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />

        <motion.div
          initial={false}
          animate={{ marginLeft: sidebarWidth }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex min-h-screen flex-col"
        >
          <Navbar />

          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
