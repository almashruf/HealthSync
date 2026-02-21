// components/layout/mobile-nav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { navigation } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const { sidebarMobileOpen, setSidebarMobileOpen } = useUIStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const isActive = (href: string) => pathname === href;

  return (
    <Sheet open={sidebarMobileOpen} onOpenChange={setSidebarMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="border-b border-gray-200 p-4 dark:border-gray-800">
          <SheetTitle className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              HealthSync
            </span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-73px)]">
          <nav className="flex flex-col gap-1 p-3">
            {navigation.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-1">
                {group.label && (
                  <div className="mb-1.5 mt-3 px-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {group.label}
                    </span>
                  </div>
                )}
                {group.label && groupIndex > 0 && (
                  <Separator className="my-2" />
                )}

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const hasChildren = !!item.children?.length;
                  const isItemExpanded = expandedItems.includes(item.title);
                  const isItemActive = item.href
                    ? isActive(item.href)
                    : (item.children?.some((c) => isActive(c.href)) ?? false);

                  if (!hasChildren && item.href) {
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setSidebarMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          "hover:bg-emerald-50 hover:text-emerald-700",
                          isItemActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-gray-600",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            isItemActive ? "text-emerald-600" : "text-gray-400",
                          )}
                        />
                        {item.title}
                      </Link>
                    );
                  }

                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => toggleExpand(item.title)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          "hover:bg-emerald-50 hover:text-emerald-700",
                          isItemActive ? "text-emerald-700" : "text-gray-600",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            isItemActive ? "text-emerald-600" : "text-gray-400",
                          )}
                        />
                        <span className="flex-1 text-left">{item.title}</span>
                        <svg
                          className={cn(
                            "h-4 w-4 text-gray-400 transition-transform duration-200",
                            isItemExpanded && "rotate-90",
                          )}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                      {isItemExpanded && (
                        <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l-2 border-emerald-100 pl-3">
                          {item.children?.map((child) => {
                            const ChildIcon = child.icon;
                            const childActive = isActive(child.href);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setSidebarMobileOpen(false)}
                                className={cn(
                                  "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                                  "hover:bg-emerald-50 hover:text-emerald-700",
                                  childActive
                                    ? "bg-emerald-50 text-emerald-700 font-medium"
                                    : "text-gray-500",
                                )}
                              >
                                <ChildIcon
                                  className={cn(
                                    "h-4 w-4",
                                    childActive
                                      ? "text-emerald-600"
                                      : "text-gray-400",
                                  )}
                                />
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
