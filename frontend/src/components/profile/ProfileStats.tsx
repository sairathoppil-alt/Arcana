import { motion } from 'framer-motion'
import type { ReadingStats } from '@/types/profile'

interface ProfileStatsProps {
  stats: ReadingStats
  delay?: number
}

const statItems: {
  key: keyof ReadingStats
  label: string
  icon: string
  format?: (value: ReadingStats[keyof ReadingStats]) => string
}[] = [
  { key: 'booksRead', label: 'Books Read', icon: '📖' },
  { key: 'currentlyReading', label: 'Currently Reading', icon: '📚' },
  { key: 'completed', label: 'Completed', icon: '✅' },
  { key: 'dropped', label: 'Dropped', icon: '🍂' },
  { key: 'wishlist', label: 'Wishlist', icon: '💫' },
  {
    key: 'averageRating',
    label: 'Average Rating',
    icon: '⭐',
    format: (v) => (typeof v === 'number' ? v.toFixed(1) : String(v)),
  },
  {
    key: 'readingStreak',
    label: 'Reading Streak',
    icon: '🔥',
    format: (v) => `${v} days`,
  },
  { key: 'favoriteGenre', label: 'Favorite Genre', icon: '👑' },
]

export function ProfileStats({ stats, delay = 0.08 }: ProfileStatsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
    >
      {statItems.map((item, index) => {
        const raw = stats[item.key]
        const value = item.format ? item.format(raw) : String(raw)

        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: delay + index * 0.04 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="dashboard-card rounded-[var(--radius-md)] border p-4"
          >
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <p className="mt-2 font-display text-2xl font-semibold text-foreground">{value}</p>
            <p className="mt-1 text-xs font-medium text-muted">{item.label}</p>
          </motion.div>
        )
      })}
    </motion.section>
  )
}
