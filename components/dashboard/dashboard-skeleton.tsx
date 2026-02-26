import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Row 1: Welcome + Health Score */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-3 h-8 w-72" />
              <Skeleton className="mt-3 h-4 w-56" />
              <div className="mt-5 flex gap-3">
                <Skeleton className="h-9 w-36 rounded-md" />
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-28" />
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pb-6">
            <Skeleton className="h-[132px] w-[132px] rounded-full" />
            <div className="w-full space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-2 flex-1 rounded-full" />
                  <Skeleton className="h-3 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-28" />
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Row 3: Today's Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-36" />
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="mt-3 h-7 w-20" />
                <Skeleton className="mt-1 h-3 w-24" />
                <Skeleton className="mt-3 h-2 w-full rounded-full" />
                <Skeleton className="mt-3 h-3 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Row 4: Upcoming + Recent */}
      <div className="grid gap-6 lg:grid-cols-2">
        {[1, 2].map((col) => (
          <Card key={col} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="pb-6 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 p-2">
                  <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 5: Weekly Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-8 w-60 rounded-lg" />
          </div>
          <div className="mt-2 flex gap-6">
            <div>
              <Skeleton className="h-7 w-20" />
              <Skeleton className="mt-1 h-3 w-24" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <Skeleton className="h-[260px] w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
}
