import { motion } from 'framer-motion'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { MEMBER_ROLE_LABELS, type SharedMember } from '@/types/sharedLibrary'
import { cn } from '@/utils/cn'

interface MembersTabProps {
  members: SharedMember[]
}

const roleStyles: Record<SharedMember['role'], string> = {
  owner: 'bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/30',
  moderator: 'bg-accent/10 text-accent border-accent/30',
  member: 'bg-secondary/60 text-muted border-border',
}

export function MembersTab({ members }: MembersTabProps) {
  const sorted = [...members].sort((a, b) => {
    const order = { owner: 0, moderator: 1, member: 2 }
    return order[a.role] - order[b.role]
  })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sorted.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          whileHover={{ y: -4 }}
          className="dashboard-card flex items-center gap-4 rounded-[var(--radius-lg)] border p-4 transition-shadow hover:shadow-[var(--shadow-soft)]"
        >
          <UserAvatar
            name={member.name}
            color={member.avatarColor}
            online={member.online}
            size="lg"
          />
          <div className="min-w-0">
            <p className="font-medium text-foreground">{member.name}</p>
            <span
              className={cn(
                'mt-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                roleStyles[member.role],
              )}
            >
              {MEMBER_ROLE_LABELS[member.role]}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
