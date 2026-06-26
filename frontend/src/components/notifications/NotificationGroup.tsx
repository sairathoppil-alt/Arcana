import { motion } from 'framer-motion'
import { NotificationCard } from '@/components/notifications/NotificationCard'
import { NOTIFICATION_GROUP_LABELS, type Notification, type NotificationTimeGroup } from '@/types/notifications'

interface NotificationGroupProps {
  group: NotificationTimeGroup
  items: Notification[]
  onMarkRead: (id: string) => void
}

export function NotificationGroup({ group, items, onMarkRead }: NotificationGroupProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-3"
    >
      <h2 className="px-1 font-display text-sm font-semibold uppercase tracking-wider text-muted">
        {NOTIFICATION_GROUP_LABELS[group]}
      </h2>
      <div className="space-y-3">
        {items.map((notification, index) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            index={index}
            onMarkRead={onMarkRead}
          />
        ))}
      </div>
    </motion.section>
  )
}
