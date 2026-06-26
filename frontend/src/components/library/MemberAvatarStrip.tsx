import { motion } from 'framer-motion'
import { PlusIcon } from '@/components/icons'
import { UserAvatar } from '@/components/shared/UserAvatar'
import type { SharedMember } from '@/types/sharedLibrary'
import { cn } from '@/utils/cn'

interface MemberAvatarStripProps {
  members: SharedMember[]
  creatorId: string
  onInvite?: () => void
}

export function MemberAvatarStrip({ members, creatorId, onInvite }: MemberAvatarStripProps) {
  const creator = members.find((m) => m.id === creatorId) ?? members.find((m) => m.role === 'owner')
  const otherMembers = members.filter((m) => m.id !== creator?.id)
  const onlineCount = members.filter((m) => m.online).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.06, ease: 'easeOut' }}
      className="dashboard-card flex flex-col gap-4 rounded-[var(--radius-lg)] border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {creator ? (
          <div className="flex items-center gap-3">
            <UserAvatar name={creator.name} color={creator.avatarColor} online={creator.online} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Creator</p>
              <p className="text-sm font-medium text-foreground">{creator.name}</p>
            </div>
          </div>
        ) : null}

        <div className="hidden h-10 w-px bg-border sm:block" />

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Members · {onlineCount} online
          </p>
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {otherMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.04 }}
                  className={cn(index > 0 && 'ring-2 ring-card rounded-full')}
                >
                  <UserAvatar
                    name={member.name}
                    color={member.avatarColor}
                    size="sm"
                    online={member.online}
                  />
                </motion.div>
              ))}
            </div>
            {members.length > 6 ? (
              <span className="ml-3 text-xs font-medium text-muted">+{members.length - 6} more</span>
            ) : null}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onInvite}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 dark:bg-secondary/40 dark:backdrop-blur-sm"
      >
        <PlusIcon className="h-4 w-4" />
        Invite Member
      </button>
    </motion.div>
  )
}
