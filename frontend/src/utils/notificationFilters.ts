import type {
  Notification,
  NotificationFilter,
  NotificationTimeGroup,
} from '@/types/notifications'
import { NOTIFICATION_GROUP_ORDER } from '@/types/notifications'

const REFERENCE_NOW = new Date('2026-06-23T12:00:00')

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getNotificationTimeGroup(occurredAt: string, now = REFERENCE_NOW): NotificationTimeGroup {
  const date = new Date(occurredAt)
  const today = startOfDay(now)
  const target = startOfDay(date)
  const diffDays = Math.floor((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays <= 6) return 'earlier-this-week'
  return 'earlier-this-month'
}

export function filterNotifications(
  notifications: Notification[],
  filter: NotificationFilter,
): Notification[] {
  switch (filter) {
    case 'unread':
      return notifications.filter((n) => !n.read)
    case 'invitations':
      return notifications.filter((n) => n.category === 'invitation')
    case 'comments':
      return notifications.filter((n) => n.category === 'comment')
    case 'updates':
      return notifications.filter((n) => n.category === 'update')
    case 'mentions':
      return notifications.filter((n) => n.category === 'mention')
    default:
      return notifications
  }
}

export function groupNotifications(
  notifications: Notification[],
): { group: NotificationTimeGroup; items: Notification[] }[] {
  const buckets = new Map<NotificationTimeGroup, Notification[]>()

  for (const notification of notifications) {
    const group = getNotificationTimeGroup(notification.occurredAt)
    const existing = buckets.get(group) ?? []
    existing.push(notification)
    buckets.set(group, existing)
  }

  return NOTIFICATION_GROUP_ORDER.filter((group) => buckets.has(group)).map((group) => ({
    group,
    items: buckets.get(group) ?? [],
  }))
}
