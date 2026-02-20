// components/layout/sidebar-item.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "@/config/navigation";

type SidebarItemProps = {
  item: NavItem;
};

export function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, expandedGroups, toggleGroup } = useUIStore();

  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedGroups.includes(item.title);

  // Check if the current path matches this item or any of its children
  const isActive = item.href
    ? pathname === item.href
    : (item.children?.some((child) => pathname === child.href) ?? false);

  const isChildActive = (href: string) => pathname === href;

  // ─── Simple link (no children) ───
  if (!hasChildren && item.href) {
    const linkContent = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          "hover:bg-emerald-50 hover:text-emerald-700",
          "dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400",
          isActive
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
            : "text-gray-600 dark:text-gray-400",
          sidebarCollapsed && "justify-center px-2",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0 transition-colors",
            isActive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-gray-400 dark:text-gray-500",
          )}
        />
        {!sidebarCollapsed && <span className="truncate">{item.title}</span>}
        {/* Active indicator bar */}
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-emerald-500"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </Link>
    );

    // When collapsed, wrap in tooltip
    if (sidebarCollapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="relative">{linkContent}</div>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div className="relative">{linkContent}</div>;
  }

  // ─── Collapsible group (has children) ───
  const triggerContent = (
    <button
      onClick={() => toggleGroup(item.title)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-emerald-50 hover:text-emerald-700",
        "dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400",
        isActive
          ? "text-emerald-700 dark:text-emerald-400"
          : "text-gray-600 dark:text-gray-400",
        sidebarCollapsed && "justify-center px-2",
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 shrink-0 transition-colors",
          isActive
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-gray-400 dark:text-gray-500",
        )}
      />
      {!sidebarCollapsed && (
        <>
          <span className="flex-1 truncate text-left">{item.title}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
              isExpanded && "rotate-90",
            )}
          />
        </>
      )}
    </button>
  );

  if (sidebarCollapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{triggerContent}</TooltipTrigger>
        <TooltipContent side="right" className="p-0">
          <div className="flex flex-col gap-0.5 p-2">
            <span className="mb-1 px-2 text-xs font-semibold text-gray-500">
              {item.title}
            </span>
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                  "hover:bg-emerald-50 hover:text-emerald-700",
                  isChildActive(child.href)
                    ? "bg-emerald-100 text-emerald-700 font-medium"
                    : "text-gray-600",
                )}
              >
                <child.icon className="h-4 w-4" />
                {child.title}
              </Link>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div>
      {triggerContent}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-emerald-100 pl-3 dark:border-emerald-900">
              {item.children?.map((child) => {
                const ChildIcon = child.icon;
                const childActive = isChildActive(child.href);
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all duration-150",
                      "hover:bg-emerald-50 hover:text-emerald-700",
                      "dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400",
                      childActive
                        ? "bg-emerald-50 text-emerald-700 font-medium dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "text-gray-500 dark:text-gray-400",
                    )}
                  >
                    <ChildIcon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        childActive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-400 dark:text-gray-500",
                      )}
                    />
                    <span className="truncate">{child.title}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
