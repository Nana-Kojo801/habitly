import HabitItem from './habit-item'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/lib/db'
import HabitSkeletonList from './habit-skeleton-list'

export default function HabitList() {
  const habits = useLiveQuery(() => db.habits.toArray())

  if (habits === undefined) return <HabitSkeletonList />

  return (
    <div className="space-y-2">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  )
}
