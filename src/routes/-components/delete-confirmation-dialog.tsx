import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmationDialogProps {
  habitName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isPending: boolean
}

export default function DeleteConfirmationDialog({
  habitName,
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: DeleteConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!isPending) onOpenChange(val)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-lg">Delete Habit</DialogTitle>
            <DialogDescription className="text-sm">
              Are you sure you want to delete{' '}
              <span className="font-medium">"{habitName}"</span>?
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-border p-4 space-y-2">
            <p className="text-sm font-medium">This will:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Permanently delete this habit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>Remove all progress and streak data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive">•</span>
                <span>This action cannot be undone</span>
              </li>
            </ul>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              className="sm:w-auto w-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isPending}
              variant="destructive"
              onClick={handleConfirm}
              className="sm:w-auto w-full"
            >
              {isPending ? 'Deleting...' : 'Delete Habit'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
