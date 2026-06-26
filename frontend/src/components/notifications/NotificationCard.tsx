import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserAvatar } from '@/components/shared/UserAvatar'
import type { Notification } from '@/types/notifications'
import { cn } from '@/utils/cn'

interface NotificationCardProps {
  notification: Notification
  index: number
  onMarkRead: (id: string) => void
}

export function NotificationCard({ notification, index, onMarkRead }: NotificationCardProps) {
  const handleMarkRead = () => {
    if (!notification.read) onMarkRead(notification.id)
  }

  const card = (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{
        opacity: notification.read ? 0.82 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className={cn(
        'dashboard-card group relative flex gap-4 rounded-[var(--radius-lg)] border p-4 transition-shadow hover:shadow-[var(--shadow-soft)]',
        !notification.read && 'border-accent/25 bg-accent/[0.03] dark:border-accent/20',
      )}
    >
      {!notification.read ? (
        <motion.span
          layout
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-accent"
          aria-label="Unread"
        />
      ) : null}

      <UserAvatar name={notification.username} color={notification.avatarColor} size="md" />

      <div className="min-w-0 flex-1 pr-4">
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">{notification.username}</span>{' '}
          <span className="text-muted group-hover:text-foreground">{notification.text}</span>
        </p>
        <p className="mt-1.5 text-xs font-medium text-muted/80">{notification.timestamp}</p>
      </div>
    </motion.article>
  )

  if (notification.href) {
    return (
      <Link to={notification.href} className="block" onClick={handleMarkRead}>
        {card}
      </Link>
    )
  }

  return (
    <button type="button" className="block w-full text-left" onClick={handleMarkRead}>
      {card}
    </button>
  )
}
