import { motion } from 'framer-motion'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { getMemberById } from '@/data/mockSharedLibrary'
import type { ActivityFeedItem, SharedMember } from '@/types/sharedLibrary'

interface ActivityTabProps {
  items: ActivityFeedItem[]
  members: SharedMember[]
}

export function ActivityTab({ items, members }: ActivityTabProps) {
  return (
    <div className="dashboard-card overflow-hidden rounded-[var(--radius-lg)] border">
      <ul className="divide-y divide-border/70">
        {items.map((item, index) => {
          const member = getMemberById(members, item.userId)

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-secondary/30 sm:px-5"
            >
              <UserAvatar
                name={item.username}
                color={member?.avatarColor ?? '#5a4a7a'}
                size="sm"
                online={member?.online}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{item.username}</span>{' '}
                  <span className="text-muted">{item.text}</span>
                  {item.highlight ? (
                    <>
                      {' '}
                      <span className="font-medium text-accent">{item.highlight}</span>
                    </>
                  ) : null}
                  .
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted">{item.timestamp}</span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
