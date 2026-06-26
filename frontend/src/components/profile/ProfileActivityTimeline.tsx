import { motion } from 'framer-motion'
import type { ProfileActivity, ProfileActivityType } from '@/types/profile'

interface ProfileActivityTimelineProps {
  activities: ProfileActivity[]
  delay?: number
}

const activityIcons: Record<ProfileActivityType, string> = {
  added: '📥',
  'finished-chapter': '📖',
  'created-library': '📚',
  'added-note': '📝',
  completed: '🏆',
  rated: '⭐',
}

export function ProfileActivityTimeline({ activities, delay = 0.18 }: ProfileActivityTimelineProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6"
    >
      <h2 className="font-display text-lg font-semibold text-foreground">Recent Activity</h2>
      <p className="mt-1 text-sm text-muted">Your reading journal</p>

      <ol className="relative mt-6 space-y-0">
        <span
          className="absolute bottom-2 left-[15px] top-2 w-px bg-border"
          aria-hidden="true"
        />

        {activities.map((activity, index) => (
          <motion.li
            key={activity.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: delay + index * 0.05 }}
            className="relative flex gap-4 pb-5 last:pb-0"
          >
            <span
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm shadow-sm"
              style={
                activity.accent
                  ? { boxShadow: `0 0 0 2px var(--dashboard-card-bg), 0 0 12px ${activity.accent}44` }
                  : undefined
              }
            >
              {activityIcons[activity.type]}
            </span>

            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              {activity.subtitle ? (
                <p className="mt-0.5 text-xs text-muted">{activity.subtitle}</p>
              ) : null}
              <p className="mt-1 text-[10px] font-medium text-muted/70">{activity.timestamp}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  )
}
