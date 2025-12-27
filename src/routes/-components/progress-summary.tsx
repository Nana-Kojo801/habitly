import { Progress } from '@/components/ui/progress'
import db from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { CheckCircle } from 'lucide-react'
import ProgressSummarySkeleton from './progress-summary-skeleton'

export default function ProgressSummary() {
  const habits = useLiveQuery(() => db.habits.toArray())

  const total = habits?.length || 0
  const completed = habits?.filter((habit) => habit.completedToday).length || 0
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  if (habits === undefined) {
    return <ProgressSummarySkeleton />
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-habitly-success" />
          <h2 className="text-lg font-semibold">Daily Progress</h2>
        </div>
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>

      <Progress value={percentage} className="h-2 mb-4" />

      <div className="flex justify-between text-sm">
        <div>
          <span className="text-muted-foreground">Completed:</span>
          <span className="ml-2 font-medium">
            {completed}/{total}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Remaining:</span>
          <span className="ml-2 font-medium">{total - completed}</span>
        </div>
      </div>
    </div>
  )
}
