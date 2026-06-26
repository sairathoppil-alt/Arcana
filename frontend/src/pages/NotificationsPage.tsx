import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NotificationGroup } from '@/components/notifications/NotificationGroup'
import { NotificationTabs } from '@/components/notifications/NotificationTabs'
import { NotificationsEmptyState } from '@/components/notifications/NotificationsEmptyState'
import { NotificationsHeader } from '@/components/notifications/NotificationsHeader'
import { PageContainer } from '@/components/ui/PageContainer'
import { mockNotifications } from '@/data/mockNotifications'
import type { NotificationFilter } from '@/types/notifications'
import { filterNotifications, groupNotifications } from '@/utils/notificationFilters'
import { tabContent } from '@/utils/motion'

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all')

  const filtered = useMemo(
    () => filterNotifications(notifications, activeFilter),
    [notifications, activeFilter],
  )

  const grouped = useMemo(() => groupNotifications(filtered), [filtered])

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  )

  const tabCounts = useMemo(
    () => ({
      unread: unreadCount,
      invitations: filterNotifications(notifications, 'invitations').filter((n) => !n.read).length,
      comments: filterNotifications(notifications, 'comments').filter((n) => !n.read).length,
      updates: filterNotifications(notifications, 'updates').filter((n) => !n.read).length,
      mentions: filterNotifications(notifications, 'mentions').filter((n) => !n.read).length,
    }),
    [notifications, unreadCount],
  )

  const markRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <PageContainer width="sm" className="space-y-6">
      <NotificationsHeader unreadCount={unreadCount} onMarkAllRead={markAllRead} />

      <NotificationTabs active={activeFilter} onChange={setActiveFilter} counts={tabCounts} />

      <AnimatePresence mode="wait">
        <motion.div key={activeFilter} variants={tabContent} initial="hidden" animate="visible" exit="exit" className="space-y-8">
          {grouped.length === 0 ? (
            <NotificationsEmptyState />
          ) : (
            grouped.map(({ group, items }) => (
              <NotificationGroup
                key={group}
                group={group}
                items={items}
                onMarkRead={markRead}
              />
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </PageContainer>
  )
}
