// components/layout/sidebar.tsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeft, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { navigation } from "@/config/navigation";
import { SidebarItem } from "./sidebar-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 68 : 280 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
        "hidden lg:flex",
      )}
    >
      {/* ─── Logo ─── */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-gray-200 px-4 dark:border-gray-800",
          sidebarCollapsed ? "justify-center" : "gap-3",
        )}
      >
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20">
            <Heart className="h-5 w-5 text-white" fill="white" />
          </div>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              HealthSync
            </motion.span>
          )}
        </Link>
      </div>

      {/* ─── Navigation ─── */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navigation.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-2">
              {/* Group label */}
              {group.label && !sidebarCollapsed && (
                <div className="mb-2 mt-2 px-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {group.label}
                  </span>
                </div>
              )}
              {group.label && sidebarCollapsed && groupIndex > 0 && (
                <Separator className="my-2" />
              )}
              {/* Group items */}
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <SidebarItem key={item.title} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* ─── Collapse Toggle ─── */}
      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className={cn(
                "w-full justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-700",
                "dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300",
                !sidebarCollapsed && "justify-start gap-3 px-3",
              )}
            >
              {sidebarCollapsed ? (
                <PanelLeft className="h-5 w-5" />
              ) : (
                <>
                  <PanelLeftClose className="h-5 w-5" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          {sidebarCollapsed && (
            <TooltipContent side="right">Expand sidebar</TooltipContent>
          )}
        </Tooltip>
      </div>
    </motion.aside>
  );
}
