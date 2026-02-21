// components/layout/breadcrumbs.tsx

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllNavItems } from "@/config/navigation";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Build breadcrumb segments from the URL
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((seg) => seg !== "dashboard"); // "dashboard" is the root, shown as Home icon

  if (segments.length === 0 && pathname === "/dashboard") {
    return (
      <nav className="flex items-center text-sm text-gray-500">
        <Home className="h-4 w-4 text-emerald-600" />
        <ChevronRight className="mx-1.5 h-3.5 w-3.5 text-gray-300" />
        <span className="font-medium text-gray-800 dark:text-gray-200">
          Dashboard
        </span>
      </nav>
    );
  }

  // Build cumulative paths
  const allNavItems = getAllNavItems();
  const pathParts = pathname.split("/").filter(Boolean);
  const crumbs = pathParts.map((seg, idx) => {
    const href = "/" + pathParts.slice(0, idx + 1).join("/");
    // Look up the display name from navigation config
    const navItem = allNavItems.find((item) => item.href === href);
    const title =
      navItem?.title ||
      seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
    return { title, href };
  });

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <Link
        href="/dashboard"
        className="flex items-center transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <Home className="h-4 w-4" />
      </Link>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <Fragment key={crumb.href}>
            <ChevronRight className="mx-1.5 h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
            {isLast ? (
              <span
                className={cn(
                  "font-medium text-gray-800 dark:text-gray-200",
                  "max-w-[200px] truncate",
                )}
              >
                {crumb.title}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="max-w-[200px] truncate transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {crumb.title}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
