import { Target } from 'lucide-react'
import AddHabitDialog from './add-habit-dialog'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Target className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
      <p className="text-muted-foreground max-w-sm mb-8">
        Start building your daily routine by adding your first habit. Small steps lead to big changes.
      </p>
      
      <AddHabitDialog />
    </div>
  )
}