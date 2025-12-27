import { Skeleton } from '@/components/ui/skeleton'

export default function ProgressSummarySkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-8 w-16" />
      </div>

      <Skeleton className="h-2 w-full mb-4" />

      <div className="flex justify-between text-sm">
        <div className="flex items-center">
          <Skeleton className="h-4 w-20 mr-2" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-4 w-20 mr-2" />
          <Skeleton className="h-4 w-6" />
        </div>
      </div>
    </div>
  )
}
