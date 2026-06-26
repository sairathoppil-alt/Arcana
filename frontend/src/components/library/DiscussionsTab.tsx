import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserAvatar } from '@/components/shared/UserAvatar'
import type { DiscussionMessage, SharedMember } from '@/types/sharedLibrary'
import { cn } from '@/utils/cn'

interface DiscussionsTabProps {
  messages: DiscussionMessage[]
  members: SharedMember[]
  currentUserId?: string
}

function getMemberById(members: SharedMember[], userId: string) {
  return members.find((member) => member.id === userId)
}

export function DiscussionsTab({
  messages: initialMessages,
  members,
  currentUserId = 'saira',
}: DiscussionsTabProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')

  const handleSend = () => {
    const trimmed = draft.trim()
    if (!trimmed) return

    const user = getMemberById(members, currentUserId) ?? members[0]
    if (!user) return

    setMessages((prev) => [
      {
        id: `new-${Date.now()}`,
        userId: user.id,
        username: user.name,
        message: trimmed,
        timestamp: 'Just now',
      },
      ...prev,
    ])
    setDraft('')
  }

  return (
    <div className="space-y-4">
      <div className="dashboard-card rounded-[var(--radius-lg)] border p-4">
        <div className="flex gap-3">
          <UserAvatar
            name={getMemberById(members, currentUserId)?.name ?? 'You'}
            color={getMemberById(members, currentUserId)?.avatarColor ?? '#5c3a6b'}
            size="sm"
          />
          <div className="flex min-w-0 flex-1 gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Write a new comment..."
              className={cn(
                'h-10 min-w-0 flex-1 rounded-[var(--radius-md)] border border-border bg-card px-4 text-sm',
                'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
                'dark:bg-secondary/40 dark:backdrop-blur-sm',
              )}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!draft.trim()}
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50 dark:text-[var(--accent-foreground)]"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((message, index) => {
          const member = getMemberById(members, message.userId)

          return (
            <motion.article
              key={message.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -2 }}
              className="dashboard-card rounded-[var(--radius-lg)] border p-4 transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex gap-3">
                <UserAvatar
                  name={message.username}
                  color={member?.avatarColor ?? '#5a4a7a'}
                  size="sm"
                  online={member?.online}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm font-semibold text-foreground">{message.username}</span>
                    <span className="text-xs text-muted">{message.timestamp}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{message.message}</p>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
