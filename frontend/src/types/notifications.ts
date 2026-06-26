export type NotificationFilter =
  | 'all'
  | 'unread'
  | 'invitations'
  | 'comments'
  | 'updates'
  | 'mentions'

export type NotificationCategory = 'invitation' | 'comment' | 'update' | 'mention'

export type NotificationTimeGroup =
  | 'today'
  | 'yesterday'
  | 'earlier-this-week'
  | 'earlier-this-month'

export interface Notification {
  id: string
  userId: string
  username: string
  avatarColor: string
  category: NotificationCategory
  text: string
  timestamp: string
  occurredAt: string
  read: boolean
  href?: string
}

export const NOTIFICATION_FILTERS: { id: NotificationFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'invitations', label: 'Invitations' },
  { id: 'comments', label: 'Comments' },
  { id: 'updates', label: 'Updates' },
  { id: 'mentions', label: 'Mentions' },
]

export const NOTIFICATION_GROUP_LABELS: Record<NotificationTimeGroup, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  'earlier-this-week': 'Earlier This Week',
  'earlier-this-month': 'Earlier This Month',
}

export const NOTIFICATION_GROUP_ORDER: NotificationTimeGroup[] = [
  'today',
  'yesterday',
  'earlier-this-week',
  'earlier-this-month',
]
