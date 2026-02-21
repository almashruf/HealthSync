// components/layout/navbar.tsx

"use client";

import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { UserMenu } from "./user-menu";
import { MobileNav } from "./mobile-nav";
import { Breadcrumbs } from "./breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function Navbar() {
  const { sidebarCollapsed } = useUIStore();

  return (
    <motion.header
      initial={false}
      animate={{
        paddingLeft: 0,
      }}
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80",
        "md:px-6",
      )}
    >
      {/* Left: Mobile menu + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <MobileNav />
        <div className="hidden lg:block">
          <Breadcrumbs />
        </div>
      </div>

      {/* Right: Search, Notifications, User */}
      <div className="flex items-center gap-2">
        {/* Search placeholder */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications placeholder */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {/* Notification dot - hardcoded for now */}
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        </Button>

        {/* Separator */}
        <div className="mx-1 hidden h-6 w-px bg-gray-200 dark:bg-gray-700 md:block" />

        {/* User menu */}
        <UserMenu />
      </div>
    </motion.header>
  );
}
