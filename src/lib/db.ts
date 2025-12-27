import { Dexie, type EntityTable } from "dexie"

export interface Habit {
  id: string
  name: string
  completedToday: boolean
  lastCompletedDate: string | null
  streak: number
}

const db = new Dexie("RecallDatabase") as Dexie & {
  habits: EntityTable<Habit, "id", Omit<Habit, "id">>,
}

db.version(1).stores({
    habits: "++id, name, completedToday, lastCompletedDate, streak",
})

export default db