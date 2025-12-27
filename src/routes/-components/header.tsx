import { Calendar } from 'lucide-react'

export default function Header() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md overflow-hidden flex items-center justify-center">
            <img
              src="/favicon.png"
              alt="Habitly Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Habitly
          </h1>
        </div>

      </div>

      <div className="flex items-center text-muted-foreground">
        <Calendar className="h-3.5 w-3.5 mr-2" />
        <span className="text-xs sm:text-sm">{formattedDate}</span>
      </div>
    </header>
  )
}
