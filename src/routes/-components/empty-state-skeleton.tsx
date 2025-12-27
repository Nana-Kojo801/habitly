import { Skeleton } from '@/components/ui/skeleton'

export default function EmptyStateSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Skeleton className="h-20 w-20 rounded-full mb-6" />

      <Skeleton className="h-7 w-48 mb-2 mx-auto" />
      <div className="space-y-2 mb-8">
        <Skeleton className="h-4 w-64 mx-auto" />
        <Skeleton className="h-4 w-52 mx-auto" />
      </div>

      <Skeleton className="h-10 w-32 rounded-md mx-auto" />
    </div>
  )
}
