import { useState, useTransition } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import DeleteConfirmationDialog from './delete-confirmation-dialog'
import { Flame, X } from 'lucide-react'
import db, { type Habit } from '@/lib/db'

interface HabitItemProps {
  habit: Habit
}

export default function HabitItem({ habit }: HabitItemProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await db.habits.delete(habit.id)
    })
  }

  return (
    <>
      <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={habit.completedToday}
            className="h-5 w-5"
            aria-label={`Mark ${habit.name} as ${habit.completedToday ? 'incomplete' : 'complete'}`}
            onCheckedChange={() => {
              const isComplete = !habit.completedToday
              const yesterday = new Date()
              yesterday.setDate(yesterday.getDate() - 1)

              const wasYesterday =
                habit.lastCompletedDate &&
                new Date(habit.lastCompletedDate).toDateString() ===
                  yesterday.toDateString()

              const newStreak = isComplete
                ? wasYesterday
                  ? habit.streak + 1
                  : 1
                : Math.max(0, habit.streak - 1)

              db.habits.update(habit.id, {
                completedToday: isComplete,
                streak: newStreak,
                lastCompletedDate: isComplete
                  ? new Date().toISOString()
                  : newStreak > 0
                    ? yesterday.toISOString()
                    : null,
              })
            }}
          />

          <div>
            <span
              className={`font-medium ${habit.completedToday ? 'line-through text-muted-foreground' : ''}`}
            >
              {habit.name}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="streak" className="gap-1">
            <Flame className="h-3 w-3" />
            <span>{habit.streak}</span>
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            aria-label={`Delete ${habit.name}`}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <DeleteConfirmationDialog
        habitName={habit.name}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  )
}
