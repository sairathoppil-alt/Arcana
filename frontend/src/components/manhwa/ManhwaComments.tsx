import { motion } from 'framer-motion'
import { DetailSection } from '@/components/manhwa/DetailSection'
import { UserAvatar } from '@/components/shared/UserAvatar'
import type { ManhwaComment } from '@/types/manhwaDetail'

interface ManhwaCommentsProps {
  comments: ManhwaComment[]
  delay?: number
}

export function ManhwaComments({ comments, delay = 0.28 }: ManhwaCommentsProps) {
  return (
    <DetailSection title={`Comments (${comments.length})`} delay={delay}>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: delay + index * 0.06 }}
            className="flex gap-3 border-b border-border/60 pb-4 last:border-b-0 last:pb-0"
          >
            <UserAvatar name={comment.username} color={comment.avatarColor} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-semibold text-foreground">{comment.username}</span>
                <span className="text-xs text-muted">{comment.timestamp}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">{comment.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </DetailSection>
  )
}
