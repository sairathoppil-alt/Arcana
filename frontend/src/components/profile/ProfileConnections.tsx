import { motion } from 'framer-motion'
import { UserAvatar } from '@/components/shared/UserAvatar'
import type { ProfileConnection } from '@/types/profile'

interface ProfileConnectionsProps {
  followers: ProfileConnection[]
  following: ProfileConnection[]
  delay?: number
}

function ConnectionGroup({
  title,
  count,
  people,
  delay,
}: {
  title: string
  count: number
  people: ProfileConnection[]
  delay: number
}) {
  const visible = people.slice(0, 8)
  const overflow = people.length - visible.length

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
        <span className="text-xs font-medium text-muted">{count}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {visible.map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + index * 0.04 }}
            whileHover={{ y: -3, scale: 1.05 }}
            className="group flex flex-col items-center gap-1.5"
            title={`@${person.username}`}
          >
            <UserAvatar name={person.displayName} color={person.avatarColor} size="md" />
            <span className="max-w-[56px] truncate text-[10px] font-medium text-muted group-hover:text-foreground">
              {person.displayName}
            </span>
          </motion.div>
        ))}

        {overflow > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + visible.length * 0.04 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border bg-secondary/40 text-xs font-semibold text-muted"
          >
            +{overflow}
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

export function ProfileConnections({
  followers,
  following,
  delay = 0.22,
}: ProfileConnectionsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="dashboard-card rounded-[var(--radius-lg)] border p-5 sm:p-6"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <ConnectionGroup title="Followers" count={followers.length} people={followers} delay={delay} />
        <ConnectionGroup title="Following" count={following.length} people={following} delay={delay + 0.08} />
      </div>
    </motion.section>
  )
}
