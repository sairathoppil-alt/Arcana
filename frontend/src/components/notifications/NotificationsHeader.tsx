import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'

interface NotificationsHeaderProps {
  unreadCount: number
  onMarkAllRead: () => void
}

export function NotificationsHeader({ unreadCount, onMarkAllRead }: NotificationsHeaderProps) {
  return (
    <PageHeader
      title="Notifications"
      description={
        unreadCount > 0
          ? `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
          : 'You are all caught up'
      }
      actions={
        <>
          <Button variant="outline" size="sm" onClick={onMarkAllRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
          <Link
            to="/settings"
            state={{ section: 'notifications' }}
            className="inline-flex h-9 items-center justify-center rounded-[var(--radius-md)] border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50"
          >
            Notification Settings
          </Link>
        </>
      }
    />
  )
}
