import { EmptyState } from '@/components/shared/EmptyState'

export function NotificationsEmptyState() {
  return (
    <EmptyState
      variant="notifications"
      title="No notifications yet"
      description="When friends invite you, comment on your reads, or libraries update, they will appear here."
    />
  )
}
