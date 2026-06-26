import { PlusIcon } from '@/components/icons'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/Button'

interface LibraryEmptyStateProps {
  onAdd?: () => void
  title?: string
  description?: string
}

export function LibraryEmptyState({
  onAdd,
  title = 'Your shelf awaits',
  description = 'Start building your personal library by adding your first manhwa.',
}: LibraryEmptyStateProps) {
  return (
    <EmptyState
      variant="library"
      title={title}
      description={description}
      action={
        <Button onClick={onAdd} className="gap-2">
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          Add First Manhwa
        </Button>
      }
    />
  )
}
