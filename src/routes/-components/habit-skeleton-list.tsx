import { Skeleton } from "@/components/ui/skeleton";

export default function HabitSkeletonList() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center space-x-4">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}
