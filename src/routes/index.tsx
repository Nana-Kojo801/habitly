import { createFileRoute } from '@tanstack/react-router'
import Header from './-components/header'
import ProgressSummary from './-components/progress-summary'
import HabitList from './-components/habit-list'
import EmptyState from './-components/empty-state'
import EmptyStateSkeleton from './-components/empty-state-skeleton'
import AddHabitDialog from './-components/add-habit-dialog'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/lib/db'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const habits = useLiveQuery(() => db.habits.toArray())

  const isLoading = habits === undefined
  const hasHabits = habits && habits.length > 0

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-4 sm:px-6 sm:py-8">
        <Header />

        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          <ProgressSummary />

          {isLoading ? (
            <EmptyStateSkeleton />
          ) : hasHabits ? (
            <>
              {/* Action Buttons at Top of List */}
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-lg font-semibold">Today's Habits</h2>
                <div className="flex items-center space-x-2">
                  <AddHabitDialog />
                </div>
              </div>

              <HabitList />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
