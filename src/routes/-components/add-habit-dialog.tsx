import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Plus, Target, Clock, TrendingUp } from 'lucide-react'
import db from '@/lib/db'

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Habit name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Habit name must not exceed 50 characters.',
    }),
})

export default function AddHabitDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await db.habits.add({
        name: values.name,
        completedToday: false,
        lastCompletedDate: null,
        streak: 0,
      })
      form.reset()
      setOpen(false)
    } catch (error) {
      console.error('Failed to add habit:', error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
        if (!val) form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-9">
          <Plus className="h-3.5 w-3.5" />
          Add Habit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <DialogTitle className="text-lg">New Habit</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Build consistency, one day at a time
              </p>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you want to make a habit?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Morning meditation, Read 20 pages, Drink 8 glasses..."
                      className="text-sm"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Daily commitment</p>
                  <p className="text-xs text-muted-foreground">
                    This habit will reset every day. Focus on today's
                    completion.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg border">
                <TrendingUp className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Streaks build momentum</p>
                  <p className="text-xs text-muted-foreground">
                    Each consecutive day builds your streak. Miss a day and it
                    resets.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
