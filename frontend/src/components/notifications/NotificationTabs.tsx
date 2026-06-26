import { motion } from 'framer-motion'
import { NOTIFICATION_FILTERS, type NotificationFilter } from '@/types/notifications'
import { cn } from '@/utils/cn'

interface NotificationTabsProps {
  active: NotificationFilter
  onChange: (filter: NotificationFilter) => void
  counts: Partial<Record<NotificationFilter, number>>
}

export function NotificationTabs({ active, onChange, counts }: NotificationTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="dashboard-card rounded-[var(--radius-lg)] border px-2 py-2 sm:px-3"
    >
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {NOTIFICATION_FILTERS.map((tab) => {
          const isActive = active === tab.id
          const count = counts[tab.id]

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative shrink-0 rounded-[var(--radius-md)] px-3.5 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent/12 text-accent dark:bg-accent/20'
                  : 'text-muted hover:bg-secondary/60 hover:text-foreground',
              )}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {count !== undefined && count > 0 ? (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                      isActive ? 'bg-accent/20 text-accent' : 'bg-secondary text-muted',
                    )}
                  >
                    {count}
                  </span>
                ) : null}
              </span>
              {isActive ? (
                <motion.span
                  layoutId="notification-tab-indicator"
                  className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
